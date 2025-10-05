import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import NotFound from "@pages/NotFound";
import ToDo from "@pages/ToDo";
import Home from "@pages/Home";
import Material from "@pages/Material"
import Header from "@widgets/Header";
import logo from "../public/logo.png";
import React from "react";
import Footer from "@widgets/Footer";
// @ts-ignore
import type {INavItem} from "@type/nav.type.ts";


function App() {

    const navItems: INavItem[] = [
        {id: "1", label: "Home", to: "/"},
        {id: "2", label: "About", to: "/ToDo"},
        {id: "3", label: "Contact", to: "/dd"},
        {id: "4", label: "Material", to: "/Material"}
    ];
    const love = "C любовью JenesiusGroup ❤️"

    return (
        <>
            <BrowserRouter>
            <Header logo={logo} navItems={navItems}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/ToDo" element={<ToDo/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/Material" element={<Material/>}/>
                </Routes>
            <Footer love={love}/>
            </BrowserRouter>
        </>
    );
}

export default App;
