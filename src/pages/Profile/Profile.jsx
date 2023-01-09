import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from "react-bootstrap";
import { FaCrosshairs, FaEdit, FaPlus, FaQuestion } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMyProfileDetailsAsync,
  updateMyProfileAsync,
  updateMyProfileDetailsAsync,
} from "../../redux/user";
import { url } from "../../services/urls/defaultURL";

const Profile = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, isFetching } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    bio: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMyProfileDetailsAsync({
        id,
      })
    )
      .unwrap()
      .then((res) => {
        const { fname, lname, email, bio } = res.data;
        setInput({
          fname,
          lname,
          email,
          bio,
        });
      });
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateMyProfileDetailsAsync({
        id,
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        bio: input.bio,
      })
    )
      .unwrap()
      .then((res) => {
        setShow(false);
        setText(res.data);
      })
      .catch((error) => {
        setText(error);
      });
  };

  // handle image upload

  const handleImageUpdateUpload = (e) => {
    e.preventDefault();
    if (!image) {
      setText("Image is required!");
      return;
    }

    dispatch(
      updateMyProfileAsync({
        id: user._id,
        image,
      })
    )
      .unwrap()
      .then((res) => {
        setShowProfile(false);
      });
  };

  if (isFetching) return <h1>Loading.....</h1>;
  return (
    <>
      {/* Edit profile picture modal */}
      <Modal show={showProfile}>
        <Modal.Header>
          <Modal.Title>Update profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {text && <p className="text-danger">{text}</p>}
            <FormGroup>
              <label>Upload</label>
              <FormControl
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleImageUpdateUpload}>
            Upload <FaPlus />
          </Button>
          <Button variant="danger" onClick={() => setShowProfile(false)}>
            Close <FaCrosshairs />
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit profile modal */}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {text && <p className="text-danger">{text}</p>}
            <FormGroup className="mt-4">
              <label>First name</label>
              <FormControl
                name="fname"
                onChange={handleInputChange}
                type="text"
                value={input.fname}
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <label>Last name</label>
              <FormControl
                name="lname"
                onChange={handleInputChange}
                type="text"
                value={input.lname}
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <label>Email Address</label>
              <FormControl
                name="email"
                onChange={handleInputChange}
                type="email"
                value={input.email}
                readOnly
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <label>Bio</label>
              <textarea
                className="form-control"
                name="bio"
                onChange={handleInputChange}
                value={input.bio}
                style={{ resize: "none" }}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button onClick={handleEditProfileSubmit} variant="success">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        {input && (
          <div>
            <div className="mt-4">
              <h4>Profile</h4>
            </div>
            <div className="d-flex">
              <div>
                <img
                  src={`${url}/${user.profile_image}`}
                  alt=""
                  style={{ width: "200px", height: " 200px" }}
                  className="img-thumbnail"
                />
              </div>
              <div className="mx-4">
                <FaEdit
                  onClick={() => setShowProfile(true)}
                  size={25}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div>
              <Form>
                <FormGroup className="mt-4">
                  <label>First name</label>
                  <FormControl type="text" placeholder={input.fname} disabled />
                </FormGroup>
                <FormGroup className="mt-4">
                  <label>Last name</label>
                  <FormControl type="text" placeholder={input.lname} disabled />
                </FormGroup>
                <FormGroup className="mt-4">
                  <label>Email Address</label>
                  <FormControl
                    type="email"
                    placeholder={input.email}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mt-4">
                  <label>Bio</label>
                  <textarea
                    className="form-control"
                    placeholder={input.bio}
                    disabled
                    style={{ resize: "none" }}
                  />
                </FormGroup>
              </Form>
            </div>
            <div>
              <div className="mt-4 d-flex justify-content-between align-center">
                <ButtonGroup>
                  <Button variant="warning" onClick={() => setShow(true)}>
                    Edit
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="danger">
                    Delete account <FaQuestion />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Profile;
