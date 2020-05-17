import React from "react";

export default () => {
  return (
    <>
      <h3 className="text-primary">
        Please watch the introduction video before your training.
      </h3>
      <iframe
        width="740"
        height="430"
        src="https://www.youtube.com/embed/rDg4S6jxLJI"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </>
  );
};
