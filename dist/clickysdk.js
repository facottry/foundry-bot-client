(function(c,a){typeof exports=="object"&&typeof module<"u"?a(exports):typeof define=="function"&&define.amd?define(["exports"],a):(c=typeof globalThis<"u"?globalThis:c||self,a(c.ClickyBot={}))})(this,(function(c){"use strict";class a{constructor(e,i){this.serverUrl=e,this.token=i}async startSession(){const e=await fetch(`${this.serverUrl}/api/session/start`,{method:"POST",headers:{"Content-Type":"application/json",...this.token?{Authorization:`Bearer ${this.token}`}:{}},body:JSON.stringify({})});if(!e.ok)throw new Error(`Session Start Error: ${e.statusText}`);return await e.json()}async askPersona(e,i=null,o=null,n=null){const r=await fetch(`${this.serverUrl}/api/persona/ask`,{method:"POST",headers:{"Content-Type":"application/json",...this.token?{Authorization:`Bearer ${this.token}`}:{}},body:JSON.stringify({query:e,persona:i,productId:o,sessionId:n})});if(!r.ok)throw new Error(`Persona Ask Error: ${r.statusText}`);return await r.json()}async query(e,i){const o=await fetch(`${this.serverUrl}/api/query`,{method:"POST",headers:{"Content-Type":"application/json",...this.token?{Authorization:`Bearer ${this.token}`}:{}},body:JSON.stringify({query:e,context:i})});if(!o.ok)throw new Error(`API Error: ${o.statusText}`);return await o.json()}}const x=`
  :host { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  :host(.embedded) { position: relative; bottom: auto; right: auto; width: 100%; height: 100%; }
  :host(.embedded) .clicky-ui { width: 100% !important; height: 100% !important; max-height: none; border: none; box-shadow: none; border-radius: 0; }
  
  /* ============================================ */
  /* CONTAINER STYLES */
  /* ============================================ */
  .clicky-ui { background: white; border: 1px solid #e2e8f0; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; }
  .clicky-ui.mini { width: 340px; height: 450px; }
  .clicky-ui.full { width: 680px; height: 85vh; }
  .clicky-ui.minimized { height: 48px !important; }
  
  .clicky-header { background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%); color: white; padding: 14px 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
  .clicky-header span:first-child { letter-spacing: -0.5px; }
  #clicky-toggle { opacity: 0.7; transition: opacity 0.2s; }
  #clicky-toggle:hover { opacity: 1; }
  
  .clicky-body { flex: 1; overflow-y: auto; padding: 16px; background: #fafbfc; }
  .clicky-input-area { padding: 12px 16px; border-top: 1px solid #e2e8f0; background: white; display: flex; gap: 10px; }
  .clicky-input { flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s; }
  .clicky-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
  .clicky-btn { background: #1e1e2e; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 500; transition: background 0.2s; }
  .clicky-btn:hover { background: #2d2d44; }
  
  /* ============================================ */
  /* GREETING MESSAGE */
  /* ============================================ */
  .clicky-greeting { background: linear-gradient(135deg, #f0f4ff 0%, #e8f4f8 100%); border: 1px solid #d1e5f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; }
  .clicky-greeting p { margin: 0 0 6px 0; font-size: 13px; color: #334155; line-height: 1.5; }
  .clicky-greeting p:last-child { margin-bottom: 0; }

  /* ============================================ */
  /* PERSONA TOGGLE */
  /* ============================================ */
  .clicky-persona-toggle { display: flex; gap: 8px; padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
  .clicky-persona-btn { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 10px 8px; border: 2px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer; transition: all 0.2s; }
  .clicky-persona-btn:hover { border-color: #cbd5e1; }
  .clicky-persona-btn.active { border-color: #6366f1; background: #f0f0ff; }
  .clicky-persona-btn[data-persona="REX"].active { border-color: #f97316; background: #fff7ed; }
  .persona-icon { font-size: 18px; margin-bottom: 4px; }
  .persona-name { font-size: 13px; font-weight: 600; color: #1e1e2e; }
  .persona-role { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

  /* ============================================ */
  /* PERSONA RESPONSE */
  /* ============================================ */
  .clicky-persona-response { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; }
  .clicky-persona-response.aira { border-left: 4px solid #6366f1; }
  .clicky-persona-response.rex { border-left: 4px solid #f97316; }
  .response-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .response-persona { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 8px; border-radius: 4px; }
  .clicky-persona-response.aira .response-persona { background: #ede9fe; color: #6366f1; }
  .clicky-persona-response.rex .response-persona { background: #ffedd5; color: #f97316; }
  .response-confidence { width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
  .confidence-bar { height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); border-radius: 3px; transition: width 0.3s; }
  .response-answer { font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 8px; }
  .response-source { font-size: 11px; color: #94a3b8; }
  .response-notes { font-size: 11px; color: #94a3b8; font-style: italic; margin-top: 8px; }

  /* ============================================ */
  /* PRODUCT CARD */
  /* ============================================ */
  .clicky-product-card { display: flex; align-items: center; gap: 12px; padding: 14px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 10px; transition: box-shadow 0.2s, transform 0.2s; }
  .clicky-product-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .clicky-card-logo { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
  .clicky-card-content { flex: 1; min-width: 0; }
  .clicky-card-title { font-size: 15px; font-weight: 600; color: #1e1e2e; margin: 0 0 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .clicky-card-tagline { font-size: 13px; color: #64748b; margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .clicky-card-meta { display: flex; gap: 8px; margin-top: 6px; font-size: 12px; color: #94a3b8; }
  .clicky-card-action { background: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 500; flex-shrink: 0; transition: background 0.2s; }
  .clicky-card-action:hover { background: #e2e8f0; }
  
  .clicky-product-grid { display: flex; flex-direction: column; gap: 10px; }
  
  /* ============================================ */
  /* FOUNDER CARD */
  /* ============================================ */
  .clicky-founder-card { display: flex; gap: 16px; padding: 16px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; }
  .clicky-founder-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .clicky-founder-info { flex: 1; }
  .clicky-founder-name { font-size: 16px; font-weight: 600; color: #1e1e2e; margin: 0 0 4px 0; }
  .clicky-founder-title { font-size: 13px; color: #6366f1; margin: 0 0 2px 0; }
  .clicky-founder-company { font-size: 13px; color: #64748b; margin: 0 0 8px 0; }
  .clicky-founder-bio { font-size: 13px; color: #475569; line-height: 1.5; margin: 0 0 8px 0; }
  .clicky-founder-location { font-size: 12px; color: #94a3b8; margin: 0 0 8px 0; }
  .clicky-founder-socials { display: flex; gap: 8px; font-size: 12px; }
  .clicky-founder-socials a { color: #6366f1; text-decoration: none; }
  .clicky-founder-socials a:hover { text-decoration: underline; }
  
  /* ============================================ */
  /* REVIEW CARD */
  /* ============================================ */
  .clicky-review-card { padding: 14px; background: white; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 10px; }
  .clicky-review-card.positive { border-left: 3px solid #22c55e; }
  .clicky-review-card.negative { border-left: 3px solid #ef4444; }
  .clicky-review-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .clicky-review-stars { color: #f59e0b; font-size: 14px; letter-spacing: 1px; }
  .clicky-review-user { font-size: 13px; color: #64748b; }
  .clicky-review-sentiment { font-size: 14px; }
  .clicky-review-title { font-size: 14px; font-weight: 600; color: #1e1e2e; margin: 0 0 6px 0; }
  .clicky-review-text { font-size: 13px; color: #475569; line-height: 1.5; margin: 0; }
  
  .clicky-review-list { display: flex; flex-direction: column; }
  
  /* ============================================ */
  /* COMPARISON TABLE */
  /* ============================================ */
  .clicky-comparison-table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; }
  .clicky-comparison-table th { background: #f8fafc; color: #1e1e2e; font-weight: 600; padding: 12px; text-align: left; font-size: 14px; }
  .clicky-comparison-table td { padding: 12px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #475569; }
  .clicky-comparison-table tr:hover td { background: #f8fafc; }
  .clicky-comparison-table a { color: #6366f1; text-decoration: none; }
  
  /* ============================================ */
  /* STATS WIDGET */
  /* ============================================ */
  .clicky-stats-widget { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
  .clicky-stats-title { font-size: 15px; font-weight: 600; color: #1e1e2e; margin: 0 0 12px 0; }
  .clicky-stats-list { list-style: none; padding: 0; margin: 0; }
  .clicky-stats-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .clicky-stats-item:last-child { border-bottom: none; }
  .clicky-stats-rank { width: 24px; height: 24px; background: #f1f5f9; color: #64748b; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
  .clicky-stats-name { flex: 1; font-size: 14px; color: #1e1e2e; }
  .clicky-stats-rating { font-size: 12px; color: #f59e0b; }
  
  /* ============================================ */
  /* CATEGORY PILLS */
  /* ============================================ */
  .clicky-category-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .clicky-category-pill { background: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
  .clicky-category-pill:hover { background: #6366f1; color: white; }
  
  /* ============================================ */
  /* PRODUCT DETAIL */
  /* ============================================ */
  .clicky-product-detail { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
  .clicky-detail-header { display: flex; gap: 16px; margin-bottom: 16px; }
  .clicky-detail-logo { width: 80px; height: 80px; border-radius: 14px; object-fit: cover; }
  .clicky-detail-name { font-size: 20px; font-weight: 700; color: #1e1e2e; margin: 0 0 4px 0; }
  .clicky-detail-tagline { font-size: 14px; color: #64748b; margin: 0 0 8px 0; }
  .clicky-detail-description { font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 16px 0; }
  .clicky-detail-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 13px; color: #64748b; margin-bottom: 16px; }
  .clicky-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .clicky-tag { background: #f1f5f9; color: #64748b; padding: 3px 8px; border-radius: 4px; font-size: 11px; }
  .clicky-team { margin-bottom: 16px; }
  .clicky-team h5 { font-size: 13px; color: #64748b; margin: 0 0 8px 0; }
  .clicky-team-member { font-size: 13px; color: #475569; }
  .clicky-detail-cta { display: inline-block; background: #6366f1; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; transition: background 0.2s; }
  .clicky-detail-cta:hover { background: #4f46e5; }
  
  /* ============================================ */
  /* UTILITY STYLES */
  /* ============================================ */
  .clicky-rating { color: #f59e0b; font-weight: 500; }
  .clicky-categories { color: #94a3b8; }
  .clicky-empty { color: #94a3b8; font-style: italic; text-align: center; padding: 20px; }
  .clicky-error { color: #ef4444; background: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fecaca; }
  .clicky-section { margin-bottom: 16px; }
  .clicky-title { font-size: 15px; font-weight: 600; margin-bottom: 10px; color: #1e1e2e; }
  .clicky-list { padding-left: 20px; color: #475569; }
  .clicky-badge { display: inline-block; background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin: 2px; color: #64748b; }
  
  /* ============================================ */
  /* PLATFORM STATS */
  /* ============================================ */
  .clicky-platform-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .clicky-stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: center; }
  .clicky-stat-value { display: block; font-size: 28px; font-weight: 700; color: #6366f1; }
  .clicky-stat-label { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
  
  /* ============================================ */
  /* FOUNDER GRID */
  /* ============================================ */
  .clicky-founder-grid { display: flex; flex-direction: column; gap: 12px; }
`,g=t=>`
  <div class="clicky-header">
    <span>${t==="full"?"REX (Actions)":"AIRA (Records)"}</span>
    <span id="clicky-toggle">_</span>
  </div>
  <div class="clicky-body" id="clicky-results">
    <div id="clicky-suggestions"></div>
  </div>
  <div class="clicky-input-area">
    <input type="text" class="clicky-input" id="clicky-input" placeholder="${t==="full"?"Ask REX to perform actions...":"Ask AIRA about records..."}" />
    <button class="clicky-btn" id="clicky-send">Ask</button>
  </div>
`,h=t=>{const e=t.persona==="AIRA"?"aira":"rex",i=Math.round(t.confidence*100);return`
    <div class="clicky-persona-response ${e}">
        <div class="response-header">
            <span class="response-persona">${t.persona||"SYSTEM"}</span>
            <span class="response-confidence" title="Confidence: ${i}%">
                <span class="confidence-bar" style="width: ${i}%"></span>
            </span>
        </div>
        <div class="response-answer">${t.answer}</div>
        ${t.source&&t.source.length>0?`
            <div class="response-source">
                Source: ${t.source.join(", ")}
            </div>
        `:""}
        ${t.notes?`<div class="response-notes">${t.notes}</div>`:""}
    </div>
    `},y=t=>`<p id="${t}" style="color:#666; font-style:italic;">Thinking...</p>`,d=t=>{const e=document.createElement("p");return e.className="clicky-error",e.textContent=t,e};class p{constructor(e){this.config=null,this.api=null,this.shadowRoot=null,this.host=null,this.selectedPersona="AIRA",e&&this.init(e)}init(e){if(this.config){console.warn("Clicky already initialized");return}if(!e||!e.token){console.error("Clicky: Auth token is required.");return}this.config={mode:"mini",serverUrl:"http://localhost:5003",...e},this.api=new a(this.config.serverUrl,this.config.token),this.config.mode==="full"?this.selectedPersona="REX":this.selectedPersona="AIRA",console.log("[Foundry AI] Core Initialized. Persona:",this.selectedPersona)}mount(){let e=null;const i=this.config.containerId;if(i&&(typeof i=="string"?e=document.getElementById(i):i instanceof HTMLElement&&(e=i)),!e)return!1;if(this.host)return this.host.classList.add("embedded"),e.appendChild(this.host),!0;const o=document.createElement("div");o.id="clicky-host",o.classList.add("embedded"),e.appendChild(o),this.host=o,this.shadowRoot=o.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=x,this.shadowRoot.appendChild(n);const r=document.createElement("div");return r.className=`clicky-ui ${this.config.mode}`,r.innerHTML=g(this.config.mode),this.shadowRoot.appendChild(r),this.bindEvents(r),!0}bindEvents(e){const i=this.shadowRoot.getElementById("clicky-input"),o=this.shadowRoot.getElementById("clicky-send"),n=this.shadowRoot.getElementById("clicky-toggle");o.addEventListener("click",()=>this.handlePersonaQuery(i.value)),i.addEventListener("keypress",r=>{r.key==="Enter"&&this.handlePersonaQuery(i.value)}),n.addEventListener("click",()=>{e.classList.toggle("mini"),e.classList.toggle("minimized"),e.classList.contains("minimized")?e.style.height="48px":e.style.height=""})}async handlePersonaQuery(e){const i=this.shadowRoot.getElementById("clicky-input"),o=this.shadowRoot.getElementById("clicky-results"),n=e.trim();if(!n)return;const r="loading-"+Date.now();o.insertAdjacentHTML("beforeend",y(r)),o.scrollTop=o.scrollHeight,i.value="";try{const l=await this.api.askPersona(n,this.selectedPersona,this.config.productId);console.log("[Foundry AI] API Response:",l);const s=l.data||l,f=this.shadowRoot.getElementById(r);if(f&&f.remove(),s&&s.answer){const k=h(s);o.insertAdjacentHTML("beforeend",k)}else console.error("[Foundry AI] Invalid response format:",s),o.appendChild(d("Received invalid response from AI."))}catch(l){console.error("[Foundry AI] Error:",l);const s=this.shadowRoot.getElementById(r);s&&s.remove(),o.appendChild(d("Beep boop. My brain is unplugged."))}o.scrollTop=o.scrollHeight}toggle(){const e=this.shadowRoot?this.shadowRoot.querySelector(".clicky-ui"):null;e&&(e.classList.contains("minimized")?(e.classList.remove("minimized","mini"),e.style.height=""):(e.classList.add("minimized","mini"),e.style.height="48px"))}open(){const e=this.shadowRoot?this.shadowRoot.querySelector(".clicky-ui"):null;e&&(e.classList.remove("minimized","mini"),e.style.height="")}}const u=p;window.ClickyBot=p,c.ClickyBot=u,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=clickysdk.js.map
