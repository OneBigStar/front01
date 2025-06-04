import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore";
import { useEffect } from "react";

export default function OAuth2RedirectHandler(){
    
    const navigate= useNavigate();
    const zu_login= useAuthStore((state)=>state.zu_login);

    useEffect(()=>{
        // 1. 쿠키에서 AuthToken 확인
        const token= document.cookie
        .split("; ")
        .find((row)=>row.startsWith("authToken="))
        ?.split("=")[1];
        console.log(token);

        if(token){
            localStorage.setItem("tokens", JSON.stringify({accessToken: token}));
            zu_login();

            const provider= document.cookie
            .split("; ")
            .find((row)=>row.startsWith("snsProvider="))
            ?.split("=")[1];
            if(provider){
                localStorage.setItem("snsProvider", provider);
            }
            navigate("/");
        }else{
            console.log("authToken 쿠키 없음 ")
            navigate("/login");
        }

    },[navigate, zu_login]);

    return <p>소셜 로그인 처리 중 입니다.</p>
}