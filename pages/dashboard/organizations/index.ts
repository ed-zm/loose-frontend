import React from 'react'
import Organizations from '../../../src/screens/Dashboard/Organizations'
import PublicRoute from '../../../src/router/PublicRoute'

export default () => PublicRoute(props => <Organizations { ...props }/>)