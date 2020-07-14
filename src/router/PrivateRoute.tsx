import React, { useContext } from "react";
import gql from "graphql-tag";
import nextCookies from "next-cookies";
import Cookies from "js-cookie";
import initApollo from "../config/apollo";
import Providers from "./Providers";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import getEnv from "../utils/getEnv";
import getConfig from "next/config";
import { UIContext } from "loose-components/src/contexts/UI";
import Loading from "../components/Loading";
import "../styles/index.scss";

const LOGGED_IN = gql`
  query {
    loggedIn {
      id
      firstName
      lastName
      username
    }
  }
`;

const LoadingComponent = ({ children }) => {
  const { loading } = useContext(UIContext);
  return (
    <React.Fragment>
      {loading && <Loading style={{ position: "fixed" }} />}
      {children}
    </React.Fragment>
  );
};

const PrivateRoute = (ComposedComponent) => {
  const Component = ({ token, user, ...props }) => {
    if ((!user || !user.data.loggedIn) && process.browser) props.url.push("/sign-in");
    return (
      <Providers user={user ? user.data.loggedIn : null} token={props.token}>
        <div className="main-layout">
          <div className="header-layout">
            <Header />
          </div>
          {/* <div className = 'sidebar-layout'>
          <Sidebar />
        </div> */}
          <div className="content-layout">
            <LoadingComponent>
              <ComposedComponent {...props} />
            </LoadingComponent>
          </div>
        </div>
      </Providers>
    );
  };

  Component.getInitialProps = async (ctx) => {
    let userAgent,
      user = null,
      token = "";
    if (!process.browser) {
      userAgent = ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent;
      token = nextCookies(ctx).token;
    } else {
      userAgent = navigator.userAgent;
      token = Cookies.get("token");
    }
    const apollo = initApollo(token);
    try {
      user = await apollo.query({
        query: LOGGED_IN,
      });
    } catch (e) {}
    const { publicRuntimeConfig } = getConfig();
    const env = getEnv(publicRuntimeConfig);
    return { token, user, env };
  };
  return Component;
};

export default PrivateRoute;
