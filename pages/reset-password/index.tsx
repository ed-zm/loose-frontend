import React from 'react'
import ResetPassword from '../../src/screens/ResetPassword'
import PublicRoute from '../../src/router/PublicRoute'

export default PublicRoute(props => <ResetPassword { ...props }/>)
