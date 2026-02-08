import { ApiClient } from '../api/api.js';
import { styles } from '../ui/styles.js';
import { renderMainUI, renderLoading, renderError, renderPersonaResponse, renderUserMessage } from '../ui/templates.js';

export class ClickyCore {
    constructor(config) {
        this.config = null;
        this.api = null;
        this.shadowRoot = null;
        this.host = null;
        // Determine default persona based on mode (if provided in config later)
        this.selectedPersona = 'AIRA'; // Default


        if (config) {
            this.init(config);
        }
    }

    init(config) {
        if (this.config) {
            console.warn('Clicky already initialized');
            return;
        }

        if (!config || !config.token) {
            console.error('Clicky: Auth token is required.');
            return;
        }

        this.config = {
            mode: 'mini',
            serverUrl: 'http://localhost:5003',
            ...config
        };

        this.api = new ApiClient(this.config.serverUrl, this.config.token);

        // Dynamic Persona Selection
        if (this.config.mode === 'full') {
            this.selectedPersona = 'REX';
        } else {
            this.selectedPersona = 'AIRA';
        }

        console.log('[Clicktory AI] Core Initialized. Persona:', this.selectedPersona);
        // this.mount(); //no need
    }

    mount() {
        // Find Container
        let container = null;
        const target = this.config.containerId; // Support string or element

        if (target) {
            if (typeof target === 'string') {
                container = document.getElementById(target);
            } else if (target instanceof HTMLElement) {
                container = target;
            }
        }

        if (!container) {
            return false;
        }

        // Reuse existing Host if available (Preserves Chart/State)
        if (this.host) {
            this.host.classList.add('embedded');
            container.appendChild(this.host);
            return true;
        }

        // Require creation
        const host = document.createElement('div');
        host.id = 'clicky-host';
        host.classList.add('embedded');
        container.appendChild(host);

        this.host = host; // Store ref
        this.shadowRoot = host.attachShadow({ mode: 'open' });

        // Styles
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        this.shadowRoot.appendChild(styleTag);

        // UI Wrapper
        const wrapper = document.createElement('div');
        wrapper.className = `clicky-ui ${this.config.mode}`;
        wrapper.innerHTML = renderMainUI(this.config.mode);
        this.shadowRoot.appendChild(wrapper);

        // Event Bindings
        this.bindEvents(wrapper);

        // Display initial greeting
        // this.showGreeting();

        return true;
    }

    bindEvents(wrapper) {
        const input = this.shadowRoot.getElementById('clicky-input');
        const sendBtn = this.shadowRoot.getElementById('clicky-send');
        const toggleBtn = this.shadowRoot.getElementById('clicky-toggle');

        // Send query
        sendBtn.addEventListener('click', () => this.handlePersonaQuery(input.value));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handlePersonaQuery(input.value);
        });

        // Toggle minimize
        toggleBtn.addEventListener('click', () => {
            wrapper.classList.toggle('mini');
            wrapper.classList.toggle('minimized');
            if (wrapper.classList.contains('minimized')) {
                wrapper.style.height = '48px';
            } else {
                wrapper.style.height = '';
            }
        });
    }

    async handlePersonaQuery(queryText) {
        const input = this.shadowRoot.getElementById('clicky-input');
        const results = this.shadowRoot.getElementById('clicky-results');
        const query = queryText.trim();

        if (!query) return;

        // 1. Render User Message
        results.insertAdjacentHTML('beforeend', renderUserMessage(query));

        // UI Optimistic Update
        const loadingId = 'loading-' + Date.now();
        results.insertAdjacentHTML('beforeend', renderLoading(loadingId));
        results.scrollTop = results.scrollHeight;
        input.value = '';

        try {
            // Use persona API
            const response = await this.api.askPersona(
                query,
                this.selectedPersona,
                this.config.productId // Optional product context
            );

            console.log('[Clicktory AI] API Response:', response);

            // Normalize response (handle {data: ...} wrapper if present)
            const data = response.data || response;

            // Remove loader
            const loader = this.shadowRoot.getElementById(loadingId);
            if (loader) loader.remove();

            // Render persona response
            if (data && data.answer) {
                const html = renderPersonaResponse(data);
                results.insertAdjacentHTML('beforeend', html);
            } else {
                console.error('[Clicktory AI] Invalid response format:', data);
                results.appendChild(renderError('Received invalid response from AI.'));
            }

        } catch (err) {
            console.error('[Clicktory AI] Error:', err);
            const loader = this.shadowRoot.getElementById(loadingId);
            if (loader) loader.remove();
            results.appendChild(renderError('Beep boop. My brain is unplugged.'));
        }

        results.scrollTop = results.scrollHeight;
    }
    toggle() {
        const wrapper = this.shadowRoot ? this.shadowRoot.querySelector('.clicky-ui') : null;
        if (wrapper) {
            // Check if minimized
            const isMinimized = wrapper.classList.contains('minimized');
            if (isMinimized) {
                // Open
                wrapper.classList.remove('minimized', 'mini');
                wrapper.style.height = '';
            } else {
                // Close/Minimize
                wrapper.classList.add('minimized', 'mini');
                wrapper.style.height = '48px';
            }
        }
    }

    open() {
        const wrapper = this.shadowRoot ? this.shadowRoot.querySelector('.clicky-ui') : null;
        if (wrapper) {
            wrapper.classList.remove('minimized', 'mini');
            wrapper.style.height = '';
        }
    }
}
