import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type {
  CitiesContextType,
  CityType,
  ReducerActionType,
  ReducerStatesType,
} from "../types/type";

const initialState = {
  cities: null,
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: ReducerStatesType, action: ReducerActionType) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        error: "",
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...(state.cities || []), action.payload],
        currentCity: action.payload
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities
          ? state.cities.filter((city) => city.id !== action.payload)
          : state.cities,
        currentCity: null
        };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

const CitiesContext = createContext<CitiesContextType | null>(null);
const BASE_URL = "http://localhost:8000";
function CitiesContextProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching cities",
        });
      }
    };
    fetchCities();
  }, []);

  const fetchCity = useCallback (async function fetchCity (id: string) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching city",
      });
    }
  }, []);

  const createCity = async (newCity: CityType) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  };

  const deleteCity = async (idd: string) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${idd}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: idd });
    } catch {
      throw new Error("There was an error creating city");
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
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
