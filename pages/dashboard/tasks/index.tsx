import React from "react";
import Tasks from "../../../src/screens/Dashboard/Tasks";
import PrivateRoute from "../../../src/router/PrivateRoute";

export default PrivateRoute((props) => <Tasks {...props} />);
