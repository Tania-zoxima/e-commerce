import NavigationService from 'App/Services/NavigationService';
import { HelperService } from 'App/Services/Utils/HelperService';
import { ValidationService } from 'App/Services/ValidationService';
import { getConnectionStatus } from 'App/Stores/Common/Selectors';

import { call, put, select, take } from 'redux-saga/effects';
import { CommonService } from 'App/Services/Api/CommonService';
import CommonActions from 'App/Stores/Common/Actions';
import VisitsActions from 'App/Stores/Visits/Actions';
import RetailerActions from "App/Stores/Retailers/Actions";
import CompetitorActions from 'App/Stores/Competitor/Actions'
import UserActions from "App/Stores/User/Actions";
import ProjectActions from "App/Stores/Project/Actions";







import { offlineApiCall } from './OfflineSaga';
import {Alert} from 'react-native'
import _ from 'lodash';


export function* fetchAgentAreaPjp( payload ) {
	// console.log("hello",payload);
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllAreaPjpLoading());
	
	try {
		//let user = yield select(state => state.user)
		//payload.team__c = user.user_details.sfid
	
		let data = yield call(CommonService.getAgentAreaPjp, payload.payload);
		if (data) {
			yield put(CommonActions.fetchAllPjpSuccess(data));
			///yield put(CommonActions.fetchAllAreaPjpSuccess(data));
			// let	data1  = HelperService.sortListFilter(data, 'area_name__c' , 'ASC');
			// data1 = HelperService.convertToSearchableListFormat({ list: data, id_key: 'area__c' , label_key: 'area_name__c' });
			// yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
			let searchedData = [];
			
			searchedData = yield call(searchInDisplayList,{data: data, date:payload.payload.date});
			//console.log(searchedData)
			// yield put(VisitsActions.changeSearchByAreaFilters({ edited_field: 'area', edited_value: '45' }));
	//	let	data1  = HelperService.sortListFilter(data.areas, 'area_name__c' , 'ASC');
			//data1 = HelperService.convertToSearchableListFormat({ list: data.areas, id_key: 'area__c' , label_key: 'area_name__c' });
			yield put(CommonActions.fetchAllAreaPjpSuccess(searchedData));

			if(searchedData[0].id)
			{	
			yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: searchedData[0].id}));
			
	}
		
			
		

		
		
		
			
			
		} else {
			yield put(CommonActions.fetchAllAreaPjpFailure());
		}
	} catch (error) {
		// console.log(error)
		yield put(CommonActions.fetchAllAreaPjpFailure());
	}
}


export function* searchInDisplayList(payload) {
let area = yield select(state => state.user.team_area_result)
	let filterResultsData = [];
	
	//let visitsDisplayList = yield select(state => state.visits.visitsDisplayList);

	payload.data.map((obj) => {
		//console.log(HelperService.datesAreOnRangeLess(HelperService.getDateTimestamp(obj.from_date__c), payload.date ))
		//console.log(HelperService.datesAreOnRangeMore(HelperService.getDateTimestamp(obj.to_date__c), payload.date ))
		
		if (HelperService.datesAreOnRangeLess(HelperService.getDateTimestamp(obj.from_date__c), payload.date )&&obj.area__c) {
		
			filterResultsData = filterResultsData.concat({ name :HelperService.getNameFromSFID(area,obj.area__c), id :obj.area__c})
			filterResultsData= HelperService.removeDuplicateBeat(filterResultsData)
		}
	});



	return filterResultsData;
}

export function* fetchTodayAreaPjp( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllAreaPjpLoading());
	
	try {
	
	
		let data = yield call(CommonService.getAgentAreaPjp,{token: payload.payload.token, team__c: payload.payload.team__c, date:HelperService.getCurrentTimestamp()});
		
		if (data) {
			yield put(CommonActions.fetchAllPjpSuccess(data));
			if(data.area){
				let	data1  = HelperService.sortListFilter(data.area, 'area_name__c' , 'ASC');
					data1 = HelperService.convertToSearchableListFormat({ list: data.area, id_key: 'area__c' , label_key: 'area_name__c' });
					yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
					if(data1[0].id)
					{	yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: data1[0].id }));}
					}	
			
			if(data.beat){
				let	data2= HelperService.convertToSearchableListFormat({ list: data.beat, id_key: 'beat__c' , label_key: 'beat_name' });
				data2 =HelperService.sortListFilter(data2, 'beat_name' , 'ASC');
				yield put(CommonActions.fetchAllBeatPjpSuccess(data2));
				if( data2[0].id ){
					yield put(VisitsActions.changeAddPlannedVisitsSearchFilters({ edited_field: 'beat', edited_value: data2[0].id }));}
			}
			//yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
		
			//yield put(CommonActions.fetchAllAreaPjpSuccess(data1));
			
		} else {
			let user = yield select(state => state.user)
			
			yield put(VisitsActions.changePlannedStartDate(1));
			yield put(VisitsActions.changePlannedSelectedDate(HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000));
			//payload.payload.date = HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			//payload.date=HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			yield put(CommonActions.fetchAllAreaPjp({payload:{
				token: user.token,
				team__c: user.id,
				date: HelperService.getCurrentTimestamp()+ 1 * 24 * 60 * 60 * 1000
			}}));
		}
	} catch (error) {
		yield put(CommonActions.fetchAllAreaPjpFailure());
	}
}



export function* fetchObjective( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchObjectiveLoading());
	
	try {
	
		
		let data = yield call(CommonService.getObjective, payload);
		if (data) {
			
			yield put(CommonActions.fetchObjectiveSuccess(data));
		} else {
			yield put(CommonActions.fetchObjectiveFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchObjectiveFailure());
	}
}


export function* uploadImage({ payload }) {
	//  console.log("sagaImage",payload)
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	try {
		yield put(CommonActions.setUploadImageField(payload.params.edited_field));
		// console.log("amananananana", payload.params.edited_field)

		yield put(CommonActions.uploadImageLoading());
		let {token} = yield select(state => state.user)
		payload.token = token
		let url = yield call(CommonService.uploadImage, payload);
		  console.log("amananananana",url)
        
		if (url) {

			yield put(CommonActions.uploadImageSuccess(url));
			let new_value = url;
			if (payload.multiple) {

				payload.previous_value = payload.previous_value || [];
				payload.previous_value.push(new_value);
				new_value = payload.previous_value;
			}
			yield put(RetailerActions.changeRetailerForm({...payload.params, edited_value: new_value}));
			yield put(CompetitorActions.changeCompetitorForm({...payload.params, edited_value: new_value})); 
			yield put(ProjectActions.changeProjectForm({...payload.params, edited_value: new_value})); 
			yield put(VisitsActions.changeVisitInfoForm({...payload.params, edited_value: new_value}));
			yield put(VisitsActions.changeImageForm({...payload.params, edited_value: new_value})); 




		} else {
			yield put(CommonActions.uploadImageFailure());
		}
	} catch (error) {
		yield put(CommonActions.uploadImageFailure());
	}
}

export function* fetchState( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchStateLoading());
	
	try {
	
		let data = yield call(CommonService.getState, payload);
		if (data) {
			
			yield put(CommonActions.fetchStateSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'name' })));
		} else {
			yield put(CommonActions.fetchStateFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchStateFailure());
	}
}

export function* fetchCity( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchCityLoading());
	
	try {
	
		let data = yield call(CommonService.getCity, payload);
		if (data) {
			
			yield put(CommonActions.fetchCitySuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'name' })));
		} else {
			yield put(CommonActions.fetchCityFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchCityFailure());
	}
}

export function* fetchAllCity( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllCityLoading());
	
	try {
	
		let data = yield call(CommonService.getAllCity, payload);
		if (data) {
			data =HelperService.sortListFilter(data, 'area_name__c' , 'ASC');
			yield put(CommonActions.fetchAllCitySuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'area_name__c' })));
		} else {
			yield put(CommonActions.fetchAllCityFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllCityFailure());
	}
}

export function* fetchRetailerArea( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchRetailerAreaLoading());
	
	try {
		let retailers = yield select(state => state.retailers)
		let dealerList= retailers.retailersList.parties?Object.values(retailers.retailersList.parties.Retail_Distributor):''
		//console.log(Object.values(retailers.retailersList.parties.Retail_Distributor))
		//console.log(payload)
		//payload.team__c = user.user_details.sfid
		dealerList.map((obj)=>
		{
			if(obj.sfid==payload.payload.id)
			{
				payload.payload.city = obj.area__c
			}

		}
		)

		//console.log(payload)
		let data = yield call(CommonService.getRetailerArea, payload);
		if (data) {
			data =HelperService.sortListFilter(data, 'area_name__c' , 'ASC');
			yield put(CommonActions.fetchRetailerAreaSuccess(HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid', label_key: 'area_name__c' })));
		} else {
			yield put(CommonActions.fetchRetailerAreaFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchRetailerAreaFailure());
	}
}

export function* fetchDealerType( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchDealerTypeLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.type = user.user_details&&user.user_details.business_channel__c=='Wholesale'?'CRM Customer':'Retailer'

		let data = yield call(CommonService.getDealerType, payload);
		if (data) {
			
			yield put(CommonActions.fetchDealerTypeSuccess(HelperService.convertArrayToSearchableListFormat(data)));
		} else {
			yield put(CommonActions.fetchDealerTypeFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchDealerTypeFailure());
	}
}



export function* fetchBeat( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchBeatLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getBeat, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'beat' , 'ASC');
			data =HelperService.sortListFilter(data, 'name' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchBeatSuccess(data));
		} else {
			yield put(CommonActions.fetchBeatFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchBeatFailure());
	}
}

export function* fetchDistChannel( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchDistChannelLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getDistChannel, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'DistChannel' , 'ASC');
		let	searchList = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchDistChannelSuccess({data, searchList}));
		} else {
			yield put(CommonActions.fetchDistChannelFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchDistChannelFailure());
	}
}

export function* fetchAllPlant( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllPlantLoading());
	
	try {
		let currentVisit = yield select(state => state.visits.executeVisitData);
		let currentParty = yield select(state => state.retailers.selectedRetailer);
		payload.team__c =currentVisit.area__c||currentParty.data.area__c
		
		let data = yield call(CommonService.getAllPlant, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllPlant' , 'ASC');
			let	searchList = HelperService.convertToSearchableListFormat({ list: data[0], id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchAllPlantSuccess({data,searchList}));
		} else {
			yield put(CommonActions.fetchAllPlantFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllPlantFailure());
	}
}

export function* fetchIncoTerm( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchIncoTermLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getIncoTerm, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'IncoTerm' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchIncoTermSuccess(data));
		} else {
			yield put(CommonActions.fetchIncoTermFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchIncoTermFailure());
	}
}

export function* fetchAllRoute( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllRouteLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getAllRoute, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllRoute' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchAllRouteSuccess(data));
		} else {
			yield put(CommonActions.fetchAllRouteFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllRouteFailure());
	}
}

export function* fetchAllInsurance( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.fetchAllInsuranceLoading());
	
	try {
		let user = yield select(state => state.user)
		payload.team__c = user.id
		
		let data = yield call(CommonService.getAllInsurance, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllInsurance' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.fetchAllInsuranceSuccess(data));
		} else {
			yield put(CommonActions.fetchAllInsuranceFailure());
		}
	} catch (error) {
		yield put(CommonActions.fetchAllInsuranceFailure());
	}
}


export function* getBillParty( payload ) {
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	yield put(CommonActions.getBillPartyLoading());
	
	try {
		let visits = yield select(state => state.visits)
		payload.id= visits.executeVisitData.customer_sfid__c
		
		let data = yield call(CommonService.getBillParty, payload);
		if (data) {
			// data  = HelperService.sortListFilter(data, 'AllInsurance' , 'ASC');
			data = HelperService.convertToSearchableListFormat({ list: data, id_key: 'sfid' , label_key: 'name' });
			yield put(CommonActions.getBillPartySuccess(data));
		} else {
			yield put(CommonActions.getBillPartyFailure());
		}
	} catch (error) {
		yield put(CommonActions.getBillPartyFailure());
	}
}

export function* fetchCurrentLocation({payload}){
    yield put(CommonActions.fetchCurrentLocationLoading());
    let location = yield call(HelperService.requestLocation)
  
    if (location == 'DENIED'){
      Alert.alert("Location permission is required to proceed.", 
        "Go App Permissions and Turn on Location Permission for JKPaper."
      );
      yield put(CommonActions.fetchCurrentLocationFailure());
    }else if (!location) {
      yield put(CommonActions.fetchCurrentLocationFailure());
    }else {
      if (payload.callAction) {
        yield put(payload.callAction(payload.args))
      }
      yield put(CommonActions.fetchCurrentLocationSuccess(location));
    }
  
    yield put(CommonActions.fetchCurrentLocationLoadingStop());  
  } 

  export function* getAllNotifications({ payload }) {
    const isOnline = yield select(getConnectionStatus); // checks whether net is connected or not.
    if (!isOnline) {
      yield put(CommonActions.doNothing());
      return;
    }
    yield put(CommonActions.getAllNotificationsLoading());
    try {
      let successData = yield call(CommonService.getAllNotifications, payload);
      if (successData) {
        yield put(CommonActions.getAllNotificationsSuccess(successData));
      } else {
        yield put(CommonActions.getAllNotificationsFailure());
      }
    } catch (error) {
      yield put(CommonActions.getAllNotificationsFailure());
    }
  }


  export function* uploadUserImage({ payload }) {
	  console.log("kkkk",payload)
	const isOnline = yield select(getConnectionStatus);
	if (!isOnline) {
		yield put(CommonActions.doNothing());
		return;
	}

	try {
		 yield put(CommonActions.setUploadUserImageField(payload.params.edited_field));
		
		yield put(CommonActions.uploadUserImageLoading());
		let {token} = yield select(state => state.user);
		 let {id} = yield select(state => state.user);

		payload.token = token
		 payload.id = id
		// payload.zx_profilepicture=zx_profilepicture


		let url = yield call(CommonService.singleImage, payload);
        
		if (url) {
		console.log("urlllll",url)



			yield put(CommonActions.uploadUserImageSuccess(url));

		
			 yield put(UserActions.userPicUpload({teamGuid:id,picUrl:url, token: token}));


		} else {
			yield put(CommonActions.uploadUserImageFailure());
		}
	} catch (error) {
		yield put(CommonActions.uploadUserImageFailure());
	}
}