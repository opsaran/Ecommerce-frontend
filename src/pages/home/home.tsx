// import pageInterface from "../../interfaces/pageinterface";
import React from "react";

import Benefits from "./benefits";

import handpic from "/images/handpic.png";
import Featured from "./featured";
import kachariImage from "/images/kachari.jpg";
export default function HomePage() {
  return (
    <>
      <div className="homepage">
        <div>
          <div className="landing-content">
            <h2>
              EXOTIC <span>RAJASTHANI</span> FRUITS AND VEGETABLES
            </h2>

            <p>
              Lose fat, improve metabolism and fill your life with a brand new
              taste.
            </p>
            <p>
              Not many people outside of this region are aware of these gifts of
              nature, we bring you the best quality with rapid fast delivery,
              all over India.
            </p>
            <button>
              Order Now <i className="fas fa-angle-right"></i>
            </button>
          </div>
          <img src={handpic} alt="handpic" className="handpicture" />
        </div>

        <img src={kachariImage} alt="picture" className="landing-image" />
      </div>
      <Benefits />
      <Featured />
    </>
  );
}
