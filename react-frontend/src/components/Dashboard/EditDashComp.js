import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import Close from "../../assets/media/Close.png";
import Plus from "../../assets/media/Plus.png";
import Archive from "../../assets/media/Archive.png";

const EditDashComp = (props) => {
  const { isEdit, setIsEdit } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleToggle = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonStyle = {
    width: "130px",
    maxWidth: "130px",
    height: "40px",
    border: "1px solid #D30000",
    borderRadius: "100px",
    marginRight: "0.5rem",
    padding: "16px",
    fontSize: "13px",
    textAlign: "center",
  };

  const imageStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #D30000",
    padding: "8px",
    filter: "invert(1) sepia(1) saturate(5) hue-rotate(-55deg)",
  };

  return (
    <div>
      {!isEdit ? (
        <Button
          label="Manage Cards"
          className="p-button-outlined p-button-danger"
          style={buttonStyle}
          onClick={handleToggle}
        />
      ) : (
        <div className="flex mt-3 gap-2">
          {!isMobile ? (
            <>
              <Button
                label="Cancel"
                className="p-button-outlined p-button-primary"
                style={buttonStyle}
                onClick={() => setIsEdit(false)}
              />
              <Button
                label="Save"
                className="p-button-outlined p-button-primary"
                style={buttonStyle}
                onClick={() => setIsEdit(false)}
              />
              <Button
                label="Add Cards"
                className="p-button-outlined p-button-primary"
                style={buttonStyle}
                onClick={() => setIsEdit(false)}
              />
            </>
          ) : (
            <>
              <Button
                icon={<img src={Close} alt="Cancel" style={imageStyle} />}
                style={imageStyle}
                className="p-button-outlined p-button-primary"
                onClick={() => setIsEdit(false)}
              />
              <Button
                icon={<img src={Archive} alt="Archive" style={imageStyle} />}
                style={imageStyle}
                className="p-button-outlined p-button-primary"
                onClick={() => setIsEdit(false)}
              />
              <Button
                icon={<img src={Plus} alt="Add" style={imageStyle} />}
                style={imageStyle}
                className="p-button-outlined p-button-primary"
                onClick={() => setIsEdit(false)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditDashComp;
