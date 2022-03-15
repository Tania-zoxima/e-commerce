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

const dashboardApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name":"ANDROID_APP",

  },
});

function getDashboardSummary(params) {
  let url = Config.DASHBOARD_SERVICE.DASHBOARD_DETAILS;
  //  url += '?'
  // url += `sfid=${params.psm__c}`
  // console.log("ppppparams",params)
  return dashboardApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("detailssssssssssssssss",response.data.data)
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      //   console.log("eeeeerrrrrrroooooooo",error.response)
      return null;
    });
}

function getOrderValue(params) {
  let url = Config.DASHBOARD_SERVICE.ORDER_VALUE;
  url += `?`;
  url += params.startDate ? `startDate=${params.startDate}` : "";
  url += params.endDate ? `&endDate=${params.endDate}` : "";
  url += params.psm__c ? `&psm__c=${params.psm__c}` : "";
  url += `&offset=0`;
  url += `&limit=1000`;

  return dashboardApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["counters"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getCounters(params) {
  let url = Config.DASHBOARD_SERVICE.COUNTERS;
  url += `?`;
  url += params.startDate ? `startDate=${params.startDate}` : "";
  url += params.endDate ? `&endDate=${params.endDate}` : "";
  url += params.psm__c ? `&psm__c=${params.psm__c}` : "";
  url += `&offset=0`;
  url += `&limit=1000`;

  return dashboardApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["counters"];
      }
      return null;
    })
    .catch((error) => {
      // console.log('API FAIL = ', error)
      return null;
    });
}

function getSiteCount(params) {
  let url = Config.DASHBOARD_SERVICE.SITE_COUNT;
  url += `?`;
  url += params.startDate ? `startDate=${params.startDate}` : "";
  url += params.endDate ? `&endDate=${params.endDate}` : "";
  url += params.psm__c ? `&psm__c=${params.psm__c}` : "";
  url += `&offset=0`;
  url += `&limit=1000`;

  return dashboardApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["counters"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getVisitCount(params) {
  let url = Config.DASHBOARD_SERVICE.VISIT_COUNT;
  url += `?`;
  url += params.startDate ? `startDate=${params.startDate}` : "";
  url += params.endDate ? `&endDate=${params.endDate}` : "";
  url += params.psm__c ? `&psm__c=${params.psm__c}` : "";
  url += `&offset=0`;
  url += `&limit=1000`;

  return dashboardApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["counters"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getEventCount(params) {
  let url = Config.DASHBOARD_SERVICE.EVENTS_COUNT;
  url += `?`;
  url += params.startDate ? `startDate=${params.startDate}` : "";
  url += params.endDate ? `&endDate=${params.endDate}` : "";
  url += params.psm__c ? `&psm__c=${params.psm__c}` : "";
  url += `&offset=0`;
  url += `&limit=1000`;

  return dashboardApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["counters"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getDashboardBanner(params) {
  let url = Config.DASHBOARD_SERVICE.BRANDING;
  url += `?zx_brandgroup=${params.zx_brandgroup}`;
  url += `&zx_publishon=${params.zx_publishon}`;
  return dashboardApiClient
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
      console.log("baanerrr", error.response);
      return null;
    });
}

function getTicker(params) {
  let url = Config.DASHBOARD_SERVICE.TICKER;
  url += "?";
  url += `zx_brandgroup=${params.zx_brandgroup}`;
  url += `&zx_publishon=SFA`;
  // console.log("url",url)

  return dashboardApiClient
    .get(url, {
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

function getPrimarySummary(params) {
  let url = Config.DASHBOARD_SERVICE.PRIMARY_ORDER_SUMMARY;
  url += `?team=${params.id}`;
  url += `&fromdate=${HelperService.dateReadableFormatWithHyphen(
    params.fromdate
  )}`;
  url += `&todate=${HelperService.dateReadableFormatWithHyphen(params.todate)}`;
  return dashboardApiClient
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
      console.log("eerrorrr", error);
      return null;
    });
}
function getSecondarySummary(params) {
  let url = Config.DASHBOARD_SERVICE.SECONDARY_ORDER_SUMAARY;
  url += `?team=${params.id}`;
  url += `&fromdate=${HelperService.dateReadableFormatWithHyphen(
    params.fromdate
  )}`;
  url += `&todate=${HelperService.dateReadableFormatWithHyphen(params.todate)}`;
  return dashboardApiClient
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
      console.log("eerrorrr", error);
      return null;
    });
}

function getAllBrands(params) {
  console.log("pppppppp", params);
  let url = Config.DASHBOARD_SERVICE.GET_BRAND;
  url += `?zx_brandgroup=${params.zx_brandgroup}`;
  return dashboardApiClient
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
      console.log("errorrrr", error.response);
      return null;
    });
}

function getAllClass(params) {
  let url = Config.DASHBOARD_SERVICE.GET_CLASS;

  return dashboardApiClient
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

function subArea(params) {
  console.log("userrsss", params);
  let url = Config.DASHBOARD_SERVICE.GET_SUB_AREA;
  url += `?zx_team=${params.id}`;

  return dashboardApiClient
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
      console.log("errorrrr", error.response);
      return null;
    });
}

function dashboardOrderFilter(params) {
	// console.log("dddddddddddd",params)
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  let url = Config.DASHBOARD_SERVICE.FILTER;

  return dashboardApiClient
    .post(url, formData.forms, {
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
    console.log("competitorerror", error.response)
      return null;
    });
}

function getDrs(params) {
  let url = Config.DASHBOARD_SERVICE.DSR_DASHBOARD;
  // url += `?`;
  url += `?teamId=${params.id}`;

  return dashboardApiClient
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
      return null;
    });
}

export const dashboardService = {
  getOrderValue,
  getCounters,
  getSiteCount,
  getVisitCount,
  getEventCount,
  getDashboardSummary,
  getDashboardBanner,
  getTicker,
  getPrimarySummary,
  getSecondarySummary,
  getAllBrands,
  getAllClass,
  subArea,
  dashboardOrderFilter,
  getDrs,
};
