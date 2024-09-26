import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Tag } from "primereact/tag";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import ProjectLayout from "../../Layouts/ProjectLayout";

import StepsPage from "../StepsPage/StepsPage";
import { Calendar } from "primereact/calendar";

const SingleUserGuidePage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState();

  useEffect(() => {
    //on mount
    client
      .service("userGuide")
      .get(urlParams.singleUserGuideId, {
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
          title: "UserGuide",
          type: "error",
          message: error.message || "Failed get userGuide",
        });
      });
  }, [props, urlParams.singleUserGuideId]);

  const goBack = () => {
    navigate("/userGuide");
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
            <h3 className="m-0">UserGuide</h3>
          </div>
          <p>userGuide/{urlParams.singleUserGuideId}</p>
          {/* ~cb-project-dashboard~ */}
        </div>
        <div className="card w-full">
          <div className="grid ">
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">ServiceName</label>
              <p className="m-0 ml-3">{_entity?.serviceName}</p>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <label className="text-sm text-primary">Expiry</label>
              <p id="expiry" className="m-0 ml-3">
                {_entity?.expiry}
              </p>
            </div>

            <div className="col-12">&nbsp;</div>
          </div>
        </div>
      </div>
      <StepsPage parentEntity={_entity} />
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

export default connect(mapState, mapDispatch)(SingleUserGuidePage);
