export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};
export type CityListType = {
  cities: CityType[] | null;
  isLoading: boolean;
};

export type CityItemType = {
  city: CityType;
};

export type CountryListType = {
  cities: CityType[] | null;
  isLoading: boolean;
};
export type CountryType = {
  country: string;
  emoji: string;
  id: string;
};

export type ButtonType = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>)=> void;
  type: string;
}