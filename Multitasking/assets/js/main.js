
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Video tab switcher (Progressive Validation section)
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const targetId = btn.dataset.target;

    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-panel').forEach(panel=>{
      const video = panel.querySelector('video');
      if(panel.id === targetId){
        panel.hidden = false;
        if(video){ video.currentTime = 0; video.play().catch(()=>{}); }
      } else {
        panel.hidden = true;
        if(video){ video.pause(); }
      }
    });
  });
});
