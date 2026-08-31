export interface FloridaLocation {
  zip: string;
  city: string;
  state: 'FL';
  county: string;
  isFlorida: boolean;
}

// Major Florida zip code database mapping
const FL_ZIP_REGIONS: Record<string, { city: string; county: string }> = {
  // Miami-Dade & Keys
  '33101': { city: 'Miami', county: 'Miami-Dade' },
  '33109': { city: 'Miami Beach', county: 'Miami-Dade' },
  '33125': { city: 'Miami', county: 'Miami-Dade' },
  '33129': { city: 'Brickell / Miami', county: 'Miami-Dade' },
  '33130': { city: 'Miami', county: 'Miami-Dade' },
  '33131': { city: 'Downtown Miami', county: 'Miami-Dade' },
  '33133': { city: 'Coconut Grove', county: 'Miami-Dade' },
  '33134': { city: 'Coral Gables', county: 'Miami-Dade' },
  '33139': { city: 'Miami Beach', county: 'Miami-Dade' },
  '33140': { city: 'Miami Beach', county: 'Miami-Dade' },
  '33141': { city: 'Miami Beach', county: 'Miami-Dade' },
  '33143': { city: 'South Miami', county: 'Miami-Dade' },
  '33145': { city: 'Miami', county: 'Miami-Dade' },
  '33149': { city: 'Key Biscayne', county: 'Miami-Dade' },
  '33156': { city: 'Pinecrest', county: 'Miami-Dade' },
  '33157': { city: 'Palmetto Bay', county: 'Miami-Dade' },
  '33160': { city: 'North Miami Beach', county: 'Miami-Dade' },
  '33166': { city: 'Miami Springs', county: 'Miami-Dade' },
  '33178': { city: 'Doral', county: 'Miami-Dade' },
  '33180': { city: 'Aventura', county: 'Miami-Dade' },
  '33186': { city: 'Kendall', county: 'Miami-Dade' },
  '33040': { city: 'Key West', county: 'Monroe' },
  '33050': { city: 'Marathon', county: 'Monroe' },

  // Broward (Fort Lauderdale area)
  '33301': { city: 'Fort Lauderdale', county: 'Broward' },
  '33304': { city: 'Fort Lauderdale', county: 'Broward' },
  '33308': { city: 'Fort Lauderdale', county: 'Broward' },
  '33309': { city: 'Oakland Park', county: 'Broward' },
  '33311': { city: 'Fort Lauderdale', county: 'Broward' },
  '33312': { city: 'Fort Lauderdale', county: 'Broward' },
  '33313': { city: 'Lauderhill', county: 'Broward' },
  '33316': { city: 'Fort Lauderdale', county: 'Broward' },
  '33321': { city: 'Tamarac', county: 'Broward' },
  '33322': { city: 'Plantation', county: 'Broward' },
  '33324': { city: 'Plantation', county: 'Broward' },
  '33326': { city: 'Weston', county: 'Broward' },
  '33328': { city: 'Cooper City', county: 'Broward' },
  '33330': { city: 'Davie', county: 'Broward' },
  '33334': { city: 'Oakland Park', county: 'Broward' },
  '33020': { city: 'Hollywood', county: 'Broward' },
  '33024': { city: 'Hollywood', county: 'Broward' },
  '33026': { city: 'Pembroke Pines', county: 'Broward' },
  '33027': { city: 'Miramar', county: 'Broward' },
  '33062': { city: 'Pompano Beach', county: 'Broward' },
  '33065': { city: 'Coral Springs', county: 'Broward' },
  '33076': { city: 'Parkland', county: 'Broward' },

  // Palm Beach
  '33401': { city: 'West Palm Beach', county: 'Palm Beach' },
  '33407': { city: 'West Palm Beach', county: 'Palm Beach' },
  '33408': { city: 'North Palm Beach', county: 'Palm Beach' },
  '33410': { city: 'Palm Beach Gardens', county: 'Palm Beach' },
  '33411': { city: 'Royal Palm Beach', county: 'Palm Beach' },
  '33414': { city: 'Wellington', county: 'Palm Beach' },
  '33418': { city: 'Palm Beach Gardens', county: 'Palm Beach' },
  '33431': { city: 'Boca Raton', county: 'Palm Beach' },
  '33432': { city: 'Boca Raton', county: 'Palm Beach' },
  '33433': { city: 'Boca Raton', county: 'Palm Beach' },
  '33435': { city: 'Boynton Beach', county: 'Palm Beach' },
  '33444': { city: 'Delray Beach', county: 'Palm Beach' },
  '33445': { city: 'Delray Beach', county: 'Palm Beach' },
  '33458': { city: 'Jupiter', county: 'Palm Beach' },
  '33470': { city: 'Loxahatchee', county: 'Palm Beach' },
  '33480': { city: 'Palm Beach', county: 'Palm Beach' },

  // Orlando / Orange / Seminole
  '32801': { city: 'Downtown Orlando', county: 'Orange' },
  '32803': { city: 'Orlando', county: 'Orange' },
  '32804': { city: 'Orlando (College Park)', county: 'Orange' },
  '32806': { city: 'Orlando', county: 'Orange' },
  '32819': { city: 'Orlando (Dr. Phillips)', county: 'Orange' },
  '32822': { city: 'Orlando', county: 'Orange' },
  '32825': { city: 'Orlando', county: 'Orange' },
  '32828': { city: 'Orlando (Alafaya)', county: 'Orange' },
  '32835': { city: 'Orlando (MetroWest)', county: 'Orange' },
  '32836': { city: 'Orlando (Windermere)', county: 'Orange' },
  '32837': { city: 'Orlando (Hunters Creek)', county: 'Orange' },
  '32789': { city: 'Winter Park', county: 'Orange' },
  '32792': { city: 'Winter Park', county: 'Orange' },
  '32750': { city: 'Longwood', county: 'Seminole' },
  '32779': { city: 'Wekiva Springs', county: 'Seminole' },
  '32746': { city: 'Lake Mary', county: 'Seminole' },
  '32771': { city: 'Sanford', county: 'Seminole' },
  '32707': { city: 'Casselberry', county: 'Seminole' },
  '32765': { city: 'Oviedo', county: 'Seminole' },
  '34787': { city: 'Winter Garden', county: 'Orange' },
  '34786': { city: 'Windermere', county: 'Orange' },
  '34711': { city: 'Clermont', county: 'Lake' },

  // Tampa Bay / Hillsborough / Pinellas
  '33601': { city: 'Tampa', county: 'Hillsborough' },
  '33602': { city: 'Downtown Tampa', county: 'Hillsborough' },
  '33606': { city: 'Tampa (Hyde Park)', county: 'Hillsborough' },
  '33609': { city: 'South Tampa', county: 'Hillsborough' },
  '33611': { city: 'South Tampa', county: 'Hillsborough' },
  '33618': { city: 'Tampa (Carrollwood)', county: 'Hillsborough' },
  '33624': { city: 'Tampa (Northdale)', county: 'Hillsborough' },
  '33626': { city: 'Tampa (Westchase)', county: 'Hillsborough' },
  '33629': { city: 'South Tampa (Palma Ceia)', county: 'Hillsborough' },
  '33647': { city: 'Tampa (New Tampa)', county: 'Hillsborough' },
  '33511': { city: 'Brandon', county: 'Hillsborough' },
  '33578': { city: 'Riverview', county: 'Hillsborough' },
  '33701': { city: 'Downtown St. Petersburg', county: 'Pinellas' },
  '33704': { city: 'St. Petersburg (Old Northeast)', county: 'Pinellas' },
  '33705': { city: 'St. Petersburg', county: 'Pinellas' },
  '33707': { city: 'St. Petersburg', county: 'Pinellas' },
  '33710': { city: 'St. Petersburg', county: 'Pinellas' },
  '33755': { city: 'Clearwater', county: 'Pinellas' },
  '33756': { city: 'Clearwater', county: 'Pinellas' },
  '33764': { city: 'Clearwater', county: 'Pinellas' },
  '33770': { city: 'Largo', county: 'Pinellas' },
  '33785': { city: 'Indian Rocks Beach', county: 'Pinellas' },
  '34689': { city: 'Tarpon Springs', county: 'Pinellas' },
  '34698': { city: 'Dunedin', county: 'Pinellas' },

  // Jacksonville / Duval / St. Johns
  '32201': { city: 'Jacksonville', county: 'Duval' },
  '32202': { city: 'Downtown Jacksonville', county: 'Duval' },
  '32204': { city: 'Jacksonville (Riverside)', county: 'Duval' },
  '32205': { city: 'Jacksonville (Avondale)', county: 'Duval' },
  '32207': { city: 'Jacksonville (San Marco)', county: 'Duval' },
  '32210': { city: 'Jacksonville', county: 'Duval' },
  '32224': { city: 'Jacksonville Beach', county: 'Duval' },
  '32225': { city: 'Jacksonville', county: 'Duval' },
  '32250': { city: 'Jacksonville Beach', county: 'Duval' },
  '32256': { city: 'Jacksonville (Southside)', county: 'Duval' },
  '32258': { city: 'Jacksonville (Mandarin)', county: 'Duval' },
  '32259': { city: 'Saint Johns', county: 'St. Johns' },
  '32080': { city: 'St. Augustine', county: 'St. Johns' },
  '32082': { city: 'Ponte Vedra Beach', county: 'St. Johns' },
  '32084': { city: 'St. Augustine', county: 'St. Johns' },
  '32086': { city: 'St. Augustine', county: 'St. Johns' },
  '32092': { city: 'St. Augustine', county: 'St. Johns' },

  // Southwest Florida (Fort Myers, Naples, Sarasota, Cape Coral)
  '33901': { city: 'Fort Myers', county: 'Lee' },
  '33908': { city: 'Fort Myers', county: 'Lee' },
  '33912': { city: 'Fort Myers', county: 'Lee' },
  '33914': { city: 'Cape Coral', county: 'Lee' },
  '33904': { city: 'Cape Coral', county: 'Lee' },
  '33990': { city: 'Cape Coral', county: 'Lee' },
  '33950': { city: 'Punta Gorda', county: 'Charlotte' },
  '33952': { city: 'Port Charlotte', county: 'Charlotte' },
  '34102': { city: 'Naples (Old Naples)', county: 'Collier' },
  '34103': { city: 'Naples', county: 'Collier' },
  '34108': { city: 'Naples (Pelican Bay)', county: 'Collier' },
  '34109': { city: 'Naples', county: 'Collier' },
  '34110': { city: 'Naples', county: 'Collier' },
  '34119': { city: 'Naples', county: 'Collier' },
  '34135': { city: 'Bonita Springs', county: 'Lee' },
  '34145': { city: 'Marco Island', county: 'Collier' },
  '34236': { city: 'Sarasota', county: 'Sarasota' },
  '34238': { city: 'Sarasota (Palmer Ranch)', county: 'Sarasota' },
  '34241': { city: 'Sarasota', county: 'Sarasota' },
  '34285': { city: 'Venice', county: 'Sarasota' },
  '34293': { city: 'Venice', county: 'Sarasota' },
  '34205': { city: 'Bradenton', county: 'Manatee' },
  '34209': { city: 'Bradenton', county: 'Manatee' },
  '34211': { city: 'Lakewood Ranch', county: 'Manatee' },

  // Space & Treasure Coast
  '32901': { city: 'Melbourne', county: 'Brevard' },
  '32904': { city: 'Melbourne', county: 'Brevard' },
  '32935': { city: 'Melbourne', county: 'Brevard' },
  '32937': { city: 'Satellite Beach', county: 'Brevard' },
  '32953': { city: 'Merritt Island', county: 'Brevard' },
  '32960': { city: 'Vero Beach', county: 'Indian River' },
  '32963': { city: 'Vero Beach (Barrier Island)', county: 'Indian River' },
  '34952': { city: 'Port St. Lucie', county: 'St. Lucie' },
  '34953': { city: 'Port St. Lucie', county: 'St. Lucie' },
  '34983': { city: 'Port St. Lucie', county: 'St. Lucie' },
  '34990': { city: 'Palm City', county: 'Martin' },
  '34994': { city: 'Stuart', county: 'Martin' },
  '34997': { city: 'Stuart', county: 'Martin' },

  // Central / Volusia / Marion / Polk
  '32114': { city: 'Daytona Beach', county: 'Volusia' },
  '32118': { city: 'Daytona Beach', county: 'Volusia' },
  '32127': { city: 'Ponce Inlet', county: 'Volusia' },
  '32168': { city: 'New Smyrna Beach', county: 'Volusia' },
  '32725': { city: 'Deltona', county: 'Volusia' },
  '34471': { city: 'Ocala', county: 'Marion' },
  '34474': { city: 'Ocala', county: 'Marion' },
  '34480': { city: 'Ocala', county: 'Marion' },
  '32162': { city: 'The Villages', county: 'Sumter' },
  '32163': { city: 'The Villages', county: 'Sumter' },
  '33801': { city: 'Lakeland', county: 'Polk' },
  '33811': { city: 'Lakeland', county: 'Polk' },
  '33813': { city: 'Lakeland', county: 'Polk' },
  '33880': { city: 'Winter Haven', county: 'Polk' },

  // North & Panhandle
  '32301': { city: 'Tallahassee', county: 'Leon' },
  '32308': { city: 'Tallahassee', county: 'Leon' },
  '32312': { city: 'Tallahassee', county: 'Leon' },
  '32601': { city: 'Gainesville', county: 'Alachua' },
  '32605': { city: 'Gainesville', county: 'Alachua' },
  '32608': { city: 'Gainesville', county: 'Alachua' },
  '32401': { city: 'Panama City', county: 'Bay' },
  '32405': { city: 'Panama City', county: 'Bay' },
  '32413': { city: 'Panama City Beach', county: 'Bay' },
  '32459': { city: 'Santa Rosa Beach (30A)', county: 'Walton' },
  '32501': { city: 'Pensacola', county: 'Escambia' },
  '32503': { city: 'Pensacola', county: 'Escambia' },
  '32504': { city: 'Pensacola', county: 'Escambia' },
  '32561': { city: 'Gulf Breeze', county: 'Santa Rosa' },
  '32566': { city: 'Navarre', county: 'Santa Rosa' },
};

/**
 * Validates whether a zip code is in the Florida geographic range (32004 - 34997)
 */
export function isFloridaZip(zip: string): boolean {
  const cleanZip = zip.replace(/\D/g, '').trim();
  if (cleanZip.length !== 5) return false;
  const num = parseInt(cleanZip, 10);
  return num >= 32004 && num <= 34997;
}

/**
 * Resolves a zip code to a Florida City, County, and metadata.
 */
export function lookupFloridaZip(zip: string): FloridaLocation | null {
  const cleanZip = zip.replace(/\D/g, '').trim();
  if (!isFloridaZip(cleanZip)) {
    return null;
  }

  // Check direct lookup table
  if (FL_ZIP_REGIONS[cleanZip]) {
    return {
      zip: cleanZip,
      city: FL_ZIP_REGIONS[cleanZip].city,
      state: 'FL',
      county: FL_ZIP_REGIONS[cleanZip].county,
      isFlorida: true,
    };
  }

  // Smart regional fallback based on FL zip prefix
  const prefix3 = cleanZip.substring(0, 3);
  let defaultCity = 'Orlando';
  let defaultCounty = 'Orange';

  if (['330', '331', '332'].includes(prefix3)) {
    defaultCity = 'Miami / South Florida';
    defaultCounty = 'Miami-Dade';
  } else if (['333'].includes(prefix3)) {
    defaultCity = 'Fort Lauderdale area';
    defaultCounty = 'Broward';
  } else if (['334'].includes(prefix3)) {
    defaultCity = 'West Palm Beach area';
    defaultCounty = 'Palm Beach';
  } else if (['335', '336', '337'].includes(prefix3)) {
    defaultCity = 'Tampa Bay area';
    defaultCounty = 'Hillsborough';
  } else if (['338'].includes(prefix3)) {
    defaultCity = 'Lakeland / Central Florida';
    defaultCounty = 'Polk';
  } else if (['339', '341'].includes(prefix3)) {
    defaultCity = 'Fort Myers / Naples area';
    defaultCounty = 'Lee';
  } else if (['342'].includes(prefix3)) {
    defaultCity = 'Sarasota / Bradenton';
    defaultCounty = 'Sarasota';
  } else if (['346'].includes(prefix3)) {
    defaultCity = 'Clearwater / Pasco';
    defaultCounty = 'Pinellas';
  } else if (['347', '328', '327'].includes(prefix3)) {
    defaultCity = 'Greater Orlando';
    defaultCounty = 'Orange';
  } else if (['320', '322'].includes(prefix3)) {
    defaultCity = 'Greater Jacksonville';
    defaultCounty = 'Duval';
  } else if (['321'].includes(prefix3)) {
    defaultCity = 'Daytona Beach area';
    defaultCounty = 'Volusia';
  } else if (['323'].includes(prefix3)) {
    defaultCity = 'Tallahassee area';
    defaultCounty = 'Leon';
  } else if (['324', '325'].includes(prefix3)) {
    defaultCity = 'Pensacola / Panhandle';
    defaultCounty = 'Escambia';
  } else if (['326'].includes(prefix3)) {
    defaultCity = 'Gainesville area';
    defaultCounty = 'Alachua';
  } else if (['329', '349'].includes(prefix3)) {
    defaultCity = 'Treasure / Space Coast';
    defaultCounty = 'Brevard';
  }

  return {
    zip: cleanZip,
    city: defaultCity,
    state: 'FL',
    county: defaultCounty,
    isFlorida: true,
  };
}
