import { collection, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { COLLECTIONS } from '@/integrations/firebase/collections';
import type { CountryDoc } from '@/integrations/firebase/types';
import type { Country } from '@/data/locations';
import { chunkArray } from './helpers';

export function countryToDoc(country: Country): CountryDoc {
  return {
    code: country.code,
    name: country.name,
    flag: country.flag,
    currency: country.currency,
    currencySymbol: country.currencySymbol,
    cities: country.cities.map((city) => ({ id: city.id, name: city.name })),
  };
}

export async function listCountries(): Promise<Country[]> {
  const snap = await getDocs(collection(db, COLLECTIONS.countries));
  return snap.docs.map((item) => {
    const data = item.data() as CountryDoc;
    return {
      code: data.code,
      name: data.name,
      flag: data.flag,
      currency: data.currency,
      currencySymbol: data.currencySymbol,
      cities: data.cities || [],
    };
  });
}

export async function upsertCountries(countries: Country[]): Promise<number> {
  let written = 0;
  for (const group of chunkArray(countries, 400)) {
    const batch = writeBatch(db);
    group.forEach((country) => {
      batch.set(doc(db, COLLECTIONS.countries, country.code), countryToDoc(country), { merge: true });
    });
    await batch.commit();
    written += group.length;
  }
  return written;
}

export async function upsertCountry(country: Country): Promise<void> {
  await setDoc(doc(db, COLLECTIONS.countries, country.code), countryToDoc(country), { merge: true });
}
