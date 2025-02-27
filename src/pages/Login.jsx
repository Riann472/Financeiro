import { useState } from "react"

const Login = () => {
    const [data, setData] = useState({
        login: '',
        password: ''
    })
    return (
        <div className="loginContainer">
            <form className="loginForm" action="">
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