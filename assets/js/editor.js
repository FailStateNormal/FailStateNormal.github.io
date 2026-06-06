const pageSelect = document.querySelector('[data-page-select]');
const previewLink = document.querySelector('[data-preview-link]');
const pageTitle = document.querySelector('[data-page-title]');
const pageEyebrow = document.querySelector('[data-page-eyebrow]');
const pageIntro = document.querySelector('[data-page-intro]');
const itemList = document.querySelector('[data-item-list]');
const itemIndex = document.querySelector('[data-item-index]');
const itemGroup = document.querySelector('[data-item-group]');
const itemTag = document.querySelector('[data-item-tag]');
const itemTitle = document.querySelector('[data-item-title]');
const itemSummary = document.querySelector('[data-item-summary]');
const itemBullets = document.querySelector('[data-item-bullets]');
const jsonOutput = document.querySelector('[data-json-output]');
const statusElement = document.querySelector('[data-editor-status]');

let content = structuredClone(window.getSiteContent ? window.getSiteContent() : window.SITE_CONTENT);

function status(message) {
  statusElement.textContent = message;
}

function currentKey() {
  return pageSelect.value;
}

function currentPage() {
  return content[currentKey()];
}

function pageUrl(key) {
  return `${key}.html`;
}

function getItems(page) {
  if (Array.isArray(page.groups)) {
    return page.groups.flatMap((group, groupIndex) => (group.items || []).map((item, index) => ({ item, index, groupIndex, groupTitle: group.title })));
  }
  return (page.items || []).map((item, index) => ({ item, index, groupIndex: -1, groupTitle: '' }));
}

function getItemContainer(page, groupIndex) {
  if (Array.isArray(page.groups)) {
    const group = page.groups[groupIndex] || page.groups[0];
    if (!group.items) group.items = [];
    return group.items;
  }
  if (!page.items) page.items = [];
  return page.items;
}

function renderPageForm() {
  const page = currentPage();
  pageTitle.value = page.title || '';
  pageEyebrow.value = page.eyebrow || '';
  pageIntro.value = page.intro || '';
  previewLink.href = pageUrl(currentKey());
  previewLink.textContent = `查看${page.title || '当前栏目'}`;
}

function renderItems() {
  const page = currentPage();
  const rows = getItems(page);
  itemList.innerHTML = rows.map(({ item, index, groupIndex, groupTitle }) => `
    <article>
      <div>
        <strong>${item.title || '未命名条目'}</strong>
        <span>${groupTitle ? `${groupTitle} · ` : ''}${item.tag || '无标签'}</span>
      </div>
      <button class="primary" type="button" data-edit-item="${index}" data-edit-group="${groupIndex}">编辑</button>
    </article>
  `).join('') || '<p>暂无条目。</p>';
}

function clearItemForm() {
  itemIndex.value = '';
  itemGroup.value = '';
  itemTag.value = '';
  itemTitle.value = '';
  itemSummary.value = '';
  itemBullets.value = '';
}

function refresh() {
  renderPageForm();
  renderItems();
  jsonOutput.value = JSON.stringify(content, null, 2);
}

function saveAll(message = '已保存到当前浏览器。') {
  window.saveSiteContent(content);
  jsonOutput.value = JSON.stringify(content, null, 2);
  status(message);
}

pageSelect.addEventListener('change', () => {
  clearItemForm();
  refresh();
});

document.querySelector('[data-save-page]').addEventListener('click', () => {
  const page = currentPage();
  page.title = pageTitle.value.trim();
  page.eyebrow = pageEyebrow.value.trim();
  page.intro = pageIntro.value.trim();
  saveAll('栏目信息已保存到当前浏览器。');
  refresh();
});

document.querySelector('[data-add-item]').addEventListener('click', () => {
  clearItemForm();
  itemGroup.value = Array.isArray(currentPage().groups) ? '0' : '-1';
  itemTitle.focus();
  status('正在新增条目，填写后点击“保存条目”。');
});

itemList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-edit-item]');
  if (!button) return;
  const page = currentPage();
  const index = Number(button.dataset.editItem);
  const groupIndex = Number(button.dataset.editGroup);
  const item = getItemContainer(page, groupIndex)[index];
  itemIndex.value = String(index);
  itemGroup.value = String(groupIndex);
  itemTag.value = item.tag || '';
  itemTitle.value = item.title || '';
  itemSummary.value = item.summary || '';
  itemBullets.value = (item.bullets || []).join('\n');
  status(`正在编辑：${item.title || '未命名条目'}`);
});

document.querySelector('[data-save-item]').addEventListener('click', () => {
  const page = currentPage();
  const groupIndex = itemGroup.value === '' ? (Array.isArray(page.groups) ? 0 : -1) : Number(itemGroup.value);
  const target = getItemContainer(page, groupIndex);
  const index = itemIndex.value === '' ? target.length : Number(itemIndex.value);
  const item = {
    id: (itemTitle.value.trim() || `item-${Date.now()}`).toLowerCase().replace(/\s+/g, '-'),
    tag: itemTag.value.trim(),
    title: itemTitle.value.trim(),
    summary: itemSummary.value.trim(),
    bullets: itemBullets.value.split('\n').map((line) => line.trim()).filter(Boolean)
  };
  target[index] = item;
  itemIndex.value = String(index);
  itemGroup.value = String(groupIndex);
  saveAll('条目已保存到当前浏览器。');
  renderItems();
});

document.querySelector('[data-clear-item]').addEventListener('click', () => {
  clearItemForm();
  status('条目表单已清空。');
});

document.querySelector('[data-delete-item]').addEventListener('click', () => {
  if (itemIndex.value === '') {
    status('当前没有选中的条目。');
    return;
  }
  const page = currentPage();
  const groupIndex = Number(itemGroup.value);
  const target = getItemContainer(page, groupIndex);
  target.splice(Number(itemIndex.value), 1);
  clearItemForm();
  saveAll('条目已删除并保存到当前浏览器。');
  renderItems();
});

document.querySelector('[data-save-all]').addEventListener('click', () => saveAll());

document.querySelector('[data-export-json]').addEventListener('click', () => {
  jsonOutput.value = JSON.stringify(content, null, 2);
  jsonOutput.select();
  status('已导出到文本框，可以复制保存。');
});

document.querySelector('[data-import-json]').addEventListener('click', () => {
  try {
    const parsed = JSON.parse(jsonOutput.value);
    content = parsed;
    saveAll('JSON 已导入并保存到当前浏览器。');
    clearItemForm();
    refresh();
  } catch (error) {
    status(`JSON 格式不正确：${error.message}`);
  }
});

document.querySelector('[data-reset-json]').addEventListener('click', () => {
  window.resetSiteContent();
  content = structuredClone(window.SITE_CONTENT);
  clearItemForm();
  refresh();
  status('已恢复默认内容。');
});

const params = new URLSearchParams(window.location.search);
const initialPage = params.get('page');
if (initialPage && content[initialPage]) {
  pageSelect.value = initialPage;
}

refresh();
