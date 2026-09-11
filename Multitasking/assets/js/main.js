
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const t = document.getElementById(id);
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Progressive Validation carousel
(function(){
  const track = document.getElementById('pvTrack');
  const dotsWrap = document.getElementById('pvDots');
  if(!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let current = Math.min(2, slides.length - 1); // default: 3. Real-World Deployment

  slides.forEach((_, i)=>{
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'pv-dot';
    dot.setAttribute('aria-label', 'Show video ' + (i + 1));
    dot.addEventListener('click', ()=>show(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function show(i){
    current = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, j)=>d.classList.toggle('active', j === current));
    slides.forEach((slide, j)=>{
      const video = slide.querySelector('video');
      if(!video) return;
      if(j === current){ video.play().catch(()=>{}); }
      else { video.pause(); }
    });
  }

  const prevBtn = document.querySelector('.pv-arrow-prev');
  const nextBtn = document.querySelector('.pv-arrow-next');
  if(prevBtn) prevBtn.addEventListener('click', ()=>show(current - 1));
  if(nextBtn) nextBtn.addEventListener('click', ()=>show(current + 1));

  show(current);
})();
