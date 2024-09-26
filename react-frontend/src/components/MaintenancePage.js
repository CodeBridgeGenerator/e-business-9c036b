import { connect } from "react-redux";
import maintenanceImage from "../assets/media/maintenance.png";
import AppFooter from "./Layouts/AppFooter";

const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-image">
      <div className="w-[500px] flex-1 flex flex-col items-center justify-center">
        <div className="px-10 py-3">
          <img src={maintenanceImage} alt="Maintenance" className="w-full" />
        </div>
        <div className="text-center">
          <h1 className="font-semibold">We will be back soon</h1>
          <p className="text-lg">
            Our site is currently undergoing maintenance to improve your
            experience. Please check back later. Thank you for your patience!
          </p>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  getSchema: (serviceName) => dispatch.db.getSchema(serviceName),
});

export default connect(mapState, mapDispatch)(MaintenancePage);
