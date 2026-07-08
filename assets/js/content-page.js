/* 内容页渲染：从 site-content.js 的数据生成页面。
   挂在 window.FSN 上，局部换页后可以再跑一遍。 */
window.FSN = window.FSN || {};

(function () {
  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function renderItem(item) {
    const bullets = Array.isArray(item.bullets) && item.bullets.length
      ? `<ul>${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`
      : '';

    return `
      <article class="analysis-card content-item-card">
        ${item.tag ? `<div class="card-tag">${escapeHtml(item.tag)}</div>` : ''}
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        ${bullets}
      </article>
    `;
  }

  window.FSN.renderContentPage = function () {
    const listElement = document.querySelector('[data-content-list]');
    if (!listElement) return;

    const pageKey = document.body.dataset.page;
    const pageData = pageKey ? window.getSiteContent?.()[pageKey] : null;
    if (!pageData) {
      listElement.innerHTML = '<div class="glass-card loading-card">没有找到这个页面的内容。</div>';
      return;
    }

    const titleElement = document.querySelector('[data-content-title]');
    const introElement = document.querySelector('[data-content-intro]');
    const eyebrowElement = document.querySelector('[data-content-eyebrow]');

    document.title = `${pageData.title} | 失败尽常态`;
    if (titleElement) titleElement.textContent = pageData.title;
    if (introElement) introElement.textContent = pageData.intro;
    if (eyebrowElement) eyebrowElement.textContent = pageData.eyebrow || 'Archive';

    if (Array.isArray(pageData.groups)) {
      listElement.innerHTML = pageData.groups.map((group) => `
        <section class="content-group">
          <h2 class="subsection-title">${escapeHtml(group.title)}</h2>
          <div class="analysis-grid">
            ${(group.items || []).map(renderItem).join('')}
          </div>
        </section>
      `).join('');
      return;
    }

    listElement.innerHTML = `
      <div class="analysis-grid">
        ${(pageData.items || []).map(renderItem).join('')}
      </div>
    `;
  };

  window.FSN.renderContentPage();
})();
