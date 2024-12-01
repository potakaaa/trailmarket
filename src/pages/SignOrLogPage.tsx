import "./SignOrLoginPage.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const SignOrLoginPage = () => {
  const i = 1;
  return (
    <div className="column-container">
      <div className="left-container">
        <div className="logo-container">
          <h1 className="trail">Trail</h1>
          <h1 className="market">Market</h1>
        </div>
        <h3 className="subtitle">
          An exclusive market for Trailblazers of USTP-CDO Campus!
        </h3>
      </div>
      <div className="right-container">
        {i > 1 ? <SignupPage /> : <LoginPage />}
      </div>
<<<<<<< HEAD
=======
      <div className="right-container">{<LoginPage />}</div>
>>>>>>> 384d67c661c3c9e279c1d362b0f5964a05454545
    </div>
  );
};

export default SignOrLoginPage;
