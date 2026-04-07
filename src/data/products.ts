export type Category = 'zapatillas' | 'buzos' | 'camperas' | 'jeans' | 'remeras';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  images: string[];
}

export interface StoreOffer {
  productId: string;
  store: string;
  storeType: 'oficial' | 'autorizado';
  countryCode: string;
  cityId: string;
  price: number;
  currency: string;
  currencySymbol: string;
  url: string;
  inStock: boolean;
  lastUpdated: string;
}

export const categories: { id: Category; label: string; icon: string; image: string }[] = [
  { id: 'zapatillas', label: 'Zapatillas', icon: '👟', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a4c55ee2ea43/AIR+FORCE+1+%2707.png' },
  { id: 'remeras', label: 'Remeras', icon: '👕', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa1b5b1a-27b5-47f6-b498-7ea080f5819b/M+NSW+TEE+ICON+FUTURA.png' },
  { id: 'jeans', label: 'Jeans', icon: '👖', image: 'https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000' },
  { id: 'buzos', label: 'Buzos / Hoodies', icon: '🧥', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5a4c56c0-c8a4-4ed5-9fdd-5e3f7be8fb2b/TECH+FLEECE+FZ+HOODIE.png' },
  { id: 'camperas', label: 'Camperas', icon: '🧥', image: 'https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906' },
];

export const products: Product[] = [
  // === ZAPATILLAS ===
  {
    id: 'nike-air-force-1',
    name: 'Air Force 1 \'07',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Las icónicas zapatillas Nike Air Force 1, diseño clásico en blanco.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a4c55ee2ea43/AIR+FORCE+1+%2707.png'],
  },
  {
    id: 'nike-air-max-90',
    name: 'Air Max 90',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Zapatillas Nike Air Max 90, máxima amortiguación visible.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/AIR+MAX+90.png'],
  },
  {
    id: 'nike-dunk-low',
    name: 'Dunk Low Retro',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Las Nike Dunk Low Retro, un clásico del baloncesto universitario.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/DUNK+LOW+RETRO.png'],
  },
  {
    id: 'nike-air-max-97',
    name: 'Air Max 97',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Nike Air Max 97 con diseño ondulado y Air visible en toda la suela.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a1d07ab6-41b2-4033-8233-b1c246f9e8d1/AIR+MAX+97.png'],
  },
  {
    id: 'nike-blazer-mid',
    name: 'Blazer Mid \'77',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Nike Blazer Mid 77, estilo retro de basketball con silueta alta.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png'],
  },
  {
    id: 'adidas-samba-og',
    name: 'Samba OG',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Las clásicas Adidas Samba OG, estilo retro de fútbol.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7bee4ee3e78a4e4a8608a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg'],
  },
  {
    id: 'adidas-gazelle',
    name: 'Gazelle',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Adidas Gazelle, zapatillas de gamuza con estilo clásico.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1fcf1b7c7f6e4e12a268af2a0104b21d_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg'],
  },
  {
    id: 'adidas-ultraboost',
    name: 'Ultraboost 5',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Adidas Ultraboost 5, máxima comodidad para running.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3272e3e3e5b849e19a8bae2500e8b3be_9366/Ultraboost_5_Running_Shoes_Black_ID3719_01_standard.jpg'],
  },
  {
    id: 'adidas-superstar',
    name: 'Superstar',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Adidas Superstar, la zapatilla con la icónica shell toe.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/73e8706f0e2d4e5c8a60af0800a0c6b0_9366/Superstar_Shoes_White_EG4958_01_standard.jpg'],
  },
  {
    id: 'converse-chuck-70',
    name: 'Chuck 70 Hi',
    brand: 'Converse',
    category: 'zapatillas',
    description: 'Converse Chuck 70 High Top, el ícono del streetwear.',
    images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4fa12e17/images/a_107/162050C_A_107X1.jpg'],
  },
  {
    id: 'converse-chuck-taylor',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    category: 'zapatillas',
    description: 'Converse Chuck Taylor All Star, la zapatilla más icónica de todos los tiempos.',
    images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw0a451821/images/a_107/M9160_A_107X1.jpg'],
  },
  {
    id: 'vans-old-skool',
    name: 'Old Skool',
    brand: 'Vans',
    category: 'zapatillas',
    description: 'Vans Old Skool, la zapatilla clásica de skate con la línea lateral icónica.',
    images: ['https://images.vans.com/is/image/VansBrand/VN000D3HY28-HERO?wid=800'],
  },
  {
    id: 'vans-sk8-hi',
    name: 'Sk8-Hi',
    brand: 'Vans',
    category: 'zapatillas',
    description: 'Vans Sk8-Hi, la bota alta clásica del skate.',
    images: ['https://images.vans.com/is/image/VansBrand/VN000D5IB8C-HERO?wid=800'],
  },
  {
    id: 'new-balance-574',
    name: '574 Classic',
    brand: 'New Balance',
    category: 'zapatillas',
    description: 'New Balance 574, el modelo retro-running más popular de la marca.',
    images: ['https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=800&hei=800'],
  },
  {
    id: 'puma-suede-classic',
    name: 'Suede Classic XXI',
    brand: 'Puma',
    category: 'zapatillas',
    description: 'Puma Suede Classic, estilo retro de gamuza desde 1968.',
    images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers'],
  },

  // === BUZOS / HOODIES ===
  {
    id: 'nike-tech-fleece-hoodie',
    name: 'Tech Fleece Hoodie',
    brand: 'Nike',
    category: 'buzos',
    description: 'Buzo Nike Tech Fleece con capucha y cierre completo.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5a4c56c0-c8a4-4ed5-9fdd-5e3f7be8fb2b/TECH+FLEECE+FZ+HOODIE.png'],
  },
  {
    id: 'nike-club-hoodie',
    name: 'Club Fleece Pullover Hoodie',
    brand: 'Nike',
    category: 'buzos',
    description: 'Buzo Nike Club Fleece pullover, comodidad diaria con capucha.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f6a0e1f-61a5-4e9c-aa76-0tried1234/M+NK+CLUB+BB+PO+HOODIE.png'],
  },
  {
    id: 'adidas-essentials-hoodie',
    name: 'Essentials 3-Stripes Hoodie',
    brand: 'Adidas',
    category: 'buzos',
    description: 'Buzo Adidas Essentials con las 3 rayas clásicas.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9b18ec6f0e3f4a639a7eaf6a01338798_9366/Essentials_3-Stripes_Full-Zip_Hoodie_Black_IJ6474_01_laydown.jpg'],
  },
  {
    id: 'adidas-trefoil-hoodie',
    name: 'Trefoil Hoodie',
    brand: 'Adidas',
    category: 'buzos',
    description: 'Buzo Adidas Originals con logo Trefoil y capucha.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b0c2e8a6e89a4d3f9f65af2a01517d60_9366/Trefoil_Hoodie_Black_DT7964_01_laydown.jpg'],
  },
  {
    id: 'champion-reverse-weave',
    name: 'Reverse Weave Hoodie',
    brand: 'Champion',
    category: 'buzos',
    description: 'Champion Reverse Weave, el buzo de algodón pesado original.',
    images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dwd5e36f7c/images/champion/hi-res/GF68_045_front.jpg'],
  },
  {
    id: 'tnf-drew-peak-hoodie',
    name: 'Drew Peak Pullover Hoodie',
    brand: 'The North Face',
    category: 'buzos',
    description: 'The North Face Drew Peak, buzo con logo frontal bordado.',
    images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF00AHJY_JK3_hero?wid=780&hei=906'],
  },

  // === CAMPERAS ===
  {
    id: 'north-face-nuptse',
    name: '1996 Retro Nuptse Jacket',
    brand: 'The North Face',
    category: 'camperas',
    description: 'La icónica campera puffer The North Face Nuptse 1996.',
    images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906'],
  },
  {
    id: 'levis-trucker-jacket',
    name: 'Trucker Jacket',
    brand: "Levi's",
    category: 'camperas',
    description: "La clásica campera de jean Levi's Trucker, un imprescindible.",
    images: ['https://lsco.scene7.com/is/image/lsco/723340070-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'],
  },
  {
    id: 'nike-windrunner',
    name: 'Windrunner Jacket',
    brand: 'Nike',
    category: 'camperas',
    description: 'Nike Windrunner, la campera rompevientos icónica de Nike.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c8f97478-77c6-4bfc-a417-btest1234/M+NK+WR+JKT.png'],
  },
  {
    id: 'adidas-track-jacket',
    name: 'Adicolor Classics SST Track Jacket',
    brand: 'Adidas',
    category: 'camperas',
    description: 'Adidas Adicolor Classics SST, la campera deportiva con las 3 rayas.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b7b80e06d5c14eefa9c6af0800a0c6c0_9366/Adicolor_Classics_SST_Track_Jacket_Black_IK7025_01_laydown.jpg'],
  },

  // === JEANS ===
  {
    id: 'levis-501-original',
    name: '501 Original Fit',
    brand: "Levi's",
    category: 'jeans',
    description: "El jean original Levi's 501, el modelo que definió la categoría.",
    images: ['https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'],
  },
  {
    id: 'levis-511-slim',
    name: '511 Slim Fit',
    brand: "Levi's",
    category: 'jeans',
    description: "Levi's 511 Slim Fit, corte moderno y cómodo.",
    images: ['https://lsco.scene7.com/is/image/lsco/045115279-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'],
  },
  {
    id: 'levis-505-regular',
    name: '505 Regular Fit',
    brand: "Levi's",
    category: 'jeans',
    description: "Levi's 505 Regular Fit, corte recto clásico y versátil.",
    images: ['https://lsco.scene7.com/is/image/lsco/005054886-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'],
  },

  // === REMERAS ===
  {
    id: 'nike-sportswear-tee',
    name: 'Sportswear Club Tee',
    brand: 'Nike',
    category: 'remeras',
    description: 'Remera Nike Sportswear Club, algodón clásico con logo.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa1b5b1a-27b5-47f6-b498-7ea080f5819b/M+NSW+TEE+ICON+FUTURA.png'],
  },
  {
    id: 'nike-dri-fit-tee',
    name: 'Dri-FIT Legend Tee',
    brand: 'Nike',
    category: 'remeras',
    description: 'Remera Nike Dri-FIT Legend, tecnología que absorbe el sudor.',
    images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9ba1c6a4-c4f5-4bca-b3c5-dtest1234/M+NK+DF+TEE+LGND+2.0.png'],
  },
  {
    id: 'adidas-trefoil-tee',
    name: 'Trefoil Tee',
    brand: 'Adidas',
    category: 'remeras',
    description: 'Remera Adidas Originals con logo Trefoil clásico.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b4a04e63c79149228e32ae0a01517813_9366/Trefoil_Tee_Black_IU2421_01_laydown.jpg'],
  },
  {
    id: 'adidas-3stripes-tee',
    name: 'Essentials 3-Stripes Tee',
    brand: 'Adidas',
    category: 'remeras',
    description: 'Remera Adidas Essentials con las 3 rayas en las mangas.',
    images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6b30e86e9f6e4a7b9e5faf6a01338700_9366/Essentials_3-Stripes_Tee_Black_GL3732_01_laydown.jpg'],
  },
  {
    id: 'champion-script-tee',
    name: 'Script Logo Tee',
    brand: 'Champion',
    category: 'remeras',
    description: 'Remera Champion con logo script bordado.',
    images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dwb1234567/images/champion/hi-res/GT19_045_front.jpg'],
  },
  {
    id: 'converse-star-chevron-tee',
    name: 'Star Chevron Tee',
    brand: 'Converse',
    category: 'remeras',
    description: 'Remera Converse con logo Star Chevron clásico.',
    images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw1234test/images/a_107/10023876_A_107X1.jpg'],
  },
];

// === OFERTAS DE TIENDAS OFICIALES ===
export const offers: StoreOffer[] = [
  // Nike Air Force 1
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 115, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 115, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-force-1-07-zapatillas-GBwGFn', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-force-1-07-zapatillas-GBwGFn', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 149999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/air-force-1-07-cw2288-111/p', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-force-1', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'cor', price: 149999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/air-force-1-07-cw2288-111/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Air Max 90
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 149.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-max-90-zapatillas-DMCFNN', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 149.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-max-90-zapatillas-DMCFNN', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 169999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/air-max-90/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Dunk Low
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 115, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/dunk-low-retro-mens-shoes-87qbGk', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 115, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/dunk-low-retro-mens-shoes-87qbGk', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 149999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/dunk-low-retro/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Air Max 97
  { productId: 'nike-air-max-97', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 175, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-97-mens-shoes', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-97', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 175, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-97-mens-shoes', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-97', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 184.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-max-97-zapatillas', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-97', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 219999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/air-max-97/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Blazer Mid
  { productId: 'nike-blazer-mid', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 105, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/blazer-mid-77-vintage-mens-shoes', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-blazer-mid', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 109.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/blazer-mid-77-vintage-zapatillas', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-blazer-mid', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 139999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/blazer-mid-77/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Samba OG
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/samba-og-shoes/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/samba-og-shoes/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-samba-og/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-samba-og/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-samba-og/B75806.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Gazelle
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/gazelle-shoes/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/gazelle-shoes/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-gazelle/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-gazelle/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 119999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-gazelle/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Ultraboost
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 190, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/ultraboost-5-running-shoes/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 190, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/ultraboost-5-running-shoes/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 200, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-ultraboost-5/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 239999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-ultraboost-5/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Superstar
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/superstar-shoes/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/superstar-shoes/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-superstar/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-superstar/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-superstar/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-superstar', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'cor', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-superstar/EG4958.html', inStock: true, lastUpdated: '2026-04-04' },

  // Converse Chuck 70
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 90, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162050C.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 90, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162050C.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 90, currency: 'EUR', currencySymbol: '€', url: 'https://www.converse.com/es/shop/p/chuck-70/162050C.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 109999, currency: 'ARS', currencySymbol: '$', url: 'https://www.converse.com.ar/chuck-70/p', inStock: true, lastUpdated: '2026-04-04' },

  // Converse Chuck Taylor
  { productId: 'converse-chuck-taylor', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 65, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/chuck-taylor-all-star/M9160.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-taylor', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 65, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/chuck-taylor-all-star/M9160.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-taylor', store: 'Converse Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 75, currency: 'EUR', currencySymbol: '€', url: 'https://www.converse.com/es/shop/p/chuck-taylor/M9160.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-taylor', store: 'Converse Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 75, currency: 'EUR', currencySymbol: '€', url: 'https://www.converse.com/es/shop/p/chuck-taylor/M9160.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-taylor', store: 'Converse Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 84999, currency: 'ARS', currencySymbol: '$', url: 'https://www.converse.com.ar/chuck-taylor/p', inStock: true, lastUpdated: '2026-04-04' },

  // Vans Old Skool
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 80, currency: 'EUR', currencySymbol: '€', url: 'https://www.vans.es/es/old-skool-VN000D3HY28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 80, currency: 'EUR', currencySymbol: '€', url: 'https://www.vans.es/es/old-skool-VN000D3HY28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 89999, currency: 'ARS', currencySymbol: '$', url: 'https://www.vans.com.ar/old-skool/p', inStock: true, lastUpdated: '2026-04-04' },

  // Vans Sk8-Hi
  { productId: 'vans-sk8-hi', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 75, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/sk8-hi-shoe-pvn000d5ib8c.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-sk8-hi', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 75, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/sk8-hi-shoe-pvn000d5ib8c.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-sk8-hi', store: 'Vans Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 85, currency: 'EUR', currencySymbol: '€', url: 'https://www.vans.es/es/sk8-hi-VN000D5IB8C.html', inStock: true, lastUpdated: '2026-04-04' },

  // New Balance 574
  { productId: 'new-balance-574', store: 'New Balance Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 89.99, currency: 'USD', currencySymbol: '$', url: 'https://www.newbalance.com/pd/574/ML574EVG.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'new-balance-574', store: 'New Balance Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 89.99, currency: 'USD', currencySymbol: '$', url: 'https://www.newbalance.com/pd/574/ML574EVG.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'new-balance-574', store: 'New Balance Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 99.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.newbalance.es/574/ML574EVG.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'new-balance-574', store: 'New Balance Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 119999, currency: 'ARS', currencySymbol: '$', url: 'https://www.newbalance.com.ar/574/p', inStock: true, lastUpdated: '2026-04-04' },

  // Puma Suede Classic
  { productId: 'puma-suede-classic', store: 'Puma Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 75, currency: 'USD', currencySymbol: '$', url: 'https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'puma-suede-classic', store: 'Puma Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 75, currency: 'USD', currencySymbol: '$', url: 'https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'puma-suede-classic', store: 'Puma Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 80, currency: 'EUR', currencySymbol: '€', url: 'https://eu.puma.com/es/pd/suede-classic-xxi/374915.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'puma-suede-classic', store: 'Puma Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 99999, currency: 'ARS', currencySymbol: '$', url: 'https://ar.puma.com/suede-classic/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Tech Fleece Hoodie
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-tech-fleece-windrunner-full-zip-hoodie-Jw1VXv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-tech-fleece-windrunner-full-zip-hoodie-Jw1VXv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-tech-fleece-windrunner-sudadera-con-capucha-KLcBGR', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-tech-fleece-windrunner-sudadera-con-capucha-KLcBGR', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 169999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/buzo-nike-sportswear-tech-fleece/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Club Hoodie
  { productId: 'nike-club-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 60, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-fleece-pullover-hoodie', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-club-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 60, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-fleece-pullover-hoodie', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-club-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 54.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-club-fleece-sudadera', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-club-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 74999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/buzo-nike-club-fleece/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Essentials Hoodie
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 65, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/essentials-3-stripes-full-zip-hoodie/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 65, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/essentials-3-stripes-full-zip-hoodie/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 60, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/sudadera-con-capucha-essentials-3-bandas/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 79999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/sudadera-essentials-3-stripes/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Trefoil Hoodie
  { productId: 'adidas-trefoil-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 75, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/trefoil-hoodie/DT7964.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 70, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/sudadera-trefoil/DT7964.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 89999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/sudadera-trefoil/DT7964.html', inStock: true, lastUpdated: '2026-04-04' },

  // Champion Reverse Weave
  { productId: 'champion-reverse-weave', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/reverse-weave-hoodie-GF68.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'champion-reverse-weave', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/reverse-weave-hoodie-GF68.html', inStock: true, lastUpdated: '2026-04-04' },

  // TNF Drew Peak Hoodie
  { productId: 'tnf-drew-peak-hoodie', store: 'The North Face Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 80, currency: 'USD', currencySymbol: '$', url: 'https://www.thenorthface.com/en-us/mens/drew-peak-pullover-hoodie', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'tnf-drew-peak-hoodie', store: 'The North Face Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 85, currency: 'EUR', currencySymbol: '€', url: 'https://www.thenorthface.es/shop/es/tnf-es/drew-peak', inStock: true, lastUpdated: '2026-04-04' },

  // The North Face Nuptse
  { productId: 'north-face-nuptse', store: 'The North Face Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 330, currency: 'USD', currencySymbol: '$', url: 'https://www.thenorthface.com/en-us/mens/1996-retro-nuptse-jacket-pNF0A3C8D', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'north-face-nuptse', store: 'The North Face Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 330, currency: 'USD', currencySymbol: '$', url: 'https://www.thenorthface.com/en-us/mens/1996-retro-nuptse-jacket-pNF0A3C8D', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'north-face-nuptse', store: 'The North Face Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 320, currency: 'EUR', currencySymbol: '€', url: 'https://www.thenorthface.es/shop/es/tnf-es/chaqueta-1996-retro-nuptse-3C8D', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's Trucker Jacket
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 108, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/clothing/men/outerwear/trucker-jacket/p/723340070', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 108, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/clothing/men/outerwear/trucker-jacket/p/723340070', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/ropa/hombre/chaquetas/the-trucker-jacket/p/723340070', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/trucker-jacket/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Windrunner
  { productId: 'nike-windrunner', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 110, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-windrunner-hooded-jacket', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-windrunner', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 99.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-windrunner-chaqueta', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-windrunner', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 139999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/campera-nike-windrunner/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Track Jacket
  { productId: 'adidas-track-jacket', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 90, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/adicolor-classics-sst-track-jacket/IK7025.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-track-jacket', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 90, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/adicolor-classics-sst-track-jacket/IK7025.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-track-jacket', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 85, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/chaqueta-adicolor-classics-sst/IK7025.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-track-jacket', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 109999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/chaqueta-adicolor-classics-sst/IK7025.html', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's 501
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/501/501-original/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/501/501-original/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 89999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/501-original/p', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's 511
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/511/511-slim-fit-jeans/p/045115279', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/511/511-slim-fit-jeans/p/045115279', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/511/511-slim-fit-jeans/p/045115279', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 84999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/511-slim/p', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's 505
  { productId: 'levis-505-regular', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 59.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/505/505-regular-fit-jeans/p/005054886', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-505-regular', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 59.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/505/505-regular-fit-jeans/p/005054886', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-505-regular', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 95, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/505/505-regular-fit/p/005054886', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-505-regular', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 79999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/505-regular/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Sportswear Tee
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 29.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-club-camiseta-9Xh7Pp', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 29.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-club-camiseta-9Xh7Pp', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 34999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/remera-nike-sportswear/p', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Dri-FIT Tee
  { productId: 'nike-dri-fit-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 25, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/dri-fit-legend-tee', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dri-fit-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 25, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/dri-fit-legend-tee', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dri-fit-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 24.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/dri-fit-legend-camiseta', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Trefoil Tee
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 35, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/trefoil-tee/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 35, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/trefoil-tee/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 35, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/camiseta-trefoil/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 39999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/camiseta-trefoil/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas 3-Stripes Tee
  { productId: 'adidas-3stripes-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/essentials-3-stripes-tee/GL3732.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-3stripes-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 30, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/camiseta-essentials-3-bandas/GL3732.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-3stripes-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 34999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/camiseta-essentials-3-bandas/GL3732.html', inStock: true, lastUpdated: '2026-04-04' },

  // Champion Script Tee
  { productId: 'champion-script-tee', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 25, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/script-logo-tee-GT19.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'champion-script-tee', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 25, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/script-logo-tee-GT19.html', inStock: true, lastUpdated: '2026-04-04' },

  // Converse Star Chevron Tee
  { productId: 'converse-star-chevron-tee', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/star-chevron-tee/10023876.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-star-chevron-tee', store: 'Converse Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 30, currency: 'EUR', currencySymbol: '€', url: 'https://www.converse.com/es/shop/p/star-chevron-tee/10023876.html', inStock: true, lastUpdated: '2026-04-04' },
];

// Helper functions
export function getOffersForProduct(productId: string, countryCode?: string, cityId?: string): StoreOffer[] {
  return offers.filter(o => {
    if (o.productId !== productId) return false;
    if (countryCode && o.countryCode !== countryCode) return false;
    if (cityId && o.cityId !== cityId) return false;
    return o.inStock;
  });
}

export function getProductsForLocation(countryCode: string, cityId: string, category?: Category): Product[] {
  const availableProductIds = new Set(
    offers
      .filter(o => o.countryCode === countryCode && o.cityId === cityId && o.inStock)
      .map(o => o.productId)
  );
  return products.filter(p => {
    if (!availableProductIds.has(p.id)) return false;
    if (category && p.category !== category) return false;
    return true;
  });
}

export function getBestOffer(productId: string): StoreOffer | null {
  const usdPrices: { offer: StoreOffer; usd: number }[] = offers
    .filter(o => o.productId === productId && o.inStock)
    .map(o => ({ offer: o, usd: toUSD(o.price, o.currency) }));
  if (!usdPrices.length) return null;
  usdPrices.sort((a, b) => a.usd - b.usd);
  return usdPrices[0].offer;
}

export function toUSD(price: number, currency: string): number {
  const rates: Record<string, number> = { USD: 1, EUR: 1.08, ARS: 0.00094 };
  return price * (rates[currency] || 1);
}

export function getAllBrands(): string[] {
  return [...new Set(products.map(p => p.brand))];
}

export function getProductsByBrand(brand: string, countryCode?: string, cityId?: string): Product[] {
  const filtered = products.filter(p => p.brand === brand);
  if (!countryCode || !cityId) return filtered;
  const availableIds = new Set(
    offers.filter(o => o.countryCode === countryCode && o.cityId === cityId && o.inStock).map(o => o.productId)
  );
  return filtered.filter(p => availableIds.has(p.id));
}
