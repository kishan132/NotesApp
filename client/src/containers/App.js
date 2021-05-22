import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Box from "@material-ui/core/Box";

import Routes from "./Routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Box className="App">
          <Routes />
        </Box>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
