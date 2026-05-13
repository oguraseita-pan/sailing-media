// ============================================================
//  data.js  ―  2019年度 関東学生ヨット選手権 実データ
//  対象大会：春季決勝・秋季決勝・関東個人選手権
//  ランキング算出：決勝×1.0倍、個人選手権×0.8倍
//  ※ 予選・女子レースはランキング対象外
// ============================================================

const SITE_DATA = {

  // ── 個人総合ランキング ────────────────────────────────────────
  individualRanking: [
    { rank:1,  name:"佐藤 海志",        univ:"日本大学",      role:"Skipper", cls:"スナイプ級", pt:193 },
    { rank:2,  name:"松尾 虎太郎",       univ:"早稲田大学",    role:"Skipper", cls:"スナイプ級", pt:180 },
    { rank:3,  name:"高宮 豪太",         univ:"慶應義塾大学",  role:"Skipper", cls:"470級",    pt:153 },
    { rank:4,  name:"小倉 晴太",         univ:"明治大学",      role:"Skipper", cls:"470級",    pt:147 },
    { rank:5,  name:"小木曽 涼",         univ:"慶應義塾大学",  role:"Skipper", cls:"470級",    pt:138 },
    { rank:6,  name:"尾道 佳諭",         univ:"早稲田大学",    role:"Skipper", cls:"スナイプ級", pt:138 },
    { rank:7,  name:"高山 颯太",         univ:"中央大学",      role:"Skipper", cls:"スナイプ級", pt:135 },
    { rank:8,  name:"加藤 凡尋",         univ:"明海大学",      role:"Skipper", cls:"スナイプ級", pt:121 },
    { rank:9,  name:"玉山 裕登",         univ:"慶應義塾大学",  role:"Skipper", cls:"スナイプ級", pt:119 },
    { rank:10, name:"鈴木 真人",         univ:"明海大学",      role:"Skipper", cls:"470級",    pt:102 },
    { rank:11, name:"小西 健治",         univ:"中央大学",      role:"Skipper", cls:"470級",    pt:102 },
    { rank:12, name:"高山 大智",         univ:"日本大学",      role:"Skipper", cls:"470級",    pt:100 },
    { rank:13, name:"戸沢 真矢",         univ:"東京大学",      role:"Skipper", cls:"スナイプ級", pt:88  },
    { rank:14, name:"小泉 凱皇",         univ:"早稲田大学",    role:"Skipper", cls:"470級",    pt:87  },
    { rank:15, name:"西村 宗至朗",       univ:"早稲田大学",    role:"Skipper", cls:"470級",    pt:85  },
  ],

  // ── 大学ランキング ────────────────────────────────────────────
  universityRanking: [
    { rank:1,  name:"早稲田大学",    pt:"185", events:2, top3:2, avgRank:"1.5" },
    { rank:2,  name:"慶應義塾大学",  pt:"175", events:2, top3:2, avgRank:"2.0" },
    { rank:3,  name:"日本大学",      pt:"160", events:2, top3:2, avgRank:"2.5" },
    { rank:4,  name:"明海大学",      pt:"130", events:2, top3:0, avgRank:"4.0" },
    { rank:5,  name:"中央大学",      pt:"110", events:2, top3:0, avgRank:"5.0" },
    { rank:6,  name:"法政大学",      pt:"87",  events:2, top3:0, avgRank:"6.5" },
    { rank:7,  name:"明治大学",      pt:"87",  events:2, top3:0, avgRank:"6.5" },
    { rank:8,  name:"東京大学",      pt:"68",  events:2, top3:0, avgRank:"8.0" },
    { rank:9,  name:"横浜国立大学",  pt:"58",  events:2, top3:0, avgRank:"9.0" },
    { rank:10, name:"学習院大学",    pt:"42",  events:2, top3:0, avgRank:"11.5" },
  ],

  // ── AI大会予測 ────────────────────────────────────────────────
  nextEvent: "2019 秋季関東学生ヨット選手権大会 決勝",
  forecasts: [
    { rank:1, name:"早稲田大学",   pct:28.4, meta:"対象大会2・表彰台2回・平均順位1.5" },
    { rank:2, name:"慶應義塾大学", pct:24.1, meta:"対象大会2・表彰台2回・平均順位2.0" },
    { rank:3, name:"日本大学",     pct:20.8, meta:"対象大会2・表彰台2回・平均順位2.5" },
    { rank:4, name:"明海大学",     pct:12.3, meta:"対象大会2・表彰台0回・平均順位4.0" },
    { rank:5, name:"中央大学",     pct:9.7,  meta:"対象大会2・表彰台0回・平均順位5.0" },
  ],

  // ── 大会一覧（results.htmlで使用） ───────────────────────────
  events: [
    {
      id: "2019-spring-final",
      name: "2019年度 関東学生ヨット春季選手権大会 決勝",
      date: "2019年5月11日・12日",
      weight: "×1.0（ランキング対象）",
      winner: "慶應義塾大学",
      results: [
        { rank:1,  univ:"慶應義塾大学", pts470:117, ptsSnipe:208, total:325 },
        { rank:2,  univ:"早稲田大学",   pts470:153, ptsSnipe:180, total:333 },
        { rank:3,  univ:"日本大学",     pts470:188, ptsSnipe:185, total:373 },
        { rank:4,  univ:"明海大学",     pts470:250, ptsSnipe:274, total:524 },
        { rank:5,  univ:"中央大学",     pts470:373, ptsSnipe:257, total:630 },
        { rank:6,  univ:"法政大学",     pts470:230, ptsSnipe:426, total:656 },
        { rank:7,  univ:"明治大学",     pts470:349, ptsSnipe:438, total:787 },
        { rank:8,  univ:"東京大学",     pts470:482, ptsSnipe:384, total:866 },
        { rank:9,  univ:"横浜国立大学", pts470:528, ptsSnipe:539, total:1067 },
        { rank:10, univ:"学習院大学",   pts470:568, ptsSnipe:537, total:1105 },
      ]
    },
    {
      id: "2019-autumn-final",
      name: "第86回 関東学生ヨット選手権大会 決勝",
      date: "2019年10月4日・5日・6日",
      weight: "×1.0（ランキング対象）",
      winner: "早稲田大学",
      results: [
        { rank:1,  univ:"早稲田大学",   pts470:201, ptsSnipe:123, total:324 },
        { rank:2,  univ:"日本大学",     pts470:105, ptsSnipe:252, total:357 },
        { rank:3,  univ:"慶應義塾大学", pts470:152, ptsSnipe:272, total:424 },
        { rank:4,  univ:"明海大学",     pts470:361, ptsSnipe:297, total:658 },
        { rank:5,  univ:"中央大学",     pts470:345, ptsSnipe:356, total:701 },
        { rank:6,  univ:"明治大学",     pts470:378, ptsSnipe:411, total:789 },
      ]
    },
  ],

};
