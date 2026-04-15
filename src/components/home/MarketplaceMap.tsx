import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import type { StorePoint } from '@/data/catalog';

interface MarketplaceMapProps {
  stores: StorePoint[];
  storeProducts: Map<string, string[]>;
  selectedStoreKey: string | null;
  onSelectStore: (storeKey: string | null) => void;
}

function markerIcon(active: boolean): L.DivIcon {
  return L.divIcon({
    html: `<span class="map-pin ${active ? 'map-pin-active' : ''}"></span>`,
    className: 'map-pin-wrapper',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const clusterIcon = (cluster: { getChildCount: () => number }) =>
  L.divIcon({
    html: `<span class="map-cluster">${cluster.getChildCount()}</span>`,
    className: 'map-cluster-wrapper',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });

export default function MarketplaceMap({ stores, storeProducts, selectedStoreKey, onSelectStore }: MarketplaceMapProps) {
  const defaultCenter = useMemo(() => {
    if (stores.length === 0) return { lat: 40.4168, lng: -3.7038 };

    const lat = stores.reduce((sum, store) => sum + store.latitude, 0) / stores.length;
    const lng = stores.reduce((sum, store) => sum + store.longitude, 0) / stores.length;

    return { lat, lng };
  }, [stores]);

  return (
    <div className="h-[560px] w-full overflow-hidden rounded-3xl border border-border bg-card">
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={12}
        minZoom={3}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading iconCreateFunction={clusterIcon}>
          {stores.map((store) => (
            <Marker
              key={store.storeKey}
              position={[store.latitude, store.longitude]}
              icon={markerIcon(selectedStoreKey === store.storeKey)}
              eventHandlers={{
                click: () => {
                  onSelectStore(store.storeKey);
                },
              }}
            >
              <Popup>
                <div className="min-w-[210px]">
                  <p className="text-sm font-semibold">{store.store}</p>
                  <p className="text-xs text-slate-600">{store.cityName}, {store.countryName}</p>
                  <p className="text-xs mt-1">Productos: {store.productsCount}</p>
                  <p className="text-xs">Rango: ${store.minPriceUSD.toFixed(0)} - ${store.maxPriceUSD.toFixed(0)} USD</p>
                  {(storeProducts.get(store.storeKey) || []).length > 0 && (
                    <ul className="mt-2 text-xs text-slate-700 list-disc pl-4">
                      {(storeProducts.get(store.storeKey) || []).map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
