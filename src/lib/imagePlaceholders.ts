function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildPremiumPlaceholder(title: string): string {
  const safeTitle = escapeXml(title.trim().slice(0, 44) || 'Producto GlobalWear');
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${safeTitle}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="55%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.28" />
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#bg)" />
  <circle cx="260" cy="240" r="220" fill="url(#accent)" />
  <circle cx="980" cy="930" r="290" fill="url(#accent)" opacity="0.4" />
  <rect x="150" y="760" width="900" height="2" fill="#e2e8f0" opacity="0.18" />
  <g fill="#f8fafc" opacity="0.94">
    <rect x="170" y="340" width="860" height="250" rx="46" />
  </g>
  <text x="600" y="490" text-anchor="middle" fill="#0f172a" font-size="68" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="700">Imagen en validacion</text>
  <text x="600" y="850" text-anchor="middle" fill="#e2e8f0" font-size="44" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="600">${safeTitle}</text>
  <text x="600" y="915" text-anchor="middle" fill="#94a3b8" font-size="34" font-family="system-ui, -apple-system, Segoe UI, sans-serif" letter-spacing="2">GLOBALWEAR VERIFIED</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
