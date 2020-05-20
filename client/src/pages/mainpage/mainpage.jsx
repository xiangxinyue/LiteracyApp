import React from "react";
import MainCard from "../../assets/cards/mainpagecard";
import { connect } from "react-redux";
import SignInHeader from "../../components/header/signinheader";
import Process from "../../assets/process";
// import ChatBox from "../../components/chatbox/chatbox";

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
            <p>Hello, {currentUser.displayName}</p>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="jumbotron">{getUserOrLogin()}</div>
      {currentUser ? (
        currentUser.role === "student" ? (
          <div className="row" style={{ paddingLeft: 60, paddingRight: 60 }}>
            <MainCard
              title={"Speed Training"}
              page={"/student/fluency"}
              image={
                "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/dB8d7l76rzNWTJUGKGm5sNVemYI=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/T36OGNZWGJDELAUHLARXICYOV4.jpg"
              }
              description={
                "This part will train both your reading speed and comprehension, click and give it a try!"
              }
            />
            <MainCard
              title={"Sound Training"}
              page={"/student/phoneme"}
              image={
                "https://www.thoughtco.com/thmb/nPtQecIvAsrgTxFWZ1MRt338C24=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/phoenome-5981d954aad52b0010695179.png"
              }
              description={
                "This part will train phoneme, click and give it a try!"
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/"}
              image={
                "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/meaningtrain.jpeg"
              }
              description={"Will Coming Soon!"}
            />
            <MainCard
              title={"Print Training"}
              page={"/"}
              image={
                "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/printtrain.jpg"
              }
              description={"Will Coming Soon!"}
            />
          </div>
        ) : (
          <div className="row" style={{ paddingLeft: 60, paddingRight: 60 }}>
            <MainCard
              title={"Speed Training"}
              page={"/tutor/fluency"}
              image={
                "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/dB8d7l76rzNWTJUGKGm5sNVemYI=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/T36OGNZWGJDELAUHLARXICYOV4.jpg"
              }
              description={
                "Modify Fluency testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Sound Training"}
              page={"/tutor/phoneme"}
              image={
                "https://www.thoughtco.com/thmb/nPtQecIvAsrgTxFWZ1MRt338C24=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/phoenome-5981d954aad52b0010695179.png"
              }
              description={
                "Modify Phoneme testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Meaning Training"}
              page={"/"}
              image={
                "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/meaningtrain.jpeg"
              }
              description={
                "Modify Morphological Awareness testing, training, and assignment questions."
              }
            />
            <MainCard
              title={"Print Training"}
              page={"/"}
              image={
                "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/printtrain.jpg"
              }
              description={
                "Modify Orthographic Awareness testing, training, and assignment questions."
              }
            />
          </div>
        )
      ) : (
        <div className="row" style={{ paddingLeft: 60, paddingRight: 60 }}>
          <MainCard
            title={"Speed Training"}
            page={"/"}
            image={
              "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/dB8d7l76rzNWTJUGKGm5sNVemYI=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/T36OGNZWGJDELAUHLARXICYOV4.jpg"
            }
            description={
              "This part will train both your reading speed and comprehension, click and give it a try!"
            }
          />
          <MainCard
            title={"Sound Training"}
            page={"/"}
            image={
              "https://www.thoughtco.com/thmb/nPtQecIvAsrgTxFWZ1MRt338C24=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/phoenome-5981d954aad52b0010695179.png"
            }
            description={
              "This part will train phoneme, click and give it a try!"
            }
          />
          <MainCard
            title={"Meaning Training"}
            page={"/"}
            image={
              "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/meaningtrain.jpeg"
            }
            description={"Will Coming Soon!"}
          />
          <MainCard
            title={"Print Training"}
            page={"/"}
            image={
              "https://fullstackproject.s3.ca-central-1.amazonaws.com/literacyapp/printtrain.jpg"
            }
            description={"Will Coming Soon!"}
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
