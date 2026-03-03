// ===== El Imperio - Cart Module =====

const Cart = {
    KEY: 'imperio_cart',
    getItems() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
    save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); this.updateBadges(); },
    addItem(productId, qty = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        const items = this.getItems();
        const existing = items.find(i => i.id === productId);
        if (existing) { existing.qty += qty; }
        else { items.push({ id: product.id, name: product.name, price: product.price, img: product.img, unit: product.unit, qty }); }
        this.save(items);
        showToast(`${product.name} agregado al carrito`, 'add_shopping_cart');
    },
    removeItem(productId) { this.save(this.getItems().filter(i => i.id !== productId)); },
    updateQty(productId, qty) {
        const items = this.getItems();
        const item = items.find(i => i.id === productId);
        if (item) { item.qty = Math.max(1, qty); this.save(items); }
    },
    getSubtotal() { return this.getItems().reduce((sum, i) => sum + (i.price * i.qty), 0); },
    getIVA() { return Math.round(this.getSubtotal() * 0.19); },
    getTotal() { return this.getSubtotal() + this.getIVA(); },
    getCount() { return this.getItems().reduce((sum, i) => sum + i.qty, 0); },
    clear() { localStorage.removeItem(this.KEY); this.updateBadges(); },
    updateBadges() { document.querySelectorAll('.cart-count').forEach(el => { el.textContent = this.getCount(); }); }
};
