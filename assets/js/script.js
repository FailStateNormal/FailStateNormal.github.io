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

/* —— 透明交叉淡入幻灯片 ——
   给任意元素加 data-slides="music|history|it|physics|mix" 即可挂上一组照片 */
(function initSlideshows() {
  const setOf = (key, count) =>
    Array.from({ length: count }, (_, i) => `assets/img/slides/${key}/${String(i + 1).padStart(2, '0')}.jpg`);

  const SLIDE_SETS = {
    music: setOf('music', 16),
    history: setOf('history', 2),
    it: setOf('it', 5),
    physics: setOf('physics', 3)
  };
  SLIDE_SETS.mix = [
    'assets/img/slides/music/01.jpg',
    'assets/img/slides/history/01.jpg',
    'assets/img/slides/music/07.jpg',
    'assets/img/slides/physics/02.jpg',
    'assets/img/slides/music/12.jpg',
    'assets/img/slides/it/03.jpg',
    'assets/img/slides/music/04.jpg',
    'assets/img/slides/history/02.jpg',
    'assets/img/slides/music/15.jpg'
  ];

  document.querySelectorAll('[data-slides]').forEach((host) => {
    const paths = SLIDE_SETS[host.dataset.slides];
    if (!paths || !paths.length) return;

    const box = document.createElement('div');
    box.className = 'slide-fade';
    box.setAttribute('aria-hidden', 'true');

    const images = paths.map((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      box.appendChild(img);
      return img;
    });

    host.prepend(box);

    let current = Math.floor(Math.random() * images.length);
    images[current].classList.add('on');
    if (images.length < 2) return;

    const interval = Number(host.dataset.slideInterval) || 5200;
    // 每张卡片错开起点，避免整页同时翻页
    setTimeout(() => {
      setInterval(() => {
        images[current].classList.remove('on');
        current = (current + 1) % images.length;
        images[current].classList.add('on');
      }, interval);
    }, Math.random() * 2600);
  });
})();

if (nav) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0].split('?')[0] === currentPage) {
      link.classList.add('active');
    }
  });
}
