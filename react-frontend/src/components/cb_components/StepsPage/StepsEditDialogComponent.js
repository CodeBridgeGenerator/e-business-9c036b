import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import moment from "moment";
import { Editor } from "primereact/editor";

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

const StepsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [userGuideID, setUserGuideID] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount userGuide
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

  const onSave = async () => {
    let _data = {
      Steps: _entity?.Steps,
      Description: _entity?.Description,
    };

    setLoading(true);
    try {
      await client.service("steps").patch(_entity._id, _data);
      const eagerResult = await client.service("steps").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
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
        title: "Edit info",
        message: "Info steps updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
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

  const userGuideIDOptions = userGuideID.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Steps"
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
        role="steps-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="userGuideID">UserGuideID:</label>
            <p className="text3-xl">{_entity?.userGuideID?.name}</p>
          </span>
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
        </div>
        <div className="col-12 md:col-6 field mt-5">
          <span className="align-items-center">
            <label htmlFor="Description">Description:</label>
            <Editor
              value={_entity?.Description}
              onTextChange={(e) => setValByKey("Description", e.htmlValue)}
              style={{ height: "320px" }}
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

export default connect(mapState, mapDispatch)(StepsCreateDialogComponent);
