import { useContext, useEffect, useState } from "react";
import { Emp, Issue, Tax, useAuthContext } from "./context/AuthContext";
import { supabase } from "../createClient";
import TopNavBar from "./navbar/TopNavBar";
import AdminNavBar from "./navbar/AdminNavBar";

const issueStat = ["Not Started", "In Progress", "Done"];

const AdminPage = () => {
  {
    /* ISSUE_ID, FEEDBACK_CAT, ISSUE_STAT, ASSIGNED_EMP, FEEDBACK_TITLE, FEEDBACK_TITLE, FEEDBACK_DESC, */
  }

  const [isAddClicked, setIsAddClicked] = useState(false);
  const [isTaxClicked, setIsTaxClicked] = useState(false);
  const [isEmpClicked, setIsEmpClicked] = useState(false);
  interface EmpFormData {
    name: string;
    email: string;
    age: number;
    contact_num: number;
    role: string;
    emergency_name: string;
    emergency_contact: number;
    sss?: number;
    philhealth?: number;
    pagibig?: number;
    tin?: number;
  }

  const [empFormData, setEmpFormData] = useState<EmpFormData>({
    name: "",
    email: "",
    age: 0,
    contact_num: 0,
    role: "",
    emergency_name: "",
    emergency_contact: 0,
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    tin: 0,
  });
  const [isAddCatClicked, setIsAddCatClicked] = useState(false);

  const {
    issues,
    setIssues,
    empList,
    emp,
    setEmpList,
    setIsLoading,
    taxes,
    setTaxes,
  } = useAuthContext();

  useEffect(() => {
    fetchIssues();
    fetchEmpList();
    fetchTaxes();
  }, [setIssues, setEmpList, setIsLoading, setIsAddClicked, setTaxes]);

  const fetchIssues = async () => {
    const { data, error } = await supabase.from("FACT_ISSUE_TRACKER").select(`
       ISSUE_ID,
       ASSIGNED_EMP,
       ISSUE_STAT,
       FEEDBACK_FK,
        DIM_FEEDBACK (
          FEEDBACK_USER,
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

  const fetchTaxes = async () => {
    try {
      const { data } = await supabase.from("DIM_TAX").select("*");
      if (data) {
        const tempTaxes: Tax[] = data.map((tax: any) => ({
          id: tax.TAX_ID,
          low: tax.TAX_BRACKET_LOW,
          high: tax.TAX_BRACKET_HIGH,
          amount: tax.TAX_AMOUNT,
        }));
        setTaxes(tempTaxes);
        console.log(taxes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
    sss: "",
    philhealth: "",
    pagibig: "",
    tin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Updated ${name}:`, value); // Debug log
  };

  const handleAdminSubmit = async (input: any) => {
    console.log(input);

    if (
      input.name === "" ||
      input.email === "" ||
      input.password === "" ||
      input.age === "" ||
      input.number === "" ||
      input.city === "" ||
      input.role === "" ||
      input.emergency_contact_name === "" ||
      input.emergency_contact_num === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const { data: existingAdmin, error: fetchError } = await supabase
        .from("DIM_EMPLOYEE")
        .select("EMP_EMAIL")
        .eq("EMP_EMAIL", input.email);

      if (fetchError) {
        console.error("Error checking email:", fetchError.message);
        alert("An error occurred while checking email.");
        return;
      }
      if (existingAdmin && existingAdmin.length > 0) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      setIsLoading(true);
      const { error } = await supabase.from("DIM_EMPLOYEE").insert({
        EMP_NAME: input.name,
        EMP_EMAIL: input.email,
        EMP_PASS: input.password,
        EMP_AGE: input.age,
        EMP_CONTACTNUM: input.number,
        EMP_CITY: input.city,
        EMP_ROLE: input.role,
        EMP_EMERGENCY_NAME: input.emergency_contact_name,
        EMP_EMERGENCY_CONTACTNUM: input.emergency_contact_num,
      });
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        alert("Admin added successfully!");
        setIsLoading(false);
        setIsAddClicked(false);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaxSubmit = async (index: number) => {
    if (taxes[index].low > taxes[index].high) {
      alert("Low bound cannot be greater than high bound.");
      return;
    }
    if (taxes[index].high < taxes[index].low) {
      alert("Low bound cannot be greater than high bound.");
      return;
    }
    if (taxes[index].amount < 0 || taxes[index].amount > 100) {
      alert("Tax percentage must be between 0 and 100.");
      return;
    }
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("DIM_TAX")
        .update({
          TAX_BRACKET_LOW: taxes[index].low,
          TAX_BRACKET_HIGH: taxes[index].high,
          TAX_AMOUNT: taxes[index].amount,
        })
        .eq("TAX_ID", taxes[index].id);
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        alert(`Tax ${taxes[index].id} updated successfully!`);
        setIsLoading(false);
        setIsTaxClicked(false);
        return;
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUpdateTax = () => {
    return taxes
      .sort((a, b) => a.id - b.id) // Sort the taxes array by tax.id
      .map((tax, index) => (
        <div
          key={tax.id}
          className="flex flex-col my-4 sm:my-3 w-full justify-center items-center px-2"
        >
          <p className="text-center lg:text-lg">Tax {index + 1}</p>
          <div className="flex-none sm:flex sm:gap-3">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium px-2 text-center lg:text-base">
                  Low Bound
                </p>
                <input
                  className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 text-center lg:text-base lg:py-5 xl:border-[3px]"
                  name="low"
                  value={tax.low}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      e.target.value = "0";
                    }
                    const updatedTaxes = [...taxes];
                    updatedTaxes[index]["low"] = parseInt(e.target.value);
                    setTaxes(updatedTaxes);
                    console.log(tax.low);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium px-2 text-center lg:text-base">
                  High Bound
                </p>
                <input
                  className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 text-center lg:text-base lg:py-5 xl:border-[3px]"
                  name="high"
                  value={tax.high}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      e.target.value = "0";
                    }
                    const updatedTaxes = [...taxes];
                    updatedTaxes[index]["high"] = parseInt(e.target.value);
                    setTaxes(updatedTaxes);
                    console.log(tax.high);
                  }}
                />
              </div>
            </div>
            <div className="flex-non sm:flex sm:flex-col gap-0 sm:gap-1">
              <p className="text-center font-medium text-sm lg:text-base">
                Percentage
              </p>
              <input
                className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 text-center lg:text-base lg:py-5 xl:border-[3px]"
                name="amount"
                value={`${tax.amount}`}
                onChange={(e) => {
                  if (e.target.value === "") {
                    e.target.value = "0";
                  }
                  const updatedTaxes = [...taxes];
                  updatedTaxes[index]["amount"] = parseInt(e.target.value);
                  setTaxes(updatedTaxes);
                }}
              />
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-[#191847] to-[#000000] text-white font-normal rounded-full w-[20rem] self-center h-10 shadow-md   transition duration-300 sm:mt-4 xl:h-14"
            onClick={() => handleTaxSubmit(index)}
          >
            Submit Changes
          </button>
        </div>
      ));
  };

  const renderAddAdmin = () => {
    return (
      <div className="form-container flex flex-col sm:px-2 md:px-4 xl:px-8 sm:mt-5 max-w-4xl self-center lg:mt-10">
        <div className="flex-none sm:flex sm:gap-2">
          <input
            placeholder="Name"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          className=" w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px] "
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex-none sm:flex sm:gap-2">
          <input
            type="number"
            placeholder="Age"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          <input
            placeholder="City"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="flex-none sm:flex sm:gap-2">
          <select
            className="w-full border-black border-2 rounded-full h-10 px-3 font-normal 2xl:h-14 lg:h-[42px] mb-3 xl:border-[3px]"
            value={formData.role}
            onChange={handleChange} // Set the current value
            name="role"
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
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Emergency Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="emergency_contact_num"
            value={formData.emergency_contact_num}
            onChange={handleChange}
          />
        </div>
        <button
          id="login-button"
          className=" bg-gradient-to-r from-[#191847] to-[#000000] text-white font-normal rounded-full h-10 mt-3 shadow-md transition duration-300 w-[20rem] self-center xl:h-14"
          onClick={() => handleAdminSubmit(formData)}
        >
          Submit
        </button>
      </div>
    );
  };

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

  const handleChangeEmp = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmpFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "age" ||
        name === "contact_num" ||
        name === "sss" ||
        name === "philhealth" ||
        name === "pagibig" ||
        name === "tin" ||
        name === "emergency_contact"
          ? Number(value) // Ensure numeric fields are updated as numbers
          : value,
    }));
  };

  useEffect(() => {
    setEmpFormData({
      name: emp?.name || "",
      email: emp?.email || "",
      age: emp?.age || 0,
      contact_num: emp?.contact_num || 0,
      role: emp?.role || "",
      emergency_name: emp?.emergency_name || "",
      emergency_contact: emp?.emergency_contact || 0,
      sss: emp?.sss || 0,
      philhealth: emp?.philhealth || 0,
      pagibig: emp?.pagibig || 0,
      tin: emp?.tin || 0,
    });
  }, [emp]);

  interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from("DIM_CATEGORY").select("*");
    if (error) {
      console.error("Error fetching categories:", error.message);
      return [];
    }
    console.log("Fetched categories:", data);
    return data;
  };

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      if (fetchedCategories) {
        const formattedCategories = fetchedCategories.map((category: any) => ({
          id: category.CATEGORY_ID,
          name: category.CATEGORY_NAME, // Column `name` in database -> `name` in state
          description: category.CATEGORY_DESC, // Column `description` in database -> `description` in state
          image: category.CATEGORY_IMAGE, // Column `image` in database -> `image` in state
        }));
        setCategories(formattedCategories);
      } else {
        console.error("Failed to fetch categories.");
      }
    };

    loadCategories();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category); // Set the selected category
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (selectedCategory) {
      setSelectedCategory((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const saveCategoryChanges = async () => {
    if (!selectedCategory) {
      alert("No category selected.");
      return;
    }

    const { id, name, description, image } = selectedCategory;

    try {
      const { error } = await supabase
        .from("DIM_CATEGORY")
        .update({
          CATEGORY_NAME: name,
          CATEGORY_DESC: description,
          CATEGORY_IMAGE: image,
        })
        .eq("CATEGORY_ID", id);

      if (error) {
        console.error("Error saving category:", error.message);
        alert("Failed to save category changes.");
      } else {
        alert("Category updated successfully!");

        // Fetch updated categories immediately
        const updatedCategories = await fetchCategories();
        const formattedCategories = updatedCategories.map((category: any) => ({
          id: category.CATEGORY_ID,
          name: category.CATEGORY_NAME,
          description: category.CATEGORY_DESC,
          image: category.CATEGORY_IMAGE,
        }));
        setCategories(formattedCategories); // Update state with fresh data
        setSelectedCategory(null); // Deselect category after saving
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred while saving the category.");
    }
  };

  const renderCategoryMenu = () => (
    <div className="flex flex-col w-full gap-4">
      <div className="category-list grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 border rounded-lg hover:shadow-lg cursor-pointer"
            onClick={() => handleCategorySelect(category)} // Select category on click
          >
            <h3 className="text-lg font-bold">{category.name}</h3>
            <p className="text-sm">{category.description}</p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="edit-category-form flex flex-col gap-4 p-4 border rounded-lg w-full">
          <h3 className="text-lg font-bold">Edit Category</h3>
          <div className="flex gap-4 flex-row w-full items-center">
            <div className="flex gap-4 flex-col w-full">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={selectedCategory.name}
                onChange={handleCategoryInputChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="description"
                placeholder="Category Description"
                value={selectedCategory.description}
                onChange={handleCategoryInputChange}
                className="border p-2 rounded-lg"
              />
            </div>
            <img
              src={selectedCategory.image}
              alt="Category Image"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <button
            onClick={saveCategoryChanges}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  const renderEmployeeProfile = () => {
    return (
      <div className="form-container flex flex-col sm:px-2 md:px-4 xl:px-8 sm:mt-5 max-w-4xl self-center lg:mt-10">
        <div className="flex-none sm:flex sm:gap-2">
          <input
            placeholder="Name"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="name"
            value={empFormData?.name}
            onChange={handleChangeEmp}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="email"
            value={empFormData?.email}
            onChange={handleChangeEmp}
          />
        </div>
        <div className="flex-none sm:flex sm:gap-2">
          <input
            type="number"
            placeholder="Age"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="age"
            value={empFormData?.age}
            onChange={handleChangeEmp}
          />
          <input
            type="number"
            placeholder="Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="number"
            value={empFormData?.contact_num}
            onChange={handleChangeEmp}
          />
        </div>

        <div className="flex-none sm:flex sm:gap-2">
          <select
            className="w-full border-black border-2 rounded-full h-10 px-3 font-normal 2xl:h-14 lg:h-[42px] mb-3 xl:border-[3px]"
            value={empFormData?.role}
            onChange={handleChangeEmp} // Set the current value
            name="role"
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
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="emergency_contact_name"
            value={empFormData?.emergency_name}
            onChange={handleChangeEmp}
          />
          <input
            type="number"
            placeholder="Emergency Contact Number"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="emergency_contact_num"
            value={empFormData?.emergency_contact}
            onChange={handleChangeEmp}
          />
        </div>
        <div className="flex-none sm:flex sm:gap-2">
          <label className="text-sm font-medium px-2 text-center justify-center align-middle lg:text-base">
            SSS
          </label>
          <input
            type="number"
            placeholder="SSS"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="sss"
            value={empFormData?.sss ?? ""}
            onChange={handleChangeEmp}
          />
          <label className="text-sm font-medium px-2 text-center justify-center align-middle lg:text-base">
            Philhealth
          </label>
          <input
            type="number"
            placeholder="Philhealth"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="philhealth"
            value={empFormData?.philhealth ?? ""}
            onChange={handleChangeEmp}
          />
          <label className="text-sm font-medium px-2 text-center justify-center align-middle lg:text-base">
            Pagibig
          </label>
          <input
            type="number"
            placeholder="Pagibig"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="pagibig"
            value={empFormData?.pagibig ?? ""}
            onChange={handleChangeEmp}
          />
          <label className="text-sm font-medium px-2 text-center justify-center align-middle lg:text-base">
            TIN
          </label>
          <input
            type="number"
            placeholder="TIN"
            className="w-full border-black border-2 rounded-full h-6 p-4 mb-3 font-normal 2xl:h-14 lg:py-5 xl:border-[3px]"
            name="tin"
            value={empFormData?.tin ?? ""}
            onChange={handleChangeEmp}
          />
        </div>
        <div className="flex-none sm:flex sm:gap-2"></div>
        <button
          id="login-button"
          className=" bg-gradient-to-r from-[#191847] to-[#000000] text-white font-normal rounded-full h-10 mt-3 shadow-md transition duration-300 w-[20rem] self-center xl:h-14"
          onClick={() => handleAdminUpdate(empFormData)}
        >
          Update
        </button>
      </div>
    );
  };

  const handleAdminUpdate = async (input: any) => {
    console.log(input);

    if (
      input.name === "" ||
      input.email === "" ||
      input.age === "" ||
      input.number === "" ||
      input.city === "" ||
      input.role === "" ||
      input.emergency_contact_name === "" ||
      input.emergency_contact_num === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("DIM_EMPLOYEE")
        .update({
          EMP_NAME: input.name,
          EMP_EMAIL: input.email,
          EMP_AGE: input.age,
          EMP_CONTACTNUM: input.number,
          EMP_CITY: input.city,
          EMP_ROLE: input.role,
          EMP_EMERGENCY_NAME: input.emergency_contact_name,
          EMP_EMERGENCY_CONTACTNUM: input.emergency_contact_num,
          EMP_SSS: input.sss,
          EMP_PHILHEALTH: input.philhealth,
          EMP_PAGIBIG: input.pagibig,
          EMP_TIN: input.tin,
        })
        .eq("EMP_ID", emp?.id);
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        alert("Admin updated successfully!");
        setIsLoading(false);
        setIsEmpClicked(false);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper size-full ">
      <TopNavBar />
      <AdminNavBar />
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
            {isAddClicked ? "Cancel Add" : "Add Admin"}
          </button>
          <button
            className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 md:text-base md:hover:text-lg xl:text-xl xl:py-3 xl:border-[3px] xl:hover:text-2xl"
            onClick={() => setIsTaxClicked(!isTaxClicked)}
          >
            {isTaxClicked ? "Cancel Tax" : "Update Tax"}
          </button>
          <button
            className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 md:text-base md:hover:text-lg xl:text-xl xl:py-3 xl:border-[3px] xl:hover:text-2xl"
            onClick={() => setIsEmpClicked(!isEmpClicked)}
          >
            {!isEmpClicked ? "Employee Profile" : "Close Employee Profile"}
          </button>
          <button
            className="bg-slate-200 bg-opacity-60 px-5 py-2 shadow-md rounded-full border-2 border-black w-full text-sm hover:border-none hover:text-base transition-all duration-300 md:text-base md:hover:text-lg xl:text-xl xl:py-3 xl:border-[3px] xl:hover:text-2xl"
            onClick={() => setIsAddCatClicked(!isAddCatClicked)}
          >
            {!isAddCatClicked ? "Category Menu" : "Close Category Menu"}
          </button>
        </div>
        {isAddClicked && renderAddAdmin()}
        {isTaxClicked && renderUpdateTax()}
        {isEmpClicked && renderEmployeeProfile()}
        {isAddCatClicked && renderCategoryMenu()}

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
                              className="bg-slate-100 font-normal "
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
                          className="bg-slate-50 p-1 rounded-full focus:outline-none "
                        >
                          {empList.map((emp) => (
                            <option
                              className="bg-slate-100 font-normal overflow-auto"
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="issue-container"></div>
      </div>
    </div>
  );
};

export default AdminPage;
