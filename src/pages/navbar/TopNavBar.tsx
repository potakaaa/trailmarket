import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import FeedbackPop from "./FeedbackPop";
import { supabase } from "../../createClient";

const TopNavBar = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [isFeedbackPopOpen, setIsFeedbackPopOpen] = useState(false);

  const {
    setIsAdminLoggedIn,
    setIsLoggedIn,
    setUser,
    setEmp,
    isAdminLoggedIn,
    isLoggedIn,
    user,
    setIsLoading,
  } = useAuthContext();

  const handleLogout = () => {
    setUser(null);
    setEmp(null);
    localStorage.removeItem("user");
    localStorage.removeItem("employee");
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    nav("/login");
  };

  const handleFeedbackClick = () => {
    setIsFeedbackPopOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackPopOpen(false);
  };

  const handleSubmitFeedback = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Submitting feedback...");

    const formData = new FormData(event.currentTarget);
    const category = formData.get("category") as string;
    const title = formData.get("title") as string;
    const feedback = formData.get("feedback") as string;

    if (!category || !title || !feedback) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    console.log("Form Data:", { category, title, feedback });

    const { data: feedbackData, error: feedbackError } = await supabase
      .from("DIM_FEEDBACK")
      .insert([
        {
          FEEDBACK_CAT: category,
          FEEDBACK_TITLE: title,
          FEEDBACK_DESC: feedback,
          FEEDBACK_USER: user?.id,
        },
      ])
      .select();

    if (feedbackError) {
      console.error("Error submitting feedback:", feedbackError.message);
      setIsLoading(false);
      return;
    }

    console.log("Feedback submitted successfully:", feedbackData);

    if (feedbackData && feedbackData.length > 0) {
      const feedbackId = feedbackData[0].FEEDBACK_ID; // Ensure this matches the primary key column name

      const { error: issueError } = await supabase
        .from("FACT_ISSUE_TRACKER")
        .insert([
          {
            FEEDBACK_FK: feedbackId,
            ISSUE_STAT: "Not Started",
          },
        ]);

      if (issueError) {
        console.error(
          "Error creating issue tracker entry:",
          issueError.message
        );
        setIsLoading(false);
        return;
      }

      console.log("Issue tracker entry created successfully");
    }

    setIsFeedbackPopOpen(false);
    setIsLoading(false);
  };

  return (
    <div
      className="main w-full
    flex justify-between items-center
    bg-[#202020] text-white mb-1
    md:px-3
    text-[12px] lg:text-[15px]
    2xl:text-[17px]
    "
    >
      <div
        className="left
      flex gap-5 m-2.5 ml-4
      lg:ml-7 lg:gap-8 lg:m-3
      2xl:ml-16 2xl:gap-16 2xl:m-4
        "
      >
        <button
          className="
        font-normal lg:font-medium md:text-sm
        "
          onClick={() => nav("/about")}
        >
          About Us
        </button>
        {isLoggedIn && !isAdminLoggedIn && (
          <button
            className="font-normal lg:font-medium md:text-sm"
            onClick={handleFeedbackClick}
          >
            Give Feedback
          </button>
        )}
      </div>
      <div
        className="right
        flex gap-3 m-2 mr-4
        lg:mr-7 lg:gap-5 lg:m-3
        2xl:mr-16 2xl:gap-8 2xl:m-4
        "
      >
        {location.pathname === "/admin" ||
        location.pathname === "/moderator" ? (
          <button
            className="font-normal lg:font-medium md:text-sm"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <h3 className="font-normal lg:font-medium md:text-sm">
            Welcome {useAuthContext().user?.name}
          </h3>
        )}
      </div>
      <FeedbackPop isOpen={isFeedbackPopOpen} onClose={handleCloseFeedback}>
        <h2 className="text-lg font-bold mb-4">Give Feedback</h2>
        <form className="" onSubmit={handleSubmitFeedback}>
          <select
            className="w-full p-2 border rounded mb-4  text-black text-xs xl:text-base"
            defaultValue=""
            name="category"
          >
            <option className="font-medium" value="" disabled>
              Select a category
            </option>
            <option className="font-medium" value="Bug">
              Bug
            </option>
            <option className="font-medium" value="Feature">
              Feature
            </option>
            <option className="font-medium" value="Feedback">
              Feedback
            </option>
          </select>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4 text-black text-xs xl:text-base"
            placeholder="Title"
            name="title"
          />
          <textarea
            className="w-full p-2 border rounded text-black text-xs xl:text-base font-medium"
            rows={5}
            placeholder="Your feedback"
            name="feedback"
          ></textarea>
          <button
            type="submit"
            className="px-3 py-2 text-xs border-2 border-white text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white hover:text-black transition duration-300 font-normal xl:p-3 xl:px-6 xl:text-sm xl:mr-3 2xl:text-lg mt-3"
          >
            Submit
          </button>
        </form>
      </FeedbackPop>
    </div>
  );
};

export default TopNavBar;
