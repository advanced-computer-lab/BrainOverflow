import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import {useParams,useLocation,Link} from "react-router-dom";
import { Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#00008B",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {    
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const [paymentId,setPaymentId]= useState('');
    const navigate = useNavigate();
    const [HasError, setHasError] = useState(false);
    const [Error, setError] = useState('');
    const stripe = useStripe()
    const elements = useElements();
    const {id} = useParams();
    let location = useLocation();
    let search=new URLSearchParams(location.search);
    const PriceDifference= search.get('PriceDifference');
    const flightId = search.get('flightId');
    console.log("flightId fel payment form",flightId)
    const TicketId = search.get('TicketId');
    const Summary={
        AdultNames:[search.get('AdultNames')],
        ChildrenNames:[search.get('ChildrenNames')],
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
    console.log("summary",Summary)
    var amount=0;
   // PriceDifference!=null?amount=PriceDifference: amount=returnTotalPrice+depatureTotalPrice;

   // const Summary = search.get('Summary');
    console.log("Summary ",Summary)

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        console.log(Summary);
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8000/user/payment", {
                amount:Summary.ReturnTotalPrice+Summary.DepatureTotalPrice,
                id
            }).then(res=>{
                console.log("res",res.data.paymentId)
                setPaymentId(res.data.paymentId)
                axios.post(`http://localhost:8000/user/confirmReserved`,{Summary :Summary,paymentId:res.data.paymentId}).then(res=>{
                    setSuccess(true);
                
                
            })})
                
            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
                
            }

        } catch (error) {
            console.log("Error", error)
        }
         
    }
}
const handleRefund= async (e) => {
    e.preventDefault()

            const response = await axios.post(`http://localhost:8000/user/refund/${TicketId}`, {
            amount:PriceDifference,
            TicketId:TicketId,
            id
        }).then(setSuccess(true))
      
        try {
            //console.log(chosenSeatId)
            console.log("ana fel change")
          await axios.put(`http://localhost:8000/user/changeFlight/${TicketId}/${flightId}`)
          .then(setSuccess(true));
        } 
        catch{
            setHasError(true);
            setError('Sorry , An error occured');        }   
        
}

const handlePayDifference=async (e)=>{
    e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8000/user/payment", {
                amount:PriceDifference,
                id
            }).then(res=>{
                console.log("res",res.data.paymentId)
                //setPaymentId(res.data.paymentId);
                setSuccess(true)
            })
                
            if(response.data.success) {
                console.log("Successful payment")
               
                
            }

        } catch (error) {
            console.log("Error", error)
        }
    
    try {
        //console.log(chosenSeatId)
      await axios.put(`http://localhost:8000/user/changeFlight/${TicketId}/${flightId}`)
      .then(navigate(`/user/viewReserved`, { replace: true }));

    } catch (error) {
      setHasError(true);
      setError('Sorry , An error occured');
    }
  }
}
    return (
        <Container style={{marginTop:"20%"}}>
        <>
        {!success && PriceDifference==null&& Summary!=null&&
        <form onSubmit={handleSubmit}>
                    <CardElement options={CARD_OPTIONS}/>
            <button>Pay</button>
        </form>
        }
        {!success && PriceDifference>0&&
        <form onSubmit={handlePayDifference}>
                    <CardElement options={CARD_OPTIONS}/>
            <button>Pay difference between the flights</button>
        </form>
        }
        {!success && PriceDifference<0&&
        <form onSubmit={handleRefund}>
                    <CardElement options={CARD_OPTIONS}/>
            <button>Refund difference between the flights</button>
        </form>
        }
       {success&&<div>
           <h2>You have successfully confirmed your tickets </h2>
           { 
                    <Link to={{ pathname:`/user/viewReserved` 
                        
                           }}className="btn btn-primary " color="success">View all you reserved tickets !</Link> 
                     }
       </div> 
        }
            
        </>
        </Container>
    )
    }