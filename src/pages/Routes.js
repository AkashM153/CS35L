import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './signup';
import LogInPage from './login';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signup" element={<SignUpPage/>}/>
                <Route exact path="/" element={<Navigate to="/login" />}/>
                <Route exact path="/login" element={<LogInPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;