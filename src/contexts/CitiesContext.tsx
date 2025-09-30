import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CitiesContextType, CityType } from "../types/type";

const CitiesContext = createContext<CitiesContextType | null>(null);
const BASE_URL = "http://localhost:8000";
function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const fetchCity = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      throw new Error("There was an error fetching city");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        currentCity,
        setCurrentCity,
        fetchCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("CitiesContext is used outside provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesContextProvider, useCities };
