import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Login } from "../page/Login";

export const RouteApp = ()=>{
    return(
       
            <Routes>
                <Route path='/' element={<Login/>
                }
                />
                    <Route path='/register' element={
                    <>
                        <h1>Rota de Register</h1>
                    </>
                }
                />
            </Routes>
   
    )
} 