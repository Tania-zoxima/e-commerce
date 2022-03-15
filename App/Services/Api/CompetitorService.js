import axios from "axios";
import { Config } from "App/Config";
import { is, curryN, gte } from "ramda";
import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number);
  return (
    isNumber(min) &&
    isNumber(max) &&
    isNumber(value) &&
    gte(value, min) &&
    gte(max, value)
  );
});

const in200s = isWithin(200, 299);

const competitorApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name": "ANDROID_APP",
  },
});

function createCompetitor(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.COMPETITOR_SERVICE.CREATE;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';
// console.log("formm",formData.form)
  return competitorApiClient
    .post(url, formData.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("competitorervice",response.data)
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("competitorerror", error.response)
      return null;
    });
}

function getCompetitorName(params) {
  let url = Config.COMPETITOR_SERVICE.COMPETITOR_NAME;
  return competitorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getCompetitor(params) {
  console.log("paramsssscompetitor",params)
  let url = Config.COMPETITOR_SERVICE.GET_COMPETITOR;
  url += "?";
  url += `salesexecutiveId=${params.id}`;
  params.fromdate?url += `&fromdate=${HelperService.dateReadableFormatWithHyphen(
    params.fromdate
  )}`:null;
  params.todate?url += `&todate=${HelperService.dateReadableFormatWithHyphen(params.todate)}`:null;
  return competitorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      console.log("competitoeerrorrr", error.response);
      return null;
    });
}
function getClass(params) {
  let url = Config.COMPETITOR_SERVICE.GET_ITEMCLASS;
  return competitorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getCompetitorFilter(params) {
  let url = Config.COMPETITOR_SERVICE.GET_COMPETITOR;
  url += "?";
  url += `salesexecutiveId=${params.id}`;
  return competitorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.parentFilter;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getCompetitorChild(params) {
  let url = Config.COMPETITOR_SERVICE.GET_COMPETITOR;
  url += "?";
  url += `salesexecutiveId=${params.id}`;
  return competitorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.childFilter;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
export const competitorService = {
  createCompetitor,
  getCompetitorName,
  getCompetitor,
  getClass,
  getCompetitorFilter,
  getCompetitorChild,
};
