import React from 'react'
import Team from '../../../src/screens/Dashboard/Team'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <Team { ...props }/>)