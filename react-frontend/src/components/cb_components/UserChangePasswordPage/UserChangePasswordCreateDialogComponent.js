import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";

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

const UserChangePasswordCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    let init = { status: false, sendEmailCounter: "0" };
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.userEmail)) {
      error["userEmail"] = `User Email field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.server)) {
      error["server"] = `Server field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.environment)) {
      error["environment"] = `Environment field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.code)) {
      error["code"] = `Code field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      userEmail: _entity?.userEmail,
      server: _entity?.server,
      environment: _entity?.environment,
      code: _entity?.code,
      status: _entity?.status || false,
      sendEmailCounter: _entity?.sendEmailCounter,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("userChangePassword").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info UserChangePassword created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in UserChangePassword",
      });
    }
    setLoading(false);
  };

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

  return (
    <Dialog
      header="Create UserChangePassword"
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
        role="userChangePassword-create-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="userEmail">User Email:</label>
            <InputText
              id="userEmail"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.userEmail}
              onChange={(e) => setValByKey("userEmail", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["userEmail"]) ? (
              <p className="m-0" key="error-userEmail">
                {error["userEmail"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="server">Server:</label>
            <InputText
              id="server"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.server}
              onChange={(e) => setValByKey("server", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["server"]) ? (
              <p className="m-0" key="error-server">
                {error["server"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="environment">Environment:</label>
            <InputText
              id="environment"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.environment}
              onChange={(e) => setValByKey("environment", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["environment"]) ? (
              <p className="m-0" key="error-environment">
                {error["environment"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="code">Code:</label>
            <InputText
              id="code"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.code}
              onChange={(e) => setValByKey("code", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["code"]) ? (
              <p className="m-0" key="error-code">
                {error["code"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex mt-5">
          <span className="align-items-center">
            <label htmlFor="status">Status:</label>
            <Checkbox
              id="status"
              className="ml-3"
              checked={_entity?.status}
              onChange={(e) => setValByKey("status", e.checked)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="sendEmailCounter">SendEmailCounter:</label>
            <InputNumber
              id="sendEmailCounter"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.sendEmailCounter}
              onChange={(e) => setValByKey("sendEmailCounter", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["sendEmailCounter"]) ? (
              <p className="m-0" key="error-sendEmailCounter">
                {error["sendEmailCounter"]}
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

export default connect(
  mapState,
  mapDispatch,
)(UserChangePasswordCreateDialogComponent);
