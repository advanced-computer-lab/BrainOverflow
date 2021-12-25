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
	const flightId = search.get('flightId');
	const TicketId = search.get('TicketId');
	//console.log("Ana el container el lazooz",TicketId,flightId)
	const Summary={
        AdultNames:search.get(['AdultNames']),
        ChildrenNames:search.get(['ChildrenNames']),
        Cabin:search.get('Cabin'),
        Adults:search.get('Adults'),
        Children:search.get('Children'),
        DepartureId:search.get('DepartureId'),
        ReturnFlightId:search.get('ReturnFlightId'),
        DeparturePriceAdult:search.get('DeparturePriceAdult'),
        DeparturePriceChild:search.get('DeparturePriceChild'),
        DepatureTotalPrice:search.get('DepatureTotalPrice'),
        ReturnPriceAdult:search.get('ReturnPriceAdult'),
        ReturnPriceChild:search.get('ReturnPriceChild'),
        ReturnTotalPrice:search.get('ReturnTotalPrice')
                       
    };
	console.log("Container",Summary)
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}