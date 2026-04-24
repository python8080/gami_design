function toast(msg){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2800);
}
window.toast=toast;

// Mark active nav link
document.addEventListener('DOMContentLoaded',()=>{
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nl').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop();
    if(href===page)a.classList.add('active');
    else a.classList.remove('active');
  });
  // Active for dropdown items
  document.querySelectorAll('.ndm-item').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('/').pop();
    if(href===page){
      a.classList.add('active');
      // Also mark parent
      const dd=a.closest('.nav-dropdown');
      if(dd) dd.querySelector('.nl').classList.add('active');
    }
  });
});

// ── HAMBURGER MENU ──
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Inject hamburger button
  const burger = document.createElement('button');
  burger.className = 'nav-hamburger';
  burger.setAttribute('aria-label', 'Menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  // Build drawer
  const linksEl = nav.querySelector('.nav-links');
  const ctaEl = nav.querySelector('.nav-cta');
  const drawer = document.createElement('div');
  drawer.className = 'nav-drawer';

  if (linksEl) {
    linksEl.querySelectorAll(':scope > .nl, :scope > .nav-dropdown').forEach(el => {
      if (el.classList.contains('nav-dropdown')) {
        // Build collapsible sub-section
        const label = el.querySelector('.nl').textContent.trim();
        const toggle = document.createElement('div');
        toggle.className = 'drawer-sub-toggle';
        toggle.textContent = label;

        const subList = document.createElement('div');
        subList.className = 'drawer-sub-list';

        el.querySelectorAll('.ndm-item').forEach(item => {
          const link = document.createElement('a');
          link.href = item.getAttribute('href') || '#';
          // badge
          const badge = item.querySelector('.ndm-badge');
          if(badge){
            const b = badge.cloneNode(true);
            link.appendChild(b);
          }
          const span = document.createElement('span');
          span.textContent = item.querySelector('span:last-child')?.textContent || item.textContent.trim();
          link.appendChild(span);
          subList.appendChild(link);
        });

        toggle.addEventListener('click', () => {
          toggle.classList.toggle('open');
          subList.classList.toggle('open');
        });

        drawer.appendChild(toggle);
        drawer.appendChild(subList);
      } else {
        const clone = el.cloneNode(true);
        drawer.appendChild(clone);
      }
    });
  }
  if (ctaEl) {
    const ctaClone = ctaEl.cloneNode(true);
    ctaClone.className = 'nav-cta';
    drawer.appendChild(ctaClone);
  }
  document.body.appendChild(drawer);

  // Toggle
  burger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(el => {
    el.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
