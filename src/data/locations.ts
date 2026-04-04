export interface City {
  id: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  cities: City[];
}

export const countries: Country[] = [
  {
    code: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    cities: [
      { id: 'nyc', name: 'New York' },
      { id: 'la', name: 'Los Angeles' },
    ],
  },
  {
    code: 'ES',
    name: 'España',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    cities: [
      { id: 'mad', name: 'Madrid' },
      { id: 'bcn', name: 'Barcelona' },
    ],
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    currency: 'ARS',
    currencySymbol: '$',
    cities: [
      { id: 'bue', name: 'Buenos Aires' },
      { id: 'cor', name: 'Córdoba' },
    ],
  },
];
