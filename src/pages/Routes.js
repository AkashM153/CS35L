import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './signup';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/signup" element={<SignUpPage/>}/>
                <Route exact path="/" element={<Navigate to="/signup" />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;