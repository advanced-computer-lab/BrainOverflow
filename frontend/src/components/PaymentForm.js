import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import {useParams,useLocation,Link} from "react-router-dom";
import { Button, Container } from 'reactstrap';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
            backgroundColor:"white",
            height:"200px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#95D1CC" },
			"::placeholder": { color: "##95D1CC" }
		},
		invalid: {    
			iconColor: "#F6F2D4",
			color: "rgb(223, 71, 89)"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements();
    const {id} = useParams();
        let location = useLocation();
    let search=new URLSearchParams(location.search);
    const returnTotalPrice=search.get('ReturnTotalPrice');
    const depatureTotalPrice=search.get('DepatureTotalPrice');
    const Summary={
        AdultNames:search.get('AdultNames'),
        ChildrenNames:search.get('ChildrenNames'),
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
    
    const handleSubmit = async (e) => {
        console.log(returnTotalPrice)
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
                amount:returnTotalPrice+depatureTotalPrice,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
        try {
            await axios.post(`http://localhost:8000/user/confirmReserve/${id}`,Summary) 
            } catch (error) {
            console.error(error);
          }
    } else {
        console.log(error.message)
    }
}

    return (
        <div style={{backgroundColor:'#FFF'}}>
        <Container style={{backgroundColor:'#FFF'}}>
        <>
        {!success ? 
        <form onSubmit={handleSubmit} style={{marginTop:'20%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px',color:'#FFF'}}>
                    <CardElement options={CARD_OPTIONS}/>
            <button style={{color:'#FFFFFF',width:'30%',backgroundColor:'#d4902a',padding:'10px',borderRadius:'6px',marginLeft:'35%',marginRight:'auto'}}>Pay</button>
        </form>
        ://user/viewReserved/:id
       <div>
           <h2>You have successfully confirmed your tickets </h2>
           { 
                    <Link to={{ pathname:`/user/viewReserved/${id}` 
                        
                           }}className="btn btn-primary " color="success">View all you reserved tickets !</Link> 
                     }
       </div> 
        }
            
        </>
        </Container>
        </div>
    )
      }