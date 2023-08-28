import App from '/imports/ui/App';
import React from 'react';
import Hello from '/imports/ui/Hello.jsx';
import Info from '/imports/ui/Info.jsx';
import { Route, BrowserRouter, Routes } from "react-router-dom";
export const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path="/" exact />
                <Route element={<Hello />} path="/sobre" />
                <Route element={<Info />} path="/usuario" />
            </Routes>
        </BrowserRouter>
    );
}