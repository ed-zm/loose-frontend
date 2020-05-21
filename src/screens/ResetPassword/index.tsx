import React from "react";
import useResetPassword from "loose-components/src/screens/ResetPassword";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./index.scss";

const ResetPassword = () => {
  const { email, setEmail, data, onResetPassword } = useResetPassword();
  return (
    <div className="reset-password-container">
      <div className="reset-password-logo">
        <span className="reset-password-logo-text">Loose Dev</span>
      </div>
      <div className="reset-password-form-wrapper">
        <div className="reset-password-title">Reset Password</div>
        <div className="Box reset-password-form-container">
          {data && data.resetPassword ? (
            <div> We've sent you an Email With Instructions to reset your password </div>
          ) : (
            <React.Fragment>
              <label className="reset-password-form-label" for="email-field">
                Enter your user account's verified email address and we will send you a password reset link.
              </label>
              <Input
                id="email-field"
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="reset-password-form-button" onClick={onResetPassword}>
                Reset Password
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
