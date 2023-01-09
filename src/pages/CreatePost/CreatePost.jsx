import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import PopModal from "../../components/PopModal";
import { createPostAsync } from "../../redux/post";

const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState({
    title: "",
    image: "",
    content: "",
    cat: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
    }

    if (!value.title) {
      setShow(true);
      setMessage("Blog Title is required!");
      return;
    }
    if (!value.image) {
      setShow(true);
      setMessage("Blog Image is required!");
      return;
    }
    if (!value.content) {
      setShow(true);
      setMessage("Blog Content is required!");
      return;
    }
    if (!value.cat) {
      setShow(true);
      setMessage("Blog Categorie is required!");
      return;
    }

    dispatch(
      createPostAsync({
        id: user?._id,
        title: value.title,
        image: value.image,
        cat: value.cat,
        content: value.content,
      })
    )
      .unwrap()
      .then((res) => {
        setShow(true);
        setMessage(res.data);
      })
      .catch((error) => {
        setShow(true);
        setShow(error);
      });
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.files[0],
    });
  };
  return (
    <>
      <PopModal show={show} message={message} setShow={setShow} />
      <Container>
        <form
          className="border p-4 mt-4 shadow"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className="m-4 text-center">Create Blog</h1>
          <AlertBox message={message} show={show} setShow={setShow} />
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Blog Title"
              name="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <FormControl
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <textarea
              placeholder="Blog Content....."
              className="form-control"
              name="content"
              onChange={handleChange}
              style={{ resize: "none", height: "13rem" }}
            />
          </FormGroup>
          <FormGroup className="mt-4">
            <select className="form-control" name="cat" onChange={handleChange}>
              <option>Select Categorie</option>
              <option value="Web Development">Web Development</option>
              <option value="Hacking">Hacking</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Food">Food</option>
              <option value="Entertaiment">Entertaiment</option>
            </select>
          </FormGroup>
          <div className="mt-4 d-flex justify-content-between">
            <ButtonGroup>
              <Button type="submit">
                Post <FaPlus />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back <FaArrowRight />
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreatePost;
