import React from "react";

export default () => {
  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ "background-color": "#e3f2fd", height: 300, marginTop: 50 }}
      >
        <div className="row">
          <div className="col-lg-10 col-md-auto">
            @Copyright 2020{""}
          </div>
          <div className="col-lg-2 col-md-auto">
            <img
              //style={{ width: 300, height: 70 }}
              //src="https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/ualberta.png"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};
