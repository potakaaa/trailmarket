import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgetPass from "./ForgetPass";

const SignOrLoginPage = () => {
  const i = 2;
  return (
    <div
      className="container 
    flex size-full justify-center 
    items-center overflow-hidden"
    >
      <div
        className="column-container 
       flex w-full"
      >
        {/* Left Container */}
        <div
          className="left-container       
        w-0 sm:w-1/2 h-screen 
        m-0 sm:mr-5
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
        items-center m-5
        
        "
        >
          <div
            className="title-container
          flex flex-col justify-center 
          items-center sm:items-start
          
          "
          >
            <h1
              className="bg-gradient-to-r
             from-[#6B66FB] to-[#000000]
              text-transparent bg-clip-text
              text-5xl font-semibold 
              text-center
              sm:text-left
              "
            >
              TrailMarket
            </h1>
            <p
              className="text-sm 
            font-light ml-2 text-center
             sm:text-left"
            >
              An exclusive market for Trailblazers of USTP-CDO Campus!
            </p>
          </div>
          <div
            className="form-container
          mt-5 w-full max-w-md
          "
          >
            {/*i > 1 ? <LoginPage /> : <SignupPage />*/ <ForgetPass/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOrLoginPage;
