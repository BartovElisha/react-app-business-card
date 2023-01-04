import React from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./tokenMenagment";

interface Props {
    children: React.ReactNode;
}

function RouteGuard({ children }: Props) {
    return verifyToken() ? (
        <>
            {children}
        </>
    ) : (
        <Navigate 
            replace={true}
            to="/signin"
        />
    )       
}

export default RouteGuard;