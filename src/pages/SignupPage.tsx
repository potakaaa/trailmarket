import { useState } from "react";
import { supabase } from "../createClient";
import { ChangeEvent } from "react";

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
        await supabase
        .from('DIM_USER')
        .insert({ STUDENT_ID: input.id, USER_NAME: input.name, USER_EMAIL: input.email, USER_PASS: input.password })
    }
    else{
      alert("Failed confirmed password attempt!")
    }

  }

  return (
    <div className="container">
      <div className="column-container">
        <div className="left-container">
          <h1>TrailMarket</h1>
          <h3>The exclusive market for USTP-CDO Students!</h3>
        </div>
        <div className="right-container">
          <input name="name" type="text" placeholder="Name" className="name-input" onChange={handleChange} />
          <input name="id" type="number" placeholder="ID Number" className="id-input" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" className="email-input" onChange={handleChange} />
          <input
            type="password"
            placeholder="Password"
            className="password-input"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="confirm-password-input"
            name="passwordconfirm"
            onChange={handleChange}
          />
          <button className="login-button" onClick={handleSignUp}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
