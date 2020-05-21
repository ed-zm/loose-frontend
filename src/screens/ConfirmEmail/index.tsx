import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import useConfirmEmail from "loose-components/src/screens/ConfirmEmail";
import "./index.scss";

const ConfirmEmail = () => {
  const router = useRouter();
  const { code } = router.query;
  const { data, error, loading } = useConfirmEmail({ code });
  return (
    <div className="confirm-email-container">
      {data && data.confirmEmail ? (
        <div className="blankslate">
          <div className="sign-in-error flash flash-full flash-success">Your email was confirmed</div>
        </div>
      ) : (
        <div>
          {loading && (
            <React.Fragment>
              <ClipLoader size={40} color={"333333"} loading={true} />
            </React.Fragment>
          )}
          {error && (
            <div className="blankslate">
              <div className="sign-in-error flash flash-full flash-error">There is a problem confirming your email</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
