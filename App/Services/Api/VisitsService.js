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

const visitsApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name":"ANDROID_APP",

  },
});

function fetchVisits(params) {
  let url = Config.VISITS_SERVICE.GET_VISITS;
  
  url += `?team=${params.agentid}`;
  url += `&date=${ HelperService.dateReadableFormatWithHyphen(params.startDate)}`;
//  console.log("vivivivivivivi", HelperService.dateReadableFormatWithHyphen(params.startDate))

  //url += `&queryType=${'self'}`;
  // console.log(url);

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      // console.log("gggggggghhhhheeeeeeeeeeeeeeeee", response);
      if (in200s(response.status)) {
        //  console.log("gggggggghhhhh", response).data.data;
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("jdnmfsufdfndkjgdugdgdoigu", error.response);
      return null;
    });
}

function planVisit(params) {
  // console.log("plan visit", params);
  // params.payload.map((obj) => {
  //   if (obj.visit_type__c == "Planned") {
  //     HelperService.removeField(obj, "local_id");
  //     HelperService.removeField(obj, "name");
  //   }
  // });

  let url = Config.VISITS_SERVICE.PLAN_VISIT;

  return visitsApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("fishhhhhhhhhhhhhhh", response["data"]);
        return response["data"];
      }
      return null;
    })
    .catch((error) => {
      // console.log("sleepppppppppp", error.response);

      return null;
    });
}

function cancelVisit(params) {
  let url = Config.VISITS_SERVICE.CANCEL_VISIT;
  url += `?id=${params.visit_id}`;

  return visitsApiClient
    .post(url, params, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function editVisit(params) {
  let url = Config.VISITS_SERVICE.EDIT_VISIT;
  // url += `?pg_id__c=${params.visit_id}`;
  //url += `&team__c=${params.team__c}`;
  // url += `&date=${params.visit_date__c}`;
  //let requestParams = _.cloneDeep(params);
  //	requestParams.visit_date__c = String(requestParams.visit_date__c)

  return visitsApiClient
    .post(url, params.form, {
      headers: {
        //Authorization: 'Bearer'+params.token,
        token: params.token,

        //'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("resspponnseeeeeeeeeee", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("resspponnseeeeeeeeeeerrrrrror", error.response);
      return null;
    });
}

function placeOrder(params) {
  let url = Config.VISITS_SERVICE.PLACE_ORDER;
  return visitsApiClient
    .post(url, params.payload, {
      headers: {
        token: params.token,
        //agentid: params.agentid,
        //'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["orderData"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function addVisitInfo(params) {
  // console.log("visitparams", params);
  let url = Config.VISITS_SERVICE.ADD_VISIT_INFO;

  return visitsApiClient
    .post(url, params.payload, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function startVisit(params) {
  let url = Config.VISITS_SERVICE.START_VISIT;
  // url += `?`;
  // url += params.visit_id ? `id=${params.visit_id}` : "";
  //url += params.agentid ? `&team__c=${params.agentid }` : '';
  // if (!params.accountnumber) {
  //   return null;
  // }
  // console.log("pparamssstrtstart", params);
  return visitsApiClient
    .post(url, params.payload, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log(response);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      HelperService.showToast({
        message: "Error! " + error.response.data.message,
        duration: 3000,
        buttonText: "Okay",
      });
      // console.log(error.response);
      return null;
    });
}

function endVisit(params) {
  // console.log("endvisit params",params);
  let url = Config.VISITS_SERVICE.END_VISIT;
  // url += `?`;
  // url += params.visit_id ? `id=${params.visit_id}` : "";
  //url += params.agentid ? `&team__c=${params.agentid }` : '';

  // if (!params.accountnumber) {
  //   return null;
  // }
  return visitsApiClient
    .post(url, params.payload, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("eeeeeeeeeennnnnnnnnnnnnnnnnnnnddddd", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log(
      //   "eeeeeeeeeennnnnnnnnnnnnnnnnnnndddddnnnnnnnnnnnnnnnnnn",
      //   error.response
      // );
      return null;
    });
}

function fetchVisitInfo(params) {
  // console.log("param", params);
  let url = Config.VISITS_SERVICE.FETCH_VISIT_INFO;
  url += `?`;
  url += `visitId=${params.visit_id}`;

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      // console.log("fetchhhhhh",error.response)
      return null;
    });
}

function fetchVisitImage(params) {
  let url = Config.VISITS_SERVICE.FETCH_VISIT_IMAGE;
  url += `?`;
  url += params.id ? `id=${params.id}` : "";
  if (!params.id) {
    return null;
  }

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["attachmentDetail"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function submitCompetitorForm(params) {
  let url = Config.VISITS_SERVICE.SUBMIT_COMPETITOR;
  url += `?visit__c=${params.visit__c}`;
  return visitsApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function submitStockForm(params) {
  let url = Config.VISITS_SERVICE.SUBMIT_STOCK;
  url += `?visit__c=${params.visit__c}`;
  return visitsApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function submitUpdateStockForm(params) {
  let url = Config.VISITS_SERVICE.UPDATE_STOCK;
  url += `?pg_id__c=${params.id}`;
  return visitsApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function submitUpdateCompetitorForm(params) {
  let url = Config.VISITS_SERVICE.UPDATE_COMPETITOR;
  url += `?id=${params.id}`;
  return visitsApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getCompetitor(params) {
  let url = Config.VISITS_SERVICE.GET_COMPETITOR;
  url += `?visit_id=${params.visit_id}`;

  if (!params.visit_id) {
    return null;
  }

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        let responseData = response["data"]["data"];
        return responseData;
      }
      return null;
    })
    .catch((error) => {
      //console.log(error.response)
      return null;
    });
}

function getStock(params) {
  // console.log("visit_id",params)
  let url = Config.VISITS_SERVICE.GET_STOCK;
  url += `?visits__c=${params.visit_id}`;

  if (!params.visit_id) {
    return null;
  }

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        let responseData = response["data"]["visit_info_stock"];
        return responseData;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getParentAreas(params) {
  let url = Config.VISITS_SERVICE.GET_PARENT_AREAS;
  url += `?sfid=${params.sfid}`;

  if (!params.sfid) {
    return null;
  }

  return visitsApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        let responseData = response["data"]["parents"];
        return responseData;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function createVisitInfo(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.VISITS_SERVICE.VISIT_INFO;
  // url += `?team_c=${params.team_c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return visitsApiClient
    .post(url, formData.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("visitinfooservice", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("visitinfooerror", error.response);
      return null;
    });
}

function getVisitSummary(params) {
  let url = Config.VISITS_SERVICE.VISIT_SUMMARY;
  url += `?zx_team=${params.id}`
  url+=`&fromdate=${HelperService.dateReadableFormatWithHyphen(params.fromdate)}`
  url+=`&todate=${HelperService.dateReadableFormatWithHyphen(params.todate)}`
  return visitsApiClient
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
      // console.log("eerrorrr",error.response)
      return null;
    });
}

function getVisitHistory(params) {
  let url = Config.VISITS_SERVICE.VISIT_HISTORY;
  url += `?account=${params.id}`
  return visitsApiClient
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
      // console.log("eerrorrr",error)
      return null;
    });
}

function updateVisitInfo(params) {
  // console.log("paramsssupdate",params)
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.VISITS_SERVICE.UPDATE_VISIT_INFO;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return visitsApiClient
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

export const visitsService = {
  fetchVisits,
  planVisit,
  cancelVisit,
  editVisit,
  placeOrder,
  addVisitInfo,
  endVisit,
  startVisit,
  fetchVisitInfo,
  fetchVisitImage,
  submitCompetitorForm,
  submitStockForm,
  getCompetitor,
  getStock,
  submitUpdateStockForm,
  submitUpdateCompetitorForm,
  getParentAreas,
  createVisitInfo,
  getVisitSummary,
  getVisitHistory,
  updateVisitInfo
};
