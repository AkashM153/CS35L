import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import SignUpPage from './signup';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignUpPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;