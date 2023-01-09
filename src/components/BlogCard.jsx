import { Button, Card } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { url } from "../services/urls/defaultURL";

const BlogCard = ({
  id,
  img,
  fname,
  lname,
  cat,
  content,
  title,
  authorImage,
}) => {
  return (
    <>
      <Card style={{ height: "500px" }} className="p-1 m-1">
        <Card.Img
          style={{
            objectFit: "contain",
            width: "auto",
            height: "250px",
            borderRadius: "2px",
          }}
          src={`${url}/${img}`}
          alt=""
        />
        <Card.Body>
          <Button variant="outline-dark" disabled>
            {cat}
          </Button>
          <Card.Title className="my-4">{title}</Card.Title>
          <Card.Text className="blogcard-text">{content}</Card.Text>
          <Card.Title>
            <div className="mt-4 blogcard-containe">
              <div className="blogcard-image">
                <Card.Img
                  src={`${url}/${authorImage}`}
                  alt=""
                  className="border-outline-primary"
                />
                <div className="blogcard-title">
                  <h5>
                    {fname} {lname}
                  </h5>
                  <span>20-06-2021</span>
                </div>
              </div>
              <div className="blogcard-author">
                <Link to={`/blog/${id}`}>
                  <Button variant="outline-primary">
                    Read more <FaArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogCard;
