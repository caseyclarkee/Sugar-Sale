// site scripts (age gate is inline, as per teaser)


/* MODAL */
(function(){
  const overlay = document.getElementById('modal-overlay');
  const closer  = document.getElementById('modal-close');
  const openers = [document.getElementById('open-modal'), document.getElementById('open-modal-hero')].filter(Boolean);

  function open(){ overlay?.setAttribute('aria-hidden','false'); }
  function close(){ overlay?.setAttribute('aria-hidden','true'); }

  openers.forEach(btn => btn.addEventListener('click', (e)=>{ e.preventDefault(); open(); }));
  closer?.addEventListener('click', close);
  overlay?.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
})();

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^=\"#\"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
