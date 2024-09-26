import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import { TabMenu } from "primereact/tabmenu";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import excelLogo from "../assets/media/excelLogo.svg";
import client from "../services/restClient";
import config from "../resources/config";
import * as XLSX from "xlsx";

const UploadService = ({
  serviceName,
  user,
  onUploadComplete,
  disabled,
  getSchema,
}) => {
  const fileUploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [showFieldDataViewer, setShowFieldDataViewer] = useState(false);
  const [requiredFields, setRequiredFields] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [results, setResults] = useState([]);
  const [hasNotResults, setHasNotResults] = useState([]);
  const [hasNotColumns, setHasNotColumns] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    async function fetchServiceFields() {
      try {
        const schema = await getSchema(serviceName);
        const allServiceRequiredfields = schema.data
          .filter((row) => row.properties?.required == true)
          .map((row) => row.field)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        setRequiredFields(allServiceRequiredfields);
      } catch (error) {
        console.error("Failed to fetch service schema:", error);
      }
    }

    fetchServiceFields();
  }, [serviceName]);

  const onTemplateSelect = (e) => {
    try {
      let _totalSize = totalSize;
      let files = e.files;

      Object.keys(files).forEach((key) => {
        _totalSize += files[key].size || 0;
      });

      setTotalSize(_totalSize);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to calculate total size",
      });
    }
  };

  const onTemplateUpload = (e) => {
    try {
      let _totalSize = 0;

      e.files.forEach((file) => {
        _totalSize += file.size || 0;
      });

      setTotalSize(_totalSize);
      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to upload file",
      });
    }
  };

  const onTemplateRemove = (file, callback) => {
    try {
      setTotalSize(totalSize - file.size);
      callback();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to remove file",
      });
    }
  };

  const onTemplateClear = () => {
    try {
      setTotalSize(0);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to clear files",
      });
    }
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formattedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img alt="Excel Icon" src={excelLogo} width={50} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>

        <div className="ml-auto flex align-items-center">
          <Tag
            value={props.formatSize}
            severity="warning"
            className="px-3 py-2 mr-3"
          />
          <Button
            type="button"
            icon="pi pi-times"
            className="p-button-outlined p-button-rounded p-button-danger"
            onClick={() => onTemplateRemove(file, props.onRemove)}
          />
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-file-excel mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Excel File Here
        </span>
      </div>
    );
  };

  const getServiceRequiredFieldLabels = () => {
    const service = _.find(config.services, { serviceName: serviceName });
    const labels = service.schemaList
      .filter((field) => requiredFields.includes(field.fieldName))
      .map((field) => {
        return {
          label: field.label,
          fieldName: field.fieldName,
          type: field.type,
          default: field.default,
        };
      });
    return labels.sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase())
    );
  };

  const CompareServiceFileFields = (fileLabels) => {
    const serviceRequiredLabels = getServiceRequiredFieldLabels();
    const fields = serviceRequiredLabels.map((serviceLabel) => {
      const found = fileLabels.some(
        (fileLabel) =>
          fileLabel.toLowerCase() === serviceLabel.label.toLowerCase()
      );
      const _row = {
        serviceLabel,
        found,
      };
      return _row;
    });
    return fields;
  };

  const CheckRequiredFieldData = (data) => {
    const serviceRequiredLabels = getServiceRequiredFieldLabels();
    const hasNoDataInAllRequiredFields = [];
    const hasDataInAllRequiredFields = data.filter((row) => {
      const hasRequiredFields = serviceRequiredLabels.filter((field) => {
        if (typeof row[field.label] === "undefined") {
          row["remarks"] =
            typeof row["remarks"] !== "undefined"
              ? `${row["remarks"]} ${field.label} is undefined; `
              : ` ${field.label} is undefined; `;
          return false;
        }
        if (
          (typeof row[field.label])?.toLowerCase() !== field.type?.toLowerCase()
        ) {
          row["remarks"] =
            typeof row["remarks"] !== "undefined"
              ? `${row["remarks"]} ${field.label} (${row[field.label]}) is not of type ${field.type}; `
              : ` ${field.label} (${row[field.label]}) is not of type ${field.type}; `;
          return false;
        }
        if (row[field.label] === null) {
          row["remarks"] =
            typeof row["remarks"] !== "undefined"
              ? `${row["remarks"]} ${field.label} is null; `
              : ` ${field.label} is null; `;
          return false;
        }
        if (row[field.label] === "") {
          row["remarks"] =
            typeof row["remarks"] !== "undefined"
              ? `${row["remarks"]} ${field.label} is empty; `
              : ` ${field.label} is empty; `;
          return false;
        }
        return true;
      });

      if (hasRequiredFields.length === serviceRequiredLabels.length)
        console.debug(row);
      else hasNoDataInAllRequiredFields.push(row);
      return hasRequiredFields.length === serviceRequiredLabels.length;
    });
    return {
      has: hasDataInAllRequiredFields,
      hasNot: hasNoDataInAllRequiredFields,
    };
  };

  const customBase64Uploader = async (event) => {
    try {
      const file = event.files[0];
      if (!file) throw new Error("No file selected");

      const reader = new FileReader();
      const blob = await fetch(file.objectURL).then((r) => r.blob());
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const wb = XLSX.read(base64data, { type: "base64" });
        const results = ExcelFileUpload(wb);
        FieldDataViewer(results);
      };
    } catch (error) {}
  };

  const ExcelFileUpload = (wb) => {
    const sheets = {};
    for (let i in wb.SheetNames) {
      const wsname = wb.SheetNames[i];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils
        .sheet_to_json(ws)
        .map((row) => _.mapKeys(row, (value, key) => key.trim()));

      const fileFieldLabels = Object.keys(data[0]).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      sheets[wsname] = {
        fields: CompareServiceFileFields(fileFieldLabels),
        data: CheckRequiredFieldData(data),
      };
    }
    return sheets;
  };

  const FieldDataViewer = (results) => {
    console.debug(results);
    if (_.isEmpty(results)) {
      //   setTimeout(() => {
      //     if (onUploadComplete) {
      //       onUploadComplete();
      //     }
      //   }, 2000); // Adjust the delay time as needed
      // } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "An error occurred during file upload",
      });
      return;
    }
    const sheets = Object.keys(results).map((k) => {
      return { label: k };
    });
    console.log(activeIndex);
    console.log(sheets);
    console.log(sheets[activeIndex]?.label);
    console.log(results[sheets[activeIndex]?.label]?.data);
    console.log(results[sheets[activeIndex]?.label]?.data?.hasNot);
    console.log(results[sheets[activeIndex]?.label]?.data?.hasNot?.length);

    if (results[sheets[activeIndex]?.label]?.data?.hasNot?.length > 0) {
      // console.log(results[items[activeIndex]?.label]?.data?.hasNot);
      const fields = Object.keys(
        results[sheets[activeIndex]?.label]?.data?.hasNot[0]
      );
      console.log(fields);
      const notResults = _.map(
        results[sheets[activeIndex]?.label]?.data?.hasNot,
        "remarks"
      ).map((r, i) => {
        return {
          row: results[sheets[activeIndex]?.label]?.data?.hasNot[i][fields[0]],
          remarks: remarksBodyTemplate(r),
        };
      });
      setItems(sheets);
      setResults(results);
      setHasNotResults(notResults);
      setHasNotColumns(["row", "remarks"]);
    } else {
      setHasNotResults([]);
      setHasNotColumns([]);
    }

    setShowFieldDataViewer(true);
  };



  const remarksBodyTemplate = (remarks) => {
    let listOfRemarks = remarks.split(";");
    return listOfRemarks.map((remarks) => {
      const parts = remarks.trim().split("is");
      return (
        parts[0] !== "" && (
          <>
            <small>
              <b>{parts[0]}</b> is {parts[1]}
            </small>
            <br />
          </>
        )
      );
    });
  };

  const uploader = async () => {
    const service = _.find(config.services, { serviceName: serviceName });
    const serviceLabels = service.schemaList.map((field) => {
      if (typeof field.reference.refServiceName !== "undefined") {
        return {
          field: field.fieldName,
          label: field.reference.identifierFieldName,
        };
      }
      return { field: field.fieldName, label: field.label };
    });
    console.log(serviceLabels);
    let create = Object.keys(results)
      .map((sheet) => {
        console.log(sheet);
        return results[sheet].data.has;
      })
      .map((rows, rowid) => {
        // console.log("row", rows);
        // console.log("value", rowid);
        return rows.map((row) => {
          return _.mapKeys(row, (v, l) => {
            const ret = _.find(serviceLabels, { label: l });
            // console.log(v, l, ret?.field);
            if (ret) return ret?.field;
            else return l;
          });
        });
      });
    console.log(1, create);
    const data = { serviceName, user, results: create };
    await client.service("uploader").create(data);
    // setLoading(true);
    // setTimeout(() => {
    //   onUploadComplete();
    //   setShowFieldDataViewer(false);
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <div>
        <Tooltip
          target=".custom-choose-btn"
          content="Choose"
          position="bottom"
        />
        <Tooltip
          target=".custom-upload-btn"
          content="Upload"
          position="bottom"
        />
        <Tooltip
          target=".custom-cancel-btn"
          content="Clear"
          position="bottom"
        />

        <FileUpload
          ref={fileUploadRef}
          name="demo[]"
          url="/api/upload"
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          maxFileSize={1000000} // 1 MB
          onUpload={onTemplateUpload}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={{
            icon: "pi pi-fw pi-file",
            iconOnly: true,
            className: "custom-choose-btn p-button-rounded p-button-outlined",
          }}
          uploadOptions={{
            icon: "pi pi-fw pi-cloud-upload",
            iconOnly: true,
            className:
              "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
          }}
          cancelOptions={{
            icon: "pi pi-fw pi-times",
            iconOnly: true,
            className:
              "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
          }}
          customUpload
          uploadHandler={customBase64Uploader}
          disabled={disabled ? disabled : false}
        />
      </div>
      <Dialog
        header="Data Loader Manager"
        visible={showFieldDataViewer}
        style={{ width: "85vw" }}
        onHide={() => {
          if (!showFieldDataViewer) return;
          setShowFieldDataViewer(false);
        }}
      >
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
        <Fieldset legend="Complete" toggleable>
          {results[items[activeIndex]?.label]?.data?.has?.length > 0 && (
            <DataTable
              value={results[items[activeIndex]?.label]?.data?.has}
              tableStyle={{ minWidth: "50rem" }}
            >
              {Object.keys(
                results[items[activeIndex]?.label]?.data?.has[0]
              ).map((col, i) => (
                <Column key={col} field={col} header={col} />
              ))}
            </DataTable>
          )}
        </Fieldset>
        {hasNotResults?.length > 0 && (
          <Fieldset legend="Incomplete" toggleable>
            <DataTable value={hasNotResults} tableStyle={{ minWidth: "50rem" }}>
              {hasNotColumns.map((col, i) => (
                <Column key={col} field={col} header={col} />
              ))}
            </DataTable>
          </Fieldset>
        )}
        <Fieldset legend="Summary" toggleable>
          {results[items[activeIndex]?.label]?.data?.has?.length === 1 && (
            <p className="m-0">
              {results[items[activeIndex]?.label]?.data?.has?.length} Completed
              Field is ready for upload
            </p>
          )}
          {results[items[activeIndex]?.label]?.data?.has?.length > 1 && (
            <p className="m-0">
              {results[items[activeIndex]?.label]?.data?.has?.length} Completed
              Fields are ready for upload
            </p>
          )}
          {hasNotResults.length !== 0 && (
            <p className="m-0">
              {hasNotResults.length === 1
                ? "Incompleted Field is not ready for upload"
                : hasNotResults.length > 1
                  ? "Incompleted Fields are not ready for upload"
                  : ""}
            </p>
          )}
        </Fieldset>
        <div className="flex justify-content-end">
          <Button
            label="upload"
            text
            onClick={uploader}
            loading={loading}
          ></Button>
          <Button
            className="p-buttoon-secondary"
            size="small"
            loading={loading}
            onClick={() => setShowFieldDataViewer(false)}
          >
            Close
          </Button>
        </div>
      </Dialog>
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

export default connect(mapState, mapDispatch)(UploadService);
