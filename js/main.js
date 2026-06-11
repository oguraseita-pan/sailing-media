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
  // 各キーと大会名の対応
  // sk470/cr470/skSnipe/crSnipe → 秋季選手権（クラス別順位）
  // skipper/crew → 個人選手権（役割別順位）
  // individual → 個人選手権総合（全体順位）
  // ※ 同一ptでも別大会・別順位なので全て別レコードとして表示
  const suffixLabel = {
    sk470:      '関東秋季選手権 470級',
    cr470:      '関東秋季選手権 470級',
    skSnipe:    '関東秋季選手権 スナイプ級',
    crSnipe:    '関東秋季選手権 スナイプ級',
    skipper:    '個人選手権 スキッパー部門',
    crew:       '個人選手権 クルー部門',
    individual: '個人選手権 総合',
  };
  Object.keys(SITE_DATA).forEach(k => {
    const m = k.match(/^y(\d{4})_(.+)$/);
    if (!m) return;
    const year = parseInt(m[1]), suffix = m[2];
    const label = suffixLabel[suffix];
    if (!label) return;
    (SITE_DATA[k] || []).forEach(p => {
      const key = p.name + '|' + p.univ + '|' + p.cls + '|' + p.role;
      if (!map[key]) map[key] = { name:p.name, univ:p.univ, cls:p.cls, role:p.role, allPt:0, recMap:{} };
      if ((p.allPt || p.pt || 0) > map[key].allPt) map[key].allPt = p.allPt || p.pt || 0;
      // evKey = year_suffix でキーを一意化（同一大会の重複登録を防ぐ）
      // STEP1の正式な大会名recordがある場合は上書きしない
      const evKey = year + '_' + suffix;
      if (!map[key].recMap[evKey]) {
        map[key].recMap[evKey] = { year, event: year + '年度 ' + label, rank: p.rank, pt: p.pt || 0 };
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
