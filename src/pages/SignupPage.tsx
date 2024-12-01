const SignupPage = () => {
  return (
    <div className="container">
      <div className="column-container">
        <div className="left-container">
          <h1>TrailMarket</h1>
          <h3>The exclusive market for USTP-CDO Students!</h3>
        </div>
        <div className="right-container">
          <input type="number" placeholder="ID Number" className="id-input" />
          <input type="email" placeholder="Email" className="email-input" />
          <input
            type="password"
            placeholder="Password"
            className="password-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="confirm-password-input"
          />
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
