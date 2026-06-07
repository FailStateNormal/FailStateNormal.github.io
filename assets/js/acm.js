const templateList = document.querySelector('#template-list');
const catalogList = document.querySelector('#catalog-list');
const searchInput = document.querySelector('#template-search');
const templateCount = document.querySelector('#template-count');
const templateSource = document.querySelector('#template-source');

let parsedSections = Array.isArray(window.ACM_TEMPLATES) ? window.ACM_TEMPLATES : [];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function groupByChapter(sections) {
  return sections.reduce((acc, section) => {
    if (!acc[section.chapter]) acc[section.chapter] = [];
    acc[section.chapter].push(section);
    return acc;
  }, {});
}

function renderCatalog(sections) {
  const groups = groupByChapter(sections);
  catalogList.innerHTML = Object.entries(groups).map(([chapter, items]) => `
    <article class="catalog-card">
      <h3>${escapeHtml(chapter)}</h3>
      <div>
        ${items.map((item) => `<a href="#${item.id}">${escapeHtml(item.title)}</a>`).join('')}
      </div>
    </article>
  `).join('');
}

function renderTemplates(sections) {
  if (!sections.length) {
    templateList.innerHTML = '<div class="glass-card loading-card">没有找到匹配的模板。</div>';
    return;
  }

  templateList.innerHTML = sections.map((section) => `
    <article id="${section.id}" class="template-card">
      <div class="template-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(section.chapter)}</p>
          <h3>${escapeHtml(section.title)}</h3>
        </div>
        <button class="copy-button" type="button" data-copy="${section.id}">复制</button>
      </div>
      <pre><code>${escapeHtml(section.code)}</code></pre>
    </article>
  `).join('');
}

function applyFilter() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = keyword
    ? parsedSections.filter((section) => `${section.chapter}\n${section.title}\n${section.code}`.toLowerCase().includes(keyword))
    : parsedSections;

  renderCatalog(filtered);
  renderTemplates(filtered);
  templateCount.textContent = `${filtered.length} / ${parsedSections.length} 个模板`;
}

async function copyTemplate(id) {
  const section = parsedSections.find((item) => item.id === id);
  if (!section) return;

  const button = document.querySelector(`[data-copy="${id}"]`);

  try {
    await navigator.clipboard.writeText(section.code);
  } catch (error) {
    if (button) {
      const oldText = button.textContent;
      button.textContent = '复制失败';
      setTimeout(() => {
        button.textContent = oldText;
      }, 1200);
    }
    return;
  }

  if (!button) return;

  const oldText = button.textContent;
  button.textContent = '已复制';
  setTimeout(() => {
    button.textContent = oldText;
  }, 1200);
}

function initTemplates() {
  if (!parsedSections.length) {
    templateCount.textContent = '读取失败';
    templateSource.textContent = '静态模板数据没有加载，请确认 assets/data/acm-data.js 已随页面一起上传。';
    templateList.innerHTML = `
      <div class="glass-card loading-card">
        <h3>模板数据读取失败</h3>
        <p>请确认 assets/data/acm-data.js、assets/js/acm.js 和 acm.html 路径正确。</p>
      </div>
    `;
    return;
  }

  templateSource.textContent = '来源：ACM竞赛模板汇总.txt，已内置为静态数据';
  applyFilter();
}

searchInput.addEventListener('input', applyFilter);

templateList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy]');
  if (button) copyTemplate(button.dataset.copy);
});

initTemplates();
