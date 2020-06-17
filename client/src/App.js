import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/useractions";
import ErrorBoundary from "./components/errorboundary/errorboundary";
import axios from "axios";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
const Main = lazy(() => import("./pages/mainpage/mainpage"));
// Student pages
// Fluency pages
const FluencyMain = lazy(() => import("./pages/studentpage/fluency/main"));
const FluencyPractise = lazy(() =>
  import("./pages/studentpage/fluency/practise")
);
const FluencyMaterials = lazy(() =>
  import("./pages/studentpage/fluency/materials")
);
const FluencyAssignment = lazy(() =>
  import("./pages/studentpage/fluency/assignment")
);
// Phoneme pages
const PhonemeMain = lazy(() => import("./pages/studentpage/phoneme/main"));
const PhonemePractise = lazy(() =>
  import("./pages/studentpage/phoneme/practise")
);
const PhonemeMaterials = lazy(() =>
  import("./pages/studentpage/phoneme/materials")
);
const PhonemeAssignment = lazy(() =>
  import("./pages/studentpage/phoneme/assignment")
);

// Meaning pages
const MeaningMain = lazy(() => import("./pages/studentpage/meaning/main"));
const MeaningPractise = lazy(() =>
  import("./pages/studentpage/meaning/practise")
);
const MeaningMaterials = lazy(() =>
  import("./pages/studentpage/meaning/materials")
);
const MeaningAssignment = lazy(() =>
  import("./pages/studentpage/meaning/assignment")
);

// Tutor pages
// Fluency pages
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

const FluencyTutorTestAllAssign = lazy(() =>
  import("./pages/tutorpage/fluency/testallassign")
);
const FluencyTutorTestOneAssign = lazy(() =>
  import("./pages/tutorpage/fluency/testoneassign")
);
const FluencyTutorEvalAllAssign = lazy(() =>
  import("./pages/tutorpage/fluency/evalallassign")
);
const FluencyTutorEvalOneAssign = lazy(() =>
  import("./pages/tutorpage/fluency/evaloneassign")
);

const FluencyTutorTrainAllAssign = lazy(() =>
  import("./pages/tutorpage/fluency/trainallassign")
);

const FluencyTutorTrainOneAssign = lazy(() =>
  import("./pages/tutorpage/fluency/trainoneassign")
);

const FluencyTutorAllPerformance = lazy(() =>
  import("./pages/tutorpage/fluency/allperformance")
);
const FluencyTutorOnePerformance = lazy(() =>
  import("./pages/tutorpage/fluency/oneperformance")
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
const PhonemeTutorEvalAllAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/evalallassign")
);
const PhonemeTutorEvalOneAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/evaloneassign")
);

const PhonemeTutorTestAllAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/testallassign")
);
const PhonemeTutorTestOneAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/testoneassign")
);

const PhonemeTutorTrainAllAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/trainallassign")
);
const PhonemeTutorTrainOneAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/trainoneassign")
);
const PhonemeTutorAllPerformance = lazy(() =>
  import("./pages/tutorpage/phoneme/allperformance")
);
const PhonemeTutorOnePerformance = lazy(() =>
  import("./pages/tutorpage/phoneme/oneperformance")
);

class App extends React.Component {
  componentDidMount = async () => {
    const doc = await axios.get("/auth/current_user");
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
              <Route
                exact
                path="/student/fluency/assignment"
                component={FluencyAssignment}
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
                path="/student/phoneme/assignment"
                component={PhonemeAssignment}
              />

              <Route exact path="/student/meaning" component={MeaningMain} />
              <Route
                exact
                path="/student/meaning/practise"
                component={MeaningPractise}
              />
              <Route
                exact
                path="/student/meaning/materials"
                component={MeaningMaterials}
              />
              <Route
                exact
                path="/student/meaning/assignment"
                component={MeaningAssignment}
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
                path="/tutor/fluency/testassign"
                component={FluencyTutorTestAllAssign}
              />
              <Route
                path="/tutor/fluency/testassign/:id"
                component={FluencyTutorTestOneAssign}
              />
              <Route
                exact
                path="/tutor/fluency/trainassign"
                component={FluencyTutorTrainAllAssign}
              />
              <Route
                path="/tutor/fluency/trainassign/:id"
                component={FluencyTutorTrainOneAssign}
              />
              <Route
                exact
                path="/tutor/fluency/assignment"
                component={FluencyTutorAssign}
              />
              <Route
                exact
                path="/tutor/fluency/evalassign"
                component={FluencyTutorEvalAllAssign}
              />
              <Route
                path="/tutor/fluency/evalassign/:id"
                component={FluencyTutorEvalOneAssign}
              />
              <Route
                exact
                path="/tutor/fluency/performance"
                component={FluencyTutorAllPerformance}
              />
              <Route
                path="/tutor/fluency/performance/:id"
                component={FluencyTutorOnePerformance}
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
                path="/tutor/phoneme/evalassign"
                component={PhonemeTutorEvalAllAssign}
              />
              <Route
                path="/tutor/phoneme/evalassign/:id"
                component={PhonemeTutorEvalOneAssign}
              />
              <Route
                exact
                path="/tutor/phoneme/testassign"
                component={PhonemeTutorTestAllAssign}
              />
              <Route
                path="/tutor/phoneme/testassign/:id"
                component={PhonemeTutorTestOneAssign}
              />
              <Route
                exact
                path="/tutor/phoneme/trainassign"
                component={PhonemeTutorTrainAllAssign}
              />
              <Route
                path="/tutor/phoneme/trainassign/:id"
                component={PhonemeTutorTrainOneAssign}
              />
              <Route
                exact
                path="/tutor/phoneme/performance"
                component={PhonemeTutorAllPerformance}
              />
              <Route
                path="/tutor/phoneme/performance/:id"
                component={PhonemeTutorOnePerformance}
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
