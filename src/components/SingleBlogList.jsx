import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Form, Spinner } from "react-bootstrap";
import {
  FaEdit,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaPlus,
  FaTrash,
  FaWhatsapp,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import img1 from "../images/img1.jpg";
import AlertBox from "./AlertBox";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPost, userMakeCommentOnPost } from "../redux/post";
import { url } from "../services/urls/defaultURL";

const SingleBlogList = () => {
  const { selectPost, isFetching } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [love, setLove] = useState(selectPost?.love);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSelectedPost({
        id,
      })
    );
  }, [dispatch, id]);

  const handleLove = () => {
    setLove((love) => love + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();

    if (!comment) {
      setShow(true);
      setMessage("Comment is required!");
      return;
    }

    dispatch(
      userMakeCommentOnPost({
        post_id: id,
        author: user._id,
        comment,
      })
    )
      .unwrap()
      .then((res) => {
        setShow(true);
        setMessage(res.data);
      })
      .catch((error) => {
        setShow(true);
        setMessage(error);
      });
    setComment("");
  };

  if (isFetching)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );

  return (
    <>
      <Outlet />
      <Container>
        <div className="mt-4">
          <div>
            <img
              width="100%"
              style={{ height: "400px", objectFit: "contain" }}
              src={`${url}/${selectPost?.post_image}`}
              alt=""
            />
          </div>
          <div className="mt-4 mb-4 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={img1}
                alt=""
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  border: "1px solid #000",
                }}
              />
              <div>
                <h6>Khalid Mujahid</h6>
                <span>20-06-2021</span>
              </div>
            </div>
            <div className="d-flex justify-content-around w-25">
              <FaEdit className="text-warning" size={27} />
              <FaTrash className="text-danger" size={27} />
            </div>
          </div>
          <div>
            <p>{selectPost?.post_content}</p>
          </div>
          <div className="d-flex justify-content-between">
            <ButtonGroup>
              <Button variant="outline-danger" onClick={handleLove}>
                <FaHeart /> ({love}) You and {love} others
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline-primary">
                <FaFacebook />
              </Button>
              <Button variant="outline-primary">
                <FaWhatsapp />
              </Button>
              <Button variant="outline-primary">
                <FaInstagram />
              </Button>
            </ButtonGroup>
          </div>
          <hr />
          <div>
            <div className="form-group">
              <Form onSubmit={handleComment}>
                <AlertBox show={show} setShow={setShow} message={message} />
                <textarea
                  placeholder="Comment.."
                  style={{ resize: "none" }}
                  className="form-control"
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" className="mt-2">
                  {isFetching ? (
                    <Spinner animation="border" />
                  ) : (
                    <>
                      Comment <FaPlus />
                    </>
                  )}
                </Button>
              </Form>
            </div>
            <div>
              {selectPost?.Comment.map((comment) => {
                return (
                  <CommentCard
                    key={comment._id}
                    content={comment.comment}
                    love={love}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlogList;
