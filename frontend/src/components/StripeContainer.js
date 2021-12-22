import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import {useParams,useLocation} from "react-router-dom";
const PUBLIC_KEY = "pk_test_51K8UnBGmD9zb7igM40mvLbfck1CsX3cEjW77jXLhs7GAyaZ1UVMhSDmCvkIV2v7vp6d6Z1lMs8pC1PJW5Y4jkbEM009SpLSVo5"

const stripeTestPromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer() {
	
	let location = useLocation();
    let search=new URLSearchParams(location.search);
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}