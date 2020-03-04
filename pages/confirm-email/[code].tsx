import React from 'react'
import ConfirmEmail from '../../src/screens/ConfirmEmail'
import PublicRoute from '../../src/router/PublicRoute'

export default PublicRoute(props => <ConfirmEmail { ...props }/>)
