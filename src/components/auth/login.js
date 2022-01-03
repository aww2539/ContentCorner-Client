import { Link, useHistory } from "react-router-dom"
import { useRef } from "react"
// import "./Auth.css"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("https://creator-corner.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current?.value,
                password: password.current?.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("contentCorner_token", res.token)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login">
                    <h1>Content Corner</h1>
                    <h2>Sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input type="text" ref={username} type="username" id="outlined-basic" variant="outlined"className="form-control" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="text" ref={password} type="password" id="outlined-basic" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button type="submit" onClick={handleLogin}>Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}