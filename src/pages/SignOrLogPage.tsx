import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const SignOrLoginPage = () => {
  return (
    <div className="column-container">
      <div className="left-container">
        <h1>TrailMarket</h1>
        <h3>The exclusive market for USTP-CDO Students!</h3>
      </div>
      <div className="right-container">{<SignupPage />}</div>
    </div>
  );
};

export default SignOrLoginPage;
