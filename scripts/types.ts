export interface Geo {
  name: string;
  country: string;
  subcountry: string;
  geonameid: string;
}

export type GeoTuple = [name: string, subcountry: string, geonameid: string];
