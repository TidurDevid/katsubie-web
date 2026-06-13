document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('pageLoader');
  const loaderFill = document.getElementById('loaderFill');
  setTimeout(() => { loaderFill.style.width = '100%'; }, 100);
  setTimeout(() => { loader.classList.add('hidden'); }, 1600);
  AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic'
  });
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }
  const navbar = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });
  const tabs = document.querySelectorAll('.menu-tab');
  const panes = document.querySelectorAll('.menu-pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPane = document.getElementById('tab-' + target);
      if (targetPane) targetPane.classList.add('active');
      setTimeout(() => AOS.refresh(), 50);
    });
  });
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  };
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(c => animateCounter(c));
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        const collapseEl = document.getElementById('navbarNav');
        if (collapseEl && collapseEl.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapseEl)?.hide();
        }
      }
    });
  });
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = '#ffffff';
      }
    });
  });
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.08;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
  const floatWA = document.getElementById('floatWA');
  window.addEventListener('scroll', () => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (floatWA) floatWA.style.opacity = atBottom ? '0' : '1';
  });
  console.log('✅ Katsubie loaded — Let\'s eat!');
});
function orderWA(productName, price) {
  const waNumber = '6281234567890'; 
  const msg = `Halo Katsubie! 🍱\n\nSaya ingin memesan:\n*${productName}* — ${price}\n\nMohon info ketersediaan dan estimasi waktu ya. Terima kasih! 😊`;
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
