import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import SignUpPage from './signup';
import LogInPage from './login';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignUpPage/>}/>
                <Route exact path="/login" element={<LogInPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;