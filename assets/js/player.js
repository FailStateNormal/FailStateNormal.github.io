/* 深夜歌单：悬浮小唱机 */
(function () {
  const TRACKS = [
    { file: '01-purple-rain.mp3', title: 'Purple Rain · Prince & The Revolution' },
    { file: '02-du-shang-c-lou.mp3', title: '独上C楼 · 黄宣 / 范晓萱' },
    { file: '03-skinny-love.mp3', title: '瘦子 · 丁世光' },
    { file: '04-ji-fen-zhi-ji.mp3', title: '几分之几 · 卢广仲' },
    { file: '05-lian-ai-fu-lu.mp3', title: '恋爱，俘虏 · 彭佳慧' },
    { file: '06-su-li-zhen.mp3', title: '苏丽珍 · 方大同' },
    { file: '07-yan-hua.mp3', title: '烟花 · 窦靖童' },
    { file: '08-tai-cong-ming.mp3', title: '太聪明 · 陈绮贞' },
    { file: '09-susan-shuo.mp3', title: 'Susan说 · 陶喆' },
    { file: '10-wang-chun-feng.mp3', title: '望春风 · 陶喆' }
  ];
  const BASE = 'assets/media/music/';
  const STORE_KEY = 'fsn-player-v1';

  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch (error) {
    saved = {};
  }

  let index = Number.isInteger(saved.index) && saved.index >= 0 && saved.index < TRACKS.length
    ? saved.index
    : Math.floor(Math.random() * TRACKS.length);

  const root = document.createElement('div');
  root.className = 'music-player';
  root.innerHTML = `
    <button class="mp-disc" type="button" aria-label="展开或收起播放器" title="深夜歌单"></button>
    <div class="mp-body">
      <div class="mp-info">
        <div class="mp-title"></div>
        <div class="mp-progress" role="slider" aria-label="播放进度">
          <div class="mp-progress-bar"></div>
        </div>
      </div>
      <div class="mp-controls">
        <button class="mp-prev" type="button" aria-label="上一首">
          <svg viewBox="0 0 16 16"><path d="M3 2h2v12H3zM13 2v12L5.5 8z"/></svg>
        </button>
        <button class="mp-play" type="button" aria-label="播放 / 暂停">
          <svg class="ic-play" viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z"/></svg>
          <svg class="ic-pause" viewBox="0 0 16 16" style="display:none"><path d="M3.5 2h3v12h-3zM9.5 2h3v12h-3z"/></svg>
        </button>
        <button class="mp-next" type="button" aria-label="下一首">
          <svg viewBox="0 0 16 16"><path d="M11 2h2v12h-2zM3 2l7.5 6L3 14z"/></svg>
        </button>
      </div>
    </div>
    <div class="mp-hint">点一下唱片，今晚的歌就开始了 ♪</div>
  `;
  document.body.appendChild(root);

  const audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = 0.65;

  const titleEl = root.querySelector('.mp-title');
  const barEl = root.querySelector('.mp-progress-bar');
  const progressEl = root.querySelector('.mp-progress');
  const playBtn = root.querySelector('.mp-play');
  const icPlay = root.querySelector('.ic-play');
  const icPause = root.querySelector('.ic-pause');

  if (saved.collapsed) root.classList.add('collapsed');

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        index,
        time: audio.currentTime || 0,
        collapsed: root.classList.contains('collapsed')
      }));
    } catch (error) {
      /* 隐私模式下写不进去就算了 */
    }
  }

  function load(i, { resumeTime = 0, autoplay = false } = {}) {
    index = (i + TRACKS.length) % TRACKS.length;
    audio.src = BASE + TRACKS[index].file;
    if (resumeTime > 1) {
      audio.currentTime = resumeTime;
    }
    titleEl.textContent = TRACKS[index].title;
    if (autoplay) play();
    persist();
  }

  function play() {
    audio.play().then(() => {
      root.classList.add('playing');
      root.classList.remove('show-hint');
      icPlay.style.display = 'none';
      icPause.style.display = '';
    }).catch(() => {
      /* 浏览器拦下了自动播放：亮个小提示，等第一次点击 */
      root.classList.add('show-hint');
      waitForGesture();
    });
  }

  function pause() {
    audio.pause();
    root.classList.remove('playing');
    icPlay.style.display = '';
    icPause.style.display = 'none';
    persist();
  }

  let gestureArmed = false;
  function waitForGesture() {
    if (gestureArmed) return;
    gestureArmed = true;
    const start = () => {
      document.removeEventListener('pointerdown', start);
      if (audio.paused) play();
    };
    document.addEventListener('pointerdown', start, { once: true });
  }

  root.querySelector('.mp-disc').addEventListener('click', () => {
    if (audio.paused) {
      play();
    } else {
      root.classList.toggle('collapsed');
    }
    persist();
  });

  playBtn.addEventListener('click', () => (audio.paused ? play() : pause()));
  root.querySelector('.mp-prev').addEventListener('click', () => load(index - 1, { autoplay: true }));
  root.querySelector('.mp-next').addEventListener('click', () => load(index + 1, { autoplay: true }));

  audio.addEventListener('ended', () => load(index + 1, { autoplay: true }));

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      barEl.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }
  });

  progressEl.addEventListener('click', (event) => {
    const rect = progressEl.getBoundingClientRect();
    if (audio.duration) {
      audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
    }
  });

  setInterval(() => {
    if (!audio.paused) persist();
  }, 5000);
  window.addEventListener('beforeunload', persist);

  load(index, { resumeTime: Number(saved.time) || 0 });
  play();
})();
