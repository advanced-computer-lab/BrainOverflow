# BrainOverflow
 ## Team Members

* Salma Khalid Shreef

* Alia 

* Veronika Fayez 

* Haidy Ayman Abdelkhalek Abdelrazek Tohfa

* Abdullah Husam Khalil

## Routes

### 1. Administrator Functionalities :

* ####  Create Flight.

	* Functionality : create a new flight
	* Route : /createFlight
	* Request type : POST
	* Response : 
***



* #### View all existing flights.
	* Functionality : view a list of all available  flights
	* Route : /viewFlights
	* Request type : GET
***




* #### Update a flight.
	* Functionality : update (edit) any selected flight and its details including flight number, departure and arrival times, number of available Economy seats, number of Business Class seats, dates and airports.
	* Route : /updateFlight
	* Request type : GET
	* Response : 
***

* #### Delete a flight.
	* Functionality : delete any selected flights and all their details upon confirmation
	* Route : /delete
	* Request type : DELETE
	* Response : A prompt popup to confirm deletion.  
***

### 2. Guest User Functionalities :

* #### Search for a flight.
	* Functionality : search for available flights based on number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class
	* Route : /searchFlights
	* Request type : POST	
***

* #### View flight details.
	* Functionality : see all details of a selected flight
	* Route : /viewFlight/:id
	* Request type : GET
***


* #### View flight details.
	* Functionality : see all details of a selected flight
	* Route : /viewFlight/:id
	* Request type : GET
***


* #### Signup.
	* Functionality : Signup by entering their details in a form including first name, last name, home address, country code, telephone number(s), email and passport number and creating a username and password
	* Route : /viewFlight/:id
	* Request type : GET
***


### 3. Existing User Functionalities :

* #### Search for a flight.
	* Functionality : search for available flights based on number of passengers (children and adults), departure airport and arrival airport terminals, departure and arrival dates and cabin class
	* Route : /searchFlights
	* Request type : POST	
***

* #### View flight details.
	* Functionality : see all details of a selected flight
	* Route : /viewFlight/:id
	* Request type : GET
***


* #### Confirm Reserving.
	* Functionality : confirm reserving the chosen flight
	* Route : /confirmReserve
	* Request type : POST
***

* #### Select Seat.
	* Functionality : select one or more of the available seats in the chosen cabin of the chosen departure flight
	* Route : /viewSeats/:id/:FlightId/:Cabin/:TicketId
	* Request type : GET
***

* #### View Reserved Flights.
	* Functionality : view all their current reserved flights
	* Route : /viewReserved
	* Request type : GET
***

* #### Update Their Profile.
	* Functionality : edit their information including first name, last name, passport number and email
	* Route : /updateProfile
	* Request type : PUT
***


* #### Signin.
	* Functionality : signin using username and password
	* Route : 
	* Request type : 
***

* #### Change Seat.
	* Functionality : Change reserved seat or seats for a selected flight
	* Route : /changeSeats
	* Request type : GET
***


* #### Change Flight.
	* Functionality : edit a selected reserved flight
	* Route : /changeFlight
	* Request type : GET
***