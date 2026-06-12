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
// STEP1: data.jsのplayerRecords（PDF全件）から正確な大会名・着順・pt付きrecordsを取得
// STEP2: y****_sk470等の年度別データで選手の存在とallPtを補完
function buildPlayerMap() {
  const map = {};

  // STEP1: playerRecords（PDFから抽出した全選手の正確な大会記録）
  const pr = SITE_DATA.playerRecords || {};
  Object.keys(pr).forEach(key => {
    const parts = key.split('|');
    if (parts.length !== 4) return;
    const [name, univ, cls, role] = parts;
    if (!map[key]) map[key] = { name, univ, cls, role, allPt:0, recMap:{} };
    pr[key].forEach(r => {
      map[key].recMap[r.event] = r;
    });
  });

  // individualRankingで allPt を補完（累計ランキングに基づく正確な値）
  (SITE_DATA.individualRanking || []).forEach(p => {
    const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
    if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
    if ((p.allPt || 0) > map[key].allPt) map[key].allPt = p.allPt || 0;
    // individualRankingにのみ存在するrecords（2016個人470等、PDFで取れなかった分）を補完
    if (Array.isArray(p.records)) {
      p.records.forEach(r => {
        if (!map[key].recMap[r.event]) map[key].recMap[r.event] = r;
      });
    }
  });

  // STEP2: y系データで allPt を補完（playerRecords未掲載選手も対象）
  Object.keys(SITE_DATA).forEach(k => {
    if (!k.match(/^y\d{4}_/)) return;
    (SITE_DATA[k] || []).forEach(p => {
      const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
      if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
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
