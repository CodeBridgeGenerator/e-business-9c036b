import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";

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

const SetUpPassword = (props) => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    onNext,
    loading,
  } = props;
  const [maskPassword, setMaskPassword] = useState(true);
  const [maskConfirmPassword, setMaskConfirmPassword] = useState(true);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  const isMinLength = password.length >= 6;
  const isUppercase = /[A-Z]/.test(password);
  const isNumber = /\d/.test(password);
  const isSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return (
    <div className="w-full max-w-[400px]">
      <div className="px-3 text-center">
        <h3 className="font-semibold">Set up your password</h3>
        <p>
          Please enter a strong password that meets the required security
          criteria for your account.
        </p>
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
              className={classNames(passwordError ? "p-invalid" : "", "w-full")}
              onKeyDown={onEnter}
            ></InputText>
          </span>
          <small className="p-error">{passwordError}</small>
          <div className="mt-2">
            <PasswordPolicy
              text="Minimum of 6 characters"
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
            label="Set up my account"
            className="w-full !rounded-full py-3 text-[16px]"
            onClick={onNext}
            loading={loading}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default SetUpPassword;
