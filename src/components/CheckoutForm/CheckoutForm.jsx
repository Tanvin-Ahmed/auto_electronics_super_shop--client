import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import { getClientSecret, payOrder } from "../../app/actions/orderActions";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import countryCodeLookup from "country-code-lookup";

const CheckoutForm = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const { order } = useSelector((state) => state.orderDetails);
  const { loading } = useSelector((state) => state.orderPay);
  const [paymentStatus, setPaymentStatus] = useState({
    success: "",
    error: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    dispatch(getClientSecret(setClientSecret, order.totalPrice));
  }, [order.totalPrice, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus({ error: "", success: "" });

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card === null) return;
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: order?.user?.email,
        name: order?.user?.name,
        phone: "017xxxxxxxx",
        address: {
          city: order.shippingAddress.city,
          country: countryCodeLookup.byCountry(order.shippingAddress.country)
            .internet,
          postal_code: order.shippingAddress.postalCode,
        },
      },
    });

    if (error) {
      setPaymentStatus({ error: error.message, success: "" });
      setProcessing(false);
    } else {
      //payment intent
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: order?.user?.name,
              email: order?.user?.email,
              address: {
                city: order.shippingAddress.city,
                country: countryCodeLookup.byCountry(
                  order.shippingAddress.country
                ).internet,
                postal_code: order.shippingAddress.postalCode,
              },
            },
          },
        });

      if (intentError) {
        setPaymentStatus({ error: error.message, success: "" });
        setProcessing(false);
      } else {
        const paymentInfo = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          updateTime: paymentIntent.created,
          email: paymentMethod.billing_details.email,
        };
        dispatch(payOrder(orderId, paymentInfo, setPaymentStatus));

        setPaymentStatus({ error: "", success: "Payment Successful!" });
        setProcessing(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        className="btn-block mt-2 col-12"
        type="submit"
        disabled={!stripe || !setClientSecret || processing || loading}
      >
        Pay ${order.totalPrice}
      </Button>
      {loading ? (
        <Loader />
      ) : paymentStatus.error ? (
        <div className="mt-4">
          <Message variant="danger">{paymentStatus.error}</Message>
        </div>
      ) : paymentStatus.success ? (
        <div className="mt-4">
          <Message variant="success">{paymentStatus.success}</Message>
        </div>
      ) : null}
    </Form>
  );
};

export default CheckoutForm;
