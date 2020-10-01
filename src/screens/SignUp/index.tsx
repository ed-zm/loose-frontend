import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import parseError from "loose-components/src/utils/parseError";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { loadStripe } from "@stripe/stripe-js";
import useSignUp from "loose-components/src/screens/SignUp";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import "./index.scss";

const SignUp = () => {
  const stripe = useStripe();

  const elements = useElements();
  const router = useRouter();
  const { inviteCode } = router.query;
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    onSignUp,
    data,
    error,
    signingUp,
    plan,
    setPlan,
  } = useSignUp({
    inviteCode: router.query.inviteCode,
    callback: async (token) => {
      if (!!token && inviteCode) {
        await Cookies.set("token", token);
        router.push(`/dashboard/invite/${inviteCode}`);
      } else {
        router.push(`/sign-in?accountCreated=true&mail=${email}`);
      }
    },
  });

  const onSubmit = async () => {
    stripe.createToken(elements.getElement(CardElement)).then(({ error, token }) => {
      if (!error) onSignUp(token);
    });
  };
  const parsedError = parseError(error);
  return (
    <div className="sign-up-container">
      <div className="Box sign-up-subscription-container">
        <span className="sign-up-subscription-title">standard 5$</span>
        <Button onClick={() => setPlan("STANDARD")}>{plan === "STANDARD" ? "Selected" : "Select"}</Button>
      </div>
      {!!plan && (
        <React.Fragment>
          <div className="mb-4 mb-md-8 container-md">
            <div className="text-mono text-center text-gray-light text-normal mb-3">Join Loose Dev</div>
            <h1 className="d-none d-md-block mt-0 mb-3 text-center h00-mktg lh-condensed-ultra">Create Your Account</h1>
          </div>
          <div className="sign-up-form-container">
            <label className="sign-up-form-label" for="first-name-field">
              First Name:
            </label>
            <Input
              className="input-block sign-up-form-input"
              id="first-name-field"
              value={firstName}
              placeholder="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="sign-up-form-label" for="last-name-field">
              Last Name:
            </label>
            <Input
              className="input-block sign-up-form-input"
              id="last-name-field"
              value={lastName}
              placeholder="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="sign-up-form-label" for="username-field">
              Username:
            </label>
            <Input
              className="input-block sign-up-form-input"
              id="username-field"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="sign-up-form-label" for="email-field">
              Email:
            </label>
            <Input
              className="input-block sign-up-form-input"
              id="email-field"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="sign-up-form-label" for="password-field">
              Password:
            </label>
            <Input
              className="input-block sign-up-form-input"
              id="password-field"
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") onSignUp();
              }}
            />
            <div className="input-block sign-up-form-stripe-container">
              <label className="sign-up-form-label">Card Information:</label>
              <CardElement />
            </div>
            {parsedError && <div className="sign-in-error flash flash-full flash-error">{parsedError}</div>}
            <Button
              className="btn-mktg signup-btn  js-octocaptcha-form-submit width-full"
              onClick={onSubmit}
              submitting={signingUp}
            >
              Create Account
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ({ env, ...props }) => {
  const stripePromise = loadStripe(env.STRIPE_PUBLIC_KEY);
  return (
    <Elements stripe={stripePromise}>
      <SignUp {...props} />
    </Elements>
  );
};
