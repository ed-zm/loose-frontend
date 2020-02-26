import React from 'react'
import Organization from '../../../src/screens/Dashboard/Organization'
import PublicRoute from '../../../src/router/PublicRoute'

export default () => PublicRoute(props => <Organization { ...props }/>)