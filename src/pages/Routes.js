import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import LoginPage from './Login';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;