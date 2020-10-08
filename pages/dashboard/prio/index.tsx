import React from "react";
import Prio from "../../../src/screens/Dashboard/Prio";
import PrivateRoute from "../../../src/router/PrivateRoute";

export default PrivateRoute((props) => <Prio {...props} />);
