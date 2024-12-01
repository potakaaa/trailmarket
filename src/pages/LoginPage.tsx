import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="container">
      <div className="column-container">
        <div className="left-container">
          <h1>TrailMarket</h1>
          <h3>The exclusive market for USTP-CDO Students!</h3>
        </div>
        <div className="right-container">
          <input type="number" placeholder="ID Number" className="id-input" />
          <input
            type="password"
            placeholder="Password"
            className="password-input"
          />
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
