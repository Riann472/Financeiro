import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/home')
        }
    }, [])

    const [data, setData] = useState({
        login: '',
        password: ''
    })

    function login(e) {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_DB}/users/login`, data)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    sessionStorage.setItem('token', res.data.token)
                    navigate('/home')
                }
            })
            .catch(err => {
                alert("Erro na requisição, contate um administrador.")
            })
    }

    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={e => login(e)}>
                <div className="input">
                    <label htmlFor="login">Login</label>
                    <input type="text" id="login" onChange={
                        e => setData({ ...data, login: e.target.value })
                    } required />
                </div>
                <div className="input">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" onChange={
                        e => setData({ ...data, password: e.target.value })
                    } required />
                </div>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Login