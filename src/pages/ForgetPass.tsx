import React from 'react'
import { ChangeEvent, useState } from 'react';
import { supabase } from '../createClient';




const ForgetPass = () => {
    const [input, setInput] = useState<Record<string, string>>({});
    const [isVerified, setIsVerified] = useState(false);
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      setInput((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleForget = async (event: React.FormEvent) => {
      event.preventDefault();
  
      const { data, error } = await supabase
        .from("DIM_USER")
        .select("*")
        .eq("STUDENT_ID", input.id);
  
      if (error) {
        console.error("Error fetching data:", error.message);
      }
      if (data && data.length > 0) {
        const user = data[0];
        if (user.USER_EMAIL === input.email) {
          setIsVerified(true);
          
        } else {
          alert("Request failed, invalid ID or Email");
        }
      } else {
        alert("No matching records found.");
      }
    };
  
    const InputCode = () => {
      const handleCancel = (event: React.FormEvent) => {
        event.preventDefault();
        setIsVerified(false);
      };
  
      return (
        <div
          className="form-container
          justify-between items-center 
          flex flex-col sm:block
          "
        >
          <input
            placeholder="Reset Code"
            id="id-input"
            className="
              w-full
              border-black border-2
              rounded-full
              h-11 p-5 mb-3
              font-normal
              "
            name="code"
          />
  
          <button
            id="cancel"
            className="
                  font-thin text-sm ml-2
                  text-left
                  "
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      );
    };
  
    return (
      <div>
        {isVerified ? (
          <InputCode />
        ) : (
          <div
            className="form-container
              justify-between items-center
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
              type="text"
              placeholder="Email"
              id="email-input"
              onChange={handleChange}
              className="
                  w-full
                  border-black border-2
                  rounded-full
                  h-11 p-5 mb-3
                  font-normal
                  "
              name="email"
            />
            <div
              className="flex w-full
                justify-between flex-col
                items-stretch
                "
            >
              <button
                id="return-login"
                className="
                  font-thin text-sm ml-2
                  text-left
                  "
              >
                Return to Log In
              </button>
              <button
                id="submit-button"
                onClick={handleForget}
                className="
                    bg-gradient-to-r
                    from-[#6B66FB] to-[#000000]
                    text-white
                    font-normal
                    rounded-full
                    w-28 h-10
                    mt-3 self-end
                  "
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default ForgetPass;
