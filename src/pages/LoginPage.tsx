import { useState, ChangeEvent } from "react";
import "./LoginPage.css";
import { supabase } from "../createClient";

const LoginPage = () => {
  const [input, setInput] = useState<Record<string, string>>({});

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleLogIn(event: React.FormEvent) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("DIM_USER")
      .select("*")
      .eq("STUDENT_ID", input.id); // Fetch rows where STUDENT_ID matches the input

    if (error) {
      console.error("Error fetching data:", error.message); // Log error if one occurs
    }
    if (data && data.length > 0) {
      const user = data[0];
      if (user.USER_PASS === input.password) {
        alert("Login successful!");
      } else {
        alert("Login failed, invalid username or password");
      }
    } else {
      alert("No matching records found.");
    }
  }
  return (
    <div
      className="form-container
    justify-center items-center 
    flex flex-col sm:block
    "
    >
      <input
        placeholder="ID Number"
        id="id-input"
        className="
        w-full
        border-black border-2
        rounded-full
        h-11 p-5 mb-3
        font-normal
        "
        name="id"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        className="
        w-full
        border-black border-2
        rounded-full
        h-11 p-5 mb-3
        font-normal
        "
        name="password"
        onChange={handleChange}
      />
      <button id="forget-pass">Forget Password?</button>
      <button id="login-button" className="btn" onClick={handleLogIn}>
        Log In
      </button>
    </div>
  );
};

export default LoginPage;
