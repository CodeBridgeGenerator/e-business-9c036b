import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginFaqImage from "../../assets/media/login-faq.png";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";
import { useState } from "react";
import AppFooter from "../Layouts/AppFooter";

const LoginFaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA]">
      <div className="fixed top-0 left-0 w-full">
        <div className="flex justify-start gap-2 p-5 bg-transparent">
          <Link
            to="/login"
            className="flex items-center gap-2 font-semibold text-primary"
          >
            <i className="pi pi-angle-left"></i>
            <p>Back to login</p>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center mt-[100px] md:mt-0 flex-col md:flex-row mx-auto w-full max-w-[1200px] gap-7 px-7">
        <div className="w-full max-w-[400px]">
          <img src={LoginFaqImage} alt="Login Faq" className="w-full" />
          <h1 className="font-semibold">Need help?</h1>
          <p className="text-xl">
            Stuck on something? Here are your most frequently asked questions.
          </p>
        </div>
        <div className="flex-1">
          <Accordion
            className="login-faq"
            expandIcon={<></>}
            collapseIcon={<></>}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <AccordionTab
              header={
                <div className="flex items-center justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    How do I get my registered email?
                  </h3>
                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 0 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                To access your account, please reach out to your administrator
                for instructions and credentials.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    What should I do if I forgot my password?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 1 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                If you forget your password, simply click on the "Forgot your
                password?" on the login page. You'll need to enter your
                registered email address, and instructions for resetting your
                password will be sent to you. If you don’t see the email in your
                inbox, be sure to check your Spam / Junk folder.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    How do I unlock my account?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 2 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                Your account may become locked after several failed login
                attempts. To regain access, you can either click on "Forgot your
                password?" to reset your credentials or contact your
                administrator for further assistance.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    What if I don’t receive the verification code / email?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 3 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                If you don’t receive the verification code, check your Spam /
                Junk folder. You can request a new code by clicking "Resend code
                / Resend email”. If the problem continues, contact your
                administrator for further assistance.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    Why am I seeing an “email / password entered is incorrect”
                    error?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 4 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                If you’re seeing an “Email / password entered is incorrect”
                error, double-check that your registered email and password are
                correct, and make sure your caps lock is turned off. If you’ve
                recently reset or changed your password, ensure you’re using the
                updated credentials.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    Why am I seeing a “we can’t find an account” error?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 5 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                If you’re seeing a “We can’t find an account” error,
                double-check that your registered email is correct. If the
                problem continues, contact your administrator for further
                assistance.
              </p>
            </AccordionTab>
            <AccordionTab
              header={
                <div className="flex justify-between">
                  <h3 className="mb-0 text-xl font-semibold !text-secondary">
                    Who do I contact if I still can’t log in?
                  </h3>

                  <i
                    className={classNames(
                      "pi pi-chevron-down duration-300",
                      activeIndex === 6 ? "rotate-180" : "",
                    )}
                  ></i>
                </div>
              }
            >
              <p>
                If you’re still unable to log in after trying these solutions,
                contact your administrator for further assistance. When reaching
                out, provide as much detail as possible, including any error
                messages you’ve received, so your administrator can assist you
                promptly.
              </p>
              <p className="flex items-center gap-2 font-semibold text-primary">
                <i className="pi pi-envelope"></i> administrator@email.com
              </p>
            </AccordionTab>
          </Accordion>
        </div>
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
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(LoginFaqPage);
