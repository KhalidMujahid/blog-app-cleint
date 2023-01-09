import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="bg-light d-flex justify-content-around py-2 align-items-center">
        {user ? (
          <>
            <div>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <h1 className="text-info">Blog</h1>
              </NavLink>
            </div>
            <div>
              <NavBar />
            </div>
          </>
        ) : (
          <>
            <div>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <h1 className="text-info">Blog</h1>
              </NavLink>
            </div>
            <div>
              <NavBar />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
