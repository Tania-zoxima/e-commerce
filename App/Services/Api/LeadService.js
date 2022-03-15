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

const leadApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name": "ANDROID_APP",
  },
});

function createLead(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.LEAD_SERVICE.CREATE;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return leadApiClient
    .post(url, formData.form, {
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
      // console.log("the", error.response)

      return null;
    });
}

function getLead(params) {
  console.log("paramssleadd", params);
  let url = Config.LEAD_SERVICE.GET_OPPORTUNITY;
  return leadApiClient
    .post(url, params.form, {
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
      console.log("errorrrrlllllll", error.response);
      return null;
    });
}

function updateLead(params) {
  console.log("paramsssupdate", params);
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  let url = Config.LEAD_SERVICE.UPDATE_OPPORTUNITY;

  return leadApiClient
    .post(url, formData.form, {
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
      console.log("uuppdateeeeeeeee", error.response);
      return null;
    });
}

export const leadService = {
  createLead,
  getLead,
  updateLead,
};
