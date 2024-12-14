import { useState, ChangeEvent } from "react";
import { supabase } from "../../createClient";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminLogin = () => {
  const [input, setInput] = useState<Record<string, string>>({});
  const { setIsAdminLoggedIn, setEmp } = useAuthContext();

  const nav = useNavigate();

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
      .from("DIM_EMPLOYEE")
      .select("*")
      .eq("EMP_EMAIL", input.email); // Fetch rows where STUDENT_ID matches the input

    if (error) {
      console.error("Error fetching data:", error.message); // Log error if one occurs
    }
    if (data && data.length > 0) {
      const emp = data[0];
      if (emp.EMP_PASS === input.password) {
        alert("Login successful!");
        const fetchedEmp = {
          id: emp.EMP_ID,
          name: emp.EMP_NAME,
          age: emp.EMP_AGE,
          pass: emp.EMP_PASS,
          contact_num: emp.EMP_CONTACTNUM,
          email: emp.EMP_EMAIL,
          role: emp.EMP_ROLE,
          emergency_contact: emp.EMP_EMERGENCY_CONTACTNUM,
          emergency_name: emp.EMP_EMERGENCY_NAME,
          sss: emp.EMP_SSS,
          philhealth: emp.EMP_PHILHEALTH,
          pagibig: emp.EMP_PAGIBIG,
          tin: emp.EMP_TIN,
          housenum: emp.EMP_HOUSENUM,
          street: emp.EMP_STREET,
          city: emp.EMP_CITY,
        };

        setIsAdminLoggedIn(true);
        setEmp(fetchedEmp);
        console.log(fetchedEmp);

        console.log(fetchedEmp.role);

        {
          fetchedEmp.role === "Administrator"
            ? nav("/admin")
            : nav("/moderator");
        }
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
        type="email"
        placeholder="Email"
        id="id-input"
        className="w-full border-black border-2 rounded-full h-11 p-5 mb-3 font-normal 2xl:h-14"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        className=" w-full border-black border-2 rounded-full h-11 p-5 mb-3 font-normal 2xl:h-14 "
        name="password"
        onChange={handleChange}
      />
      <div className="flex w-full  justify-between flex-col items-stretch">
        <button
          id="login-button"
          className=" bg-gradient-to-r from-[#191847] to-[#000000] text-white font-normal rounded-full w-32 h-10 mt-3 self-end shadow-md 2xl:h-12 2xl:w-48 lg:h-12 lg:w-36 transition duration-300"
          onClick={handleLogIn}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
