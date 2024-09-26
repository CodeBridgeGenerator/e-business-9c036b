import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { connect } from "react-redux";

const VerificationStep = (props) => {
  const {
    code,
    sysCode,
    setCode,
    codeError,
    setCodeError,
    onNext,
    resendCode,
    loading,
    setLoading,
  } = props;

  useEffect(() => {
    if (code?.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onNext();
      }, 1000);
    }
  }, [code]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onNext();
      }, 1000);
    }
  };

  const verify = (inputCode) => {
    if (inputCode.value.length < 6) return;
    else if (Number(sysCode) !== Number(inputCode.value)) {
      setCodeError("Code verification failed");
      props.alert({
        title: "Verification failed.",
        type: "error",
        message: "Proceed to contact admin.",
      });
    } else {
      props.alert({
        title: "Verification succeeded.",
        type: "success",
        message: "Proceed to set your password.",
      });
      setCode(inputCode.value);
    }
  };

  const customInput = ({ events, props }) => {
    return (
      <input
        {...props}
        {...events}
        type="number"
        className={classNames(
          "!w-12 h-16 text-4xl text-center placeholder:text-[#CED4DA] bg-white rounded-md border border-[#DEE2E6] border-solid no-spinner",
          codeError ? "border-red-500" : "",
        )}
        placeholder="0"
        onKeyDown={(e) => {
          setCodeError(null);
          onEnter(e);
        }}
      />
    );
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="px-3 text-center">
        <h3 className="font-semibold">Verify your email</h3>
        <p>
          Please enter the 6-digit code sent to your email. Check your Junk/Spam
          folder if doesn't arrive.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 mt-14">
        <InputOtp
          value={code}
          onChange={verify}
          length={6}
          inputTemplate={customInput}
        />
      </div>
      <div className="mt-5 text-center">
        <span
          className="font-semibold cursor-pointer text-primary"
          onClick={resendCode}
        >
          Resend Code
        </span>
      </div>
      {codeError && (
        <div className="w-full mt-10 p-4 bg-[#FDE7E9] border-2 border-red-500 border-solid rounded-md flex items-center gap-2">
          <i className="text-xl text-red-500 pi pi-exclamation-circle"></i>
          <p className="font-semibold text-red-500">{codeError}</p>
        </div>
      )}
      <div className="flex mt-10 justify-content-center">
        <Button
          label="Next"
          className="w-full py-3 p-button-raised p-button-rounded"
          onClick={onNext}
          disabled={!code || code.length !== 6}
          loading={loading}
        ></Button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(VerificationStep);
