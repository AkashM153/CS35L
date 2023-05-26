import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './signup';
import LogInPage from './login';
import Test from './test';
import GoogleMapsPage from "./googlemaps"
import HomePage from "./home"
import EventPage from "./eventpage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signup" element={<SignUpPage/>}/>
                <Route exact path="/" element={<Navigate to="/login" />}/>
                <Route exact path="/login" element={<LogInPage/>}/>
                <Route exact path="/home" element={<HomePage/>}/>
                <Route exact path="/addevent" element={<EventPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
