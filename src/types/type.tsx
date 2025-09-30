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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
};

export type CitiesContextType = {
  cities: CityType[] | null;
  setCities: React.Dispatch<React.SetStateAction<CityType[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: CityType  | null;
  setCurrentCity: React.Dispatch<React.SetStateAction<CityType  | null>>;
  fetchCity: (id: string)=> void
};

export type GeolocationPositionType = {
  lat: string | number;
  lng: string | number;
}