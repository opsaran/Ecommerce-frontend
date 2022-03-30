import React, { useEffect, useState } from "react";
import AccountHoverBox from "./accountHoverBox";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function NavBar({ style }: { style: React.CSSProperties }) {
  const location = useLocation();
  const handleham = (): void => {
    const navOptions = document.querySelector(".nav-options");
    const homepage = document.querySelector(".homepage");
    navOptions?.classList.toggle("toggle-nav-options");
    homepage?.classList.toggle("mobile-nav-open");
  };

  const [styles, setStyles] = useState<{ display: string }>({
    display: "none",
  });

  return (
    <div style={style}>
      <nav>
        <div>
          <Link to="/" className="brand-logo">
            RajFoods
          </Link>
        </div>
        <div className="nav-options">
          <a>Dry Foods</a>
          <a>Wet Foods</a>
          <a>Drinks</a>
        </div>
        <div className="nav-icons">
          <button>{/* <i className="fas fa-search"></i> */}</button>
          <Link
            to="/cart"
            state={{ backgroundLocation: location }}
            style={
              location.pathname === "/cart"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            {/* <i className="fas fa-shopping-cart"></i> */}
          </Link>
          <button
            onMouseOver={() => setStyles({ display: "flex" })}
            onMouseLeave={() => setStyles({ display: "none" })}
          ></button>
          <button onClick={handleham} className="nav-ham-button">
            {/* <i className="fas fa-bars"></i> */}
          </button>
        </div>
      </nav>
      <AccountHoverBox styles={styles} setStyles={setStyles} />
      <Outlet />
    </div>
  );
}
