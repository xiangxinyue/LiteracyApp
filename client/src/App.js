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
  import("./pages/phonemepage/audioassign")
);

// Tutor pages
// Fluency Page
const FluencyTutorMain = lazy(() => import("./pages/tutorpage/fluency/main"));
const FluencyTutorTrain = lazy(() =>
  import("./pages/tutorpage/fluency/traindata")
);
const FluencyTutorTest = lazy(() =>
  import("./pages/tutorpage/fluency/testdata")
);
const FluencyTutorAssign = lazy(() =>
  import("./pages/tutorpage/fluency/assignment")
);

// Phoneme Page
const PhonemeTutorMain = lazy(() => import("./pages/tutorpage/phoneme/main"));
const PhonemeTutorTrain = lazy(() =>
  import("./pages/tutorpage/phoneme/traindata")
);
const PhonemeTutorTest = lazy(() =>
  import("./pages/tutorpage/phoneme/testdata")
);
const PhonemeTutorAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/assignment")
);
const PhonemeTutorAudioAll = lazy(() =>
  import("./pages/tutorpage/phoneme/allaudios")
);
const PhonemeTutorAudioAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/audioassign")
);

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

              <Route exact path="/tutor/fluency" component={FluencyTutorMain} />
              <Route
                exact
                path="/tutor/fluency/traindata"
                component={FluencyTutorTrain}
              />
              <Route
                exact
                path="/tutor/fluency/testdata"
                component={FluencyTutorTest}
              />
              <Route
                exact
                path="/tutor/fluency/assignment"
                component={FluencyTutorAssign}
              />
              <Route exact path="/tutor/phoneme" component={PhonemeTutorMain} />
              <Route
                exact
                path="/tutor/phoneme/traindata"
                component={PhonemeTutorTrain}
              />
              <Route
                exact
                path="/tutor/phoneme/testdata"
                component={PhonemeTutorTest}
              />
              <Route
                exact
                path="/tutor/phoneme/assignment"
                component={PhonemeTutorAssign}
              />
              <Route
                exact
                path="/tutor/phoneme/allaudios"
                component={PhonemeTutorAudioAll}
              />
              <Route
                exact
                path="/tutor/phoneme/audioassign"
                component={PhonemeTutorAudioAssign}
              />
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
