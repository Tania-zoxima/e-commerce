
import { put, call, take, select } from 'redux-saga/effects'
import DistributorActions from 'App/Stores/Distributor/Actions'
import CommonActions from 'App/Stores/Common/Actions'
import { DistributorTypes } from 'App/Stores/Distributor/Actions'
import { distributorService } from 'App/Services/Api/DistributorService'
import { ValidationService } from 'App/Services/ValidationService'
import { Toast } from 'native-base'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import { getConnectionStatus } from 'App/Stores/Common/Selectors'
import ActionQueuesActions from 'App/Stores/ActionQueues/Actions'
import { offlineApiCall } from './OfflineSaga'
import { Alert } from 'react-native'
import _ from 'lodash';



export function* submitSelectedDistributorForm( payload ) {
	yield put(DistributorActions.submitSelectedDistributorFormLoading());
	try {
		let offlinActionData = {
			apiCall: (distributorService.createDistributor),
			resource: 'createDistributor',
			callName: 'create',
			params: HelperService.decorateWithLocalId(payload),
			 timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (DistributorActions.submitSelectedDistributorFormSuccess),
			failureCallback: (DistributorActions.submitSelectedDistributorFormFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		// console.log("amannn", successData)



		if (successData) { //Todo : change it to userData
			yield put(DistributorActions.submitSelectedDistributorFormSuccess({data:successData,payload:payload}));
			yield put(DistributorActions.clearDistributorForm());
			NavigationService.navigate('CreateSuccess');
			HelperService.showToast({
				message: 'Form Saved.',
				duration: 1000,
				buttonText: ''
			});
			// yield call(refreshVisitsDisplayList);
		//	yield call(refreshVisitsStorageList);
		} else {
			yield put(DistributorActions.submitSelectedDistributorFormFailure())
			// console.log("eerorrr",error)
			HelperService.showToast({
				message: 'Error Submitting form',
				duration: 2000,
				buttonText: 'Okay'
			});

		}
	} catch (error) {
		
		yield put(DistributorActions.submitSelectedDistributorFormFailure())
		HelperService.showToast({
			message: 'Error Saving Form',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}


export function* submitEditedDistributorForm({ payload }) {
	yield put(DistributorActions.submitEditedDistributorFormLoading());
	try {
		let offlinActionData = {
			apiCall: (distributorService.updateDistributor),
			resource: 'updateDistributor',
			callName: 'update',
			params: HelperService.decorateWithLocalId(payload),
			 timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (DistributorActions.submitEditedDistributorFormSuccess),
			failureCallback: (DistributorActions.submitEditedDistributorFormFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);

		if (successData) { //Todo : change it to userData
			yield put(DistributorActions.submitEditedDistributorFormSuccess(payload));
			NavigationService.navigateAndReset('DistributorOnboardingScreen');
			HelperService.showToast({
				message: 'Form Saved.',
				duration: 1000,
				buttonText: ''
			});
			// yield call(refreshVisitsDisplayList);
		//	yield call(refreshVisitsStorageList);
		} else {
			yield put(DistributorActions.submitEditedDistributorFormFailure())
			HelperService.showToast({
				message: 'Error Submitting form',
				duration: 2000,
				buttonText: 'Okay'
			});

		}
	} catch (error) {
		yield put(DistributorActions.submitEditedDistributorFormFailure())
		HelperService.showToast({
			message: 'Error Saving Form',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}



export function* getDistributor({ payload }) {
    //console.log(payload)
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getDistributorLoading());
    try {
      let successData = yield call(distributorService.getDistributor, payload);
      if (successData) {
        yield put(DistributorActions.getDistributorSuccess(successData));
      } else {
        yield put(DistributorActions.getDistributorFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getDistributorFailure());
    }
  }

  export function* getAllArea({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllAreaLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllAreaSuccess(successData));
      } else {
        yield put(DistributorActions.getAllAreaFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllAreaFailure());
    }
  }

  export function* getAllPincode({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllPincodeLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllPincodeSuccess(successData));
      } else {
        yield put(DistributorActions.getAllPincodeFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllPincodeFailure());
    }
  }

  export function* getAllState({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllStateLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllStateSuccess(successData));
      } else {
        yield put(DistributorActions.getAllStateFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllStateFailure());
    }
  }

  export function* getAllSubState({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllSubStateLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllSubStateSuccess(successData));
      } else {
        yield put(DistributorActions.getAllSubStateFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllSubStateFailure());
    }
  }

  export function* getAllZone({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllZoneLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllZoneSuccess(successData));
      } else {
        yield put(DistributorActions.getAllZoneFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllZoneFailure());
    }
  }

  export function* getAllDistrict({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllDistrictLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllDistrictSuccess(successData));
      } else {
        yield put(DistributorActions.getAllDistrictFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllDistrictFailure());
    }
  }

  export function* getAllCity({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getAllCityLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getAllCitySuccess(successData));
      } else {
        yield put(DistributorActions.getAllCityFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getAllCityFailure());
    }
  }

  export function* watchCreateDistributorRequest() {
	while (true) {
		const { payload } = yield take(DistributorTypes.SUBMIT_SELECTED_DISTRIBUTOR_FORM)

		 try {
		 	const validationFailed = yield call(ValidationService.validateDistributorForm, payload.form);
		 	if (validationFailed) {
			HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(DistributorActions.distributorFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
		// console.log("rkkkkkk",err)
		 }

		yield call(submitSelectedDistributorForm, payload)
	}
}

export function* updateDistributor({payload}) {
	// console.log("payloaddddd",payload)
	yield put(DistributorActions.updateDistributorLoading());
	try {
	  //let user = yield select((state) => state.user);
	 // payload.team__c = user.id;
  
	  let offlinActionData = {
		apiCall: distributorService.updateDistributor,
		resource: "updateDistributor", //specify for which reducer we are using it
		callName: "update", //specify operation
		params: HelperService.decorateWithLocalId(payload),
		timestamp: HelperService.getCurrentTimestamp(),
		successCallback: DistributorActions.updateDistributorSuccess,
		failureCallback: DistributorActions.updateDistributorFailure,
		replaceServerParams: false,
	  };
  
	  const successData = yield call(offlineApiCall, offlinActionData);
	//   console.log(successData)
	  
	  if (successData) {
 
		// let user = yield select((state) => state.user);
		// //Todo : change it to userData
		
		// let distributorForm = yield select(
		//   (state) => state.distributor.distributorForm
		// );
		yield put(DistributorActions.updateDistributorSuccess({data:successData,payload:payload}));
		yield put(DistributorActions.clearUpdateLongForm());
		NavigationService.navigate('UpdateSuccess');
	   // yield put(CommonActions.closeModal());
		HelperService.showToast({
		  message: "Updated Successfully",
		  duration: 1000,
		  buttonText: "",
		});
	  } else {
		yield put(DistributorActions.updateDistributorFailure());
		HelperService.showToast({
		  message: "Updation failed!",
		  duration: 2000,
		  buttonText: "Okay",
		});
	  }
	} catch (error) {
	  yield put(DistributorActions.updateDistributorFailure());
	  HelperService.showToast({
		message: error,
		duration: 2000,
		buttonText: "Okay",
	  });
	//   console.log(error);
	}
  }


  export function* sendApproval( payload ) {
		// console.log("pkkkkkkkkkkkkkk", payload)

	yield put(DistributorActions.sendApprovalLoading());
	try {
		let offlinActionData = {
			apiCall: (distributorService.sendApproval),
			resource: 'sendApproval',
			callName: 'send',
			params: HelperService.decorateWithLocalId(payload),
			 timestamp: HelperService.getCurrentTimestamp(),
			successCallback: (DistributorActions.sendApprovalSuccess),
			failureCallback: (DistributorActions.sendApprovalFailure),
			replaceServerParams: false
		};

		const successData = yield call(offlineApiCall, offlinActionData);
		// console.log("Successssss", successData)



		if (successData) { //Todo : change it to userData
			
			yield put(DistributorActions.sendApprovalSuccess(payload));
			HelperService.showToast({
				message: 'Sent for Approval.',
				duration: 1000,
				buttonText: ''
			});
			
		} else {
			yield put(DistributorActions.sendApprovalFailure())
			HelperService.showToast({
				message: 'Error in Sending Request',
				duration: 2000,
				buttonText: 'Okay'
			});

		}
	} catch (error) {
		
		yield put(DistributorActions.sendApprovalFailure())
		HelperService.showToast({
			message: 'Error in Sending Form',
			duration: 2000,
			buttonText: 'Okay'
		});
	}
}

export function* watchSubmitApprovalRequest() {
	// console.log("PIKKKKAAAAA")

	
	while (true) {
		const { payload } = yield take(DistributorTypes.SEND_APPROVAL)

		 try {
		 	const validationFailed = yield call(ValidationService.submitValidateDistributorForm, payload.form);
		 	if (validationFailed) {
			HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				yield put(DistributorActions.submitDistributorFormValidationFailed(validationFailed));
				continue;
			}
		} catch (err) {
		// console.log("rkkkkkk",err)
		 }

		yield call(sendApproval, payload)
	}
}
export function* getSubCategory({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getSubCategoryLoading());
    try {
      let successData = yield call(distributorService.getSubCategory, payload);
      if (successData) {
        yield put(DistributorActions.getSubCategorySuccess(successData));
      } else {
        yield put(DistributorActions.getSubCategoryFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getSubCategoryFailure());
    }
  }

  export function* getResidenceArea({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceAreaLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceAreaSuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceAreaFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceAreaFailure());
    }
  }

  export function* getResidencePincode({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidencePincodeLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidencePincodeSuccess(successData));
      } else {
        yield put(DistributorActions.getResidencePincodeFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidencePincodeFailure());
    }
  }

  export function* getResidenceState({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceStateLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceStateSuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceStateFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceStateFailure());
    }
  }

  export function* getResidenceSubState({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceSubStateLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceSubStateSuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceSubStateFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceSubStateFailure());
    }
  }

  export function* getResidenceZone({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceZoneLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceZoneSuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceZoneFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceZoneFailure());
    }
  }

  export function* getResidenceDistrict({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceDistrictLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceDistrictSuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceDistrictFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceDistrictFailure());
    }
  }

  export function* getResidenceCity({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(DistributorActions.doNothing());
      return;
    }
    yield put(DistributorActions.getResidenceCityLoading());
    try {
      let successData = yield call(distributorService.getAllArea, payload);
      if (successData) {
        yield put(DistributorActions.getResidenceCitySuccess(successData));
      } else {
        yield put(DistributorActions.getResidenceCityFailure());
      }
    } catch (error) {
      yield put(DistributorActions.getResidenceCityFailure());
    }
  }