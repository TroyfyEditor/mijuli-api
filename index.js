<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
<title>miJuli</title>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
<style>
:root{
  --bg:#000;
  --surface:#0f0f0f;
  --surface2:#181818;
  --surface3:#222;
  --border:#2a2a2a;
  --white:#fff;
  --muted:#A6A69E;
  --blue:#A6A69E;
  --blue-dim:rgba(166,166,158,.12);
  --blue-border:rgba(166,166,158,.3);
  --red:#ef4444;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{height:100%;background:var(--bg);overflow:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',sans-serif;color:var(--white)}
.app{height:100vh;height:100dvh;max-width:430px;margin:0 auto;display:flex;flex-direction:column;position:relative;overflow:hidden}

/* ── PAGES ── */
.page{display:none;flex-direction:column;flex:1;overflow:hidden;padding-bottom:72px}
.page.active{display:flex}
.page.no-nav{padding-bottom:0}

/* ── AUTH ── */
.auth-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 28px}
.auth-logo{font-size:38px;font-weight:700;letter-spacing:-.8px;margin-bottom:6px}
.auth-tag{font-size:13px;color:var(--muted);margin-bottom:40px}
.auth-tabs{display:flex;background:var(--surface2);border-radius:12px;padding:3px;width:100%;margin-bottom:24px}
.atab{flex:1;padding:10px;font-size:14px;font-weight:500;background:none;border:none;color:var(--muted);cursor:pointer;font-family:inherit;border-radius:9px;transition:all .15s}
.atab.on{background:var(--surface3);color:var(--white)}
.afield{width:100%;margin-bottom:12px}
.afield label{display:block;font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
.afield input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:13px 16px;font-size:15px;color:var(--white);outline:none;font-family:inherit}
.afield input:focus{border-color:var(--blue)}
.auth-err{font-size:13px;color:var(--red);min-height:18px;margin-bottom:10px;text-align:center}
.btn-auth{width:100%;background:var(--blue);border:none;border-radius:14px;padding:16px;font-size:16px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit}
.btn-auth:active{opacity:.7}
.btn-auth:disabled{opacity:.4}

/* ── TOP BAR ── */
.topbar{display:flex;align-items:center;padding:12px 16px 8px;flex-shrink:0;border-bottom:0.5px solid #A6A69E;}
.topbar-title{font-size:18px;font-weight:700;letter-spacing:-.3px;flex:1}
.ticon{width:36px;height:36px;background:var(--surface2);border:none;border-radius:50%;color:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ticon:active{opacity:.5}
.ticon svg{width:18px;height:18px}
.ticon-gap{width:36px;flex-shrink:0}

/* ── SEARCH BAR ── */
.search-wrap{padding:0 16px 10px;flex-shrink:0}
.search-box{display:flex;align-items:center;background:var(--surface2);border-radius:12px;padding:10px 14px;gap:8px}
.search-box svg{width:16px;height:16px;color:var(--muted);flex-shrink:0}
.search-box input{flex:1;background:none;border:none;outline:none;font-size:14px;color:var(--white);font-family:inherit}
.search-box input::placeholder{color:var(--muted)}

/* ── HOME LIST ── */
.home-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 16px 16px}
.date-group{margin-bottom:20px}
.date-lbl{font-size:13px;font-weight:600;color:var(--white);margin-bottom:10px;padding:0 2px}
.rec-card{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:6px;cursor:pointer;text-align:left;margin-bottom:8px}
.rec-card:active{opacity:.6}
.rec-card-title{font-size:16px;font-weight:500;color:var(--white)}
.rec-card-meta{font-size:12px;color:var(--muted);display:flex;gap:8px;align-items:center}
.rec-card-preview{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.empty-state{display:flex;flex-direction:column;align-items:center;padding:80px 0;gap:10px;text-align:center}
.empty-state p:first-child{font-size:16px;font-weight:500;color:var(--muted)}
.empty-state p:last-child{font-size:13px;color:var(--border)}

/* ── BOTTOM NAV ── */
.bottom-nav{position:absolute;bottom:0;left:0;right:0;height:72px;background:var(--bg);border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-around;padding:0 20px 8px;z-index:50}
.nav-btn{background:none;border:none;color:var(--muted);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;font-family:inherit;padding:6px 20px}
.nav-btn.on{color:var(--white)}
.nav-btn svg{width:22px;height:22px}
.nav-rec-btn{width:52px;height:52px;border-radius:50%;background:var(--blue);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-bottom:4px}
.nav-rec-btn svg{width:22px;height:22px}
.nav-rec-btn:active{opacity:.7}

/* ── RECORD PAGE ── */
.rec-page{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 24px 0;gap:28px}
.waveform{width:100%;height:52px;display:flex;align-items:center;justify-content:center;gap:3px;opacity:0;transition:opacity .3s}
.waveform.show{opacity:1}
.wbar{width:4px;border-radius:2px;background:var(--blue);height:5px;transition:height .07s}
.rec-ring{position:relative;display:flex;align-items:center;justify-content:center}
.rpulse{position:absolute;width:100px;height:100px;border-radius:50%;background:var(--blue);opacity:0}
.rec-ring.on .rpulse{animation:rip 1.8s ease-out infinite}
@keyframes rip{0%{transform:scale(1);opacity:.25}100%{transform:scale(2.1);opacity:0}}
.rbtn{width:80px;height:80px;border-radius:50%;background:var(--blue);border:2px solid rgba(166,166,158,.4);display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;z-index:1;transition:transform .1s,background .2s}
.rbtn:active{transform:scale(.92)}
.rbtn svg{width:28px;height:28px}
.rec-ring.paused .rbtn{background:var(--surface2);border-color:var(--border)}
.rec-timer{font-size:48px;font-weight:300;letter-spacing:3px;font-variant-numeric:tabular-nums}
.rec-hint{font-size:13px;color:var(--muted)}
.rec-ctrls{display:flex;align-items:center;justify-content:center;gap:28px}
.cbtn{width:54px;height:54px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center}
.cbtn:active{opacity:.5}
.cbtn svg{width:20px;height:20px}
.rec-foot{padding:16px 24px 40px;display:flex;gap:10px;flex-shrink:0}
.btn-cancel{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:15px;font-size:15px;font-weight:500;color:var(--white);cursor:pointer;font-family:inherit}
.btn-cancel:active{opacity:.5}
.btn-save{flex:2;background:var(--blue);border:none;border-radius:14px;padding:15px;font-size:15px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit}
.btn-save:active{opacity:.7}

/* ── TRANSCRIBING ── */
.tr-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 32px;gap:20px;text-align:center}


.tr-body h3{font-size:20px;font-weight:600}
.tr-body p{font-size:13px;color:var(--muted);line-height:1.65}
.dots{display:flex;gap:5px;justify-content:center;margin-top:4px}
.dots span{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:dt 1.4s infinite}
.dots span:nth-child(2){animation-delay:.2s}
.dots span:nth-child(3){animation-delay:.4s}
@keyframes dt{0%,80%,100%{opacity:.2;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}

/* ── DETAIL PAGE ── */
.detail-hdr{padding:14px 16px 0;flex-shrink:0}
.detail-back{background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;font-family:inherit;display:flex;align-items:center;gap:6px;margin-bottom:12px}
.detail-back:active{opacity:.5}
.detail-back svg{width:18px;height:18px}
.detail-title{font-size:22px;font-weight:700;letter-spacing:-.4px;margin-bottom:6px;color:var(--white)}
.detail-meta{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.detail-meta span{display:flex;align-items:center;gap:4px}
.detail-meta svg{width:13px;height:13px}

/* detail tabs */
.dtabs{display:flex;border-bottom:1px solid var(--border);padding:0 16px;flex-shrink:0}
.dtab{flex:1;background:none;border:none;border-bottom:2px solid transparent;color:var(--muted);font-size:14px;font-weight:500;padding:10px 4px 11px;cursor:pointer;font-family:inherit;transition:all .15s}
.dtab.on{color:var(--white);border-bottom-color:var(--blue)}

/* tab content */
.tab-content{display:none;flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:20px 16px 20px}
.tab-content.active{display:block}

/* summary tab */
.sum-section{margin-bottom:24px}
.sum-section-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.sum-section-title{font-size:16px;font-weight:600;color:var(--white)}
.copy-btn{background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;display:flex;align-items:center;gap:5px;font-size:12px;font-family:inherit}
.copy-btn:active{opacity:.5}
.copy-btn svg{width:15px;height:15px}
.sum-text{font-size:14px;line-height:1.75;color:rgba(255,255,255,.82);white-space:pre-wrap}
.sum-empty{font-size:14px;color:var(--muted);font-style:italic}
.action-item{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}
.action-item:last-child{border-bottom:none}
.ai-check{width:20px;height:20px;border:1.5px solid var(--muted);border-radius:5px;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-top:1px}
.ai-check.done{background:var(--blue);border-color:var(--blue)}
.ai-check svg{width:12px;height:12px;display:none}
.ai-check.done svg{display:block}
.ai-text{font-size:14px;color:rgba(255,255,255,.82);line-height:1.5;flex:1}
.ai-text.done{text-decoration:line-through;color:var(--muted)}
.add-action-btn{display:flex;align-items:center;gap:8px;background:none;border:none;color:var(--blue);font-size:14px;cursor:pointer;font-family:inherit;padding:10px 0}
.add-action-btn svg{width:16px;height:16px}
.outline-section{margin-bottom:20px}
.outline-section-title{font-size:14px;font-weight:600;color:var(--white);margin-bottom:8px;display:flex;gap:8px;align-items:baseline}
.outline-ts{font-size:12px;color:var(--blue);font-weight:400}
.outline-bullet{font-size:13px;color:rgba(255,255,255,.75);line-height:1.6;padding:3px 0 3px 16px;position:relative}
.outline-bullet::before{content:'•';position:absolute;left:4px;color:var(--muted)}
.sum-gen-btn{width:100%;background:var(--blue);border:none;border-radius:14px;padding:14px;font-size:15px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit;margin-top:8px}
.sum-gen-btn:active{opacity:.7}
.sum-gen-btn:disabled{opacity:.35}

/* transcript tab */
.tr-lang{display:flex;gap:6px;margin-bottom:16px}
.lbtn{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:8px;font-size:13px;font-weight:500;color:var(--muted);cursor:pointer;font-family:inherit;transition:all .15s}
.lbtn.on{background:var(--blue-dim);border-color:var(--blue-border);color:var(--white)}
.tr-text{font-size:14px;line-height:1.8;color:rgba(255,255,255,.82);white-space:pre-wrap;margin-bottom:12px;word-break:break-word}
.tr-empty{font-size:14px;color:var(--muted);font-style:italic;margin-bottom:12px}
.tr-actions{display:flex;gap:8px;margin-bottom:16px}
.tr-icon-btn{width:44px;height:44px;border-radius:12px;background:var(--surface2);border:1px solid var(--border);color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.tr-icon-btn:active{opacity:.5}
.tr-icon-btn:disabled{opacity:.25;cursor:not-allowed}
.tr-icon-btn.on{background:var(--blue-dim);border-color:var(--blue-border);color:var(--white)}
.tr-icon-btn svg{width:18px;height:18px}
.highlighted-word{background:rgba(255,220,0,.3);border-radius:2px;padding:0 1px;cursor:pointer}
.tap-word{cursor:pointer;border-radius:2px;padding:0;display:inline;line-height:inherit;font-size:inherit}
.tap-word.hl{background:rgba(255,220,0,.35);color:#fff;border-radius:2px}
.btn-pri{flex:1;background:var(--blue);border:none;border-radius:12px;padding:12px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit}
.btn-pri:active{opacity:.7}
.btn-pri:disabled{opacity:.3}
.btn-sec{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px;font-size:14px;font-weight:500;color:var(--white);cursor:pointer;font-family:inherit}
.btn-sec:active{opacity:.5}
.btn-sec:disabled{opacity:.3}

/* sticky player */
.sticky-player{background:var(--surface);border-top:1px solid var(--border);padding:12px 16px 16px;flex-shrink:0}
.player-time-row{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:6px;font-variant-numeric:tabular-nums}
.ptrack{height:3px;background:var(--border);border-radius:2px;margin-bottom:12px;cursor:pointer}
.pfill{height:100%;background:var(--blue);border-radius:2px;width:0%;transition:width .08s linear}
.player-btns{display:flex;justify-content:center;align-items:center;gap:20px}
.pbtn-sm{width:40px;height:40px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center}
.pbtn-sm:disabled{opacity:.25}
.pbtn-sm svg{width:16px;height:16px}
.pbtn-play{width:52px;height:52px;border-radius:50%;background:var(--blue);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center}
.pbtn-play:disabled{opacity:.25}
.pbtn-play svg{width:20px;height:20px}
.pbtn-sm:active,.pbtn-play:active{opacity:.6}

/* comments tab */
.comment-list{display:flex;flex-direction:column;gap:0}
.comment{padding:14px 0;border-bottom:1px solid var(--border)}
.comment:last-child{border-bottom:none}
.comment-author{font-size:12px;font-weight:600;color:var(--muted);margin-bottom:4px}
.comment-text{font-size:14px;color:rgba(255,255,255,.85);line-height:1.55}
.comment-empty{font-size:14px;color:var(--muted);font-style:italic;padding:20px 0}
.add-comment-wrap{padding-top:16px;border-top:1px solid var(--border);margin-top:8px}
.add-comment-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 14px;font-size:14px;color:var(--white);outline:none;font-family:inherit;resize:none;min-height:80px;display:block;-webkit-appearance:none}
.add-comment-input:focus{border-color:var(--blue)}
.add-comment-btn{margin-top:8px;background:var(--blue);border:none;border-radius:12px;padding:11px 20px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit}
.add-comment-btn:active{opacity:.7}

/* danger */
.btn-del{width:100%;background:none;border:1px solid rgba(239,68,68,.3);border-radius:14px;padding:13px;font-size:15px;font-weight:500;color:var(--red);cursor:pointer;font-family:inherit;margin-top:16px}
.btn-del:active{opacity:.55}

/* ── ACCOUNT PAGE ── */
.account-body{flex:1;overflow-y:auto;padding:0 16px 32px}
.acc-sec{padding:20px 0;border-bottom:1px solid var(--border)}
.acc-sec:last-child{border-bottom:none}
.acc-lbl{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:14px}
.acc-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
.acc-row-l{font-size:15px}
.acc-row-v{font-size:13px;color:var(--muted);max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.acc-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 14px;font-size:15px;color:var(--white);outline:none;font-family:inherit;margin-bottom:10px}
.acc-input:focus{border-color:var(--blue)}
.acc-remember{display:flex;align-items:center;gap:10px;padding:4px 0 14px;cursor:pointer;font-size:14px;color:var(--muted)}
.acc-remember input{width:18px;height:18px;accent-color:var(--blue);cursor:pointer}
.acc-save-btn{width:100%;background:var(--blue);border:none;border-radius:12px;padding:13px;font-size:15px;font-weight:600;color:#fff;cursor:pointer;font-family:inherit}
.acc-save-btn:active{opacity:.7}

/* ── FULL SCREEN MODAL ── */
.fs-modal{position:fixed;inset:0;background:var(--bg);z-index:200;display:none;flex-direction:column}
.fs-modal.open{display:flex}
.fs-modal-body{flex:1;padding:16px 16px 0;display:flex;flex-direction:column}
.fs-modal-textarea{flex:1;width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:16px;padding:16px;font-size:15px;color:var(--white);outline:none;font-family:inherit;resize:none;line-height:1.7;-webkit-appearance:none}
.fs-modal-textarea:focus{border-color:var(--blue)}
.fs-modal-foot{display:flex;gap:10px;padding:16px;flex-shrink:0}
.fs-modal-cancel{flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:14px;color:var(--white);font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;padding:14px}
.fs-modal-cancel:active{opacity:.5}
.fs-modal-save{flex:2;background:var(--blue);border:none;border-radius:14px;color:#fff;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;padding:14px}
.fs-modal-save:active{opacity:.7}

/* ── SPINNER / TOAST ── */
.spin{display:inline-block;width:13px;height:13px;border:2px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:sp .65s linear infinite;vertical-align:middle;margin-right:7px}
@keyframes sp{to{transform:rotate(360deg)}}
.toast{position:fixed;bottom:84px;left:50%;transform:translateX(-50%);background:var(--surface2);border:1px solid var(--border);color:var(--white);font-size:13px;font-weight:500;padding:10px 20px;border-radius:100px;opacity:0;transition:opacity .18s;pointer-events:none;z-index:999;white-space:nowrap}
.toast.show{opacity:1}
</style>
</head>
<body>
<!-- SPLASH -->
<div id="splash" style="position:fixed;inset:0;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;z-index:9999;transition:opacity .5s ease">
  <div style="font-size:38px;font-weight:700;letter-spacing:-.8px;color:#A6A69E;opacity:0;transition:opacity .3s ease" id="splash-logo">miJuli</div>
  <div id="splash-tagline" style="font-size:13px;color:rgba(166,166,158,0);transition:color .3s ease;letter-spacing:.02em">Listen. Transcribe. Summarize.</div>
</div>
<div class="app">

<!-- ── AUTH ── -->
<div id="p-auth" class="page no-nav">
  <div class="auth-wrap">
    <div class="auth-logo" style="color:#A6A69E">miJuli</div>
    <div class="auth-tag">Listen. Transcribe. Summarize.</div>
    <div class="auth-tabs">
      <button class="atab on" id="atab-in" onclick="switchAuth('login')">Sign in</button>
      <button class="atab" id="atab-up" onclick="switchAuth('register')">Register</button>
    </div>
    <div class="afield"><label>Nickname</label><input type="text" id="a-nick" placeholder="yourname" autocomplete="username"/></div>
    <div class="afield" id="a-email-wrap" style="display:none"><label>Email</label><input type="email" id="a-email" placeholder="you@email.com"/></div>
    <div class="afield"><label>Password</label><input type="password" id="a-pass" placeholder="••••••••"/></div>
    <div class="auth-err" id="a-err"></div>
    <button class="btn-auth" id="btn-auth-do" onclick="doAuth()">Sign in</button>
  </div>
</div>

<!-- ── HOME ── -->
<div id="p-home" class="page">
  <div class="topbar">
    <div class="topbar-title" style="color:#A6A69E">miJuli</div>
    <button class="ticon" onclick="goSearch()" title="Search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </button>
  </div>
  <div class="home-scroll" id="home-list"></div>
</div>

<!-- ── SEARCH ── -->
<div id="p-search" class="page">
  <div class="topbar">
    <button class="ticon" onclick="show('p-home')" style="margin-right:10px">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="topbar-title">Search</div>
    <div class="ticon-gap"></div>
  </div>
  <div class="search-wrap">
    <div class="search-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="search-input" placeholder="Search recordings or transcript…" oninput="doSearch(this.value)" autofocus/>
    </div>
  </div>
  <div class="home-scroll" id="search-list"></div>
</div>

<!-- ── RECORD ── -->
<div id="p-record" class="page no-nav">
  <div class="topbar">
    <button class="ticon" onclick="cancelRecord()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="topbar-title" style="text-align:center">New recording</div>
    <div class="ticon-gap"></div>
  </div>
  <div class="rec-page">
    <div class="waveform" id="waveform">
      <div class="wbar" id="b1"></div><div class="wbar" id="b2"></div><div class="wbar" id="b3"></div>
      <div class="wbar" id="b4"></div><div class="wbar" id="b5"></div><div class="wbar" id="b6"></div>
      <div class="wbar" id="b7"></div><div class="wbar" id="b8"></div><div class="wbar" id="b9"></div>
      <div class="wbar" id="b10"></div><div class="wbar" id="b11"></div><div class="wbar" id="b12"></div>
      <div class="wbar" id="b13"></div><div class="wbar" id="b14"></div><div class="wbar" id="b15"></div>
      <div class="wbar" id="b16"></div><div class="wbar" id="b17"></div><div class="wbar" id="b18"></div>
      <div class="wbar" id="b19"></div><div class="wbar" id="b20"></div>
    </div>
    <div class="rec-ring" id="rec-ring" onclick="toggleRec()">
      <div class="rpulse"></div>
      <div class="rbtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </div>
    </div>
    <div class="rec-timer" id="rtimer">00:00</div>
    <div class="rec-hint" id="rhint">Tap to start recording</div>
    <div class="rec-ctrls" id="rctrls" style="display:none">
      <button class="cbtn" id="btn-pause" onclick="pauseRec()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
      </button>
      <button class="cbtn" onclick="stopRec()">
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
      </button>
    </div>
  </div>
  <div class="rec-foot" id="rec-foot" style="display:none">
    <button class="btn-cancel" onclick="cancelRecord()">Cancel</button>
    <button class="btn-save" onclick="saveRecord()">Save & Transcribe</button>
  </div>
</div>

<!-- ── TRANSCRIBING ── -->
<div id="p-transcribing" class="page no-nav">
  <div class="tr-body">
    <img src="https://i.imgur.com/IiGYaxv.gif" style="width:140px;height:140px;object-fit:contain;border-radius:16px" alt="robot"/>
    <h3>Listening &amp; transcribing…</h3>
    <p id="tr-estimate" style="font-size:13px;color:var(--muted)">Your text will appear here once ready</p>
    <div class="dots"><span></span><span></span><span></span></div>
  </div>
</div>

<!-- ── DETAIL ── -->
<div id="p-detail" class="page no-nav" style="padding-bottom:0">
  <div class="detail-hdr">
    <button class="detail-back" onclick="goHome()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      Back
    </button>
    <div class="detail-title" id="d-title-disp" onclick="editTitle()">Untitled</div>
    <div class="detail-meta">
      <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span id="d-date">–</span></span>
      <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span id="d-dur">–</span></span>
    </div>
  </div>
  <div class="dtabs">
    <button class="dtab on" id="dtab-sum" onclick="switchDTab('summary')">Summary</button>
    <button class="dtab" id="dtab-tr" onclick="switchDTab('transcript')">Transcript</button>
    <button class="dtab" id="dtab-com" onclick="switchDTab('comments')">Comments</button>
  </div>

  <!-- SUMMARY TAB -->
  <div class="tab-content active" id="tab-summary">
    <div class="sum-section">
      <div class="sum-section-hdr">
        <div class="sum-section-title">Overview</div>
        <button class="copy-btn" onclick="copySummarySection('overview')" id="copy-overview-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div id="sum-overview" class="sum-empty">No summary yet.</div>
    </div>
    <div class="sum-section">
      <div class="sum-section-hdr">
        <div class="sum-section-title">Action Items</div>
      </div>
      <div id="sum-actions"></div>
      <button class="add-action-btn" onclick="addActionItem()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add action item
      </button>
    </div>
    <div class="sum-section">
      <div class="sum-section-hdr">
        <div class="sum-section-title">Outline</div>
      </div>
      <div id="sum-outline" class="sum-empty">No outline yet.</div>
    </div>

    <button class="sum-gen-btn" id="btn-edit-sum" onclick="editSummary()" style="background:var(--surface2);border:1px solid var(--border);color:var(--white);display:none;margin-top:8px">Edit summary</button>
    <button class="btn-del" onclick="deleteRec()">Delete recording</button>
  </div>

  <!-- TRANSCRIPT TAB -->
  <div class="tab-content" id="tab-transcript" style="display:flex;flex-direction:column;padding:0">
    <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:16px">
      <div id="d-tr" class="tr-empty">No transcript yet.</div>
    </div>
    <div style="background:var(--bg);border-top:1px solid var(--border);padding:12px 16px 16px;flex-shrink:0">
      <div style="display:flex;gap:10px;margin-bottom:10px;justify-content:center">
        <button class="tr-icon-btn" id="btn-edit-tr" onclick="editTranscript()" disabled title="Edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="tr-icon-btn" id="btn-highlight-tr" onclick="toggleHighlight()" title="Highlight">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
        <button class="tr-icon-btn" id="btn-cptr" onclick="copyTranscript()" disabled title="Copy">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
      <div class="tr-lang">
        <button class="lbtn on" id="tab-lt" onclick="setLang('lt')">Lithuanian</button>
        <button class="lbtn" id="tab-en" onclick="setLang('en')">English</button>
      </div>
      <button class="btn-pri" id="btn-tr" onclick="doTranscribe()" style="display:none;width:100%;margin-top:10px">Transcribe</button>
    </div>
    <div class="sticky-player" id="detail-player">
      <div class="player-time-row">
        <span id="p-time">0:00</span>
        <span id="p-dur">0:00</span>
      </div>
      <div class="ptrack" onclick="seekP(event)"><div class="pfill" id="p-fill"></div></div>
      <div class="player-btns">
        <button class="pbtn-sm" onclick="skipBack()" title="−5s">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/><text x="8" y="16" font-size="6" fill="currentColor" stroke="none">5</text></svg>
        </button>
        <button class="pbtn-sm" id="p-stop" onclick="pStop()" disabled>
          <svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
        </button>
        <button class="pbtn-play" id="p-play" onclick="pToggle()" disabled>
          <svg viewBox="0 0 24 24" fill="currentColor" id="p-ico"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
        <button class="pbtn-sm" onclick="skipFwd()" title="+5s">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.5"/><text x="8" y="16" font-size="6" fill="currentColor" stroke="none">5</text></svg>
        </button>
        <button class="pbtn-sm" onclick="addBookmark()" title="Bookmark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- COMMENTS TAB -->
  <div class="tab-content" id="tab-comments">
    <div class="comment-list" id="comment-list"></div>
    <div class="add-comment-wrap">
      <textarea class="add-comment-input" id="comment-input" placeholder="Add a thought…"></textarea>
      <button class="add-comment-btn" onclick="addComment()">Post</button>
    </div>
  </div>
</div>

<!-- ── ACCOUNT ── -->
<div id="p-account" class="page">
  <div class="topbar"><div class="topbar-title">Account</div></div>
  <div class="account-body">
    <div class="acc-sec">
      <div class="acc-lbl">Profile</div>
      <div class="acc-row"><span class="acc-row-l">Nickname</span><span class="acc-row-v" id="s-nick">–</span></div>
      <div class="acc-row"><span class="acc-row-l">Email</span><span class="acc-row-v" id="s-email">–</span></div>
    </div>
    <div class="acc-sec">
      <div class="acc-lbl">OpenAI API Key</div>
      <input class="acc-input" type="password" id="s-key" placeholder="sk-..."/>

      <button class="acc-save-btn" onclick="saveKey()">Save key</button>
    </div>
    <div class="acc-sec">
      <button class="btn-del" onclick="doSignOut()">Sign out</button>
    </div>
  </div>
</div>

<!-- ── BOTTOM NAV ── -->
<div class="bottom-nav" id="bottom-nav">
  <button class="nav-btn on" id="nav-home" onclick="navTo('home')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Home
  </button>
  <button class="nav-rec-btn" onclick="goRecord()" title="Record">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
  </button>
  <button class="nav-btn" id="nav-account" onclick="navTo('account')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    Account
  </button>
</div>

</div><!-- .app -->

<!-- FULL SCREEN EDIT MODAL -->
<div class="fs-modal" id="fs-modal">
  <div class="fs-modal-body">
    <textarea class="fs-modal-textarea" id="fs-modal-textarea" placeholder=""></textarea>
  </div>
  <div class="fs-modal-foot">
    <button class="fs-modal-cancel" onclick="closeModal()">Cancel</button>
    <button class="fs-modal-save" onclick="saveModal()">Save</button>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
firebase.initializeApp({
  apiKey:"AIzaSyAKESj2SOFZED4qGsz_QSpQWSwsVdmFxJY",
  authDomain:"mijuli-e9b11.firebaseapp.com",
  projectId:"mijuli-e9b11",
  storageBucket:"mijuli-e9b11.firebasestorage.app",
  messagingSenderId:"816788640557",
  appId:"1:816788640567:web:4607af34b1e4499426c0b2"
});
const auth=firebase.auth(),db=firebase.firestore();

let user=null,nick='',recId=null,lang='lt';
let mr=null,ms=null,chunks=[],tick=null,rms=0,rstate='idle';
let analyser=null,af=null;
let ael=null,aurl=null,playing=false;
let allRecs=[];

// ── AUTH ──
auth.onAuthStateChanged(async u=>{
  if(u){
    user=u;
    const s=await db.collection('users').doc(u.uid).get();
    nick=s.exists?s.data().nickname:u.email.split('@')[0];
    afterLogin();
  }else{
    user=null;
    hideSplash();
    show('p-auth');
    document.getElementById('bottom-nav').style.display='none';
  }
});

let amode='login';
function switchAuth(m){
  amode=m;
  document.getElementById('atab-in').className='atab'+(m==='login'?' on':'');
  document.getElementById('atab-up').className='atab'+(m==='register'?' on':'');
  document.getElementById('a-email-wrap').style.display=m==='register'?'block':'none';
  document.getElementById('btn-auth-do').textContent=m==='login'?'Sign in':'Create account';
  document.getElementById('a-err').textContent='';
}
async function doAuth(){
  const n=document.getElementById('a-nick').value.trim();
  const p=document.getElementById('a-pass').value;
  const btn=document.getElementById('btn-auth-do');
  if(!n||!p){setErr('Fill in all fields.');return;}
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>';
  try{
    if(amode==='register'){
      const e=document.getElementById('a-email').value.trim();
      if(!e){setErr('Enter email.');btn.disabled=false;btn.textContent='Create account';return;}
      const cr=await auth.createUserWithEmailAndPassword(e,p);
      await db.collection('users').doc(cr.user.uid).set({nickname:n,email:e,createdAt:new Date().toISOString()});
    }else{
      const q=await db.collection('users').where('nickname','==',n).limit(1).get();
      if(q.empty){setErr('Nickname not found.');btn.disabled=false;btn.textContent='Sign in';return;}
      await auth.signInWithEmailAndPassword(q.docs[0].data().email,p);
    }
  }catch(e){
    setErr(e.message.replace('Firebase: ','').replace(/\(auth[^)]*\)/,'').trim());
    btn.disabled=false;btn.textContent=amode==='login'?'Sign in':'Create account';
  }
}
function setErr(m){document.getElementById('a-err').textContent=m;}
async function doSignOut(){await auth.signOut();}

function afterLogin(){
  hideSplash();
  document.getElementById('bottom-nav').style.display='flex';
  loadHomeList();
  show('p-home');
  setNavActive('home');
}

// ── PAGES ──
function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const noNav=['p-auth','p-record','p-transcribing','p-detail'];
  document.getElementById('bottom-nav').style.display=noNav.includes(id)?'none':'flex';
}
function goHome(){unloadAudio();resetHighlightForNewRec();loadHomeList();show('p-home');setNavActive('home');}
function goSearch(){
  document.getElementById('search-input').value='';
  document.getElementById('search-list').innerHTML='';
  show('p-search');
  document.getElementById('search-input').focus();
  setNavActive('');
}
function navTo(tab){
  if(tab==='home'){goHome();}
  else if(tab==='account'){
    document.getElementById('s-nick').textContent=nick;
    document.getElementById('s-email').textContent=user?.email||'–';
    const k=localStorage.getItem('mj_key')||sessionStorage.getItem('mj_key')||'';
    document.getElementById('s-key').value=k;
    show('p-account');
  }
  setNavActive(tab);
}
function setNavActive(tab){
  document.getElementById('nav-home').className='nav-btn'+(tab==='home'?' on':'');
  document.getElementById('nav-account').className='nav-btn'+(tab==='account'?' on':'');
}

// ── API KEY ──
function saveKey(){
  const v=document.getElementById('s-key').value.trim();
  localStorage.setItem('mj_key',v);
  toast('API key saved ✓');
}
function getKey(){return localStorage.getItem('mj_key')||'';}

// ── HOME LIST ──
async function loadHomeList(){
  if(!user)return;
  const snap=await db.collection('users').doc(user.uid).collection('recordings').orderBy('createdAt','desc').get();
  allRecs=snap.docs.map(d=>({id:d.id,...d.data()}));
  renderList(allRecs,'home-list');
}
function renderList(recs,containerId){
  const el=document.getElementById(containerId);
  if(!recs.length){
    el.innerHTML='<div class="empty-state"><p>No recordings yet</p><p>Tap the mic button to start</p></div>';
    return;
  }
  const groups={};
  recs.forEach(r=>{
    const d=new Date(r.createdAt);
    const today=new Date();const yesterday=new Date(today);yesterday.setDate(today.getDate()-1);
    let lbl;
    if(d.toDateString()===today.toDateString())lbl='Today';
    else if(d.toDateString()===yesterday.toDateString())lbl='Yesterday';
    else lbl=d.toLocaleDateString('en-GB',{weekday:'long',month:'long',day:'numeric'});
    if(!groups[lbl])groups[lbl]=[];
    groups[lbl].push(r);
  });
  el.innerHTML=Object.entries(groups).map(([lbl,items])=>
    `<div class="date-group"><div class="date-lbl">${lbl}</div>${items.map(r=>`
      <div class="rec-card" onclick="openDetail('${r.id}')">
        <div class="rec-card-title">${esc(r.title||'Untitled')}</div>
        <div class="rec-card-meta">
          <span>${new Date(r.createdAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
          <span>·</span>
          <span>${ms2t(r.durationMs||0)}</span>
        </div>
        ${r.transcript?`<div class="rec-card-preview">${esc(r.transcript.slice(0,80))}…</div>`:''}
      </div>`).join('')}</div>`
  ).join('');
}

// ── SEARCH ──
function highlight(text,q){
  if(!q||!text)return esc(text||'');
  const regex=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  return esc(text).replace(regex,'<mark style="background:rgba(166,166,158,.35);color:#fff;border-radius:2px;padding:0 2px">$1</mark>');
}
function doSearch(q){
  q=q.trim();
  if(!q){document.getElementById('search-list').innerHTML='';return;}
  const ql=q.toLowerCase();
  const filtered=allRecs.filter(r=>
    (r.title||'').toLowerCase().includes(ql)||
    (r.transcript||'').toLowerCase().includes(ql)||
    (r.transcriptEn||'').toLowerCase().includes(ql)
  );
  renderSearchList(filtered,q,'search-list');
}
function renderSearchList(recs,q,containerId){
  const el=document.getElementById(containerId);
  if(!recs.length){
    el.innerHTML='<div class="empty-state"><p>No results</p><p>Try different words</p></div>';
    return;
  }
  el.innerHTML=recs.map(r=>{
    // Find snippet with highlight around match
    let preview='';
    const ql=q.toLowerCase();
    if(r.transcript&&r.transcript.toLowerCase().includes(ql)){
      const idx=r.transcript.toLowerCase().indexOf(ql);
      const start=Math.max(0,idx-40);
      const end=Math.min(r.transcript.length,idx+q.length+60);
      const snippet=(start>0?'…':'')+r.transcript.slice(start,end)+(end<r.transcript.length?'…':'');
      preview=`<div class="rec-card-preview">${highlight(snippet,q)}</div>`;
    }else if(r.title&&r.title.toLowerCase().includes(ql)){
      preview='';
    }
    return`<div class="rec-card" onclick="openDetail('${r.id}')">
      <div class="rec-card-title">${highlight(r.title||'Untitled',q)}</div>
      <div class="rec-card-meta">
        <span>${new Date(r.createdAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
        <span>·</span>
        <span>${ms2t(r.durationMs||0)}</span>
      </div>
      ${preview}
    </div>`;
  }).join('');
}

// ── RECORD ──
function goRecord(){
  rstate='idle';rms=0;chunks=[];
  document.getElementById('rec-ring').className='rec-ring';
  document.getElementById('rtimer').textContent='00:00';
  document.getElementById('rhint').textContent='Tap to start recording';
  document.getElementById('rctrls').style.display='none';
  document.getElementById('rec-foot').style.display='none';
  document.getElementById('waveform').className='waveform';
  document.getElementById('btn-pause').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  document.getElementById('btn-pause').onclick=pauseRec;
  show('p-record');
}
async function toggleRec(){
  if(rstate!=='idle')return;
  try{
    ms=await navigator.mediaDevices.getUserMedia({audio:true});
    chunks=[];
    const ctx=new AudioContext();
    analyser=ctx.createAnalyser();analyser.fftSize=64;
    ctx.createMediaStreamSource(ms).connect(analyser);
    startWave();
    mr=new MediaRecorder(ms);
    mr.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data);};
    mr.start(100);rstate='recording';rms=0;
    tick=setInterval(()=>{rms+=100;document.getElementById('rtimer').textContent=ms2t(rms);},100);
    document.getElementById('rec-ring').className='rec-ring on';
    document.getElementById('rhint').textContent='Recording — tap to pause';
    document.getElementById('rctrls').style.display='flex';
    document.getElementById('waveform').className='waveform show';
  }catch(e){toast('Microphone unavailable');}
}
function pauseRec(){
  if(rstate!=='recording')return;
  mr.pause();clearInterval(tick);rstate='paused';
  document.getElementById('rec-ring').className='rec-ring paused';
  stopWave();
  document.getElementById('rhint').textContent='Paused — tap to resume';
  document.getElementById('btn-pause').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  document.getElementById('btn-pause').onclick=resumeRec;
}
function resumeRec(){
  if(rstate!=='paused')return;
  mr.resume();
  tick=setInterval(()=>{rms+=100;document.getElementById('rtimer').textContent=ms2t(rms);},100);
  rstate='recording';
  document.getElementById('rec-ring').className='rec-ring on';
  startWave();
  document.getElementById('rhint').textContent='Recording — tap to pause';
  document.getElementById('btn-pause').innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  document.getElementById('btn-pause').onclick=pauseRec;
}
function stopRec(){
  clearInterval(tick);stopWave();
  if(mr&&mr.state!=='inactive')mr.pause();
  rstate='stopped';
  document.getElementById('rec-ring').className='rec-ring paused';
  document.getElementById('rctrls').style.display='none';
  document.getElementById('rec-foot').style.display='flex';
  document.getElementById('rhint').textContent='Done — save or cancel';
}
function cancelRecord(){
  clearInterval(tick);stopWave();
  if(mr&&mr.state!=='inactive')mr.stop();
  ms&&ms.getTracks().forEach(t=>t.stop());
  mr=null;ms=null;rstate='idle';chunks=[];
  goHome();
}
async function saveRecord(){
  if(!chunks.length){toast('Nothing recorded.');return;}
  clearInterval(tick);stopWave();
  const dur=rms;
  const done=async blob=>{
    ms&&ms.getTracks().forEach(t=>t.stop());
    show('p-transcribing');
    // Show estimate based on duration
    const estSec=Math.max(5,Math.round(dur/1000*0.15));
    const estEl=document.getElementById('tr-estimate');
    if(estEl)estEl.textContent='Your text will appear in about '+estSec+(estSec===1?' second':' seconds');
    await autoTranscribe(blob,dur);
  };
  if(mr&&mr.state!=='inactive'){mr.onstop=()=>done(new Blob(chunks,{type:mr.mimeType||'audio/webm'}));mr.stop();}
  else done(new Blob(chunks,{type:'audio/webm'}));
}

// ── WAVEFORM ──
function startWave(){
  const bars=Array.from({length:20},(_,i)=>document.getElementById('b'+(i+1)));
  function draw(){
    if(!analyser)return;
    const d=new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(d);
    bars.forEach((b,i)=>{if(!b)return;const v=d[i%d.length]/255;b.style.height=Math.max(4,Math.round(v*48))+'px';b.style.opacity=0.4+v*0.6;});
    af=requestAnimationFrame(draw);
  }
  draw();
}
function stopWave(){cancelAnimationFrame(af);af=null;Array.from({length:20},(_,i)=>document.getElementById('b'+(i+1))).forEach(b=>{if(b){b.style.height='5px';b.style.opacity='.3';}});}

// ── AUTO TRANSCRIBE ──
async function autoTranscribe(blob,dur){
  try{
    const transcript=await transcribeBlob(blob);
    const id=crypto.randomUUID();
    const now=new Date().toISOString();
    const title='Recording, '+new Date().toLocaleString('en-GB',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    await idbSaveBlob(id,blob);
    const rec={id,title,durationMs:dur,createdAt:now,updatedAt:now,transcript,transcriptEn:null,transcriptionStatus:'completed',summaryData:null,actionItems:[],comments:[]};
    await db.collection('users').doc(user.uid).collection('recordings').doc(id).set(rec);
    recId=id;lang='lt';
    loadAudioBlob(blob);
    // Auto-generate LT summary only (EN translation done on demand when user taps English)
    const k=getKey();
    if(k){
      try{
        const ltSd=await generateSummaryData(transcript,'lt');
        const upd={summaryData:ltSd,updatedAt:new Date().toISOString()};
        await db.collection('users').doc(user.uid).collection('recordings').doc(id).update(upd);
      }catch(e){
        console.warn('LT summary failed:',e);
        toast('Summary generation failed: '+e.message);
      }
    }
    await openDetail(id);
  }catch(err){toast('Error: '+err.message);goHome();}
}
async function translateToEn(transcript,k){
  if(!k)throw new Error('No API key');
  const r=await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+k},
    body:JSON.stringify({model:'gpt-4o',max_tokens:3000,messages:[
      {role:'system',content:'Translate the following Lithuanian transcript to English. Keep names, brands and technical terms as-is. Return only the translated text, no comments.'},
      {role:'user',content:transcript}
    ]})
  });
  const d=await r.json();
  if(!r.ok)throw new Error(d.error?.message||'Translation error');
  const txt=d.choices?.[0]?.message?.content?.trim()||'';
  if(!txt)throw new Error('Empty translation');
  return txt;
}

// ── DETAIL ──
async function openDetail(id){
  recId=id;lang='lt';
  unloadAudio();
  resetHighlightForNewRec();
  show('p-detail');
  switchDTab('summary');
  // Use cached data from allRecs for instant render
  const cached=allRecs.find(r=>r.id===id);
  if(cached){
    renderDetail(cached);
  }else{
    // Clear content only if no cache
    document.getElementById('d-title-disp').textContent='';
    document.getElementById('d-date').textContent='';
    document.getElementById('d-dur').textContent='';
    document.getElementById('d-tr').className='tr-empty';
    document.getElementById('d-tr').textContent='';
    document.getElementById('sum-overview').className='sum-empty';
    document.getElementById('sum-overview').textContent='';
    document.getElementById('sum-actions').innerHTML='';
    document.getElementById('sum-outline').className='sum-empty';
    document.getElementById('sum-outline').textContent='';
    document.getElementById('comment-list').innerHTML='';
  }
  // Load audio immediately from IndexedDB (no wait)
  idbGetBlob(id).then(blob=>{
    if(recId!==id)return;
    if(blob){
      loadAudioBlob(blob);
    }else{
      // Audio not in local storage (old recording or different device)
      document.getElementById('p-time').textContent='Audio not on this device';
    }
  }).catch(()=>{
    document.getElementById('p-time').textContent='Audio unavailable';
  });
  // Fetch fresh data from Firestore in background
  db.collection('users').doc(user.uid).collection('recordings').doc(id).get().then(s=>{
    if(recId!==id)return;
    if(!s.exists){toast('Not found.');goHome();return;}
    const rec=s.data();
    renderDetail(rec);
    // Update cache
    const idx=allRecs.findIndex(r=>r.id===id);
    if(idx>=0)allRecs[idx]=rec;
  });
}
function renderDetail(rec){
  document.getElementById('d-title-disp').textContent=rec.title||'Untitled';
  document.getElementById('d-date').textContent=new Date(rec.createdAt).toLocaleString('en-GB',{weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
  document.getElementById('d-dur').textContent=ms2t(rec.durationMs||0);
  // transcript
  const tr=lang==='lt'?rec.transcript:rec.transcriptEn;
  const tc=document.getElementById('d-tr');
  if(tr){
    tc.className='tr-text';
    tc.textContent=tr;
    delete tc.dataset.wrapped;
    // Always wrap if there are saved highlights for this recording
    const saved=highlightedWords[recId];
    if(saved&&saved.size>0){
      wrapTranscriptWords(tc);
    }else if(highlightMode){
      wrapTranscriptWords(tc);
    }
  }else{tc.className='tr-empty';tc.textContent='No transcript yet.';}
  document.getElementById('btn-cptr').disabled=!tr;
  document.getElementById('btn-edit-tr').disabled=!tr;
  document.getElementById('btn-tr').style.display=tr?'none':'block';
  document.getElementById('tab-lt').className='lbtn'+(lang==='lt'?' on':'');
  document.getElementById('tab-en').className='lbtn'+(lang==='en'?' on':'');
  // summary
  renderSummary(rec);
  // comments
  renderComments(rec.comments||[]);
}
function renderSummary(rec){
  const sd=lang==='lt'?rec.summaryData:rec.summaryDataEn;
  const ov=document.getElementById('sum-overview');
  if(sd?.overview){ov.className='sum-text';ov.textContent=sd.overview;}
  else{ov.className='sum-empty';ov.textContent='No summary yet.';}
  // action items
  const ai=rec.actionItems||[];
  const aic=document.getElementById('sum-actions');
  aic.innerHTML=ai.map((item,i)=>`
    <div class="action-item">
      <div class="ai-check${item.done?' done':''}" onclick="toggleAction(${i})">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="ai-text${item.done?' done':''}" style="flex:1">${esc(item.text)}</div>
      <button onclick="editActionItem(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;flex-shrink:0;display:flex;align-items:center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button onclick="deleteActionItem(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;flex-shrink:0;display:flex;align-items:center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
      </button>
    </div>`).join('');
  // outline
  const ol=document.getElementById('sum-outline');
  if(sd?.outline&&sd.outline.length){
    ol.className='';
    ol.innerHTML=sd.outline.map(sec=>`
      <div class="outline-section">
        <div class="outline-section-title">${esc(sec.title)}<span class="outline-ts">${sec.time||''}</span></div>
        ${(sec.bullets||[]).map(b=>`<div class="outline-bullet">${esc(b)}</div>`).join('')}
      </div>`).join('');
  }else{ol.className='sum-empty';ol.innerHTML='No outline yet.';}
  const hasSummary=!!(sd?.overview);
  const generating=!!(rec._generatingSummary);
  if(!hasSummary&&!generating){
    ov.className='sum-empty';
    ov.textContent='No summary yet.';
  }
  document.getElementById('btn-edit-sum').style.display=hasSummary?'block':'none';
}
function renderComments(comments){
  const el=document.getElementById('comment-list');
  if(!comments.length){el.innerHTML='<div class="comment-empty">No comments yet.</div>';return;}
  el.innerHTML=comments.map((c,i)=>`
    <div class="comment">
      <div style="display:flex;align-items:flex-start;gap:8px">
        <div style="flex:1">
          <div class="comment-author">${esc(c.author)} · ${new Date(c.createdAt).toLocaleString('en-GB',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
          <div class="comment-text">${esc(c.text)}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;padding-top:2px">
          <button onclick="editComment(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;display:flex;align-items:center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onclick="deleteComment(${i})" style="background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;display:flex;align-items:center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
    </div>`).join('');
}
async function editComment(i){
  const rec=await getRec();if(!rec)return;
  const current=(rec.comments||[])[i]?.text||'';
  openModal('Edit comment',current,async(val)=>{
    if(!val.trim()||val.trim()===current)return;
    const rec2=await getRec();if(!rec2)return;
    const comments=[...(rec2.comments||[])];
    comments[i]={...comments[i],text:val.trim()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({comments});
    renderComments(comments);
    toast('Saved ✓');
  });
}
async function deleteComment(i){
  if(!confirm('Delete this comment?'))return;
  const rec=await getRec();if(!rec)return;
  const comments=[...(rec.comments||[])];
  comments.splice(i,1);
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({comments});
  renderComments(comments);
  toast('Deleted.');
}

const DTAB_IDS={summary:'dtab-sum',transcript:'dtab-tr',comments:'dtab-com'};
function switchDTab(tab){
  ['summary','transcript','comments'].forEach(t=>{
    const tc=document.getElementById('tab-'+t);
    const btn=document.getElementById(DTAB_IDS[t]);
    if(tc){tc.classList.remove('active');tc.style.display='none';}
    if(btn)btn.className='dtab'+(t===tab?' on':'');
  });
  const activeTab=document.getElementById('tab-'+tab);
  if(activeTab){
    activeTab.classList.add('active');
    activeTab.style.display=tab==='transcript'?'flex':'block';
  }
}
async function setLang(l){
  lang=l;
  const s=await db.collection('users').doc(user.uid).collection('recordings').doc(recId).get();
  if(!s.exists)return;
  const rec=s.data();
  if(l==='en'){
    const k=getKey();
    if(k){
      // Translate if needed
      if(!rec.transcriptEn&&rec.transcript){
        document.getElementById('d-tr').className='tr-empty';
        document.getElementById('d-tr').textContent='Translating…';
        try{
          const translated=await translateToEn(rec.transcript,k);
          if(translated){
            await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({transcriptEn:translated,updatedAt:new Date().toISOString()});
            rec.transcriptEn=translated;
          }
        }catch(e){toast('Translation error: '+e.message);}
      }
      // Auto-generate EN summary if not yet
      if(!rec.summaryDataEn&&rec.transcriptEn){
        // Render with a flag that hides generate button
        rec._generatingSummary=true;
        renderDetail(rec);
        delete rec._generatingSummary;
        try{
          // Show generating state
          const ov=document.getElementById('sum-overview');
          if(ov){ov.className='sum-empty';ov.textContent='Generating summary…';}
          const sd=await generateSummaryData(rec.transcriptEn,'en');
          const upd={summaryDataEn:sd,updatedAt:new Date().toISOString()};
          await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update(upd);
          rec.summaryDataEn=sd;
        }catch(e){console.warn('EN summary failed:',e.message);}
      }
    }
  }
  renderDetail(rec);
}
async function getRec(){const s=await db.collection('users').doc(user.uid).collection('recordings').doc(recId).get();return s.exists?s.data():null;}

let _modalSaveFn=null;
function openModal(title,text,onSave){
  document.getElementById('fs-modal-textarea').value=text||'';
  _modalSaveFn=onSave;
  document.getElementById('fs-modal').classList.add('open');
  setTimeout(()=>{
    const ta=document.getElementById('fs-modal-textarea');
    ta.focus();
    ta.setSelectionRange(ta.value.length,ta.value.length);
  },150);
}
function closeModal(){
  document.getElementById('fs-modal').classList.remove('open');
  _modalSaveFn=null;
}
async function saveModal(){
  const val=document.getElementById('fs-modal-textarea').value;
  if(_modalSaveFn)await _modalSaveFn(val);
  closeModal();
}
async function editTranscript(){
  const rec=await getRec();if(!rec)return;
  const current=lang==='lt'?rec.transcript:rec.transcriptEn;
  openModal('Edit transcript',current,async(val)=>{
    if(val===current)return;
    const upd=lang==='lt'?{transcript:val,updatedAt:new Date().toISOString()}:{transcriptEn:val,updatedAt:new Date().toISOString()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update(upd);
    renderDetail({...rec,...upd});toast('Saved ✓');
  });
}
async function editSummary(){
  const rec=await getRec();if(!rec)return;
  const sd=lang==='lt'?rec.summaryData:rec.summaryDataEn;
  const current=sd?.overview||'';
  openModal('Edit overview',current,async(val)=>{
    if(val===current)return;
    const newSd={...(sd||{}),overview:val};
    const upd=lang==='lt'?{summaryData:newSd,updatedAt:new Date().toISOString()}:{summaryDataEn:newSd,updatedAt:new Date().toISOString()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update(upd);
    renderSummary({...rec,...upd});toast('Saved ✓');
  });
}
async function editTitle(){
  const cur=document.getElementById('d-title-disp').textContent;
  const t=prompt('Edit title:',cur);
  if(!t||t===cur)return;
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({title:t.trim(),updatedAt:new Date().toISOString()});
  document.getElementById('d-title-disp').textContent=t.trim();
  toast('Saved ✓');loadHomeList();
}

async function toggleAction(i){
  const rec=await getRec();if(!rec)return;
  const items=[...(rec.actionItems||[])];
  items[i]={...items[i],done:!items[i].done};
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({actionItems:items});
  renderSummary({...rec,actionItems:items});
}
async function addActionItem(){
  openModal('New action item','',async(val)=>{
    if(!val.trim())return;
    const rec=await getRec();if(!rec)return;
    const items=[...(rec.actionItems||[]),{text:val.trim(),done:false,createdAt:new Date().toISOString()}];
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({actionItems:items});
    renderSummary({...rec,actionItems:items});
  });
}
async function deleteActionItem(i){
  if(!confirm('Delete this action item?'))return;
  const rec=await getRec();if(!rec)return;
  const items=[...(rec.actionItems||[])];
  items.splice(i,1);
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({actionItems:items});
  renderSummary({...rec,actionItems:items});
  toast('Deleted.');
}
async function editActionItem(i){
  const rec=await getRec();if(!rec)return;
  const current=(rec.actionItems||[])[i]?.text||'';
  openModal('Edit action item',current,async(val)=>{
    if(!val.trim()||val.trim()===current)return;
    const rec2=await getRec();if(!rec2)return;
    const items=[...(rec2.actionItems||[])];
    items[i]={...items[i],text:val.trim()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({actionItems:items});
    renderSummary({...rec2,actionItems:items});
  });
}
async function addComment(){
  const t=document.getElementById('comment-input').value.trim();
  if(!t)return;
  const rec=await getRec();if(!rec)return;
  const comments=[...(rec.comments||[]),{text:t,author:nick,createdAt:new Date().toISOString()}];
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({comments});
  renderComments(comments);
  document.getElementById('comment-input').value='';
  toast('Comment added ✓');
}

async function copySummarySection(sec){
  const rec=await getRec();if(!rec)return;
  const sd=lang==='lt'?rec.summaryData:rec.summaryDataEn;
  if(!sd){toast('No summary yet.');return;}
  let parts=[];
  if(sd.overview)parts.push(sd.overview);
  if(sd.outline&&sd.outline.length){
    parts.push('');
    sd.outline.forEach(sec=>{
      parts.push((sec.title||'')+(sec.time?' ('+sec.time+')':''));
      (sec.bullets||[]).forEach(b=>parts.push('• '+b));
    });
  }
  copyText(parts.join('\n'));
}
function copyText(txt){
  // Try modern clipboard API (works on https)
  if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function'){
    navigator.clipboard.writeText(txt).then(()=>{
      toast('Copied ✓');
    }).catch(()=>_iosCopy(txt));
    return;
  }
  _iosCopy(txt);
}
function _iosCopy(txt){
  // iOS Safari workaround
  const inp=document.createElement('input');
  inp.value=txt;
  inp.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0;font-size:16px;width:200px';
  document.body.appendChild(inp);
  inp.focus();
  inp.setSelectionRange(0,txt.length);
  let ok=false;
  try{ok=document.execCommand('copy');}catch(e){}
  document.body.removeChild(inp);
  if(ok){toast('Copied ✓');}
  else{
    // Last resort: show share sheet on iOS
    if(navigator.share){navigator.share({text:txt}).catch(()=>{});}
    else{toast('Copy failed — select text manually');}
  }
}
async function copyTranscript(){
  const rec=await getRec();
  const t=lang==='lt'?rec?.transcript:rec?.transcriptEn;
  if(!t){toast('Nothing to copy.');return;}
  await copyText(t);
}
async function deleteRec(){
  if(!confirm('Delete this recording permanently?'))return;
  unloadAudio();
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).delete();
  toast('Deleted.');goHome();
}

// ── PLAYER ──
function loadAudioURL(url){
  unloadAudio();aurl=url;ael=new Audio(url);
  ael.onloadedmetadata=()=>{updP();document.getElementById('p-play').disabled=false;document.getElementById('p-stop').disabled=false;};
  ael.ontimeupdate=updP;
  ael.onended=()=>{ael.currentTime=0;playing=false;document.getElementById('p-ico').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';updP();};
}
function unloadAudio(){
  if(ael){ael.pause();ael.src='';ael=null;}
  if(aurl&&aurl.startsWith('blob:'))URL.revokeObjectURL(aurl);
  aurl=null;playing=false;
  const pp=document.getElementById('p-play'),ps=document.getElementById('p-stop'),pt=document.getElementById('p-time'),pf=document.getElementById('p-fill');
  if(pp){pp.disabled=true;const i=document.getElementById('p-ico');if(i)i.innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';}
  if(ps)ps.disabled=true;
  if(pt)pt.textContent='0:00';
  if(pf)pf.style.width='0%';
}
function updP(){
  if(!ael)return;
  const pos=ael.currentTime,dur=ael.duration&&isFinite(ael.duration)?ael.duration:0;
  document.getElementById('p-time').textContent=ms2t(pos*1000);
  document.getElementById('p-dur').textContent=ms2t(dur*1000);
  document.getElementById('p-fill').style.width=(dur?(pos/dur*100).toFixed(1):0)+'%';
}
async function pToggle(){
  if(!ael)return;
  if(playing){ael.pause();playing=false;document.getElementById('p-ico').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';}
  else{await ael.play();playing=true;document.getElementById('p-ico').innerHTML='<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';}
}
function pStop(){if(!ael)return;ael.pause();ael.currentTime=0;playing=false;document.getElementById('p-ico').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';updP();}
function seekP(e){if(!ael||!ael.duration)return;const r=e.currentTarget.getBoundingClientRect();ael.currentTime=(e.clientX-r.left)/r.width*ael.duration;updP();}
function skipBack(){if(ael)ael.currentTime=Math.max(0,ael.currentTime-5);}
function skipFwd(){if(ael)ael.currentTime=Math.min(ael.duration||0,ael.currentTime+5);}
let highlightMode=false;
const highlightedWords={}; // recId -> Set of word indices

function toggleHighlight(){
  highlightMode=!highlightMode;
  const btn=document.getElementById('btn-highlight-tr');
  if(btn)btn.classList.toggle('on',highlightMode);
  if(highlightMode){
    const el=document.getElementById('d-tr');
    wrapTranscriptWords(el);
    toast('Tap words to highlight');
  }else{
    toast('Highlights saved');
  }
}
function wrapTranscriptWords(el){
  if(el.dataset.wrapped)return;
  const text=el.textContent||'';
  if(!text.trim())return;
  const parts=text.split(/(\s+)/);
  el.innerHTML='';
  const saved=highlightedWords[recId]||new Set();
  let idx=0;
  parts.forEach(part=>{
    if(part.trim()){
      const span=document.createElement('span');
      const wordIdx=idx++;
      span.className='tap-word'+(saved.has(wordIdx)?' hl':'');
      span.dataset.idx=wordIdx;
      span.textContent=part;
      span.addEventListener('click',function(e){
        e.stopPropagation();
        if(!highlightMode)return;
        this.classList.toggle('hl');
        // Save highlight state
        if(!highlightedWords[recId])highlightedWords[recId]=new Set();
        if(this.classList.contains('hl')){
          highlightedWords[recId].add(wordIdx);
        }else{
          highlightedWords[recId].delete(wordIdx);
        }
      });
      el.appendChild(span);
    }else{
      el.appendChild(document.createTextNode(part));
    }
  });
  el.dataset.wrapped='1';
}
function resetHighlightForNewRec(){
  // Turn off highlight mode when switching recordings
  highlightMode=false;
  const btn=document.getElementById('btn-highlight-tr');
  if(btn)btn.classList.remove('on');
}
function toggleWordHighlight(span){
  if(!highlightMode)return;
  span.classList.toggle('hl');
}
function handleTranscriptClick(e){}
async function addBookmark(){
  if(!ael){toast('No audio loaded.');return;}
  const ts=ms2t(ael.currentTime*1000);
  const rec=await getRec();if(!rec)return;
  const comments=[...(rec.comments||[]),{text:`📌 Bookmark at ${ts}`,author:nick,createdAt:new Date().toISOString()}];
  await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update({comments});
  toast(`Bookmark added at ${ts} ✓`);
}

// ── API ──
async function transcribeBlob(blob){
  const k=getKey();
  if(!k)throw new Error('Add your OpenAI API key in Account settings.');
  return new Promise((ok,fail)=>{
    const fr=new FileReader();
    fr.onload=async e=>{
      try{
        const b64=e.target.result.split(',')[1];
        const mtype=blob.type||'audio/webm';
        const r=await fetch('https://julija.app.n8n.cloud/webhook/fd3bd58d-bec2-4faa-a6b2-4a4c82804567',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({audio:b64,mimeType:mtype})
        });
        const d=await r.json();
        if(!r.ok)throw new Error(d.error||'Transcription error');
        if(!d.text)throw new Error('Empty transcription');
        ok(d.text);
      }catch(err){fail(err);}
    };
    fr.onerror=()=>fail(new Error('Could not read audio'));
    fr.readAsDataURL(blob);
  });
}
async function doTranscribe(){
  const btn=document.getElementById('btn-tr');
  btn.disabled=true;btn.innerHTML='<span class="spin"></span>Transcribing…';
  try{
    const rec=await getRec();if(!rec)return;
    const blob=await idbGetBlob(recId);
    if(!blob){toast('Audio not found locally.');return;}
    const transcript=await transcribeBlob(blob);
    const upd=lang==='lt'?{transcript,transcriptionStatus:'completed',updatedAt:new Date().toISOString()}:{transcriptEn:transcript,updatedAt:new Date().toISOString()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update(upd);
    renderDetail({...rec,...upd});toast('Transcription done ✓');
  }catch(e){toast('Error: '+e.message);}
  finally{btn.disabled=false;btn.textContent='Re-transcribe';}
}
async function generateSummaryData(transcript,l){
  const k=getKey();
  if(!k)throw new Error('Add your OpenAI API key in Account settings.');
  const sysLT=`Tu esi tikslus asmeninio užrašų asistentas. Grąžink JSON objektą su šiais laukais:\n{"overview":"trumpas 2-4 sakinių aprašymas","outline":[{"title":"Sekcijos pavadinimas","time":"0:00","bullets":["punktas1","punktas2"]}]}\nTik JSON, be jokių komentarų ar markdown.`;
  const sysEN=`You are a precise personal notes assistant. Return a JSON object with these fields:\n{"overview":"short 2-4 sentence summary","outline":[{"title":"Section title","time":"0:00","bullets":["point1","point2"]}]}\nOnly JSON, no comments or markdown.`;
  const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+k},body:JSON.stringify({model:'gpt-4o',max_tokens:1500,messages:[{role:'system',content:l==='lt'?sysLT:sysEN},{role:'user',content:transcript}]})});
  const d=await r.json();
  if(!r.ok)throw new Error(d.error?.message||'Summary error');
  let raw=d.choices?.[0]?.message?.content?.trim()||'';
  raw=raw.replace(/```json|```/g,'').trim();
  return JSON.parse(raw);
}
async function doSummarize(){
  // kept for manual retry via edit summary flow
  const rec=await getRec();if(!rec)return;
  const tr=lang==='lt'?rec.transcript:rec.transcriptEn;
  if(!tr){toast('Transcribe first.');return;}
  try{
    const sd=await generateSummaryData(tr,lang);
    const upd=lang==='lt'?{summaryData:sd,updatedAt:new Date().toISOString()}:{summaryDataEn:sd,updatedAt:new Date().toISOString()};
    await db.collection('users').doc(user.uid).collection('recordings').doc(recId).update(upd);
    renderSummary({...rec,...upd});toast('Summary ready ✓');
  }catch(e){toast('Error: '+e.message);}
}


// ── INDEXEDDB AUDIO STORAGE ──
const AUDIO_DB='mijuli-audio',AUDIO_STORE='blobs';
async function getAudioDb(){
  return new Promise((ok,fail)=>{
    const r=indexedDB.open(AUDIO_DB,1);
    r.onupgradeneeded=e=>e.target.result.createObjectStore(AUDIO_STORE,{keyPath:'id'});
    r.onsuccess=e=>ok(e.target.result);
    r.onerror=fail;
  });
}
async function idbSaveBlob(id,blob){
  const d=await getAudioDb();
  return new Promise((ok,fail)=>{
    const r=d.transaction(AUDIO_STORE,'readwrite').objectStore(AUDIO_STORE).put({id,blob});
    r.onsuccess=ok;r.onerror=fail;
  });
}
async function idbGetBlob(id){
  const d=await getAudioDb();
  return new Promise((ok,fail)=>{
    const r=d.transaction(AUDIO_STORE,'readonly').objectStore(AUDIO_STORE).get(id);
    r.onsuccess=()=>ok(r.result?.blob||null);r.onerror=fail;
  });
}
function loadAudioBlob(blob){
  unloadAudio();
  const url=URL.createObjectURL(blob);
  aurl=url;ael=new Audio(url);
  ael.onloadedmetadata=()=>{updP();document.getElementById('p-play').disabled=false;document.getElementById('p-stop').disabled=false;};
  ael.ontimeupdate=updP;
  ael.onended=()=>{ael.currentTime=0;playing=false;document.getElementById('p-ico').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';updP();};
}
// ── UTILS ──
// ── SPLASH ──
(function(){
  const splash=document.getElementById('splash');
  const logo=document.getElementById('splash-logo');
  const tag=document.getElementById('splash-tagline');
  if(!splash)return;
  setTimeout(()=>{logo.style.opacity='1';},50);
  setTimeout(()=>{if(tag)tag.style.color='rgba(166,166,158,0.7)';},200);
  // Don't auto-hide - hideSplash() called after auth resolves
})();
function hideSplash(){
  const splash=document.getElementById('splash');
  if(!splash||splash.style.display==='none')return;
  splash.style.opacity='0';
  setTimeout(()=>{splash.style.display='none';},500);
}

function ms2t(ms){const t=Math.floor(ms/1000),h=Math.floor(t/3600),m=Math.floor((t%3600)/60),s=t%60;return h>0?h+':'+pad(m)+':'+pad(s):pad(m)+':'+pad(s);}
function pad(n){return String(n).padStart(2,'0');}
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);}
</script>
</body>
</html>
