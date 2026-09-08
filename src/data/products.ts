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
  { id: 'zapatillas', label: 'Zapatillas', icon: '👟', image: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6d8034a9-f71e-4a4b-b6c6-87ce86508636/dunk-low-suede-womens-shoes-HkzujqYZ.png' },
  { id: 'remeras', label: 'Remeras', icon: '👕', image: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/12d0d9de-8c2b-49e0-bd3a-18c224467821/jannik-sinner-mens-nikecourt-dri-fit-graphic-tennis-t-shirt-WbhXN8Y0.png' },
  { id: 'jeans', label: 'Jeans', icon: '👖', image: 'https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000' },
  { id: 'buzos', label: 'Buzos / Hoodies', icon: '🧥', image: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/adf9e903-b223-4638-a963-e480de40f95e/west-virginia-courtside-mens-nike-dri-fit-college-pullover-hoodie-9S2CGSFn.png' },
  { id: 'camperas', label: 'Camperas', icon: '🧥', image: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/565f2788-70fe-4c48-b0ed-918f2ab730af/sportswear-windrunner-big-kids-hooded-repel-jacket-fUNjyLas.png' },
];

// ============================================================
// PRODUCTS — 100+ real products from official stores
// ============================================================
export const products: Product[] = [
  { id: 'nike-west-virginia-courtside-04ej19mcwvn-usu', name: 'West Virginia Courtside', brand: 'Nike', category: 'buzos', description: 'West Virginia Courtside — Men\'s Nike Dri-FIT College Pullover Hoodie. Producto oficial de Nike.com (SKU 04EJ19MCWVN-USU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/adf9e903-b223-4638-a963-e480de40f95e/west-virginia-courtside-mens-nike-dri-fit-college-pullover-hoodie-9S2CGSFn.png'] },
  { id: 'nike-florida-state-courtside-04ej08deftn-usu', name: 'Florida State Courtside', brand: 'Nike', category: 'buzos', description: 'Florida State Courtside — Men\'s Nike Dri-FIT College Pullover Hoodie. Producto oficial de Nike.com (SKU 04EJ08DEFTN-USU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f66deb86-05bd-4676-86e6-9a3edace5df4/florida-state-courtside-mens-nike-dri-fit-college-pullover-hoodie-nD55dmld.png'] },
  { id: 'nike-nike-n-a-c-im3609-077', name: 'Nike N.A.C.', brand: 'Nike', category: 'buzos', description: 'Nike N.A.C. — Men\'s Dri-FIT Oversized Fleece Training Hoodie. Producto oficial de Nike.com (SKU IM3609-077).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ebfda7d3-fddf-4006-9ebc-6609d58bfcb5/nac-mens-dri-fit-oversized-fleece-training-hoodie-t7mydNNM.png'] },
  { id: 'nike-nike-tech-io9941-009', name: 'Nike Tech', brand: 'Nike', category: 'buzos', description: 'Nike Tech — Men\'s Fleece Pullover Hoodie. Producto oficial de Nike.com (SKU IO9941-009).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3712b900-4462-4eaf-90a6-bcbaf77359f8/tech-mens-fleece-pullover-hoodie-2eYhFKJ7.png'] },
  { id: 'nike-nike-tech-if1319-009', name: 'Nike Tech', brand: 'Nike', category: 'buzos', description: 'Nike Tech — Men\'s Fleece Full-Zip Hoodie. Producto oficial de Nike.com (SKU IF1319-009).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/96bfc2e2-d797-44c4-84f6-7bf6f9fb23bf/tech-mens-fleece-full-zip-hoodie-W07x1PWs.png'] },
  { id: 'nike-nike-primary-nanoknit-iu3220-320', name: 'Nike Primary Nanoknit', brand: 'Nike', category: 'buzos', description: 'Nike Primary Nanoknit — Big Kids\' (Boys\') Dri-FIT UV Protection Pullover Hoodie. Producto oficial de Nike.com (SKU IU3220-320).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c6ca0b9d-8d34-46c8-91fb-a211a677a1d3/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc.png'] },
  { id: 'nike-nike-sportswear-club-fleece-im4935-010', name: 'Nike Sportswear Club Fleece', brand: 'Nike', category: 'buzos', description: 'Nike Sportswear Club Fleece — Big Kids\' Oversized Hoodie. Producto oficial de Nike.com (SKU IM4935-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a923ecd2-9573-44fc-9e30-9f4f87464aa7/sportswear-club-fleece-big-kids-oversized-hoodie-mUhDy8jC.png'] },
  { id: 'nike-jordan-brooklyn-im8911-054', name: 'Jordan Brooklyn', brand: 'Nike', category: 'buzos', description: 'Jordan Brooklyn — Men\'s Oversized Fleece Pullover Hoodie. Producto oficial de Nike.com (SKU IM8911-054).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9ec46bbc-7dba-4873-b838-d292c9d48c22/jordan-brooklyn-mens-oversized-fleece-pullover-hoodie-e9HjcDLe.png'] },
  { id: 'nike-jordan-brooklyn-iu0249-657', name: 'Jordan Brooklyn', brand: 'Nike', category: 'buzos', description: 'Jordan Brooklyn — Men\'s Pullover Hoodie. Producto oficial de Nike.com (SKU IU0249-657).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7d823db8-325e-4c92-8daf-e7bf584b8bba/jordan-brooklyn-mens-pullover-hoodie-yjTcCQad.png'] },
  { id: 'nike-nike-primary-nanoknit-iu3220-451', name: 'Nike Primary Nanoknit', brand: 'Nike', category: 'buzos', description: 'Nike Primary Nanoknit — Big Kids\' (Boys\') Dri-FIT UV Protection Pullover Hoodie. Producto oficial de Nike.com (SKU IU3220-451).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b3cf7940-d2e2-4750-9ee1-3021b34bdf92/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc.png'] },
  { id: 'nike-nike-primary-nanoknit-iu3220-084', name: 'Nike Primary Nanoknit', brand: 'Nike', category: 'buzos', description: 'Nike Primary Nanoknit — Big Kids\' (Boys\') Dri-FIT UV Protection Pullover Hoodie. Producto oficial de Nike.com (SKU IU3220-084).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/49596e4d-8adb-45a3-8147-94a406db4447/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc.png'] },
  { id: 'nike-nike-24-7-impossiblysoft-ir8807-104', name: 'Nike 24.7 ImpossiblySoft', brand: 'Nike', category: 'buzos', description: 'Nike 24.7 ImpossiblySoft — Men\'s Dri-FIT Pullover Hoodie. Producto oficial de Nike.com (SKU IR8807-104).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7435d23-14be-4a49-89dc-c4f3d645eb46/24-7-impossiblysoft-mens-dri-fit-pullover-hoodie-x2cnDEAK.png'] },
  { id: 'nike-nike-sportswear-studio-fleece-im4904-437', name: 'Nike Sportswear Studio Fleece', brand: 'Nike', category: 'buzos', description: 'Nike Sportswear Studio Fleece — Big Kids\' (Girls\') Oversized Full-Zip Hoodie. Producto oficial de Nike.com (SKU IM4904-437).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7924a193-f562-46c6-9ddc-4d3d519de3ac/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM.png'] },
  { id: 'nike-nike-sportswear-studio-fleece-im4904-051', name: 'Nike Sportswear Studio Fleece', brand: 'Nike', category: 'buzos', description: 'Nike Sportswear Studio Fleece — Big Kids\' (Girls\') Oversized Full-Zip Hoodie. Producto oficial de Nike.com (SKU IM4904-051).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4b9379ca-1bf3-4eb8-8a62-3a79ade01b9a/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM.png'] },
  { id: 'nike-cleveland-browns-rewind-club-nkdk89n93v-tm9', name: 'Cleveland Browns Rewind Club', brand: 'Nike', category: 'buzos', description: 'Cleveland Browns Rewind Club — Men\'s Nike NFL Pullover Hoodie. Producto oficial de Nike.com (SKU NKDK89N93V-TM9).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8d650d13-d0cf-4283-b044-c2a8729cb3b8/cleveland-browns-rewind-club-mens-nike-nfl-pullover-hoodie-9F6MAINW.png'] },
  { id: 'nike-kansas-city-chiefs-crucial-catch-sideline-standard-issue-03az68xzug-f9r', name: 'Kansas City Chiefs Crucial Catch Sideline Standard Issue', brand: 'Nike', category: 'buzos', description: 'Kansas City Chiefs Crucial Catch Sideline Standard Issue — Men\'s Nike Dri-FIT NFL Pullover Hoodie. Producto oficial de Nike.com (SKU 03AZ68XZUG-F9R).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6083f4e7-d3c7-469b-a93d-8a12b1c48ba2/kansas-city-chiefs-crucial-catch-sideline-standard-issue-mens-nike-dri-fit-nfl-pullover-hoodie-j0AXHj21.png'] },
  { id: 'nike-jordan-flight-x-howard-university-iu5517-419', name: 'Jordan Flight x Howard University', brand: 'Nike', category: 'buzos', description: 'Jordan Flight x Howard University — Men\'s Fleece Full-Zip Hoodie. Producto oficial de Nike.com (SKU IU5517-419).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0da9baec-5da1-4641-8391-641bd0ce413d/jordan-flight-x-howard-university-mens-fleece-full-zip-hoodie-B0wAOW4E.png'] },
  { id: 'nike-ole-miss-sideline-standard-issue-iv9894-421', name: 'Ole Miss Sideline Standard Issue', brand: 'Nike', category: 'buzos', description: 'Ole Miss Sideline Standard Issue — Men\'s Nike Dri-FIT College Full-Zip Hoodie. Producto oficial de Nike.com (SKU IV9894-421).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4946b038-142f-41c7-9024-0a3e6734835c/ole-miss-sideline-standard-issue-mens-nike-dri-fit-college-full-zip-hoodie-pn4E1BVQ.png'] },
  { id: 'nike-justin-herbert-los-angeles-chargers-z1b7nfm4chahj-ncw', name: 'Justin Herbert Los Angeles Chargers', brand: 'Nike', category: 'buzos', description: 'Justin Herbert Los Angeles Chargers — Big Kids\' Nike NFL Pullover Hoodie. Producto oficial de Nike.com (SKU Z1B7NFM4CHAHJ-NCW).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a35135fe-06a0-4c48-81f8-a59a65af513a/justin-herbert-los-angeles-chargers-big-kids-nike-nfl-pullover-hoodie-9UWvQ9Zq.png'] },
  { id: 'nike-brock-purdy-san-francisco-49ers-z1b7nfm449rbp-nct', name: 'Brock Purdy San Francisco 49ers', brand: 'Nike', category: 'buzos', description: 'Brock Purdy San Francisco 49ers — Big Kids\' Nike NFL Pullover Hoodie. Producto oficial de Nike.com (SKU Z1B7NFM449RBP-NCT).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2c0365be-c1ce-4662-b284-f602f3cca9de/brock-purdy-san-francisco-49ers-big-kids-nike-nfl-pullover-hoodie-dHVo8hy3.png'] },
  { id: 'nike-nike-sportswear-studio-im4947-303', name: 'Nike Sportswear Studio', brand: 'Nike', category: 'buzos', description: 'Nike Sportswear Studio — Big Kids\' (Girls\') Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IM4947-303).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0b7b08a2-e361-4f70-822b-2791c7fd5769/sportswear-studio-big-kids-girls-oversized-crew-neck-sweatshirt-adgPO4bu.png'] },
  { id: 'nike-nike-everyday-elevated-ih8522-906', name: 'Nike Everyday Elevated', brand: 'Nike', category: 'buzos', description: 'Nike Everyday Elevated — Crew Socks (3 Pairs). Producto oficial de Nike.com (SKU IH8522-906).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/93b96758-8b59-4d1a-8155-4060807d7c02/everyday-elevated-crew-socks-3-pairs-OkkGzGQm.png'] },
  { id: 'nike-nike-phoenix-university-of-mississippi-iv9363-120', name: 'Nike Phoenix (University of Mississippi)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (University of Mississippi) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9363-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0ac32c9c-8d26-4d28-a5a2-1ab04488dc6f/phoenix-university-of-mississippi-womens-oversized-crew-neck-sweatshirt-RXvZRfIw.png'] },
  { id: 'nike-nike-phoenix-arkansas-iv9281-120', name: 'Nike Phoenix (Arkansas)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Arkansas) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9281-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7fdc2663-13d4-44bc-934b-3583ce0da384/phoenix-arkansas-womens-oversized-crew-neck-sweatshirt-okBfub56.png'] },
  { id: 'nike-denver-broncos-essentials-club-logo-arch-z1b7nfqqbrc-nbo', name: 'Denver Broncos Essentials Club Logo Arch', brand: 'Nike', category: 'buzos', description: 'Denver Broncos Essentials Club Logo Arch — Big Kids\' Nike NFL Pullover Crew. Producto oficial de Nike.com (SKU Z1B7NFQQBRC-NBO).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e7d90ec4-b4e3-49ad-8967-b4f41782bb06/denver-broncos-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-XdrjwsvO.png'] },
  { id: 'nike-nike-everyday-iv6017-902', name: 'Nike Everyday', brand: 'Nike', category: 'buzos', description: 'Nike Everyday — Kids\' Cushioned Crew Socks (6 Pairs). Producto oficial de Nike.com (SKU IV6017-902).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/cad5a0e1-f711-4cb3-9219-21cfa309da10/everyday-kids-cushioned-crew-socks-6-pairs-igAtWMyf.png'] },
  { id: 'nike-jordan-everyday-elevated-ir6326-901', name: 'Jordan Everyday Elevated', brand: 'Nike', category: 'buzos', description: 'Jordan Everyday Elevated — Crew Socks (6 Pairs). Producto oficial de Nike.com (SKU IR6326-901).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2851e336-1507-409e-b6f4-52ecbfacc41e/jordan-everyday-elevated-crew-socks-6-pairs-aIbOsS5B.png'] },
  { id: 'nike-san-francisco-49ers-rivalries-collection-primary-03ek00a9b-3eu', name: 'San Francisco 49ers Rivalries Collection Primary', brand: 'Nike', category: 'buzos', description: 'San Francisco 49ers Rivalries Collection Primary — Men\'s Nike Dri-FIT NFL Pullover Crew. Producto oficial de Nike.com (SKU 03EK00A9B-3EU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ad9fcb21-c95f-4ef9-8351-797097f48883/san-francisco-49ers-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-lkT9Hznl.png'] },
  { id: 'nike-new-england-patriots-rivalries-collection-primary-03ek4nr8k-3eu', name: 'New England Patriots Rivalries Collection Primary', brand: 'Nike', category: 'buzos', description: 'New England Patriots Rivalries Collection Primary — Men\'s Nike Dri-FIT NFL Pullover Crew. Producto oficial de Nike.com (SKU 03EK4NR8K-3EU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ae44cff0-705f-49ac-918c-12ec5dbbbbb1/new-england-patriots-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-Fbo23Ur5.png'] },
  { id: 'nike-buffalo-bills-rivalries-collection-primary-03ek10a81-3eu', name: 'Buffalo Bills Rivalries Collection Primary', brand: 'Nike', category: 'buzos', description: 'Buffalo Bills Rivalries Collection Primary — Men\'s Nike Dri-FIT NFL Pullover Crew. Producto oficial de Nike.com (SKU 03EK10A81-3EU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/523390a1-558e-404f-b0d9-7b7f9e667a26/buffalo-bills-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-PxxXnQn1.png'] },
  { id: 'nike-los-angeles-rams-rivalries-collection-primary-03ek4fa9x-3eu', name: 'Los Angeles Rams Rivalries Collection Primary', brand: 'Nike', category: 'buzos', description: 'Los Angeles Rams Rivalries Collection Primary — Men\'s Nike Dri-FIT NFL Pullover Crew. Producto oficial de Nike.com (SKU 03EK4FA9X-3EU).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1d3fdc88-f02f-4ae1-8b10-de4099f52196/los-angeles-rams-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-d3UwhlFJ.png'] },
  { id: 'nike-minnesota-vikings-essentials-club-logo-arch-z1b7nfqqvik-nbx', name: 'Minnesota Vikings Essentials Club Logo Arch', brand: 'Nike', category: 'buzos', description: 'Minnesota Vikings Essentials Club Logo Arch — Big Kids\' Nike NFL Pullover Crew. Producto oficial de Nike.com (SKU Z1B7NFQQVIK-NBX).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6f95c782-eaec-4002-b634-ce043e99734b/minnesota-vikings-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-kMZlk53y.png'] },
  { id: 'nike-nike-phoenix-byu-iv9300-120', name: 'Nike Phoenix (BYU)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (BYU) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9300-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7205b2dd-0d85-40e3-be02-25c739bfca28/phoenix-byu-womens-oversized-crew-neck-sweatshirt-0fAK4HEi.png'] },
  { id: 'nike-nike-phoenix-iowa-state-iv9335-120', name: 'Nike Phoenix (Iowa State)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Iowa State) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9335-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7630ee97-b362-4114-8bd1-407c7e703ea9/phoenix-iowa-state-womens-oversized-crew-neck-sweatshirt-uqYc9stJ.png'] },
  { id: 'nike-nike-phoenix-connecticut-iv9408-120', name: 'Nike Phoenix (Connecticut)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Connecticut) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9408-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c2bd5801-7446-435f-a4d3-bbffb15894f9/phoenix-connecticut-womens-oversized-crew-neck-sweatshirt-WeJ3icmO.png'] },
  { id: 'nike-kansas-city-chiefs-essentials-club-logo-arch-z1b7nfqqchi-neb', name: 'Kansas City Chiefs Essentials Club Logo Arch', brand: 'Nike', category: 'buzos', description: 'Kansas City Chiefs Essentials Club Logo Arch — Big Kids\' Nike NFL Pullover Crew. Producto oficial de Nike.com (SKU Z1B7NFQQCHI-NEB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d59b9b69-df33-4d6d-b43f-300e5c3d7779/kansas-city-chiefs-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-bKuyyWAH.png'] },
  { id: 'nike-nike-phoenix-cal-berkeley-iv9306-120', name: 'Nike Phoenix (Cal Berkeley)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Cal Berkeley) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9306-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c2a3c3a8-2578-44b5-9e9e-ddaa673c1fda/phoenix-cal-berkeley-womens-oversized-crew-neck-sweatshirt-3C5JmACK.png'] },
  { id: 'nike-nike-phoenix-oregon-state-iv9377-120', name: 'Nike Phoenix (Oregon State)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Oregon State) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9377-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c3aafcb6-75ce-4dcc-818f-acad7be474c9/phoenix-oregon-state-womens-oversized-crew-neck-sweatshirt-8JWxqQQJ.png'] },
  { id: 'nike-nike-phoenix-air-force-iv9274-120', name: 'Nike Phoenix (Air Force)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Air Force) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9274-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/158cf281-5699-4cff-9e25-1aebfbd98928/phoenix-air-force-womens-oversized-crew-neck-sweatshirt-6HUHIKox.png'] },
  { id: 'nike-nike-phoenix-baylor-iv9294-120', name: 'Nike Phoenix (Baylor)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Baylor) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9294-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/464a61f6-2da3-49bd-a16d-db7739048bad/phoenix-baylor-womens-oversized-crew-neck-sweatshirt-d3dtp38H.png'] },
  { id: 'nike-nike-phoenix-missouri-iv9357-120', name: 'Nike Phoenix (Missouri)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Missouri) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9357-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/123c6137-5bc8-4868-9ffe-d9ac8ec8d98b/phoenix-missouri-womens-oversized-crew-neck-sweatshirt-DINZTlmb.png'] },
  { id: 'nike-nike-phoenix-tcu-iv9402-120', name: 'Nike Phoenix (TCU)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (TCU) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9402-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/357f9322-0da2-41da-8f4e-6f335aa992fd/phoenix-tcu-womens-oversized-crew-neck-sweatshirt-NTigH91X.png'] },
  { id: 'nike-detroit-lions-essentials-club-logo-arch-z1b7nfqqlio-neg', name: 'Detroit Lions Essentials Club Logo Arch', brand: 'Nike', category: 'buzos', description: 'Detroit Lions Essentials Club Logo Arch — Big Kids\' Nike NFL Pullover Crew. Producto oficial de Nike.com (SKU Z1B7NFQQLIO-NEG).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/008a39f3-3ad8-4bb4-b3dd-062026aac99d/detroit-lions-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-925GKdFu.png'] },
  { id: 'nike-nike-phoenix-boise-state-iv9320-120', name: 'Nike Phoenix (Boise State)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Boise State) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9320-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31578d95-a732-4919-99fb-30ffe371617a/phoenix-boise-state-womens-oversized-crew-neck-sweatshirt-1eQ5oV6n.png'] },
  { id: 'nike-pittsburgh-steelers-essentials-club-logo-arch-z1b7nfqqste-naw', name: 'Pittsburgh Steelers Essentials Club Logo Arch', brand: 'Nike', category: 'buzos', description: 'Pittsburgh Steelers Essentials Club Logo Arch — Big Kids\' Nike NFL Pullover Crew. Producto oficial de Nike.com (SKU Z1B7NFQQSTE-NAW).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4dbd90f7-2efa-4fd2-b8af-530ab11c40e4/pittsburgh-steelers-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-Pls3tdVx.png'] },
  { id: 'nike-nike-phoenix-colorado-iv9313-120', name: 'Nike Phoenix (Colorado)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Colorado) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9313-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b641be01-640d-407f-9fcc-c3c2215e9553/phoenix-colorado-womens-oversized-crew-neck-sweatshirt-syZesBry.png'] },
  { id: 'nike-nike-phoenix-washington-state-iv9434-120', name: 'Nike Phoenix (Washington State)', brand: 'Nike', category: 'buzos', description: 'Nike Phoenix (Washington State) — Women\'s Oversized Crew-Neck Sweatshirt. Producto oficial de Nike.com (SKU IV9434-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1b864ee7-3717-4869-88b1-0501693d712c/phoenix-washington-state-womens-oversized-crew-neck-sweatshirt-9NKTAnaQ.png'] },
  { id: 'nike-golden-state-warriors-standard-issue-ii6283-063', name: 'Golden State Warriors Standard Issue', brand: 'Nike', category: 'buzos', description: 'Golden State Warriors Standard Issue — Men\'s Fleece Crew. Producto oficial de Nike.com (SKU II6283-063).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4f759a6b-be44-4602-b905-92b4f7ed030c/golden-state-warriors-standard-issue-mens-fleece-crew-6dBx6em5.png'] },
  { id: 'nike-nike-sportswear-essential-fz5559-621', name: 'Nike Sportswear Essential', brand: 'Nike', category: 'remeras', description: 'Nike Sportswear Essential — Big Kids\' (Girls\') T-Shirt. Producto oficial de Nike.com (SKU FZ5559-621).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fcbdb702-0243-44b0-bfb2-9ff0be366b82/sportswear-essential-big-kids-girls-t-shirt-vN0mzG.png'] },
  { id: 'nike-nike-dri-fit-legend-dx0989-480', name: 'Nike Dri-FIT Legend', brand: 'Nike', category: 'remeras', description: 'Nike Dri-FIT Legend — Men\'s Fitness T-Shirt. Producto oficial de Nike.com (SKU DX0989-480).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9f26eb6c-d71c-4896-8602-e82088714d69/dri-fit-legend-mens-fitness-t-shirt-JmKL0d.png'] },
  { id: 'nike-nike-sportswear-ix2080-100', name: 'Nike Sportswear', brand: 'Nike', category: 'remeras', description: 'Nike Sportswear — Men\'s Loose T-Shirt. Producto oficial de Nike.com (SKU IX2080-100).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3b4e1c18-c8e8-4346-942d-0b6388a7d61d/sportswear-mens-loose-t-shirt-7FvgEywO.png'] },
  { id: 'nike-nike-sportswear-ix2080-010', name: 'Nike Sportswear', brand: 'Nike', category: 'remeras', description: 'Nike Sportswear — Men\'s Loose T-Shirt. Producto oficial de Nike.com (SKU IX2080-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1387acd6-f70d-4f4c-a834-5e215b09245b/sportswear-mens-loose-t-shirt-7FvgEywO.png'] },
  { id: 'nike-nike-n-a-c-im6142-010', name: 'Nike N.A.C.', brand: 'Nike', category: 'remeras', description: 'Nike N.A.C. — Men\'s T-Shirt. Producto oficial de Nike.com (SKU IM6142-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b031910b-c5c8-4451-a993-a68e49fec8f5/nac-mens-t-shirt-Jip0AFEl.png'] },
  { id: 'nike-nike-college-ole-miss-iv9364-120', name: 'Nike College (Ole Miss', brand: 'Nike', category: 'remeras', description: 'Nike College (Ole Miss — Women\'s Ringer T-Shirt. Producto oficial de Nike.com (SKU IV9364-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1e07a901-b604-4eeb-91a1-ca2516fe82fe/college-ole-miss-womens-ringer-t-shirt-Wqts3Og3.png'] },
  { id: 'nike-jordan-brooklyn-x-howard-university-ir0220-419', name: 'Jordan Brooklyn x Howard University', brand: 'Nike', category: 'remeras', description: 'Jordan Brooklyn x Howard University — Women\'s Graphic Girlfriend T-Shirt. Producto oficial de Nike.com (SKU IR0220-419).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/107e49d2-b10c-4a90-9f09-4e63748f038a/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0.png'] },
  { id: 'nike-jordan-brooklyn-x-howard-university-ir0220-223', name: 'Jordan Brooklyn x Howard University', brand: 'Nike', category: 'remeras', description: 'Jordan Brooklyn x Howard University — Women\'s Graphic Girlfriend T-Shirt. Producto oficial de Nike.com (SKU IR0220-223).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ce5cc23a-b326-45ef-89a1-bf12e61c1f53/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0.png'] },
  { id: 'nike-jordan-flight-x-howard-university-iu5887-133', name: 'Jordan Flight x Howard University', brand: 'Nike', category: 'remeras', description: 'Jordan Flight x Howard University — Men\'s Oversized Basketball T-Shirt. Producto oficial de Nike.com (SKU IU5887-133).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/cfc5dee8-3ac1-428d-8a08-763d34a9be46/jordan-flight-x-howard-university-mens-oversized-basketball-t-shirt-1N0l7xqz.png'] },
  { id: 'nike-nike-college-arkansas-iv9282-120', name: 'Nike College (Arkansas', brand: 'Nike', category: 'remeras', description: 'Nike College (Arkansas — Women\'s Ringer T-Shirt. Producto oficial de Nike.com (SKU IV9282-120).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/99009e70-a0cb-4733-8b89-f77728c8a7d0/college-arkansas-womens-ringer-t-shirt-QlmFBsJH.png'] },
  { id: 'nike-anthony-edwards-minnesota-timberwolves-statement-edition-7hdc4f26tim05-naw', name: 'Anthony Edwards Minnesota Timberwolves Statement Edition', brand: 'Nike', category: 'remeras', description: 'Anthony Edwards Minnesota Timberwolves Statement Edition — Big Kids\' NBA T-Shirt. Producto oficial de Nike.com (SKU 7HDC4F26TIM05-NAW).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b8842b6c-2f09-449a-b43e-e5b3648d5d62/anthony-edwards-minnesota-timberwolves-statement-edition-big-kids-nba-t-shirt-8Qdl7Teg.png'] },
  { id: 'nike-san-francisco-49ers-essential-z1b7nfqk49r-nct', name: 'San Francisco 49ers Essential', brand: 'Nike', category: 'remeras', description: 'San Francisco 49ers Essential — Men\'s Nike NFL T-Shirt. Producto oficial de Nike.com (SKU Z1B7NFQK49R-NCT).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1acd040a-f114-4592-82c8-28ca5fc65186/san-francisco-49ers-essential-mens-nike-nfl-t-shirt-XoMf1o91.png'] },
  { id: 'nike-san-antonio-spurs-7hdc4s26spuvw-ney', name: 'San Antonio Spurs', brand: 'Nike', category: 'remeras', description: 'San Antonio Spurs — Big Kids\' Nike T-Shirt. Producto oficial de Nike.com (SKU 7HDC4S26SPUVW-NEY).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3debacb2-8eee-4583-9c5c-287db55c8da8/san-antonio-spurs-big-kids-nike-t-shirt-NT2twURO.png'] },
  { id: 'nike-nike-sportswear-bts-jf1696-010', name: 'Nike Sportswear "BTS"', brand: 'Nike', category: 'remeras', description: 'Nike Sportswear "BTS" — Women\'s T-Shirt. Producto oficial de Nike.com (SKU JF1696-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/287deb8e-598e-4a40-8da1-c09e25532e81/sportswear-bts-womens-t-shirt-SGpLCSpY.png'] },
  { id: 'nike-nike-sportswear-bts-ja8523-100', name: 'Nike Sportswear "BTS"', brand: 'Nike', category: 'remeras', description: 'Nike Sportswear "BTS" — Men\'s T-Shirt. Producto oficial de Nike.com (SKU JA8523-100).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/31a932e1-e160-4511-a166-7fc7e15e36c2/sportswear-bts-mens-t-shirt-b2jA91CK.png'] },
  { id: 'nike-sabrina-x-slam-ix5437-072', name: 'Sabrina x SLAM', brand: 'Nike', category: 'remeras', description: 'Sabrina x SLAM — Nike Basketball T-Shirt. Producto oficial de Nike.com (SKU IX5437-072).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4271439c-abfb-429e-a0eb-df7ccba5d609/sabrina-x-slam-nike-basketball-t-shirt-8E3Y57l6.png'] },
  { id: 'nike-kobe-iv5115-010', name: 'Kobe', brand: 'Nike', category: 'remeras', description: 'Kobe — Kids\' Dri-FIT T-Shirt. Producto oficial de Nike.com (SKU IV5115-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/955cef49-52a1-45f2-a3b8-c901dc0ec770/kobe-kids-dri-fit-t-shirt-cbGkej3M.png'] },
  { id: 'nike-kobe-iv5115-063', name: 'Kobe', brand: 'Nike', category: 'remeras', description: 'Kobe — Kids\' Dri-FIT Basketball T-Shirt. Producto oficial de Nike.com (SKU IV5115-063).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/822fc76f-ef46-4623-b2ca-850d5717bd2b/kobe-kids-dri-fit-basketball-t-shirt-cbGkej3M.png'] },
  { id: 'nike-jordan-brooklyn-io0017-133', name: 'Jordan Brooklyn', brand: 'Nike', category: 'remeras', description: 'Jordan Brooklyn — Men\'s T-Shirt. Producto oficial de Nike.com (SKU IO0017-133).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/53525c60-7206-428f-a2a0-a3e82cbd141f/jordan-brooklyn-mens-t-shirt-HdwqvWoC.png'] },
  { id: 'nike-usc-2026-military-appreciation-03kq2eascj-wyj', name: 'USC 2026 Military Appreciation', brand: 'Nike', category: 'remeras', description: 'USC 2026 Military Appreciation — Women\'s Nike Dri-FIT College T-Shirt. Producto oficial de Nike.com (SKU 03KQ2EASCJ-WYJ).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a28de479-614f-47a3-9a29-7ace2dd758b0/usc-2026-military-appreciation-womens-nike-dri-fit-college-t-shirt-uyUK91XU.png'] },
  { id: 'nike-nike-sportswear-86n074-023', name: 'Nike Sportswear', brand: 'Nike', category: 'camperas', description: 'Nike Sportswear — Little Kids\' All Day Play Puffer Jacket. Producto oficial de Nike.com (SKU 86N074-023).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9104cbc4-760e-4858-8a14-ed466eb3257a/sportswear-little-kids-all-day-play-puffer-jacket-5HYlIGhj.png'] },
  { id: 'nike-nike-tech-if1345-451', name: 'Nike Tech', brand: 'Nike', category: 'camperas', description: 'Nike Tech — Men\'s Shori Knit Full-Zip Windrunner Jacket. Producto oficial de Nike.com (SKU IF1345-451).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/eb2a15fa-28e5-49b4-a5c7-5e9824908640/tech-mens-shori-knit-full-zip-windrunner-jacket-YgtcRkkR.png'] },
  { id: 'nike-jordan-flight-x-howard-university-iu5510-419', name: 'Jordan Flight x Howard University', brand: 'Nike', category: 'camperas', description: 'Jordan Flight x Howard University — Men\'s Varsity Jacket. Producto oficial de Nike.com (SKU IU5510-419).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/74d83002-97e5-43ea-93db-79ba52261fc3/jordan-flight-x-howard-university-mens-varsity-jacket-Sy7VmxoI.png'] },
  { id: 'nike-nike-one-io1048-010', name: 'Nike One', brand: 'Nike', category: 'camperas', description: 'Nike One — Women\'s Therma-FIT Fleece Bomber Jacket. Producto oficial de Nike.com (SKU IO1048-010).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/af64a163-2b64-4001-8351-975f3210d882/one-womens-therma-fit-fleece-bomber-jacket-nZw5S10E.png'] },
  { id: 'nike-nike-76p023-782', name: 'Nike', brand: 'Nike', category: 'camperas', description: 'Nike — Toddler Colorblocked Hoodless Jacket. Producto oficial de Nike.com (SKU 76P023-782).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5bded7c5-ccdd-4ef1-bce0-1ee1f7642df2/toddler-colorblocked-hoodless-jacket-2CQX4MAD.png'] },
  { id: 'nike-seattle-seahawks-rivalries-collection-sideline-anorak-03at00df78-mdb', name: 'Seattle Seahawks Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'Seattle Seahawks Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT00DF78-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/947190fe-d498-4aa8-8ef7-112d0c01eb70/seattle-seahawks-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-vdczn3ZG.png'] },
  { id: 'nike-san-francisco-49ers-rivalries-collection-sideline-anorak-03at912z9b-mdb', name: 'San Francisco 49ers Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'San Francisco 49ers Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT912Z9B-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/662202e4-39a4-4fc5-b75e-796bdb8b4357/san-francisco-49ers-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-XcmnUIvw.png'] },
  { id: 'nike-new-england-patriots-rivalries-collection-sideline-03au0g9m8k-j63', name: 'New England Patriots Rivalries Collection Sideline', brand: 'Nike', category: 'camperas', description: 'New England Patriots Rivalries Collection Sideline — Men\'s Nike NFL Full-Zip Bomber Jacket. Producto oficial de Nike.com (SKU 03AU0G9M8K-J63).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2aa3e085-a848-431f-8822-80e697a5d39b/new-england-patriots-rivalries-collection-sideline-mens-nike-nfl-full-zip-bomber-jacket-4lQrwfBH.png'] },
  { id: 'nike-new-england-patriots-rivalries-collection-sideline-anorak-03at0g9m8k-9rs', name: 'New England Patriots Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'New England Patriots Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT0G9M8K-9RS).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/22fc13cc-9a5b-4dcd-abb2-4532bb75f2ea/new-england-patriots-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-tQRzyCEh.png'] },
  { id: 'nike-miami-dolphins-rivalries-collection-sideline-anorak-03at0gki9p-mdb', name: 'Miami Dolphins Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'Miami Dolphins Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT0GKI9P-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2827d631-4d89-402b-b4f4-e1bbb2867d82/miami-dolphins-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-FhidJta9.png'] },
  { id: 'nike-los-angeles-rams-rivalries-collection-sideline-anorak-03at0l169x-mdb', name: 'Los Angeles Rams Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'Los Angeles Rams Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT0L169X-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e517bf74-0d2f-4220-843a-38249cbf66c7/los-angeles-rams-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-ecxedQmV.png'] },
  { id: 'nike-acg-essentials-9wca64-r35', name: 'ACG Essentials', brand: 'Nike', category: 'camperas', description: 'ACG Essentials — Big Kids\' Rain Jacket. Producto oficial de Nike.com (SKU 9WCA64-R35).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f39a2185-7a30-4418-b7bb-072a7279a3ee/acg-essentials-big-kids-rain-jacket-IXNoOVFk.png'] },
  { id: 'nike-acg-essentials-9wca64-023', name: 'ACG Essentials', brand: 'Nike', category: 'camperas', description: 'ACG Essentials — Big Kids\' Rain Jacket. Producto oficial de Nike.com (SKU 9WCA64-023).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9885feed-f204-4f5c-a61b-f99fa89431dc/acg-essentials-big-kids-rain-jacket-IXNoOVFk.png'] },
  { id: 'nike-arizona-cardinals-rivalries-collection-sideline-anorak-03at03e99c-mdb', name: 'Arizona Cardinals Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'Arizona Cardinals Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT03E99C-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6123dcea-6ca5-4b8c-9e99-93f9b558d444/arizona-cardinals-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-RbRmax5p.png'] },
  { id: 'nike-buffalo-bills-rivalries-collection-sideline-anorak-03at11qr81-mdb', name: 'Buffalo Bills Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'Buffalo Bills Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT11QR81-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e805df2f-e791-47f9-9db4-82fe51aedbc4/buffalo-bills-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-9dSqFia5.png'] },
  { id: 'nike-new-york-jets-rivalries-collection-sideline-anorak-03at0g9o72-mdb', name: 'New York Jets Rivalries Collection Sideline Anorak', brand: 'Nike', category: 'camperas', description: 'New York Jets Rivalries Collection Sideline Anorak — Men\'s Nike NFL 1/2-Zip Hooded Jacket. Producto oficial de Nike.com (SKU 03AT0G9O72-MDB).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/51b82db3-7165-4b28-82fe-643dc6fc3d79/new-york-jets-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-dYc2NA3w.png'] },

  // ===== Nike — datos verificados desde Nike.com (US) =====
  { id: 'nike-nike-dunk-low-suede-io4244-102', name: 'Nike Dunk Low Suede', brand: 'Nike', category: 'zapatillas', description: 'Nike Dunk Low Suede — Women\'s Shoes. Producto oficial de Nike.com (SKU IO4244-102).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6d8034a9-f71e-4a4b-b6c6-87ce86508636/dunk-low-suede-womens-shoes-HkzujqYZ.png'] },
  { id: 'nike-nike-precision-8-low-ih1104-001', name: 'Nike Precision 8 Low', brand: 'Nike', category: 'zapatillas', description: 'Nike Precision 8 Low — Men\'s Basketball Shoes. Producto oficial de Nike.com (SKU IH1104-001).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1d5d7825-5074-4eaa-a0a3-46eb499b435e/precision-8-low-mens-basketball-shoes-QaX6zVIf.png'] },
  { id: 'nike-nike-diamond-gamer-mcs-ii7346-401', name: 'Nike Diamond Gamer MCS', brand: 'Nike', category: 'zapatillas', description: 'Nike Diamond Gamer MCS — Baseball Shoes. Producto oficial de Nike.com (SKU II7346-401).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f42f3159-d827-41fa-9f2f-21952216c3bb/diamond-gamer-mcs-baseball-shoes-aSIXJYWr.png'] },
  { id: 'nike-nike-dunk-low-fb9108-104', name: 'Nike Dunk Low', brand: 'Nike', category: 'zapatillas', description: 'Nike Dunk Low — Little Kids\' Shoes. Producto oficial de Nike.com (SKU FB9108-104).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/322ce234-b667-4471-8d9c-f4a39c645690/dunk-low-little-kids-shoes-C6spohtb.png'] },
  { id: 'nike-jordan-1-low-alt-dr9748-405', name: 'Jordan 1 Low Alt', brand: 'Nike', category: 'zapatillas', description: 'Jordan 1 Low Alt — Little Kids\' Shoes. Producto oficial de Nike.com (SKU DR9748-405).', images: ['https://static.nike.com/a/images/t_default/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9c99529b-c576-47e0-abcb-d1bb77caa79c/jordan-1-low-alt-little-kids-shoes-w9HO9jOz.png'] },
  { id: 'nike-nike-free-ride-io1642-510', name: 'Nike Free Ride', brand: 'Nike', category: 'zapatillas', description: 'Nike Free Ride — Big Kids\' Running Shoes. Producto oficial de Nike.com (SKU IO1642-510).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6a34121c-ed81-4e76-80e0-0f22290b88df/free-ride-big-kids-running-shoes-mNjnRIhi.png'] },
  { id: 'nike-nike-cortez-textile-dz2795-610', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Women\'s Shoes. Producto oficial de Nike.com (SKU DZ2795-610).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/93432909-2a7a-4bc8-a9d4-ffdc23e2843d/cortez-textile-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-cortez-ib1857-204', name: 'Nike Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez — Women\'s Shoes. Producto oficial de Nike.com (SKU IB1857-204).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fd538d59-f042-415a-8c3a-2583a1b73a9a/cortez-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-cortez-textile-dz2795-401', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Women\'s Shoes. Producto oficial de Nike.com (SKU DZ2795-401).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a73adc66-c005-4652-91e2-3e2d2b0eb46a/cortez-textile-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-cortez-leather-dn1791-602', name: 'Nike Cortez Leather', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Leather — Women\'s Shoes. Producto oficial de Nike.com (SKU DN1791-602).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0f22f009-e057-4d4e-86b0-b212035f9e70/cortez-leather-womens-shoes-tZtTd5.png'] },
  { id: 'nike-nike-cortez-leather-dm4044-401', name: 'Nike Cortez Leather', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Leather — Men\'s Shoes. Producto oficial de Nike.com (SKU DM4044-401).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/87c8ed51-b183-4e4f-8195-9d26a475137e/cortez-leather-mens-shoes-SxhPXX.png'] },
  { id: 'nike-nike-cortez-textile-dz2795-204', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Women\'s Shoes. Producto oficial de Nike.com (SKU DZ2795-204).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/80becc46-38c8-48a7-830e-6688f3915e0f/cortez-textile-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-cortez-ir0042-001', name: 'Nike Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez — Women\'s Shoes. Producto oficial de Nike.com (SKU IR0042-001).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/08b12605-c897-4c3b-bafe-140d2c3a2cb0/cortez-womens-shoes-TzPVwgM0.png'] },
  { id: 'nike-nike-cortez-ir0042-900', name: 'Nike Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez — Women\'s Shoes. Producto oficial de Nike.com (SKU IR0042-900).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8e1b60d4-66c2-4d78-adbf-31d1a2b2c9b1/cortez-womens-shoes-TzPVwgM0.png'] },
  { id: 'nike-nike-cortez-textile-dz2795-304', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Women\'s Shoes. Producto oficial de Nike.com (SKU DZ2795-304).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7cf6480a-546d-451b-b3af-198c04b7b4e4/cortez-textile-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-cortez-leather-dn1791-118', name: 'Nike Cortez Leather', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Leather — Women\'s Shoes. Producto oficial de Nike.com (SKU DN1791-118).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9ff9ad45-a681-42e3-b8a3-a5a8ea458027/cortez-leather-womens-shoes-tZtTd5.png'] },
  { id: 'nike-nike-cortez-ib1857-202', name: 'Nike Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez — Women\'s Shoes. Producto oficial de Nike.com (SKU IB1857-202).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bba8c3cb-cbf1-459d-be49-d1aa81c1cfd5/cortez-womens-shoes-BzFUQybc.png'] },
  { id: 'nike-nike-cortez-ib1857-301', name: 'Nike Cortez', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez — Women\'s Shoes. Producto oficial de Nike.com (SKU IB1857-301).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0c61ca02-573d-4dbc-b52f-70b96323d358/cortez-womens-shoes-BzFUQybc.png'] },
  { id: 'nike-nike-cortez-textile-hf0263-201', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Men\'s Shoes. Producto oficial de Nike.com (SKU HF0263-201).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f7a4f022-bddd-4033-9658-1520e559a5e7/cortez-textile-mens-shoes-Tlm9kW.png'] },
  { id: 'nike-nike-cortez-textile-dz2795-407', name: 'Nike Cortez Textile', brand: 'Nike', category: 'zapatillas', description: 'Nike Cortez Textile — Women\'s Shoes. Producto oficial de Nike.com (SKU DZ2795-407).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1b9435a1-470c-4029-806f-ec9bbe6d7eb9/cortez-textile-womens-shoes-cTpskF.png'] },
  { id: 'nike-nike-sb-zoom-blazer-mid-io0667-400', name: 'Nike SB Zoom Blazer Mid', brand: 'Nike', category: 'zapatillas', description: 'Nike SB Zoom Blazer Mid — Skate Shoes. Producto oficial de Nike.com (SKU IO0667-400).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d50ef7d6-24cf-477d-aa27-b0211f074a87/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ.png'] },
  { id: 'nike-nike-blazer-low-x-book-hq2054-800', name: 'Nike Blazer Low x Book', brand: 'Nike', category: 'zapatillas', description: 'Nike Blazer Low x Book — Men\'s Shoes. Producto oficial de Nike.com (SKU HQ2054-800).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/59325403-f408-4cba-b7ef-c6191c9e44fa/blazer-low-x-book-mens-shoes-NyfV3BtD.png'] },
  { id: 'nike-nike-blazer-low-x-book-hq2054-801', name: 'Nike Blazer Low x Book', brand: 'Nike', category: 'zapatillas', description: 'Nike Blazer Low x Book — Men\'s Shoes. Producto oficial de Nike.com (SKU HQ2054-801).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e975a8de-f245-4260-b7d7-8b83606210f0/blazer-low-x-book-mens-shoes-NyfV3BtD.png'] },
  { id: 'nike-nike-blazer-low-x-book-hq2054-001', name: 'Nike Blazer Low x Book', brand: 'Nike', category: 'zapatillas', description: 'Nike Blazer Low x Book — Men\'s Shoes. Producto oficial de Nike.com (SKU HQ2054-001).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/509332cc-7e9d-4459-9de6-1619e77080d1/blazer-low-x-book-mens-shoes-NyfV3BtD.png'] },
  { id: 'nike-nike-blazer-low-x-book-hq2054-400', name: 'Nike Blazer Low x Book', brand: 'Nike', category: 'zapatillas', description: 'Nike Blazer Low x Book — Men\'s Shoes. Producto oficial de Nike.com (SKU HQ2054-400).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/dd577687-126b-49e6-bb95-6ce862bbc6e3/blazer-low-x-book-mens-shoes-NyfV3BtD.png'] },
  { id: 'nike-nike-sb-zoom-blazer-mid-fd0731-201', name: 'Nike SB Zoom Blazer Mid', brand: 'Nike', category: 'zapatillas', description: 'Nike SB Zoom Blazer Mid — Skate Shoes. Producto oficial de Nike.com (SKU FD0731-201).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6629debf-0b23-432a-9c9d-7f3d70b4157b/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ.png'] },
  { id: 'nike-nike-sb-zoom-blazer-mid-fd0731-601', name: 'Nike SB Zoom Blazer Mid', brand: 'Nike', category: 'zapatillas', description: 'Nike SB Zoom Blazer Mid — Skate Shoes. Producto oficial de Nike.com (SKU FD0731-601).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4955a250-3f9e-4971-b679-2412de5e7f94/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ.png'] },
  { id: 'nike-nike-vomero-premium-ir2168-003', name: 'Nike Vomero Premium', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero Premium — Men\'s Road Running Shoes. Producto oficial de Nike.com (SKU IR2168-003).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6fba97f8-aa5a-4821-8dd7-a22907e6ed8d/vomero-premium-mens-road-running-shoes-OBJtZHVp.png'] },
  { id: 'nike-nike-vomero-plus-iv4522-200', name: 'Nike Vomero Plus', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero Plus — Men\'s Shoes. Producto oficial de Nike.com (SKU IV4522-200).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5308dd1a-67e4-483a-aea9-4dad7acf1a43/vomero-plus-mens-shoes-cdYA0SoI.png'] },
  { id: 'nike-nike-vomero-5-ix3926-060', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Little Kids\' Shoes. Producto oficial de Nike.com (SKU IX3926-060).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8610108a-9da0-4c40-8f0b-4eb912883ed5/vomero-5-little-kids-shoes-SKhO5HIO.png'] },
  { id: 'nike-nike-zoom-vomero-5-iv5738-133', name: 'Nike Zoom Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Zoom Vomero 5 — Women\'s Shoes. Producto oficial de Nike.com (SKU IV5738-133).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1f972d9d-fef9-450a-8e35-ab82541bf95e/zoom-vomero-5-womens-shoes-81TPKW.png'] },
  { id: 'nike-nike-vomero-18-iv5666-097', name: 'Nike Vomero 18', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 18 — Men\'s Road Running Shoes. Producto oficial de Nike.com (SKU IV5666-097).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/37fa419f-cc09-4389-9a47-13f409a9e8a8/vomero-18-mens-road-running-shoes-NzWnvcC8.png'] },
  { id: 'nike-nike-vomero-5-ix3919-060', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Big Kids\' Shoes. Producto oficial de Nike.com (SKU IX3919-060).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5b052441-6702-4477-ae23-c59a08ef9fdd/vomero-5-big-kids-shoes-SKhO5HIO.png'] },
  { id: 'nike-nike-vomero-5-iv4687-045', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Big Kids\' Shoes. Producto oficial de Nike.com (SKU IV4687-045).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/014a313b-704d-43a8-bc3f-efb598ede7bc/vomero-5-big-kids-shoes-SKhO5HIO.png'] },
  { id: 'nike-nike-vomero-plus-hv8150-109', name: 'Nike Vomero Plus', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero Plus — Men\'s Road Running Shoes. Producto oficial de Nike.com (SKU HV8150-109).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/30fd3343-b5c3-4473-bae0-86aeccb4aef7/vomero-plus-mens-road-running-shoes-5npsVBwT.png'] },
  { id: 'nike-nike-vomero-5-ib4698-411', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Big Kids\' Shoes. Producto oficial de Nike.com (SKU IB4698-411).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/43e839fe-3b13-49a3-9f14-30f99a6c3ab4/vomero-5-big-kids-shoes-v85L8u7n.png'] },
  { id: 'nike-nike-vomero-5-iv2595-133', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Little Kids\' Shoes (Classic laces). Producto oficial de Nike.com (SKU IV2595-133).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/74362a31-cc89-410c-897c-4a0883385a83/vomero-5-little-kids-shoes-classic-laces-SKhO5HIO.png'] },
  { id: 'nike-nike-vomero-18-hq2157-701', name: 'Nike Vomero 18', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 18 — Big Kids\' Road Running Shoes. Producto oficial de Nike.com (SKU HQ2157-701).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/82f2bc09-4437-466c-8240-3c0ff404b0e1/vomero-18-big-kids-road-running-shoes-Dldj35Yd.png'] },
  { id: 'nike-nike-vomero-5-hf7000-600', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Baby/Toddler Shoes. Producto oficial de Nike.com (SKU HF7000-600).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9c599dc8-eee4-45e6-a56c-f8e6eceae33f/vomero-5-baby-toddler-shoes-SKhO5HIO.png'] },
  { id: 'nike-nike-vomero-18-hq2157-007', name: 'Nike Vomero 18', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 18 — Big Kids\' Road Running Shoes. Producto oficial de Nike.com (SKU HQ2157-007).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/737bfd16-82de-4a8a-8de4-9b86e049630c/vomero-18-big-kids-road-running-shoes-Dldj35Yd.png'] },
  { id: 'nike-nike-vomero-5-hf6999-008', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Little Kids\' Shoes with Reflective Accents. Producto oficial de Nike.com (SKU HF6999-008).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b0a9b518-02a2-43f1-8e88-a71be119b371/vomero-5-little-kids-shoes-with-reflective-accents-SKhO5HIO.png'] },
  { id: 'nike-nike-vomero-5-hf7000-009', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Baby/Toddler Shoes. Producto oficial de Nike.com (SKU HF7000-009).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/75e7a001-4c31-43ab-aa14-b51fcf78b0a5/vomero-5-baby-toddler-shoes-v85L8u7n.png'] },
  { id: 'nike-nike-vomero-5-hf6999-004', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Little Kids\' Shoes with Reflective Accents. Producto oficial de Nike.com (SKU HF6999-004).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/046708e0-2a85-49f4-b452-d963ff7a1c81/vomero-5-little-kids-shoes-with-reflective-accents-v85L8u7n.png'] },
  { id: 'nike-nike-vomero-5-hv5171-121', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Big Kids\' Shoes. Producto oficial de Nike.com (SKU HV5171-121).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8f0f01a1-e9ff-4cc9-b55b-63c02196efcd/vomero-5-big-kids-shoes-v85L8u7n.png'] },
  { id: 'nike-nike-vomero-5-hf7000-105', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Baby/Toddler Shoes. Producto oficial de Nike.com (SKU HF7000-105).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7bc6aed5-89e4-41dc-b080-b95e213c0f6e/vomero-5-baby-toddler-shoes-v85L8u7n.png'] },
  { id: 'nike-nike-vomero-18-hq2157-012', name: 'Nike Vomero 18', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 18 — Big Kids\' Road Running Shoes. Producto oficial de Nike.com (SKU HQ2157-012).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd933b79-2bdf-4557-8e39-44ad5d766a3a/vomero-18-big-kids-road-running-shoes-Dldj35Yd.png'] },
  { id: 'nike-nike-vomero-5-hf7000-111', name: 'Nike Vomero 5', brand: 'Nike', category: 'zapatillas', description: 'Nike Vomero 5 — Baby/Toddler Shoes. Producto oficial de Nike.com (SKU HF7000-111).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c3fa6d93-a6e7-4346-b43b-d38a52504a08/vomero-5-baby-toddler-shoes-SKhO5HIO.png'] },
  { id: 'nike-nike-sportswear-windrunner-if2821-084', name: 'Nike Sportswear Windrunner', brand: 'Nike', category: 'camperas', description: 'Nike Sportswear Windrunner — Big Kids\' Hooded Repel Jacket. Producto oficial de Nike.com (SKU IF2821-084).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/565f2788-70fe-4c48-b0ed-918f2ab730af/sportswear-windrunner-big-kids-hooded-repel-jacket-fUNjyLas.png'] },
  { id: 'nike-nike-miler-if2082-410', name: 'Nike Miler', brand: 'Nike', category: 'remeras', description: 'Nike Miler — Men\'s Dri-FIT Short-Sleeve Running Top. Producto oficial de Nike.com (SKU IF2082-410).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/44906126-5e57-446d-a77f-999502b5e629/miler-mens-dri-fit-short-sleeve-running-top-W7gjEunO.png'] },
  { id: 'nike-nike-miler-if2018-410', name: 'Nike Miler', brand: 'Nike', category: 'remeras', description: 'Nike Miler — Men\'s Dri-FIT Running Tank Top. Producto oficial de Nike.com (SKU IF2018-410).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/dd9731ab-5c61-448f-b27a-ee853da8b351/miler-mens-dri-fit-running-tank-top-sTQ1tmLA.png'] },
  { id: 'nike-jannik-sinner-iz2725-100', name: 'Jannik Sinner', brand: 'Nike', category: 'remeras', description: 'Jannik Sinner — Men\'s NikeCourt Dri-FIT Graphic Tennis T-Shirt. Producto oficial de Nike.com (SKU IZ2725-100).', images: ['https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/12d0d9de-8c2b-49e0-bd3a-18c224467821/jannik-sinner-mens-nikecourt-dri-fit-graphic-tennis-t-shirt-WbhXN8Y0.png'] },

  // ======================== ZAPATILLAS ========================
  { id: 'adidas-stan-smith', name: 'Stan Smith', brand: 'Adidas', category: 'zapatillas', description: 'Adidas Stan Smith, el clásico minimalista de tenis.', images: ['https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg'] },
  { id: 'converse-chuck-70', name: 'Chuck 70 Hi', brand: 'Converse', category: 'zapatillas', description: 'Converse Chuck 70, el ícono del streetwear.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4fa12e17/images/a_107/162050C_A_107X1.jpg'] },
  { id: 'converse-chuck-taylor', name: 'Chuck Taylor All Star', brand: 'Converse', category: 'zapatillas', description: 'La zapatilla más icónica de todos los tiempos.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw0a451821/images/a_107/M9160_A_107X1.jpg'] },
  { id: 'converse-one-star', name: 'One Star Pro', brand: 'Converse', category: 'zapatillas', description: 'Converse One Star Pro, diseño limpio de skate con estrella lateral.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7b917487/images/a_107/171327C_A_107X1.jpg'] },
  { id: 'vans-old-skool', name: 'Old Skool', brand: 'Vans', category: 'zapatillas', description: 'Vans Old Skool, la zapatilla clásica de skate.', images: ['https://images.vans.com/is/image/VansBrand/VN000D3HY28-HERO?wid=800'] },
  { id: 'vans-sk8-hi', name: 'Sk8-Hi', brand: 'Vans', category: 'zapatillas', description: 'Vans Sk8-Hi, la bota alta clásica del skate.', images: ['https://images.vans.com/is/image/VansBrand/VN000D5IB8C-HERO?wid=800'] },
  { id: 'vans-authentic', name: 'Authentic', brand: 'Vans', category: 'zapatillas', description: 'Vans Authentic, la zapatilla original de la marca desde 1966.', images: ['https://images.vans.com/is/image/VansBrand/VN000EE3BLK-HERO?wid=800'] },
  { id: 'vans-era', name: 'Era', brand: 'Vans', category: 'zapatillas', description: 'Vans Era, diseñada por skaters profesionales para máximo control.', images: ['https://images.vans.com/is/image/VansBrand/VN000EWZBLK-HERO?wid=800'] },
  { id: 'new-balance-574', name: '574 Classic', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 574, retro-running más popular.', images: ['https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'new-balance-990v6', name: '990v6', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 990v6, la zapatilla premium Made in USA.', images: ['https://nb.scene7.com/is/image/NB/m990gl6_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'new-balance-2002r', name: '2002R', brand: 'New Balance', category: 'zapatillas', description: 'New Balance 2002R, running retro con amortiguación N-ERGY.', images: ['https://nb.scene7.com/is/image/NB/m2002rho_nb_02_i?$pdpflexf2$&wid=800&hei=800'] },
  { id: 'puma-suede-classic', name: 'Suede Classic XXI', brand: 'Puma', category: 'zapatillas', description: 'Puma Suede Classic, estilo retro de gamuza desde 1968.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers'] },
  { id: 'puma-rs-x', name: 'RS-X', brand: 'Puma', category: 'zapatillas', description: 'Puma RS-X, running system reinventado con estilo futurista.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/390776/02/sv01/fnd/PNA/fmt/png/RS-X-Efekt-Sneakers'] },
  { id: 'puma-caven', name: 'Caven 2.0', brand: 'Puma', category: 'zapatillas', description: 'Puma Caven 2.0, estilo court clásico y versátil.', images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/392290/02/sv01/fnd/PNA/fmt/png/Caven-2.0-Sneakers'] },
  { id: 'tnf-vectiv-exploris', name: 'VECTIV Exploris 2', brand: 'The North Face', category: 'zapatillas', description: 'The North Face VECTIV Exploris 2, trail hiking con placa de carbono.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A7W6A_KX7_hero?wid=780&hei=906'] },

  // ======================== BUZOS / HOODIES ========================
  { id: 'tnf-drew-peak-hoodie', name: 'Drew Peak Pullover Hoodie', brand: 'The North Face', category: 'buzos', description: 'The North Face Drew Peak, buzo con logo frontal bordado.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF00AHJY_JK3_hero?wid=780&hei=906'] },
  { id: 'converse-go-to-hoodie', name: 'Go-To Star Chevron Hoodie', brand: 'Converse', category: 'buzos', description: 'Converse Go-To, buzo clásico con logo Star Chevron bordado.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw2345abcd/images/a_107/10025411_A_107X1.jpg'] },
  { id: 'vans-classic-hoodie', name: 'Classic V Hoodie', brand: 'Vans', category: 'buzos', description: 'Vans Classic V, buzo con capucha y logo V clásico.', images: ['https://images.vans.com/is/image/VansBrand/VN0A456ABLK-HERO?wid=800'] },

  // ======================== CAMPERAS ========================
  { id: 'north-face-nuptse', name: '1996 Retro Nuptse Jacket', brand: 'The North Face', category: 'camperas', description: 'La icónica campera puffer The North Face Nuptse 1996.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A3C8D_JK3_hero?wid=780&hei=906'] },
  { id: 'north-face-thermoball', name: 'ThermoBall Eco Jacket', brand: 'The North Face', category: 'camperas', description: 'The North Face ThermoBall Eco, aislamiento sintético compacto.', images: ['https://images.thenorthface.com/is/image/TheNorthFace/NF0A5IDA_JK3_hero?wid=780&hei=906'] },
  { id: 'levis-trucker-jacket', name: 'Trucker Jacket', brand: "Levi's", category: 'camperas', description: "La clásica campera de jean Levi's Trucker.", images: ['https://lsco.scene7.com/is/image/lsco/723340070-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-sherpa-trucker', name: 'Sherpa Trucker Jacket', brand: "Levi's", category: 'camperas', description: "Levi's Sherpa Trucker, denim clásico con forro de borreguillo.", images: ['https://lsco.scene7.com/is/image/lsco/163650089-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'vans-torrey-coach', name: 'Torrey Coach Jacket', brand: 'Vans', category: 'camperas', description: 'Vans Torrey Coach Jacket, campera ligera estilo coach.', images: ['https://images.vans.com/is/image/VansBrand/VN0002MUBLK-HERO?wid=800'] },

  // ======================== JEANS ========================
  { id: 'levis-501-original', name: '501 Original Fit', brand: "Levi's", category: 'jeans', description: "El jean original Levi's 501, el modelo que definió la categoría.", images: ['https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-511-slim', name: '511 Slim Fit', brand: "Levi's", category: 'jeans', description: "Levi's 511 Slim Fit, corte moderno y cómodo.", images: ['https://lsco.scene7.com/is/image/lsco/045115279-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-505-regular', name: '505 Regular Fit', brand: "Levi's", category: 'jeans', description: "Levi's 505 Regular Fit, corte recto clásico.", images: ['https://lsco.scene7.com/is/image/lsco/005054886-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-502-taper', name: '502 Taper Fit', brand: "Levi's", category: 'jeans', description: "Levi's 502 Taper, corte cónico moderno con espacio en muslo.", images: ['https://lsco.scene7.com/is/image/lsco/295070548-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-512-slim-taper', name: '512 Slim Taper', brand: "Levi's", category: 'jeans', description: "Levi's 512, slim en el muslo con cónico hacia el tobillo.", images: ['https://lsco.scene7.com/is/image/lsco/288330276-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },
  { id: 'levis-550-relaxed', name: '550 Relaxed Fit', brand: "Levi's", category: 'jeans', description: "Levi's 550, corte relajado con espacio extra en pierna.", images: ['https://lsco.scene7.com/is/image/lsco/005504886-front-pdp?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=800&hei=1000'] },

  // ======================== REMERAS ========================
  { id: 'converse-star-chevron-tee', name: 'Star Chevron Tee', brand: 'Converse', category: 'remeras', description: 'Remera Converse con logo Star Chevron clásico.', images: ['https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw3456test/images/a_107/10023876_A_107X1.jpg'] },
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
  o('nike-west-virginia-courtside-04ej19mcwvn-usu', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/west-virginia-courtside-mens-nike-dri-fit-college-pullover-hoodie-9S2CGSFn/04EJ19MCWVN-USU'),
  o('nike-west-virginia-courtside-04ej19mcwvn-usu', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/west-virginia-courtside-mens-nike-dri-fit-college-pullover-hoodie-9S2CGSFn/04EJ19MCWVN-USU'),
  o('nike-florida-state-courtside-04ej08deftn-usu', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/florida-state-courtside-mens-nike-dri-fit-college-pullover-hoodie-nD55dmld/04EJ08DEFTN-USU'),
  o('nike-florida-state-courtside-04ej08deftn-usu', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/florida-state-courtside-mens-nike-dri-fit-college-pullover-hoodie-nD55dmld/04EJ08DEFTN-USU'),
  o('nike-nike-n-a-c-im3609-077', 'Nike Store', 'US', 'nyc', 80, 'USD', '$', 'https://www.nike.com/t/nac-mens-dri-fit-oversized-fleece-training-hoodie-t7mydNNM/IM3609-077'),
  o('nike-nike-n-a-c-im3609-077', 'Nike Store', 'US', 'la', 80, 'USD', '$', 'https://www.nike.com/t/nac-mens-dri-fit-oversized-fleece-training-hoodie-t7mydNNM/IM3609-077'),
  o('nike-nike-tech-io9941-009', 'Nike Store', 'US', 'nyc', 145, 'USD', '$', 'https://www.nike.com/t/tech-mens-fleece-pullover-hoodie-2eYhFKJ7/IO9941-009'),
  o('nike-nike-tech-io9941-009', 'Nike Store', 'US', 'la', 145, 'USD', '$', 'https://www.nike.com/t/tech-mens-fleece-pullover-hoodie-2eYhFKJ7/IO9941-009'),
  o('nike-nike-tech-if1319-009', 'Nike Store', 'US', 'nyc', 155, 'USD', '$', 'https://www.nike.com/t/tech-mens-fleece-full-zip-hoodie-W07x1PWs/IF1319-009'),
  o('nike-nike-tech-if1319-009', 'Nike Store', 'US', 'la', 155, 'USD', '$', 'https://www.nike.com/t/tech-mens-fleece-full-zip-hoodie-W07x1PWs/IF1319-009'),
  o('nike-nike-primary-nanoknit-iu3220-320', 'Nike Store', 'US', 'nyc', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-320'),
  o('nike-nike-primary-nanoknit-iu3220-320', 'Nike Store', 'US', 'la', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-320'),
  o('nike-nike-sportswear-club-fleece-im4935-010', 'Nike Store', 'US', 'nyc', 50, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-big-kids-oversized-hoodie-mUhDy8jC/IM4935-010'),
  o('nike-nike-sportswear-club-fleece-im4935-010', 'Nike Store', 'US', 'la', 50, 'USD', '$', 'https://www.nike.com/t/sportswear-club-fleece-big-kids-oversized-hoodie-mUhDy8jC/IM4935-010'),
  o('nike-jordan-brooklyn-im8911-054', 'Nike Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-oversized-fleece-pullover-hoodie-e9HjcDLe/IM8911-054'),
  o('nike-jordan-brooklyn-im8911-054', 'Nike Store', 'US', 'la', 75, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-oversized-fleece-pullover-hoodie-e9HjcDLe/IM8911-054'),
  o('nike-jordan-brooklyn-iu0249-657', 'Nike Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-pullover-hoodie-yjTcCQad/IU0249-657'),
  o('nike-jordan-brooklyn-iu0249-657', 'Nike Store', 'US', 'la', 70, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-pullover-hoodie-yjTcCQad/IU0249-657'),
  o('nike-nike-primary-nanoknit-iu3220-451', 'Nike Store', 'US', 'nyc', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-451'),
  o('nike-nike-primary-nanoknit-iu3220-451', 'Nike Store', 'US', 'la', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-451'),
  o('nike-nike-primary-nanoknit-iu3220-084', 'Nike Store', 'US', 'nyc', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-084'),
  o('nike-nike-primary-nanoknit-iu3220-084', 'Nike Store', 'US', 'la', 68, 'USD', '$', 'https://www.nike.com/t/primary-nanoknit-big-kids-boys-dri-fit-uv-protection-pullover-hoodie-2eF4cVJc/IU3220-084'),
  o('nike-nike-24-7-impossiblysoft-ir8807-104', 'Nike Store', 'US', 'nyc', 125, 'USD', '$', 'https://www.nike.com/t/24-7-impossiblysoft-mens-dri-fit-pullover-hoodie-x2cnDEAK/IR8807-104'),
  o('nike-nike-24-7-impossiblysoft-ir8807-104', 'Nike Store', 'US', 'la', 125, 'USD', '$', 'https://www.nike.com/t/24-7-impossiblysoft-mens-dri-fit-pullover-hoodie-x2cnDEAK/IR8807-104'),
  o('nike-nike-sportswear-studio-fleece-im4904-437', 'Nike Store', 'US', 'nyc', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM/IM4904-437'),
  o('nike-nike-sportswear-studio-fleece-im4904-437', 'Nike Store', 'US', 'la', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM/IM4904-437'),
  o('nike-nike-sportswear-studio-fleece-im4904-051', 'Nike Store', 'US', 'nyc', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM/IM4904-051'),
  o('nike-nike-sportswear-studio-fleece-im4904-051', 'Nike Store', 'US', 'la', 55, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-fleece-big-kids-girls-oversized-full-zip-hoodie-wYUu5HSM/IM4904-051'),
  o('nike-cleveland-browns-rewind-club-nkdk89n93v-tm9', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/cleveland-browns-rewind-club-mens-nike-nfl-pullover-hoodie-9F6MAINW/NKDK89N93V-TM9'),
  o('nike-cleveland-browns-rewind-club-nkdk89n93v-tm9', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/cleveland-browns-rewind-club-mens-nike-nfl-pullover-hoodie-9F6MAINW/NKDK89N93V-TM9'),
  o('nike-kansas-city-chiefs-crucial-catch-sideline-standard-issue-03az68xzug-f9r', 'Nike Store', 'US', 'nyc', 110, 'USD', '$', 'https://www.nike.com/t/kansas-city-chiefs-crucial-catch-sideline-standard-issue-mens-nike-dri-fit-nfl-pullover-hoodie-j0AXHj21/03AZ68XZUG-F9R'),
  o('nike-kansas-city-chiefs-crucial-catch-sideline-standard-issue-03az68xzug-f9r', 'Nike Store', 'US', 'la', 110, 'USD', '$', 'https://www.nike.com/t/kansas-city-chiefs-crucial-catch-sideline-standard-issue-mens-nike-dri-fit-nfl-pullover-hoodie-j0AXHj21/03AZ68XZUG-F9R'),
  o('nike-jordan-flight-x-howard-university-iu5517-419', 'Nike Store', 'US', 'nyc', 140, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-fleece-full-zip-hoodie-B0wAOW4E/IU5517-419'),
  o('nike-jordan-flight-x-howard-university-iu5517-419', 'Nike Store', 'US', 'la', 140, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-fleece-full-zip-hoodie-B0wAOW4E/IU5517-419'),
  o('nike-ole-miss-sideline-standard-issue-iv9894-421', 'Nike Store', 'US', 'nyc', 110, 'USD', '$', 'https://www.nike.com/t/ole-miss-sideline-standard-issue-mens-nike-dri-fit-college-full-zip-hoodie-pn4E1BVQ/IV9894-421'),
  o('nike-ole-miss-sideline-standard-issue-iv9894-421', 'Nike Store', 'US', 'la', 110, 'USD', '$', 'https://www.nike.com/t/ole-miss-sideline-standard-issue-mens-nike-dri-fit-college-full-zip-hoodie-pn4E1BVQ/IV9894-421'),
  o('nike-justin-herbert-los-angeles-chargers-z1b7nfm4chahj-ncw', 'Nike Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.nike.com/t/justin-herbert-los-angeles-chargers-big-kids-nike-nfl-pullover-hoodie-9UWvQ9Zq/Z1B7NFM4CHAHJ-NCW'),
  o('nike-justin-herbert-los-angeles-chargers-z1b7nfm4chahj-ncw', 'Nike Store', 'US', 'la', 75, 'USD', '$', 'https://www.nike.com/t/justin-herbert-los-angeles-chargers-big-kids-nike-nfl-pullover-hoodie-9UWvQ9Zq/Z1B7NFM4CHAHJ-NCW'),
  o('nike-brock-purdy-san-francisco-49ers-z1b7nfm449rbp-nct', 'Nike Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.nike.com/t/brock-purdy-san-francisco-49ers-big-kids-nike-nfl-pullover-hoodie-dHVo8hy3/Z1B7NFM449RBP-NCT'),
  o('nike-brock-purdy-san-francisco-49ers-z1b7nfm449rbp-nct', 'Nike Store', 'US', 'la', 75, 'USD', '$', 'https://www.nike.com/t/brock-purdy-san-francisco-49ers-big-kids-nike-nfl-pullover-hoodie-dHVo8hy3/Z1B7NFM449RBP-NCT'),
  o('nike-nike-sportswear-studio-im4947-303', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-big-kids-girls-oversized-crew-neck-sweatshirt-adgPO4bu/IM4947-303'),
  o('nike-nike-sportswear-studio-im4947-303', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-studio-big-kids-girls-oversized-crew-neck-sweatshirt-adgPO4bu/IM4947-303'),
  o('nike-nike-everyday-elevated-ih8522-906', 'Nike Store', 'US', 'nyc', 26, 'USD', '$', 'https://www.nike.com/t/everyday-elevated-crew-socks-3-pairs-OkkGzGQm/IH8522-906'),
  o('nike-nike-everyday-elevated-ih8522-906', 'Nike Store', 'US', 'la', 26, 'USD', '$', 'https://www.nike.com/t/everyday-elevated-crew-socks-3-pairs-OkkGzGQm/IH8522-906'),
  o('nike-nike-phoenix-university-of-mississippi-iv9363-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-university-of-mississippi-womens-oversized-crew-neck-sweatshirt-RXvZRfIw/IV9363-120'),
  o('nike-nike-phoenix-university-of-mississippi-iv9363-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-university-of-mississippi-womens-oversized-crew-neck-sweatshirt-RXvZRfIw/IV9363-120'),
  o('nike-nike-phoenix-arkansas-iv9281-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-arkansas-womens-oversized-crew-neck-sweatshirt-okBfub56/IV9281-120'),
  o('nike-nike-phoenix-arkansas-iv9281-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-arkansas-womens-oversized-crew-neck-sweatshirt-okBfub56/IV9281-120'),
  o('nike-denver-broncos-essentials-club-logo-arch-z1b7nfqqbrc-nbo', 'Nike Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.nike.com/t/denver-broncos-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-XdrjwsvO/Z1B7NFQQBRC-NBO'),
  o('nike-denver-broncos-essentials-club-logo-arch-z1b7nfqqbrc-nbo', 'Nike Store', 'US', 'la', 65, 'USD', '$', 'https://www.nike.com/t/denver-broncos-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-XdrjwsvO/Z1B7NFQQBRC-NBO'),
  o('nike-nike-everyday-iv6017-902', 'Nike Store', 'US', 'nyc', 22, 'USD', '$', 'https://www.nike.com/t/everyday-kids-cushioned-crew-socks-6-pairs-igAtWMyf/IV6017-902'),
  o('nike-nike-everyday-iv6017-902', 'Nike Store', 'US', 'la', 22, 'USD', '$', 'https://www.nike.com/t/everyday-kids-cushioned-crew-socks-6-pairs-igAtWMyf/IV6017-902'),
  o('nike-jordan-everyday-elevated-ir6326-901', 'Nike Store', 'US', 'nyc', 32, 'USD', '$', 'https://www.nike.com/t/jordan-everyday-elevated-crew-socks-6-pairs-aIbOsS5B/IR6326-901'),
  o('nike-jordan-everyday-elevated-ir6326-901', 'Nike Store', 'US', 'la', 32, 'USD', '$', 'https://www.nike.com/t/jordan-everyday-elevated-crew-socks-6-pairs-aIbOsS5B/IR6326-901'),
  o('nike-san-francisco-49ers-rivalries-collection-primary-03ek00a9b-3eu', 'Nike Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-lkT9Hznl/03EK00A9B-3EU'),
  o('nike-san-francisco-49ers-rivalries-collection-primary-03ek00a9b-3eu', 'Nike Store', 'US', 'la', 100, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-lkT9Hznl/03EK00A9B-3EU'),
  o('nike-new-england-patriots-rivalries-collection-primary-03ek4nr8k-3eu', 'Nike Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-Fbo23Ur5/03EK4NR8K-3EU'),
  o('nike-new-england-patriots-rivalries-collection-primary-03ek4nr8k-3eu', 'Nike Store', 'US', 'la', 100, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-Fbo23Ur5/03EK4NR8K-3EU'),
  o('nike-buffalo-bills-rivalries-collection-primary-03ek10a81-3eu', 'Nike Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.nike.com/t/buffalo-bills-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-PxxXnQn1/03EK10A81-3EU'),
  o('nike-buffalo-bills-rivalries-collection-primary-03ek10a81-3eu', 'Nike Store', 'US', 'la', 100, 'USD', '$', 'https://www.nike.com/t/buffalo-bills-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-PxxXnQn1/03EK10A81-3EU'),
  o('nike-los-angeles-rams-rivalries-collection-primary-03ek4fa9x-3eu', 'Nike Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.nike.com/t/los-angeles-rams-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-d3UwhlFJ/03EK4FA9X-3EU'),
  o('nike-los-angeles-rams-rivalries-collection-primary-03ek4fa9x-3eu', 'Nike Store', 'US', 'la', 100, 'USD', '$', 'https://www.nike.com/t/los-angeles-rams-rivalries-collection-primary-mens-nike-dri-fit-nfl-pullover-crew-d3UwhlFJ/03EK4FA9X-3EU'),
  o('nike-minnesota-vikings-essentials-club-logo-arch-z1b7nfqqvik-nbx', 'Nike Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.nike.com/t/minnesota-vikings-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-kMZlk53y/Z1B7NFQQVIK-NBX'),
  o('nike-minnesota-vikings-essentials-club-logo-arch-z1b7nfqqvik-nbx', 'Nike Store', 'US', 'la', 65, 'USD', '$', 'https://www.nike.com/t/minnesota-vikings-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-kMZlk53y/Z1B7NFQQVIK-NBX'),
  o('nike-nike-phoenix-byu-iv9300-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-byu-womens-oversized-crew-neck-sweatshirt-0fAK4HEi/IV9300-120'),
  o('nike-nike-phoenix-byu-iv9300-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-byu-womens-oversized-crew-neck-sweatshirt-0fAK4HEi/IV9300-120'),
  o('nike-nike-phoenix-iowa-state-iv9335-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-iowa-state-womens-oversized-crew-neck-sweatshirt-uqYc9stJ/IV9335-120'),
  o('nike-nike-phoenix-iowa-state-iv9335-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-iowa-state-womens-oversized-crew-neck-sweatshirt-uqYc9stJ/IV9335-120'),
  o('nike-nike-phoenix-connecticut-iv9408-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-connecticut-womens-oversized-crew-neck-sweatshirt-WeJ3icmO/IV9408-120'),
  o('nike-nike-phoenix-connecticut-iv9408-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-connecticut-womens-oversized-crew-neck-sweatshirt-WeJ3icmO/IV9408-120'),
  o('nike-kansas-city-chiefs-essentials-club-logo-arch-z1b7nfqqchi-neb', 'Nike Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.nike.com/t/kansas-city-chiefs-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-bKuyyWAH/Z1B7NFQQCHI-NEB'),
  o('nike-kansas-city-chiefs-essentials-club-logo-arch-z1b7nfqqchi-neb', 'Nike Store', 'US', 'la', 65, 'USD', '$', 'https://www.nike.com/t/kansas-city-chiefs-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-bKuyyWAH/Z1B7NFQQCHI-NEB'),
  o('nike-nike-phoenix-cal-berkeley-iv9306-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-cal-berkeley-womens-oversized-crew-neck-sweatshirt-3C5JmACK/IV9306-120'),
  o('nike-nike-phoenix-cal-berkeley-iv9306-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-cal-berkeley-womens-oversized-crew-neck-sweatshirt-3C5JmACK/IV9306-120'),
  o('nike-nike-phoenix-oregon-state-iv9377-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-oregon-state-womens-oversized-crew-neck-sweatshirt-8JWxqQQJ/IV9377-120'),
  o('nike-nike-phoenix-oregon-state-iv9377-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-oregon-state-womens-oversized-crew-neck-sweatshirt-8JWxqQQJ/IV9377-120'),
  o('nike-nike-phoenix-air-force-iv9274-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-air-force-womens-oversized-crew-neck-sweatshirt-6HUHIKox/IV9274-120'),
  o('nike-nike-phoenix-air-force-iv9274-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-air-force-womens-oversized-crew-neck-sweatshirt-6HUHIKox/IV9274-120'),
  o('nike-nike-phoenix-baylor-iv9294-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-baylor-womens-oversized-crew-neck-sweatshirt-d3dtp38H/IV9294-120'),
  o('nike-nike-phoenix-baylor-iv9294-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-baylor-womens-oversized-crew-neck-sweatshirt-d3dtp38H/IV9294-120'),
  o('nike-nike-phoenix-missouri-iv9357-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-missouri-womens-oversized-crew-neck-sweatshirt-DINZTlmb/IV9357-120'),
  o('nike-nike-phoenix-missouri-iv9357-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-missouri-womens-oversized-crew-neck-sweatshirt-DINZTlmb/IV9357-120'),
  o('nike-nike-phoenix-tcu-iv9402-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-tcu-womens-oversized-crew-neck-sweatshirt-NTigH91X/IV9402-120'),
  o('nike-nike-phoenix-tcu-iv9402-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-tcu-womens-oversized-crew-neck-sweatshirt-NTigH91X/IV9402-120'),
  o('nike-detroit-lions-essentials-club-logo-arch-z1b7nfqqlio-neg', 'Nike Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.nike.com/t/detroit-lions-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-925GKdFu/Z1B7NFQQLIO-NEG'),
  o('nike-detroit-lions-essentials-club-logo-arch-z1b7nfqqlio-neg', 'Nike Store', 'US', 'la', 65, 'USD', '$', 'https://www.nike.com/t/detroit-lions-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-925GKdFu/Z1B7NFQQLIO-NEG'),
  o('nike-nike-phoenix-boise-state-iv9320-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-boise-state-womens-oversized-crew-neck-sweatshirt-1eQ5oV6n/IV9320-120'),
  o('nike-nike-phoenix-boise-state-iv9320-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-boise-state-womens-oversized-crew-neck-sweatshirt-1eQ5oV6n/IV9320-120'),
  o('nike-pittsburgh-steelers-essentials-club-logo-arch-z1b7nfqqste-naw', 'Nike Store', 'US', 'nyc', 65, 'USD', '$', 'https://www.nike.com/t/pittsburgh-steelers-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-Pls3tdVx/Z1B7NFQQSTE-NAW'),
  o('nike-pittsburgh-steelers-essentials-club-logo-arch-z1b7nfqqste-naw', 'Nike Store', 'US', 'la', 65, 'USD', '$', 'https://www.nike.com/t/pittsburgh-steelers-essentials-club-logo-arch-big-kids-nike-nfl-pullover-crew-Pls3tdVx/Z1B7NFQQSTE-NAW'),
  o('nike-nike-phoenix-colorado-iv9313-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-colorado-womens-oversized-crew-neck-sweatshirt-syZesBry/IV9313-120'),
  o('nike-nike-phoenix-colorado-iv9313-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-colorado-womens-oversized-crew-neck-sweatshirt-syZesBry/IV9313-120'),
  o('nike-nike-phoenix-washington-state-iv9434-120', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-washington-state-womens-oversized-crew-neck-sweatshirt-9NKTAnaQ/IV9434-120'),
  o('nike-nike-phoenix-washington-state-iv9434-120', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/phoenix-washington-state-womens-oversized-crew-neck-sweatshirt-9NKTAnaQ/IV9434-120'),
  o('nike-golden-state-warriors-standard-issue-ii6283-063', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/golden-state-warriors-standard-issue-mens-fleece-crew-6dBx6em5/II6283-063'),
  o('nike-golden-state-warriors-standard-issue-ii6283-063', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/golden-state-warriors-standard-issue-mens-fleece-crew-6dBx6em5/II6283-063'),
  o('nike-nike-sportswear-essential-fz5559-621', 'Nike Store', 'US', 'nyc', 20, 'USD', '$', 'https://www.nike.com/t/sportswear-essential-big-kids-girls-t-shirt-vN0mzG/FZ5559-621'),
  o('nike-nike-sportswear-essential-fz5559-621', 'Nike Store', 'US', 'la', 20, 'USD', '$', 'https://www.nike.com/t/sportswear-essential-big-kids-girls-t-shirt-vN0mzG/FZ5559-621'),
  o('nike-nike-dri-fit-legend-dx0989-480', 'Nike Store', 'US', 'nyc', 22.97, 'USD', '$', 'https://www.nike.com/t/dri-fit-legend-mens-fitness-t-shirt-JmKL0d/DX0989-480'),
  o('nike-nike-dri-fit-legend-dx0989-480', 'Nike Store', 'US', 'la', 22.97, 'USD', '$', 'https://www.nike.com/t/dri-fit-legend-mens-fitness-t-shirt-JmKL0d/DX0989-480'),
  o('nike-nike-sportswear-ix2080-100', 'Nike Store', 'US', 'nyc', 37, 'USD', '$', 'https://www.nike.com/t/sportswear-mens-loose-t-shirt-7FvgEywO/IX2080-100'),
  o('nike-nike-sportswear-ix2080-100', 'Nike Store', 'US', 'la', 37, 'USD', '$', 'https://www.nike.com/t/sportswear-mens-loose-t-shirt-7FvgEywO/IX2080-100'),
  o('nike-nike-sportswear-ix2080-010', 'Nike Store', 'US', 'nyc', 37, 'USD', '$', 'https://www.nike.com/t/sportswear-mens-loose-t-shirt-7FvgEywO/IX2080-010'),
  o('nike-nike-sportswear-ix2080-010', 'Nike Store', 'US', 'la', 37, 'USD', '$', 'https://www.nike.com/t/sportswear-mens-loose-t-shirt-7FvgEywO/IX2080-010'),
  o('nike-nike-n-a-c-im6142-010', 'Nike Store', 'US', 'nyc', 35, 'USD', '$', 'https://www.nike.com/t/nac-mens-t-shirt-Jip0AFEl/IM6142-010'),
  o('nike-nike-n-a-c-im6142-010', 'Nike Store', 'US', 'la', 35, 'USD', '$', 'https://www.nike.com/t/nac-mens-t-shirt-Jip0AFEl/IM6142-010'),
  o('nike-nike-college-ole-miss-iv9364-120', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/college-ole-miss-womens-ringer-t-shirt-Wqts3Og3/IV9364-120'),
  o('nike-nike-college-ole-miss-iv9364-120', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/college-ole-miss-womens-ringer-t-shirt-Wqts3Og3/IV9364-120'),
  o('nike-jordan-brooklyn-x-howard-university-ir0220-419', 'Nike Store', 'US', 'nyc', 50, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0/IR0220-419'),
  o('nike-jordan-brooklyn-x-howard-university-ir0220-419', 'Nike Store', 'US', 'la', 50, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0/IR0220-419'),
  o('nike-jordan-brooklyn-x-howard-university-ir0220-223', 'Nike Store', 'US', 'nyc', 50, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0/IR0220-223'),
  o('nike-jordan-brooklyn-x-howard-university-ir0220-223', 'Nike Store', 'US', 'la', 50, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-x-howard-university-womens-graphic-girlfriend-t-shirt-zRhQDlv0/IR0220-223'),
  o('nike-jordan-flight-x-howard-university-iu5887-133', 'Nike Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-oversized-basketball-t-shirt-1N0l7xqz/IU5887-133'),
  o('nike-jordan-flight-x-howard-university-iu5887-133', 'Nike Store', 'US', 'la', 60, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-oversized-basketball-t-shirt-1N0l7xqz/IU5887-133'),
  o('nike-nike-college-arkansas-iv9282-120', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/college-arkansas-womens-ringer-t-shirt-QlmFBsJH/IV9282-120'),
  o('nike-nike-college-arkansas-iv9282-120', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/college-arkansas-womens-ringer-t-shirt-QlmFBsJH/IV9282-120'),
  o('nike-anthony-edwards-minnesota-timberwolves-statement-edition-7hdc4f26tim05-naw', 'Nike Store', 'US', 'nyc', 32, 'USD', '$', 'https://www.nike.com/t/anthony-edwards-minnesota-timberwolves-statement-edition-big-kids-nba-t-shirt-8Qdl7Teg/7HDC4F26TIM05-NAW'),
  o('nike-anthony-edwards-minnesota-timberwolves-statement-edition-7hdc4f26tim05-naw', 'Nike Store', 'US', 'la', 32, 'USD', '$', 'https://www.nike.com/t/anthony-edwards-minnesota-timberwolves-statement-edition-big-kids-nba-t-shirt-8Qdl7Teg/7HDC4F26TIM05-NAW'),
  o('nike-san-francisco-49ers-essential-z1b7nfqk49r-nct', 'Nike Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-essential-mens-nike-nfl-t-shirt-XoMf1o91/Z1B7NFQK49R-NCT'),
  o('nike-san-francisco-49ers-essential-z1b7nfqk49r-nct', 'Nike Store', 'US', 'la', 30, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-essential-mens-nike-nfl-t-shirt-XoMf1o91/Z1B7NFQK49R-NCT'),
  o('nike-san-antonio-spurs-7hdc4s26spuvw-ney', 'Nike Store', 'US', 'nyc', 32, 'USD', '$', 'https://www.nike.com/t/san-antonio-spurs-big-kids-nike-t-shirt-NT2twURO/7HDC4S26SPUVW-NEY'),
  o('nike-san-antonio-spurs-7hdc4s26spuvw-ney', 'Nike Store', 'US', 'la', 32, 'USD', '$', 'https://www.nike.com/t/san-antonio-spurs-big-kids-nike-t-shirt-NT2twURO/7HDC4S26SPUVW-NEY'),
  o('nike-nike-sportswear-bts-jf1696-010', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-bts-womens-t-shirt-SGpLCSpY/JF1696-010'),
  o('nike-nike-sportswear-bts-jf1696-010', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/sportswear-bts-womens-t-shirt-SGpLCSpY/JF1696-010'),
  o('nike-nike-sportswear-bts-ja8523-100', 'Nike Store', 'US', 'nyc', 45, 'USD', '$', 'https://www.nike.com/t/sportswear-bts-mens-t-shirt-b2jA91CK/JA8523-100'),
  o('nike-nike-sportswear-bts-ja8523-100', 'Nike Store', 'US', 'la', 45, 'USD', '$', 'https://www.nike.com/t/sportswear-bts-mens-t-shirt-b2jA91CK/JA8523-100'),
  o('nike-sabrina-x-slam-ix5437-072', 'Nike Store', 'US', 'nyc', 50, 'USD', '$', 'https://www.nike.com/t/sabrina-x-slam-nike-basketball-t-shirt-8E3Y57l6/IX5437-072'),
  o('nike-sabrina-x-slam-ix5437-072', 'Nike Store', 'US', 'la', 50, 'USD', '$', 'https://www.nike.com/t/sabrina-x-slam-nike-basketball-t-shirt-8E3Y57l6/IX5437-072'),
  o('nike-kobe-iv5115-010', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/kobe-kids-dri-fit-t-shirt-cbGkej3M/IV5115-010'),
  o('nike-kobe-iv5115-010', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/kobe-kids-dri-fit-t-shirt-cbGkej3M/IV5115-010'),
  o('nike-kobe-iv5115-063', 'Nike Store', 'US', 'nyc', 40, 'USD', '$', 'https://www.nike.com/t/kobe-kids-dri-fit-basketball-t-shirt-cbGkej3M/IV5115-063'),
  o('nike-kobe-iv5115-063', 'Nike Store', 'US', 'la', 40, 'USD', '$', 'https://www.nike.com/t/kobe-kids-dri-fit-basketball-t-shirt-cbGkej3M/IV5115-063'),
  o('nike-jordan-brooklyn-io0017-133', 'Nike Store', 'US', 'nyc', 35, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-t-shirt-HdwqvWoC/IO0017-133'),
  o('nike-jordan-brooklyn-io0017-133', 'Nike Store', 'US', 'la', 35, 'USD', '$', 'https://www.nike.com/t/jordan-brooklyn-mens-t-shirt-HdwqvWoC/IO0017-133'),
  o('nike-usc-2026-military-appreciation-03kq2eascj-wyj', 'Nike Store', 'US', 'nyc', 47, 'USD', '$', 'https://www.nike.com/t/usc-2026-military-appreciation-womens-nike-dri-fit-college-t-shirt-uyUK91XU/03KQ2EASCJ-WYJ'),
  o('nike-usc-2026-military-appreciation-03kq2eascj-wyj', 'Nike Store', 'US', 'la', 47, 'USD', '$', 'https://www.nike.com/t/usc-2026-military-appreciation-womens-nike-dri-fit-college-t-shirt-uyUK91XU/03KQ2EASCJ-WYJ'),
  o('nike-nike-sportswear-86n074-023', 'Nike Store', 'US', 'nyc', 68.97, 'USD', '$', 'https://www.nike.com/t/sportswear-little-kids-all-day-play-puffer-jacket-5HYlIGhj/86N074-023'),
  o('nike-nike-sportswear-86n074-023', 'Nike Store', 'US', 'la', 68.97, 'USD', '$', 'https://www.nike.com/t/sportswear-little-kids-all-day-play-puffer-jacket-5HYlIGhj/86N074-023'),
  o('nike-nike-tech-if1345-451', 'Nike Store', 'US', 'nyc', 125, 'USD', '$', 'https://www.nike.com/t/tech-mens-shori-knit-full-zip-windrunner-jacket-YgtcRkkR/IF1345-451'),
  o('nike-nike-tech-if1345-451', 'Nike Store', 'US', 'la', 125, 'USD', '$', 'https://www.nike.com/t/tech-mens-shori-knit-full-zip-windrunner-jacket-YgtcRkkR/IF1345-451'),
  o('nike-jordan-flight-x-howard-university-iu5510-419', 'Nike Store', 'US', 'nyc', 300, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-varsity-jacket-Sy7VmxoI/IU5510-419'),
  o('nike-jordan-flight-x-howard-university-iu5510-419', 'Nike Store', 'US', 'la', 300, 'USD', '$', 'https://www.nike.com/t/jordan-flight-x-howard-university-mens-varsity-jacket-Sy7VmxoI/IU5510-419'),
  o('nike-nike-one-io1048-010', 'Nike Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.nike.com/t/one-womens-therma-fit-fleece-bomber-jacket-nZw5S10E/IO1048-010'),
  o('nike-nike-one-io1048-010', 'Nike Store', 'US', 'la', 100, 'USD', '$', 'https://www.nike.com/t/one-womens-therma-fit-fleece-bomber-jacket-nZw5S10E/IO1048-010'),
  o('nike-nike-76p023-782', 'Nike Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.nike.com/t/toddler-colorblocked-hoodless-jacket-2CQX4MAD/76P023-782'),
  o('nike-nike-76p023-782', 'Nike Store', 'US', 'la', 75, 'USD', '$', 'https://www.nike.com/t/toddler-colorblocked-hoodless-jacket-2CQX4MAD/76P023-782'),
  o('nike-seattle-seahawks-rivalries-collection-sideline-anorak-03at00df78-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/seattle-seahawks-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-vdczn3ZG/03AT00DF78-MDB'),
  o('nike-seattle-seahawks-rivalries-collection-sideline-anorak-03at00df78-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/seattle-seahawks-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-vdczn3ZG/03AT00DF78-MDB'),
  o('nike-san-francisco-49ers-rivalries-collection-sideline-anorak-03at912z9b-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-XcmnUIvw/03AT912Z9B-MDB'),
  o('nike-san-francisco-49ers-rivalries-collection-sideline-anorak-03at912z9b-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/san-francisco-49ers-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-XcmnUIvw/03AT912Z9B-MDB'),
  o('nike-new-england-patriots-rivalries-collection-sideline-03au0g9m8k-j63', 'Nike Store', 'US', 'nyc', 215, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-sideline-mens-nike-nfl-full-zip-bomber-jacket-4lQrwfBH/03AU0G9M8K-J63'),
  o('nike-new-england-patriots-rivalries-collection-sideline-03au0g9m8k-j63', 'Nike Store', 'US', 'la', 215, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-sideline-mens-nike-nfl-full-zip-bomber-jacket-4lQrwfBH/03AU0G9M8K-J63'),
  o('nike-new-england-patriots-rivalries-collection-sideline-anorak-03at0g9m8k-9rs', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-tQRzyCEh/03AT0G9M8K-9RS'),
  o('nike-new-england-patriots-rivalries-collection-sideline-anorak-03at0g9m8k-9rs', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/new-england-patriots-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-tQRzyCEh/03AT0G9M8K-9RS'),
  o('nike-miami-dolphins-rivalries-collection-sideline-anorak-03at0gki9p-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/miami-dolphins-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-FhidJta9/03AT0GKI9P-MDB'),
  o('nike-miami-dolphins-rivalries-collection-sideline-anorak-03at0gki9p-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/miami-dolphins-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-FhidJta9/03AT0GKI9P-MDB'),
  o('nike-los-angeles-rams-rivalries-collection-sideline-anorak-03at0l169x-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/los-angeles-rams-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-ecxedQmV/03AT0L169X-MDB'),
  o('nike-los-angeles-rams-rivalries-collection-sideline-anorak-03at0l169x-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/los-angeles-rams-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-ecxedQmV/03AT0L169X-MDB'),
  o('nike-acg-essentials-9wca64-r35', 'Nike Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.nike.com/t/acg-essentials-big-kids-rain-jacket-IXNoOVFk/9WCA64-R35'),
  o('nike-acg-essentials-9wca64-r35', 'Nike Store', 'US', 'la', 90, 'USD', '$', 'https://www.nike.com/t/acg-essentials-big-kids-rain-jacket-IXNoOVFk/9WCA64-R35'),
  o('nike-acg-essentials-9wca64-023', 'Nike Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.nike.com/t/acg-essentials-big-kids-rain-jacket-IXNoOVFk/9WCA64-023'),
  o('nike-acg-essentials-9wca64-023', 'Nike Store', 'US', 'la', 90, 'USD', '$', 'https://www.nike.com/t/acg-essentials-big-kids-rain-jacket-IXNoOVFk/9WCA64-023'),
  o('nike-arizona-cardinals-rivalries-collection-sideline-anorak-03at03e99c-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/arizona-cardinals-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-RbRmax5p/03AT03E99C-MDB'),
  o('nike-arizona-cardinals-rivalries-collection-sideline-anorak-03at03e99c-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/arizona-cardinals-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-RbRmax5p/03AT03E99C-MDB'),
  o('nike-buffalo-bills-rivalries-collection-sideline-anorak-03at11qr81-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/buffalo-bills-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-9dSqFia5/03AT11QR81-MDB'),
  o('nike-buffalo-bills-rivalries-collection-sideline-anorak-03at11qr81-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/buffalo-bills-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-9dSqFia5/03AT11QR81-MDB'),
  o('nike-new-york-jets-rivalries-collection-sideline-anorak-03at0g9o72-mdb', 'Nike Store', 'US', 'nyc', 185, 'USD', '$', 'https://www.nike.com/t/new-york-jets-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-dYc2NA3w/03AT0G9O72-MDB'),
  o('nike-new-york-jets-rivalries-collection-sideline-anorak-03at0g9o72-mdb', 'Nike Store', 'US', 'la', 185, 'USD', '$', 'https://www.nike.com/t/new-york-jets-rivalries-collection-sideline-anorak-mens-nike-nfl-1-2-zip-hooded-jacket-dYc2NA3w/03AT0G9O72-MDB'),

  o('nike-nike-dunk-low-suede-io4244-102', 'Nike Store', 'US', 'nyc', 120, 'USD', '$', 'https://www.nike.com/t/dunk-low-suede-womens-shoes-HkzujqYZ/IO4244-102'),
  o('nike-nike-dunk-low-suede-io4244-102', 'Nike Store', 'US', 'la', 120, 'USD', '$', 'https://www.nike.com/t/dunk-low-suede-womens-shoes-HkzujqYZ/IO4244-102'),
  o('nike-nike-precision-8-low-ih1104-001', 'Nike Store', 'US', 'nyc', 75, 'USD', '$', 'https://www.nike.com/t/precision-8-low-mens-basketball-shoes-QaX6zVIf/IH1104-001'),
  o('nike-nike-precision-8-low-ih1104-001', 'Nike Store', 'US', 'la', 75, 'USD', '$', 'https://www.nike.com/t/precision-8-low-mens-basketball-shoes-QaX6zVIf/IH1104-001'),
  o('nike-nike-diamond-gamer-mcs-ii7346-401', 'Nike Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.nike.com/t/diamond-gamer-mcs-baseball-shoes-aSIXJYWr/II7346-401'),
  o('nike-nike-diamond-gamer-mcs-ii7346-401', 'Nike Store', 'US', 'la', 90, 'USD', '$', 'https://www.nike.com/t/diamond-gamer-mcs-baseball-shoes-aSIXJYWr/II7346-401'),
  o('nike-nike-dunk-low-fb9108-104', 'Nike Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.nike.com/t/dunk-low-little-kids-shoes-C6spohtb/FB9108-104'),
  o('nike-nike-dunk-low-fb9108-104', 'Nike Store', 'US', 'la', 70, 'USD', '$', 'https://www.nike.com/t/dunk-low-little-kids-shoes-C6spohtb/FB9108-104'),
  o('nike-jordan-1-low-alt-dr9748-405', 'Nike Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.nike.com/t/jordan-1-low-alt-little-kids-shoes-w9HO9jOz/DR9748-405'),
  o('nike-jordan-1-low-alt-dr9748-405', 'Nike Store', 'US', 'la', 70, 'USD', '$', 'https://www.nike.com/t/jordan-1-low-alt-little-kids-shoes-w9HO9jOz/DR9748-405'),
  o('nike-nike-free-ride-io1642-510', 'Nike Store', 'US', 'nyc', 72, 'USD', '$', 'https://www.nike.com/t/free-ride-big-kids-running-shoes-mNjnRIhi/IO1642-510'),
  o('nike-nike-free-ride-io1642-510', 'Nike Store', 'US', 'la', 72, 'USD', '$', 'https://www.nike.com/t/free-ride-big-kids-running-shoes-mNjnRIhi/IO1642-510'),
  o('nike-nike-cortez-textile-dz2795-610', 'Nike Store', 'US', 'nyc', 76.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-610'),
  o('nike-nike-cortez-textile-dz2795-610', 'Nike Store', 'US', 'la', 76.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-610'),
  o('nike-nike-cortez-ib1857-204', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-cTpskF/IB1857-204'),
  o('nike-nike-cortez-ib1857-204', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-cTpskF/IB1857-204'),
  o('nike-nike-cortez-textile-dz2795-401', 'Nike Store', 'US', 'nyc', 58.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-401'),
  o('nike-nike-cortez-textile-dz2795-401', 'Nike Store', 'US', 'la', 58.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-401'),
  o('nike-nike-cortez-leather-dn1791-602', 'Nike Store', 'US', 'nyc', 76.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-womens-shoes-tZtTd5/DN1791-602'),
  o('nike-nike-cortez-leather-dn1791-602', 'Nike Store', 'US', 'la', 76.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-womens-shoes-tZtTd5/DN1791-602'),
  o('nike-nike-cortez-leather-dm4044-401', 'Nike Store', 'US', 'nyc', 66.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-mens-shoes-SxhPXX/DM4044-401'),
  o('nike-nike-cortez-leather-dm4044-401', 'Nike Store', 'US', 'la', 66.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-mens-shoes-SxhPXX/DM4044-401'),
  o('nike-nike-cortez-textile-dz2795-204', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-204'),
  o('nike-nike-cortez-textile-dz2795-204', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-204'),
  o('nike-nike-cortez-ir0042-001', 'Nike Store', 'US', 'nyc', 84.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-TzPVwgM0/IR0042-001'),
  o('nike-nike-cortez-ir0042-001', 'Nike Store', 'US', 'la', 84.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-TzPVwgM0/IR0042-001'),
  o('nike-nike-cortez-ir0042-900', 'Nike Store', 'US', 'nyc', 62.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-TzPVwgM0/IR0042-900'),
  o('nike-nike-cortez-ir0042-900', 'Nike Store', 'US', 'la', 62.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-TzPVwgM0/IR0042-900'),
  o('nike-nike-cortez-textile-dz2795-304', 'Nike Store', 'US', 'nyc', 57.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-304'),
  o('nike-nike-cortez-textile-dz2795-304', 'Nike Store', 'US', 'la', 57.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-304'),
  o('nike-nike-cortez-leather-dn1791-118', 'Nike Store', 'US', 'nyc', 72.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-womens-shoes-tZtTd5/DN1791-118'),
  o('nike-nike-cortez-leather-dn1791-118', 'Nike Store', 'US', 'la', 72.97, 'USD', '$', 'https://www.nike.com/t/cortez-leather-womens-shoes-tZtTd5/DN1791-118'),
  o('nike-nike-cortez-ib1857-202', 'Nike Store', 'US', 'nyc', 105, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-BzFUQybc/IB1857-202'),
  o('nike-nike-cortez-ib1857-202', 'Nike Store', 'US', 'la', 105, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-BzFUQybc/IB1857-202'),
  o('nike-nike-cortez-ib1857-301', 'Nike Store', 'US', 'nyc', 62.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-BzFUQybc/IB1857-301'),
  o('nike-nike-cortez-ib1857-301', 'Nike Store', 'US', 'la', 62.97, 'USD', '$', 'https://www.nike.com/t/cortez-womens-shoes-BzFUQybc/IB1857-301'),
  o('nike-nike-cortez-textile-hf0263-201', 'Nike Store', 'US', 'nyc', 72.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-mens-shoes-Tlm9kW/HF0263-201'),
  o('nike-nike-cortez-textile-hf0263-201', 'Nike Store', 'US', 'la', 72.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-mens-shoes-Tlm9kW/HF0263-201'),
  o('nike-nike-cortez-textile-dz2795-407', 'Nike Store', 'US', 'nyc', 57.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-407'),
  o('nike-nike-cortez-textile-dz2795-407', 'Nike Store', 'US', 'la', 57.97, 'USD', '$', 'https://www.nike.com/t/cortez-textile-womens-shoes-cTpskF/DZ2795-407'),
  o('nike-nike-sb-zoom-blazer-mid-io0667-400', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/IO0667-400'),
  o('nike-nike-sb-zoom-blazer-mid-io0667-400', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/IO0667-400'),
  o('nike-nike-blazer-low-x-book-hq2054-800', 'Nike Store', 'US', 'nyc', 82.97, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-800'),
  o('nike-nike-blazer-low-x-book-hq2054-800', 'Nike Store', 'US', 'la', 82.97, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-800'),
  o('nike-nike-blazer-low-x-book-hq2054-801', 'Nike Store', 'US', 'nyc', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-801'),
  o('nike-nike-blazer-low-x-book-hq2054-801', 'Nike Store', 'US', 'la', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-801'),
  o('nike-nike-blazer-low-x-book-hq2054-001', 'Nike Store', 'US', 'nyc', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-001'),
  o('nike-nike-blazer-low-x-book-hq2054-001', 'Nike Store', 'US', 'la', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-001'),
  o('nike-nike-blazer-low-x-book-hq2054-400', 'Nike Store', 'US', 'nyc', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-400'),
  o('nike-nike-blazer-low-x-book-hq2054-400', 'Nike Store', 'US', 'la', 135, 'USD', '$', 'https://www.nike.com/t/blazer-low-x-book-mens-shoes-NyfV3BtD/HQ2054-400'),
  o('nike-nike-sb-zoom-blazer-mid-fd0731-201', 'Nike Store', 'US', 'nyc', 95, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/FD0731-201'),
  o('nike-nike-sb-zoom-blazer-mid-fd0731-201', 'Nike Store', 'US', 'la', 95, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/FD0731-201'),
  o('nike-nike-sb-zoom-blazer-mid-fd0731-601', 'Nike Store', 'US', 'nyc', 64.97, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/FD0731-601'),
  o('nike-nike-sb-zoom-blazer-mid-fd0731-601', 'Nike Store', 'US', 'la', 64.97, 'USD', '$', 'https://www.nike.com/t/sb-zoom-blazer-mid-skate-shoes-ZLRvRZ/FD0731-601'),
  o('nike-nike-vomero-premium-ir2168-003', 'Nike Store', 'US', 'nyc', 230, 'USD', '$', 'https://www.nike.com/t/vomero-premium-mens-road-running-shoes-OBJtZHVp/IR2168-003'),
  o('nike-nike-vomero-premium-ir2168-003', 'Nike Store', 'US', 'la', 230, 'USD', '$', 'https://www.nike.com/t/vomero-premium-mens-road-running-shoes-OBJtZHVp/IR2168-003'),
  o('nike-nike-vomero-plus-iv4522-200', 'Nike Store', 'US', 'nyc', 175, 'USD', '$', 'https://www.nike.com/t/vomero-plus-mens-shoes-cdYA0SoI/IV4522-200'),
  o('nike-nike-vomero-plus-iv4522-200', 'Nike Store', 'US', 'la', 175, 'USD', '$', 'https://www.nike.com/t/vomero-plus-mens-shoes-cdYA0SoI/IV4522-200'),
  o('nike-nike-vomero-5-ix3926-060', 'Nike Store', 'US', 'nyc', 92, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-SKhO5HIO/IX3926-060'),
  o('nike-nike-vomero-5-ix3926-060', 'Nike Store', 'US', 'la', 92, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-SKhO5HIO/IX3926-060'),
  o('nike-nike-zoom-vomero-5-iv5738-133', 'Nike Store', 'US', 'nyc', 180, 'USD', '$', 'https://www.nike.com/t/zoom-vomero-5-womens-shoes-81TPKW/IV5738-133'),
  o('nike-nike-zoom-vomero-5-iv5738-133', 'Nike Store', 'US', 'la', 180, 'USD', '$', 'https://www.nike.com/t/zoom-vomero-5-womens-shoes-81TPKW/IV5738-133'),
  o('nike-nike-vomero-18-iv5666-097', 'Nike Store', 'US', 'nyc', 165, 'USD', '$', 'https://www.nike.com/t/vomero-18-mens-road-running-shoes-NzWnvcC8/IV5666-097'),
  o('nike-nike-vomero-18-iv5666-097', 'Nike Store', 'US', 'la', 165, 'USD', '$', 'https://www.nike.com/t/vomero-18-mens-road-running-shoes-NzWnvcC8/IV5666-097'),
  o('nike-nike-vomero-5-ix3919-060', 'Nike Store', 'US', 'nyc', 112, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-SKhO5HIO/IX3919-060'),
  o('nike-nike-vomero-5-ix3919-060', 'Nike Store', 'US', 'la', 112, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-SKhO5HIO/IX3919-060'),
  o('nike-nike-vomero-5-iv4687-045', 'Nike Store', 'US', 'nyc', 122, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-SKhO5HIO/IV4687-045'),
  o('nike-nike-vomero-5-iv4687-045', 'Nike Store', 'US', 'la', 122, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-SKhO5HIO/IV4687-045'),
  o('nike-nike-vomero-plus-hv8150-109', 'Nike Store', 'US', 'nyc', 180, 'USD', '$', 'https://www.nike.com/t/vomero-plus-mens-road-running-shoes-5npsVBwT/HV8150-109'),
  o('nike-nike-vomero-plus-hv8150-109', 'Nike Store', 'US', 'la', 180, 'USD', '$', 'https://www.nike.com/t/vomero-plus-mens-road-running-shoes-5npsVBwT/HV8150-109'),
  o('nike-nike-vomero-5-ib4698-411', 'Nike Store', 'US', 'nyc', 64.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-v85L8u7n/IB4698-411'),
  o('nike-nike-vomero-5-ib4698-411', 'Nike Store', 'US', 'la', 64.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-v85L8u7n/IB4698-411'),
  o('nike-nike-vomero-5-iv2595-133', 'Nike Store', 'US', 'nyc', 92, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-classic-laces-SKhO5HIO/IV2595-133'),
  o('nike-nike-vomero-5-iv2595-133', 'Nike Store', 'US', 'la', 92, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-classic-laces-SKhO5HIO/IV2595-133'),
  o('nike-nike-vomero-18-hq2157-701', 'Nike Store', 'US', 'nyc', 122, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-701'),
  o('nike-nike-vomero-18-hq2157-701', 'Nike Store', 'US', 'la', 122, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-701'),
  o('nike-nike-vomero-5-hf7000-600', 'Nike Store', 'US', 'nyc', 70, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-SKhO5HIO/HF7000-600'),
  o('nike-nike-vomero-5-hf7000-600', 'Nike Store', 'US', 'la', 70, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-SKhO5HIO/HF7000-600'),
  o('nike-nike-vomero-18-hq2157-007', 'Nike Store', 'US', 'nyc', 69.97, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-007'),
  o('nike-nike-vomero-18-hq2157-007', 'Nike Store', 'US', 'la', 69.97, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-007'),
  o('nike-nike-vomero-5-hf6999-008', 'Nike Store', 'US', 'nyc', 90, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-with-reflective-accents-SKhO5HIO/HF6999-008'),
  o('nike-nike-vomero-5-hf6999-008', 'Nike Store', 'US', 'la', 90, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-with-reflective-accents-SKhO5HIO/HF6999-008'),
  o('nike-nike-vomero-5-hf7000-009', 'Nike Store', 'US', 'nyc', 56.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-v85L8u7n/HF7000-009'),
  o('nike-nike-vomero-5-hf7000-009', 'Nike Store', 'US', 'la', 56.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-v85L8u7n/HF7000-009'),
  o('nike-nike-vomero-5-hf6999-004', 'Nike Store', 'US', 'nyc', 67.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-with-reflective-accents-v85L8u7n/HF6999-004'),
  o('nike-nike-vomero-5-hf6999-004', 'Nike Store', 'US', 'la', 67.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-little-kids-shoes-with-reflective-accents-v85L8u7n/HF6999-004'),
  o('nike-nike-vomero-5-hv5171-121', 'Nike Store', 'US', 'nyc', 69.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-v85L8u7n/HV5171-121'),
  o('nike-nike-vomero-5-hv5171-121', 'Nike Store', 'US', 'la', 69.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-big-kids-shoes-v85L8u7n/HV5171-121'),
  o('nike-nike-vomero-5-hf7000-105', 'Nike Store', 'US', 'nyc', 44.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-v85L8u7n/HF7000-105'),
  o('nike-nike-vomero-5-hf7000-105', 'Nike Store', 'US', 'la', 44.97, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-v85L8u7n/HF7000-105'),
  o('nike-nike-vomero-18-hq2157-012', 'Nike Store', 'US', 'nyc', 122, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-012'),
  o('nike-nike-vomero-18-hq2157-012', 'Nike Store', 'US', 'la', 122, 'USD', '$', 'https://www.nike.com/t/vomero-18-big-kids-road-running-shoes-Dldj35Yd/HQ2157-012'),
  o('nike-nike-vomero-5-hf7000-111', 'Nike Store', 'US', 'nyc', 72, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-SKhO5HIO/HF7000-111'),
  o('nike-nike-vomero-5-hf7000-111', 'Nike Store', 'US', 'la', 72, 'USD', '$', 'https://www.nike.com/t/vomero-5-baby-toddler-shoes-SKhO5HIO/HF7000-111'),
  o('nike-nike-sportswear-windrunner-if2821-084', 'Nike Store', 'US', 'nyc', 68, 'USD', '$', 'https://www.nike.com/t/sportswear-windrunner-big-kids-hooded-repel-jacket-fUNjyLas/IF2821-084'),
  o('nike-nike-sportswear-windrunner-if2821-084', 'Nike Store', 'US', 'la', 68, 'USD', '$', 'https://www.nike.com/t/sportswear-windrunner-big-kids-hooded-repel-jacket-fUNjyLas/IF2821-084'),
  o('nike-nike-miler-if2082-410', 'Nike Store', 'US', 'nyc', 37, 'USD', '$', 'https://www.nike.com/t/miler-mens-dri-fit-short-sleeve-running-top-W7gjEunO/IF2082-410'),
  o('nike-nike-miler-if2082-410', 'Nike Store', 'US', 'la', 37, 'USD', '$', 'https://www.nike.com/t/miler-mens-dri-fit-short-sleeve-running-top-W7gjEunO/IF2082-410'),
  o('nike-nike-miler-if2018-410', 'Nike Store', 'US', 'nyc', 37, 'USD', '$', 'https://www.nike.com/t/miler-mens-dri-fit-running-tank-top-sTQ1tmLA/IF2018-410'),
  o('nike-nike-miler-if2018-410', 'Nike Store', 'US', 'la', 37, 'USD', '$', 'https://www.nike.com/t/miler-mens-dri-fit-running-tank-top-sTQ1tmLA/IF2018-410'),
  o('nike-jannik-sinner-iz2725-100', 'Nike Store', 'US', 'nyc', 42, 'USD', '$', 'https://www.nike.com/t/jannik-sinner-mens-nikecourt-dri-fit-graphic-tennis-t-shirt-WbhXN8Y0/IZ2725-100'),
  o('nike-jannik-sinner-iz2725-100', 'Nike Store', 'US', 'la', 42, 'USD', '$', 'https://www.nike.com/t/jannik-sinner-mens-nikecourt-dri-fit-graphic-tennis-t-shirt-WbhXN8Y0/IZ2725-100'),

  // Nike Air Force 1

  // Nike Air Max 90

  // Nike Dunk Low

  // Nike Air Max 97

  // Nike Blazer Mid

  // Nike Air Max 270

  // Nike Cortez

  // Nike Air Jordan 1 Low

  // Nike Pegasus 41

  // Adidas Samba OG

  // Adidas Gazelle

  // Adidas Ultraboost

  // Adidas Superstar

  // Adidas Stan Smith
  o('adidas-stan-smith', 'Adidas Store', 'US', 'nyc', 100, 'USD', '$', 'https://www.adidas.com/us/stan-smith-shoes/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'US', 'la', 100, 'USD', '$', 'https://www.adidas.com/us/stan-smith-shoes/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'ES', 'mad', 110, 'EUR', '€', 'https://www.adidas.es/zapatilla-stan-smith/FX5502.html'),
  o('adidas-stan-smith', 'Adidas Store', 'AR', 'bue', 129999, 'ARS', '$', 'https://www.adidas.com.ar/zapatillas-stan-smith/FX5502.html'),

  // Adidas Campus 00s

  // Adidas Forum Low

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








  o('tnf-drew-peak-hoodie', 'The North Face Store', 'US', 'nyc', 80, 'USD', '$', 'https://www.thenorthface.com/en-us/mens/drew-peak-pullover-hoodie'),
  o('tnf-drew-peak-hoodie', 'The North Face Store', 'ES', 'mad', 85, 'EUR', '€', 'https://www.thenorthface.es/shop/es/tnf-es/drew-peak'),
  o('tnf-drew-peak-hoodie', 'The North Face Store', 'AR', 'bue', 109999, 'ARS', '$', 'https://www.thenorthface.com.ar/drew-peak/p'),


  o('converse-go-to-hoodie', 'Converse Store', 'US', 'nyc', 60, 'USD', '$', 'https://www.converse.com/shop/p/go-to-star-chevron-hoodie/10025411.html'),
  o('converse-go-to-hoodie', 'Converse Store', 'US', 'la', 60, 'USD', '$', 'https://www.converse.com/shop/p/go-to-star-chevron-hoodie/10025411.html'),
  o('converse-go-to-hoodie', 'Converse Store', 'ES', 'mad', 65, 'EUR', '€', 'https://www.converse.com/es/shop/p/go-to-star-chevron-hoodie/10025411.html'),


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









  o('converse-star-chevron-tee', 'Converse Store', 'US', 'nyc', 30, 'USD', '$', 'https://www.converse.com/shop/p/star-chevron-tee/10023876.html'),
  o('converse-star-chevron-tee', 'Converse Store', 'US', 'la', 30, 'USD', '$', 'https://www.converse.com/shop/p/star-chevron-tee/10023876.html'),
  o('converse-star-chevron-tee', 'Converse Store', 'ES', 'mad', 30, 'EUR', '€', 'https://www.converse.com/es/shop/p/star-chevron-tee/10023876.html'),



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
