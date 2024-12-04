import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgetPass from "./ForgetPass";
import { useLocation, useNavigate } from "react-router-dom";

const SignOrLoginPage = () => {
  const i = 2;

  const location = useLocation();
  const nav = useNavigate();

  const renderPage = () => {
    if (location.pathname === "/login") {
      return <LoginPage />;
    } else if (location.pathname === "/signup") {
      return <SignupPage />;
    } else if (location.pathname === "/forget") {
      return <ForgetPass />;
    } else {
      return <h1>404 - Page Not Found</h1>; // Optional: Handle unknown paths
    }
  };

  return (
    <div
      className="
    flex w-full justify-center 
    items-center overflow-hidden"
    >
      <div
        className="column-container 
       flex flex-row w-full"
      >
        {/* Left Container */}
        <div
          className="left-container       
        w-0 sm:w-1/2 h-screen 
        m-0
        drop-shadow-2xl
        "
        >
          <img
            src="../src/img/image_1.png"
            alt="TrailMarket"
            className="w-full h-full 
            object-cover "
          />
        </div>
        {/* Right Container */}
        <div
          className="right-container 
        flex flex-1 flex-col justify-center 
        items-center m-8
        
        "
        >
          <div
            className="title-container
          flex flex-col justify-center 
          items-center sm:items-start
          w-full max-w-md 2xl:max-w-xl
          
          "
          >
            <h1
              className="bg-gradient-to-r
             from-[#6B66FB] to-[#000000]
              text-transparent bg-clip-text
              text-5xl font-semibold 
              text-center
              sm:text-left
              2xl:text-[75px]
              2xl:text-left
              "
            >
              TrailMarket
            </h1>
            <p
              className="text-sm 
            font-light ml-2 text-center
             sm:text-left
             2xl:text-[16px]
             2xl:text-left
             "
            >
              An exclusive market for Trailblazers of USTP-CDO Campus!
            </p>
          </div>
          <div
            className="form-container
          mt-5 w-full max-w-md 2xl:max-w-xl
          2xl:text-lg
          "
          >
            {renderPage()}
            <div
              className="bottom
          m-5 mt-14
          "
            >
              <div
                className="col-ctnr
            flex
            items-center justify-center
            "
              >
                <h2
                  className="
              text-[14px]
              font-light
              text-center
              m-3
            2xl:text-base
              "
                >
                  {location.pathname === "/login"
                    ? "Dont have an account?"
                    : "Already have an account?"}
                </h2>
              </div>
              <button
                id="signup-button"
                className="
                bg-gradient-to-r
                from-[#6B66FB] to-[#000000]
                text-white
                font-normal
                rounded-full
                w-full h-12
                shadow-lg 2xl:h-14
              "
                onClick={() => {
                  {
                    location.pathname === "/login"
                      ? nav("/signup")
                      : nav("/login");
                  }
                }}
              >
                {location.pathname === "/login" ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOrLoginPage;
