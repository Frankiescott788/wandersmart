import {ReactElement, useContext} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard.tsx";
import Overview from "@/pages/overview/overview.tsx";
import 'mapbox-gl/dist/mapbox-gl.css';
import Signup from "./pages/signup/signup.tsx";
import Signin from "./pages/signin/sign.tsx";
import { AuthContext } from "./context/Authprovider.tsx";
import Loading from "./components/loading.tsx";

export default function App() : ReactElement {

    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if(isLoading) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={isAuthenticated ?<DashboardLayout /> : <Navigate to={"/signin"}/>}>
                    <Route index element={<Overview />}/>
                </Route>
                <Route path="/signin" element={isAuthenticated ? <Navigate to={"/"}/> :<Signin />}/>
                <Route path="/signup" element={isAuthenticated ? <Navigate to={"/"}/> : <Signup />} />
            </Routes>
        </BrowserRouter>
    )
}