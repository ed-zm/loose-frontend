import React from 'react'
import Teams from '../../../src/screens/Dashboard/Teams'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <Teams { ...props }/>)