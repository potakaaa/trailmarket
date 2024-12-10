import { useEffect, useState } from "react";
import { Emp, Issue, useAuthContext } from "./context/AuthContext";
import { supabase } from "../createClient";

const issueType = ["Bug", "Feedback", "Feature"];
const issueStat = ["Not Started", "In Progress", "Done"];

const AdminPage = () => {
  {
    /* ISSUE_ID, FEEDBACK_CAT, ISSUE_STAT, ASSIGNED_EMP, FEEDBACK_TITLE, FEEDBACK_TITLE, FEEDBACK_DESC, */
  }

  const { issues, setIssues, empList, setEmpList } = useAuthContext();

  useEffect(() => {
    fetchIssues();
    fetchEmpList();
  }, [setIssues, setEmpList]);

  const fetchIssues = async () => {
    const { data, error } = await supabase.from("FACT_ISSUE_TRACKER").select(`
       ISSUE_ID,
       ASSIGNED_EMP,
       ISSUE_STAT,
       FEEDBACK_FK,
        DIM_FEEDBACK (
          FEEDBACK_USER,
          FEEDBACK_PROD,
          FEEDBACK_CAT,
          FEEDBACK_TITLE,
          FEEDBACK_DESC
        )
      `);

    console.log();

    if (error) {
      console.error("Error fetching data:", error.message);
    }

    if (data) {
      const tempIssues: Issue[] = data.map((issue: any, index) => {
        const issueDets: any = data?.[index];
        const feedbackDets: any = data?.[index]?.DIM_FEEDBACK;
        return {
          id: issueDets?.ISSUE_ID,
          title: feedbackDets?.FEEDBACK_TITLE,
          desc: feedbackDets?.FEEDBACK_DESC,
          category: feedbackDets?.FEEDBACK_CAT,
          status: issueDets?.ISSUE_STAT,
          user: feedbackDets?.FEEDBACK_USER,
          assigned: issueDets?.ASSIGNED_EMP,
          prod_id: feedbackDets?.FEEDBACK_PROD,
        };
        console.log(issue);
      });
      setIssues(tempIssues);
      console.log(issues);
    }
  };

  const fetchEmpList = async () => {
    const { data, error } = await supabase.from("DIM_EMPLOYEE").select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
    }

    if (data) {
      const tempEmpList: Emp[] = data.map((emp: any) => ({
        id: emp.EMP_ID,
        name: emp.EMP_NAME,
        age: emp.EMP_AGE,
        contact_num: emp.EMP_CONTACTNUM,
        housenum: emp.EMP_HOUSENUM,
        street: emp.EMP_STREET,
        city: emp.EMP_CITY,
        email: emp.EMP_EMAIL,
        pass: null,
        role: emp.EMP_ROLE,
        sss: emp.EMP_SSS,
        philhealth: emp.EMP_PHILHEALTH,
        pagibig: emp.EMP_PAGIBIG,
        tin: emp.EMP_TIN,
        emergency_contact: emp.EMP_EMERGENCY_CONTACT_NUM,
        emergency_name: emp.EMERGENCY_NAME,
      }));
      setEmpList(tempEmpList);
      console.log(empList);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    number: "",
    city: "",
    role: "",
    emergency_contact_name: "",
    emergency_contact_num: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdminSubmit = async (input: any) => {
    const { data, error } = await supabase.from("DIM_EMPLOYEE").insert({
      EMP_NAME: input.name,
      EMP_EMAIL: input.email,
      EMP_PASS: input.password,
      EMP_AGE: input.age,
      EMP_CONTACTNUM: input.number,
      EMP_CITY: input.city,
      EMP_ROLE: input.role,
      EMERGENCY_NAME: input.emergency_contact_name,
      EMP_EMERGENCY_CONTACT_NUM: input.emergency_contact_num,
    });
    if (data) {
      console.log("Data inserted successfully:", data);
    }
    if (error) {
      console.error("Error inserting data:", error.message);
    }

    const renderAddAdmin = () => {
      return (
        <div className="form-container flex flex-col sm:px-2 md:px-4 xl:px-8">
          <input
            placeholder="Name"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 "
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          <input
            placeholder="City"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <select
            className="w-full border-black border-2 rounded-full h-10 px-3 font-normal 2xl:h-14 mb-3 "
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Admin" className="font-normal">
              Admin
            </option>
            <option value="Moderator" className="font-normal">
              Moderator
            </option>
          </select>
          <input
            placeholder="Emergency Contact Name"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Emergency Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14"
            name="emergency_contact_num"
            value={formData.emergency_contact_num}
            onChange={handleChange}
          />
          <button
            id="login-button"
            className=" bg-gradient-to-r from-[#191847] to-[#000000] text-white font-normal rounded-full w-full h-10 mt-3 shadow-md 2xl:h-12 2xl:w-48 lg:h-12 lg:w-36 transition duration-300"
            onClick={() => handleAdminSubmit(formData)}
          >
            Submit
          </button>
        </div>
      );
    };
  }
    const [tempIssueArr, setTempIssueArr] = useState([
      {
        type: issueType[0],
        stat: issueStat[0],
        assigned: "John Doe",
        desc: "User unable to add items in the cart",
        prod_id: 4102,
      },
      {
        type: issueType[1],
        stat: issueStat[1],
        assigned: "Jone Smith",
        desc: "Offer a wishlist feature for users to save favorite items",
        prod_id: 5293,
      },
      {
        type: issueType[2],
        stat: issueStat[0],
        assigned: "David Lee",
        desc: "Add a recently viewed items section",
        prod_id: 4924,
      },
    ]);

    const [tempEmpName, setTempEmpName] = useState([
      "John Doe",
      "Jone Smith",
      "David Lee",
    ]);
    const [isAddClicked, setIsAddClicked] = useState(false);

    const handleStatChange = async (index: number, newStat: any) => {
      // Create a copy of the array to avoid mutating state directly
      const updatedIssues = [...issues];
      // Update the stat of the specific issue
      updatedIssues[index].status = newStat;
      // Set the updated array to state
      setIssues(updatedIssues);

      const issueId = updatedIssues[index].id;

      try {
        const { data, error } = await supabase
          .from("FACT_ISSUE_TRACKER")
          .update({ ISSUE_STAT: newStat })
          .eq("ISSUE_ID", issueId);

        if (error) {
          console.error("Error updating data:", error.message);
        }

        if (data) {
          console.log("Updated data:", data);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    const handleEmpChange = async (index: number, newEmp: string) => {
      // Create a copy of the array to avoid mutating state directly
      const updatedIssues = [...issues];
      // Update the stat of the specific issue
      updatedIssues[index].assigned = newEmp;
      // Set the updated array to state
      setIssues(updatedIssues);

      const issueId = updatedIssues[index].id;

      try {
        const { data, error } = await supabase
          .from("FACT_ISSUE_TRACKER")
          .update({ ASSIGNED_EMP: newEmp })
          .eq("ISSUE_ID", issueId);

        if (error) {
          console.error("Error updating data:", error.message);
        }

        if (data) {
          console.log("Updated data:", data);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    return (
      <div className="main-container px-4 flex flex-col gap-3">
        <div
          className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b]
          text-white rounded-xl p-4 w-full"
        >
          <h1 className="text-lg font-medium">Admin Page</h1>
        </div>
        <div className="add-admin-update-tax-container items-center justify-center flex gap-2 w-full sm:px-2 md:px-4 md:gap-5 xl:gap-10 xl:px-8">
          <button
            className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 md:text-base md:hover:text-lg xl:text-xl xl:py-3 xl:border-[3px] xl:hover:text-2xl"
            onClick={() => setIsAddClicked(!isAddClicked)}
          >
            {isAddClicked ? "Cancel" : "Add Admin"}
          </button>
          <button className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 md:text-base md:hover:text-lg xl:text-xl xl:py-3 xl:border-[3px] xl:hover:text-2xl">
            Update Tax
          </button>
        </div>
        {isAddClicked && renderAddAdmin(formData)}
        <div className="issuetracker-container flex flex-col w-full gap-1 my-5 rounded-md shadow-lg sm:px-2 ">
          <hr className="border-2" />
          <h1 className="text-center bg-gray-100 rounded-md text-lg p-1 md:text-xl md:p-3 xl:p-5 2xl:text-2xl">
            Issue Tracker
          </h1>
          <div className="parent-container w-full max-w-screen overflow-x-auto ">
            <table className="table-auto border-collapse w-full whitespace-nowrap">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200 w-full">
                  <th className="text-xs font-semibold text-left px-2 py-2"></th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    ID
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    TYPE
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    STATUS
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    ASSIGNED TO
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2">
                    DESCRIPTION
                  </th>
                  <th className="text-xs md:text-sm 2xl:text-lg 2xl:py-4 font-semibold text-left px-2 py-2 ">
                    PRODUCT ID
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {issues
                  .sort((a, b) => a.id - b.id) // Sort by 'id' in ascending order
                  .map((issue, index) => (
                    <tr key={index} className="border-t">
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3 self-center">
                        <input
                          type="checkbox"
                          name={`isdone${issue?.id}`}
                          className="size-3 md:size-4 xl:size-5"
                        />
                      </td>
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3">
                        {issue?.id}
                      </td>
                      <td
                        className={`text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3 ${
                          issue?.category === "Bug"
                            ? "text-red-500"
                            : issue?.category === "Feature"
                            ? "text-green-500"
                            : issue?.category === "Feedback"
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {issue?.category}
                      </td>
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-2 md:py-3">
                        <select
                          className={`${
                            issue?.status === issueStat[0]
                              ? "bg-blue-200"
                              : issue?.status === issueStat[1]
                              ? "bg-yellow-200"
                              : issue?.status === issueStat[2]
                              ? "bg-green-200"
                              : ""
                          } px-2 rounded-full text-xs md:text-sm xl:text-base focus:outline-none`}
                          value={issue?.status} // Set the current value
                          onChange={(e) =>
                            handleStatChange(index, e.target.value)
                          }
                        >
                          {issueStat.map((statOption, optionIndex) => (
                            <option
                              className="bg-slate-100 font-normal"
                              key={optionIndex}
                              value={statOption}
                            >
                              {statOption}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3">
                        <select
                          value={issue?.assigned}
                          onChange={(e) =>
                            handleEmpChange(index, e.target.value)
                          }
                          className="bg-slate-50 p-1 rounded-full focus:outline-none"
                        >
                          {empList.map((emp) => (
                            <option
                              className="bg-slate-100 font-normal"
                              key={emp.id}
                              value={emp.id}
                            >
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3">
                        {issue?.desc}
                      </td>
                      <td className="text-xs md:text-sm xl:text-base font-normal px-2 py-1 md:py-3">
                        {issue?.prod_id}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="issue-container"></div>
      </div>
    );
  };
};

export default AdminPage;
