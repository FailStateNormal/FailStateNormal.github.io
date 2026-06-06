# 失败尽常态 / FailStateNormal

这是 `失败尽常态` 的个人网站，部署在 GitHub Pages。

网站地址：

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
assets/css/style.css    网站样式
assets/js/script.js     通用交互效果
assets/js/acm.js        ACM 模板页面交互
assets/js/content-page.js  通用内容页渲染
assets/data/acm-data.js ACM 模板静态数据
assets/data/site-content.js 音乐/历史/物理/书影音数据
docs/                   原始资料与待办记录
更新网站.bat            一键提交并推送到 GitHub
维护说明.md             日常使用与维护指南
README.md               仓库说明
```

## 怎么修改内容

所有栏目的文字都存放在数据文件里，改完提交并推送到 GitHub 即可生效：

| 想改什么 | 改哪个文件 |
| --- | --- |
| 音乐 / 历史 / 物理 / 书影音 内容 | `assets/data/site-content.js` |
| ACM 模板内容 | `assets/data/acm-data.js` |
| 首页文字、栏目入口、联系方式 | `index.html` |
| 颜色、字体、布局、动画 | `assets/css/style.css` |

详细的日常操作步骤见 `维护说明.md`。

## 怎么发布到网站

改完文件后，**双击 `更新网站.bat`** 即可自动提交并推送。

或者手动执行：

```powershell
git add -A
git commit -m "说明你改了什么"
git push origin main
```

等 1~2 分钟，刷新 https://FailStateNormal.github.io 即可看到更新。

## 部署设置（已完成，仅作记录）

仓库 `Settings → Pages`：

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```
