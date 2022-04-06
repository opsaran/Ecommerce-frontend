// import pageInterface from "../../interfaces/pageinterface";
import React from "react";

import Benefits from "./benefits";

import Featured from "./featured";
import kachariImage from "/images/kachari.webp";
export default function HomePage() {
  return (
    <>
      <div className="homepage">
        <div>
          <div className="landing-content">
            <h2>
              COOL <span>MEMAZONI</span> GOODS AND 10s DELIVERIES
            </h2>

            <p>Just kidding, it's a meme store. I thank you for visiting.</p>
            <p>
              I advise you to buy and sell stuff on this platform. Login gives
              you added benefits like selling and adding products to your
              personal cart.
            </p>
            <button>
              Order Now <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>

        <img src={kachariImage} alt="picture" className="landing-image" />
      </div>
      <Benefits />
      <Featured />
    </>
  );
}
