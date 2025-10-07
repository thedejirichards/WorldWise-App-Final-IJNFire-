// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState<string>("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] =
    useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string>("");
  const [lat, lng] = useUrlPosition();
  useEffect(() => {
    if (!lat && !lng) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeolocation(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    };
    fetchCityData();
  }, [lat, lng, setCityName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: crypto.randomUUID(),
    };
    await createCity(newCity);
    navigate("/app/cities");
  };
  if (isLoadingGeolocation) return <Spinner />;
  if (!lat && !lng)
    return <Message message="start by clicking a city in the map" />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName || ""}
        />
        <span className={styles.flag}>
          <img
            src={`https://flagsapi.com/${emoji}/shiny/64.png`}
            alt={emoji}
            className={styles.flagImage}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date: Date | null) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
