import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Tag } from "primereact/tag";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import ProjectLayout from "../../Layouts/ProjectLayout";

const SingleUserChangePasswordPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState();

  useEffect(() => {
    //on mount
    client
      .service("userChangePassword")
      .get(urlParams.singleUserChangePasswordId, {
        query: {
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "UserChangePassword",
          type: "error",
          message: error.message || "Failed get userChangePassword",
        });
      });
  }, [props, urlParams.singleUserChangePasswordId]);

  const goBack = () => {
    navigate("/userChangePassword");
  };

  return (
    <ProjectLayout>
      <div className="col-12 flex flex-column align-items-center">
        <div className="col-10">
          <div className="flex align-items-center justify-content-start">
            <Button
              className="p-button-text"
              icon="pi pi-chevron-left"
              onClick={() => goBack()}
            />
            <h3 className="m-0">UserChangePassword</h3>
          </div>
          <p>userChangePassword/{urlParams.singleUserChangePasswordId}</p>
          {/* ~cb-project-dashboard~ */}
        </div>
        <div className="card w-full">
          <div className="grid ">
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">User Email</label>
              <p className="m-0 ml-3">{_entity?.userEmail}</p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">Server</label>
              <p className="m-0 ml-3">{_entity?.server}</p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">Environment</label>
              <p className="m-0 ml-3">{_entity?.environment}</p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">Code</label>
              <p className="m-0 ml-3">{_entity?.code}</p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">Status</label>
              <p className="m-0 ml-3">
                <i
                  id="status"
                  className={`pi ${_entity?.status ? "pi-check" : "pi-times"}`}
                ></i>
              </p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">SendEmailCounter</label>
              <p className="m-0 ml-3">{Number(_entity?.sendEmailCounter)}</p>
            </div>

            <div className="col-12">&nbsp;</div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleUserChangePasswordPage);
