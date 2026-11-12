const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lastProject;
function projectArt(project, suffix, thumbnail = false) {
  const art = thumbnail && project.thumbnail ? project.thumbnail : project.visual;
  if (!art && project.image) return `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy">`;
  return visuals[art].replace(/id="([^"]+)"/g, `id="$1-${suffix}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${suffix})`);
}
function projectOutcome(project) {
  return `<p class="project-outcome"><strong>${escapeHtml(project.outcome.headline)}</strong><span>${escapeHtml(project.outcome.detail)}</span></p>`;
}
function renderProjects(filter = 'all') {
  const visible = projects.filter(p => filter === 'all' || p.category === filter);
  grid.classList.toggle('filtered', filter !== 'all');
  grid.innerHTML = visible.map(p => `<article class="project${p.featured ? ' featured' : ''}"><button class="project-button" data-project="${escapeHtml(p.id)}" aria-haspopup="dialog" aria-label="View ${escapeHtml(p.title)}"><div class="project-art">${projectArt(p, p.id, true)}<span class="project-open" aria-hidden="true">+</span></div><div class="project-info"><div class="project-heading"><h3>${escapeHtml(p.title)}</h3><span class="project-kind">${escapeHtml(p.kind)}</span></div><p class="project-desc">${escapeHtml(p.description)}</p>${projectOutcome(p)}<div class="tags">${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div></div></button></article>`).join('');
  document.querySelector('#filter-status').textContent = filter === 'work' ? `${visible.length} work projects shown.` : `${visible.length} ${filter === 'school' ? 'academic ' : ''}projects shown.`;
}
renderProjects();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  renderProjects(button.dataset.filter);
}));
grid.addEventListener('click', e => {
  const button = e.target.closest('[data-project]');
  if (!button) return;
  const p = projects.find(p => p.id === button.dataset.project);
  lastProject = button;
  document.querySelector('#dialog-context').textContent = p.repo ? 'Academic project' : 'Work project';
  const sections = p.sections || [['The question',p.question],['The method',p.method],['The evidence',p.evidence],['The next iteration',p.next]];
  document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title" class="dialog-title">${escapeHtml(p.title)}</h2><p class="dialog-intro">${escapeHtml(p.description)}</p>${projectOutcome(p)}${p.repo ? `<a class="repo-link" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer">View project on GitHub ↗</a>` : ''}<div class="dialog-art">${projectArt(p, 'dialog')}</div>${p.imageCaption ? `<p class="figure-caption">${escapeHtml(p.imageCaption)}</p>` : ''}<div class="dossier-grid">${sections.map(([title,body]) => `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></section>`).join('')}</div><p class="project-note">${escapeHtml(p.provenance)}</p>`;
  dialog.showModal();
  dialog.scrollTop = 0;
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close', () => lastProject?.focus());

