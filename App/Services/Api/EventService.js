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

const eventApiClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    "client-name":"ANDROID_APP",

    }
});


function createEvent(params) {
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    formData = HelperService.removeField(formData, 'local_id');
    return eventApiClient.post(Config.EVENT_SERVICE.CREATE, formData, {
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
}

function updateEvent(params) {
    let url = Config.EVENT_SERVICE.UPDATE;
    url += `?id=${params.pg_id__c}`;
    let formData = _.cloneDeep(params);
    formData = HelperService.removeField(formData, 'agentid');
    formData = HelperService.removeField(formData, 'token');
    return eventApiClient.post(url, formData, {
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
}

function fetchEvents(params) {
    let url = Config.EVENT_SERVICE.FETCH_EVENTS;
    // url += `?offset=${params.offset}&limit=${params.limit}`;
    return eventApiClient.get(url, {
        headers: {
            token: params.token,
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['events']
        }
        return null
    }).catch(error => {
        return null
    });
}

function fetchParticipants(params) {
    let url = Config.EVENT_SERVICE.FETCH_PARTICIPANTS;
    url += `?offset=${params.offset}&limit=${params.limit}&id=${params.id}`;
    return eventApiClient.get(url, {
        headers: {
            Authorization: 'Bearer ' + params.token,
            agentid: params.agentid,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (in200s(response.status)) {
            return response['data']['data']['eventParticipants']
        }
        return null
    }).catch(error => {
        return null
    });
}

function addParticipants(params) {
    let formData = _.cloneDeep(params);
    let participantList = Object.values(formData.payload.payloads);
    return eventApiClient.post(Config.EVENT_SERVICE.ADD_PARTICIPANTS, participantList, {
        headers: {
            Authorization: 'Bearer ' + formData.payload.token,
            agentid: formData.payload.agentid,
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
}

export const eventService = {
    createEvent,
    updateEvent,
    fetchEvents,
    fetchParticipants,
    addParticipants
}
