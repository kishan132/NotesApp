import React from "react";
import { Helmet } from "react-helmet-async";

import Banner from "./Banner/Banner";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>Home | Notes App</title>
      </Helmet>

      <Banner />
    </>
  );
};

export default Landing;
