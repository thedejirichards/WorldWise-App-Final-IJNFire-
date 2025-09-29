import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={()=> navigate(`form`)}>
      <h1>Map</h1>
      <p>
        {lat}, {lng}
      </p>
      <button
        onClick={() => {
          setSearchParams({ lat: "23", lng: "20" });
        }}
      >
        Click to reset
      </button>
    </div>
  );
}

export default Map;
