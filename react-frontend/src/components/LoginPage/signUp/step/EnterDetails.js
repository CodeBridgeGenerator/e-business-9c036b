import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const EnterDetailsStep = (props) => {
  const {
    email,
    setEmail,
    emailError,
    setEmailError,
    isVerified,
    name,
    setName,
    nameError,
    setNameError,
    onNext,
    loading,
  } = props;

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="px-3 text-center">
        <h3 className="font-semibold">Set up your account</h3>
        <p>Please enter your name and registered email to proceed.</p>
      </div>
      <div className="mt-5">
        <div className="w-full">
          <p className="m-0">Name</p>
          <InputText
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
            }}
            disabled={isVerified}
            className={classNames(nameError ? "p-invalid" : "", "w-full")}
            onKeyDown={onEnter}
          ></InputText>
          <small className="p-error">{nameError}</small>
        </div>
        <div className="w-full mt-5">
          <p className="m-0">Email</p>
          <InputText
            className={classNames(emailError ? "p-invalid" : "", "w-full")}
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            onKeyDown={onEnter}
          />
          <small className="p-error">{emailError}</small>
        </div>
      </div>
      <div className="flex mt-7 justify-content-center">
        <Button
          label="Next"
          className="w-full py-3 p-button-raised p-button-rounded"
          onClick={onNext}
          disabled={!email || !name}
          loading={loading}
        ></Button>
      </div>
    </div>
  );
};

export default EnterDetailsStep;
