import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import useCreateOrganization from "loose-components/src/components/Modals/CreateOrganization";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./index.scss";

const CreateOrganization = ({ variables, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { onCreateOrganization, name, setName, plan, setPlan } = useCreateOrganization({ variables });
  const onSubmit = async () => {
    return stripe.createToken(elements.getElement(CardElement)).then(({ error, token }) => {
      if (!error && !!plan) {
        onCreateOrganization(token);
      }
    });
  };
  return (
    <div className="create-organization-modal">
      <Input type="text" placeholder="organization name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="Box create-organization-modal-subscription-container">
        <span className="create-organization-modal-subscription-title">standard 5$</span>
        <Button onClick={() => setPlan("STANDARD")}>{plan === "STANDARD" ? "Selected" : "Select"}</Button>
      </div>
      <CardElement />
      <Button
        onClick={async () => {
          await onSubmit();
          await closeModal();
        }}
      >
        Create Organization
      </Button>
    </div>
  );
};

export default ({ env, ...props }) => {
  const stripePromise = loadStripe(env.STRIPE_PUBLIC_KEY);
  return (
    <Elements stripe={stripePromise}>
      <CreateOrganization {...props} />
    </Elements>
  );
};
