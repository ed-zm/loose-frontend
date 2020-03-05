import React from 'react'
import Task from '../../../src/screens/Dashboard/Task'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <Task { ...props }/>)