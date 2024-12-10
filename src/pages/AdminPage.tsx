const tempIssueArr = [
  {
    type: "Bug",
    prio: "Urgent",
    assigned: "John Doe",
    desc: "User unable to add items in the cart",
  },
  {
    type: "Feedback",
    prio: "Nice to do",
    assigned: "Jone Smith",
    desc: "Offer a wishlist feature for users to save favorite items",
  },
  {
    type: "Feature",
    prio: "Urgent",
    assigned: "David Lee",
    desc: "Add a recently viewed items section",
  },
];

const AdminPage = () => {
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
      <div className="issuetracker-container flex flex-col w-full gap-1">
        <hr />
        <h1 className="text-center">Issue Tracker</h1>
        <hr />
        <div className="parent-container w-full max-w-[500px] overflow-x-auto">
          <div className="table-cols flex items-stretch justify-between w-[600px] overflow-x-auto whitespace-nowrap">
            <p className="text-xs font-medium">C</p>
            <p className="text-xs font-medium">TYPE</p>
            <p className="text-xs font-medium">PRIORITY</p>
            <p className="text-xs font-medium">ASSIGNED TO</p>
            <p className="text-xs font-medium">DESCRIPTION</p>
          </div>
          <div className="flex justify-between w-[600px] overflow-x-auto">
            {tempIssueArr.map((issue, index) => (
              <div
                key={index}
                className="issue-item flex justify-between w-full"
              >
                <p className="text-xs font-normal">{index + 1}</p>
                <p className="text-xs font-normal">{issue.type}</p>
                <p className="text-xs font-normal">{issue.prio}</p>
                <p className="text-xs font-normal">{issue.assigned}</p>
                <p className="text-xs font-normal">{issue.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="issue-container"></div>
    </div>
  );
};

export default AdminPage;
