import React from "react";

const Footer = () => {
  return (
      <div
          className="bg-dark w-100 h-100"
          style={textSize}  >
      <div className="w-50 mx-auto text-center text-white">
        <div>
          <p className="fs-1">@Jonathan J || Full Stack Developer</p>
        </div>
        <div className="">
          <a href="https://www.linkedin.com/in/jonathan-jimenez101/">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

var textSize = {
    fontSize: "1.5rem"
}

export default Footer;
