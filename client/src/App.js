import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/useractions";
import ErrorBoundary from "./components/errorboundary/errorboundary";
import axios from "axios";
import Header from "./components/header/header";
const Main = lazy(() => import("./pages/mainpage/mainpage"));
const FluencyTrain = lazy(() => import("./pages/trainpage/fluencypage"));
const PhonemeTrain = lazy(() => import("./pages/trainpage/phonemepage"));
// const FluencyAssign = lazy(() => import("./pages/instructorpage/fluencypage"));
// const PhonemeAssign = lazy(() => import("./pages/instructorpage/phonemepage"));
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
              <Route exact path="/fluencytrain" component={FluencyTrain} />
              <Route exact path="/phonemetrain" component={PhonemeTrain} />
              {/* <Route exact path="/fluencyassign" component={FluencyAssign} />
              <Route exact path="/phonemeassign" component={PhonemeAssign} />
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
