import React from 'react'
import Organization from '../../../src/screens/Dashboard/Organization'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <Organization { ...props }/>)