async function loadContent() {
  const res = await fetch('content.json');
  if (!res.ok) throw new Error('Could not load content.json');
  return res.json();
}

function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  return node;
}

function renderNav(data) {
  const onLegalPage = Boolean(document.body.dataset.legalPage);
  const prefix = onLegalPage ? 'index.html' : '';
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = '';
    data.nav.links.forEach(link => nav.appendChild(el('a', { text: link.path, attrs: { href: prefix + link.target } })));
  }
  const cta = document.getElementById('nav-cta');
  if (cta) {
    cta.textContent = data.nav.cta.label;
    cta.setAttribute('href', prefix + data.nav.cta.target);
  }
  const brand = document.getElementById('brand-mark');
  if (brand) brand.textContent = data.brand.displayName;
}

function renderHero(data) {
  if (!document.getElementById('hero-status')) return;
  document.getElementById('hero-status').textContent = data.hero.statusTag;
  document.getElementById('hero-greeting').textContent = data.hero.greeting;
  document.getElementById('hero-name').textContent = data.hero.name;
  document.getElementById('hero-headline').textContent = data.hero.headline;
  document.getElementById('hero-subhead').textContent = data.hero.subhead;
  document.getElementById('frame-tag-status').textContent = data.hero.statusTag;

  const primary = document.getElementById('hero-cta-primary');
  primary.textContent = data.hero.primaryCta.label;
  primary.setAttribute('href', data.hero.primaryCta.target);

  const secondary = document.getElementById('hero-cta-secondary');
  secondary.textContent = data.hero.secondaryCta.label;
  secondary.setAttribute('href', data.hero.secondaryCta.target);

  const stack = document.getElementById('hud-stack');
  data.hero.hudCards.forEach(card => {
    const wrap = el('div', { class: 'hud-card' });
    const left = el('div');
    left.appendChild(el('span', { class: 'hud-label', text: card.label }));
    left.appendChild(el('span', { class: 'hud-value', text: card.value }));
    const right = el('span', { class: 'hud-note', text: card.note });
    wrap.appendChild(left);
    wrap.appendChild(right);
    stack.appendChild(wrap);
  });
}

function renderAbout(data) {
  if (!document.getElementById('about-heading')) return;
  document.getElementById('about-eyebrow').textContent = data.about.eyebrow;
  document.getElementById('about-heading').textContent = data.about.heading;
  document.getElementById('about-bio').textContent = data.about.bio;
  const list = document.getElementById('focus-list');
  data.about.focusAreas.forEach(item => list.appendChild(el('li', { text: item })));
}

function renderSkills(data) {
  const heading = document.getElementById('skills-heading');
  if (!heading) return;
  heading.textContent = data.skills.heading;
  document.getElementById('skills-intro').textContent = data.skills.intro;
  const groups = document.getElementById('skills-groups');
  data.skills.groups.forEach(group => {
    const wrap = el('div', { class: 'skill-group' });
    wrap.appendChild(el('span', { class: 'skill-group-label', text: group.label }));
    const tags = el('ul', { class: 'skill-tags' });
    group.items.forEach(item => tags.appendChild(el('li', { text: item })));
    wrap.appendChild(tags);
    groups.appendChild(wrap);
  });
}

function renderWork(data) {
  const heading = document.getElementById('work-heading');
  if (!heading) return;
  heading.textContent = data.work.heading;
  document.getElementById('work-intro').textContent = data.work.intro;
  const grid = document.getElementById('work-grid');
  data.work.projects.forEach(p => {
    const card = el('div', { class: 'work-card' });
    card.appendChild(el('span', { class: 'work-index', text: p.index }));
    card.appendChild(el('span', { class: 'work-category', text: p.category }));
    const top = el('div', { class: 'work-card-top' });
    top.appendChild(el('h3', { text: p.name }));
    top.appendChild(el('span', { class: 'work-type', text: p.type }));
    card.appendChild(top);
    card.appendChild(el('p', { class: 'desc', text: p.description }));
    const tags = el('ul', { class: 'work-tags' });
    p.tags.forEach(tag => tags.appendChild(el('li', { text: tag })));
    card.appendChild(tags);
    card.appendChild(el('span', { class: 'file-placeholder', text: `${p.filesLabel} (placeholder)` }));
    grid.appendChild(card);
  });
}

function renderCertificates(data) {
  const heading = document.getElementById('certificates-heading');
  if (!heading) return;
  heading.textContent = data.certificates.heading;
  document.getElementById('certificates-intro').textContent = data.certificates.intro;
  const grid = document.getElementById('cert-grid');
  data.certificates.items.forEach(cert => {
    const card = el('div', { class: 'cert-card' });
    const info = el('div', { class: 'cert-info' });
    info.appendChild(el('h3', { text: cert.title }));
    info.appendChild(el('p', { class: 'cert-meta', text: `${cert.issuer} - ${cert.date}` }));
    card.appendChild(info);
    card.appendChild(el('span', { class: 'file-placeholder', text: 'Certificate file (placeholder)' }));
    grid.appendChild(card);
  });
}

function renderContact(data) {
  const heading = document.getElementById('contact-heading');
  if (!heading) return;
  heading.textContent = data.contact.heading;
  document.getElementById('contact-prompt').textContent = data.contact.terminalPrompt;
  document.getElementById('contact-intro').textContent = data.contact.intro;
  const email = document.getElementById('contact-email');
  email.textContent = data.contact.email;
  email.setAttribute('href', `mailto:${data.contact.email}`);
  document.getElementById('label-name').textContent = data.contact.formLabels.name;
  document.getElementById('label-email').textContent = data.contact.formLabels.email;
  document.getElementById('label-message').textContent = data.contact.formLabels.message;
  document.getElementById('form-submit').textContent = data.contact.formLabels.submit;
}

function renderFooter(data) {
  const credit = document.getElementById('footer-credit');
  if (!credit) return;
  credit.textContent = data.footer.credit;
  document.getElementById('footer-handle').textContent = data.footer.handle;
  const socials = document.getElementById('footer-socials');
  data.footer.socials.forEach(s => {
    const li = el('li');
    li.appendChild(el('a', { text: s.label, attrs: { href: s.url, target: '_blank', rel: 'noopener' } }));
    socials.appendChild(li);
  });
  const legal = document.getElementById('footer-legal');
  if (legal) {
    data.footer.legalLinks.forEach(l => {
      const li = el('li');
      li.appendChild(el('a', { text: l.label, attrs: { href: l.url } }));
      legal.appendChild(li);
    });
  }
  document.getElementById('footer-note').textContent = data.footer.note;
}

function renderLegal(data) {
  const page = document.body.dataset.legalPage;
  if (!page) return;
  const content = data.legal[page];
  if (!content) return;
  document.title = `${content.title} - ${data.brand.displayName}`;
  document.getElementById('legal-title').textContent = content.title;
  document.getElementById('legal-updated').textContent = content.updated;
  const body = document.getElementById('legal-body');
  content.sections.forEach(section => {
    const wrap = el('div', { class: 'legal-section' });
    wrap.appendChild(el('h2', { text: section.heading }));
    wrap.appendChild(el('p', { text: section.body }));
    body.appendChild(wrap);
  });
}

function setupNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const header = document.querySelector('.site-header');
  if (!toggle || !header) return;
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav a, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    status.textContent = name
      ? `Thanks, ${name}. That is in. Expect a reply within a day.`
      : `Thanks. That is in. Expect a reply within a day.`;
    form.reset();
  });
}

async function init() {
  try {
    const data = await loadContent();
    if (!document.body.dataset.legalPage) {
      document.title = `${data.brand.displayName} - ${data.brand.tagline}`;
    }
    renderNav(data);
    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderWork(data);
    renderCertificates(data);
    renderContact(data);
    renderFooter(data);
    renderLegal(data);
    setupNavToggle();
    setupForm();
  } catch (err) {
    document.body.innerHTML = `<div style="padding:64px;font-family:monospace;color:#F7D9FC;background:#0d0620;min-height:100vh;">
      <h1>Could not load content.json</h1>
      <p>Browsers block local file:// fetches. Run a local server from this folder, e.g. python3 -m http.server, then open http://localhost:8000.</p>
    </div>`;
    console.error(err);
  }
}

init();