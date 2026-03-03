// ===== El Imperio Carnes Premium - Mock Data =====

const DEMO_USER = {
    email: 'admin@elimperio.com',
    password: 'imperio2024',
    name: 'Pedro Trujillo',
    role: 'Admin',
    initials: 'PT'
};

const PRODUCTS = [
    { id: 1, name: 'Tomahawk Premium', category: 'Res', weight: '1.2kg aprox', price: 125000, unit: 'por pieza', rating: 4.9, badge: 'PREMIUM', img: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=600&h=450&fit=crop', description: 'Corte de carne de res de primera calidad, ideal para asar a la parrilla.' },
    { id: 2, name: 'Solomito de Res', category: 'Res', weight: '1kg', price: 85000, unit: 'por kg', rating: 5.0, badge: '', img: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&h=450&fit=crop', description: 'El corte mas tierno de la res. Magro y delicado, perfecto para preparaciones rapidas.' },
    { id: 3, name: 'Lomo de Res Premium', category: 'Res', weight: '1kg', price: 32500, unit: 'por kg', rating: 5.0, badge: 'Popular', oldPrice: 38000, img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&h=450&fit=crop', description: 'Corte versatil y sabroso.' },
    { id: 4, name: 'Pechuga de Pollo', category: 'Pollo', weight: '1kg', price: 11550, unit: 'por kg', rating: 4.0, badge: 'Nuevo', img: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=600&h=450&fit=crop', description: 'Pechuga de pollo fresca y rica en proteina.' },
    { id: 5, name: 'Chorizo Santarrosano', category: 'Salsamentaria', weight: '1kg', price: 14500, unit: 'por kg', rating: 5.0, badge: 'Oferta', oldPrice: 19200, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop', description: 'Chorizo tradicional elaborado con las mejores carnes de cerdo y especias naturales.' },
    { id: 6, name: 'Chuleta de Cerdo Premium', category: 'Cerdo', weight: '1kg', price: 21000, unit: 'por kg', rating: 4.0, badge: '', img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=450&fit=crop', description: 'Chuleta carnosa y jugosa, perfecta para asar o freir.' },
    { id: 7, name: 'Salmon Fresco Chileno', category: 'Pescados', weight: '500g', price: 52000, unit: 'por porcion', rating: 4.8, badge: '', img: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=600&h=450&fit=crop', description: 'Filete de salmon de aguas frias, rico en Omega-3.' },
    { id: 8, name: 'Costilla BBQ', category: 'Cerdo', weight: '1kg', price: 48000, unit: 'por kg', rating: 4.7, badge: '', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop', description: 'Costillas tiernas marinadas en nuestra salsa BBQ secreta.' },
    { id: 9, name: 'Pack Parrillero Premium', category: 'Salsamentaria', weight: '2kg', price: 85000, unit: 'por und', rating: 5.0, badge: '', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=450&fit=crop', description: 'Todo lo que necesitas para tu asado.' },
    { id: 10, name: 'Pollo Entero Campesino', category: 'Pollo', weight: '1.8kg aprox', price: 24500, unit: 'por und', rating: 4.0, badge: '', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=450&fit=crop', description: 'Pollo criado de forma natural, con sabor tradicional.' },
    { id: 11, name: 'Jamon Serrano Reserva', category: 'Salsamentaria', weight: '500g', price: 42000, unit: 'por und', rating: 5.0, badge: '20% OFF', oldPrice: 52500, img: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=450&fit=crop', description: 'Jamon curado con paciencia para lograr un aroma y sabor inconfundibles.' },
    { id: 12, name: 'Costilla de Res Ahumada', category: 'Res', weight: '1kg', price: 28900, unit: 'por kg', rating: 4.0, badge: 'Popular', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=450&fit=crop', description: 'Costilla con sutil aroma a humo de lena natural.' },
];

const CATEGORIES = [
    { name: 'Res Premium', icon: '🥩', img: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=400&h=400&fit=crop', count: 4 },
    { name: 'Pollo Fresco', icon: '🍗', img: 'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=400&h=400&fit=crop', count: 2 },
    { name: 'Cerdo Premium', icon: '🥓', img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=400&fit=crop', count: 2 },
    { name: 'Salsamentaria', icon: '🌭', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop', count: 3 },
    { name: 'Pescados', icon: '🐟', img: 'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?w=400&h=400&fit=crop', count: 1 },
];

const RECENT_ORDERS = [
    { id: '#IM-2940', client: 'Carnes San Jose', products: 'Res, Cerdo (140kg)', total: '$3.45M', status: 'Entregado', statusClass: 'bg-emerald-500/10 text-emerald-400', time: '10:45 AM' },
    { id: '#IM-2941', client: 'Distribuidora Gourmet', products: 'Embutidos (50kg)', total: '$1.20M', status: 'En Ruta', statusClass: 'bg-primary/10 text-primary', time: '11:12 AM' },
    { id: '#IM-2942', client: 'Restaurante El Chef', products: 'Res Premium (80kg)', total: '$2.89M', status: 'Pendiente', statusClass: 'bg-amber-500/10 text-amber-500', time: '11:30 AM' },
    { id: '#IM-2943', client: 'Frigorifico Del Norte', products: 'Cerdo, Pollo (200kg)', total: '$5.10M', status: 'Entregado', statusClass: 'bg-emerald-500/10 text-emerald-400', time: '09:15 AM' },
    { id: '#IM-2944', client: 'Hotel Royal Plaza', products: 'Salmon, Res (30kg)', total: '$1.85M', status: 'En Ruta', statusClass: 'bg-primary/10 text-primary', time: '12:00 PM' },
];

function formatPrice(price) {
    return '$' + price.toLocaleString('es-CO');
}
