import { put, call, take, select } from 'redux-saga/effects'
import { SurveysTypes } from 'App/Stores/Surveys/Actions'
import SurveyActions from 'App/Stores/Surveys/Actions'
import { surveyService } from 'App/Services/Api/SurveysService'
import { ValidationService } from 'App/Services/ValidationService'
import { Toast } from 'native-base'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import { getConnectionStatus } from 'App/Stores/Common/Selectors'
import ActionQueuesActions from 'App/Stores/ActionQueues/Actions'
import { offlineApiCall } from './OfflineSaga'

import InfluencerAction from '../Stores/Influencers/Actions';
import SiteActions from '../Stores/Sites/Actions';
import LocalActions from '../Stores/LocalExpense/Actions';
import _ from 'lodash';

//createRetailer, validation required, offline support
//updateRetailer, validation required, offline support
//fetchRetailers
//fetchDealers
//updateRetailerLocation
//fetchRetailerOrders
//fetchDealerOrders
//fetchDealerInvoice 
//fetchDealerOutstanding



export function* getSurveys({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(SurveyActions.doNothing());
		return;
	}
	yield put(SurveyActions.getSurveysLoading());
	try {
		 
		let successData = yield call(surveyService.getSurveys, payload);
		if (successData) {
			yield put(SurveyActions.getSurveysSuccess(successData));
			
		} else {
			yield put(SurveyActions.getSurveysFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SurveyActions.getSurveysFailure());
	}
}

export function* startSurvey({ payload }) {
	let form = {
		Id: payload.Id,
		Name: payload.Name,
		Region__c: payload.Region__c,
		questions: payload.Survey_Lines__r.records,
		total_questions: payload.Survey_Lines__r.totalSize,
		current_question: 1
	};
	let executeVisitData = yield select(state => state.visits.executeVisitData);
	if(executeVisitData.Id){
	yield put(SurveyActions.startSurveySuccess(form));
	NavigationService.navigate('SurveyFormScreen')}
	else{
		HelperService.showToast({ message: 'Please Start Dealer Visit to proceed.', duration: 2000, buttonText: 'Okay' });	
	}
}


export function* gotoNextQuestion({ payload }) {
	let survey = yield select(state => state.survey.surveyForm);
	let current_question = survey.current_question + 1;
	let is_answered = !!survey.questions[survey.current_question - 1]['answer'];
		
	if (!is_answered) {
		HelperService.showToast({ message: 'Please answer this question to proceed.', duration: 2000, buttonText: 'Okay' });
		return
	}

	yield put(SurveyActions.changeSurveyForm({edited_field: 'current_question', edited_value: current_question}));
}


export function* gotoPreviousQuestion({ payload }) {
	let survey = yield select(state => state.survey.surveyForm);
	let current_question = survey.current_question - 1;
	yield put(SurveyActions.changeSurveyForm({edited_field: 'current_question', edited_value: current_question}));
}

export function* answerQuestion({payload}) {
	let survey = yield select(state => state.survey.surveyForm);
	let updated_questions  = _.cloneDeep(survey.questions);

	updated_questions.map((obj)=> {
		if (obj.Id == payload.id) {
			obj.answer = payload.answer;
		}
	});

	yield put(SurveyActions.changeSurveyForm({edited_field: 'questions', edited_value: updated_questions}));

}


export function* submitSurvey(payload) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(SurveyActions.doNothing());
		return;
	}
	yield put(SurveyActions.submitSurveyLoading());
	try {
		let formData = createSurveySubmitData(payload);
		let successData = yield call(surveyService.submitSurvey, formData, payload.token);
		if (successData) {
			NavigationService.navigate('SurveyListScreen');
			yield put(SurveyActions.submitSurveySuccess());
			HelperService.showToast({ message: 'Survey Submitted Successfully!', duration: 2000, buttonText: 'Okay' });
		} else {
			yield put(SurveyActions.submitSurveyFailure());
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SurveyActions.submitSurveyFailure());
	}
}



export function* watchSubmitSurvey() {
	while (true) {
		const { payload } = yield take(SurveysTypes.SUBMIT_SURVEY)
		try {
			const validationFailed = false//yield call(ValidationService.validateSubmitSurvey, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(submitSurvey, payload)
	}
}


function createSurveySubmitData(payload) {
	
	let questions = _.cloneDeep(payload.questions);

	

	// "attributes" : {"type" : "Survey_Answer__c", "referenceId" : "ref1"},
 //    "Survey_Question__c" : "a0i0p0000003eXFAAY",{Survey Line ID}
 //    "Answer__c" : "Builder"
 	let form = [];
 	let index = 1;
 	questions.map((obj) => {
 		let answer = obj.answer.split(',');
 		if (answer.length > 1) {
 			answer.map((x) => {
 				form.push({
	 				attributes: {"type" : "Survey_Answer__c", "referenceId" : "ref" + index},
	 				"Survey_Question__c" : obj.Id,
					 "Answer__c" : x,
					 "Visit__c": payload.executeVisitData.Id ||'',
					 "Dealer__c": payload.executeVisitData.Customer__c||'',
					 "Region__c":payload.executeVisitData.Customer__r&&payload.executeVisitData.Customer__r.Region__c? payload.executeVisitData.Customer__r.Region__c:''

	 			})
 				index = index + 1;
 			})
 		}else {
 			form.push({
 				attributes: {"type" : "Survey_Answer__c", "referenceId" : "ref" + index},
 				"Survey_Question__c" : obj.Id,
				 "Answer__c" : obj.answer,
				 "Visit__c":  payload.executeVisitData.Id ||'',
				 "Dealer__c": payload.executeVisitData.Customer__c||'',
				 "Region__c":payload.executeVisitData.Customer__r&&payload.executeVisitData.Customer__r.Region__c? payload.executeVisitData.Customer__r.Region__c:''

 			})
 			index = index + 1;
 		}
 	})


 	return ({
 		records: form
 	})

}





