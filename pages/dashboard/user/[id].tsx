import React from 'react'
import User from '../../../src/screens/Dashboard/User'
import PublicRoute from '../../../src/router/PublicRoute'

export default () => PublicRoute(props => <User { ...props }/>)