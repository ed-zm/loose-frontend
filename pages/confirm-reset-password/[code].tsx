import React from 'react'
import ConfirmResetPassword from '../../src/screens/ConfirmResetPassword'
import PublicRoute from '../../src/router/PublicRoute'

export default PublicRoute(props => <ConfirmResetPassword { ...props }/>)
