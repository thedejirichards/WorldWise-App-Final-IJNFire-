export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number | string | null;
    lng: number | string | null;
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
};

export type CitiesContextType = {
  cities: CityType[] | null;
  // setCities: React.Dispatch<React.SetStateAction<CityType[] | null>>;
  isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: CityType | null;
  // setCurrentCity: React.Dispatch<React.SetStateAction<CityType | null>>;
  fetchCity: (id: string) => void;
  createCity: (city: CityType) => void;
  deleteCity: (id: string) => void;
};

export type GeolocationPositionType = {
  lat: string | number;
  lng: string | number;
};

export type ReducerStatesType = {
  cities: CityType[] | null;
  isLoading: boolean;
  currentCity: CityType | null;
  error: string;
};

export type ReducerActionType =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] }
  | { type: "city/loaded"; payload: CityType }
  | { type: "city/created"; payload: CityType }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

export type AuthContextTypes = {
  user: FAKE_USERType | null;
  isAuthenticated: boolean;
  error: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type ReducerStates = {
  user: FAKE_USERType | null;
  isAuthenticated: boolean;
  error: string;
};

export type ReducerAction =
  | { type: "login"; payload: FAKE_USERType }
  | { type: "logout" }
  | { type: "error" };

export type FAKE_USERType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
