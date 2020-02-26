import Cookies from 'js-cookie'
import apollo from '../config/apollo'
import Providers from './Providers'

const PrivateRoute = (ComposedComponent) => {
  const Component = props =>
    <Providers>
      <ComposedComponent { ...props } />
    </Providers>

  Component.getInitialProps = async (ctx) => {
    let userAgent, token = ''
    if(!process.browser) {
      userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
      token = ctx && ctx.req && ctx.req.cookies && ctx.req.cookies.token ?
      ctx.req.cookies.token : ''
    } else {
      userAgent = navigator.userAgent
      token = Cookies.get('token')
    }
    if(!process.browser) apollo(token)
    
    return({ loggedIn: true })
  }
  return Component
  }
  
export default PrivateRoute