# 失败尽常态 / FailStateNormal

这是 `失败尽常态` 的个人网站，适合部署到 GitHub Pages。

网站地址建议为：

```text
https://FailStateNormal.github.io
```

GitHub 主页：

```text
https://github.com/FailStateNormal
```

## 页面结构

```text
index.html              首页入口 / 栏目跳转
acm.html                ACM 算法竞赛模板库
music.html              音乐人记录
history.html            历史人物札记
physics.html            物理学家笔记
books-films.html        书籍与影视记录
editor.html             浏览器编辑端口
assets/css/style.css    网站样式
assets/js/script.js     通用交互效果
assets/js/acm.js        ACM 模板页面交互
assets/js/content-page.js  通用内容页渲染
assets/js/editor.js     编辑端口交互
assets/data/acm-data.js ACM 模板静态数据
assets/data/site-content.js 音乐/历史/物理/书影音数据
docs/                   原始资料与待办记录
README.md               仓库说明
```

## 内容编辑端口

打开：

```text
editor.html
```

可以在浏览器里修改这些栏目：

- 音乐
- 历史
- 物理
- 书影音

编辑器支持：

- 修改栏目标题、眉标、简介
- 新增 / 编辑 / 删除条目
- 保存到当前浏览器 localStorage
- 导入 JSON
- 导出 JSON
- 恢复默认内容

注意：GitHub Pages 是静态网站，浏览器不能直接把内容写回仓库。所以：

1. 在 `editor.html` 修改内容。
2. 点击“导出到文本框”。
3. 复制导出的 JSON。
4. 把内容同步到 `assets/data/site-content.js`。
5. 提交并推送到 GitHub。

这样修改才会永久保存并对所有访问者生效。

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库：

```text
FailStateNormal.github.io
```

2. 上传这些文件：

```text
index.html
acm.html
music.html
history.html
physics.html
books-films.html
editor.html
assets/
docs/
README.md
```

3. 进入仓库：

```text
Settings → Pages
```

4. 设置：

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. 等待一会儿，访问：

```text
https://FailStateNormal.github.io
```

## 后续可以修改的地方

- `index.html`：修改首页介绍、栏目入口、项目、联系方式
- `acm.html`：修改 ACM 模板库页面结构
- `assets/data/site-content.js`：修改音乐、历史、物理、书影音的默认内容
- `assets/css/style.css`：修改颜色、布局、字体、动画
- `assets/js/content-page.js`：修改普通内容页渲染逻辑
- `assets/js/editor.js`：修改编辑端口逻辑
- `docs/`：存放原始 TXT、待办记录和后续资料

## 推荐下一步

- 替换成真实项目链接
- 添加头像或背景图
- 给每个栏目继续补充长文、图片和链接
- 如果需要真正在线写回 GitHub 仓库，可以后续接入 CMS 或 GitHub API
- 绑定个人域名
