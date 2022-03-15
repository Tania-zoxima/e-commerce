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

const projectApiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name": "ANDROID_APP",
  },
});

function createProject(params) {
  // console.log("wwweeeeee",params)
  let formData = _.cloneDeep(params);

  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");

  let url = Config.PROJECT_SERVICE.CREATE;

  // console.log("sjhandadhjasd",url)
  return projectApiClient
    .post(url, formData.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("deeep",response.data)

        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("the", error.response);

      return null;
    });
}

function getBathroomCost(params) {
  // console.log("treee", params);
  let url = Config.PROJECT_SERVICE.BATHROOM_MASTER;
  // url += "?";
  // url += `pincodeGuid=${params.id}`;
  return projectApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("yuckkkk", response.data.data);
        return response.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      // console.log("errorrrpincodee", error.response);
      return null;
    });
}

function getProject(params) {
  let url = Config.PROJECT_SERVICE.GET_PROJECT;
  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}

function updateProject(params) {
  // console.log("paramsssupdate", params);
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  let url = Config.PROJECT_SERVICE.UPDATE_PROJECT;

  return projectApiClient
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
      // console.log("uuppdateeeeeeeee", error.response);
      return null;
    });
}

function projectCatalogue(params) {
  let url = Config.PROJECT_SERVICE.CATALOGUE;
  url += `?zx_substate=${params.zx_substate}`;
  url += `&zx_brandgroup=${params.zx_brandgroup}`;

  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}

function getProjectOpportunity(params) {
  let url = Config.PROJECT_SERVICE.GET_PROJECT_OPP;
  url += `?projectId=${params.projectId}`;
  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}

function getProductSold(params) {
  let url = Config.PROJECT_SERVICE.PRODUCT_SOLD;
  url += `?brandgroup=${params.brandgroup}`;
  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}

function getProductOffer(params) {
  let url = Config.PROJECT_SERVICE.PRODUCT_OFFER;
  url += `?projectId=${params.projectId}`;
  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}

function createProjectProduct(params) {
  let url = Config.PROJECT_SERVICE.CREATE_PRODUCT;
  return projectApiClient
    .post(url, params.form, {
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
      // console.log("the", error.response);

      return null;
    });
}

function getProjectProductSold(params) {
  let url = Config.PROJECT_SERVICE.PROJECT_PRODUCT_SOLD;
  url += `?zx_project=${params.zx_project}`;
  return projectApiClient
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
      // console.log("errorrrr", error.response);
      return null;
    });
}


export const projectService = {
  createProject,
  getBathroomCost,
  getProject,
  updateProject,
  projectCatalogue,
  getProjectOpportunity,
  getProductSold,
  getProductOffer,
  createProjectProduct,
  getProjectProductSold
};
