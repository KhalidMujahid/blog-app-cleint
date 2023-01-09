import { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import BlogCard from "./BlogCard";
// import data from "../db";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostAsync } from "../redux/post";

const BlogList = () => {
  const { posts, isFetching } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPostAsync());
  }, [dispatch]);

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
      <Container>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <FormGroup>
            <InputGroup>
              <FormControl placeholder="Search categorie...." type="search" />
              <Button variant="outline-primary">
                <FaSearch />
              </Button>
            </InputGroup>
          </FormGroup>
        </div>
        <div>
          <div className="text-center m-4">
            <h1 className="text-primary">Recent Post</h1>
            <hr />
          </div>
          <div className="blog-parent">
            {posts?.map((d) => {
              return d.Post.map((ps) => {
                return (
                  <BlogCard
                    key={ps._id}
                    id={ps._id}
                    img={ps.post_image}
                    content={ps.post_content}
                    fname={d.fname}
                    lname={d.lname}
                    cat={ps.post_category}
                    title={ps.post_title}
                    authorImage={d.profile_image}
                  />
                );
              });
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogList;
