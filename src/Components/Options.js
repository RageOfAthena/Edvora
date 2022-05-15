import styles from "./Options.module.css";
import "./style.css";
import vector from "../Vector.png";
import vector1 from "../sprite.svg";
import { useState } from "react";
import { nanoid } from "nanoid";
function Options(props) {
  const [clickedwhat, onClickedwhat] = useState("Nearest rides");
  const [filter, onFilter] = useState(false);
  const [filterdata, onFilterdata] = useState();
  const [filterdata1, onFilterdata1] = useState();

  const [drop, ondrop] = useState(false);
  props.onPressed(clickedwhat, filterdata, filterdata1);
  return (
    //It is the Component to render the options that has nearest ride,upcoming ride,past ride and filters
    <div className={styles.options}>
      <div className={styles.link_parent}>
        <p
          className={`${styles.options_h1} active`}
          onClick={(e) => {
            e.target
              .closest(".Options_link_parent__T8IfG") //This will remove the active class from the option nearest ride
              .childNodes.forEach((el) => {
                el.classList.remove("active");
              });
            e.target.classList.add("active"); //This will add the active class to the selected option nearest ride
            onClickedwhat("Nearest rides");
          }}
        >
          Nearest rides
        </p>
        <p
          className={styles.options_h1}
          onClick={(e) => {
            e.target
              .closest(".Options_link_parent__T8IfG") //This will remove the active class from the option upcoming ride
              .childNodes.forEach((el) => {
                el.classList.remove("active");
              });
            e.target.classList.add("active"); //This will add the active class to the selected option upcoming ride
            onClickedwhat("Upcoming rides");
          }}
        >
          Upcoming rides ({props.up})
        </p>
        <p
          className={styles.options_h1}
          onClick={(e) => {
            e.target
              .closest(".Options_link_parent__T8IfG") //This will remove the active class from the option past ride
              .childNodes.forEach((el) => {
                el.classList.remove("active");
              });
            e.target.classList.add("active"); //This will add the active class to the selected option past ride
            onClickedwhat("Past rides");
          }}
        >
          Past rides ({props.past})
        </p>
      </div>
      <div
        className={styles.bijoy} //for screen size 480px and below it shows menu buttons
        onClick={() => {
          ondrop((e) => !e);
        }}
      >
        <svg>
          {/*for screen size 480px and below it shows menu button's svg*/}
          <use xlinkHref={`${vector1}#icon-menu`}></use>
        </svg>
      </div>
      {/*for screen size 480px and below it show the options when the menu button is clicked*/}
      {drop && (
        <div className={styles.sujoy}>
          <p
            className={`${styles.options_h1} active`}
            onClick={(e) => {
              e.target
                .closest(".Options_sujoy__-vX0a")
                .childNodes.forEach((el) => {
                  el.classList.remove("active");
                });
              e.target.classList.add("active");
              onClickedwhat("Nearest rides");
            }}
          >
            Nearest rides
          </p>
          <p
            className={styles.options_h1}
            onClick={(e) => {
              e.target
                .closest(".Options_sujoy__-vX0a")
                .childNodes.forEach((el) => {
                  el.classList.remove("active");
                });
              e.target.classList.add("active");
              onClickedwhat("Upcoming rides");
            }}
          >
            Upcoming rides ({props.up})
          </p>
          <p
            className={styles.options_h1}
            onClick={(e) => {
              e.target
                .closest(".Options_sujoy__-vX0a")
                .childNodes.forEach((el) => {
                  el.classList.remove("active");
                });
              e.target.classList.add("active");
              onClickedwhat("Past rides");
            }}
          >
            Past rides ({props.past})
          </p>
        </div>
      )}
      {/*It shows the filter with city and state options*/}
      <div
        className={styles.options_div}
        onClick={(e) => {
          onFilter((state) => !state);
        }}
      >
        <img src={vector} alt="filter" className={styles.options_img} />
        <p className={styles.options_div_p}>Filter</p>
      </div>
      {/*It shows the city and state dropdown when the filter is clicked and remove when filter is clicked again*/}
      {filter && (
        <div className={styles.filter}>
          {/*It shows the city dropdown*/}
          <select
            className={styles.sel}
            onChange={(e) => {
              onFilterdata(e.target.value);
            }}
            value={filterdata}
          >
            <option value="">Choose a City</option>
            {props.arr.map((e) => (
              <option value={e} name="city" key={nanoid()}>
                {e}
              </option>
            ))}
          </select>
          {/*It shows the state dropdown*/}
          <select
            className={styles.sel}
            onChange={(e) => {
              onFilterdata1(e.target.value);
            }}
            value={filterdata1}
          >
            <option value="">Choose a State</option>
            {props.arr1.map((e) => (
              <option value={e} name="state" key={nanoid()}>
                {e}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
export default Options;
