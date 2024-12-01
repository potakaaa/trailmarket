import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="right-container">
      <input placeholder="ID Number" className="form-control " id="id-input" />
      <input
        type="email"
        placeholder="Email"
        className="form-control "
        id="email-input"
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control "
        id="password-input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="form-control "
        id="confirm-password-input"
      />
      <button className="btn btn-primary" id="login-button">
        Login
      </button>
    </div>
  );
};

export default SignupPage;
