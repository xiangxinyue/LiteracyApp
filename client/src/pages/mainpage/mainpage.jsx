import React from "react";
import MainCard from "../../assets/cards/mainpagecard";
import { connect } from "react-redux";
import SignInHeader from "../../components/header/signinheader";
import P1 from "../../assets/fonts/p1";
import P2 from "../../assets/fonts/p2";
import P3 from "../../assets/fonts/p3";

const imagePath = process.env.PUBLIC_URL;
const images = [
  "images/soundmain.png",
  "images/printmain.jpg",
  "images/speedmain.jpeg",
  "images/meaningmain.jpeg",
];

const Main = ({ currentUser, currentFont }) => {
  const getUserOrLogin = () => {
    switch (currentUser) {
      case null:
        return;
      case false:
        return <SignInHeader />;
      default:
        return (
          <div>
            <P1>Welcome to Literacy Training</P1>
            <hr />
            <P3>
              Hello,
              {currentUser.displayName ? currentUser.displayName : "tutor"}
            </P3>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="jumbotron">{getUserOrLogin()}</div>
      {currentUser ? (
        currentUser.role === "student" ? (
          <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
            <MainCard
              title={"Sound Training"}
              page={"/student/phoneme"}
              image={imagePath + images[0]}
              description={"Increase your sound skills "}
            />
            <MainCard
              title={"Print Training"}
              page={"/student/print"}
              image={imagePath + images[1]}
              description={"Increase your spelling skills "}
            />
            <MainCard
              title={"Speed Training"}
              page={"/student/fluency"}
              image={imagePath + images[2]}
              description={"Increase your reading speed "}
            />
            <MainCard
              title={"Meaning Training"}
              page={"/student/meaning"}
              image={imagePath + images[3]}
              description={"Increase your meaning skills "}
            />
          </div>
        ) : (
          <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
            <MainCard
              title={"Sound Training"}
              page={"/tutor/phoneme"}
              image={imagePath + images[0]}
              description={
                "Modify Phoneme testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Print Training"}
              page={"/tutor/print"}
              image={imagePath + images[1]}
              description={
                "Modify print testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Speed Training"}
              page={"/tutor/fluency"}
              image={imagePath + images[2]}
              description={
                "Modify Fluency testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/tutor/meaning"}
              image={imagePath + images[3]}
              description={
                "Modify meaning testing, training, and assignment questions."
              }
            />
          </div>
        )
      ) : (
        <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
          <MainCard
            title={"Sound Training"}
            page={"/"}
            image={imagePath + images[0]}
            description={"Increase your sound skills "}
          />
          <MainCard
            title={"Print Training"}
            page={"/"}
            image={imagePath + images[1]}
            description={"Increase your spelling skills "}
          />
          <MainCard
            title={"Speed Training"}
            page={"/"}
            image={imagePath + images[2]}
            description={"Increase your reading speed "}
          />
          <MainCard
            title={"Meaning Training"}
            page={"/"}
            image={imagePath + images[3]}
            description={"Increase your meaning skills "}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentFont: state.font.currentFont,
});

export default connect(mapStateToProps)(Main);
