import React from "react";
import MainCard from "../../assets/cards/mainpagecard";
import { connect } from "react-redux";
import SignInHeader from "../../components/header/signinheader";
import Process from "../../assets/process";
// import ChatBox from "../../components/chatbox/chatbox";

const imagePath = process.env.PUBLIC_URL;

const images = [
  'images/soundmain.png',
  'images/printmain.jpg',
  'images/speedmain.jpeg',
  'images/meaningmain.jpeg',
];

const Main = ({ currentUser }) => {
  const getUserOrLogin = () => {
    switch (currentUser) {
      case null:
        return;
      case false:
        return <SignInHeader />;
      default:
        return (
          <div>
            <h2>Welcome to Literacy Training</h2>
            <hr />
            <h4>Hello, {currentUser.displayName}</h4>
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
              page={"/phonemetrain"}
              image={
                //"https://www.thoughtco.com/thmb/nPtQecIvAsrgTxFWZ1MRt338C24=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/phoenome-5981d954aad52b0010695179.png"
                imagePath + images[0]
              }
              description={
                "You will train or increase your knowledge about the different sounds in English."
              }
            />
            <MainCard
              title={"Print Training"}
              page={"/"}
              image={
                //"https://www.remonline.com/wp-content/uploads/2016/12/Coming-Soon-1074x483.jpg"
                imagePath + images[1]
              }
              description={"You will train or increase your knowledge about different letter patterns in English."}
            />
            <MainCard
              title={"Speed Training"}
              page={"/fluencytrain"}
              image={
                //"https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/dB8d7l76rzNWTJUGKGm5sNVemYI=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/T36OGNZWGJDELAUHLARXICYOV4.jpg"
                imagePath + images[2]
              }
              description={
                "You will train or increase your reading speed. "
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/"}
              image={
                //"https://www.remonline.com/wp-content/uploads/2016/12/Coming-Soon-1074x483.jpg"
                imagePath + images[3]
              }
              description={"You will train or increase your knowledge about different meaning units in English."}
            />
          </div>
        ) : (
          <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
            <MainCard
              title={"Sound Training"}
              page={"/phonemetrain"}
              image={
                imagePath + images[0]
              }
              description={
                "You will train or increase your knowledge about the different sounds in English."
              }
            />
            <MainCard
              title={"Print Training"}
              page={"/"}
              image={
                imagePath + images[1]
              }
              description={"You will train or increase your knowledge about different letter patterns in English."}
            />
            <MainCard
              title={"Speed Training"}
              page={"/fluencytrain"}
              image={
                imagePath + images[2]
              }
              description={
                "You will train or increase your reading speed. "
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/"}
              image={
                imagePath + images[3]
              }
              description={"You will train or increase your knowledge about different meaning units in English."}
            />
          </div>
        )
      ) : (
        <div className="row" style={{ paddingLeft: 100, paddingRight: 100 }}>
          <MainCard
              title={"Sound Training"}
              page={"/phonemetrain"}
              image={
                imagePath + images[0]
              }
              description={
                "You will train or increase your knowledge about the different sounds in English."
              }
            />
            <MainCard
              title={"Print Training"}
              page={"/"}
              image={
                imagePath + images[1]
              }
              description={"You will train or increase your knowledge about different letter patterns in English."}
            />
            <MainCard
              title={"Speed Training"}
              page={"/fluencytrain"}
              image={
                imagePath + images[2]
              }
              description={
                "You will train or increase your reading speed. "
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/"}
              image={
                imagePath + images[3]
              }
              description={"You will train or increase your knowledge about different meaning units in English."}
            />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Main);