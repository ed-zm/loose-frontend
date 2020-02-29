import React from 'react'
import User from '../../../src/screens/Dashboard/User'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <User { ...props }/>)