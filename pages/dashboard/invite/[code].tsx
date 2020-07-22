import React from "react";
import Invite from "../../../src/screens/Dashboard/Invite";
import PrivateRoute from "../../../src/router/PrivateRoute";

export default PrivateRoute((props) => <Invite {...props} />);
