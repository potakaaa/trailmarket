import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div id="container" className="container-md">
      <div className="column-container">
        <div className="left-container">
          <h1>TrailMarket</h1>
          <h3>The exclusive market for USTP-CDO Students!</h3>
        </div>
        <div className="right-container">
          <input
            placeholder="ID Number"
            id="id-input"
            className="form-control"
          />
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
      </div>
    </div>
  );
};

export default LoginPage;
