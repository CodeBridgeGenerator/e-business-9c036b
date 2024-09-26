import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import config from "../../../resources/config.json";
import standard from "../../../resources/standard.json";

const allServices = _.merge(
  _.get(config, "services").map((s) => {
    return {
      name: s.displayName,
      value: s.serviceName,
    };
  }),
  _.get(standard, "services").map((s) => {
    return {
      name: s.displayName,
      value: s.serviceName,
    };
  }),
);

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

const UserGuideCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [serviceNames, setServiceNames] = useState([]);
  const urlParams = useParams();

  useEffect(() => {
    let init = { expiry: new Date() };
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
  }, [props.show]);

  const search = (event) => {
    setTimeout(() => {
      let _filtered = allServices;

      if (event.query.trim().length === 0) {
        _filtered = allServices;
      } else {
        _filtered = allServices.filter((i) => {
          return i.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setServiceNames(_filtered);
    }, 250);
  };

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.serviceName)) {
      error["serviceName"] = `ServiceName field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      serviceName: _entity?.serviceName,
      expiry: _entity?.expiry,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("userGuide").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info UserGuide created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in UserGuide",
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
      header="Create a User Guide"
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
        role="userGuide-create-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="serviceName">Service Name:</label>
            {/* <InputText
              id="serviceName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.serviceName}
              onChange={(e) => setValByKey("serviceName", e.target.value)}
              required
            /> */}

            <AutoComplete
              value={_entity?.serviceName}
              suggestions={serviceNames}
              completeMethod={search}
              field="name"
              onChange={(e) => setValByKey("serviceName", e.value?.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["serviceName"]) ? (
              <p className="m-0" key="error-serviceName">
                {error["serviceName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="expiry">Expiry:</label>
            <Calendar
              id="expiry"
              value={_entity?.expiry ? new Date(_entity?.expiry) : new Date()}
              dateFormat="dd/mm/yy"
              onChange={(e) => setValByKey("expiry", new Date(e.target.value))}
              showIcon
              showButtonBar
              showWeek
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["expiry"]) ? (
              <p className="m-0" key="error-expiry">
                {error["expiry"]}
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

export default connect(mapState, mapDispatch)(UserGuideCreateDialogComponent);
