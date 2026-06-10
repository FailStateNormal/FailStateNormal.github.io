const CONTENT_STORAGE_KEY = 'fsn-site-content';

window.SITE_CONTENT = {
  music: {
    eyebrow: 'Musicians',
    title: '喜欢的音乐人',
    intro: '后续可能加入专辑封面、歌词摘录、现场链接和个人听感。',
    items: [
      {
        id: 'khalil-fong',
        tag: 'Soul / R&B',
        title: '方大同',
        summary: '华语 Soul、R&B、Funk 的代表性创作者之一。旋律温柔，律动干净，常用吉他、贝斯和声部层次营造轻盈但不单薄的质感。',
        bullets: ['风格：Soul、Funk、Neo Soul、轻爵士', '代表作：《爱爱爱》《春风吹》《黑洞里》', 'tags：温柔表达、律动审美、华语 R&B 的克制感']
      },
      {
        id: 'david-tao',
        tag: 'R&B / Pop',
        title: '陶喆',
        summary: '把 R&B、蓝调、摇滚、福音与华语流行旋律融合得很自然，作品既有流行度，也有编曲和唱腔上的辨识度。',
        bullets: ['风格：R&B、Blues、Rock、Gospel Pop', '代表作：《爱，很简单》《普通朋友》《黑色柳丁》《望春风》', 'tags：华语 R&B 奠基、概念专辑、都市情绪']
      },
      {
        id: 'yellow-huang',
        tag: 'Neo Soul',
        title: '黄宣',
        summary: '融合 Neo Soul、Funk、Jazz 与电子音乐，舞台表现强，作品里有鲜明的色彩感、幽默感和实验性。',
        bullets: ['风格：Neo Soul、Funk、Jazz Fusion、Electronic', '代表作：《独上 C 楼》《不开灯的俱乐部》《羊皮先生》', 'tags：舞台能量、编曲色彩、复古与现代的混合']
      },
      {
        id: 'dean-ting',
        tag: 'Singer-songwriter',
        title: '丁世光',
        summary: '旋律审美细腻，作品常带有 R&B、Soul 与流行抒情气质，适合夜晚听，也适合写成私人歌单式札记。',
        bullets: ['风格：R&B、Soul Pop、Urban Ballad', '代表作：《Simon》《瘦子》《神探》', 'tags：旋律线、夜晚氛围、细腻情绪表达']
      }
    ]
  },
  history: {
    eyebrow: 'History Figures',
    title: '历史人物札记',
    intro: '关于推崇的一些历史人物，象征着人性的光辉与强大',
    items: [
      {
        id: 'zhuge-liang',
        tag: '蜀汉 / 政治家',
        title: '诸葛亮',
        summary: '可以从政治家、军事组织者、制度建设者和理想主义者几个角度写。他的魅力不仅在谋略，也在于蜀汉弱势局面下的长期治理与北伐坚持。',
        bullets: ['关键词：隆中对、治蜀、北伐、鞠躬尽瘁', 'tags：理想与现实、战略与国力、忠诚形象的形成', '争议：北伐是战略必要，还是资源压力下的高风险选择？']
      },
      {
        id: 'li-shimin',
        tag: '唐 / 帝王政治',
        title: '李世民',
        summary: '唐太宗是帝王政治能力的典型样本：军事才能、用人能力、纳谏机制与国家治理共同构成“贞观之治”的基础。',
        bullets: ['关键词：玄武门之变、贞观之治、开明政治', 'tags：权力来源、君臣关系、盛世治理', '争议：如何评价政治功业与夺权阴影之间的张力？']
      },
      {
        id: 'confucius',
        tag: '先秦 / 儒家',
        title: '孔子',
        summary: '孔子的影响不只在伦理说教，而在于重建秩序的思想努力：仁、礼、君子、教育平等化，构成后世儒家传统的核心。',
        bullets: ['关键词：仁、礼、君子、有教无类、论语', 'tags：个人修养、社会秩序、教育观', '争议：孔子的“礼”是保守复古，还是乱世中的秩序方案？']
      }
    ]
  },
  physics: {
    eyebrow: 'Physics',
    title: '伟大的物理学家',
    intro: '以“主要贡献 + 评价角度”的方式记录，后面可以扩展成物理学史时间线。',
    items: [
      {
        id: 'newton',
        tag: 'Classical Mechanics',
        title: '牛顿',
        summary: '建立经典力学体系，提出运动定律与万有引力定律，并在微积分、光学等领域产生深远影响。',
        bullets: ['贡献：经典力学、万有引力、微积分、光学研究', '代表文本：《自然哲学的数学原理》', '评价：把自然现象纳入可计算、可预测的数学框架。']
      },
      {
        id: 'einstein',
        tag: 'Relativity',
        title: '爱因斯坦',
        summary: '以相对论重塑人类对时间、空间、引力的理解，也通过光电效应推动量子理论发展。',
        bullets: ['贡献：狭义相对论、广义相对论、光电效应、质能方程', '代表文本：1905 年奇迹年论文、广义相对论论文', '评价：改变了“时空”本身的定义，也参与开启现代物理。']
      },
      {
        id: 'maxwell',
        tag: 'Electromagnetism',
        title: '麦克斯韦',
        summary: '统一电与磁，预言电磁波存在。他的方程组是现代物理、电气工程和通信技术的重要基础。',
        bullets: ['贡献：麦克斯韦方程组、电磁场理论、电磁波预言、统计物理', '代表文本：《电磁场的动力学理论》', '评价：把法拉第的物理直觉转化为优雅的数学体系。']
      }
    ]
  },
  'books-films': {
    eyebrow: 'Books & Films',
    title: '书籍与影视记录',
    intro: '先做成条目式简介：主题、气质和后续可补充方向都留出来。',
    groups: [
      {
        id: 'books',
        title: '书',
        items: [
          { id: 'kokoro', tag: '夏目漱石', title: '《心》', summary: '围绕孤独、愧疚、伦理负担与近代自我意识展开，适合写“先生”形象和明治精神困境。', bullets: ['主题：孤独、罪责、现代自我', '可写角度：先生的沉默、友情与背叛、时代精神'] },
          { id: 'snow-country', tag: '川端康成', title: '《雪国》', summary: '以冷寂、空灵的笔触写美、距离与虚无感，重点可放在意象、留白和审美化的孤独。', bullets: ['主题：美、距离、虚无', '可写角度：雪、镜像、驹子的形象'] },
          { id: 'catcher', tag: 'J. D. 塞林格', title: '《麦田里的守望者》', summary: '青春期的疏离、反叛与保护纯真的愿望，适合写霍尔顿的厌世与脆弱。', bullets: ['主题：青春、疏离、纯真', '可写角度：霍尔顿的语言、伪善感、守望者意象'] },
          { id: 'byakuyako', tag: '东野圭吾', title: '《白夜行》', summary: '命运、罪与共生关系交织的长篇推理小说，重点可写“没有太阳的人生”和双主角关系。', bullets: ['主题：罪、共生、命运', '可写角度：雪穗与亮司、白夜意象、社会环境'] }
        ]
      },
      {
        id: 'films',
        title: '影视',
        items: [
          { id: 'three-kingdoms', tag: '历史剧', title: '《三国演义》', summary: '群像、权谋、英雄理想与历史兴亡的古典叙事，可按人物线整理刘备、曹操、诸葛亮等。', bullets: ['关键词：群像、兴亡、权谋', '可写角度：人物塑造、台词、古典叙事节奏'] },
          { id: 'ming-1566', tag: '历史剧', title: '《大明王朝1566》', summary: '制度、财政、官僚政治与人性的高密度表达，适合写嘉靖、海瑞、严嵩与改稻为桑。', bullets: ['关键词：财政、制度、官僚政治', '可写角度：嘉靖、海瑞、严嵩、改稻为桑'] },
          { id: 'yongzheng', tag: '历史剧', title: '《雍正王朝》', summary: '改革、权力、孤独与帝王责任的历史剧，可围绕“办实事的代价”展开。', bullets: ['关键词：改革、权力、孤独', '可写角度：雍正形象、吏治、帝王责任'] },
          { id: 'manchester', tag: '电影', title: '《海边的曼彻斯特》', summary: '创伤、失去与无法轻易和解的人生困境，重点是克制叙事和“不是所有伤口都会愈合”。', bullets: ['关键词：创伤、失去、克制', '可写角度：表演、非治愈叙事、情绪留白'] }
        ]
      }
    ]
  }
};

// 内容直接来自本文件中的 SITE_CONTENT。
// （旧版浏览器编辑器已移除，这里顺便清掉它可能残留在浏览器里的缓存，
//  否则用过旧编辑器的人会一直看到过时内容。）
try {
  localStorage.removeItem(CONTENT_STORAGE_KEY);
} catch (error) {
  /* localStorage 不可用时忽略即可 */
}

window.getSiteContent = function getSiteContent() {
  return window.SITE_CONTENT;
};
