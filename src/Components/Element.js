import styles from "./Element.module.css";
import images from "../image 1.png";
function Element(props) {
  //It is the Component to render each content box
  return (
    <div className={styles.element}>
      <img src={images} alt="map" className={styles.map}></img>
      <div className={styles.content}>{/* It is  to render content of each content box */}
        <p className={styles.content_ride}>Ride Id : {props.id}</p>
        <p className={styles.content_origin}>Origin Station : {props.os}</p>
        <p className={styles.content_station_path}>
          Station Path: {"[ " + props.sp.join(" , ") + " ]"}
        </p>
        <p className={styles.content_date}>
          Date:{" "}
          {new Date(props.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p className={styles.content_distance}>Distance: {props.dist}</p>
      </div>
      <div className={styles.city}>
        <p>{props.city}</p>
        <p>{props.state}</p>
      </div>
    </div>
  );
}
export default Element;
