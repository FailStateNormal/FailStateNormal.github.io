const yearElement = document.querySelector('#year');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const revealElements = document.querySelectorAll('.reveal');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

if (nav) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0].split('?')[0] === currentPage) {
      link.classList.add('active');
    }
  });
}
