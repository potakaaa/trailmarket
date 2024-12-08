import { useState, ChangeEvent, useContext } from "react";
import "./LoginPage.css";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchCategories } from "../context/Globals";

const LoginPage = () => {
  const [input, setInput] = useState<Record<string, string>>({});
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { setIsLoggedIn, setUser } = context;

  const nav = useNavigate();

  const handleForget = () => {
    nav("/forget");
  };

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
        const fetchedUser = {
          id: user.STUDENT_ID,
          name: user.USER_NAME,
        };

        setIsLoggedIn(true);
        setUser(fetchedUser);
        fetchCategories();
        nav("/home");
      } else {
        alert("Login failed, invalid username or password");
      }
    } else {
      alert("No matching records found.");
    }
  }
  return (
    <div
      className="form-container justify-between items-center flex flex-col sm:block
    "
    >
      <input
        placeholder="ID Number"
        id="id-input"
        className="
        w-full border-black border-2 rounded-full h-11 p-5 mb-3 font-normal 2xl:h-14"
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
        2xl:h-14
        "
        name="password"
        onChange={handleChange}
      />
      <div
        className="flex w-full 
      justify-between flex-col
      items-stretch
      "
      >
        <div
          className="flex-row  flex w-full 
       items-stretch"
        >
          <button
            id="forget-pass"
            className="
          font-thin text-sm ml-2
          text-left 2xl:text-base
          "
            onClick={handleForget}
          >
            Forget Password?
          </button>
        </div>

        <button
          id="login-button"
          className="
          bg-gradient-to-r
          from-[#6B66FB] to-[#000000]
          text-white
          font-normal
          rounded-full
          w-32 h-10
          mt-3 self-end
          shadow-md
          2xl:h-12 2xl:w-48
          
        
        "
          onClick={handleLogIn}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
