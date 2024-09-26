import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import _ from "lodash";
import SignUpStep from "./SignUpStep";
import { Toast } from "primereact/toast";

import { emailRegex } from "../../../utils/regex";
import { codeGen } from "../../../utils/codegen";
import EnterDetailsStep from "./step/EnterDetails";
import VerificationStep from "./step/Verification";
import SetUpPassword from "./step/SetUpPassword";
import AppFooter from "../../Layouts/AppFooter";

const SignUpPage = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState();
  const [sysCode, setSysCode] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [step, setStep] = useState(1);

  const toast = useRef(null);
  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };

  const showFailure = (summary, message) => {
    toast.current.show({
      severity: "error",
      summary: summary,
      detail: message,
      life: 3000,
    });
  };

  const _getInviteEmail = async () => {
    return await client.service("userInvites").find({
      query: {
        emailToInvite: email,
      },
    });
  };

  const _getUserEmail = async () => {
    return await client.service("users").find({
      query: {
        email: email,
      },
    });
  };

  const _setCounter = async (id, count) => {
    return await client.service("userInvites").patch(id, {
      sendMailCounter: count,
    });
  };

  const onFinishStepOne = async () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (!name.length) {
      setNameError("name is required");
      return;
    }
    resendMail();
  };

  const validateEmail = async () => {
    let loginEmailData = await _getInviteEmail();
    if (loginEmailData.data.length === 0) {
      const _login = {
        emailToInvite: email,
        access: null,
        code: codeGen(),
        sendMailCounter: 0,
      };
      const data = await client.service("userInvites").create(_login);
      loginEmailData.data = [data];
    }
    return loginEmailData.data[0];
  };

  const validateEmailSending = (loginEmailData) => {
    if (loginEmailData?.sendMailCounter >= 3) {
      showFailure("Mail counter", "too many tries, please contact your admin");
      return false;
    }
    return true;
  };

  const validateCode = (loginEmailData) => {
    if (loginEmailData?.code > 10000) return true;
    showFailure("Code Generator", "code not found, please contact your admin");
    return false;
  };

  const resendMail = async () => {
    const loginEmailData = await validateEmail();
    if (!validateEmailSending(loginEmailData)) return;
    if (!validateCode(loginEmailData)) return;
    setSysCode(loginEmailData.code);
    const _mail = {
      name: "onCodeVerifyEmail",
      type: "signup",
      from: "info@cloudbasha.com",
      recipients: [email],
      status: true,
      data: { name: name, code: loginEmailData.code },
      subject: "email code verification process",
      templateId: "onCodeVerify",
    };
    setLoading(true);
    await client.service("mailQues").create(_mail);
    props.alert({
      title: "Verification email sent.",
      type: "success",
      message: "Proceed to check your email inbox.",
    });
    _setCounter(loginEmailData?._id, Number(++loginEmailData.sendMailCounter));
    setLoading(false);
    setStep(2);
    showSuccess(`Verification email sent to ${email}`);
  };

  const onFinishStepTwo = () => {
    if (!code || code.length !== 6) {
      setCodeError("Please enter the code");
      return;
    }
    setStep(3);
  };

  const onFinishStepThree = () => {
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirm Password is not correct");
      return;
    }

    signup();
  };

  const validate = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Please Enter a valid email");
      isValid = false;
    }

    if (!name.length) {
      setNameError("name is required");
      isValid = false;
    } else if (name.length < 3) {
      setNameError("Must be at least 3 characters long");
      isValid = false;
    }
    if (!password.length) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Must be at least 6 characters long and have at least one letter, digit, uppercase, lowercase and symbol"
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError("Confirm Password is not correct");
      isValid = false;
    }

    return isValid;
  };

  const signup = async () => {
    const user = await _getUserEmail();
    if (validate()) {
      try {
        if (user?.data?.length === 0) {
          props
            .createUser({
              name,
              email: email,
              password,
              status: true,
            })
            .then(async () => {
              navigate("/login");
            });
          props.alert({
            title: "User account created successfully.",
            type: "success",
            message: "Proceed to login.",
          });
        } else {
          navigate("/login");
          props.alert({
            title: "User account already created.",
            type: "warn",
            message: "Proceed to login.",
          });
        }
      } catch (error) {
        props.alert({
          title: "User account failed to create.",
          type: "error",
          message: error.message || "Failed to sign in.",
        });
      }
    } else {
      props.alert({
        title: "Sign up failed.",
        type: "error",
        message: "Please contact admin.",
      });
      return;
    }
  };

  return (
    <div className="flex flex-col min-h-screen align-items-center justify-content-center bg-[#F8F9FA]">
      <Toast ref={toast} position="bottom-center" />
      <div className="fixed top-0 left-0 w-full">
        <div className="flex items-center justify-between p-5 bg-white shadow">
          <div className="basis-auto">
            <p className="text-xl font-semibold text-primary"></p>
          </div>
          <div className="basis-[700px]">
            <SignUpStep step={step} />
          </div>
          <div className="basis-auto"></div>
        </div>
        <div className="flex items-center gap-2 p-5 bg-transparent">
          <Link
            to="/login"
            className="flex items-center gap-2 font-semibold text-primary"
          >
            <i className="pi pi-angle-left"></i>
            <p>Back to login</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 px-3">
        {step === 1 && (
          <EnterDetailsStep
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            setEmailError={setEmailError}
            name={name}
            setName={setName}
            nameError={nameError}
            setNameError={setNameError}
            onNext={onFinishStepOne}
            loading={loading}
          />
        )}
        {step === 2 && (
          <VerificationStep
            code={code}
            sysCode={sysCode}
            setCode={setCode}
            codeError={codeError}
            setCodeError={setCodeError}
            onNext={onFinishStepTwo}
            resendCode={resendMail}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {step === 3 && (
          <SetUpPassword
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            confirmPasswordError={confirmPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            onNext={onFinishStepThree}
            loading={loading}
          />
        )}
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
  createUser: (data) => dispatch.auth.createUser(data),
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SignUpPage);
