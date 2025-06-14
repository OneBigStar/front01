import { useState } from "react";
import '../styles/login.css'
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import useAuthStore from "../store/authStore";

export default function Login(){
    // 로그인 상태 호출하자  AuthContext.jsx에 있다.
    // const {setIsLoggedIn} = useAuth();
    
    // zustand
    const zu_login = useAuthStore((state)=>state.zu_login);

    const [m_id, setM_id] = useState("");
    const [m_pw, setM_pw] = useState("");
    const navigate = useNavigate();

    // Axios로 SpringBoot 서버에 POST로 요청
    const handleLogin = async () => {
        try {
            const response = await login(m_id, m_pw);
            const resData = response.data;

            if (resData.success && resData.data) {
            const { accessToken, refreshToken } = resData.data;
            localStorage.setItem("tokens", JSON.stringify({ accessToken, refreshToken }));
            zu_login();
            navigate('/');
            } else {
            alert(resData.message || "로그인 실패");
            }
        } catch (error) {
            console.log("Axios 에러:", error);
            alert("서버 또는 네트워크 에러");
        }
    };
    return(
        <div className="login-wrapper">
            <h2>로그인</h2>
            <input type="text"
                value={m_id}
                onChange={(e)=>setM_id(e.target.value)}
                placeholder="아이디 입력하세요"
            />
            <input type="password"
                value={m_pw}
                onChange={(e)=>setM_pw(e.target.value)}
                placeholder="패스워드 입력하세요"
            />
         
            <button onClick={handleLogin} disabled={!m_id || !m_pw}>로그인</button>
        </div>

      
    )
}