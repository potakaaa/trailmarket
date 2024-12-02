import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const SignOrLoginPage = () => {
  const i = 2;
  return (
    <div className="column-container flex flex-row size-full">
      <div
        className="left-container 
      flex flex-1 flex-col justify-center 
      items-center w-full"
      >
        <div className="title-container max-w-[38vw] w-full">
          <div className="logo-container flex flex-row">
            <h1 className="text-3xl">Trail</h1>
            <h1 className="text-3xl">Market</h1>
          </div>
          <h3 className="subtitle">
            An exclusive market for Trailblazers of USTP-CDO Campus!
          </h3>
        </div>
      </div>
      <div
        className="right-container 
      flex flex-1 flex-row justify-center 
      items-center border-2 border-black"
      >
        {i > 1 ? <SignupPage /> : <LoginPage />}
      </div>
    </div>
  );
};

export default SignOrLoginPage;
