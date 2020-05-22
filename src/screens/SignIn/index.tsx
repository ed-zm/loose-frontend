import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useSignIn from "loose-components/src/screens/SignIn";
import parseError from "loose-components/src/utils/parseError";
import { useRouter } from "next/router";
import errors from "loose-components/src/utils/errors";
import "./index.scss";

const SignIn = () => {
  const router = useRouter();
  const { accountCreated } = router.query;
  const {
    email,
    setEmail,
    password,
    setPassword,
    onSignIn,
    signingIn,
    error,
    onResendVerificationEmail,
    resendingVerificationEmail,
    resendVerificationEmailError,
    resendVerificationEmailSent,
  } = useSignIn({
    callback: async () => await router.push("/dashboard"),
    setToken: (token) => Cookies.set("token", token),
  });
  const parsedError = parseError(error);
  return (
    <div className="sign-in-container">
      <div className="sign-in-logo">
        <span className="sign-in-logo-text">Loose Dev</span>
      </div>
      <div className="sign-in-form-wrapper">
        <div className="sign-in-title">Sign In to Loose Dev</div>
        {parsedError && (
          <div className="sign-in-error flash flash-full flash-error">
            {parsedError}
            {parsedError === errors.CONFIRM_EMAIL && (
              <div>
                {resendVerificationEmailError && <span>{parseError(resendVerificationEmailError)}</span>}
                {resendVerificationEmailSent ? (
                  <span>{errors.VERIFICATION_EMAIL_SENT}</span>
                ) : (
                  <Button onClick={onResendVerificationEmail} submitting={resendingVerificationEmail}>
                    Resend Verification Email
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
        <div className="Box auth-form-body sign-in-form-container">
          {/* <span className = 'sign-in-title'>Sign In</span> */}
          <label className="sign-in-form-label" for="email-field">
            Email Address
          </label>
          <Input
            id="email-field"
            className="input-block"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="sign-in-form-label" for="password-field">
            Password
            <Link href="/reset-password">
              <a className="label-link">Forgot Password?</a>
            </Link>
          </label>
          <Input
            id="password-field"
            className="input-block"
            value={password}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSignIn();
            }}
          />
          <Button className="sign-in-form-button" onClick={onSignIn} disabled={signingIn}>
            Sign In
          </Button>
        </div>
        <div className="Box sign-in-sign-up-box">
          <span>New to Loose Dev? </span>
          <Link href="/sign-up">
            <a className="sign-in-sign-up-box-link">Create an Account</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
