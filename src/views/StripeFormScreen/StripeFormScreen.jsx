import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
	"pk_test_51KcXGkHXCKhZWvFTIQZJF2gJNKcgFpC71BbmlDbrLm1AjQiqvRK8nW0HWk5ii5BCSeTDmYKM3N3x7K8gRpOrcbpm00IZTAgbWa"
);

const StripeFormScreen = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default StripeFormScreen;
