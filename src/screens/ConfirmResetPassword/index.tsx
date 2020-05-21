import React from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useConfirmResetPassword from "loose-components/src/screens/ConfirmResetPassword";
import "./index.scss";

const ConfirmResetPassword = () => {
  const router = useRouter();
  const { code } = router.query;
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    data,
    checkPasswords,
    onConfirmPassword,
  } = useConfirmResetPassword({ code });
  return (
    <div className="confirm-reset-password-container">
      <div className="confirm-reset-password-logo">
        <span className="confirm-reset-password-logo-text">Loose Dev</span>
      </div>
      <div className="confirm-reset-password-form-wrapper">
        <div className="confirm-reset-password-title">Reset Password</div>
        <div className="Box reset-password-form-container">
          {data && data.confirmResetPassword ? (
            <React.Fragment> Your password was reseted succesfully </React.Fragment>
          ) : (
            <React.Fragment>
              <label className="confirm-reset-password-form-label" for="new-password-field">
                New password:
              </label>
              <Input
                id="new-password-field"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="confirm-reset-password-form-label" for="confirm-new-password-field">
                Confirm new password:
              </label>
              <Input
                id="confirm-new-password-field"
                type="password"
                placeholder="confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div>{checkPasswords && `Password Doesn't match`}</div>
              <Button
                className="confirm-reset-password-form-button"
                onClick={onConfirmPassword}
                disabled={checkPasswords}
              >
                Reset Password
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
