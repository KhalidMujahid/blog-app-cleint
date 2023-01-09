import { useEffect, useState } from "react";
import {
  InputGroup,
  Container,
  Form,
  FormControl,
  FormGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaQuestion, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { loginUserAsync } from "../../redux/user";

const Login = () => {
  const { user, isFetching } = useSelector((state) => state.user);
  const history = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.email) {
      setShow(true);
      setMessage("Email is required!");
      return;
    }

    if (!value.password) {
      setShow(true);
      setMessage("Password is required!");
      return;
    }

    dispatch(
      loginUserAsync({
        email: value.email,
        password: value.password,
      })
    )
      .unwrap()
      .catch((error) => {
        setShow(true);
        setMessage(error);
      });
  };

  useEffect(() => {
    if (user) return history("/");
  }, [user, history]);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Form className="border p-4 shadow" onSubmit={handleSubmit}>
          <h1 className="text-center m-4">Login</h1>
          <AlertBox message={message} show={show} setShow={setShow} />
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Email"
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <InputGroup>
              <FormControl
                type={toggle ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
              <InputGroup.Text onClick={() => setToggle(!toggle)}>
                {toggle ? <FaEye /> : <FaEyeSlash />}
              </InputGroup.Text>
            </InputGroup>
          </FormGroup>
          <FormGroup className="mt-4 d-flex justify-content-between">
            <Button type="submit">
              {!isFetching ? (
                <>
                  Login <FaUser />
                </>
              ) : (
                <Spinner animation="border" />
              )}
            </Button>
            <Link to="/forget">
              <Button variant="danger">
                Forget password <FaQuestion />
              </Button>
            </Link>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default Login;
