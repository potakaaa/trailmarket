import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const SignOrLoginPage = () => {
  const i = 2;
  return (
    <div
      className="container 
    flex size-full justify-center items-center"
    >
      <div
        className="column-container 
       flex w-full"
      >
        {/* Left Container */}
        <div
          className="left-container 
        basis-0 sm:basis-[55%]
        "
        >
          <img src="../src/img/image_1.png" alt="TrailMarket" />
        </div>
        {/* Right Container */}
        <div
          className="right-container 
        basis-[45%] m-9
        flex flex-1 flex-col justify-center 
        items-center"
        >
          <div
            className="title-container
          flex flex-col justify-center 
          items-center
          "
          >
            <h1
              className="bg-gradient-to-r
             from-[#6B66FB] to-[#000000]
              text-transparent bg-clip-text
              text-5xl font-semibold
              "
            >
              TrailMarket
            </h1>
            <p className="text-sm font-light ml-2 text-center sm:text-left">
              An exclusive market for Trailblazers of USTP-CDO Campus!
            </p>
          </div>
          <div
            className="form-container
          mt-5
          "
          >
            {i > 1 ? <LoginPage /> : <SignupPage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOrLoginPage;
