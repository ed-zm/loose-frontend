import React from 'react'
import Organizations from '../../../src/screens/Dashboard/Organizations'
import PrivateRoute from '../../../src/router/PrivateRoute'

export default PrivateRoute(props => <Organizations { ...props }/>)