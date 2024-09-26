import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import moment from "moment";
import { InputText } from "primereact/inputtext";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const TrainerDetailsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  const onSave = async () => {
    let _data = {
      trainerIcPassportNumber: _entity?.trainerIcPassportNumber,
      organizationName: _entity?.organizationName,
      employmentType: _entity?.employmentType,
      nationality: _entity?.nationality,
    };

    setLoading(true);
    try {
      const result = await client
        .service("trainerDetails")
        .patch(_entity._id, _data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info trainerDetails updated successfully",
      });
      props.onEditResult(result);
    } catch (error) {
      console.log("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
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
      header="Edit Trainer Details"
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
        role="trainerDetails-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="trainerIcPassportNumber">
              Trainer IC/Passport Number:
            </label>
            <InputText
              id="trainerIcPassportNumber"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.trainerIcPassportNumber}
              onChange={(e) =>
                setValByKey("trainerIcPassportNumber", e.target.value)
              }
            />
          </span>
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
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="employmentType">Employment Type:</label>
            <InputText
              id="employmentType"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.employmentType}
              onChange={(e) => setValByKey("employmentType", e.target.value)}
            />
          </span>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="nationality">Nationality:</label>
            <InputText
              id="nationality"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.nationality}
              onChange={(e) => setValByKey("nationality", e.target.value)}
            />
          </span>
        </div>
        <div className="col-12">&nbsp;</div>
        <div className="col-12 md:col-6 field mt-5">
          <p className="m-0">
            <Tag value="created At:"></Tag>
            {" " + moment(_entity?.createdAt).fromNow()}
          </p>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <p className="m-0">
            <Tag value="created By:"></Tag>
            {" " + _entity?.createdBy?.name}
          </p>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <p className="m-0">
            <Tag value="last Updated At:"></Tag>
            {" " + moment(_entity?.updatedAt).fromNow()}
          </p>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <p className="m-0">
            <Tag value="last Updated By:"></Tag>
            {" " + _entity?.updatedBy?.name}
          </p>
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
)(TrainerDetailsCreateDialogComponent);
