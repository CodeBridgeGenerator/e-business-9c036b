import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const StepsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [userGuideID, setUserGuideID] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [userGuideID],
        setError,
      );
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.Steps)) {
      error["Steps"] = `Steps field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.Description)) {
      error["Description"] = `Description field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      userGuideID: props.parentEntity._id,
      Steps: _entity?.Steps,
      Description: _entity?.Description,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };
    console.log(_data);

    setLoading(true);

    try {
      const result = await client.service("steps").create(_data);
      const eagerResult = await client.service("steps").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "userGuideID",
              service: "userGuide",
              select: ["serviceName"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Steps updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Steps",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount userGuide
    client
      .service("userGuide")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleUserGuideId,
        },
      })
      .then((res) => {
        setUserGuideID(
          res.data.map((e) => {
            return { name: e["serviceName"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "UserGuide",
          type: "error",
          message: error.message || "Failed get userGuide",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const userGuideIDOptions = userGuideID.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Steps"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="steps-create-dialog-component"
      >
        <div className="col-12 field mt-5">
          <span className="align-items-center">
            <label htmlFor="userGuideID">User Guide ID:</label>
            {/* <Dropdown
              id="userGuideID"
              value={_entity?.userGuideID?._id}
              optionLabel="name"
              optionValue="value"
              options={userGuideIDOptions}
              onChange={(e) => setValByKey("userGuideID", { _id: e.value })}
            /> */}
            <p className="text-2xl">{props?.parentEntity?.serviceName}</p>
          </span>
          <small className="p-error">
            {!_.isEmpty(error["userGuideID"]) ? (
              <p className="m-0" key="error-userGuideID">
                {error["userGuideID"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="Steps">Steps:</label>
            {/* <InputText
              id="Steps"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.Steps}
              onChange={(e) => setValByKey("Steps", e.target.value)}
              required
            /> */}
            <Editor
              value={_entity?.Steps}
              onTextChange={(e) => setValByKey("Steps", e.htmlValue)}
              style={{ height: "320px" }}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["Steps"]) ? (
              <p className="m-0" key="error-Steps">
                {error["Steps"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="Description">Description:</label>
            {/* <InputText
              id="Description"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.Description}
              onChange={(e) => setValByKey("Description", e.target.value)}
              required
            /> */}
            <Editor
              value={_entity?.Description}
              onTextChange={(e) => setValByKey("Description", e.htmlValue)}
              style={{ height: "320px" }}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["Description"]) ? (
              <p className="m-0" key="error-Description">
                {error["Description"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StepsCreateDialogComponent);
