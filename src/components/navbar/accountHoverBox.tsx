import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import authContext from "../../contexts/authcontext";
import axiosInstance from "../../utils/axiosInstance";

export default function AccountHoverBox({
  styles,
  setStyles,
}: {
  styles: React.CSSProperties;
  setStyles: any;
}) {
  const { user, setUser } = useContext(authContext);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  async function Logout() {
    setLoggingOut(true);
    if (user.active) {
      try {
        const data = await axiosInstance.delete("/session");

        setUser({ active: false, name: "" });
        setLoggingOut(false);
      } catch (error: any) {
        alert("Error occured!, Could not log out");
        setLoggingOut(false);
      }
    } else {
      alert("You are not logged in!");
      setLoggingOut(false);
    }
  }

  return (
    <div
      style={styles}
      className="account-hover-box"
      onMouseOver={() => setStyles({ display: "flex" })}
      onMouseLeave={() => setStyles({ display: "none" })}
    >
      {user.active ? (
        <div>
          <div className="nav-small-triangle"></div>
          <div className="account-hover-box-content">
            <div>
              <h3>Hello {user.name}!</h3>

              <Link to="/">Your account</Link>
            </div>
            <hr />
            <button onClick={() => Logout()}>
              {loggingOut ? "Logging Out..." : "Sign Out"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="nav-small-triangle"></div>
          <div className="account-hover-box-content">
            <Link to="/login">Sign In</Link>
            <div>
              <h4>New here?</h4>

              <Link to="/register">Start Here</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
