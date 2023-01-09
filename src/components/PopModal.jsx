import { Button, Modal } from "react-bootstrap";

const PopModal = ({ message, show, setShow }) => {
  return (
    <>
      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopModal;
