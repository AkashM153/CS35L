# BruinConnect
An app designed for Bruins to upload and view events around campus/Westwood!
Tired of experiencing FOMO from missing out on campus’ greatest events? Sick of not knowing why all the coolest kids are walking down Gayley on a Thursday night? This full-stack app allows users to see and upload all the best events for you! 

Submitted for CS35L Project

## Usage
Setup:

1- Clone the master repository
git clone https://github.com/AkashM153/CS35L.git

2- Install Node.js on your computer and run `npm install` in the actual Git directory.

3- This project utilizes a Google Maps API. In src/page/googlemaps.js, you must replace the filler API-Key with your actual API-Key. Keys can be obtained from Google Cloud Console.

4- This project also requires a connection to a MongoDB Atlas database. Once you create a new project, select "Database" in "Deployments", and select "Connect". There will be an option for "Drivers", select it and select "Node.js" of "Version 4.1 or later". Copy the provided connection url assigned to "const uri", and assign it to "const uri" in mongo.js.

5- Open two terminals. Navigate one to the backend using `cd backend` and then run the command `node server.js`. In the other terminal type `npm start`. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
This app allows for user creation and login. It features the ability to upload and view events and make friends with other users. Users are also able to like events and view friends' likes. Each event's location is marked on Google Maps using geo coordinates. Each event listing displays the event title, organization, location, timing, description and the number of likes. 