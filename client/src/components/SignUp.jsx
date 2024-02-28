import React, { useState } from "react";
import register from "../assets/images/register.png";
import { useNavigate } from "react-router-dom";
const URL = `http://localhost:3000/api/v1/registration`;
import { useAuth } from "../store/Auth";
import {toast} from 'react-toastify'

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenLS } = useAuth();

  // Onchange input
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Submit form value
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      // console.log('res from server', res_data.extraDetails)
      if (response.ok) {
        storeTokenLS(res_data.token);
        toast.success('Registration Successfull.', {theme: "colored"})
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message, {theme: "colored"})
      }
      // console.log(user)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="ragistration-image">
                <img src={register} width="500" height="500" alt="" />
              </div>
              {/* let tackle registration form */}
              <div className="ragistration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label>username</label>
                    <input
                      type="text"
                      name="username"
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label>email</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label>phone</label>
                    <input
                      type="number"
                      name="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label>password</label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default SignUp;
