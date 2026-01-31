(function(r,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(r=typeof globalThis<"u"?globalThis:r||self,l(r.ClickyBot={}))})(this,(function(r){"use strict";class l{constructor(e,t){this.serverUrl=e,this.token=t}async query(e,t){const i=await fetch(`${this.serverUrl}/api/query`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({query:e,context:t})});if(!i.ok)throw new Error(`API Error: ${i.statusText}`);return await i.json()}}const x=`
  :host { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  
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
`,f=o=>`
  <div class="clicky-header">
    <span>Clicky AI</span>
    <span id="clicky-toggle">_</span>
  </div>
  <div class="clicky-body" id="clicky-results">
    <p>Hello! I'm Clicky. Ask me anything about foundry products.</p>
    <div id="clicky-suggestions"></div>
  </div>
  <div class="clicky-input-area">
    <input type="text" class="clicky-input" id="clicky-input" placeholder="Ask a question..." />
    <button class="clicky-btn" id="clicky-send">Go</button>
  </div>
`,g=o=>`<p id="${o}" style="color:#666; font-style:italic;">Thinking...</p>`,y=o=>{const e=document.createElement("p");return e.className="clicky-error",e.textContent=o,e},k=o=>{const e=document.createElement("div");return Object.assign(e.style,{marginTop:"10px",padding:"8px",background:"#eef",borderRadius:"4px"}),e.textContent=o,e},h=(o,e)=>{const t=document.createElement("div");return t.style.marginTop="10px",o.forEach(i=>{const c=document.createElement("button");c.textContent=i,Object.assign(c.style,{margin:"2px",fontSize:"0.8em",background:"none",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",padding:"2px 6px"}),c.onclick=()=>e(i),t.appendChild(c)}),t};class s{constructor(e){this.config=null,this.api=null,this.shadowRoot=null,e&&this.init(e)}init(e){if(this.config){console.warn("Clicky already initialized");return}if(!e||!e.token){console.error("Clicky: Auth token is required.");return}this.config={mode:"mini",serverUrl:"http://localhost:5003",...e},this.api=new l(this.config.serverUrl,this.config.token),console.log("Clicky Core Initialized"),this.mount()}mount(){const e=document.createElement("div");e.id="clicky-host",document.body.appendChild(e),this.shadowRoot=e.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=x,this.shadowRoot.appendChild(t);const i=document.createElement("div");i.className=`clicky-ui ${this.config.mode}`,i.innerHTML=f(this.config.mode),this.shadowRoot.appendChild(i),this.bindEvents(i)}bindEvents(e){const t=this.shadowRoot.getElementById("clicky-input"),i=this.shadowRoot.getElementById("clicky-send"),c=this.shadowRoot.getElementById("clicky-toggle");i.addEventListener("click",()=>this.handleQuery(t.value)),t.addEventListener("keypress",a=>{a.key==="Enter"&&this.handleQuery(t.value)}),c.addEventListener("click",()=>{e.classList.toggle("mini"),e.classList.toggle("minimized"),e.classList.contains("minimized")?e.style.height="40px":e.style.height=""})}async handleQuery(e){const t=this.shadowRoot.getElementById("clicky-input"),i=this.shadowRoot.getElementById("clicky-results"),c=e.trim();if(!c)return;const a="loading-"+Date.now();i.insertAdjacentHTML("beforeend",g(a)),i.scrollTop=i.scrollHeight,t.value="";try{const n=await this.api.query(c,this.config.context),d=this.shadowRoot.getElementById(a);d&&d.remove(),i.insertAdjacentHTML("beforeend",n.html),n.summary&&i.appendChild(k(n.summary)),n.suggestions&&n.suggestions.length&&i.appendChild(h(n.suggestions,p=>{t.value=p,this.handleQuery(p)}))}catch(n){console.error(n);const d=this.shadowRoot.getElementById(a);d&&d.remove(),i.appendChild(y("Connection failed."))}i.scrollTop=i.scrollHeight}}const u=s;window.ClickyBot=s,r.ClickyBot=u,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=clickysdk.js.map
