import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const SignOrLoginPage = () => {
  const i = 1;
  return (
    <div className="column-container">
      <div className="left-container">
        <div className="title-container">
          <div className="logo-container">
            <h1 className="trail">Trail</h1>
            <h1 className="market">Market</h1>
          </div>
          <h3 className="subtitle">
            An exclusive market for Trailblazers of USTP-CDO Campus!
          </h3>
        </div>
      </div>
      <div className="right-container">
        {i > 1 ? <SignupPage /> : <LoginPage />}
      </div>
    </div>
  );
};

export default SignOrLoginPage;
