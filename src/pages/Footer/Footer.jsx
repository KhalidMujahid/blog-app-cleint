import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div
        className="bg-light mt-4 w-100 d-flex  flex-column justify-content-center align-items-center"
        style={{ height: "30vh" }}
      >
        <h5>Powered By Hi-Tech</h5>
        <span>
          <FaCopyright /> {new Date().getFullYear()}
        </span>
      </div>
    </>
  );
};

export default Footer;
