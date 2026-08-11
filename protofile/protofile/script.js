// ===== Typewriter effect for the role line =====
const roles = ["Software Engineering Student ", "Frontend Developer"];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];

  if(!deleting){
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== Scroll reveal + skill bars + counters via IntersectionObserver =====
const revealEls = document.querySelectorAll('.reveal, .skill-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if(current >= target){
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });

counters.forEach(c => counterObserver.observe(c));

// ===== Mobile menu toggle =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});