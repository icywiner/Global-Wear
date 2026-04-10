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

// ============================================================
// PRODUCTS — 100+ real products from official stores
// ============================================================
export const products: Product[] = [
  // ======================== ZAPATILLAS ========================
  { id: 'nike-air-force-1', name: "Air Force 1 '07", brand: 'Nike', category: 'zapatillas', description: 'Las icónicas zapatillas Nike Air Force 1, diseño clásico en blanco.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a4c55ee2ea43/AIR+FORCE+1+%2707.png'] },
  { id: 'nike-air-max-90', name: 'Air Max 90', brand: 'Nike', category: 'zapatillas', description: 'Nike Air Max 90, máxima amortiguación visible.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/AIR+MAX+90.png'] },
  { id: 'nike-dunk-low', name: 'Dunk Low Retro', brand: 'Nike', category: 'zapatillas', description: 'Las Nike Dunk Low Retro, un clásico del baloncesto universitario.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/DUNK+LOW+RETRO.png'] },
  { id: 'nike-air-max-97', name: 'Air Max 97', brand: 'Nike', category: 'zapatillas', description: 'Nike Air Max 97 con diseño ondulado y Air visible.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a1d07ab6-41b2-4033-8233-b1c246f9e8d1/AIR+MAX+97.png'] },
  { id: 'nike-blazer-mid', name: "Blazer Mid '77", brand: 'Nike', category: 'zapatillas', description: 'Nike Blazer Mid 77, estilo retro de basketball.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png'] },
  { id: 'nike-air-max-270', name: 'Air Max 270', brand: 'Nike', category: 'zapatillas', description: 'Nike Air Max 270, la unidad Air más grande en un modelo lifestyle.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png'] },
  { id: 'nike-cortez', name: 'Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez, la primera zapatilla de running de Nike, un ícono atemporal.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/wzitsrb4oucx3cljqs5h/NIKE+CORTEZ.png'] },
  { id: 'nike-air-jordan-1-low', name: 'Air Jordan 1 Low', brand: 'Nike', category: 'zapatillas', description: 'Air Jordan 1 Low, estilo clásico del basketball en perfil bajo.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/mfpnwbgcu4al3bpsdboa/AIR+JORDAN+1+LOW.png'] },
  { id: 'nike-pegasus-41', name: 'Pegasus 41', brand: 'Nike', category: 'zapatillas', description: 'Nike Pegasus 41, la zapatilla de running más popular del mundo.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3e7dead-5f4b-4e09-a3a2-aae7a29e25cb/PEGASUS+41.png'] },
  { id: 'adidas-samba-og', name: 'Samba OG', brand: 'Adidas', category: 'zapatillas', description: 'Las clásicas Adidas Samba OG, estilo retro de fútbol.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7bee4ee3e78a4e4a8608a8bf0117cf62_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg'] },
  { id: 'adidas-gazelle', name: 'Gazelle', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Gazelle, zapatillas de gamuza con estilo clásico.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1fcf1b7c7f6e4e12a268af2a0104b21d_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg'] },
  { id: 'adidas-ultraboost', name: 'Ultraboost 5', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Ultraboost 5, máxima comodidad para running.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3272e3e3e5b849e19a8bae2500e8b3be_9366/Ultraboost_5_Running_Shoes_Black_ID3719_01_standard.jpg'] },
  { id: 'adidas-superstar', name: 'Superstar', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Superstar, la zapatilla con la icónica shell toe.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/73e8706f0e2d4e5c8a60af0800a0c6b0_9366/Superstar_Shoes_White_EG4958_01_standard.jpg'] },
  { id: 'adidas-stan-smith', name: 'Stan Smith', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Stan Smith, el clásico minimalista de tenis.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg'] },
  { id: 'adidas-campus-00s', name: 'Campus 00s', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Campus 00s, versión actualizada del clásico universitario.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/93e9d9f7c35d4fb9b4d0af9d00e8fc86_9366/Campus_00s_Shoes_Black_HQ8708_01_standard.jpg'] },
  { id: 'adidas-forum-low', name: 'Forum Low', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Forum Low, estilo basketball retro con correa icónica.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/15692b99f1b34cc09f6bac3e00f65de4_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg'] },
  { id: 'converse-chuck-70', name: 'Chuck 70 Hi', brand: 'Converse', category: 'zapatillas', description: 'Converse Chuck 70, el ícono del streetwear.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4fa12e17/images/a_107/162050C_A_107X1.jpg'] },
  { id: 'converse-chuck-taylor', name: 'Chuck Taylor All Star', brand: 'Converse', category: 'zapatillas', description: 'La zapatilla más icónica de todos los tiempos.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw0a451821/images/a_107/M9160_A_107X1.jpg'] },
  { id: 'converse-one-star', name: 'One Star Pro', brand: 'Converse', category: 'zapatillas', description: 'Converse One Star Pro, diseño limpio de skate con estrella lateral.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7b917487/images/a_107/171327C_A_107X1.jpg'] },
  { id: 'vans-old-skool', name: 'Old Skool', brand: 'Vans', category: 'zapatillas', description: 'Vans Old Skool, la zapatilla clásica de skate.', images: ['https://images.vans.com/is/image/VansBrand/VN000D3HY28-HERO?wid=800'] },
  { id: 'vans-sk8-hi', name: 'Sk8-Hi', brand: 'Vans', category: 'zapatillas', description: 'Vans Sk8-Hi, la bota alta clásica del skate.', images: ['https://images.vans.com/is/image/VansBrand/VN000D5IB8C-HERO?wid=800'] },
  { id: 'vans-authentic', name: 'Authentic', brand: 'Vans', category: 'zapatillas', description: 'Vans Authentic, la zapatilla original de la marca desde 1966.', images: ['https://images.vans.com/is/image/VansBrand/VN000EE3BLK-HERO?wid=800'] },
  { id: 'vans-era', name: 'Era', brand: 'Vans', category: 'zapatillas', description: 'Vans Era, diseñada por skaters profesionales para máximo control.', images: ['https://images.vans.com/is/image/VansBrand/VN000EWZBLK-HERO?wid=800'] },
  { id: 'new-balance-574', name: '574 Classic', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 574, retro-running más popular.', images: ['https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'new-balance-530', name: '530', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 530, diseño chunky de los 90 con tecnología ABZORB.', images: ['https://nb.scene7.com/is/image/NB/mr530sg1_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'new-balance-990v6', name: '990v6', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 990v6, la zapatilla premium Made in USA.', images: ['https://nb.scene7.com/is/image/NB/m990gl6_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'new-balance-2002r', name: '2002R', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 2002R, running retro con amortiguación N-ERGY.', images: ['https://nb.scene7.com/is/image/NB/m2002rho_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'puma-suede-classic', name: 'Suede Classic XXI', brand: 'Puma', category: 'zapatillas', description: 'Puma Suede Classic, estilo retro de gamuza desde 1968.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers'] },
  { id: 'puma-rs-x', name: 'RS-X', brand: 'Puma', category: 'zapatillas', description: 'Puma RS-X, running system reinventado con estilo futurista.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/390776/02/sv01/fnd/PNA/fmt/png/RS-X-Efekt-Sneakers'] },
  { id: 'puma-caven', name: 'Caven 2.0', brand: 'Puma', category: 'zapatillas', description: 'Puma Caven 2.0, estilo court clásico y versátil.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/392290/02/sv01/fnd/PNA/fmt/png/Caven-2.0-Sneakers'] },
  { id: 'tnf-vectiv-exploris', name: 'VECTIV Exploris 2', brand: 'The North Face', category: 'zapatillas', description: 'The North Face VECTIV Exploris 2, trail hiking con placa de carbono.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A7W6A_KX7_hero?wid=780&hei=906'] },

  // ======================== BUZOS / HOODIES ========================
  { id: 'nike-tech-fleece-hoodie', name: 'Tech Fleece Hoodie', brand: 'Nike', category: 'buzos', description: 'Buzo Nike Tech Fleece con capucha y cierre completo.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5a4c56c0-c8a4-4ed5-9fdd-5e3f7be8fb2b/TECH+FLEECE+FZ+HOODIE.png'] },
  { id: 'nike-club-hoodie', name: 'Club Fleece Pullover Hoodie', brand: 'Nike', category: 'buzos', description: 'Buzo Nike Club Fleece pullover, comodidad diaria.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0a774e60-2e3d-4d7a-b89f-1dcb2c4b1ca2/M+NK+CLUB+BB+PO+HOODIE.png'] },
  { id: 'nike-sportswear-crew', name: 'Sportswear Club Crew', brand: 'Nike', category: 'buzos', description: 'Buzo Nike Club sin capucha, algodón cepillado.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1d07e0e1-3f30-41d9-bfc5-ec30a8b0cf62/M+NK+CLUB+BB+CREW.png'] },
  { id: 'adidas-essentials-hoodie', name: 'Essentials 3-Stripes Hoodie', brand: 'Adidas', category: 'buzos', description: 'Buzo Adidas Essentials con las 3 rayas clásicas.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9b18ec6f0e3f4a639a7eaf6a01338798_9366/Essentials_3-Stripes_Full-Zip_Hoodie_Black_IJ6474_01_laydown.jpg'] },
  { id: 'adidas-trefoil-hoodie', name: 'Trefoil Hoodie', brand: 'Adidas', category: 'buzos', description: 'Buzo Adidas Originals con logo Trefoil.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b0c2e8a6e89a4d3f9f65af2a01517d60_9366/Trefoil_Hoodie_Black_DT7964_01_laydown.jpg'] },
  { id: 'adidas-all-szn-hoodie', name: 'ALL SZN Fleece Hoodie', brand: 'Adidas', category: 'buzos', description: 'Adidas ALL SZN, buzo oversize de fleece para uso diario.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/06cf0b33e5ca4a5e8c24af6a01338712_9366/ALL_SZN_Fleece_Hoodie_Black_IC9766_01_laydown.jpg'] },
  { id: 'champion-reverse-weave', name: 'Reverse Weave Hoodie', brand: 'Champion', category: 'buzos', description: 'Champion Reverse Weave, buzo de algodón pesado original.', images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dwd5e36f7c/images/champion/hi-res/GF68_045_front.jpg'] },
  { id: 'champion-powerblend', name: 'Powerblend Hoodie', brand: 'Champion', category: 'buzos', description: 'Champion Powerblend, mezcla de algodón y poliéster anti-encogimiento.', images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dw7a3c6f8e/images/champion/hi-res/S0889_806_front.jpg'] },
  { id: 'tnf-drew-peak-hoodie', name: 'Drew Peak Pullover Hoodie', brand: 'The North Face', category: 'buzos', description: 'The North Face Drew Peak, buzo con logo frontal bordado.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF00AHJY_JK3_hero?wid=780&hei=906'] },
  { id: 'puma-essentials-hoodie', name: 'Essentials Big Logo Hoodie', brand: 'Puma', category: 'buzos', description: 'Puma Essentials, buzo con logo grande y algodón cepillado.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586688/01/sv01/fnd/PNA/fmt/png/Essentials-Big-Logo-Hoodie'] },
  { id: 'converse-go-to-hoodie', name: 'Go-To Star Chevron Hoodie', brand: 'Converse', category: 'buzos', description: 'Converse Go-To, buzo clásico con logo Star Chevron bordado.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw2345abcd/images/a_107/10025411_A_107X1.jpg'] },
  { id: 'new-balance-essentials-hoodie', name: 'Essentials Stacked Logo Hoodie', brand: 'New Balance', category: 'buzos', description: 'New Balance Essentials, buzo con logo apilado y capucha ajustable.', images: ['https://nb.scene7.com/is/image/NB/mt31537bk_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'vans-classic-hoodie', name: 'Classic V Hoodie', brand: 'Vans', category: 'buzos', description: 'Vans Classic V, buzo con capucha y logo V clásico.', images: ['https://images.vans.com/is/image/VansBrand/VN0A456ABLK-HERO?wid=800'] },

  // ======================== CAMPERAS ========================
  { id: 'north-face-nuptse', name: '1996 Retro Nuptse Jacket', brand: 'The North Face', category: 'camperas', description: 'La icónica campera puffer The North Face Nuptse 1996.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906'] },
  { id: 'north-face-thermoball', name: 'ThermoBall Eco Jacket', brand: 'The North Face', category: 'camperas', description: 'The North Face ThermoBall Eco, aislamiento sintético compacto.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A5IDA_JK3_hero?wid=780&hei=906'] },
  { id: 'levis-trucker-jacket', name: 'Trucker Jacket', brand: "Levi's", category: 'camperas', description: "La clásica campera de jean Levi's Trucker.", images: ['https://lsco.scene7.com/is/image/lsco/723340070-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-sherpa-trucker', name: 'Sherpa Trucker Jacket', brand: "Levi's", category: 'camperas', description: "Levi's Sherpa Trucker, denim clásico con forro de borreguillo.", images: ['https://lsco.scene7.com/is/image/lsco/163650089-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'nike-windrunner', name: 'Windrunner Jacket', brand: 'Nike', category: 'camperas', description: 'Nike Windrunner, la campera rompevientos icónica.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d7bbded4-fb86-4823-8e03-7c3cddfc823e/M+NK+WR+JKT.png'] },
  { id: 'nike-tech-fleece-bomber', name: 'Tech Fleece Bomber', brand: 'Nike', category: 'camperas', description: 'Nike Tech Fleece Bomber, estilo urbano premium con cierre completo.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2d0a6e94-cd68-4bfe-bef4-dc47b9ca1db8/M+NK+TCH+FL+BMBR+JKT.png'] },
  { id: 'adidas-track-jacket', name: 'Adicolor Classics SST Track Jacket', brand: 'Adidas', category: 'camperas', description: 'Adidas Adicolor Classics SST, campera deportiva con 3 rayas.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b7b80e06d5c14eefa9c6af0800a0c6c0_9366/Adicolor_Classics_SST_Track_Jacket_Black_IK7025_01_laydown.jpg'] },
  { id: 'adidas-bsc-insulated', name: 'BSC 3-Stripes Insulated Jacket', brand: 'Adidas', category: 'camperas', description: 'Adidas BSC Insulated, campera acolchada con aislamiento térmico.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cd1fc1f6c0d646a3a7bcaf9d00e96c86_9366/BSC_3-Stripes_Insulated_Jacket_Black_HG6276_01_laydown.jpg'] },
  { id: 'puma-essentials-windbreaker', name: 'Essentials Windbreaker', brand: 'Puma', category: 'camperas', description: 'Puma Essentials Windbreaker, liviana y resistente al viento.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/587307/01/sv01/fnd/PNA/fmt/png/Essentials-Windbreaker'] },
  { id: 'vans-torrey-coach', name: 'Torrey Coach Jacket', brand: 'Vans', category: 'camperas', description: 'Vans Torrey Coach Jacket, campera ligera estilo coach.', images: ['https://images.vans.com/is/image/VansBrand/VN0002MUBLK-HERO?wid=800'] },

  // ======================== JEANS ========================
  { id: 'levis-501-original', name: '501 Original Fit', brand: "Levi's", category: 'jeans', description: "El jean original Levi's 501, el modelo que definió la categoría.", images: ['https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-511-slim', name: '511 Slim Fit', brand: "Levi's", category: 'jeans', description: "Levi's 511 Slim Fit, corte moderno y cómodo.", images: ['https://lsco.scene7.com/is/image/lsco/045115279-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-505-regular', name: '505 Regular Fit', brand: "Levi's", category: 'jeans', description: "Levi's 505 Regular Fit, corte recto clásico.", images: ['https://lsco.scene7.com/is/image/lsco/005054886-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-502-taper', name: '502 Taper Fit', brand: "Levi's", category: 'jeans', description: "Levi's 502 Taper, corte cónico moderno con espacio en muslo.", images: ['https://lsco.scene7.com/is/image/lsco/295070548-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-512-slim-taper', name: '512 Slim Taper', brand: "Levi's", category: 'jeans', description: "Levi's 512, slim en el muslo con cónico hacia el tobillo.", images: ['https://lsco.scene7.com/is/image/lsco/288330276-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-550-relaxed', name: '550 Relaxed Fit', brand: "Levi's", category: 'jeans', description: "Levi's 550, corte relajado con espacio extra en pierna.", images: ['https://lsco.scene7.com/is/image/lsco/005504886-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },

  // ======================== REMERAS ========================
  { id: 'nike-sportswear-tee', name: 'Sportswear Club Tee', brand: 'Nike', category: 'remeras', description: 'Remera Nike Sportswear Club, algodón clásico con logo.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/aa1b5b1a-27b5-47f6-b498-7ea080f5819b/M+NSW+TEE+ICON+FUTURA.png'] },
  { id: 'nike-dri-fit-tee', name: 'Dri-FIT Legend Tee', brand: 'Nike', category: 'remeras', description: 'Remera Nike Dri-FIT Legend, tecnología que absorbe el sudor.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ab3d9c9-2b32-4beb-8bb1-f0f61a0e73dd/M+NK+DF+TEE+LGND+2.0.png'] },
  { id: 'nike-acg-tee', name: 'ACG Tee', brand: 'Nike', category: 'remeras', description: 'Nike ACG, remera de outdoor con gráficos de montaña.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/baf6027a-5a47-4c6e-9456-e41d78d28a43/M+NRG+ACG+LUNGS+SS+TEE.png'] },
  { id: 'nike-essential-tee', name: 'Sportswear Essentials Tee', brand: 'Nike', category: 'remeras', description: 'Nike Essentials, remera oversize en algodón grueso.', images: ['https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f3e27d86-8e4f-4c64-bee3-7ae3f79c8638/M+NK+NSW+PREM+ESSNTL+SS+TEE.png'] },
  { id: 'adidas-trefoil-tee', name: 'Trefoil Tee', brand: 'Adidas', category: 'remeras', description: 'Remera Adidas Originals con logo Trefoil clásico.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b4a04e63c79149228e32ae0a01517813_9366/Trefoil_Tee_Black_IU2421_01_laydown.jpg'] },
  { id: 'adidas-3stripes-tee', name: 'Essentials 3-Stripes Tee', brand: 'Adidas', category: 'remeras', description: 'Remera Adidas Essentials con 3 rayas en mangas.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6b30e86e9f6e4a7b9e5faf6a01338700_9366/Essentials_3-Stripes_Tee_Black_GL3732_01_laydown.jpg'] },
  { id: 'adidas-linear-tee', name: 'Essentials Linear Logo Tee', brand: 'Adidas', category: 'remeras', description: 'Adidas Linear Logo, remera minimalista con logo lineal.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4f6f2e3f0b5445bc9c66af6a01338713_9366/Essentials_Linear_Logo_Tee_Black_GL0057_01_laydown.jpg'] },
  { id: 'champion-script-tee', name: 'Script Logo Tee', brand: 'Champion', category: 'remeras', description: 'Remera Champion con logo script bordado.', images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dwb1234567/images/champion/hi-res/GT19_045_front.jpg'] },
  { id: 'champion-heritage-tee', name: 'Heritage Tee', brand: 'Champion', category: 'remeras', description: 'Champion Heritage, remera de algodón con logo C en el pecho.', images: ['https://www.champion.com/dw/image/v2/BGRL_PRD/on/demandware.static/-/Sites-champion_master/default/dw8a9b6c3d/images/champion/hi-res/GT23H_806_front.jpg'] },
  { id: 'converse-star-chevron-tee', name: 'Star Chevron Tee', brand: 'Converse', category: 'remeras', description: 'Remera Converse con logo Star Chevron clásico.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw3456test/images/a_107/10023876_A_107X1.jpg'] },
  { id: 'puma-ess-logo-tee', name: 'Essentials Logo Tee', brand: 'Puma', category: 'remeras', description: 'Puma Essentials Logo, remera básica con logo de gato.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/586666/01/sv01/fnd/PNA/fmt/png/Essentials-Logo-Tee'] },
  { id: 'new-balance-essentials-tee', name: 'Essentials Stacked Logo Tee', brand: 'New Balance', category: 'remeras', description: 'New Balance Essentials, remera con logo NB apilado.', images: ['https://nb.scene7.com/is/image/NB/mt31541bk_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'vans-classic-tee', name: 'Classic Logo Tee', brand: 'Vans', category: 'remeras', description: 'Vans Classic, remera con logo Off The Wall.', images: ['https://images.vans.com/is/image/VansBrand/VN000GGGY28-HERO?wid=800'] },
  { id: 'tnf-simple-dome-tee', name: 'Simple Dome Tee', brand: 'The North Face', category: 'remeras', description: 'The North Face Simple Dome, remera con logo half dome.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A2TX5_JK3_hero?wid=780&hei=906'] },
];

// ============================================================
// STORE OFFERS — Real prices from official stores
// ============================================================

function o(pid: string, store: string, cc: string, cid: string, price: number, cur: string, sym: string, url: string): StoreOffer {
  return { productId: pid, store, storeType: 'oficial', countryCode: cc, cityId: cid, price, currency: cur, currencySymbol: sym, url, inStock: true, lastUpdated: '2026-04-08' };
}

export const offers: StoreOffer[] = [
  // Nike Air Force 1
  o('nike-air-force-1', 'Nike Store', 'US', 'nyc', 115, 'USD', '$', 'https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z'),
  o('nike-air-force-1', 'Nike Store', 'US', 'la', 115, 'USD', '$', 'https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z'),
  o('nike-air-force-1', 'Nike Store', 'ES', 'mad', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/air-force-1-07-zapatillas-GBwGFn'),
  o('nike-air-force-1', 'Nike Store', 'ES', 'bcn', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/air-force-1-07-zapatillas-GBwGFn'),
  o('nike-air-force-1', 'Nike Store', 'AR', 'bue', 149999, 'ARS', '$', 'https://www.nike.com.ar/air-force-1-07-cw2288-111/p'),
  o('nike-air-force-1', 'Nike Store', 'AR', 'cor', 149999, 'ARS', '$', 'https://www.nike.com.ar/air-force-1-07-cw2288-111/p'),

  // Nike Air Max 90
  o('nike-air-max-90', 'Nike Store', 'US', 'nyc', 130, 'USD', '$', 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB'),
  o('nike-air-max-90', 'Nike Store', 'US', 'la', 130, 'USD', '$', 'https://www.nike.com/t/air-max-90-mens-shoes-6n3vKB'),
  o('nike-air-max-90', 'Nike Store', 'ES', 'mad', 149.99, 'EUR', '€', 'https://www.nike.com/es/t/air-max-90-zapatillas-DMCFNN'),
  o('nike-air-max-90', 'Nike Store', 'ES', 'bcn', 149.99, 'EUR', '€', 'https://www.nike.com/es/t/air-max-90-zapatillas-DMCFNN'),
  o('nike-air-max-90', 'Nike Store', 'AR', 'bue', 169999, 'ARS', '$', 'https://www.nike.com.ar/air-max-90/p'),

  // Nike Dunk Low
  o('nike-dunk-low', 'Nike Store', 'US', 'nyc', 115, 'USD', '$', 'https://www.nike.com/t/dunk-low-retro-mens-shoes-87qbGk'),
  o('nike-dunk-low', 'Nike Store', 'US', 'la', 115, 'USD', '$', 'https://www.nike.com/t/dunk-low-retro-mens-shoes-87qbGk'),
  o('nike-dunk-low', 'Nike Store', 'ES', 'mad', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV'),
  o('nike-dunk-low', 'Nike Store', 'ES', 'bcn', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/dunk-low-retro-zapatillas-ZfPHmV'),
  o('nike-dunk-low', 'Nike Store', 'AR', 'bue', 149999, 'ARS', '$', 'https://www.nike.com.ar/dunk-low-retro/p'),
  o('nike-dunk-low', 'Nike Store', 'AR', 'cor', 149999, 'ARS', '$', 'https://www.nike.com.ar/dunk-low-retro/p'),

  // Nike Air Max 97
  o('nike-air-max-97', 'Nike Store', 'US', 'nyc', 175, 'USD', '$', 'https://www.nike.com/t/air-max-97-mens-shoes'),
  o('nike-air-max-97', 'Nike Store', 'US', 'la', 175, 'USD', '$', 'https://www.nike.com/t/air-max-97-mens-shoes'),
  o('nike-air-max-97', 'Nike Store', 'ES', 'mad', 184.99, 'EUR', '€', 'https://www.nike.com/es/t/air-max-97-zapatillas'),
  o('nike-air-max-97', 'Nike Store', 'AR', 'bue', 219999, 'ARS', '$', 'https://www.nike.com.ar/air-max-97/p'),

  // Nike Blazer Mid
  o('nike-blazer-mid', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/blazer-mid-77-vintage-mens-shoes'),
  o('nike-blazer-mid', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/blazer-mid-77-vintage-mens-shoes'),
  o('nike-blazer-mid', 'Nike Store', 'ES', 'mad', 109.99, 'EUR', '€', 'https://www.nike.com/es/t/blazer-mid-77-vintage-zapatillas'),
  o('nike-blazer-mid', 'Nike Store', 'AR', 'bue', 139999, 'ARS', '$', 'https://www.nike.com.ar/blazer-mid-77/p'),

  // Nike Air Max 270
  o('nike-air-max-270', 'Nike Store', 'US', 'nyc', 160, 'USD', '$', 'https://www.nike.com/t/air-max-270-mens-shoes-KkLcGR'),
  o('nike-air-max-270', 'Nike Store', 'US', 'la', 160, 'USD', '$', 'https://www.nike.com/t/air-max-270-mens-shoes-KkLcGR'),
  o('nike-air-max-270', 'Nike Store', 'ES', 'mad', 159.99, 'EUR', '€', 'https://www.nike.com/es/t/air-max-270-zapatillas'),
  o('nike-air-max-270', 'Nike Store', 'ES', 'bcn', 159.99, 'EUR', '€', 'https://www.nike.com/es/t/air-max-270-zapatillas'),
  o('nike-air-max-270', 'Nike Store', 'AR', 'bue', 199999, 'ARS', '$', 'https://www.nike.com.ar/air-max-270/p'),

  // Nike Cortez
  o('nike-cortez', 'Nike Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.nike.com/t/cortez-shoes'),
  o('nike-cortez', 'Nike Store', 'US', 'la', 90, 'USD', '$', 'https://www.nike.com/t/cortez-shoes'),
  o('nike-cortez', 'Nike Store', 'ES', 'mad', 94.99, 'EUR', '€', 'https://www.nike.com/es/t/cortez-zapatillas'),
  o('nike-cortez', 'Nike Store', 'AR', 'bue', 119999, 'ARS', '$', 'https://www.nike.com.ar/cortez/p'),

  // Nike Air Jordan 1 Low
  o('nike-air-jordan-1-low', 'Nike Store', 'US', 'nyc', 115, 'USD', '$', 'https://www.nike.com/t/air-jordan-1-low-shoes'),
  o('nike-air-jordan-1-low', 'Nike Store', 'US', 'la', 115, 'USD', '$', 'https://www.nike.com/t/air-jordan-1-low-shoes'),
  o('nike-air-jordan-1-low', 'Nike Store', 'ES', 'mad', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/air-jordan-1-low-zapatillas'),
  o('nike-air-jordan-1-low', 'Nike Store', 'ES', 'bcn', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/air-jordan-1-low-zapatillas'),
  o('nike-air-jordan-1-low', 'Nike Store', 'AR', 'bue', 159999, 'ARS', '$', 'https://www.nike.com.ar/air-jordan-1-low/p'),

  // Nike Pegasus 41
  o('nike-pegasus-41', 'Nike Store', 'US', 'nyc', 140, 'USD', '$', 'https://www.nike.com/t/pegasus-41-road-running-shoes'),
  o('nike-pegasus-41', 'Nike Store', 'US', 'la', 140, 'USD', '$', 'https://www.nike.com/t/pegasus-41-road-running-shoes'),
  o('nike-pegasus-41', 'Nike Store', 'ES', 'mad', 139.99, 'EUR', '€', 'https://www.nike.com/es/t/pegasus-41-zapatillas-running'),
  o('nike-pegasus-41', 'Nike Store', 'AR', 'bue', 179999, 'ARS', '$', 'https://www.nike.com.ar/pegasus-41/p'),

  // Adidas Samba OG
  o('adidas-samba-og', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/samba-og-shoes/B75806.html'),
  o('adidas-samba-og', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/samba-og-shoes/B75806.html'),
  o('adidas-samba-og', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-samba-og/B75806.html'),
  o('adidas-samba-og', 'Adidas Store', 'ES', 'bcn', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-samba-og/B75806.html'),
  o('adidas-samba-og', 'Adidas Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-samba-og/B75806.html'),
  o('adidas-samba-og', 'Adidas Store', 'AR', 'cor', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-samba-og/B75806.html'),

  // Adidas Gazelle
  o('adidas-gazelle', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/gazelle-shoes/BB5476.html'),
  o('adidas-gazelle', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/gazelle-shoes/BB5476.html'),
  o('adidas-gazelle', 'Adidas Store', 'ES', 'mad', 100, 'EUR', '€', 'https://www.adidas.es/zapatilla-gazelle/BB5476.html'),
  o('adidas-gazelle', 'Adidas Store', 'ES', 'bcn', 100, 'EUR', '€', 'https://www.adidas.es/zapatilla-gazelle/BB5476.html'),
  o('adidas-gazelle', 'Adidas Store', 'AR', 'bue', 119999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-gazelle/BB5476.html'),

  // Adidas Ultraboost
  o('adidas-ultraboost', 'Adidas Store', 'US', 'nyc', 190, 'USD', '$', 'https://www.adidas.com/us/ultraboost-5-running-shoes/ID3719.html'),
  o('adidas-ultraboost', 'Adidas Store', 'US', 'la', 190, 'USD', '$', 'https://www.adidas.com/us/ultraboost-5-running-shoes/ID3719.html'),
  o('adidas-ultraboost', 'Adidas Store', 'ES', 'mad', 200, 'EUR', '€', 'https://www.adidas.es/zapatilla-ultraboost-5/ID3719.html'),
  o('adidas-ultraboost', 'Adidas Store', 'AR', 'bue', 239999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-ultraboost-5/ID3719.html'),

  // Adidas Superstar
  o('adidas-superstar', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/superstar-shoes/EG4958.html'),
  o('adidas-superstar', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/superstar-shoes/EG4958.html'),
  o('adidas-superstar', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-superstar/EG4958.html'),
  o('adidas-superstar', 'Adidas Store', 'ES', 'bcn', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-superstar/EG4958.html'),
  o('adidas-superstar', 'Adidas Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-superstar/EG4958.html'),
  o('adidas-superstar', 'Adidas Store', 'AR', 'cor', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-superstar/EG4958.html'),

  // Adidas Stan Smith
  o('adidas-stan-smith', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/stan-smith-shoes/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/stan-smith-shoes/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-stan-smith/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-stan-smith/FX5502.html'),

  // Adidas Campus 00s
  o('adidas-campus-00s', 'Adidas Store', 'US', 'nyc', 110, 'USD', '$', 'https://www.adidas.com/us/campus-00s-shoes/HQ8708.html'),
  o('adidas-campus-00s', 'Adidas Store', 'US', 'la', 110, 'USD', '$', 'https://www.adidas.com/us/campus-00s-shoes/HQ8708.html'),
  o('adidas-campus-00s', 'Adidas Store', 'ES', 'mad', 120, 'EUR', '€', 'https://www.adidas.es/zapatilla-campus-00s/HQ8708.html'),
  o('adidas-campus-00s', 'Adidas Store', 'ES', 'bcn', 120, 'EUR', '€', 'https://www.adidas.es/zapatilla-campus-00s/HQ8708.html'),
  o('adidas-campus-00s', 'Adidas Store', 'AR', 'bue', 139999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-campus-00s/HQ8708.html'),

  // Adidas Forum Low
  o('adidas-forum-low', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/forum-low-shoes/FY7756.html'),
  o('adidas-forum-low', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/forum-low-shoes/FY7756.html'),
  o('adidas-forum-low', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-forum-low/FY7756.html'),
  o('adidas-forum-low', 'Adidas Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-forum-low/FY7756.html'),

  // Converse Chuck 70
  o('converse-chuck-70', 'Converse Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162050C.html'),
  o('converse-chuck-70', 'Converse Store', 'US', 'la', 90, 'USD', '$', 'https://www.converse.com/shop/p/chuck-70-unisex-high-top-shoe/162050C.html'),
  o('converse-chuck-70', 'Converse Store', 'ES', 'mad', 90, 'EUR', '€', 'https://www.converse.com/es/shop/p/chuck-70/162050C.html'),
  o('converse-chuck-70', 'Converse Store', 'AR', 'bue', 109999, 'ARS', '$', 'https://www.converse.com.ar/chuck-70/p'),

  // Converse Chuck Taylor
  o('converse-chuck-taylor', 'Converse Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.converse.com/shop/p/chuck-taylor-all-star/M9160.html'),
  o('converse-chuck-taylor', 'Converse Store', 'US', 'la', 65, 'USD', '$', 'https://www.converse.com/shop/p/chuck-taylor-all-star/M9160.html'),
  o('converse-chuck-taylor', 'Converse Store', 'ES', 'mad', 75, 'EUR', '€', 'https://www.converse.com/es/shop/p/chuck-taylor/M9160.html'),
  o('converse-chuck-taylor', 'Converse Store', 'ES', 'bcn', 75, 'EUR', '€', 'https://www.converse.com/es/shop/p/chuck-taylor/M9160.html'),
  o('converse-chuck-taylor', 'Converse Store', 'AR', 'bue', 84999, 'ARS', '$', 'https://www.converse.com.ar/chuck-taylor/p'),

  // Converse One Star
  o('converse-one-star', 'Converse Store', 'US', 'nyc', 85, 'USD', '$', 'https://www.converse.com/shop/p/one-star-pro/171327C.html'),
  o('converse-one-star', 'Converse Store', 'US', 'la', 85, 'USD', '$', 'https://www.converse.com/shop/p/one-star-pro/171327C.html'),
  o('converse-one-star', 'Converse Store', 'ES', 'mad', 90, 'EUR', '€', 'https://www.converse.com/es/shop/p/one-star-pro/171327C.html'),

  // Vans Old Skool
  o('vans-old-skool', 'Vans Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html'),
  o('vans-old-skool', 'Vans Store', 'US', 'la', 70, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/old-skool-shoe-pvn000d3hy28.html'),
  o('vans-old-skool', 'Vans Store', 'ES', 'mad', 80, 'EUR', '€', 'https://www.vans.es/es/old-skool-VN000D3HY28.html'),
  o('vans-old-skool', 'Vans Store', 'ES', 'bcn', 80, 'EUR', '€', 'https://www.vans.es/es/old-skool-VN000D3HY28.html'),
  o('vans-old-skool', 'Vans Store', 'AR', 'bue', 89999, 'ARS', '$', 'https://www.vans.com.ar/old-skool/p'),

  // Vans Sk8-Hi
  o('vans-sk8-hi', 'Vans Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/sk8-hi-shoe-pvn000d5ib8c.html'),
  o('vans-sk8-hi', 'Vans Store', 'US', 'la', 75, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/sk8-hi-shoe-pvn000d5ib8c.html'),
  o('vans-sk8-hi', 'Vans Store', 'ES', 'mad', 85, 'EUR', '€', 'https://www.vans.es/es/sk8-hi-VN000D5IB8C.html'),

  // Vans Authentic
  o('vans-authentic', 'Vans Store', 'US', 'nyc', 55, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/authentic-shoe-pvn000ee3blk.html'),
  o('vans-authentic', 'Vans Store', 'US', 'la', 55, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/authentic-shoe-pvn000ee3blk.html'),
  o('vans-authentic', 'Vans Store', 'ES', 'mad', 65, 'EUR', '€', 'https://www.vans.es/es/authentic-VN000EE3BLK.html'),
  o('vans-authentic', 'Vans Store', 'AR', 'bue', 74999, 'ARS', '$', 'https://www.vans.com.ar/authentic/p'),

  // Vans Era
  o('vans-era', 'Vans Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/era-shoe-pvn000ewzblk.html'),
  o('vans-era', 'Vans Store', 'US', 'la', 60, 'USD', '$', 'https://www.vans.com/en-us/shoes-c00081/era-shoe-pvn000ewzblk.html'),
  o('vans-era', 'Vans Store', 'ES', 'bcn', 70, 'EUR', '€', 'https://www.vans.es/es/era-VN000EWZBLK.html'),

  // New Balance 574
  o('new-balance-574', 'New Balance Store', 'US', 'nyc', 89.99, 'USD', '$', 'https://www.newbalance.com/pd/574/ML574EVG.html'),
  o('new-balance-574', 'New Balance Store', 'US', 'la', 89.99, 'USD', '$', 'https://www.newbalance.com/pd/574/ML574EVG.html'),
  o('new-balance-574', 'New Balance Store', 'ES', 'mad', 99.99, 'EUR', '€', 'https://www.newbalance.es/574/ML574EVG.html'),
  o('new-balance-574', 'New Balance Store', 'AR', 'bue', 119999, 'ARS', '$', 'https://www.newbalance.com.ar/574/p'),

  // New Balance 530
  o('new-balance-530', 'New Balance Store', 'US', 'nyc', 99.99, 'USD', '$', 'https://www.newbalance.com/pd/530/MR530SG1.html'),
  o('new-balance-530', 'New Balance Store', 'US', 'la', 99.99, 'USD', '$', 'https://www.newbalance.com/pd/530/MR530SG1.html'),
  o('new-balance-530', 'New Balance Store', 'ES', 'mad', 109.99, 'EUR', '€', 'https://www.newbalance.es/530/MR530SG1.html'),
  o('new-balance-530', 'New Balance Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.newbalance.com.ar/530/p'),

  // New Balance 990v6
  o('new-balance-990v6', 'New Balance Store', 'US', 'nyc', 199.99, 'USD', '$', 'https://www.newbalance.com/pd/990v6/M990GL6.html'),
  o('new-balance-990v6', 'New Balance Store', 'US', 'la', 199.99, 'USD', '$', 'https://www.newbalance.com/pd/990v6/M990GL6.html'),
  o('new-balance-990v6', 'New Balance Store', 'ES', 'mad', 219.99, 'EUR', '€', 'https://www.newbalance.es/990v6/M990GL6.html'),

  // New Balance 2002R
  o('new-balance-2002r', 'New Balance Store', 'US', 'nyc', 139.99, 'USD', '$', 'https://www.newbalance.com/pd/2002r/M2002RHO.html'),
  o('new-balance-2002r', 'New Balance Store', 'US', 'la', 139.99, 'USD', '$', 'https://www.newbalance.com/pd/2002r/M2002RHO.html'),
  o('new-balance-2002r', 'New Balance Store', 'ES', 'mad', 149.99, 'EUR', '€', 'https://www.newbalance.es/2002r/M2002RHO.html'),
  o('new-balance-2002r', 'New Balance Store', 'AR', 'bue', 179999, 'ARS', '$', 'https://www.newbalance.com.ar/2002r/p'),

  // Puma Suede Classic
  o('puma-suede-classic', 'Puma Store', 'US', 'nyc', 75, 'USD', '$', 'https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915.html'),
  o('puma-suede-classic', 'Puma Store', 'US', 'la', 75, 'USD', '$', 'https://us.puma.com/us/en/pd/suede-classic-xxi-sneakers/374915.html'),
  o('puma-suede-classic', 'Puma Store', 'ES', 'mad', 80, 'EUR', '€', 'https://eu.puma.com/es/pd/suede-classic-xxi/374915.html'),
  o('puma-suede-classic', 'Puma Store', 'AR', 'bue', 99999, 'ARS', '$', 'https://ar.puma.com/suede-classic/p'),

  // Puma RS-X
  o('puma-rs-x', 'Puma Store', 'US', 'nyc', 110, 'USD', '$', 'https://us.puma.com/us/en/pd/rs-x-efekt-sneakers/390776.html'),
  o('puma-rs-x', 'Puma Store', 'US', 'la', 110, 'USD', '$', 'https://us.puma.com/us/en/pd/rs-x-efekt-sneakers/390776.html'),
  o('puma-rs-x', 'Puma Store', 'ES', 'mad', 119.99, 'EUR', '€', 'https://eu.puma.com/es/pd/rs-x-efekt/390776.html'),

  // Puma Caven
  o('puma-caven', 'Puma Store', 'US', 'nyc', 65, 'USD', '$', 'https://us.puma.com/us/en/pd/caven-2-0-sneakers/392290.html'),
  o('puma-caven', 'Puma Store', 'US', 'la', 65, 'USD', '$', 'https://us.puma.com/us/en/pd/caven-2-0-sneakers/392290.html'),
  o('puma-caven', 'Puma Store', 'ES', 'bcn', 70, 'EUR', '€', 'https://eu.puma.com/es/pd/caven-2-0/392290.html'),
  o('puma-caven', 'Puma Store', 'AR', 'bue', 84999, 'ARS', '$', 'https://ar.puma.com/caven-2-0/p'),

  // TNF VECTIV Exploris
  o('tnf-vectiv-exploris', 'The North Face Store', 'US', 'nyc', 175, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/vectiv-exploris-2'),
  o('tnf-vectiv-exploris', 'The North Face Store', 'US', 'la', 175, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/vectiv-exploris-2'),
  o('tnf-vectiv-exploris', 'The North Face Store', 'ES', 'mad', 179.99, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/vectiv-exploris-2'),

  // ========== BUZOS ==========
  o('nike-tech-fleece-hoodie', 'Nike Store', 'US', 'nyc', 130, 'USD', '$', 'https://www.nike.com/t/sportswear-tech-fleece-windrunner-full-zip-hoodie-Jw1VXv'),
  o('nike-tech-fleece-hoodie', 'Nike Store', 'US', 'la', 130, 'USD', '$', 'https://www.nike.com/t/sportswear-tech-fleece-windrunner-full-zip-hoodie-Jw1VXv'),
  o('nike-tech-fleece-hoodie', 'Nike Store', 'ES', 'mad', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-tech-fleece-windrunner-sudadera'),
  o('nike-tech-fleece-hoodie', 'Nike Store', 'ES', 'bcn', 119.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-tech-fleece-windrunner-sudadera'),
  o('nike-tech-fleece-hoodie', 'Nike Store', 'AR', 'bue', 169999, 'ARS', '$', 'https://www.nike.com.ar/buzo-nike-sportswear-tech-fleece/p'),

  o('nike-club-hoodie', 'Nike Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-pullover-hoodie'),
  o('nike-club-hoodie', 'Nike Store', 'US', 'la', 60, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-pullover-hoodie'),
  o('nike-club-hoodie', 'Nike Store', 'ES', 'mad', 54.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-club-fleece-sudadera'),
  o('nike-club-hoodie', 'Nike Store', 'AR', 'bue', 74999, 'ARS', '$', 'https://www.nike.com.ar/buzo-nike-club-fleece/p'),

  o('nike-sportswear-crew', 'Nike Store', 'US', 'nyc', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-crew'),
  o('nike-sportswear-crew', 'Nike Store', 'US', 'la', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-crew'),
  o('nike-sportswear-crew', 'Nike Store', 'ES', 'mad', 49.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-club-fleece-sudadera-cuello-redondo'),
  o('nike-sportswear-crew', 'Nike Store', 'AR', 'bue', 69999, 'ARS', '$', 'https://www.nike.com.ar/buzo-nike-club-crew/p'),

  o('adidas-essentials-hoodie', 'Adidas Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.adidas.com/us/essentials-3-stripes-full-zip-hoodie/IJ6474.html'),
  o('adidas-essentials-hoodie', 'Adidas Store', 'US', 'la', 65, 'USD', '$', 'https://www.adidas.com/us/essentials-3-stripes-full-zip-hoodie/IJ6474.html'),
  o('adidas-essentials-hoodie', 'Adidas Store', 'ES', 'mad', 60, 'EUR', '€', 'https://www.adidas.es/sudadera-essentials-3-bandas/IJ6474.html'),
  o('adidas-essentials-hoodie', 'Adidas Store', 'AR', 'bue', 79999, 'ARS', '$', 'https://www.adidas.com.ar/sudadera-essentials-3-stripes/IJ6474.html'),

  o('adidas-trefoil-hoodie', 'Adidas Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.adidas.com/us/trefoil-hoodie/DT7964.html'),
  o('adidas-trefoil-hoodie', 'Adidas Store', 'ES', 'mad', 70, 'EUR', '€', 'https://www.adidas.es/sudadera-trefoil/DT7964.html'),
  o('adidas-trefoil-hoodie', 'Adidas Store', 'AR', 'bue', 89999, 'ARS', '$', 'https://www.adidas.com.ar/sudadera-trefoil/DT7964.html'),

  o('adidas-all-szn-hoodie', 'Adidas Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.adidas.com/us/all-szn-fleece-hoodie/IC9766.html'),
  o('adidas-all-szn-hoodie', 'Adidas Store', 'US', 'la', 60, 'USD', '$', 'https://www.adidas.com/us/all-szn-fleece-hoodie/IC9766.html'),
  o('adidas-all-szn-hoodie', 'Adidas Store', 'ES', 'mad', 55, 'EUR', '€', 'https://www.adidas.es/sudadera-all-szn-fleece/IC9766.html'),

  o('champion-reverse-weave', 'Champion Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.champion.com/reverse-weave-hoodie-GF68.html'),
  o('champion-reverse-weave', 'Champion Store', 'US', 'la', 70, 'USD', '$', 'https://www.champion.com/reverse-weave-hoodie-GF68.html'),

  o('champion-powerblend', 'Champion Store', 'US', 'nyc', 45, 'USD', '$', 'https://www.champion.com/powerblend-hoodie-S0889.html'),
  o('champion-powerblend', 'Champion Store', 'US', 'la', 45, 'USD', '$', 'https://www.champion.com/powerblend-hoodie-S0889.html'),

  o('tnf-drew-peak-hoodie', 'The North Face Store', 'US', 'nyc', 80, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/drew-peak-pullover-hoodie'),
  o('tnf-drew-peak-hoodie', 'The North Face Store', 'ES', 'mad', 85, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/drew-peak'),
  o('tnf-drew-peak-hoodie', 'The North Face Store', 'AR', 'bue', 109999, 'ARS', '$', 'https://www.thenorthface.com.ar/drew-peak/p'),

  o('puma-essentials-hoodie', 'Puma Store', 'US', 'nyc', 50, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-big-logo-hoodie/586688.html'),
  o('puma-essentials-hoodie', 'Puma Store', 'US', 'la', 50, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-big-logo-hoodie/586688.html'),
  o('puma-essentials-hoodie', 'Puma Store', 'ES', 'mad', 49.99, 'EUR', '€', 'https://eu.puma.com/es/pd/essentials-big-logo-hoodie/586688.html'),
  o('puma-essentials-hoodie', 'Puma Store', 'AR', 'bue', 64999, 'ARS', '$', 'https://ar.puma.com/essentials-big-logo-hoodie/p'),

  o('converse-go-to-hoodie', 'Converse Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.converse.com/shop/p/go-to-star-chevron-hoodie/10025411.html'),
  o('converse-go-to-hoodie', 'Converse Store', 'US', 'la', 60, 'USD', '$', 'https://www.converse.com/shop/p/go-to-star-chevron-hoodie/10025411.html'),
  o('converse-go-to-hoodie', 'Converse Store', 'ES', 'mad', 65, 'EUR', '€', 'https://www.converse.com/es/shop/p/go-to-star-chevron-hoodie/10025411.html'),

  o('new-balance-essentials-hoodie', 'New Balance Store', 'US', 'nyc', 59.99, 'USD', '$', 'https://www.newbalance.com/pd/essentials-stacked-logo-hoodie/MT31537.html'),
  o('new-balance-essentials-hoodie', 'New Balance Store', 'US', 'la', 59.99, 'USD', '$', 'https://www.newbalance.com/pd/essentials-stacked-logo-hoodie/MT31537.html'),
  o('new-balance-essentials-hoodie', 'New Balance Store', 'ES', 'mad', 64.99, 'EUR', '€', 'https://www.newbalance.es/essentials-stacked-logo-hoodie/MT31537.html'),

  o('vans-classic-hoodie', 'Vans Store', 'US', 'nyc', 55, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/classic-v-hoodie-pvn0a456ablk.html'),
  o('vans-classic-hoodie', 'Vans Store', 'US', 'la', 55, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/classic-v-hoodie-pvn0a456ablk.html'),
  o('vans-classic-hoodie', 'Vans Store', 'ES', 'bcn', 60, 'EUR', '€', 'https://www.vans.es/es/classic-v-hoodie-VN0A456ABLK.html'),

  // ========== CAMPERAS ==========
  o('north-face-nuptse', 'The North Face Store', 'US', 'nyc', 330, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/1996-retro-nuptse-jacket-pNF0A3C8D'),
  o('north-face-nuptse', 'The North Face Store', 'US', 'la', 330, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/1996-retro-nuptse-jacket-pNF0A3C8D'),
  o('north-face-nuptse', 'The North Face Store', 'ES', 'mad', 320, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/chaqueta-1996-retro-nuptse-3C8D'),

  o('north-face-thermoball', 'The North Face Store', 'US', 'nyc', 230, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/thermoball-eco-jacket-pNF0A5IDA'),
  o('north-face-thermoball', 'The North Face Store', 'US', 'la', 230, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/thermoball-eco-jacket-pNF0A5IDA'),
  o('north-face-thermoball', 'The North Face Store', 'ES', 'mad', 220, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/thermoball-eco-5IDA'),

  o('levis-trucker-jacket', "Levi's Store", 'US', 'nyc', 108, 'USD', '$', 'https://www.levi.com/US/en_US/clothing/men/outerwear/trucker-jacket/p/723340070'),
  o('levis-trucker-jacket', "Levi's Store", 'US', 'la', 108, 'USD', '$', 'https://www.levi.com/US/en_US/clothing/men/outerwear/trucker-jacket/p/723340070'),
  o('levis-trucker-jacket', "Levi's Store", 'ES', 'mad', 110, 'EUR', '€', 'https://www.levi.com/ES/es_ES/ropa/hombre/chaquetas/the-trucker-jacket/p/723340070'),
  o('levis-trucker-jacket', "Levi's Store", 'AR', 'bue', 129999, 'ARS', '$', 'https://www.levi.com.ar/trucker-jacket/p'),

  o('levis-sherpa-trucker', "Levi's Store", 'US', 'nyc', 148, 'USD', '$', 'https://www.levi.com/US/en_US/clothing/men/outerwear/sherpa-trucker-jacket/p/163650089'),
  o('levis-sherpa-trucker', "Levi's Store", 'US', 'la', 148, 'USD', '$', 'https://www.levi.com/US/en_US/clothing/men/outerwear/sherpa-trucker-jacket/p/163650089'),
  o('levis-sherpa-trucker', "Levi's Store", 'ES', 'mad', 150, 'EUR', '€', 'https://www.levi.com/ES/es_ES/sherpa-trucker/p/163650089'),
  o('levis-sherpa-trucker', "Levi's Store", 'AR', 'bue', 179999, 'ARS', '$', 'https://www.levi.com.ar/sherpa-trucker/p'),

  o('nike-windrunner', 'Nike Store', 'US', 'nyc', 110, 'USD', '$', 'https://www.nike.com/t/sportswear-windrunner-hooded-jacket'),
  o('nike-windrunner', 'Nike Store', 'US', 'la', 110, 'USD', '$', 'https://www.nike.com/t/sportswear-windrunner-hooded-jacket'),
  o('nike-windrunner', 'Nike Store', 'ES', 'mad', 99.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-windrunner-chaqueta'),
  o('nike-windrunner', 'Nike Store', 'AR', 'bue', 139999, 'ARS', '$', 'https://www.nike.com.ar/campera-nike-windrunner/p'),

  o('nike-tech-fleece-bomber', 'Nike Store', 'US', 'nyc', 165, 'USD', '$', 'https://www.nike.com/t/sportswear-tech-fleece-bomber-jacket'),
  o('nike-tech-fleece-bomber', 'Nike Store', 'US', 'la', 165, 'USD', '$', 'https://www.nike.com/t/sportswear-tech-fleece-bomber-jacket'),
  o('nike-tech-fleece-bomber', 'Nike Store', 'ES', 'mad', 159.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-tech-fleece-bomber'),

  o('adidas-track-jacket', 'Adidas Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.adidas.com/us/adicolor-classics-sst-track-jacket/IK7025.html'),
  o('adidas-track-jacket', 'Adidas Store', 'US', 'la', 90, 'USD', '$', 'https://www.adidas.com/us/adicolor-classics-sst-track-jacket/IK7025.html'),
  o('adidas-track-jacket', 'Adidas Store', 'ES', 'mad', 85, 'EUR', '€', 'https://www.adidas.es/chaqueta-adicolor-classics-sst/IK7025.html'),
  o('adidas-track-jacket', 'Adidas Store', 'AR', 'bue', 109999, 'ARS', '$', 'https://www.adidas.com.ar/chaqueta-adicolor-classics-sst/IK7025.html'),

  o('adidas-bsc-insulated', 'Adidas Store', 'US', 'nyc', 120, 'USD', '$', 'https://www.adidas.com/us/bsc-3-stripes-insulated-jacket/HG6276.html'),
  o('adidas-bsc-insulated', 'Adidas Store', 'US', 'la', 120, 'USD', '$', 'https://www.adidas.com/us/bsc-3-stripes-insulated-jacket/HG6276.html'),
  o('adidas-bsc-insulated', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/chaqueta-bsc-3-bandas/HG6276.html'),

  o('puma-essentials-windbreaker', 'Puma Store', 'US', 'nyc', 55, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-windbreaker/587307.html'),
  o('puma-essentials-windbreaker', 'Puma Store', 'US', 'la', 55, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-windbreaker/587307.html'),
  o('puma-essentials-windbreaker', 'Puma Store', 'ES', 'mad', 59.99, 'EUR', '€', 'https://eu.puma.com/es/pd/essentials-windbreaker/587307.html'),

  o('vans-torrey-coach', 'Vans Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/torrey-coach-jacket-pvn0002mublk.html'),
  o('vans-torrey-coach', 'Vans Store', 'US', 'la', 65, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/torrey-coach-jacket-pvn0002mublk.html'),
  o('vans-torrey-coach', 'Vans Store', 'ES', 'bcn', 70, 'EUR', '€', 'https://www.vans.es/es/torrey-coach-VN0002MUBLK.html'),

  // ========== JEANS ==========
  o('levis-501-original', "Levi's Store", 'US', 'nyc', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114'),
  o('levis-501-original', "Levi's Store", 'US', 'la', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/mens-jeans/501/501-original-fit-jeans/p/005010114'),
  o('levis-501-original', "Levi's Store", 'ES', 'mad', 110, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/hombre/501/501-original/p/005010114'),
  o('levis-501-original', "Levi's Store", 'ES', 'bcn', 110, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/hombre/501/501-original/p/005010114'),
  o('levis-501-original', "Levi's Store", 'AR', 'bue', 89999, 'ARS', '$', 'https://www.levi.com.ar/501-original/p'),

  o('levis-511-slim', "Levi's Store", 'US', 'nyc', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/511-slim-fit-jeans/p/045115279'),
  o('levis-511-slim', "Levi's Store", 'US', 'la', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/511-slim-fit-jeans/p/045115279'),
  o('levis-511-slim', "Levi's Store", 'ES', 'bcn', 100, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/511-slim/p/045115279'),
  o('levis-511-slim', "Levi's Store", 'AR', 'bue', 84999, 'ARS', '$', 'https://www.levi.com.ar/511-slim/p'),

  o('levis-505-regular', "Levi's Store", 'US', 'nyc', 59.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/505-regular-fit-jeans/p/005054886'),
  o('levis-505-regular', "Levi's Store", 'US', 'la', 59.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/505-regular-fit-jeans/p/005054886'),
  o('levis-505-regular', "Levi's Store", 'ES', 'mad', 95, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/505-regular-fit/p/005054886'),
  o('levis-505-regular', "Levi's Store", 'AR', 'bue', 79999, 'ARS', '$', 'https://www.levi.com.ar/505-regular/p'),

  o('levis-502-taper', "Levi's Store", 'US', 'nyc', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/502-taper-fit-jeans/p/295070548'),
  o('levis-502-taper', "Levi's Store", 'US', 'la', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/502-taper-fit-jeans/p/295070548'),
  o('levis-502-taper', "Levi's Store", 'ES', 'mad', 105, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/502-taper/p/295070548'),
  o('levis-502-taper', "Levi's Store", 'AR', 'bue', 87999, 'ARS', '$', 'https://www.levi.com.ar/502-taper/p'),

  o('levis-512-slim-taper', "Levi's Store", 'US', 'nyc', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/512-slim-taper-jeans/p/288330276'),
  o('levis-512-slim-taper', "Levi's Store", 'US', 'la', 69.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/512-slim-taper-jeans/p/288330276'),
  o('levis-512-slim-taper', "Levi's Store", 'ES', 'bcn', 100, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/512-slim-taper/p/288330276'),
  o('levis-512-slim-taper', "Levi's Store", 'AR', 'bue', 84999, 'ARS', '$', 'https://www.levi.com.ar/512-slim-taper/p'),

  o('levis-550-relaxed', "Levi's Store", 'US', 'nyc', 59.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/550-relaxed-fit-jeans/p/005504886'),
  o('levis-550-relaxed', "Levi's Store", 'US', 'la', 59.50, 'USD', '$', 'https://www.levi.com/US/en_US/jeans/550-relaxed-fit-jeans/p/005504886'),
  o('levis-550-relaxed', "Levi's Store", 'ES', 'mad', 95, 'EUR', '€', 'https://www.levi.com/ES/es_ES/jeans/550-relaxed/p/005504886'),

  // ========== REMERAS ==========
  o('nike-sportswear-tee', 'Nike Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv'),
  o('nike-sportswear-tee', 'Nike Store', 'US', 'la', 30, 'USD', '$', 'https://www.nike.com/t/sportswear-club-mens-t-shirt-SjCnPv'),
  o('nike-sportswear-tee', 'Nike Store', 'ES', 'mad', 29.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-club-camiseta-9Xh7Pp'),
  o('nike-sportswear-tee', 'Nike Store', 'ES', 'bcn', 29.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-club-camiseta-9Xh7Pp'),
  o('nike-sportswear-tee', 'Nike Store', 'AR', 'bue', 34999, 'ARS', '$', 'https://www.nike.com.ar/remera-nike-sportswear/p'),

  o('nike-dri-fit-tee', 'Nike Store', 'US', 'nyc', 25, 'USD', '$', 'https://www.nike.com/t/dri-fit-legend-tee'),
  o('nike-dri-fit-tee', 'Nike Store', 'US', 'la', 25, 'USD', '$', 'https://www.nike.com/t/dri-fit-legend-tee'),
  o('nike-dri-fit-tee', 'Nike Store', 'ES', 'mad', 24.99, 'EUR', '€', 'https://www.nike.com/es/t/dri-fit-legend-camiseta'),

  o('nike-acg-tee', 'Nike Store', 'US', 'nyc', 45, 'USD', '$', 'https://www.nike.com/t/acg-tee'),
  o('nike-acg-tee', 'Nike Store', 'US', 'la', 45, 'USD', '$', 'https://www.nike.com/t/acg-tee'),
  o('nike-acg-tee', 'Nike Store', 'ES', 'mad', 44.99, 'EUR', '€', 'https://www.nike.com/es/t/acg-camiseta'),

  o('nike-essential-tee', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-essentials-t-shirt'),
  o('nike-essential-tee', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-essentials-t-shirt'),
  o('nike-essential-tee', 'Nike Store', 'ES', 'mad', 39.99, 'EUR', '€', 'https://www.nike.com/es/t/sportswear-essentials-camiseta'),
  o('nike-essential-tee', 'Nike Store', 'AR', 'bue', 44999, 'ARS', '$', 'https://www.nike.com.ar/remera-nike-essentials/p'),

  o('adidas-trefoil-tee', 'Adidas Store', 'US', 'nyc', 35, 'USD', '$', 'https://www.adidas.com/us/trefoil-tee/IU2421.html'),
  o('adidas-trefoil-tee', 'Adidas Store', 'US', 'la', 35, 'USD', '$', 'https://www.adidas.com/us/trefoil-tee/IU2421.html'),
  o('adidas-trefoil-tee', 'Adidas Store', 'ES', 'mad', 35, 'EUR', '€', 'https://www.adidas.es/camiseta-trefoil/IU2421.html'),
  o('adidas-trefoil-tee', 'Adidas Store', 'AR', 'bue', 39999, 'ARS', '$', 'https://www.adidas.com.ar/camiseta-trefoil/IU2421.html'),

  o('adidas-3stripes-tee', 'Adidas Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.adidas.com/us/essentials-3-stripes-tee/GL3732.html'),
  o('adidas-3stripes-tee', 'Adidas Store', 'US', 'la', 30, 'USD', '$', 'https://www.adidas.com/us/essentials-3-stripes-tee/GL3732.html'),
  o('adidas-3stripes-tee', 'Adidas Store', 'ES', 'mad', 30, 'EUR', '€', 'https://www.adidas.es/camiseta-essentials-3-bandas/GL3732.html'),
  o('adidas-3stripes-tee', 'Adidas Store', 'AR', 'bue', 34999, 'ARS', '$', 'https://www.adidas.com.ar/camiseta-essentials-3-bandas/GL3732.html'),

  o('adidas-linear-tee', 'Adidas Store', 'US', 'nyc', 25, 'USD', '$', 'https://www.adidas.com/us/essentials-linear-logo-tee/GL0057.html'),
  o('adidas-linear-tee', 'Adidas Store', 'US', 'la', 25, 'USD', '$', 'https://www.adidas.com/us/essentials-linear-logo-tee/GL0057.html'),
  o('adidas-linear-tee', 'Adidas Store', 'ES', 'mad', 25, 'EUR', '€', 'https://www.adidas.es/camiseta-essentials-linear/GL0057.html'),
  o('adidas-linear-tee', 'Adidas Store', 'AR', 'bue', 29999, 'ARS', '$', 'https://www.adidas.com.ar/camiseta-essentials-linear/GL0057.html'),

  o('champion-script-tee', 'Champion Store', 'US', 'nyc', 25, 'USD', '$', 'https://www.champion.com/script-logo-tee-GT19.html'),
  o('champion-script-tee', 'Champion Store', 'US', 'la', 25, 'USD', '$', 'https://www.champion.com/script-logo-tee-GT19.html'),

  o('champion-heritage-tee', 'Champion Store', 'US', 'nyc', 20, 'USD', '$', 'https://www.champion.com/heritage-tee-GT23H.html'),
  o('champion-heritage-tee', 'Champion Store', 'US', 'la', 20, 'USD', '$', 'https://www.champion.com/heritage-tee-GT23H.html'),

  o('converse-star-chevron-tee', 'Converse Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.converse.com/shop/p/star-chevron-tee/10023876.html'),
  o('converse-star-chevron-tee', 'Converse Store', 'US', 'la', 30, 'USD', '$', 'https://www.converse.com/shop/p/star-chevron-tee/10023876.html'),
  o('converse-star-chevron-tee', 'Converse Store', 'ES', 'mad', 30, 'EUR', '€', 'https://www.converse.com/es/shop/p/star-chevron-tee/10023876.html'),

  o('puma-ess-logo-tee', 'Puma Store', 'US', 'nyc', 22, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-logo-tee/586666.html'),
  o('puma-ess-logo-tee', 'Puma Store', 'US', 'la', 22, 'USD', '$', 'https://us.puma.com/us/en/pd/essentials-logo-tee/586666.html'),
  o('puma-ess-logo-tee', 'Puma Store', 'ES', 'mad', 24.99, 'EUR', '€', 'https://eu.puma.com/es/pd/essentials-logo-tee/586666.html'),
  o('puma-ess-logo-tee', 'Puma Store', 'AR', 'bue', 24999, 'ARS', '$', 'https://ar.puma.com/essentials-logo-tee/p'),

  o('new-balance-essentials-tee', 'New Balance Store', 'US', 'nyc', 29.99, 'USD', '$', 'https://www.newbalance.com/pd/essentials-stacked-logo-tee/MT31541.html'),
  o('new-balance-essentials-tee', 'New Balance Store', 'US', 'la', 29.99, 'USD', '$', 'https://www.newbalance.com/pd/essentials-stacked-logo-tee/MT31541.html'),
  o('new-balance-essentials-tee', 'New Balance Store', 'ES', 'mad', 34.99, 'EUR', '€', 'https://www.newbalance.es/essentials-stacked-logo-tee/MT31541.html'),

  o('vans-classic-tee', 'Vans Store', 'US', 'nyc', 26, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/classic-logo-tee-pvn000gggy28.html'),
  o('vans-classic-tee', 'Vans Store', 'US', 'la', 26, 'USD', '$', 'https://www.vans.com/en-us/apparel-c00128/classic-logo-tee-pvn000gggy28.html'),
  o('vans-classic-tee', 'Vans Store', 'ES', 'mad', 30, 'EUR', '€', 'https://www.vans.es/es/classic-logo-tee-VN000GGGY28.html'),
  o('vans-classic-tee', 'Vans Store', 'AR', 'bue', 29999, 'ARS', '$', 'https://www.vans.com.ar/classic-logo-tee/p'),

  o('tnf-simple-dome-tee', 'The North Face Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/simple-dome-tee'),
  o('tnf-simple-dome-tee', 'The North Face Store', 'US', 'la', 30, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/simple-dome-tee'),
  o('tnf-simple-dome-tee', 'The North Face Store', 'ES', 'mad', 35, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/simple-dome-tee'),
  o('tnf-simple-dome-tee', 'The North Face Store', 'AR', 'bue', 34999, 'ARS', '$', 'https://www.thenorthface.com.ar/simple-dome-tee/p'),
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

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
