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
            Memazon
          </Link>
        </div>
        <div className="nav-options">
          <a href="#feturedSection_id">Fashion</a>
          <a href="#feturedSection_id">Foods</a>
          <a href="#feturedSection_id">Electronicss</a>
          <a href="#feturedSection_id">Grocery</a>
          <a href="#feturedSection_id">Books</a>
        </div>
        <div className="nav-icons">
          <button name="search">
            {/* <i className="fas fa-search"></i> */}
          </button>
          <Link
            to="/cart"
            state={{ backgroundLocation: location }}
            style={
              location.pathname === "/cart"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            cart
            {/* <i className="fas fa-shopping-cart"></i> */}
          </Link>
          <button
            name="account"
            onClick={() =>
              setStyles((prev) => {
                if (prev.display === "flex") {
                  return { display: "none" };
                } else {
                  return { display: "flex" };
                }
              })
            }
            // onMouseOver={() => setStyles({ display: "flex" })}
            // onMouseLeave={() => setStyles({ display: "none" })}
          ></button>
          <button
            name="all-links-ham"
            onClick={handleham}
            className="nav-ham-button"
          >
            {/* <i className="fas fa-bars"></i> */}
          </button>
        </div>
      </nav>
      <AccountHoverBox styles={styles} setStyles={setStyles} />
      <Outlet />
    </div>
  );
}
