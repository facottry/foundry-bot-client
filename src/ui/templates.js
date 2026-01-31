export const renderMainUI = (mode) => `
  <div class="clicky-header">
    <span>Foundry AI</span>
    <span id="clicky-toggle">_</span>
  </div>
  <div class="clicky-persona-toggle">
    <button class="clicky-persona-btn active" data-persona="AIRA">
      <span class="persona-icon">📋</span>
      <span class="persona-name">AIRA</span>
      <span class="persona-role">Records</span>
    </button>
    <button class="clicky-persona-btn" data-persona="REX">
      <span class="persona-icon">⚡</span>
      <span class="persona-name">REX</span>
      <span class="persona-role">Actions</span>
    </button>
  </div>
  <div class="clicky-body" id="clicky-results">
    <div id="clicky-suggestions"></div>
  </div>
  <div class="clicky-input-area">
    <input type="text" class="clicky-input" id="clicky-input" placeholder="Ask AIRA or REX..." />
    <button class="clicky-btn" id="clicky-send">Ask</button>
  </div>
`;

export const renderPersonaResponse = (response) => {
  const personaClass = response.persona === 'AIRA' ? 'aira' : 'rex';
  const confidenceBar = Math.round(response.confidence * 100);

  return `
    <div class="clicky-persona-response ${personaClass}">
        <div class="response-header">
            <span class="response-persona">${response.persona || 'SYSTEM'}</span>
            <span class="response-confidence" title="Confidence: ${confidenceBar}%">
                <span class="confidence-bar" style="width: ${confidenceBar}%"></span>
            </span>
        </div>
        <div class="response-answer">${response.answer}</div>
        ${response.source && response.source.length > 0 ? `
            <div class="response-source">
                Source: ${response.source.join(', ')}
            </div>
        ` : ''}
        ${response.notes ? `<div class="response-notes">${response.notes}</div>` : ''}
    </div>
    `;
};

export const renderLoading = (id) => `<p id="${id}" style="color:#666; font-style:italic;">Thinking...</p>`;

export const renderError = (msg) => {
  const p = document.createElement('p');
  p.className = 'clicky-error';
  p.textContent = msg;
  return p;
};

export const renderSummary = (text) => {
  const div = document.createElement('div');
  Object.assign(div.style, {
    marginTop: '10px',
    padding: '8px',
    background: '#eef',
    borderRadius: '4px'
  });
  div.textContent = text;
  return div;
};

export const renderSuggestions = (suggestions, onClick) => {
  const container = document.createElement('div');
  container.style.marginTop = '10px';
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.textContent = s;
    Object.assign(btn.style, {
      margin: '2px',
      fontSize: '0.8em',
      background: 'none',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      padding: '2px 6px'
    });
    btn.onclick = () => onClick(s);
    container.appendChild(btn);
  });
  return container;
};
