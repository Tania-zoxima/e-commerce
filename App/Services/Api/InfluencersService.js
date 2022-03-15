import axios from 'axios'
import { Config } from '../../Config/index'
import { is, curryN, gte } from 'ramda'
import { HelperService } from 'App/Services/Utils/HelperService';
import _ from 'lodash';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const influencersApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		"client-name":"ANDROID_APP",

	}
});



async function fetchInfluencers(params) {
	let url = Config.INFLUENCERS_SERVICE.FETCH_INFLUENCERS;
	url += `?offset=${params.offset}&limit=${params.limit}`;
	try {
		const response = await influencersApiClient.get(url, {
			headers: {
				Authorization: 'Bearer ' + params.token,
				agentid: params.agentid,
				'Content-Type': 'application/json'
			}
		});
		if (in200s(response.status)) {
			return response['data']['data']['contacts'];
		}
		return null;
	}
	catch (error) {
		return null;
	}
}

async function fetchInfluencerSites(params) {
	let url = Config.INFLUENCERS_SERVICE.FETCH_INFLUENCER_SITES;
	url += `?offset=${params.offset}&limit=${params.limit}&contact=${params.id}`;
	try {
		const response = await influencersApiClient.get(url, {
			headers: {
				Authorization: 'Bearer ' + params.token,
				agentid: params.agentid,
				'Content-Type': 'application/json'
			}
		});
		if (in200s(response.status)) {
			return response['data']['data']['sites'];
		}
		return null;
	}
	catch (error) {
		return null;
	}
}

function createInfluencer(params) {
	let formData = _.cloneDeep(params);
	// formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	// formData.category__c = 'ASM';
	let url = Config.INFLUENCERS_SERVICE.CREATE;



	return influencersApiClient.post(url, formData.form, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response.data
		}
		return null
	}).catch(error => {
		return null
	});
}

function updateInfluencer(params) {
	let url = Config.INFLUENCERS_SERVICE.UPDATE;
	url += `?id=${params.pg_id__c}`;
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	return influencersApiClient.post(url, formData, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response.data
		}
		return null
	}).catch(error => {
		return null
	});
};

export const influencersService = {
	fetchInfluencers,
	createInfluencer,
	updateInfluencer,
	fetchInfluencerSites
}
