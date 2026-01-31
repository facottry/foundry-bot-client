import { ApiClient } from '../api/api.js';
import { styles } from '../ui/styles.js';
import { renderMainUI, renderLoading, renderError, renderPersonaResponse } from '../ui/templates.js';

export class ClickyCore {
    constructor(config) {
        this.config = null;
        this.api = null;
        this.shadowRoot = null;
        this.selectedPersona = 'AIRA'; // Default to AIRA (records)

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
        console.log('[Foundry AI] Core Initialized');
        this.mount();
    }

    mount() {
        // Host
        const host = document.createElement('div');
        host.id = 'clicky-host';
        document.body.appendChild(host);
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
        this.showGreeting();
    }

    showGreeting() {
        const results = this.shadowRoot.getElementById('clicky-results');
        if (results) {
            const greetingDiv = document.createElement('div');
            greetingDiv.className = 'clicky-greeting';
            greetingDiv.innerHTML = `
                <p><strong>AIRA</strong> - Archives & Records</p>
                <p><strong>REX</strong> - Decisions & Actions</p>
                <p style="margin-top:8px; font-size:12px; color:#666;">Select a persona and ask your question.</p>
            `;
            results.appendChild(greetingDiv);
        }
    }

    bindEvents(wrapper) {
        const input = this.shadowRoot.getElementById('clicky-input');
        const sendBtn = this.shadowRoot.getElementById('clicky-send');
        const toggleBtn = this.shadowRoot.getElementById('clicky-toggle');
        const personaBtns = this.shadowRoot.querySelectorAll('.clicky-persona-btn');

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

        // Persona toggle
        personaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                personaBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedPersona = btn.dataset.persona;
                input.placeholder = `Ask ${this.selectedPersona}...`;
                console.log('[Foundry AI] Selected persona:', this.selectedPersona);
            });
        });
    }

    async handlePersonaQuery(queryText) {
        const input = this.shadowRoot.getElementById('clicky-input');
        const results = this.shadowRoot.getElementById('clicky-results');
        const query = queryText.trim();

        if (!query) return;

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

            // Remove loader
            const loader = this.shadowRoot.getElementById(loadingId);
            if (loader) loader.remove();

            // Render persona response
            results.insertAdjacentHTML('beforeend', renderPersonaResponse(response));

        } catch (err) {
            console.error('[Foundry AI] Error:', err);
            const loader = this.shadowRoot.getElementById(loadingId);
            if (loader) loader.remove();
            results.appendChild(renderError('Connection failed.'));
        }

        results.scrollTop = results.scrollHeight;
    }
}
