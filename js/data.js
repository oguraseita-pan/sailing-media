// ============================================================
//  data.js  ―  2016〜2019年度 関東学生ヨット 実データ
//  対象大会：春季決勝・秋季決勝・関東個人選手権
//  ランキング算出：決勝×1.0倍、個人選手権×0.8倍
// ============================================================

const SITE_DATA = {

  individualRanking: [
    { rank:1,  name:"高山 颯太",   univ:"中央大学",      role:"Skipper", cls:"スナイプ級", pt:289 },
    { rank:2,  name:"松尾 虎太郎", univ:"早稲田大学",    role:"Skipper", cls:"スナイプ級", pt:250 },
    { rank:3,  name:"入江 裕太",   univ:"早稲田大学",    role:"Skipper", cls:"スナイプ級", pt:245 },
    { rank:4,  name:"元津 志緒",   univ:"早稲田大学",    role:"Skipper", cls:"470級",    pt:242 },
    { rank:5,  name:"池田 紅葉",   univ:"日本大学",      role:"Skipper", cls:"スナイプ級", pt:229 },
    { rank:6,  name:"中山 由紀美", univ:"日本大学",      role:"Skipper", cls:"470級",    pt:228 },
    { rank:7,  name:"小倉 晴太",   univ:"明治大学",      role:"Skipper", cls:"470級",    pt:212 },
    { rank:8,  name:"高宮 豪太",   univ:"慶應義塾大学",  role:"Skipper", cls:"470級",    pt:199 },
    { rank:9,  name:"佐藤 海志",   univ:"日本大学",      role:"Skipper", cls:"スナイプ級", pt:193 },
    { rank:10, name:"太中 賢",     univ:"慶應義塾大学",  role:"Skipper", cls:"スナイプ級", pt:180 },
    { rank:11, name:"玉山 裕登",   univ:"慶應義塾大学",  role:"Skipper", cls:"スナイプ級", pt:175 },
    { rank:12, name:"鍋岡 薫",     univ:"明海大学",      role:"Skipper", cls:"470級",    pt:149 },
    { rank:13, name:"花本 菜美",   univ:"明海大学",      role:"Skipper", cls:"スナイプ級", pt:148 },
    { rank:14, name:"尾道 佳諭",   univ:"早稲田大学",    role:"Skipper", cls:"スナイプ級", pt:148 },
    { rank:15, name:"菅野 翔",     univ:"中央大学",      role:"Skipper", cls:"470級",    pt:144 },
  ],

  universityRanking: [
    { rank:1,  name:"早稲田大学",    pt:"385", events:4, top3:4, avgRank:"1.2" },
    { rank:2,  name:"慶應義塾大学",  pt:"335", events:4, top3:4, avgRank:"2.2" },
    { rank:3,  name:"日本大学",      pt:"310", events:4, top3:3, avgRank:"2.8" },
    { rank:4,  name:"明海大学",      pt:"250", events:4, top3:0, avgRank:"4.2" },
    { rank:5,  name:"中央大学",      pt:"240", events:4, top3:1, avgRank:"4.5" },
    { rank:6,  name:"法政大学",      pt:"181", events:4, top3:0, avgRank:"6.2" },
    { rank:7,  name:"明治大学",      pt:"167", events:4, top3:0, avgRank:"6.8" },
    { rank:8,  name:"東京大学",      pt:"136", events:4, top3:0, avgRank:"8.0" },
    { rank:9,  name:"学習院大学",    pt:"100", events:4, top3:0, avgRank:"10.2" },
    { rank:10, name:"横浜国立大学",  pt:"77",  events:3, top3:0, avgRank:"10.0" },
  ],

  nextEvent: "次回大会 AI予測",
  forecasts: [
    { rank:1, name:"早稲田大学",   pct:32.1, meta:"4大会連続TOP2・平均順位1.2位" },
    { rank:2, name:"慶應義塾大学", pct:26.4, meta:"4大会連続TOP3・平均順位2.2位" },
    { rank:3, name:"日本大学",     pct:18.7, meta:"4大会TOP3×3回・平均順位2.8位" },
    { rank:4, name:"明海大学",     pct:10.2, meta:"4大会連続出場・平均順位4.2位" },
    { rank:5, name:"中央大学",     pct:8.5,  meta:"TOP3×1回・平均順位4.5位" },
  ],
};
