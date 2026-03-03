// ===== El Imperio - SPA Router & Auth =====

const AUTH_KEY = 'imperio_auth';
const ADMIN_PAGES = ['dashboard', 'orders', 'collections', 'routes', 'whatsapp', 'driver'];
const PUBLIC_PAGES = ['landing', 'login', 'catalog', 'cart'];

const routes = {
    'landing': 'pages/landing.html',
    'login': 'pages/login.html',
    'catalog': 'pages/catalog.html',
    'cart': 'pages/cart.html',
    'dashboard': 'pages/dashboard.html',
    'orders': 'pages/orders.html',
    'collections': 'pages/collections.html',
    'routes': 'pages/routes.html',
    'driver': 'pages/driver.html',
    'whatsapp': 'pages/whatsapp.html',
};

function isLoggedIn() { return localStorage.getItem(AUTH_KEY) === 'true'; }

function login(email, password) {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
        localStorage.setItem(AUTH_KEY, 'true');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    Cart.clear();
    navigate('landing');
    showToast('Sesion cerrada', 'logout');
}

function showToast(message, icon = 'check_circle') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast) return;
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toast.classList.remove('hidden');
    toast.querySelector('div').classList.add('animate-slide-up');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => { toast.classList.add('hidden'); }, 2500);
}

window.openProductModal = function(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    const modal = document.getElementById('product-modal');
    const modalContent = modal.querySelector('.bg-white');
    modalContent.scrollTop = 0;
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-desc').textContent = p.description || 'Sin descripcion disponible.';
    const unitLabel = p.unit.includes('kg') ? 'gr a $ ' + (p.price / 1000).toFixed(1) : p.unit;
    document.getElementById('modal-unit-price').textContent = unitLabel;
    document.getElementById('modal-price-now').textContent = formatPrice(p.price);
    document.getElementById('modal-weight').textContent = p.weight;
    document.getElementById('modal-subtotal').textContent = formatPrice(p.price);
    document.getElementById('modal-total').textContent = formatPrice(p.price);
    const addBtn = document.getElementById('modal-add-button');
    addBtn.onclick = (e) => { e.stopPropagation(); Cart.addItem(p.id); closeProductModal(); };
    const recContainer = document.getElementById('modal-recommendations');
    if (recContainer) {
        const recs = PRODUCTS.filter(item => item.id !== p.id).sort(() => 0.5 - Math.random()).slice(0, 2);
        recContainer.innerHTML = recs.map(r => `
            <div onclick="event.stopPropagation(); openProductModal(${r.id})" class="flex items-center gap-4 bg-white p-3 rounded-2xl border border-[#A68252]/10 hover:border-[#A68252]/30 transition-all cursor-pointer group shadow-sm">
                <div class="size-16 rounded-full bg-[#FAF7F2] p-1.5 border border-[#A68252]/5 flex-shrink-0">
                    <img src="${r.img}" alt="${r.name}" class="w-full h-full object-contain group-hover:scale-110 transition duration-500">
                </div>
                <div class="flex-1 min-w-0">
                    <span class="text-[#A68252] text-[8px] font-black uppercase tracking-wider block mb-0.5">${r.category}</span>
                    <h4 class="text-slate-900 font-bold text-[11px] truncate uppercase">${r.name}</h4>
                    <p class="text-primary font-black text-[13px]">${formatPrice(r.price)}</p>
                </div>
                <div class="size-9 rounded-xl bg-[#FAF7F2] text-[#A68252] flex items-center justify-center group-hover:bg-[#A68252] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[20px]">add</span>
                </div>
            </div>
        `).join('');
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modal.onclick = (e) => { if (e.target === modal) closeProductModal(); };
};

window.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
};

const pageCache = {};

async function loadPage(pageName) {
    if (pageCache[pageName]) return pageCache[pageName];
    const url = routes[pageName];
    if (!url) return '<div class="flex items-center justify-center min-h-screen"><p class="text-slate-400 text-xl">Pagina no encontrada</p></div>';
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Not found');
        const html = await resp.text();
        pageCache[pageName] = html;
        return html;
    } catch {
        return '<div class="flex items-center justify-center min-h-screen"><p class="text-red-500 text-xl">Error cargando pagina</p></div>';
    }
}

async function navigate(pageName) {
    if (!pageName || !routes[pageName]) pageName = 'landing';
    if (ADMIN_PAGES.includes(pageName) && !isLoggedIn()) { location.hash = '#/login'; return; }
    const sidebar = document.getElementById('admin-sidebar');
    const content = document.getElementById('page-content');
    const showSidebar = ADMIN_PAGES.includes(pageName) && isLoggedIn();
    if (showSidebar) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('flex');
        content.style.marginLeft = '16rem';
    } else {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('flex');
        content.style.marginLeft = '0';
    }
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
    });
    const html = await loadPage(pageName);
    content.innerHTML = `<div class="page-enter">${html}</div>`;
    initPage(pageName);
    Cart.updateBadges();
    window.scrollTo(0, 0);
}

function initPage(pageName) {
    switch (pageName) {
        case 'login': initLoginPage(); break;
        case 'catalog': initCatalogPage(); break;
        case 'cart': initCartPage(); break;
        case 'dashboard': initDashboardPage(); break;
        case 'landing': initLandingPage(); break;
    }
}

function initLoginPage() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        const errEl = document.getElementById('login-error');
        if (login(email, pass)) {
            showToast('Bienvenido, ' + DEMO_USER.name + '!', 'waving_hand');
            navigate('dashboard');
        } else {
            if (errEl) {
                errEl.textContent = 'Credenciales invalidas. Usa: admin@elimperio.com / imperio2024';
                errEl.classList.remove('hidden');
            }
        }
    });
}

function initLandingPage() {
    document.querySelectorAll('[data-navigate]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const target = el.dataset.navigate;
            if (target) location.hash = '#/' + target;
        });
    });
    const catGrid = document.getElementById('categories-grid');
    if (catGrid && typeof CATEGORIES !== 'undefined') {
        catGrid.innerHTML = CATEGORIES.map(c => `
        <a href="#/catalog" class="relative rounded-xl overflow-hidden aspect-square group cursor-pointer border border-white/5 hover:border-primary/30 transition-all">
            <img src="${c.img}" alt="${c.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col items-center justify-end p-3">
                <span class="text-2xl mb-1">${c.icon}</span>
                <span class="text-white font-bold text-sm text-center">${c.name}</span>
                <span class="text-slate-400 text-[10px]">${c.count} productos</span>
            </div>
        </a>`).join('');
    }
    function renderProductCard(p) {
        return `
        <div onclick="openProductModal(${p.id})" class="bg-[#141414] rounded-xl overflow-hidden border border-white/5 hover:border-primary/20 group transition-all hover:shadow-lg cursor-pointer">
            <div class="relative overflow-hidden aspect-[4/3]">
                <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                ${p.badge ? `<span class="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">${p.badge}</span>` : ''}
                ${p.oldPrice ? `<span class="absolute top-2 right-2 bg-accent-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ''}
            </div>
            <div class="p-3">
                <p class="text-[10px] text-primary uppercase tracking-wider font-bold mb-0.5">${p.category}</p>
                <h3 class="font-bold text-white text-sm mb-0.5 truncate">${p.name}</h3>
                <p class="text-slate-500 text-[11px] mb-2">${p.weight} &middot; ${p.unit}</p>
                <div class="flex items-center justify-between">
                    <div>
                        ${p.oldPrice ? `<span class="text-slate-500 text-xs line-through mr-1">${formatPrice(p.oldPrice)}</span>` : ''}
                        <span class="text-primary font-extrabold text-sm">${formatPrice(p.price)}</span>
                    </div>
                    <button onclick="event.stopPropagation(); Cart.addItem(${p.id})" class="bg-primary/10 hover:bg-primary text-primary hover:text-white size-8 rounded-lg flex items-center justify-center transition-all">
                        <span class="material-symbols-outlined text-lg">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>`;
    }
    const prodGrid = document.getElementById('products-grid');
    if (prodGrid && typeof PRODUCTS !== 'undefined') prodGrid.innerHTML = PRODUCTS.slice(0, 8).map(renderProductCard).join('');
    const bsGrid = document.getElementById('bestsellers-grid');
    if (bsGrid && typeof PRODUCTS !== 'undefined') bsGrid.innerHTML = PRODUCTS.slice(4, 8).map(renderProductCard).join('');
    const totalEl = document.querySelector('.cart-total-display');
    if (totalEl) totalEl.textContent = formatPrice(Cart.getTotal());
}

function initCatalogPage() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    function renderProducts(filter = 'Todos') {
        const filtered = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
        grid.innerHTML = filtered.map(p => `
            <div onclick="openProductModal(${p.id})" class="glass-card rounded-xl overflow-hidden group transition-all hover:scale-[1.02] cursor-pointer">
                <div class="relative overflow-hidden aspect-[4/3]">
                    <img src="${p.img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    ${p.badge ? `<span class="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">${p.badge}</span>` : ''}
                </div>
                <div class="p-4">
                    <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">${p.category}</p>
                    <h3 class="font-bold text-white text-sm mb-1">${p.name}</h3>
                    <p class="text-xs text-slate-400 mb-3">${p.weight}</p>
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-primary font-extrabold text-lg">${formatPrice(p.price)}</span>
                            ${p.oldPrice ? `<span class="text-slate-500 text-xs line-through ml-1">${formatPrice(p.oldPrice)}</span>` : ''}
                        </div>
                        <button onclick="event.stopPropagation(); Cart.addItem(${p.id})" class="size-10 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition magenta-glow-hover">
                            <span class="material-symbols-outlined text-white text-lg">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderProducts();
    document.querySelectorAll('.cat-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active-filter'));
            btn.classList.add('active-filter');
            renderProducts(btn.dataset.cat);
        });
    });
}

function initCartPage() { renderCart(); }

function renderCart() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty');
    const summary = document.getElementById('cart-summary');
    if (!container) return;
    const items = Cart.getItems();
    if (items.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        if (summary) summary.classList.add('hidden');
        return;
    }
    if (emptyMsg) emptyMsg.classList.add('hidden');
    if (summary) summary.classList.remove('hidden');
    container.innerHTML = items.map(item => `
        <div class="glass-card rounded-xl p-4 flex items-center gap-4 animate-fade-in">
            <img src="${item.img}" alt="${item.name}" class="size-20 rounded-lg object-cover"/>
            <div class="flex-1 min-w-0">
                <h3 class="font-bold text-white text-sm truncate">${item.name}</h3>
                <p class="text-primary font-extrabold mt-1">${formatPrice(item.price)}</p>
            </div>
            <div class="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1">
                <button onclick="Cart.updateQty(${item.id}, ${item.qty - 1}); renderCart();" class="text-slate-400 hover:text-white transition"><span class="material-symbols-outlined text-sm">remove</span></button>
                <span class="text-white font-bold text-sm w-6 text-center">${item.qty}</span>
                <button onclick="Cart.updateQty(${item.id}, ${item.qty + 1}); renderCart();" class="text-slate-400 hover:text-white transition"><span class="material-symbols-outlined text-sm">add</span></button>
            </div>
            <p class="text-white font-bold w-28 text-right">${formatPrice(item.price * item.qty)}</p>
            <button onclick="Cart.removeItem(${item.id}); renderCart();" class="text-slate-500 hover:text-red-400 transition">
                <span class="material-symbols-outlined text-lg">delete</span>
            </button>
        </div>
    `).join('');
    const subtotalEl = document.getElementById('cart-subtotal');
    const ivaEl = document.getElementById('cart-iva');
    const totalEl = document.getElementById('cart-total');
    if (subtotalEl) subtotalEl.textContent = formatPrice(Cart.getSubtotal());
    if (ivaEl) ivaEl.textContent = formatPrice(Cart.getIVA());
    if (totalEl) totalEl.textContent = formatPrice(Cart.getTotal());
}

function initDashboardPage() {
    const tbody = document.getElementById('orders-tbody');
    if (tbody) {
        tbody.innerHTML = RECENT_ORDERS.map(o => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition">
                <td class="px-4 py-3 text-sm font-bold text-primary">${o.id}</td>
                <td class="px-4 py-3 text-sm text-white">${o.client}</td>
                <td class="px-4 py-3 text-sm text-slate-400">${o.products}</td>
                <td class="px-4 py-3 text-sm font-bold text-white">${o.total}</td>
                <td class="px-4 py-3"><span class="px-2.5 py-1 rounded-full text-xs font-bold ${o.statusClass}">${o.status}</span></td>
                <td class="px-4 py-3 text-sm text-slate-500">${o.time}</td>
            </tr>
        `).join('');
    }
}

function handleHashChange() {
    const hash = location.hash.replace('#/', '') || 'landing';
    navigate(hash);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-logout')?.addEventListener('click', logout);
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});
