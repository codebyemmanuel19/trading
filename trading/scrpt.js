// FAQ Toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Scroll fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// =====================
// TESTIMONIAL WIDGET
// =====================
(function () {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonialDots');
  const widget = document.getElementById('testimonialWidget');
  const DURATION = 10000;
  let current = 0;
  let timer = null;
  let progressTimer = null;

  // Build progress bar
  const progressWrap = document.createElement('div');
  progressWrap.className = 'testimonial-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'testimonial-progress-bar';
  progressWrap.appendChild(progressBar);
  widget.appendChild(progressWrap);

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    startProgress();
  }

  function startProgress() {
    clearInterval(progressTimer);
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${DURATION}ms linear`;
        progressBar.style.width = '100%';
      });
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      goTo((current + 1) % slides.length);
    }, DURATION);
  }

  // Show widget after 2s scroll or 4s delay
  let shown = false;
  function showWidget() {
    if (shown) return;
    shown = true;
    widget.classList.remove('hidden');
    startProgress();
  }

  setTimeout(showWidget, 4000);
  window.addEventListener('scroll', () => { if (window.scrollY > 200) showWidget(); }, { once: true });

  window.closeTestimonial = function () {
    widget.classList.add('hidden');
    clearTimeout(timer);
    clearInterval(progressTimer);
  };
})();

// =====================
// SUPPORT POPUP
// =====================
window.toggleSupport = function () {
  const popup = document.getElementById('supportPopup');
  popup.classList.toggle('open');
};