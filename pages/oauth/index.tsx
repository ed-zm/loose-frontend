import React from 'react'
import Oauth from '../../src/screens/Oauth'
import PublicRoute from '../../src/router/PublicRoute'

export default PublicRoute(props => <Oauth { ...props }/>)
