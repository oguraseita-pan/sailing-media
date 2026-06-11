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

  // STEP2: 年度別データ（skipper/crew/individual は重複するため除外）
  // STEP2: y系データから選手の存在・allPt・clsを補完する
  // 【重要】y系のptは年間累計ptであり特定大会の記録ではない
  // 大会別成績（records）はSTEP1のindividualRankingのみが正確なデータ
  // ここでは選手の存在確認とallPtの更新のみ行い、疑似recordは作らない
  Object.keys(SITE_DATA).forEach(k => {
    if (!k.match(/^y\d{4}_/)) return;
    (SITE_DATA[k] || []).forEach(p => {
      const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
      if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
      // allPtは最大値を保持（年間累計ptの最大値 = 最終年度の累計）
      if ((p.allPt || 0) > map[key].allPt) map[key].allPt = p.allPt || 0;
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
