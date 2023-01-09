import { Button, InputGroup } from "react-bootstrap";
import { FaPlus, FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <InputGroup>
        {user || user?.others ? (
          <>
            <NavLink to="/post/create">
              <Button variant="outline-primary" className="form-control">
                Create <FaPlus />
              </Button>
            </NavLink>
            <NavLink to={`/profile/${user?.others?._id || user?._id}`}>
              <Button variant="outline-primary">
                Profile <FaUser />
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Button variant="outline-primary" className="form-control">
                Login <FaSignInAlt />
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button variant="outline-primary">
                Sign Up <FaUser />
              </Button>
            </NavLink>
          </>
        )}
      </InputGroup>
    </>
  );
};

export default NavBar;
