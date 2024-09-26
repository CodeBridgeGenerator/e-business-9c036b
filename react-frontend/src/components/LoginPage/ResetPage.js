import React, { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import client from "../../services/restClient";
import { useNavigate, useParams } from "react-router-dom";

import illustration1 from "../../assets/media/login illustration 1.png";
import illustration2 from "../../assets/media/login illustration 2.png";
import successImage from "../../assets/media/success.png";
import AppFooter from "../Layouts/AppFooter";
const PasswordPolicy = ({ text, valid }) => {
  return (
    <p
      className={classNames(
        "flex items-center gap-2 mb-1",
        !valid && "text-[#ADB5BD]",
      )}
    >
      <span className="w-[15px] text-center">
        <i
          className={classNames(
            valid
              ? "text-green-500 pi pi-check"
              : "text-[#ADB5BD] pi pi-circle-fill text-xs",
          )}
        ></i>
      </span>
      {text}
    </p>
  );
};

const ResetPage = (props) => {
  const navigate = useNavigate();
  const isReset = /reset/.test(location.pathname);
  const urlParams = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskConfirmPassword, setMaskConfirmPassword] = useState(true);
  const [success, setSuccess] = useState(false);

  const isMinLength = password.length >= 10;
  const isUppercase = /[A-Z]/.test(password);
  const isNumber = /\d/.test(password);
  const isSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  useEffect(() => {
    checkChangePassword();
  }, [urlParams.singleChangeForgotPasswordId]);

  const checkChangePassword = async () => {
    const changePasswordData = await client
      .service("userChangePassword")
      .find({ query: { _id: urlParams.singleChangeForgotPasswordId } });
    if (changePasswordData?.data?.length !== 0) {
      setEmail(changePasswordData?.data[0]?.userEmail);
    } else {
      setEmail("email not found");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") savePassword();
  };

  const savePassword = async () => {
    if (validate()) {
      const userData = await client
        .service("users")
        .find({ query: { email: email } });
      if (userData?.data?.length === 1)
        props
          .patchUser({
            _id: userData?.data[0]?._id,
            data: { password: password },
          })
          .then((res) => {
            console.log(res.data);
            setSuccess(true);
            navigate("/login");
          });
    }
  };

  const validate = () => {
    if (!isMinLength) {
      setPasswordError("Minimum of 10 characters");
      return false;
    }

    if (!isUppercase) {
      setPasswordError("Include at least one uppercase letter");
      return false;
    }

    if (!isNumber) {
      setPasswordError("Include at least one number");
      return false;
    }

    if (!isSymbol) {
      setPasswordError("Include at least one symbol");
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col min-h-screen align-items-center justify-content-center background-image">
      <div className="max-w-[500px] w-full flex-1 flex flex-col items-center justify-center">
        {!success && (
          <div className="card w-full max-w-[500px] px-3 md:px-7 mx-3">
            <div className="my-4 text-4xl font-semibold text-center text-primary">
              {/* CodeBridge Image */}
              E-Business
            </div>
            <div className="mt-6 text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Reset your password
              </h2>
            </div>
            <div className="mt-6">
              <div className="w-full mb-4">
                <p className="m-0">New Password</p>
                <span className="w-full p-input-icon-right">
                  <i
                    className={`pi ${maskPassword ? "pi-eye" : "pi-eye-slash"} cursor-pointer`}
                    title={`${maskPassword ? "Show" : "Hide"} password`}
                    onMouseDown={() => setMaskPassword(false)}
                    onMouseUp={() => setMaskPassword(true)}
                    onMouseLeave={() => setMaskPassword(true)}
                  />
                  <InputText
                    type={maskPassword ? "password" : "text"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    className={classNames(
                      passwordError ? "p-invalid" : "",
                      "w-full",
                    )}
                    onKeyDown={onEnter}
                  ></InputText>
                </span>
                <small className="p-error">{passwordError}</small>
                <div className="mt-2">
                  <PasswordPolicy
                    text="Minimum of 10 characters"
                    valid={isMinLength}
                  />
                  <PasswordPolicy
                    text="Include at least one uppercase letter"
                    valid={isUppercase}
                  />
                  <PasswordPolicy
                    text="Include at least one number"
                    valid={isNumber}
                  />
                  <PasswordPolicy
                    text="Include at least one symbol"
                    valid={isSymbol}
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <p className="m-0">Confirm New Password</p>
                <span className="w-full p-input-icon-right">
                  <i
                    className={`pi ${maskConfirmPassword ? "pi-eye" : "pi-eye-slash"} cursor-pointer`}
                    title={`${maskConfirmPassword ? "Show" : "Hide"} password`}
                    onMouseDown={() => setMaskConfirmPassword(false)}
                    onMouseUp={() => setMaskConfirmPassword(true)}
                    onMouseLeave={() => setMaskConfirmPassword(true)}
                  />
                  <InputText
                    type={maskConfirmPassword ? "password" : "text"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError(null);
                    }}
                    className={classNames(
                      confirmPasswordError ? "p-invalid" : "",
                      "w-full",
                    )}
                    onKeyDown={onEnter}
                  ></InputText>
                </span>
                <small className="p-error">{confirmPasswordError}</small>
              </div>
              <div className="mt-6">
                <Button
                  label="Reset password"
                  className="w-full !rounded-full py-3 text-[16px]"
                  onClick={savePassword}
                ></Button>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="card w-full max-w-[500px] px-3 md:px-7 mx-3">
            <div className="my-4 text-center">
              <img
                src={successImage}
                alt="success"
                className="w-[60%] min-w-[150px]"
              />
            </div>
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Successfully reset your password
              </h2>
              <p className="text-[14px]">
                Please log in with your new password
              </p>
            </div>
            <div className="mt-6">
              <Button
                label="Back to login"
                className="w-full !rounded-full py-3 text-[16px]"
                onClick={() => {
                  navigate("/login");
                }}
              ></Button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 flex justify-between w-full px-10 py-10 z-[-1]">
        <img
          src={illustration1}
          alt="illustration1"
          className="w-[20%] min-w-[150px]"
        />
        <img
          src={illustration2}
          alt="illustration2"
          className="w-[20%] min-w-[150px]"
        />
      </div>
      <AppFooter />
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn, passwordPolicyErrors } = state.auth;
  return { isLoggedIn, passwordPolicyErrors };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  patchUser: (data) => dispatch.auth.patchUser(data),
});

export default connect(mapState, mapDispatch)(ResetPage);
