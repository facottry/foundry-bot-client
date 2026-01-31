export const renderMainUI = (mode) => {
  const title = mode === 'full' ? 'REX (Actions)' : 'AIRA (Records)';
  const placeholder = mode === 'full' ? 'Ask REX to perform actions...' : 'Ask AIRA about records...';

  return `
  <div class="clicky-header">
    <span>${title}</span>
    <span id="clicky-toggle">_</span>
  </div>
  <div class="clicky-body" id="clicky-results">
    <div id="clicky-suggestions"></div>
  </div>
  <div class="clicky-input-area">
    <input type="text" class="clicky-input" id="clicky-input" placeholder="${placeholder}" />
    <button class="clicky-btn" id="clicky-send">Ask</button>
  </div>
`;
};

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

export const renderUserMessage = (text) => `
  <div class="clicky-user-message" style="
      background: #f1f5f9;
      padding: 10px;
      border-radius: 8px;
      margin: 10px 0;
      align-self: flex-end;
      max-width: 80%;
      margin-left: auto;
      color: #334155;
      font-size: 0.9em;
  ">
    ${text}
  </div>
`;

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
