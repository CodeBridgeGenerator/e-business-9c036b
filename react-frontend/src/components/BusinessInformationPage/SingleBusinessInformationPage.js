import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleBusinessInformationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("businessInformation")
            .get(urlParams.singleBusinessInformationId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "BusinessInformation", type: "error", message: error.message || "Failed get businessInformation" });
            });
    }, [props,urlParams.singleBusinessInformationId]);


    const goBack = () => {
        navigate("/businessInformation");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Business Information</h3>
                </div>
                <p>businessInformation/{urlParams.singleBusinessInformationId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Organization Name</label><p className="m-0 ml-3" >{_entity?.organizationName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Number of Employees</label><p className="m-0 ml-3" >{Number(_entity?.numberOfEmployees)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Full Time Trainers</label><p className="m-0 ml-3" >{Number(_entity?.fullTimeTrainers)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Part Time Trainers</label><p className="m-0 ml-3" >{Number(_entity?.partTimeTrainers)}</p></div>
            

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

export default connect(mapState, mapDispatch)(SingleBusinessInformationPage);
