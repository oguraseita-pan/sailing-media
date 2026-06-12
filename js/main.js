// main.js ― データをHTMLに描画する

// ―― nav scroll: シャドウのみ ――
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,.06)'
      : '';
  });
}

// ―― sailrank.html 用のみ（ranking.html等では rankList が独自管理） ――
function renderRanking() {
  const el = document.getElementById('rankList');
  // ranking.html は独自のrender()関数で管理するためここでは何もしない
  if (!el) return;
}

function renderForecast() {
  const el = document.getElementById('forecastPreview');
  // sailrank.htmlは独自のrenderForecast()で上書きするためここでは何もしない
  if (!el) return;
}

function renderUnivGrid() {
  const el = document.getElementById('univGrid');
  if (!el) return;
  const topClass = ['top1','top2','top3'];
  el.innerHTML = SITE_DATA.universityRanking.map((u, i) => `
    <div class="univ-card ${topClass[i] || ''}">
      <div class="univ-rank">#${u.rank}</div>
      <div class="univ-info">
        <div class="univ-name">${u.name}</div>
        <div class="univ-pt">${u.pt} pt</div>
      </div>
    </div>
  `).join('');
}

// ―― 共通: 選手データ結合（全ページで使用） ――
// STEP1: individualRanking から正式な大会名・着順付きrecordsを取得
// STEP2: y****_sk470等の年度別データで全選手を補完（99件打ち切り以下の選手も対象）
function buildPlayerMap() {
  const map = {};

  // STEP1: individualRanking（上位20名分の詳細records）
  (SITE_DATA.individualRanking || []).forEach(p => {
    const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
    if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
    if ((p.allPt || p.pt || 0) > map[key].allPt) map[key].allPt = p.allPt || p.pt || 0;
    if (Array.isArray(p.records)) p.records.forEach(r => { map[key].recMap[r.event] = r; });
  });

  // STEP2: y系データから年次成績recordを補完
  // sk470/cr470/skSnipe/crSnipe のみ使用（skipper/crew/individual は除外）
  // individualRankingに掲載されている選手はSTEP1の正式recordを優先
  // それ以外の選手には秋季選手権の正式名称で年間順位recordを追加
  const autumnName = {
    2016:'第83回 関東学生ヨット選手権大会 決勝',
    2017:'第84回 関東学生ヨット選手権大会 決勝',
    2018:'第85回 関東学生ヨット選手権大会 決勝',
    2019:'第86回 関東学生ヨット選手権大会 決勝',
    2020:'第87回 関東学生ヨット選手権大会 決勝',
    2021:'第88回 関東学生ヨット選手権大会 決勝',
    2022:'第89回 関東学生ヨット選手権大会 決勝',
    2023:'第90回 関東学生ヨット選手権大会 決勝',
    2024:'第91回 関東学生ヨット選手権大会 決勝',
    2025:'第92回 関東学生ヨット選手権大会 決勝',
    2026:'関東学生ヨット春季選手権大会 決勝',
  };
  const clsSuffix = { sk470:'470級', cr470:'470級', skSnipe:'スナイプ級', crSnipe:'スナイプ級' };
  Object.keys(SITE_DATA).forEach(k => {
    const m = k.match(/^y(\d{4})_(.+)$/);
    if (!m) return;
    const year = parseInt(m[1]), suffix = m[2];
    const clsLabel = clsSuffix[suffix];
    if (!clsLabel) return; // skipper/crew/individual はスキップ
    (SITE_DATA[k] || []).forEach(p => {
      const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
      if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
      if ((p.allPt || 0) > map[key].allPt) map[key].allPt = p.allPt || 0;
      // STEP1で正式recordが既にある年はスキップ（正確データを優先）
      // 正式recordのevKeyは大会名そのもの、STEP2のevKeyは year_suffix
      const evKey = year + '_' + suffix;
      if (!map[key].recMap[evKey]) {
        const baseName = autumnName[year] || (year + '年度 関東学生ヨット選手権大会 決勝');
        map[key].recMap[evKey] = {
          year,
          event: baseName + ' ' + clsLabel,
          rank: p.rank,
          pt: p.pt || 0
        };
      }
    });
  });

  // recMap → records 配列に変換
  const result = {};
  Object.entries(map).forEach(([key, p]) => {
    const records = Object.values(p.recMap).sort((a, b) => a.year - b.year || a.event.localeCompare(b.event));
    result[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:p.allPt, pt:p.allPt, records };
  });
  return result;
}

document.addEventListener('DOMContentLoaded', () => {
  renderRanking();
  renderForecast();
  renderUnivGrid();
});
