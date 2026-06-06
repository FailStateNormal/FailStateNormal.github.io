const templateList = document.querySelector('#template-list');
const catalogList = document.querySelector('#catalog-list');
const searchInput = document.querySelector('#template-search');
const templateCount = document.querySelector('#template-count');
const templateSource = document.querySelector('#template-source');

const sourceFile = 'ACM竞赛模板汇总.txt';
let parsedSections = [];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function slugify(value, index) {
  return `template-${index}-${value.replace(/[^\w一-龥]+/g, '-').replace(/^-|-$/g, '')}`;
}

function parseTemplates(rawText) {
  const lines = rawText.replaceAll('\r\n', '\n').split('\n');
  const sections = [];
  let currentChapter = '说明';
  let current = null;

  lines.forEach((line) => {
    const chapterMatch = line.match(/^第[一二三四五六七八九十]+章\s+(.+)$/);
    const templateMatch = line.match(/^-{4,}\s*(.+?)\s*-{4,}$/);

    if (chapterMatch) {
      currentChapter = chapterMatch[0].trim();
      current = null;
      return;
    }

    if (templateMatch) {
      current = {
        chapter: currentChapter,
        title: templateMatch[1].trim(),
        code: [],
      };
      sections.push(current);
      return;
    }

    if (current) {
      current.code.push(line);
    }
  });

  return sections
    .map((section, index) => ({
      ...section,
      id: slugify(section.title, index + 1),
      code: section.code.join('\n').trim(),
    }))
    .filter((section) => section.code.length > 0);
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

  await navigator.clipboard.writeText(section.code);
  const button = document.querySelector(`[data-copy="${id}"]`);
  if (!button) return;

  const oldText = button.textContent;
  button.textContent = '已复制';
  setTimeout(() => {
    button.textContent = oldText;
  }, 1200);
}

async function initTemplates() {
  try {
    const response = await fetch(encodeURI(sourceFile));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const rawText = await response.text();
    parsedSections = parseTemplates(rawText);
    templateSource.textContent = `来源：${sourceFile}`;
    applyFilter();
  } catch (error) {
    templateCount.textContent = '读取失败';
    templateSource.textContent = '如果你是直接双击本地 HTML，浏览器可能会阻止读取 TXT；部署到 GitHub Pages 后会正常显示。';
    templateList.innerHTML = `
      <div class="glass-card loading-card">
        <h3>模板文本读取失败</h3>
        <p>请确认 ${sourceFile} 和 acm.html 在同一目录，或通过本地服务器/GitHub Pages 打开。</p>
      </div>
    `;
  }
}

searchInput.addEventListener('input', applyFilter);

templateList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-copy]');
  if (button) copyTemplate(button.dataset.copy);
});

initTemplates();
