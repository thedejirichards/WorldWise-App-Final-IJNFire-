import { useEffect, useState } from "react";
import type { CityItemType } from "../types/type";
import styles from "./CityItem.module.css";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const BASE_URL = "https://flagsapi.com";
function CityItem({ city }: CityItemType) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isImgLoading, setImgLoading] = useState<boolean>(false);
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  const { cityName, emoji, date, id, position } = city;

  useEffect(() => {
    if (emoji) {
      setImgLoading(true);
      const url = `${BASE_URL}/${emoji}/shiny/64.png`;
      setImgSrc(url);
      setImgLoading(false);
    }
  }, [emoji]);

  return (
    <li>
      <Link to={`${id}?lat=${position.lat} &lng=${position.lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>
          {isImgLoading ? (
            <Spinner />
          ) : (
            <img
              src={imgSrc ? imgSrc : `${BASE_URL}/NG/shiny/64.png`}
              className={styles.img}
            />
          )}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
