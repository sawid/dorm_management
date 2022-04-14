import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../function.components/auth";

const AdminRoute = ({children}) => {
        const { user } = useSelector((state) => ({...state}))
        const [ok, setOk] = useState()
        console.log(user)
        debugger;
    
        useEffect(()=>{
    
        if(user && user.token){
            console.log("do currentAdmin")
            
            currentAdmin(user.token)
            .then(res=>{
                //res
                console.log("Not Re")
                console.log(res)
                setOk(true)
            }).catch(err=>{
                //err
                console.log("Re")
                console.log(err)
                setOk(false)
            })
        }   
    
        },[user])
    
        console.log(ok)
        return ok
        ? children
        : <LoadingToRedirect />
    }
    
export default AdminRoute
