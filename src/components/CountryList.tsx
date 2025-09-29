import type { CityType, CountryListType, CountryType } from "../types/type";
import styles from "./CityList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
function CountriesList({ cities, isLoading }: CountryListType) {
  if (isLoading) return <Spinner />;
  if (!cities?.length) return <Message message="There are no Countries here" />;
  const countries = cities.reduce((arr: CountryType[], city: CityType) => {
    if(!arr.map((el)=> el.country).includes(city.country)) return [...arr, {
      country: city.country,
      emoji: city.emoji,
      id: city.id
    }]
    else return arr
  }, [])
  return (
    <ul className={styles.countriesList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id}/>
      ))}
    </ul>
  );
}

export default CountriesList;