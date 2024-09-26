import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import LoginPage from "../LoginPage/LoginPage";
import AppLayout from "../Layouts/AppLayout";

const Dashboard = (props) => {
  useEffect(() => {}, []);
  const url = process.env.REACT_APP_SERVER_URL;
  return (
    <AppLayout activeKey="dashboard">
      <div
        className="flex col-12 flex-column align-items-center"
        style={{
          background: 'url("/assets/images/blocks/signin/signin.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: 1600,
        }}
      >
        <div className="flex w-10">
          <div className="w-8 mt-8">
            <h3 className="ml-8">App is ready</h3>
            <div className="flex flex-wrap w-full justify-content-center ">
              <div className="col-12 lg:col-6 xl:col-6">
                <Link to="/todo">
                  <div className="flex mb-0 flex-column align-items-center justify-content-center hover zoom">
                    <div className="flex h-full mb-3 shadow-2 border-round surface-card flex-column justify-content-between">
                      <div className="p-4">
                        <div className="flex align-items-center">
                          <span
                            className="inline-flex mr-3 bg-yellow-100 border-circle align-items-center justify-content-center"
                            style={{ width: "38px", height: "38px" }}
                          >
                            <i className="text-xl text-yellow-600 pi pi-briefcase"></i>
                          </span>
                          <span className="text-2xl font-medium text-900">
                            Get Started
                          </span>
                        </div>
                        <div className="my-3 text-xl font-medium text-900">
                          Unlimited user access
                        </div>
                        <p className="mt-0 mb-3 text-700 line-height-3">
                          User access levels: Super-user, Manager, Supervisor,
                          Technician, External.
                        </p>
                      </div>
                      <div className="px-4 py-3 text-right surface-100">
                        <Button
                          icon="pi pi-arrow-right"
                          label="Get Started"
                          className="p-button-rounded p-button-warning"
                          iconPos="right"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-12 lg:col-6 xl:col-6">
                <Link to="/admin">
                  <div className="flex mb-0 flex-column align-items-center justify-content-center hover zoom">
                    <div className="flex h-full mb-3 shadow-2 border-round surface-card flex-column justify-content-between">
                      <div className="p-4">
                        <div className="flex align-items-center">
                          <span
                            className="inline-flex mr-3 bg-green-100 border-circle align-items-center justify-content-center"
                            style={{ width: "38px", height: "38px" }}
                          >
                            <i className="text-xl text-green-600 pi pi-globe"></i>
                          </span>
                          <span className="text-2xl font-medium text-900">
                            Dashboards
                          </span>
                        </div>
                        <div className="my-3 text-xl font-medium text-900">
                          Real Time Tracking
                        </div>
                        <p className="mt-0 mb-3 text-700 line-height-3">
                          Tracking on manhours, Reports on job status, Status of
                          machine, Generate quote.
                        </p>
                      </div>
                      <div className="px-4 py-3 text-right surface-100">
                        <Button
                          icon="pi pi-arrow-right"
                          label="Reports"
                          className="p-button-rounded p-button-success"
                          iconPos="right"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              {/* Links to services */}
              {/* ~cb-add-services-card~ */}
            </div>
          </div>
          <div className="flex w-4 flex-column align-items-center zoomindown animation-duration-1000 animation-iteration-1">
            <p className="m-0 text-7xl" role="welcome-text">
              Welcome!
            </p>
            <p>You are ready to go!</p>
            {props.isLoggedIn ? null : <LoginPage />}
          </div>
        </div>
        <div className="w-10 my-6 card">
          <div className="surface-0">
            <div className="mb-3 text-3xl font-medium text-900">
              Login Information
            </div>
            <div className="mb-5 text-500">
              Each company employs a distinct login and authentication method.
              Below are the available methods for this application. For further
              details, please contact support.
            </div>
            <ul className="p-0 m-0 list-none">
              <li className="flex flex-wrap px-2 py-3 align-items-center border-top-1 border-300">
                <div className="w-6 font-medium text-500 md:w-2">
                  Email Invitation
                </div>
                <div className="w-full text-900 md:w-8 md:flex-order-0 flex-order-1">
                  Did you recevie and email? Please follow the link to login or
                  contact support?
                </div>
                <div className="flex w-6 md:w-2 justify-content-end">
                  <Button
                    label="Support"
                    icon="pi pi-question-circle"
                    className="p-button-text"
                  />
                </div>
              </li>
              <li className="flex flex-wrap px-2 py-3 align-items-center border-top-1 border-300">
                <div className="w-6 font-medium text-500 md:w-2">
                  Simple Sign Up
                </div>
                <div className="w-full text-900 md:w-8 md:flex-order-0 flex-order-1">
                  <Chip label="Default as Staff profile" className="mr-2" />
                  <Chip label="No Department or section" className="mr-2" />
                  <Chip label="Must wait for approval from Admin" />
                </div>
                <div className="flex w-6 md:w-2 justify-content-end">
                  <Button
                    label="Support"
                    icon="pi pi-question-circle"
                    className="p-button-text"
                  />
                </div>
              </li>
              <li className="flex flex-wrap px-2 py-3 align-items-center border-top-1 border-300">
                <div className="w-6 font-medium text-500 md:w-2">Admin</div>
                <div className="w-full text-900 md:w-8 md:flex-order-0 flex-order-1">
                  Please use your codebridge account to login for admin
                  functions only
                </div>
                <div className="flex w-6 md:w-2 justify-content-end">
                  <Button
                    label="Support"
                    icon="pi pi-question-circle"
                    className="p-button-text"
                  />
                </div>
              </li>
              <li className="flex flex-wrap px-2 py-3 align-items-center border-top-1 border-300">
                <div className="w-6 font-medium text-500 md:w-2">
                  Other Actors
                </div>
                <div className="w-full text-900 md:w-8 md:flex-order-0 flex-order-1">
                  Robert De Niro, Al Pacino, etc have to request access from
                  support.
                </div>
                <div className="flex w-6 md:w-2 justify-content-end">
                  <Button
                    label="Support"
                    icon="pi pi-question-circle"
                    className="p-button-text"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Dashboard);
