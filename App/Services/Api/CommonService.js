import axios from "axios";
import { Config } from "App/Config";
import { is, curryN, gte } from "ramda";
import { HelperService } from "App/Services/Utils/HelperService";

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

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name":"ANDROID_APP"
  },
});

function getAgentAreaPjp(params) {
  let url = Config.COMMON_SERVICE.AREA_PJP;
  url += `?team_id__c=${params.team__c}`;
  // url += params.date ?`&date=${params.date}` : '';

  return userApiClient
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

function getObjective(params) {
  let url = Config.COMMON_SERVICE.GET_OBJECTIVE;

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["objective"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function uploadImage(params) {
  //  console.log("imageparams",params)
  let url = Config.COMMON_SERVICE.UPLOAD_IMAGE;
  const formData = new FormData();
  //  console.log("savvevevev", formData)

  formData.append("images", {
    uri: params.images,
    name: `image.png`,
    type: `image/png`,
  });
  console.log("DDDttttttaaaaaMultiple",formData)
  return userApiClient
    .post(url, formData, {
      headers: {
        token: params.token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("responseparams",response.data.URL)

        return response.data.URL;
      }
      return null;
    })
    .catch((error) => {
      // console.log("imagesss", error.response)
      return null;
    });
}

function getState(params) {
  let url = Config.COMMON_SERVICE.GET_STATE;

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["state"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getCity(params) {
  let url = Config.COMMON_SERVICE.GET_CITY;

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["city"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getAllCity(params) {
  let url = Config.COMMON_SERVICE.GET_ALL_CITY;

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["city"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getBeat(params) {
  let url = Config.COMMON_SERVICE.GET_BEAT;
  url += params.payload.id ? `?id=${params.payload.id}` : "";

  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["beat"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getRetailerArea(params) {
  let url = Config.COMMON_SERVICE.GET_RETAILER_AREA;
  url += params.payload.city ? `?city=${params.payload.city}` : "";

  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["areas"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getDealerType(params) {
  let url = Config.COMMON_SERVICE.GET_DEALER_TYPE;
  url += `?type=${params.type}`;

  return userApiClient
    .get(url, {
      headers: {
        token: "Bearer " + params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["dealer_type"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getDistChannel(params) {
  let url = Config.COMMON_SERVICE.DIST_CHANNEL;
  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["dist_channel"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}
function getAllPlant(params) {
  let url = Config.COMMON_SERVICE.GET_ALL_PLANT;
  url += `?area__c=${params.team__c}`;

  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["plants"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getIncoTerm(params) {
  let url = Config.COMMON_SERVICE.GET_ALL_INCOTERM;

  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["incoterms"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getAllRoute(params) {
  let url = Config.COMMON_SERVICE.GET_ALL_ROUTE;
  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["routes"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getAllInsurance(params) {
  let url = Config.COMMON_SERVICE.GET_ALL_INSURANCE;
  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["insurancetype"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getBillParty(params) {
  let url = Config.COMMON_SERVICE.GET_BILL_PARTY;
  url += `?id=${params.id}`;

  return userApiClient
    .get(url, {
      headers: {
        token: params.payload.token,
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
function getAllNotifications(params) {
  let url = Config.COMMON_SERVICE.NOTIFICATIONS;
  url += `?team=${params.id}`;

  return userApiClient
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
      console.log("erorrr", error.response);
      return null;
    });
}

function singleImage(params) {
  console.log("imageparams", params);
  let url = Config.COMMON_SERVICE.SINGLE_IMAGE;
  const formData = new FormData();
  // console.log("savvevevev", formData)

  formData.append("image", {
    uri: params.image,
    name: `image.png`,
    type: `image/png`,
  });
  console.log("DDDttttttaaaaa", formData);
  return userApiClient
    .post(url, formData, {
      headers: {
        token: params.token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // console.log("responseparams", response.data.URL);
      if (in200s(response.status)) {
      console.log("responseparams",response)

        return response.data.URL;
      }
      return null
    })
  .catch(error => {
      console.log("imagesss", error.response)
    return null
  });
}
export const CommonService = {
  getAgentAreaPjp,
  getObjective,
  uploadImage,
  getState,
  getCity,
  getBeat,
  getRetailerArea,
  getDealerType,
  getDistChannel,
  getAllPlant,
  getIncoTerm,
  getAllRoute,
  getAllInsurance,
  getBillParty,
  getAllCity,
  getAllNotifications,
  singleImage,
};
