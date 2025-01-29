import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();


    useEffect(() => {
        let auth = localStorage.getItem("user");
        if (auth) {
            navigator("/")
        }
    }, []);

    const [flag, setFlag] = useState(false);

    const handleSubmit = async (e) => {
        const user = { email, password };

        console.log(user);
        let result = await fetch("http://localhost:8088/emp-service/validate-user/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        result = await result.json();

        console.warn("Result:" + result.email);

        if (result.email != null && result.password != null) {
            localStorage.setItem("user", JSON.stringify(result));
            navigator("/");
        }
        else {
            setFlag(true);
            navigator("/login");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-5 border p-3 shadow">


                    <h2>Login Page</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            {flag ?
                <div className="row justify-content-center">
                    <div className="col-5 mt-4">
                        <div className='alert alert-danger'>Login Failed..!</div>
                    </div>
                </div> : null
            }
        </div>
    );
}

export default Login;