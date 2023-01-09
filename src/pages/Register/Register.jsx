import { useState } from "react";
import {
  InputGroup,
  Container,
  Form,
  FormControl,
  FormGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { registerUserAsync } from "../../redux/user";
import PopModal from "../../components/PopModal";

const Login = () => {
  const { isFetching } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [regShow, setRegShow] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.fname) {
      setShow(true);
      setMessage("First name is required!");
      return;
    }

    if (!value.lname) {
      setShow(true);
      setMessage("Last name is required!");
      return;
    }

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
      registerUserAsync({
        fname: value.fname,
        lname: value.lname,
        email: value.email,
        password: value.password,
      })
    )
      .unwrap()
      .then((res) => {
        setRegShow(true);
        setMessage(res.data);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setShow(true);
        setMessage(error);
      });
  };

  return (
    <>
      <PopModal message={message} show={regShow} setShow={setShow} />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Form className="border p-4 shadow" onSubmit={handleSubmit}>
          <h1 className="text-center m-4">Register</h1>
          <AlertBox message={message} show={show} setShow={setShow} />
          <FormGroup>
            <FormControl
              type="text"
              placeholder="First name"
              onChange={(e) => setValue({ ...value, fname: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <FormControl
              type="text"
              placeholder="Last name"
              onChange={(e) => setValue({ ...value, lname: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mt-4">
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
          <FormGroup className="mt-4">
            <Button type="submit">
              {isFetching ? (
                <Spinner animation="border" />
              ) : (
                <>
                  Create Account <FaSignInAlt />
                </>
              )}
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default Login;
