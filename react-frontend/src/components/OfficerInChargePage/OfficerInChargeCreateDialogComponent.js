import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

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

const OfficerInChargeCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      officerName: _entity?.officerName,
      designation: _entity?.designation,
      telephoneNumber: _entity?.telephoneNumber,
      icPassportNumber: _entity?.icPassportNumber,
      email: _entity?.email,
      organizationName: _entity?.organizationName,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("officerInCharge").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Officer In Charge created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Officer In Charge",
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
      header="Create Officer In Charge"
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
        role="officerInCharge-create-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="officerName">Officer Name:</label>
            <InputText
              id="officerName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.officerName}
              onChange={(e) => setValByKey("officerName", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["officerName"]) ? (
              <p className="m-0" key="error-officerName">
                {error["officerName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="designation">Designation:</label>
            <InputText
              id="designation"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.designation}
              onChange={(e) => setValByKey("designation", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["designation"]) ? (
              <p className="m-0" key="error-designation">
                {error["designation"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="telephoneNumber">Telephone Number:</label>
            <InputText
              id="telephoneNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.telephoneNumber}
              onChange={(e) => setValByKey("telephoneNumber", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["telephoneNumber"]) ? (
              <p className="m-0" key="error-telephoneNumber">
                {error["telephoneNumber"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="icPassportNumber">IC/Passport Number:</label>
            <InputText
              id="icPassportNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.icPassportNumber}
              onChange={(e) => setValByKey("icPassportNumber", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["icPassportNumber"]) ? (
              <p className="m-0" key="error-icPassportNumber">
                {error["icPassportNumber"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.email}
              onChange={(e) => setValByKey("email", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["email"]) ? (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="organizationName">Organization Name:</label>
            <InputText
              id="organizationName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.organizationName}
              onChange={(e) => setValByKey("organizationName", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["organizationName"]) ? (
              <p className="m-0" key="error-organizationName">
                {error["organizationName"]}
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
)(OfficerInChargeCreateDialogComponent);
