import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="right-container">
      <input placeholder="ID Number" id="id-input" className="form-control" />
      <input
        type="password"
        placeholder="Password"
        id="password-input"
        className="form-control"
      />
      <button id="login-button" className="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
