import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../../components/Button";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </Elements>
  );
};

const stripePromise = loadStripe("pk_test_vLb0eUqmA2b9YEf4FlU4v24n");

export default () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
