import type { CountryType } from "../types/type";
import styles from "./CountryItem.module.css";

function CountryItem({ country }: {country: CountryType}) {
  return (
    <li className={styles.countryItem} key={country.id}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
