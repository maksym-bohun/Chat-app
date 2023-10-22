import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";

function Register(props) {
  const submitRegistration = (e) => {
    e.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {};

  return (
    <div>
      <FormContainer>
        <form onSubmit={submitRegistration}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create user</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </div>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;

      $:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      color: #fff;
      background-color: #997af0;
      padding: 1rem 2rem;
      font-size: 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      transition: all 0.5s;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
