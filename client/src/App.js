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
const PhonemeTutorAllAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/allassign")
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
                path="/tutor/phoneme/allassign"
                component={PhonemeTutorAllAssign}
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
