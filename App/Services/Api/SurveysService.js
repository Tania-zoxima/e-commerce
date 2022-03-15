import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'
import { HelperService } from 'App/Services/Utils/HelperService';
import _ from 'lodash';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const SurveyApiClient = axios.create({

	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		"client-name":"ANDROID_APP",

	}
});





function getSurveys(params) {
	let url = Config.SURVEY_SERVICE.GET_SURVEY;
	
	return SurveyApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
		'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['records']
		}
		return null
	}).catch(error => {
		
		return null
	});
}

function submitSurvey(params, token) {
	
	let url = Config.SURVEY_SERVICE.SUBMIT_SURVEY;

	return SurveyApiClient.post(url, params, {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']
		}
		return null
	}).catch(error => {
		return null
	});
}




export const surveyService = {
	getSurveys,
	submitSurvey
}