import Header from "./Components/Header";
import Options from "./Components/Options";
import "./App.css";
import React, { useState, useEffect } from "react";
import Element from "./Components/Element";
import { nanoid } from "nanoid";
import spinner from "./icons/sprite.svg";
// import error from "./error404.png";
let Ride, Ride1, Ride2, user;
let city = [];
let state = [];
let truthy = false;
let truthy1 = false;

function App() {
  const [clickedwhat, onClickedwhat] = useState();
  const [filterdata, onFilterdata] = useState();
  const [filterdata1, onFilterdata1] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isuserLoaded, setIsUserLoaded] = useState(false);
  const [error, onerror] = useState(false);
  // function to get option selected and filter city and state selected from options component
  function pressedfunc(val, val1, val2) {
    onClickedwhat(val);
    onFilterdata(val1);
    onFilterdata1(val2);
  }
  // to fetch the ride data
  useEffect(() => {
    if (!truthy && !error) {
      fetch("https://assessment.api.vweb.app/rides")
        .then((e) => {
          if (e.ok === false) {
            onerror(true);
          }
          return e.json();
        })
        .then((el) => {
          Ride = el;
          setIsLoaded(true);
        });

      truthy = true;
    }
  });
  // to fetch the user data
  useEffect(() => {
    if (!truthy1) {
      fetch("https://assessment.api.vweb.app/user")
        .then((e) => {
          if (e.ok === false) {
            onerror(true);
          }
          return e.json();
        })
        .then((el) => {
          user = el;
          setIsUserLoaded(true);
        });
      truthy1 = true;
    }
  });
  //on error in fetching
  if (error) {
    return (
      <div className="error">
        <img
          src={require("./error404.png")}
          alt="404error"
          className="error_img"
        />
        <h1 className="error_head">There is a problem connecting....</h1>
        <p className="error_para1">
          Breathe in and on the out breathe go back and try again.
        </p>
      </div>
    );
  }
  //on loading data loading spinner shown
  if (!error) {
    if (!isLoaded || !isLoaded) {
      return (
        <div className="spinner">
          <svg className="spinner_svg">
            <use xlinkHref={`${spinner}#icon-spinner3`}></use>
          </svg>
        </div>
      );
    }
  }
  //when the data is loaded then we do the following operations
  if (isLoaded && isuserLoaded) {
    // find the difference between user sattion code and array of station code of ride
    Ride.forEach((e, i) => {
      e.arr = e.station_path.map((e, i) => {
        return Math.abs(user.station_code - e);
      });
      e.arr = Math.min(...e.arr);
    });
    // sort on the basis of distance of the ride based on the user
    Ride.sort((a, b) => {
      return a.arr - b.arr;
    });

    // the data for upcoming ride note that here as the api data has all past date so I have considered a past date as user date is also not given
    Ride1 = Ride.filter(
      (e) => Number(Date.parse(e.date)) - Number(Date.now() - 5000000000) > 0
    );
    // the data for past ride
    Ride2 = Ride.filter(
      (e) => Number(Date.parse(e.date)) - Number(Date.now() - 5000000000) < 0
    );

    //to put all the city in the Rides to the city filter
    for (let i = 0; i < Ride.length; i++) {
      if (city.includes(Ride[i].city)) {
        continue;
      }
      city.push(Ride[i].city);
    }
    //to put all the state in the Rides to the state filter
    for (let i = 0; i < Ride.length; i++) {
      if (state.includes(Ride[i].state)) {
        continue;
      }
      state.push(Ride[i].state);
    }

    return (
      <React.Fragment>
        <Header name={user.name} pic={user.url}></Header>
        <Options
          onPressed={pressedfunc}
          near={Ride?.length}
          up={Ride1?.length}
          past={Ride2?.length}
          arr={city}
          arr1={state}
        ></Options>
        {/* to render the nearest ride based on filter option*/}
        {/* to render the nearest ride based on filter option with no city and state filtered*/}
        {clickedwhat === "Nearest rides" &&
          !(filterdata || filterdata1) &&
          Ride.map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the nearest ride based on filter option with city and no state filtered*/}
        {clickedwhat === "Nearest rides" &&
          filterdata &&
          !filterdata1 &&
          Ride.filter((e) => {
            return e.city === filterdata;
          }).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the nearest ride based on filter option with no city and with state filtered*/}
        {clickedwhat === "Nearest rides" &&
          !filterdata &&
          filterdata1 &&
          Ride.filter((e) => e.state === filterdata1).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the nearest ride based on filter option with  city and state filtered*/}
        {clickedwhat === "Nearest rides" &&
          filterdata &&
          filterdata1 &&
          Ride.filter(
            (e) => e.state === filterdata1 && e.city === filterdata
          ).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the upcoming ride based on filter option*/}
        {/* to render the upcoming ride based on filter option with no city and state filtered*/}
        {clickedwhat === "Upcoming rides" &&
          !(filterdata || filterdata1) &&
          Ride1.map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the upcoming ride based on filter option with  city and no state filtered*/}
        {clickedwhat === "Upcoming rides" &&
          filterdata &&
          !filterdata1 &&
          Ride1.filter((e) => e.city === filterdata).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the upcoming ride based on filter option with no city and with state filtered*/}
        {clickedwhat === "Upcoming rides" &&
          !filterdata &&
          filterdata1 &&
          Ride1.filter((e) => e.state === filterdata1).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the upcoming ride based on filter option with city and state filtered*/}
        {clickedwhat === "Upcoming rides" &&
          filterdata &&
          filterdata1 &&
          Ride1.filter(
            (e) => e.state === filterdata1 && e.city === filterdata
          ).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the past ride based on filter option*/}
        {/* to render the past ride based on filter option with no city and state filtered*/}
        {clickedwhat === "Past rides" &&
          !(filterdata || filterdata1) &&
          Ride2.map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the past ride based on filter option with city and no state filtered*/}
        {clickedwhat === "Past rides" &&
          filterdata &&
          !filterdata1 &&
          Ride2.filter((e) => e.city === filterdata).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the past ride based on filter option with no city and with state filtered*/}
        {clickedwhat === "Past rides" &&
          !filterdata &&
          filterdata1 &&
          Ride2.filter((e) => e.state === filterdata1).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
        {/* to render the past ride based on filter option with  city and state filtered*/}
        {clickedwhat === "Past rides" &&
          filterdata &&
          filterdata1 &&
          Ride2.filter(
            (e) => e.state === filterdata1 && e.city === filterdata
          ).map((e) => {
            return (
              <Element
                id={e.id}
                os={e.origin_station_code}
                sp={e.station_path}
                date={e.date}
                dist={e.arr}
                state={e.state}
                city={e.city}
                mapimg={e.map_url}
                key={nanoid()}
              ></Element>
            );
          })}
      </React.Fragment>
    );
  }
}

export default App;
