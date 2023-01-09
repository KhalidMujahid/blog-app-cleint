import { FaComment, FaHeart } from "react-icons/fa";
import img1 from "../images/img1.jpg";

const CommentCard = ({ love, content }) => {
  return (
    <>
      <div className="border mt-4">
        <div className="d-flex justify-content-between p-2 align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={img1}
              alt=""
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                border: "1px solid #000",
              }}
            />
            <p>Khalid Mujahid</p>
          </div>
          <div>
            <span>20-06-2021</span>
          </div>
        </div>
        <div className="p-3">{content}</div>
        <div className="d-flex bg-light">
          <div className="border w-50 d-flex justify-content-center align-items-center p-2">
            <FaHeart /> ({love})
          </div>
          <div className="border w-50 d-flex justify-content-center align-items-center p-2">
            <FaComment /> ({love})
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
