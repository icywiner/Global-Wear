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

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'zapatillas', label: 'Zapatillas', icon: '👟' },
  { id: 'buzos', label: 'Buzos / Hoodies', icon: '🧥' },
  { id: 'camperas', label: 'Camperas', icon: '🧥' },
  { id: 'jeans', label: 'Jeans', icon: '👖' },
  { id: 'remeras', label: 'Remeras', icon: '👕' },
];

export const products: Product[] = [
  // === ZAPATILLAS ===
  {
    id: 'nike-air-force-1',
    name: 'Air Force 1 \'07',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Las icónicas zapatillas Nike Air Force 1, diseño clásico en blanco.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a4c55ee2ea43/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9815cf0598ac/AIR+FORCE+1+%2707.png',
    ],
  },
  {
    id: 'nike-air-max-90',
    name: 'Air Max 90',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Zapatillas Nike Air Max 90, máxima amortiguación visible.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/AIR+MAX+90.png',
    ],
  },
  {
    id: 'nike-dunk-low',
    name: 'Dunk Low Retro',
    brand: 'Nike',
    category: 'zapatillas',
    description: 'Las Nike Dunk Low Retro, un clásico del baloncesto universitario.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/DUNK+LOW+RETRO.png',
    ],
  },
  {
    id: 'adidas-samba-og',
    name: 'Samba OG',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Las clásicas Adidas Samba OG, estilo retro de fútbol.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7bee4ee3e78a4e4a8608a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg',
    ],
  },
  {
    id: 'adidas-gazelle',
    name: 'Gazelle',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Adidas Gazelle, zapatillas de gamuza con estilo clásico.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1fcf1b7c7f6e4e12a268af2a0104b21d_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg',
    ],
  },
  {
    id: 'adidas-ultraboost',
    name: 'Ultraboost 5',
    brand: 'Adidas',
    category: 'zapatillas',
    description: 'Adidas Ultraboost 5, máxima comodidad para running.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3272e3e3e5b849e19a8bae2500e8b3be_9366/Ultraboost_5_Running_Shoes_Black_ID3719_01_standard.jpg',
    ],
  },
  {
    id: 'converse-chuck-70',
    name: 'Chuck 70 Hi',
    brand: 'Converse',
    category: 'zapatillas',
    description: 'Converse Chuck 70 High Top, el ícono del streetwear.',
    images: [
      'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4fa12e17/images/a_107/162050C_A_107X1.jpg',
    ],
  },
  {
    id: 'vans-old-skool',
    name: 'Old Skool',
    brand: 'Vans',
    category: 'zapatillas',
    description: 'Vans Old Skool, la zapatilla clásica de skate con la línea lateral icónica.',
    images: [
      'https://images.vans.com/is/image/VansBrand/VN000D3HY28-HERO?wid=800',
    ],
  },

  // === BUZOS / HOODIES ===
  {
    id: 'nike-tech-fleece-hoodie',
    name: 'Tech Fleece Hoodie',
    brand: 'Nike',
    category: 'buzos',
    description: 'Buzo Nike Tech Fleece con capucha y cierre completo.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5a4c56c0-c8a4-4ed5-9fdd-5e3f7be8fb2b/TECH+FLEECE+FZ+HOODIE.png',
    ],
  },
  {
    id: 'adidas-essentials-hoodie',
    name: 'Essentials 3-Stripes Hoodie',
    brand: 'Adidas',
    category: 'buzos',
    description: 'Buzo Adidas Essentials con las 3 rayas clásicas.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9b18ec6f0e3f4a639a7eaf6a01338798_9366/Essentials_3-Stripes_Full-Zip_Hoodie_Black_IJ6474_01_laydown.jpg',
    ],
  },
  {
    id: 'champion-reverse-weave',
    name: 'Reverse Weave Hoodie',
    brand: 'Champion',
    category: 'buzos',
    description: 'Champion Reverse Weave, el buzo de algodón pesado original.',
    images: [
      'https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dwd5e36f7c/images/champion/hi-res/GF68_045_front.jpg',
    ],
  },

  // === CAMPERAS ===
  {
    id: 'north-face-nuptse',
    name: '1996 Retro Nuptse Jacket',
    brand: 'The North Face',
    category: 'camperas',
    description: 'La icónica campera puffer The North Face Nuptse 1996.',
    images: [
      'https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906',
    ],
  },
  {
    id: 'levis-trucker-jacket',
    name: 'Trucker Jacket',
    brand: "Levi's",
    category: 'camperas',
    description: "La clásica campera de jean Levi's Trucker, un imprescindible.",
    images: [
      'https://lsco.scene7.com/is/image/lsco/723340070-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000',
    ],
  },

  // === JEANS ===
  {
    id: 'levis-501-original',
    name: '501 Original Fit',
    brand: "Levi's",
    category: 'jeans',
    description: "El jean original Levi's 501, el modelo que definió la categoría.",
    images: [
      'https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000',
    ],
  },
  {
    id: 'levis-511-slim',
    name: '511 Slim Fit',
    brand: "Levi's",
    category: 'jeans',
    description: "Levi's 511 Slim Fit, corte moderno y cómodo.",
    images: [
      'https://lsco.scene7.com/is/image/lsco/045115279-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000',
    ],
  },

  // === REMERAS ===
  {
    id: 'nike-sportswear-tee',
    name: 'Sportswear Club Tee',
    brand: 'Nike',
    category: 'remeras',
    description: 'Remera Nike Sportswear Club, algodón clásico con logo.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa1b5b1a-27b5-47f6-b498-7ea080f5819b/M+NSW+TEE+ICON+FUTURA.png',
    ],
  },
  {
    id: 'adidas-trefoil-tee',
    name: 'Trefoil Tee',
    brand: 'Adidas',
    category: 'remeras',
    description: 'Remera Adidas Originals con logo Trefoil clásico.',
    images: [
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b4a04e63c79149228e32ae0a01517813_9366/Trefoil_Tee_Black_IU2421_01_laydown.jpg',
    ],
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

  // Nike Air Max 90
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-air-max-90', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 149.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/air-max-90-zapatillas-DMCFNN', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Dunk Low
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 115, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/dunk-low-retro-mens-shoes-87qbGk', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-dunk-low', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 149999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/dunk-low-retro/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Samba OG
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/samba-og-shoes/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/samba-og-shoes/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-samba-og/B75806.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-samba-og', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/zapatillas-samba-og/B75806.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Gazelle
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 100, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/gazelle-shoes/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-gazelle/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-gazelle', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-gazelle/BB5476.html', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Ultraboost
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 190, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/ultraboost-5-running-shoes/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-ultraboost', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 200, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/zapatilla-ultraboost-5/ID3719.html', inStock: true, lastUpdated: '2026-04-04' },

  // Converse Chuck 70
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 90, currency: 'USD', currencySymbol: '$', url: 'https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162050C.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'converse-chuck-70', store: 'Converse Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 90, currency: 'EUR', currencySymbol: '€', url: 'https://www.converse.com/es/shop/p/chuck-70-zapatilla-unisex-de-bota-alta/162050C.html', inStock: true, lastUpdated: '2026-04-04' },

  // Vans Old Skool
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'vans-old-skool', store: 'Vans Store', storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 80, currency: 'EUR', currencySymbol: '€', url: 'https://www.vans.es/es/old-skool-VN000D3HY28.html', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Tech Fleece Hoodie
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 130, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-tech-fleece-windrunner-full-zip-hoodie-Jw1VXv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 119.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-tech-fleece-windrunner-sudadera-con-capucha-KLcBGR', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-tech-fleece-hoodie', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 169999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/buzo-nike-sportswear-tech-fleece/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Essentials Hoodie
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 65, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/essentials-3-stripes-full-zip-hoodie/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 60, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/sudadera-con-capucha-essentials-3-bandas/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-essentials-hoodie', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 79999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/sudadera-essentials-3-stripes/IJ6474.html', inStock: true, lastUpdated: '2026-04-04' },

  // Champion Reverse Weave
  { productId: 'champion-reverse-weave', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/reverse-weave-hoodie-GF68.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'champion-reverse-weave', store: 'Champion Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 70, currency: 'USD', currencySymbol: '$', url: 'https://www.champion.com/reverse-weave-hoodie-GF68.html', inStock: true, lastUpdated: '2026-04-04' },

  // The North Face Nuptse
  { productId: 'north-face-nuptse', store: 'The North Face Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 330, currency: 'USD', currencySymbol: '$', url: 'https://www.thenorthface.com/en-us/mens/mens-jackets-and-vests/mens-insulated-and-down-c210482/1996-retro-nuptse-jacket-pNF0A3C8D', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'north-face-nuptse', store: 'The North Face Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 320, currency: 'EUR', currencySymbol: '€', url: 'https://www.thenorthface.es/shop/es/tnf-es/chaqueta-1996-retro-nuptse-3C8D', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's Trucker Jacket
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 108, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/clothing/men/outerwear/trucker-jacket/p/723340070', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/ropa/hombre/chaquetas/the-trucker-jacket/p/723340070', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-trucker-jacket', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 129999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/trucker-jacket/p', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's 501
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 110, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/501/501-original/p/005010114', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-501-original', store: "Levi's Store", storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 89999, currency: 'ARS', currencySymbol: '$', url: 'https://www.levi.com.ar/501-original/p', inStock: true, lastUpdated: '2026-04-04' },

  // Levi's 511
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 69.50, currency: 'USD', currencySymbol: '$', url: 'https://www.levi.com/US/en_US/jeans/mens-jeans/511/511-slim-fit-jeans/p/045115279', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'levis-511-slim', store: "Levi's Store", storeType: 'oficial', countryCode: 'ES', cityId: 'bcn', price: 100, currency: 'EUR', currencySymbol: '€', url: 'https://www.levi.com/ES/es_ES/jeans/hombre/511/511-slim-fit-jeans/p/045115279', inStock: true, lastUpdated: '2026-04-04' },

  // Nike Sportswear Tee
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'US', cityId: 'la', price: 30, currency: 'USD', currencySymbol: '$', url: 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 29.99, currency: 'EUR', currencySymbol: '€', url: 'https://www.nike.com/es/t/sportswear-club-camiseta-9Xh7Pp', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'nike-sportswear-tee', store: 'Nike Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 34999, currency: 'ARS', currencySymbol: '$', url: 'https://www.nike.com.ar/remera-nike-sportswear/p', inStock: true, lastUpdated: '2026-04-04' },

  // Adidas Trefoil Tee
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'US', cityId: 'nyc', price: 35, currency: 'USD', currencySymbol: '$', url: 'https://www.adidas.com/us/trefoil-tee/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'ES', cityId: 'mad', price: 35, currency: 'EUR', currencySymbol: '€', url: 'https://www.adidas.es/camiseta-trefoil/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
  { productId: 'adidas-trefoil-tee', store: 'Adidas Store', storeType: 'oficial', countryCode: 'AR', cityId: 'bue', price: 39999, currency: 'ARS', currencySymbol: '$', url: 'https://www.adidas.com.ar/camiseta-trefoil/IU2421.html', inStock: true, lastUpdated: '2026-04-04' },
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
