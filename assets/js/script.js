/* 站点通用脚本：导航、渐显、幻灯片，以及让唱机不断歌的局部换页路由。
   所有初始化都挂在 window.FSN 上，换页后可以安全地再跑一遍。 */
window.FSN = window.FSN || {};

(function () {
  const FSN = window.FSN;

  FSN.fillYear = function () {
    const yearElement = document.querySelector('#year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
  };

  FSN.markActiveNav = function () {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href.split('#')[0].split('?')[0] === currentPage);
    });
  };

  FSN.closeNav = function () {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    if (nav) nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  /* 移动端导航用事件委托，换页替换导航内容后不用重新绑定 */
  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('.nav-toggle');
    if (toggle) {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      document.body.classList.toggle('nav-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      return;
    }
    if (event.target.closest('.nav a')) FSN.closeNav();
  });

  /* —— 滚动渐显 —— */
  let revealObserver = null;
  FSN.initReveal = function () {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14 }
      );
    }
    elements.forEach((element) => revealObserver.observe(element));
  };

  /* —— 透明交叉淡入幻灯片 ——
     给任意元素加 data-slides="music|history|it|physics" 即可挂上一组照片 */
  const setOf = (key, count) =>
    Array.from({ length: count }, (_, i) => `assets/img/slides/${key}/${String(i + 1).padStart(2, '0')}.jpg`);

  const SLIDE_SETS = {
    music: setOf('music', 16),
    history: setOf('history', 2),
    it: setOf('it', 5),
    physics: setOf('physics', 3)
  };

  let slideTimers = [];
  FSN.stopSlideshows = function () {
    slideTimers.forEach((id) => clearInterval(id));
    slideTimers = [];
  };

  FSN.initSlideshows = function () {
    document.querySelectorAll('[data-slides]').forEach((host) => {
      if (host.dataset.slidesReady) return;
      const paths = SLIDE_SETS[host.dataset.slides];
      if (!paths || !paths.length) return;
      host.dataset.slidesReady = '1';

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
      slideTimers.push(
        setInterval(() => {
          images[current].classList.remove('on');
          current = (current + 1) % images.length;
          images[current].classList.add('on');
        }, interval)
      );
    });
  };

  FSN.initPage = function () {
    FSN.fillYear();
    FSN.markActiveNav();
    FSN.initReveal();
    FSN.initSlideshows();
    if (typeof FSN.renderContentPage === 'function') FSN.renderContentPage();
    if (typeof FSN.initAcmPage === 'function') FSN.initAcmPage();
  };

  FSN.initPage();
})();

/* —— 局部换页路由 ——
   站内跳转只替换 main / 导航 / 页脚，播放器留在原地，歌不中断。
   任何一步失败都会退回浏览器的整页跳转。 */
(function () {
  const FSN = window.FSN;
  if (!window.fetch || !window.history || !window.history.pushState || !window.DOMParser) return;
  /* file:// 下浏览器禁止 fetch 本地文件，退回普通整页跳转 */
  if (location.protocol === 'file:') return;

  let currentPathname = location.pathname;

  const loadedScripts = new Set(
    Array.from(document.querySelectorAll('script[src]'), (s) => new URL(s.getAttribute('src'), location.href).pathname)
  );

  function loadScript(href) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = href;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  /* 按目标页声明的顺序补齐还没加载过的脚本（数据文件、页面脚本） */
  async function ensureScripts(doc) {
    for (const s of doc.querySelectorAll('script[src]')) {
      const url = new URL(s.getAttribute('src'), location.href);
      if (url.origin !== location.origin || loadedScripts.has(url.pathname)) continue;
      loadedScripts.add(url.pathname);
      await loadScript(url.href);
    }
  }

  async function navigate(href, { push = true } = {}) {
    const url = new URL(href, location.href);
    const response = await fetch(url.href, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
    const newMain = doc.querySelector('main');
    const oldMain = document.querySelector('main');
    if (!newMain || !oldMain) throw new Error('页面结构不完整');

    FSN.stopSlideshows();
    FSN.closeNav();

    document.title = doc.title;
    document.body.className = doc.body.className;
    if (doc.body.dataset.page) {
      document.body.dataset.page = doc.body.dataset.page;
    } else {
      delete document.body.dataset.page;
    }

    const nav = document.querySelector('.nav');
    const newNav = doc.querySelector('.nav');
    if (nav && newNav) nav.innerHTML = newNav.innerHTML;

    const logo = document.querySelector('.logo');
    const newLogo = doc.querySelector('.logo');
    if (logo && newLogo) logo.setAttribute('href', newLogo.getAttribute('href'));

    const footer = document.querySelector('.footer');
    const newFooter = doc.querySelector('.footer');
    if (footer && newFooter) footer.innerHTML = newFooter.innerHTML;

    oldMain.replaceWith(document.importNode(newMain, true));

    if (push) history.pushState({ fsn: true }, '', url.href);
    currentPathname = url.pathname;

    await ensureScripts(doc);
    FSN.initPage();

    const target = url.hash && document.querySelector(url.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download')) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (!/(\.html|\/)$/.test(url.pathname)) return;

    if (url.pathname === location.pathname) {
      if (url.hash) return; // 本页锚点交给浏览器
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    event.preventDefault();
    navigate(url.href).catch(() => {
      location.href = url.href;
    });
  });

  window.addEventListener('popstate', () => {
    if (location.pathname === currentPathname) return; // 只是锚点变化
    navigate(location.href, { push: false }).catch(() => location.reload());
  });
})();
