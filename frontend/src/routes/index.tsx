import {  Route, Routes } from "react-router-dom";
import { Login } from "../page/Login";
import { Register } from "../page/Register";
import { Dashboard } from "../page/Dashboard";
import Schedules from "../page/Schedules";

export const RouteApp = () => {
    return (

        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/schedules' element={<Schedules />} />
        </Routes>
    )
} 