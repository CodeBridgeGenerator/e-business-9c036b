import { connect } from "react-redux";
import Steps from "../../Steps/Steps";

const SignUpStep = (props) => {
  const { step } = props;
  return (
    <Steps
      step={step}
      steps={[
        {
          key: "enter-details",
          label: "Enter details",
        },
        {
          key: "verification",
          label: "Verification",
        },
        {
          key: "set-up-password",
          label: "Set up password",
        },
      ]}
    />
  );
};

const mapState = (state) => {
  const { isLoggedIn, passwordPolicyErrors } = state.auth;
  return { isLoggedIn, passwordPolicyErrors };
};
const mapDispatch = (dispatch) => ({
  createUser: (data) => dispatch.auth.createUser(data),
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SignUpStep);
