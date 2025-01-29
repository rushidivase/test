import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');

        if (auth) {
            navigator("/");
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password };

        let result = await fetch("http://localhost:8088/emp-service/save-user/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        result = await result.JSON;
        localStorage.setItem("user", JSON.stringify(result));
        navigator("/");

    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-5 border p-3 shadow">


                    <h2>User Register</h2>
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
                    <div className="mt-2 text-center">
                        <p className="fs-6">Already Registered..?</p>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegister;