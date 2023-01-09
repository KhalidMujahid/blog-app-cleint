import { Alert } from "react-bootstrap";

const AlertBox = ({ message, show, setShow }) => {
  return (
    <>
      <Alert
        variant="danger"
        show={show}
        onClick={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>Alert</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </>
  );
};

export default AlertBox;
