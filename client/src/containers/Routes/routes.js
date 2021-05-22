import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/Header/Header";

import SuspenseLoading from "../../components/Loading/SuspenseLoading";

const AuthRoutes = lazy(() => import("./AuthRoutes"));

const Alert = lazy(() => import("../Alert/Alert"));
const Landing = lazy(() => import("../../components/Landing/Landing"));
const CreateAccount = lazy(() => import("../Register/CreateAccount"));
const Verification = lazy(() => import("../Verification/Verification"));
const Login = lazy(() => import("../Login/Login"));
const UpdateAccount = lazy(() => import("../Register/UpdateAccount"));
const Notes = lazy(() => import("../Notes/Notes"));
const CreateNote = lazy(() => import("../CreateNote/CreateNote"));
const UpdateNote = lazy(() => import("../CreateNote/UpdateNote"));

const WrongRoute = lazy(() => import("../../components/WrongRoute/WrongRoute"));

const Routes = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<SuspenseLoading />}>
        <Alert />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={CreateAccount} />
          <Route path="/verify-otp" component={Verification} />
          <Route path="/login" exact component={Login} />
          <AuthRoutes path="/edit-account" exact component={UpdateAccount} />
          <AuthRoutes path="/notes" exact component={Notes} />
          <AuthRoutes path="/create-note" exact component={CreateNote} />
          <AuthRoutes
            path="/update-note/:noteId"
            exact
            component={UpdateNote}
          />

          <Route component={WrongRoute} />
        </Switch>
      </Suspense>
    </>
  );
};

export default Routes;
