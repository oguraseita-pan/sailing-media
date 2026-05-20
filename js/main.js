// main.js ― データをHTMLに描画する

// ―― nav scroll: 白背景を維持しつつシャドウのみ ――
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,.06)'
      : '';
  });
}

function renderRanking() {
  const el = document.getElementById('rankList');
  if (!el) return;
  const topClass = ['top1','top2','top3'];
  el.innerHTML = SITE_DATA.individualRanking.map((p, i) => `
    <div class="rank-row ${topClass[i] || ''}">
      <div class="rank-num">#${p.rank}</div>
      <div><div class="rank-name">${p.name}</div><div class="rank-role">${p.role}</div></div>
      <div class="rank-univ">${p.univ}</div>
      <div class="rank-class">${p.cls}</div>
      <div class="rank-pt">${p.pt}</div>
    </div>
  `).join('');
}

function renderForecast() {
  const el = document.getElementById('forecastPreview');
  if (!el) return;
  const maxPct = SITE_DATA.forecasts[0].pct;
  el.innerHTML = SITE_DATA.forecasts.map(f => `
    <div class="forecast-card">
      <div class="forecast-rank-num">PREDICTED #${f.rank}</div>
      <div class="forecast-name">${f.name}</div>
      <div class="forecast-pct">${f.pct}%</div>
      <div class="forecast-bar">
        <div class="forecast-bar-fill" style="width:${(f.pct/maxPct*100).toFixed(1)}%"></div>
      </div>
      <div class="forecast-meta">${f.meta}</div>
    </div>
  `).join('');
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

document.addEventListener('DOMContentLoaded', () => {
  renderRanking();
  renderForecast();
  renderUnivGrid();
});
