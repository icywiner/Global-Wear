import fs from 'node:fs/promises';

const ROOT = process.cwd();
const PRODUCTS_PATH = `${ROOT}/Global-Wear/src/data/products.ts`;
const OFFICIAL_IMAGE_HOSTS = new Set([
  'static.nike.com',
  'assets.adidas.com',
  'images.puma.com',
  'nb.scene7.com',
  'images.champion.com',
  'images.thenorthface.com',
  'lsco.scene7.com',
  'www.converse.com',
  'images.vans.com',
]);

function extractString(line, prop) {
  const match = line.match(new RegExp(`${prop}:\\s*(["'])(.*?)\\1`));
  return match ? match[2] : '';
}

function extractUrls(line) {
  return [...line.matchAll(/https?:\/\/[^'"\s\]]+/g)].map((match) => match[0]);
}

function unique(values) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function isOfficialHost(url) {
  try {
    return OFFICIAL_IMAGE_HOSTS.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
}

function parseProducts(text) {
  const start = text.indexOf('const rawProducts: Product[] = [');
  const end = text.indexOf('export const products: Product[]', start);
  const block = text.slice(start, end);

  return block
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith('{ id:'))
    .map((line) => ({
      id: extractString(line, 'id'),
      name: extractString(line, 'name'),
      brand: extractString(line, 'brand'),
      category: extractString(line, 'category'),
      images: unique(extractUrls(line)),
      raw: line.trim(),
    }));
}

function parseCategories(text) {
  const start = text.indexOf('export const categories');
  const end = text.indexOf('const rawProducts: Product[] = [', start);
  const block = text.slice(start, end);
  return block
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith('{ id:'))
    .map((line) => ({
      id: extractString(line, 'id'),
      label: extractString(line, 'label'),
      image: extractString(line, 'image'),
      raw: line.trim(),
    }));
}

async function main() {
  const text = await fs.readFile(PRODUCTS_PATH, 'utf8');
  const products = parseProducts(text);
  const categories = parseCategories(text);

  const urlToProducts = new Map();
  for (const product of products) {
    for (const url of product.images) {
      const list = urlToProducts.get(url) || [];
      list.push(product.id);
      urlToProducts.set(url, list);
    }
  }

  const duplicateUrls = [...urlToProducts.entries()].filter(([, ids]) => ids.length > 1);

  const productRows = [];
  let validProducts = 0;
  let missingProducts = 0;
  let invalidProducts = 0;
  let unverifiedProducts = 0;

  for (const product of products) {
    let status = 'VALIDA';
    const url = product.images[0] || '';

    if (product.images.length === 0) {
      status = 'FALTANTE';
      missingProducts += 1;
    } else if (!/^https?:\/\//i.test(url)) {
      status = 'URL_INVALIDA';
      invalidProducts += 1;
    } else if (!isOfficialHost(url)) {
      status = 'NO_VERIFICADA';
      unverifiedProducts += 1;
    } else if (duplicateUrls.some(([dupUrl, ids]) => dupUrl === url && ids.length > 1)) {
      const ids = urlToProducts.get(url) || [];
      const brands = new Set(ids.map((id) => products.find((item) => item.id === id)?.brand).filter(Boolean));
      const categories = new Set(ids.map((id) => products.find((item) => item.id === id)?.category).filter(Boolean));

      status = brands.size > 1 || categories.size > 1 ? 'NO_CORRESPONDE' : 'NO_VERIFICADA';
      unverifiedProducts += 1;
    } else {
      validProducts += 1;
    }

    productRows.push({
      Producto: product.name,
      Marca: product.brand,
      Categoria: product.category,
      Imagen: url ? 'SI' : 'NO',
      URL: url || '-',
      Estado: status,
    });
  }

  const categoryRows = [];
  let validCategories = 0;
  let missingCategories = 0;
  let invalidCategories = 0;
  let unverifiedCategories = 0;

  for (const category of categories) {
    let status = 'VALIDA';
    const url = category.image || '';

    if (!url) {
      status = 'FALTANTE';
      missingCategories += 1;
    } else if (!/^https?:\/\//i.test(url)) {
      status = 'URL_INVALIDA';
      invalidCategories += 1;
    } else if (!isOfficialHost(url)) {
      status = 'NO_VERIFICADA';
      unverifiedCategories += 1;
    } else {
      validCategories += 1;
    }

    categoryRows.push({
      Categoria: category.label,
      Imagen: url ? 'SI' : 'NO',
      URL: url || '-',
      Estado: status,
    });
  }

  const brandNames = [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b));
  const brandRows = brandNames.map((brand) => {
    const brandProducts = products.filter((product) => product.brand === brand);
    const sourceUrls = unique(brandProducts.flatMap((product) => product.images));

    let status = 'VALIDA';
    if (sourceUrls.length === 0) {
      status = 'FALTANTE';
    } else if (sourceUrls.some((url) => !isOfficialHost(url))) {
      status = 'NO_VERIFICADA';
    }

    return {
      Marca: brand,
      Imagenes: sourceUrls.length,
      Estado: status,
    };
  });

  const output = [
    '# Image Audit',
    '',
    `Products audited: ${products.length}`,
    `Products valid: ${validProducts}`,
    `Products missing image: ${missingProducts}`,
    `Products invalid image URL: ${invalidProducts}`,
    `Products not verified: ${unverifiedProducts}`,
    `Categories audited: ${categories.length}`,
    `Categories valid: ${validCategories}`,
    `Categories missing image: ${missingCategories}`,
    `Categories invalid image URL: ${invalidCategories}`,
    `Categories not verified: ${unverifiedCategories}`,
    '',
    '## Products',
    '',
    '| Producto | Marca | Categoría | Imagen | URL | Estado |',
    '| --- | --- | --- | --- | --- | --- |',
    ...productRows.map((row) => `| ${row.Producto} | ${row.Marca} | ${row.Categoria} | ${row.Imagen} | ${row.URL} | ${row.Estado} |`),
    '',
    '## Categories',
    '',
    '| Categoría | Imagen | URL | Estado |',
    '| --- | --- | --- | --- |',
    ...categoryRows.map((row) => `| ${row.Categoria} | ${row.Imagen} | ${row.URL} | ${row.Estado} |`),
    '',
    '## Brands',
    '',
    '| Marca | Imagenes | Estado |',
    '| --- | --- | --- |',
    ...brandRows.map((row) => `| ${row.Marca} | ${row.Imagenes} | ${row.Estado} |`),
    '',
    '## Duplicate URLs',
    '',
    ...duplicateUrls.map(([url, ids]) => `- ${url} => ${ids.join(', ')}`),
  ].join('\n');

  await fs.writeFile(`${ROOT}/Global-Wear/image-audit.md`, output, 'utf8');

  console.log(JSON.stringify({
    products: {
      audited: products.length,
      valid: validProducts,
      missing: missingProducts,
      invalid: invalidProducts,
      notVerified: unverifiedProducts,
    },
    categories: {
      audited: categories.length,
      valid: validCategories,
      missing: missingCategories,
      invalid: invalidCategories,
      notVerified: unverifiedCategories,
    },
    duplicateUrls: duplicateUrls.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
