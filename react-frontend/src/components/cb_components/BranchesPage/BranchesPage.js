import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import entityCreate from "../../../utils/entity";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";

import AreYouSureDialog from "../../common/AreYouSureDialog";
import BranchesDatatable from "./BranchesDataTable";
import BranchesEditDialogComponent from "./BranchesEditDialogComponent";
import BranchesCreateDialogComponent from "./BranchesCreateDialogComponent";
import BranchesFakerDialogComponent from "./BranchesFakerDialogComponent";
import BranchesSeederDialogComponent from "./BranchesSeederDialogComponent";

const BranchesPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [showAreYouSureDialog, setShowAreYouSureDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newRecord, setRecord] = useState({});
  const [showFakerDialog, setShowFakerDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [showSeederDialog, setShowSeederDialog] = useState(false);
  const [selectedEntityIndex, setSelectedEntityIndex] = useState();
  const [showUpload, setShowUpload] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilterFields, setSelectedFilterFields] = useState([]);
  const [selectedHideFields, setSelectedHideFields] = useState([]);
  const [showColumns, setShowColumns] = useState(false);
  const [searchDialog, setSearchDialog] = useState(false);
  const urlParams = useParams();
  const filename = "branches.csv";
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    const _getSchema = async () => {
      const _schema = await props.getSchema("branches");
      let _fields = _schema.data.map((field, i) => i > 5 && field.field);
      setSelectedHideFields(_fields);
      fetchPreferences();
      _fields = _schema.data.map((field, i) => {
        return {
          name: field.field,
          value: field.field,
          type: field?.properties?.type,
        };
      });
      setFields(_fields);
    };
    _getSchema();
    if (location?.state?.action === "create") {
      entityCreate(location, setRecord);
      setShowCreateDialog(true);
    } else if (location?.state?.action === "edit") {
      setShowCreateDialog(true);
    }
    location.state = null;
  }, []);

  useEffect(() => {
    //on mount
    client
      .service("branches")
      .find({
        query: {
          $limit: 10000,
          companyId: urlParams.singleCompaniesId,
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
            {
              path: "companyId",
              service: "companies",
              select: ["name"],
            },
          ],
        },
      })
      .then((res) => {
        let results = res.data;

        setData(results);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Branches",
          type: "error",
          message: error.message || "Failed get Branches",
        });
      });
  }, [showFakerDialog, showDeleteAllDialog]);

  const fetchPreferences = async () => {
    try {
      const savedCache = await props.getCache();
      console.log("savedCache in branches ", savedCache);
      const data = savedCache.results;
      const userRole = _.find(data.roles, { role: "Staff", position: "Admin" });

      if (userRole && userRole.preferences) {
        const branchesSettings = _.get(
          userRole,
          "preferences.settings.branches",
        );

        if (branchesSettings) {
          // Set the preferences using existing branches settings
          setPreferences(userRole.preferences);
          setSelectedHideFields(branchesSettings.hiddenFields || []);
          setSelectedFilterFields(branchesSettings.filterFields || []);
        } else {
          // If branches settings do not exist, initialize them
          console.warn("Branches settings not found, initializing...");
          const defaultSettings = {
            settings: {
              branches: {
                pagination: 10,
                hiddenFields: [],
                filterFields: [],
              },
            },
          };

          _.set(
            userRole,
            "preferences",
            _.merge({}, userRole.preferences, defaultSettings),
          );
          props.setCache(data);

          setPreferences(userRole.preferences);
          setSelectedHideFields([]);
          setSelectedFilterFields([]);
        }
      } else {
        console.error("Preferences not found", data);
      }
    } catch (error) {
      console.error("Error fetching preferences:", error.message);
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const response = await props.getCache();
      const data = _.get(response, "results");
      const adminRole = _.find(data.roles, {
        role: "Staff",
        position: "Admin",
      });

      const currentPreferences = _.get(adminRole, "preferences", {});
      const settings = _.get(currentPreferences, "settings", {});

      const updatedBranches = {
        ..._.get(settings, "branches", {}),
        hiddenFields: _.get(
          newPreferences,
          "hiddenFields",
          _.get(settings, "branches.hiddenFields", []),
        ),
        filterFields: _.get(
          newPreferences,
          "filterFields",
          _.get(settings, "branches.filterFields", []),
        ),
      };

      const updatedSettings = _.set(settings, "branches", updatedBranches);
      const updatedPreferences = _.set(
        currentPreferences,
        "settings",
        updatedSettings,
      );

      const updatedRoles = _.map(data.roles, (role) => {
        if (role.role === "Staff" && role.position === "Admin") {
          return _.set(role, "preferences", updatedPreferences);
        }
        return role;
      });

      await props.setCache({ roles: updatedRoles });

      setPreferences(updatedPreferences);
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  const onClickSaveFilteredfields = (ff) => {
    updatePreferences({ filterFields: ff });
    setSelectedFilterFields(ff);
    console.log(ff);
  };

  const onClickSaveHiddenfields = (hf) => {
    updatePreferences({ hiddenFields: hf });
    setSelectedHideFields(hf);
    console.log(hf);
  };

  const onEditRow = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowData._id);
    setShowEditDialog(true);
  };

  const onCreateResult = (newEntity) => {
    setData([...data, newEntity]);
  };
  const onFakerCreateResults = (newEntities) => {
    setSelectedEntityIndex();
    setData([...data, ...newEntities]);
  };
  const onSeederResults = (newEntities) => {
    setSelectedEntityIndex();
    setData([...data, ...newEntities]);
  };

  const onEditResult = (newEntity) => {
    let _newData = _.cloneDeep(data);
    _.set(_newData, { _id: selectedEntityIndex }, newEntity);
    setData(_newData);
  };

  const deleteRow = async () => {
    try {
      await client.service("branches").remove(selectedEntityIndex);
      let _newData = data.filter((data) => data._id !== selectedEntityIndex);
      setData(_newData);
      setSelectedEntityIndex();
      setShowAreYouSureDialog(false);
    } catch (error) {
      console.log({ error });
      props.alert({
        title: "Branches",
        type: "error",
        message: error.message || "Failed delete record",
      });
    }
  };
  const onRowDelete = (index) => {
    setSelectedEntityIndex(index);
    setShowAreYouSureDialog(true);
  };

  const onShowDeleteAll = (rowData, rowIndex) => {
    setShowDeleteAllDialog(true);
  };

  const deleteAll = async () => {
    if (process.env.REACT_APP_ENV !== "development") {
      props.alert({
        title: "Delete is disabled for non-dev envs",
        type: "error",
        message: "Delete is not recommended.",
      });
      return;
    }

    setShowDeleteAllDialog(false);
    const countDataItems = data?.length;
    const promises = data.map((e) => client.service("branches").remove(e._id));
    await Promise.all(
      promises.map((p) =>
        p.catch((error) => {
          props.alert({
            title: "Branches",
            type: "error",
            message: error.message || "Failed to delete all records",
          });
          console.log({ error });
        }),
      ),
    );
    await props.alert({
      title: "Branches",
      type: "warn",
      message: `Successfully dropped ${countDataItems} records`,
    });
  };

  const onRowClick = ({ data }) => {
    navigate(`/branches/${data._id}`);
  };

  const menuItems = [
    {
      label: "Testing",
      icon: "pi pi-check-circle",
      items: [
        {
          label: "Faker",
          icon: "pi pi-bullseye",
          command: (e) => {
            setShowFakerDialog(true);
          },
          show: true,
        },
        {
          label: `Drop ${data?.length}`,
          icon: "pi pi-trash",
          command: (e) => {
            setShowDeleteAllDialog(true);
          },
        },
      ],
    },
    {
      label: "Datum",
      icon: "pi pi-database",
      items: [
        {
          label: "Seeder",
          icon: "pi pi-box",
          command: (e) => {
            setShowSeederDialog(true);
          },
          show: true,
        },
      ],
    },
    {
      label: "Columns",
      icon: "pi pi-objects-column",
      items: [
        {
          label: `Hide`,
          icon: "pi pi-exclamation-triangle",
          command: () => setShowColumns(true),
        },
        {
          label: `Show All`,
          icon: "pi pi-exclamation-triangle",
          command: () => setSelectedHideFields([]),
        },
        {
          label: `Filter`,
          icon: "pi pi-filter",
          command: () => setShowFilter(true),
        },
        {
          label: `Clear`,
          icon: "pi pi-filter-slash",
          command: () => setSelectedFilterFields([]),
        },
      ],
    },
    // {
    //     label: `Search`,
    //     icon: "pi pi-search",
    //     command : () => setSearchDialog(true)
    // },
    // {
    //     label: `Check`,
    //     icon: "pi pi-list-check",
    // },
  ];

  return (
    <div className="mt-5">
      <div className="grid">
        <div className="col-6 flex justify-content-start">
          <h3 className="mb-0 ml-2">Branches </h3>
        </div>
        <div className="col-6 flex justify-content-end">
          <>
            <Button
              label="add"
              icon="pi pi-plus"
              onClick={() => setShowCreateDialog(true)}
              role="branches-add-button"
            />
            <SplitButton
              model={menuItems.filter(
                (m) => !(m.icon === "pi pi-trash" && data?.length === 0),
              )}
              dropdownIcon="pi pi-ellipsis-v"
              buttonClassName="hidden"
              menuButtonClassName="ml-1 p-button-text"
            ></SplitButton>
          </>
        </div>
      </div>
      <div className="grid align-items-center">
        <div className="col-12" role="branches-datatable">
          <BranchesDatatable
            items={data}
            fields={fields}
            onRowDelete={onRowDelete}
            onEditRow={onEditRow}
            onRowClick={onRowClick}
            searchDialog={searchDialog}
            setSearchDialog={setSearchDialog}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            showColumns={showColumns}
            setShowColumns={setShowColumns}
            onClickSaveFilteredfields={onClickSaveFilteredfields}
            selectedFilterFields={selectedFilterFields}
            setSelectedFilterFields={setSelectedFilterFields}
            selectedHideFields={selectedHideFields}
            setSelectedHideFields={setSelectedHideFields}
            onClickSaveHiddenfields={onClickSaveHiddenfields}
            loading={loading}
            user={props.user}
          />
        </div>
      </div>
      <AreYouSureDialog
        header="Delete"
        body="Are you sure you want to delete this record?"
        show={showAreYouSureDialog}
        onHide={() => setShowAreYouSureDialog(false)}
        onYes={() => deleteRow()}
      />
      <BranchesEditDialogComponent
        entity={_.find(data, { _id: selectedEntityIndex })}
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        onEditResult={onEditResult}
      />
      <BranchesCreateDialogComponent
        entity={newRecord}
        show={showCreateDialog}
        onHide={() => setShowCreateDialog(false)}
        onCreateResult={onCreateResult}
      />
      <BranchesFakerDialogComponent
        show={showFakerDialog}
        onHide={() => setShowFakerDialog(false)}
        onFakerCreateResults={onFakerCreateResults}
      />
      <BranchesSeederDialogComponent
        show={showSeederDialog}
        onHide={() => setShowSeederDialog(false)}
        onSeederResults={onSeederResults}
      />
      <AreYouSureDialog
        header={`Drop ${data?.length} records`}
        body={`Are you sure you want to drop ${data?.length} records?`}
        show={showDeleteAllDialog}
        onHide={() => setShowDeleteAllDialog(false)}
        onYes={() => deleteAll()}
      />
    </div>
  );
};
const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  getSchema: (serviceName) => dispatch.db.getSchema(serviceName),
  setCache: (data) => dispatch.cache.set(data),
  getCache: () => dispatch.cache.get(),
});

export default connect(mapState, mapDispatch)(BranchesPage);
