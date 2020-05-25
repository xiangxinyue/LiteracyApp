import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/useractions";
import ErrorBoundary from "./components/errorboundary/errorboundary";
import axios from "axios";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
const Main = lazy(() => import("./pages/mainpage/mainpage"));
// Fluency pages
const FluencyMain = lazy(() => import("./pages/fluencypage/main"));
const FluencyPractise = lazy(() => import("./pages/fluencypage/practise"));
const FluencyMaterials = lazy(() => import("./pages/fluencypage/materials"));
// Phoneme pages
const PhonemeMain = lazy(() => import("./pages/phonemepage/main"));
const PhonemePractise = lazy(() => import("./pages/phonemepage/practise"));
const PhonemeMaterials = lazy(() => import("./pages/phonemepage/materials"));
const PhonemeAudioRecord = lazy(() =>
  import("./pages/phonemepage/audiorecord")
);

// Tutor pages
const FluencyAssign = lazy(() => import("./pages/assignpage/fluencyassign"));
const PhonemeAssign = lazy(() => import("./pages/assignpage/phonemeassign"));

// const PhonemeEvaluation = lazy(() => import("./pages/evaluation/phoneme"));
// const FluencyEvaluation = lazy(() => import("./pages/evaluation/fluency"));
// const StudentDashboard = lazy(() =>
//   import("./pages/dashboard/studentdashpage")
// );
// const InstructorDashboard = lazy(() =>
//   import("./pages/dashboard/instructordashpage")
// );

class App extends React.Component {
  componentDidMount = async () => {
    const doc = await axios.get("/auth/current_user");
    console.log(doc.data);
    this.props.setCurrentUser(doc.data);
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Route exact path="/" component={Main} />

              <Route exact path="/student/fluency" component={FluencyMain} />
              <Route
                exact
                path="/student/fluency/practise"
                component={FluencyPractise}
              />
              <Route
                exact
                path="/student/fluency/materials"
                component={FluencyMaterials}
              />

              <Route exact path="/student/phoneme" component={PhonemeMain} />
              <Route
                exact
                path="/student/phoneme/practise"
                component={PhonemePractise}
              />
              <Route
                exact
                path="/student/phoneme/materials"
                component={PhonemeMaterials}
              />
              <Route
                exact
                path="/student/phoneme/audiorecord"
                component={PhonemeAudioRecord}
              />

              <Route exact path="/tutor/fluency" component={FluencyAssign} />
              <Route exact path="/tutor/phoneme" component={PhonemeAssign} />
              {/*
              <Route
                exact
                path="/phonemeevaluation"
                component={PhonemeEvaluation}
              />
              <Route
                exact
                path="/fluencyevaluation"
                component={FluencyEvaluation}
              />
              <Route
                exact
                path="/studentdashboard"
                component={StudentDashboard}
              />
              <Route
                exact
                path="/instructordashboard"
                component={InstructorDashboard}
              /> */}
            </Suspense>
          </ErrorBoundary>
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
