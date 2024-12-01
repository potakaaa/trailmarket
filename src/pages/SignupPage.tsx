import { useState } from "react";
import { supabase } from "../createClient";
import { ChangeEvent } from "react";
import "./SignupPage.css";

const SignupPage = () => {
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault();

    if (input.password === input.passwordconfirm) {
      await supabase.from("DIM_USER").insert({
        STUDENT_ID: input.id,
        USER_NAME: input.name,
        USER_EMAIL: input.email,
        USER_PASS: input.password,
      });
    } else {
      alert("Failed confirmed password attempt!");
    }
  }

  return (
    <div className="right-container">
      <input
        name="name"
        type="text"
        placeholder="Name"
        id="name-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        name="id"
        type="number"
        placeholder="ID Number"
        id="id-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        id="email-input"
        className="form-control"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        className="form-control"
        name="password"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        id="confirm-password-input"
        className="form-control"
        name="passwordconfirm"
        onChange={handleChange}
      />
      <button
        id="login-button"
        className="btn btn-primary"
        onClick={handleSignUp}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignupPage;
