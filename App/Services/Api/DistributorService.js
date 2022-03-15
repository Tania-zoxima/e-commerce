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

const distributorApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name":"ANDROID_APP",

  },
});

function createDistributor(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.DISTRIBUTOR_SERVICE.CREATE;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return distributorApiClient
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

function updateDistributor(params) {
  // console.log("paramsssupdate",params)
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.DISTRIBUTOR_SERVICE.UPDATE;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return distributorApiClient
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
      // console.log("uuppdateeeeeeeee",error.response)
      return null;
    });
}

function getDistributor(params) {
  let url = Config.DISTRIBUTOR_SERVICE.GET_DISTRIBUTOR;
  url += `?salesexecutive=${params.salesexecutive}`;
  return distributorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("getdistributor", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("eerorrdis", error.response);
      return null;
    });
}

function getAllArea(params) {
  // console.log("pppppppppppppppppppp",params)
  let url = Config.DISTRIBUTOR_SERVICE.GET_ALL_AREA;
  url += `?team_id=${params.id}`;
  url += `&required_level=${params.level}`;
  params.first_level?url+=`&first_level=${params.first_level}`:null
	params.guidId?url+=`&first_guid=${params.guidId}`:null
  return distributorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("aaaaaaaaaaaareaaaa", response.data.data);

        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function sendApproval(params) {
  // console.log("paramssssssssss", params)

  let url = Config.DISTRIBUTOR_SERVICE.APPROVAL;

  // console.log("abdgshdnfgmgk",params.form, params.token, url)
  return distributorApiClient
    .post(url, params.id, {
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
      // console.log("uuppdateeeeeeeee",error.response)
      return null;
    });
}

function getSubCategory(params) {
  // console.log("pppppppppppppppppppp",params)
  let url = Config.DISTRIBUTOR_SERVICE.GET_SUBCATEGORY;
  return distributorApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("aaaaaaaaaaaareaaaa",response.data.data)

        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

export const distributorService = {
  createDistributor,
  updateDistributor,
  getDistributor,
  getAllArea,
  sendApproval,
  getSubCategory,
};
