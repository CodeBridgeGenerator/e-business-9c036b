import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import NoMatch from "./NoMatch";

import LoginPage from "../components/LoginPage/LoginPage";
import SignUpPage from "../components/LoginPage/signUp/SignUpPage";
import ResetPage from "../components/LoginPage/ResetPage";
import Dashboard from "../components/Dashboard/Dashboard";
import ProjectLayout from "../components/Layouts/ProjectLayout";
import MaintenancePage from "../components/MaintenancePage";
import LoginFaqPage from "../components/LoginPage/LoginFaqPage";

import Account from "../components/cb_components/Account/Account";
import SingleUsersPage from "../components/cb_components/UsersPage/SingleUsersPage";
import UserProjectLayoutPage from "../components/cb_components/UsersPage/UserProjectLayoutPage";
import SingleUserInvitesPage from "../components/cb_components/UserInvitesPage/SingleUserInvitesPage";
import UserInvitesProjectLayoutPage from "../components/cb_components/UserInvitesPage/UserInvitesProjectLayoutPage";
import SingleCompaniesPage from "../components/cb_components/CompaniesPage/SingleCompaniesPage";
import CompanyProjectLayoutPage from "../components/cb_components/CompaniesPage/CompanyProjectLayoutPage";
import SingleBranchesPage from "../components/cb_components/BranchesPage/SingleBranchesPage";
import BranchProjectLayoutPage from "../components/cb_components/BranchesPage/BranchProjectLayoutPage";
import SingleDepartmentsPage from "../components/cb_components/DepartmentsPage/SingleDepartmentsPage";
import DepartmentProjectLayoutPage from "../components/cb_components/DepartmentsPage/DepartmentProjectLayoutPage";
import SingleSectionsPage from "../components/cb_components/SectionsPage/SingleSectionsPage";
import SectionProjectLayoutPage from "../components/cb_components/SectionsPage/SectionProjectLayoutPage";
import SingleRolesPage from "../components/cb_components/RolesPage/SingleRolesPage";
import RoleProjectLayoutPage from "../components/cb_components/RolesPage/RoleProjectLayoutPage";
import SinglePositionsPage from "../components/cb_components/PositionsPage/SinglePositionsPage";
import PositionProjectLayoutPage from "../components/cb_components/PositionsPage/PositionProjectLayoutPage";
import SingleTemplatesPage from "../components/cb_components/TemplatesPage/SingleTemplatesPage";
import TemplateProjectLayoutPage from "../components/cb_components/TemplatesPage/TemplateProjectLayoutPage";
import SingleMailsPage from "../components/cb_components/MailsPage/SingleMailsPage";
import MailProjectLayoutPage from "../components/cb_components/MailsPage/MailProjectLayoutPage";
import SingleUserAddressesPage from "../components/cb_components/UserAddressesPage/SingleUserAddressesPage";
import UserAddressProjectLayoutPage from "../components/cb_components/UserAddressesPage/UserAddressProjectLayoutPage";
import SingleCompanyAddressesPage from "../components/cb_components/CompanyAddressesPage/SingleCompanyAddressesPage";
import CompanyAddressProjectLayoutPage from "../components/cb_components/CompanyAddressesPage/CompanyAddressProjectLayoutPage";
import SingleCompanyPhonesPage from "../components/cb_components/CompanyPhonesPage/SingleCompanyPhonesPage";
import CompanyPhoneProjectLayoutPage from "../components/cb_components/CompanyPhonesPage/CompanyPhoneProjectLayoutPage";
import SingleUserPhonesPage from "../components/cb_components/UserPhonesPage/SingleUserPhonesPage";
import UserPhoneProjectLayoutPage from "../components/cb_components/UserPhonesPage/UserPhoneProjectLayoutPage";
import StaffinfoProjectLayoutPage from "../components/cb_components/StaffinfoPage/StaffinfoProjectLayoutPage";
import SingleProfilesPage from "../components/cb_components/ProfilesPage/SingleProfilesPage";
import ProfileProjectLayoutPage from "../components/cb_components/ProfilesPage/ProfileProjectLayoutPage";
import SinglePermissionServicesPage from "../components/cb_components/PermissionServicesPage/SinglePermissionServicesPage";
import PermissionServiceProjectLayoutPage from "../components/cb_components/PermissionServicesPage/PermissionServiceProjectLayoutPage";
import SinglePermissionFieldsPage from "../components/cb_components/PermissionFieldsPage/SinglePermissionFieldsPage";
import PermissionFieldProjectLayoutPage from "../components/cb_components/PermissionFieldsPage/PermissionFieldProjectLayoutPage";
import SingleDynaLoaderPage from "../components/cb_components/DynaLoaderPage/SingleDynaLoaderPage";
import SingleDynaFieldsPage from "../components/cb_components/DynaFieldsPage/SingleDynaFieldsPage";
import DynaLoaderProjectLayoutPage from "../components/cb_components/DynaLoaderPage/DynaLoaderProjectLayoutPage";
import DynaFieldsProjectLayoutPage from "../components/cb_components/DynaFieldsPage/DynaFieldsProjectLayoutPage";
import SingleStaffinfoPage from "../components/cb_components/StaffinfoPage/SingleStaffinfoPage";

import SingleJobQuesPage from "../components/cb_components/JobQuesPage/SingleJobQuesPage";
import JobQueProjectLayoutPage from "../components/cb_components/JobQuesPage/JobQueProjectLayoutPage";
import SingleEmployeesPage from "../components/cb_components/EmployeesPage/SingleEmployeesPage";
import EmployeeProjectLayoutPage from "../components/cb_components/EmployeesPage/EmployeeProjectLayoutPage";
import SingleMailQuesPage from "../components/cb_components/MailQuesPage/SingleMailQuesPage";
import MailQueProjectLayoutPage from "../components/cb_components/MailQuesPage/MailQueProjectLayoutPage";
import SingleSuperiorPage from "../components/cb_components/SuperiorPage/SingleSuperiorPage";
import SuperiorProjectLayoutPage from "../components/cb_components/SuperiorPage/SuperiorProjectLayoutPage";
import ChataiProjectLayoutPage from "../components/cb_components/ChatAiProjectLayout/ChataiProjectLayoutPage";
import ChataiUserLayoutPage from "../components/cb_components/ChataiPage/UserLayoutPage";
import SingleChataiPage from "../components/cb_components/ChataiPage/SingleChataiPage";
import PromptsUserLayoutPage from "../components/cb_components/PromptsPage/UserLayoutPage";
import SinglePromptsPage from "../components/cb_components/PromptsPage/SinglePromptsPage";

import SingleDepartmentAdminPage from "../components/cb_components/DepartmentAdminPage/SingleDepartmentAdminPage";
import DepartmentAdminProjectLayoutPage from "../components/cb_components/DepartmentAdminPage/DepartmentAdminProjectLayoutPage";
import SingleDepartmentHODPage from "../components/cb_components/DepartmentHODPage/SingleDepartmentHODPage";
import DepartmentHODProjectLayoutPage from "../components/cb_components/DepartmentHODPage/DepartmentHODProjectLayoutPage";
import SingleDepartmentHOSPage from "../components/cb_components/DepartmentHOSPage/SingleDepartmentHOSPage";
import DepartmentHOProjectLayoutPage from "../components/cb_components/DepartmentHOSPage/DepartmentHOProjectLayoutPage";
import SingleMailWHPage from "../components/cb_components/MailWHPage/SingleMailWHPage";
import MailWHProjectLayoutPage from "../components/cb_components/MailWHPage/MailWHProjectLayoutPage";
import SingleInboxPage from "../components/cb_components/InboxPage/SingleInboxPage";
import InboxProjectLayoutPage from "../components/cb_components/InboxPage/InboxProjectLayoutPage";
import SingleNotificationsPage from "../components/cb_components/NotificationsPage/SingleNotificationsPage";
import NotificationProjectLayoutPage from "../components/cb_components/NotificationsPage/NotificationProjectLayoutPage";
import SingleErrorsPage from "../components/cb_components/ErrorsPage/SingleErrorsPage";
import ErrorProjectLayoutPage from "../components/cb_components/ErrorsPage/ErrorProjectLayoutPage";
import SingleErrorsWHPage from "../components/cb_components/ErrorsWHPage/SingleErrorsWHPage";
import ErrorsWHProjectLayoutPage from "../components/cb_components/ErrorsWHPage/ErrorsWHProjectLayoutPage";
import SingleUserLoginPage from "../components/cb_components/UserLoginPage/SingleUserLoginPage";
import UserLoginProjectLayoutPage from "../components/cb_components/UserLoginPage/UserLoginProjectLayoutPage";
import SingleUserChangePasswordPage from "../components/cb_components/UserChangePasswordPage/SingleUserChangePasswordPage";
import UserChangePasswordProjectLayoutPage from "../components/cb_components/UserChangePasswordPage/UserChangePasswordProjectLayoutPage";

import SingleBusinessInformationPage from "../components/BusinessInformationPage/SingleBusinessInformationPage";
import BusinessInformationProjectLayoutPage from "../components/BusinessInformationPage/BusinessInformationProjectLayoutPage";
import SingleOfficerInChargePage from "../components/OfficerInChargePage/SingleOfficerInChargePage";
import OfficerInChargeProjectLayoutPage from "../components/OfficerInChargePage/OfficerInChargeProjectLayoutPage";
import SingleTrainingProviderSInformationPage from "../components/TrainingProviderSInformationPage/SingleTrainingProviderSInformationPage";
import TrainingProviderSInformationProjectLayoutPage from "../components/TrainingProviderSInformationPage/TrainingProviderSInformationProjectLayoutPage";
import SingleTrainingProgramOwnershipPage from "../components/TrainingProgramOwnershipPage/SingleTrainingProgramOwnershipPage";
import TrainingProgramOwnershipProjectLayoutPage from "../components/TrainingProgramOwnershipPage/TrainingProgramOwnershipProjectLayoutPage";
import SingleTrainerDetailsPage from "../components/TrainerDetailsPage/SingleTrainerDetailsPage";
import TrainerDetailProjectLayoutPage from "../components/TrainerDetailsPage/TrainerDetailProjectLayoutPage";
// ~cb-add-import~

const MyRouter = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={props.isLoggedIn ? <ProjectLayout /> : <LoginPage />}
      />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/login" exact element={<LoginPage />} />
      <Route
        path="/reset/:singleChangeForgotPasswordId"
        exact
        element={<ResetPage />}
      />
      <Route path="/signup" exact element={<SignUpPage />} />
      <Route path="/maintenance" exact element={<MaintenancePage />} />
      <Route path="/login-faq" exact element={<LoginFaqPage />} />

      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        <Route path="/project" exact element={<ProjectLayout />} />
        <Route path="/account" exact element={<Account />} />
        <Route
          path="/users/:singleUsersId"
          exact
          element={<SingleUsersPage />}
        />
        <Route path="/users" exact element={<UserProjectLayoutPage />} />
        <Route
          path="/userInvites/:singleUserInvitesId"
          exact
          element={<SingleUserInvitesPage />}
        />
        <Route
          path="/userInvites"
          exact
          element={<UserInvitesProjectLayoutPage />}
        />

        <Route
          path="/companies/:singleCompaniesId"
          exact
          element={<SingleCompaniesPage />}
        />
        <Route
          path="/branches/:singleBranchesId"
          exact
          element={<SingleBranchesPage />}
        />
        <Route
          path="/departments/:singleDepartmentsId"
          exact
          element={<SingleDepartmentsPage />}
        />
        <Route
          path="/sections/:singleSectionsId"
          exact
          element={<SingleSectionsPage />}
        />
        <Route
          path="/roles/:singleRolesId"
          exact
          element={<SingleRolesPage />}
        />
        <Route
          path="/positions/:singlePositionsId"
          exact
          element={<SinglePositionsPage />}
        />
        <Route
          path="/profiles/:singleProfilesId"
          exact
          element={<SingleProfilesPage />}
        />
        <Route
          path="/templates/:singleTemplatesId"
          exact
          element={<SingleTemplatesPage />}
        />
        <Route
          path="/mails/:singleMailsId"
          exact
          element={<SingleMailsPage />}
        />
        <Route
          path="/permissionServices/:singlePermissionServicesId"
          exact
          element={<SinglePermissionServicesPage />}
        />
        <Route
          path="/permissionFields/:singlePermissionFieldsId"
          exact
          element={<SinglePermissionFieldsPage />}
        />
        <Route
          path="/userAddresses/:singleUserAddressesId"
          exact
          element={<SingleUserAddressesPage />}
        />
        <Route
          path="/companyAddresses/:singleCompanyAddressesId"
          exact
          element={<SingleCompanyAddressesPage />}
        />
        <Route
          path="/companyPhones/:singleCompanyPhonesId"
          exact
          element={<SingleCompanyPhonesPage />}
        />
        <Route
          path="/userPhones/:singleUserPhonesId"
          exact
          element={<SingleUserPhonesPage />}
        />

        <Route path="/companies" exact element={<CompanyProjectLayoutPage />} />
        <Route path="/branches" exact element={<BranchProjectLayoutPage />} />
        <Route
          path="/departments"
          exact
          element={<DepartmentProjectLayoutPage />}
        />
        <Route path="/sections" exact element={<SectionProjectLayoutPage />} />
        <Route path="/roles" exact element={<RoleProjectLayoutPage />} />
        <Route
          path="/positions"
          exact
          element={<PositionProjectLayoutPage />}
        />
        <Route path="/profiles" exact element={<ProfileProjectLayoutPage />} />
        <Route
          path="/templates"
          exact
          element={<TemplateProjectLayoutPage />}
        />
        <Route path="/mails" exact element={<MailProjectLayoutPage />} />
        <Route
          path="/permissionServices"
          exact
          element={<PermissionServiceProjectLayoutPage />}
        />
        <Route
          path="/permissionFields"
          exact
          element={<PermissionFieldProjectLayoutPage />}
        />
        <Route
          path="/userAddresses"
          exact
          element={<UserAddressProjectLayoutPage />}
        />
        <Route
          path="/companyAddresses"
          exact
          element={<CompanyAddressProjectLayoutPage />}
        />
        <Route
          path="/companyPhones"
          exact
          element={<CompanyPhoneProjectLayoutPage />}
        />
        <Route
          path="/userPhones"
          exact
          element={<UserPhoneProjectLayoutPage />}
        />
        <Route
          path="/dynaLoader"
          exact
          element={<DynaLoaderProjectLayoutPage />}
        />
        <Route
          path="/dynaFields"
          exact
          element={<DynaFieldsProjectLayoutPage />}
        />
        <Route
          path="/staffinfo"
          exact
          element={<StaffinfoProjectLayoutPage />}
        />
        <Route
          path="/dynaLoader/:singleDynaLoaderId"
          exact
          element={<SingleDynaLoaderPage />}
        />
        <Route
          path="/dynaFields/:singleDynaFieldsId"
          exact
          element={<SingleDynaFieldsPage />}
        />
        <Route
          path="/staffinfo/:singleStaffinfoId"
          exact
          element={<SingleStaffinfoPage />}
        />
        <Route path="/jobQues" exact element={<JobQueProjectLayoutPage />} />
        <Route
          path="/jobQues/:singleJobQuesId"
          exact
          element={<SingleJobQuesPage />}
        />
        <Route
          path="/employees/:singleEmployeesId"
          exact
          element={<SingleEmployeesPage />}
        />
        <Route
          path="/mailQues/:singleMailQuesId"
          exact
          element={<SingleMailQuesPage />}
        />
        <Route path="/jobQues" exact element={<JobQueProjectLayoutPage />} />
        <Route
          path="/employees"
          exact
          element={<EmployeeProjectLayoutPage />}
        />
        <Route path="/mailQues" exact element={<MailQueProjectLayoutPage />} />
        <Route
          path="/superior/:singleSuperiorId"
          exact
          element={<SingleSuperiorPage />}
        />
        <Route path="/superior" exact element={<SuperiorProjectLayoutPage />} />
        <Route path="/chataiProject" element={<ChataiProjectLayoutPage />} />
        <Route
          path="/chataiProject/:promptId"
          element={<ChataiProjectLayoutPage />}
        />
        <Route path="/chatai" exact element={<ChataiUserLayoutPage />} />
        <Route
          path="/chatai/:singleChataiId"
          exact
          element={<SingleChataiPage />}
        />
        <Route path="/prompts" exact element={<PromptsUserLayoutPage />} />
        <Route
          path="/prompts/:singlePromptsId"
          exact
          element={<SinglePromptsPage />}
        />
        <Route
          path="/jobQues/:singleJobQuesId"
          exact
          element={<SingleJobQuesPage />}
        />
        <Route
          path="/mailQues/:singleMailQuesId"
          exact
          element={<SingleMailQuesPage />}
        />
        <Route
          path="/superior/:singleSuperiorId"
          exact
          element={<SingleSuperiorPage />}
        />
        <Route
          path="/departmentAdmin/:singleDepartmentAdminId"
          exact
          element={<SingleDepartmentAdminPage />}
        />
        <Route
          path="/departmentAdmin"
          exact
          element={<DepartmentAdminProjectLayoutPage />}
        />
        <Route
          path="/departmentHOD/:singleDepartmentHODId"
          exact
          element={<SingleDepartmentHODPage />}
        />
        <Route
          path="/departmentHOD"
          exact
          element={<DepartmentHODProjectLayoutPage />}
        />
        <Route
          path="/departmentHOS/:singleDepartmentHOSId"
          exact
          element={<SingleDepartmentHOSPage />}
        />
        <Route
          path="/departmentHOS"
          exact
          element={<DepartmentHOProjectLayoutPage />}
        />
        <Route
          path="/mailWH/:singleMailWHId"
          exact
          element={<SingleMailWHPage />}
        />
        <Route path="/mailWH" exact element={<MailWHProjectLayoutPage />} />
        <Route
          path="/inbox/:singleInboxId"
          exact
          element={<SingleInboxPage />}
        />
        <Route path="/inbox" exact element={<InboxProjectLayoutPage />} />
        <Route
          path="/notifications/:singleNotificationsId"
          exact
          element={<SingleNotificationsPage />}
        />
        <Route
          path="/notifications"
          exact
          element={<NotificationProjectLayoutPage />}
        />
        <Route
          path="/errors/:singleErrorsId"
          exact
          element={<SingleErrorsPage />}
        />
        <Route path="/errors" exact element={<ErrorProjectLayoutPage />} />
        <Route
          path="/errorsWH/:singleErrorsWHId"
          exact
          element={<SingleErrorsWHPage />}
        />
        <Route path="/errorsWH" exact element={<ErrorsWHProjectLayoutPage />} />
        <Route
          path="/permissionFields/:singlePermissionFieldsId"
          exact
          element={<SinglePermissionFieldsPage />}
        />
        <Route
          path="/permissionFields"
          exact
          element={<PermissionFieldProjectLayoutPage />}
        />
        <Route
          path="/permissionServices/:singlePermissionServicesId"
          exact
          element={<SinglePermissionServicesPage />}
        />
        <Route
          path="/permissionServices"
          exact
          element={<PermissionServiceProjectLayoutPage />}
        />
        <Route
          path="/userInvites/:singleUserInvitesId"
          exact
          element={<SingleUserInvitesPage />}
        />
        <Route
          path="/userInvites"
          exact
          element={<UserInvitesProjectLayoutPage />}
        />
        <Route
          path="/userLogin/:singleUserLoginId"
          exact
          element={<SingleUserLoginPage />}
        />
        <Route
          path="/userLogin"
          exact
          element={<UserLoginProjectLayoutPage />}
        />
        <Route
          path="/employees/:singleEmployeesId"
          exact
          element={<SingleEmployeesPage />}
        />
        <Route
          path="/employees"
          exact
          element={<EmployeeProjectLayoutPage />}
        />
        <Route
          path="/userChangePassword/:singleUserChangePasswordId"
          exact
          element={<SingleUserChangePasswordPage />}
        />
        <Route
          path="/userChangePassword"
          exact
          element={<UserChangePasswordProjectLayoutPage />}
        />

<Route path="/businessInformation/:singleBusinessInformationId" exact element={<SingleBusinessInformationPage />} />
<Route path="/businessInformation" exact element={<BusinessInformationProjectLayoutPage />} />
<Route path="/officerInCharge/:singleOfficerInChargeId" exact element={<SingleOfficerInChargePage />} />
<Route path="/officerInCharge" exact element={<OfficerInChargeProjectLayoutPage />} />
<Route path="/trainingProviderSInformation/:singleTrainingProviderSInformationId" exact element={<SingleTrainingProviderSInformationPage />} />
<Route path="/trainingProviderSInformation" exact element={<TrainingProviderSInformationProjectLayoutPage />} />
<Route path="/trainingProgramOwnership/:singleTrainingProgramOwnershipId" exact element={<SingleTrainingProgramOwnershipPage />} />
<Route path="/trainingProgramOwnership" exact element={<TrainingProgramOwnershipProjectLayoutPage />} />
<Route path="/trainerDetails/:singleTrainerDetailsId" exact element={<SingleTrainerDetailsPage />} />
<Route path="/trainerDetails" exact element={<TrainerDetailProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
      {/* ~cb-add-route~ */}

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(MyRouter);
