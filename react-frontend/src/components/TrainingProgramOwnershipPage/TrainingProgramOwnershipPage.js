import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import entityCreate from "../../utils/entity";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import config from "../../resources/config.json";
import standard from "../../resources/standard.json";

import AreYouSureDialog from "../common/AreYouSureDialog";
import TrainingProgramOwnershipDatatable from "./TrainingProgramOwnershipDataTable";
import TrainingProgramOwnershipEditDialogComponent from "./TrainingProgramOwnershipEditDialogComponent";
import TrainingProgramOwnershipCreateDialogComponent from "./TrainingProgramOwnershipCreateDialogComponent";
import TrainingProgramOwnershipFakerDialogComponent from "./TrainingProgramOwnershipFakerDialogComponent";
import TrainingProgramOwnershipSeederDialogComponent from "./TrainingProgramOwnershipSeederDialogComponent";

const TrainingProgramOwnershipPage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const filename = "trainingProgramOwnership.csv";

    useEffect(() => {
        const _getSchema = async () => {
            const _schema = await props.getSchema("trainingProgramOwnership");
            const _fields = _schema.data.map((field, i) => i > 5 && field.field);
            setSelectedHideFields(_fields);
          };
        _getSchema();
        if (location?.state?.action === "create") {
            entityCreate(location, setRecord);
            setShowCreateDialog(true);
          } else if (location?.state?.action === "edit") {
            setShowCreateDialog(true);
          }
      },[]);

    useEffect(() => {
        //on mount
        setLoading(true);
        client
            .service("trainingProgramOwnership")
            .find({ query: { $limit: 10000  , $populate : [
                {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },            {
                path: "updatedBy",
                service: "users",
                select: ["name"],
              }
            ] }})
            .then((res) => {
                let results = res.data;
                 
                setData(results);
                setLoading(false);
            })
            .catch((error) => {
                console.log({ error });
                setLoading(false);
                props.alert({ title: "Training Program Ownership", type: "error", message: error.message || "Failed get Training Program Ownership" });
            });
    }, [showFakerDialog,showDeleteAllDialog]);

  const onClickSaveFilteredfields = (ff) => {
    console.log(ff);
  }

   
  const onClickSaveHiddenfields = (ff) => {
    console.log(ff);
  }


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
        _.set(_newData, { _id : selectedEntityIndex},  newEntity);
        setData(_newData);
    };

    const deleteRow = async () => {
        try {
            await client.service("trainingProgramOwnership").remove(selectedEntityIndex);
            let _newData = data.filter((data) => data._id !== selectedEntityIndex);
            setData(_newData);
            setSelectedEntityIndex();
            setShowAreYouSureDialog(false)
        } catch (error) {
            console.log({ error });
            props.alert({ title: "Training Program Ownership", type: "error", message: error.message || "Failed delete record" });
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
        setShowDeleteAllDialog(false);
        const countDataItems = data?.length;
        const promises = data.map((e) => client.service("trainingProgramOwnership").remove(e._id));
        await Promise.all(
          promises.map((p) =>
            p.catch((error) => {
              props.alert({
                title: "Training Program Ownership",
                type: "error",
                message: error.message || "Failed to delete all records",
              });
              console.log({ error });
            })
          )
        );
        await props.alert({
          title: "Training Program Ownership",
          type: "warn",
          message: `Successfully dropped ${countDataItems} records`,
        });
      };

    const onRowClick = ({data}) => {
        
        navigate(`/trainingProgramOwnership/${data._id}`);
    };

    const menuItems = [
        {
            label: "Testing",
            icon: "pi pi-check-circle",
            items :[
                {
                    label: "Faker",
                    icon: "pi pi-bullseye",
                    command: (e) => {
                        setShowFakerDialog(true);
                    },
                    show : true
                },
                {
                    label: `Drop ${data?.length}`,
                    icon: "pi pi-trash",
                    command: (e) => {
                        setShowDeleteAllDialog(true);
                    },
                },
            ]

        },
        {
        label: "Datum",
        icon: "pi pi-database",
        items :[
        {
            label: "Seeder",
            icon: "pi pi-box",
            command: (e) => {
                setShowSeederDialog(true);
            },
            show : true
        }
    ]
},
    {
        label: "Columns",
        icon: "pi pi-objects-column",
        items :[
         {
             label: `Hide`,
            icon: "pi pi-exclamation-triangle",
            command: () => setShowColumns(true)
         },
         {
             label: `Show All`,
            icon: "pi pi-exclamation-triangle",
            command: () => setSelectedHideFields([])
         },
         {
             label: `Filter`,
             icon: "pi pi-filter",
             command: () => setShowFilter(true)
         },
         {
             label: `Clear`,
             icon: "pi pi-filter-slash",
             command: () => setSelectedFilterFields([])
         }
        ]
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
                    <h3 className="mb-0 ml-2">Training Program Ownership </h3>
                </div>
                <div className="col-6 flex justify-content-end">
                    <>
                    <Button label="add" loading={loading} icon="pi pi-plus" onClick={() => setShowCreateDialog(true)} role="trainingProgramOwnership-add-button"/>
                    <SplitButton model={menuItems.filter((m) => !(m.icon==="pi pi-trash" && data?.length===0))} dropdownIcon="pi pi-ellipsis-v" buttonClassName="hidden" menuButtonClassName="ml-1 p-button-text"></SplitButton>
                    </>
                </div>
            </div>
            <div className="grid align-items-center">
                <div className="col-12" role="trainingProgramOwnership-datatable">
                    <TrainingProgramOwnershipDatatable items={data} fields={fields} onRowDelete={onRowDelete} onEditRow={onEditRow} onRowClick={onRowClick} searchDialog={searchDialog} setSearchDialog={setSearchDialog}
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
            <AreYouSureDialog header="Delete" body="Are you sure you want to delete this record?" show={showAreYouSureDialog} onHide={() => setShowAreYouSureDialog(false)} onYes={() => deleteRow()} />
            <TrainingProgramOwnershipEditDialogComponent entity={_.find(data,{ _id : selectedEntityIndex})} show={showEditDialog} onHide={() => setShowEditDialog(false)} onEditResult={onEditResult} />
            <TrainingProgramOwnershipCreateDialogComponent entity={newRecord} show={showCreateDialog} onHide={() => setShowCreateDialog(false)} onCreateResult={onCreateResult} />
            <TrainingProgramOwnershipFakerDialogComponent show={showFakerDialog} onHide={() => setShowFakerDialog(false)} onFakerCreateResults={onFakerCreateResults} />
            <TrainingProgramOwnershipSeederDialogComponent show={showSeederDialog} onHide={() => setShowSeederDialog(false)} onSeederResults={onSeederResults} />
            <AreYouSureDialog header={`Drop ${data?.length} records`} body={`Are you sure you want to drop ${data?.length} records?`} show={showDeleteAllDialog} onHide={() => setShowDeleteAllDialog(false)} onYes={() => deleteAll()} />
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
    
});

export default connect(mapState, mapDispatch)(TrainingProgramOwnershipPage);
