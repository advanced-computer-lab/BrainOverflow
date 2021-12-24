import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Ticket.css';

function ticket(){
    return(
        <div> 
         <div class="box">
    <ul class="left">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    
    <ul class="right">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="ticket">
      <span class="airline">TURKISH AIRLANES</span>
      <span class="airline airlineslip">THY</span>
      <span class="boarding">BİNİŞ KARTI</span>
      <div class="content">
        <span class="jfk">SAW</span>
        <span class="plane"><svg clip-rule="evenodd" fill-rule="evenodd" height="60" width="60" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
        <span class="sfo">TZX</span>
        
        <span class="jfk jfkslip">SAW</span>
        <span class="plane planeslip"><svg clip-rule="evenodd" fill-rule="evenodd" height="50" width="50" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
        <span class="sfo sfoslip">TZX</span>
        <div class="sub-content">
          <span class="watermark">TURKISH </span>
          <span class="name">YOLCU ADI<br/><span>Sener Yilmaz</span></span>
          <span class="flight">UÇUŞ NO&deg;<br/><span>TK7434</span></span>
          <span class="gate">KAPI <br/><span>26B</span></span>
          <span class="seat">KOLTUK <br/><span>45A</span></span>
          <span class="boardingtime">BİNİŞ ZAMANI<br/><span>18:45 12 ARALIK 2016</span></span>
              
           <span class="flight flightslip">UÇUŞ NO&deg;<br/><span>TK7434</span></span>
            <span class="seat seatslip">KOLTUK <br/><span>45A</span></span>
           <span class="name nameslip">YOLCU ADI<br/><span>Sener, Yilmaz</span></span>
        </div>
      </div>
      
      <div class="barcode"></div>
      <div class="barcode slip"></div>
    </div>
  </div>
  <br/>

  <div class="box" >
    <ul class="left">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    
    <div class="ticket">
      <span class="airline">SKY OVERFLOW</span>
      <span class="airline airlineslip">SKY</span>
      <span class="boarding">CAIRO</span>
      <div class="content" style={{width:'600px'}}>
        <span class="jfk">SAW</span>
        <span class="plane"><svg clip-rule="evenodd" fill-rule="evenodd" height="60" width="60" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
        <span class="sfo">TZX</span>
        
        <span class="jfk jfkslip">SAW</span>
        <span class="plane planeslip"><svg clip-rule="evenodd" fill-rule="evenodd" height="50" width="50" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
        <span class="sfo sfoslip">TZX</span>
        <div class="sub-content" style={{width:'600px'}}>
          <span class="watermark">TURKISH </span>
          <span class="name">YOLCU ADI<br/><span>Sener Yilmaz</span></span>
          <span class="flight">UÇUŞ NO&deg;<br/><span>TK7434</span></span>
          <span class="gate">KAPI <br/><span>26B</span></span>
          <span class="seat">KOLTUK <br/><span>45A</span></span>
          <span class="boardingtime">BİNİŞ ZAMANI<br/><span>18:45 12 ARALIK 2016</span></span>
              
           <span class="flight flightslip">UÇUŞ NO&deg;<br/><span>TK7434</span></span>
            <span class="seat seatslip">KOLTUK <br/><span>45A</span></span>
           <span class="name nameslip">YOLCU ADI<br/><span>Sener, Yilmaz</span></span>
        </div>
      </div>
      
      <div class="barcode"></div>
      <div class="barcode slip"></div>
    </div>
  </div>


  </div>
  
  
  );
}
export default ticket;