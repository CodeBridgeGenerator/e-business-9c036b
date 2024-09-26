import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import client from "../../services/restClient";
import { codeGen } from "../../utils/codegen";
// import FacebookOauth from "./FacebookOauth";
// import GithubOauth from "./GithubOauth";
// import GoogleOauth from "./GoogleOauth";
// import AppleOauth from "./AppleOauth";

import illustration1 from "../../assets/media/login illustration 1.png";
import illustration2 from "../../assets/media/login illustration 2.png";
import emailSent from "../../assets/media/email.png";
import { emailRegex } from "../../utils/regex";
import AppFooter from "../Layouts/AppFooter";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = /login/.test(location.pathname);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [maskPassword, setMaskPassword] = useState(true);
  const [showForgotPassword, setForgotPassword] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSend, setIsSend] = useState(false);
  useEffect(() => {
    if (props.isLoggedIn === true) navigate("/", { replace: true });
  }, [props.isLoggedIn]);

  const onEnter = (e) => {
    if (e.key === "Enter") login();
  };

  const _getEmail = async () => {
    return await client
      .service("userInvites")
      .find({ query: { emailLogin: email } });
  };

  const login = () => {
    setLoading(true);
    if (validate()) {
      props
        .login({ email, password })
        .then((res) => {
          navigate("/project");
          setLoading(false);
        })
        .catch((error) => {
          props.alert({
            title: "User Login failed.",
            type: "error",
            message: error.message || "Proceed to login to your account.",
          });
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const validate = () => {
    let isValid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please Enter a valid Email address");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError(
        "Please enter a valid password. Must be at least 6 characters",
      );
      isValid = false;
    }
    return isValid;
  };

  const sendToForgotResetPage = async () => {
    if (!emailRegex.test(email)) {
      props.alert({
        title: "Invalid email",
        type: "error",
        message: "Please enter a valid email",
      });
      setVerificationError("user email not valid");
      return;
    }
    const userData = await client
      .service("users")
      .find({ query: { email: email } });
    const userInviteData = await client
      .service("userInvites")
      .find({ query: { emailToInvite: email } });
    if (userData.data?.length === 0 && userInviteData.data?.length === 0) {
      props.alert({
        title: "Invalid email",
        type: "error",
        message: "Please enter a valid email",
      });
      setVerificationError("user email not found");
      return;
    }
    setLoading(true);
    const userLoginData = await _getEmail();
    const userLogin = userLoginData?.data[0];
    try {
      // 1 check if email is in userLogin exists           => user has not logged in
      if (!userLogin) {
        setVerificationError("user has not attempted to logged in");
        setLoading(false);
      }
      // 2 check if email is in userLogin.status !== true  => user has not logged in
      else if (!userLogin?.status) {
        setVerificationError("user has not logged in successfully.");
        setLoading(false);
      }
      // 3 check if email is in userLogin.code !== null    => user has not logged in
      else if (isNaN(Number(userLogin?.code))) {
        setVerificationError("user has not been verified");
        setLoading(false);
      } else {
        const userCPData = await client.service("userChangePassword").find({
          query: { userEmail: email, $sort: { createdAt: -1 }, $limit: 1 },
        });
        const userCP = userCPData?.data[0];
        if (!userCP) {
          const _data = {
            userEmail: email,
            server: window.location.href,
            environment: process.env.REACT_APP_ENV,
            code: codeGen(),
            status: false,
            sendEmailCounter: 0,
          };
          await client.service("userChangePassword").create(_data);
          props.alert({
            title: `Reset password email sent to ${email}.`,
            type: "warn",
            message: `Account ${email} verification (0) under process.`,
          });
          setIsSend(true);
        } else {
          if (userCP?.sendEmailCounter >= 3) {
            setVerificationError("too many tries, please contact admin");
          } else if (userCP?.sendEmailCounter <= 3) {
            const _data = {
              userEmail: email,
              server: window.location.href,
              environment: process.env.REACT_APP_ENV,
              code: codeGen(),
              status: false,
              sendEmailCounter: ++userCP.sendEmailCounter,
            };
            await client.service("userChangePassword").patch(userCP._id, _data);
            setIsSend(true);
            props.alert({
              title: `Reset password email sent to ${email}.`,
              type: "warn",
              message: `Account ${email} verification (${_data.sendEmailCounter}) under process.`,
            });
          }
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw Error(error.message);
    }
  };

  const resendEmail = () => {
    props.alert({
      title: "Email resent",
      type: "success",
      message:
        "Successfully resend email. Please check your inbox or Junk/Span folder.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen align-items-center justify-content-center background-image">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[500px]">
        {!showForgotPassword && !isSend && (
          <div className="w-full px-3 mx-3 card md:px-7">
            <div className="my-4 text-4xl font-semibold text-center text-primary">
              {/* CodeBridge Image */}
              E-Business
            </div>
            <div>
              <div className="w-full mb-4">
                <p className="mb-1 text-sm">Email</p>
                <InputText
                  type="text"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classNames(
                    emailError ? "p-invalid" : "",
                    "w-full",
                  )}
                  onKeyDown={onEnter}
                />
                <small className="p-error">{emailError}</small>
              </div>
              <div className="w-full mb-4">
                <p className="mb-1 text-sm">Password</p>
                <span className="w-full p-input-icon-right">
                  <i
                    className={`pi ${maskPassword ? "pi-eye" : "pi-eye-slash"} cursor-pointer`}
                    onMouseDown={() => setMaskPassword(false)}
                    onMouseUp={() => setMaskPassword(true)}
                    onMouseLeave={() => setMaskPassword(true)}
                    title={`${maskPassword ? "Show" : "Hide"} password`}
                  />
                  <InputText
                    type={maskPassword ? "password" : "text"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classNames(
                      passwordError ? "p-invalid" : "",
                      "w-full",
                    )}
                    onKeyDown={onEnter}
                  />
                </span>
                <small className="p-error">{passwordError}</small>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.checked)}
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </div>
                <p
                  className="text-sm font-semibold cursor-pointer text-primary"
                  onClick={() => setForgotPassword(true)}
                >
                  Forgot your password?
                </p>
              </div>
            </div>
            <div className="mt-7">
              <Button
                label="Sign in"
                className="w-full !rounded-full py-3 text-[16px]"
                onClick={login}
                loading={loading}
              ></Button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Haven't activate your account yet?{" "}
                <Link
                  to="/signup"
                  className="font-semibold cursor-pointer text-primary"
                >
                  Set up now
                </Link>
              </p>
            </div>
            <div className="h-[1px] bg-[#CED4DA] my-5"></div>
            <div className="flex items-center justify-between">
              <Link
                to="/login-faq"
                className="m-0 text-sm font-semibold cursor-pointer !text-link"
              >
                Can't log in?
              </Link>
              <p className="m-0 text-sm font-semibold cursor-pointer text-link">
                Sign in with custom domain
              </p>
            </div>
          </div>
        )}
        {showForgotPassword && !isSend && (
          <div className="w-full px-3 mx-3 card md:px-7">
            <div className="my-4 text-4xl font-semibold text-center text-primary">
              {/* CodeBridge Image */}
              E-Business
            </div>
            <div className="mt-6 text-center">
              <h2 className="mb-4 text-2xl font-semibold">
                Forgot your password?
              </h2>
              <p className="text-[14px]">
                Please enter your registered email and we'll send you
                instructions to reset your password.
              </p>
            </div>
            <div className="mt-6">
              <div className="w-full mb-4">
                <p className="mb-1">Email</p>
                <InputText
                  className="w-full"
                  type="text"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></InputText>
                <small className="p-error">{verificationError}</small>
              </div>
              <div className="mt-6">
                <Button
                  label="Send reset instructions"
                  className="w-full !rounded-full py-3 text-[16px]"
                  loading={loading}
                  disabled={!email}
                  onClick={sendToForgotResetPage}
                ></Button>
              </div>
              <div className="mt-4 text-center">
                <p
                  className="font-semibold cursor-pointer text-primary"
                  onClick={() => setForgotPassword(false)}
                >
                  Back to login
                </p>
              </div>
            </div>
          </div>
        )}
        {isSend && (
          <div className="w-full px-3 mx-3 card md:px-7">
            <div className="my-4 text-center">
              <img
                src={emailSent}
                alt="emailSent"
                className="w-[60%] min-w-[150px]"
              />
            </div>
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold">Check your email</h2>
              <p className="text-[14px]">
                We've sent you an email with instructions to reset your
                password. Check your Junk/Span folder if it doesn't arrive. If
                you still can't log in, click resend email or contact your
                administrator.
              </p>
            </div>
            <div className="mt-6">
              <Button
                label="Back to login"
                className="w-full !rounded-full py-3 text-[16px]"
                loading={loading}
                disabled={!email}
                onClick={() => {
                  setForgotPassword(false);
                  setIsSend(false);
                }}
              ></Button>
            </div>
            <div className="mt-4 text-center">
              <p
                className="font-semibold cursor-pointer text-primary"
                onClick={resendEmail}
              >
                Resend email
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 flex justify-between w-full px-10 py-10 z-[-1]">
        <img
          src={illustration1}
          alt="illustration1"
          className="w-20rem min-w-[150px]"
        />
        <img
          src={illustration2}
          alt="illustration2"
          className="w-20rem min-w-[150px]"
        />
      </div>
      <AppFooter />
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  login: (data) => dispatch.auth.login(data),
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(LoginPage);
