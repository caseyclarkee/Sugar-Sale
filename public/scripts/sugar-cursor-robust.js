
// sugar-cursor-robust.js (moves canvas into age-gate overlay if present)
(function(){
  function ready(fn){ if(document.readyState!=="loading"){ fn(); } else { document.addEventListener("DOMContentLoaded", fn); } }
  ready(function(){
    let canvas = document.getElementById('sugar-stage');
    if(!canvas){ canvas=document.createElement('canvas'); canvas.id='sugar-stage'; }
    let cursor = document.getElementById('sugar-cursor');
    if(!cursor){ cursor=document.createElement('div'); cursor.id='sugar-cursor'; cursor.setAttribute('aria-hidden','true'); }

    // If age-gate overlay is active, mount inside it so the pile is visible above background
    const overlay = document.getElementById('age-gate-overlay');
    const rootEl = document.documentElement;
    if(overlay && rootEl.classList.contains('agegate-active')){
      overlay.appendChild(canvas);
      overlay.appendChild(cursor);
    } else {
      document.body.appendChild(canvas);
      document.body.appendChild(cursor);
    }

    // Minimal inline CSS if external didn't load
    const needs = getComputedStyle(canvas).position === 'static';
    if(needs){
      const style = document.createElement('style');
      style.textContent = '@media (pointer:fine){body{cursor:none}}#sugar-stage{position:fixed;inset:0;display:block;z-index:1;pointer-events:none}#sugar-cursor{position:fixed;left:0;top:0;width:44px;height:30px;transform:translate(-200px,-200px);z-index:2;pointer-events:none;filter:drop-shadow(0 2px 0 #333) drop-shadow(0 10px 18px rgba(0,0,0,.18))}#sugar-cursor::before{content:"";position:absolute;inset:0;border-radius:40px 40px 18px 18px;border:2px solid #333;background:linear-gradient(#fff,#ececec);box-shadow:inset 0 -6px 0 rgba(0,0,0,.05);animation:sugar-breathe 1.6s ease-in-out infinite}@keyframes sugar-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}';
      document.head.appendChild(style);
    }

    const ctx = canvas.getContext('2d'); if(!ctx) return;

    function fit(){ const W=innerWidth,H=innerHeight,dpr=devicePixelRatio||1; canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr); canvas.style.width=W+'px'; canvas.style.height=H+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); }
    addEventListener('resize', fit, {passive:true}); fit();

    let mx=innerWidth/2, my=innerHeight/2, fx=mx, fy=my, lag=.18;
    addEventListener('mousemove', e=>{mx=e.clientX;my=e.clientY},{passive:true});

    const grains=[]; function grain(x,y,burst){ const a=burst?Math.random()*Math.PI*2:(Math.random()*.8-.4); const sp=burst?(1.5+Math.random()*2.5):(0.2+Math.random()*0.6); return {x,y,vx:Math.cos(a)*sp,vy:burst?Math.sin(a)*sp:(1.0+Math.random()*0.6),r:1.5+Math.random()*1.2,born:performance.now(),life:900+Math.random()*900,tw:Math.random()*Math.PI*2}; }
    addEventListener('mousedown',e=>{ for(let i=0;i<12;i++) grains.push(grain(e.clientX,e.clientY,true)); pile.mass+=12+Math.random()*16; pile.resetAt=performance.now()+12000; });

    const pile={mass:28, resetAt:performance.now()+12000};
    function emit(dt){ const n=Math.floor((dt/1000)*60); for(let i=0;i<n;i++) grains.push(grain(fx+(Math.random()*6-3), fy+4, false)); }

    function update(dt,now){ fx+=(mx-fx)*lag; fy+=(my-fy)*lag;
      cursor.style.transform='translate('+(fx-22|0)+'px,'+(fy-18|0)+'px)'; cursor.style.display='none';
      emit(dt);
      for(let i=grains.length-1;i>=0;i--){ const g=grains[i]; if(now-g.born>g.life){grains.splice(i,1); continue;} g.vy+=0.02*(dt/16.7); g.vx+=Math.sin((now+g.tw)*0.002)*0.003; g.x+=g.vx*(dt/16.7); g.y+=g.vy*(dt/16.7); if(g.y>innerHeight+40||g.x<-40||g.x>innerWidth+40) grains.splice(i,1); }
      if(now>pile.resetAt){ pile.mass=28; grains.length=0; pile.resetAt=now+12000; } }

    function drawPile(x,y,mass){ const bH=Math.min(70,14+Math.sqrt(mass)*3.0), h=Math.min(80,18+Math.sqrt(mass)*3.6);
      const s=ctx.createRadialGradient(x,y+6,4,x,y+6,bH+16); s.addColorStop(0,'rgba(0,0,0,.16)'); s.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=s; ctx.beginPath(); ctx.ellipse(x,y+7,bH+14,(bH+14)*0.32,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x-bH,y); ctx.quadraticCurveTo(x-bH*0.55,y-h*0.55,x,y-h); ctx.quadraticCurveTo(x+bH*0.55,y-h*0.55,x+bH,y); ctx.quadraticCurveTo(x,y+Math.max(10,bH*0.15),x-bH,y);
      const g=ctx.createLinearGradient(x,y-h,x,y+8); g.addColorStop(0,'#fff'); g.addColorStop(0.7,'#f2f2f2'); g.addColorStop(1,'#e7e7e7'); ctx.fillStyle=g; ctx.fill(); ctx.lineWidth=2; ctx.strokeStyle='#333'; ctx.stroke();
      const dots=Math.floor(160+bH*1.2); ctx.fillStyle='rgba(0,0,0,.45)'; for(let i=0;i<dots;i++){ const px=x-bH+Math.random()*(bH*2); const nx=Math.abs((px-x)/bH); const profile=1-Math.pow(nx,1.25); const ySurf=y-h*profile; const py=ySurf + (Math.random()**1.6)*(y-ySurf); const r=(Math.random()*0.9+0.6)*0.6; const a=0.25+0.35*(1-nx); ctx.globalAlpha=a*0.8; ctx.beginPath(); ctx.arc(px+(Math.random()*0.6-0.3), py+(Math.random()*0.6-0.3), r, 0, Math.PI*2); ctx.fill(); } ctx.globalAlpha=1; }

    function draw(now){ ctx.clearRect(0,0,innerWidth,innerHeight);
      for(let i=0;i<grains.length;i++){ const g=grains[i]; const t=1-(now-g.born)/g.life; const a=Math.max(0,Math.min(1,t)); ctx.globalAlpha=a*0.95; ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(51,51,51,.85)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(g.x,g.y,g.r,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
      ctx.globalAlpha=1; drawPile(fx, fy+22, pile.mass); }

    let last=performance.now(); function loop(now){ const dt=Math.min(64,now-last); last=now; update(dt,now); draw(now); requestAnimationFrame(loop); } requestAnimationFrame(loop);
  });
})();
