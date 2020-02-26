import React from 'react'
import Tasks from '../../../src/screens/Dashboard/Tasks'
import PublicRoute from '../../../src/router/PublicRoute'

export default PublicRoute(props => <Tasks { ...props }/>)