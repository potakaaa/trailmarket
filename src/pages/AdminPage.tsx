import { useState } from "react";

const issueType = ["Bug", "Feedback", "Feature"];
const issueStat = ["Not Started", "In Progress", "Done"];

const AdminPage = () => {
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

  const handleStatChange = (index: number, newStat: any) => {
    // Create a copy of the array to avoid mutating state directly
    const updatedIssues = [...tempIssueArr];
    // Update the stat of the specific issue
    updatedIssues[index].stat = newStat;
    // Set the updated array to state
    setTempIssueArr(updatedIssues);
  };

  const handleEmpChange = (index: number, newEmp: string) => {
    // Create a copy of the array to avoid mutating state directly
    const updatedIssues = [...tempIssueArr];
    // Update the stat of the specific issue
    updatedIssues[index].assigned = newEmp;
    // Set the updated array to state
    setTempIssueArr(updatedIssues);
  };

  return (
    <div className="main-container px-4 flex flex-col gap-3">
      <div
        className="justify-center align-center flex bg-gradient-to-r from-[#26245f] to-[#18181b]
          text-white rounded-xl p-4 w-full"
      >
        <h1 className="text-lg font-medium">Admin Page</h1>
      </div>
      <div className="add-admin-update-tax-container items-center justify-center flex gap-2 w-full">
        <button className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300">
          Add Admin
        </button>
        <button className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 ">
          Update Tax
        </button>
      </div>
      <div className="issuetracker-container flex flex-col w-full gap-1 my-5 rounded-md shadow-lg">
        <hr className="border-2" />
        <h1 className="text-center bg-gray-100 rounded-md text-lg p-1">
          Issue Tracker
        </h1>
        <div className="parent-container w-full max-w-[40rem] overflow-x-auto">
          <table className="table-auto border-collapse w-full whitespace-nowrap">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-200 w-full">
                <th className="text-xs font-semibold text-left px-2 py-1"></th>
                <th className="text-xs font-semibold text-left px-2 py-1">
                  ID
                </th>
                <th className="text-xs font-semibold text-left px-2 py-2">
                  TYPE
                </th>
                <th className="text-xs font-semibold text-left px-2 py-2">
                  STATUS
                </th>
                <th className="text-xs font-semibold text-left px-2 py-2">
                  ASSIGNED TO
                </th>
                <th className="text-xs font-semibold text-left px-2 py-2">
                  DESCRIPTION
                </th>
                <th className="text-xs font-semibold text-left px-2 py-2 ">
                  PRODUCT ID
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {tempIssueArr.map((issue, index) => (
                <tr key={index} className="border-t">
                  <td className="text-xs font-normal px-2 py-1 self-center">
                    <input type="checkbox" name={`isdone${index}`} />
                  </td>
                  <td className="text-xs font-normal px-2 py-1">{index + 1}</td>
                  <td
                    className={`text-xs font-normal px-2 py-1 ${
                      issue.type === "Bug"
                        ? "text-red-500"
                        : issue.type === "Feature"
                        ? "text-green-500"
                        : issue.type === "Feedback"
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {issue.type}
                  </td>
                  <td className="text-xs font-normal px-2 py-2">
                    <select
                      className={`${
                        issue.stat === issueStat[0]
                          ? "bg-blue-200"
                          : issue.stat === issueStat[1]
                          ? "bg-yellow-200"
                          : issue.stat === issueStat[2]
                          ? "bg-green-200"
                          : ""
                      } px-2 rounded-full text-xs focus:outline-none`}
                      value={issue.stat} // Set the current value
                      onChange={(e) => handleStatChange(index, e.target.value)}
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
                  <td className="text-xs font-normal px-2 py-1">
                    <select
                      value={issue.assigned}
                      onChange={(e) => handleEmpChange(index, e.target.value)}
                      className="bg-slate-50 p-1 rounded-full focus:outline-none"
                    >
                      {tempEmpName.map((empName, index) => (
                        <option
                          className="bg-slate-100 font-normal"
                          key={index}
                          value={empName}
                        >
                          {empName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-xs font-normal px-2 py-1">
                    {issue.desc}
                  </td>
                  <td className="text-xs font-normal px-2 py-1">
                    {issue.prod_id}
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

export default AdminPage;
