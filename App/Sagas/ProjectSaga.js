import { put, call, take, select } from "redux-saga/effects";
import DistributorActions from "App/Stores/Distributor/Actions";
import CommonActions from "App/Stores/Common/Actions";
import { DistributorTypes } from "App/Stores/Distributor/Actions";
import { distributorService } from "App/Services/Api/DistributorService";
import { ValidationService } from "App/Services/ValidationService";
import { Toast } from "native-base";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import { getConnectionStatus } from "App/Stores/Common/Selectors";
import ActionQueuesActions from "App/Stores/ActionQueues/Actions";
import { offlineApiCall } from "./OfflineSaga";
import { Alert } from "react-native";
import _ from "lodash";
import ProjectActions from "App/Stores/Project/Actions";
import { projectService } from "../Services/Api/ProjectService";
import { ProjectTypes } from "App/Stores/Project/Actions";
import VisitsActions from "App/Stores/Visits/Actions";

export function* createProjectForm(payload) {
  // console.log("yuo",payload)
  yield put(ProjectActions.createProjectFormLoading());
  try {
    let offlinActionData = {
      apiCall: projectService.createProject,
      resource: "createProject",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: ProjectActions.createProjectFormSuccess,
      failureCallback: ProjectActions.createProjectFormFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      // console.log("success",successData )
      //Todo : change it to userData
      yield put(
        ProjectActions.createProjectFormSuccess({
          data: successData,
          payload: payload,
        })
      );

      NavigationService.navigate("ProjectSuccess");
      HelperService.showToast({
        message: "Project Created Successfully",
        duration: 1000,
        buttonText: "",
      });
      yield put(ProjectActions.clearProjectForm());

      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      yield put(ProjectActions.createProjectFormFailure());
      // console.log("eerorrr", error);
      HelperService.showToast({
        message: "Error Creating Project",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(ProjectActions.createProjectFormFailure());
    HelperService.showToast({
      message: "Error Creating Project",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* watchCreateProjectRequest() {
  while (true) {
    const { payload } = yield take(ProjectTypes.CREATE_PROJECT_FORM);

    try {
      const validationFailed = yield call(
        ValidationService.projectFormValidation,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(ProjectActions.projectFormValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {
      // console.log("rkkkkkk", err);
    }

    yield call(createProjectForm, payload);
  }
}

export function* getBathroomMaster({ payload }) {
  console.log("freeeee", payload);
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getBathroomMasterLoading());

  try {
    let successData = yield call(projectService.getBathroomCost, payload);
    if (successData) {
      // console.log("suucessdataarea", successData);
      yield put(ProjectActions.getBathroomMasterSuccess(successData));
      yield put(
        ProjectActions.changeProjectForm({
          edited_field: "zx_projectcost",
          edited_value: successData.zx_panindiabathroomcost * payload.value,
        })
      );
    } else {
      yield put(ProjectActions.getBathroomMasterFailure());
    }
  } catch (error) {
    // console.log("fffffffffffff", error);
    yield put(ProjectActions.getBathroomMasterFailure());
  }
}

export function* getProject({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getProjectLoading());

  try {
    let successData = yield call(projectService.getProject, payload);
    if (successData) {
      yield put(ProjectActions.getProjectSuccess(successData));
    } else {
      yield put(ProjectActions.getProjectFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getProjectFailure());
  }
}

export function* watchUpdateProjectRequest() {
  while (true) {
    const { payload } = yield take(ProjectTypes.UPDATE_PROJECT);

    try {
      const validationFailed = yield call(
        ValidationService.updateProjectFormValidation,
        payload.form
      );
      if (validationFailed) {
        HelperService.showToast({
          message: validationFailed.error_message,
          duration: 2000,
          buttonText: "Okay",
        });
        yield put(ProjectActions.projectFormValidationFailed(validationFailed));
        continue;
      }
    } catch (err) {
      // console.log("rkkkkkk", err);
    }

    yield call(updateProject, payload);
  }
}

export function* updateProject(payload) {
  console.log("payloaddddd", payload);
  yield put(ProjectActions.updateProjectLoading());
  try {
    let offlinActionData = {
      apiCall: projectService.updateProject,
      resource: "updateProject", //specify for which reducer we are using it
      callName: "update", //specify operation
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: ProjectActions.updateProjectSuccess,
      failureCallback: ProjectActions.updateProjectFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);

    if (successData) {
      yield put(
        ProjectActions.updateProjectSuccess({
          data: successData,
          payload: payload,
        })
      );

      NavigationService.navigate("ProjectUpdateSuccess");
      HelperService.showToast({
        message: "Updated Successfully",
        duration: 1000,
        buttonText: "",
      });
      yield put(ProjectActions.clearProjectForm());
      yield put(VisitsActions.clearVisitInfo());
    } else {
      yield put(ProjectActions.updateProjectFailure());
      HelperService.showToast({
        message: "Updation failed!! Try Again.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    yield put(ProjectActions.updateProjectFailure());
    HelperService.showToast({
      message: error,
      duration: 2000,
      buttonText: "Okay",
    });
    //   console.log(error);
  }
}

export function* getCatalogue({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getCatalogueLoading());

  try {
    let successData = yield call(projectService.projectCatalogue, payload);
    if (successData) {
      yield put(ProjectActions.getCatalogueSuccess(successData));
    } else {
      yield put(ProjectActions.getCatalogueFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getCatalogueFailure());
  }
}

export function* getProjectOpportunity({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getProjectOpportunityLoading());

  try {
    let successData = yield call(projectService.getProjectOpportunity, payload);
    if (successData) {
      yield put(ProjectActions.getProjectOpportunitySuccess(successData));
    } else {
      yield put(ProjectActions.getProjectOpportunityFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getProjectOpportunityFailure());
  }
}

export function* getProductSold({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getProductSoldLoading());

  try {
    let successData = yield call(projectService.getProductSold, payload);
    if (successData) {
      yield put(ProjectActions.getProductSoldSuccess(successData));
    } else {
      yield put(ProjectActions.getProductSoldFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getProductSoldFailure());
  }
}

export function* getProductOffer({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getProductOfferLoading());

  try {
    let successData = yield call(projectService.getProductOffer, payload);
    if (successData) {
      yield put(ProjectActions.getProductOfferSuccess(successData));
    } else {
      yield put(ProjectActions.getProductOfferFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getProductOfferFailure());
  }
}

export function* createProjectProduct({ payload }) {
  // console.log("yuo",payload)
  yield put(ProjectActions.createProjectProductLoading());
  try {
    let offlinActionData = {
      apiCall: projectService.createProjectProduct,
      resource: "createProjectProduct",
      callName: "create",
      params: HelperService.decorateWithLocalId(payload),
      timestamp: HelperService.getCurrentTimestamp(),
      successCallback: ProjectActions.createProjectProductSuccess,
      failureCallback: ProjectActions.createProjectProductFailure,
      replaceServerParams: false,
    };

    const successData = yield call(offlineApiCall, offlinActionData);
    if (successData) {
      // console.log("success",successData )
      //Todo : change it to userData
      yield put(
        ProjectActions.createProjectProductSuccess({
          data: successData,
          payload: payload,
        })
      );

      NavigationService.navigate("AddProductSuccess");
      HelperService.showToast({
        message: "Project Created Successfully",
        duration: 1000,
        buttonText: "",
      });
       yield put(ProjectActions.clearCart());

      // yield call(refreshVisitsDisplayList);
      //	yield call(refreshVisitsStorageList);
    } else {
      // console.log("errorrrrttt",error)
      yield put(ProjectActions.createProjectProductFailure());
      // console.log("eerorrr", error);
      HelperService.showToast({
        message: "Error Creating Project",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  } catch (error) {
    // console.log("errorrrr",error)
    yield put(ProjectActions.createProjectProductFailure());
    HelperService.showToast({
      message: "Error Creating Project",
      duration: 2000,
      buttonText: "Okay",
    });
  }
}

export function* getProjectProductSold({ payload }) {
  const isOnline = yield select(getConnectionStatus);
  if (!isOnline) {
    yield put(ProjectActions.doNothing());
    return;
  }

  yield put(ProjectActions.getProjectProductSoldLoading());

  try {
    let successData = yield call(projectService.getProjectProductSold, payload);
    if (successData) {
      yield put(ProjectActions.getProjectProductSoldSuccess(successData));
    } else {
      yield put(ProjectActions.getProjectProductSoldFailure());
    }
  } catch (error) {
    console.log("Error", error);
    yield put(ProjectActions.getProjectProductSoldFailure());
  }
}
