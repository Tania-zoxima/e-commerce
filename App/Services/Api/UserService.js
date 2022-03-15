import axios from "axios";
import { Config } from "App/Config";
import { is, curryN, gte } from "ramda";
import _ from "lodash";
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
    "client-name": "ANDROID_APP",
  },
});

function fetchUser() {
  // Simulate an error 50% of the time just for testing purposes
  if (Math.random() > 0.5) {
    return new Promise(function(resolve, reject) {
      resolve(null);
    });
  }

  let number = Math.floor(Math.random() / 0.1) + 1;

  return userApiClient.get(number.toString()).then((response) => {
    if (in200s(response.status)) {
      return response.data;
    }

    return null;
  });
}

function loginUser(params) {
  let url = Config.USER_SERVICE.LOGIN_URL;
  // console.log("urlll",url)
  // url += `?username=${params.username}&password=${params.password}`;
  return userApiClient
    .post(url, {
      username: params.username,
      password: params.password,
      usertype: "SFA",
      firebaseToken: params.firebaseToken,
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }

      return null;
    })
    .catch((error) => {
      // console.log("faillluserrr", error.response);
      return null;
    });
}

function loginUserSession(params) {
  let url = Config.USER_SERVICE.LOGIN_SESSION;
  // url += `?username=${params.username}&password=${params.password}`;
  return userApiClient
    .post(
      url,
      {
        zx_user: params.id,
      },
      {
        headers: {
          token: params.token,
        },
      }
    )
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

// function getAllPSM(params) {
//   return userApiClient.get(Config.USER_SERVICE.FETCH_ALL_PSM, {
//     headers: {
//       Authorization: 'Bearer ' + params.token,
//       agentid: params.agentid,
//       'Content-Type': 'application/json'
//     }
//   }).then((response) => {
//     if (in200s(response.status)) {
//       return response['data']['data']['psm'];
//     }
//     return null
//   }).catch(error => {
//     console.log(error.response)
//     return null
//   });
// }

function logoutUser(params) {
  let url = Config.USER_SERVICE.LOG_OUT;
  // url += `?sfid=${params.id}`
  return userApiClient
    .post(
      url,
      {
        zx_user: params.id,
      },
      {
        headers: {
          token: params.token,
        },
      }
    )
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

function logoutUserSession(params) {
  let url = Config.USER_SERVICE.LOGOUT_SESSION;
  // url += `?sfid=${params.id}`
  return userApiClient
    .post(
      url,
      {
        zx_user: params.data.id,
      },
      {
        headers: {
          token: params.data.token,
        },
      }
    )
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("ssssssssssssssssssssss",response.data)
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("ssssssssssssssssssssssaaaaaaaaaaaaaaaaa",error.response)
      return null;
    });
}

function startDay(params) {
  let requestParams = {
    // latitude: String(params.latitude),
    // longitude: String(params.longitude),
    // date: String(params.date),
    // team__c: params.team__c,
    // type: params.type,
    user: params.user,
    type: params.type,
    longitude: params.longitude,
    latitude: params.latitude,
    attendanceDate: String(params.date),
  };
  if (params.present_type) {
    requestParams["present"] = params.present_type;
  }

  return userApiClient
    .post(Config.USER_SERVICE.START_DAY_URL, requestParams, {
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

function endDay(params) {
  let requestParams = {
    // area: params.area,

    //  latitude: String(params.latitude),
    //  longitude: String(params.longitude),
    date: String(params.date),
    user: params.user,
  };
  return userApiClient
    .post(Config.USER_SERVICE.END_DAY_URL, requestParams, {
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

function markUserAbsent(params) {
  let requestParams = {
    user: params.user,
    type: params.type,
    latitude: String(params.latitude),
    longitude: String(params.longitude),

    attendanceDate: String(params.date),
    absent: params.absent,
  };

  return userApiClient
    .post(Config.USER_SERVICE.START_DAY_URL, requestParams, {
      headers: {
        Token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // todo:  change to (in200s(response.status))

        return response.data;
      }

      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getAgentAreas(params) {
  let url = Config.USER_SERVICE.FETCH_AREAS_URL;
  url += `?team__c=${params.team__c}`;

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["areas"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getAgentDetails(params) {
  return userApiClient
    .get(Config.USER_SERVICE.FETCH_AGENT_DETAILS, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
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

function checkAttendance(params) {
  let url = Config.USER_SERVICE.CHECK_ATTENDANCE;
  url += `?userGuId=${params.team__c}`;
  // url += `&userDate=${params.date}`;
  // console.log("Alll Out", params);

  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("result hsdsdn", response.data.data);
        return response.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      // console.log("check attendence", error.response);
      return null;
    });
}

function getAllPSM(params) {
  // let requestParams = {
  // 	managerId: params.manager_id,
  //   };

  // let url = Config.USER_SERVICE.FETCH_ALL_PSM;

  let url = "http://23.99.255.183/login/getSubordinate";

  return userApiClient
    .post(
      url,
      {
        managerId: params.manager_id,
      },
      {
        headers: {
          token: params.token,
        },
      }
    )
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("manager", error.response);
      return null;
    });
}

function getAppVersion(params) {
  // console.log("hhhhhhhhhh,params", params);
  let url = Config.USER_SERVICE.GET_APP_VERSION;
  return userApiClient
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
      return null;
    });
}

function getProfile(params) {
  let url = Config.USER_SERVICE.GET_PROFILE;
  url += `?teamGuid=${params.id}`;
  return userApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("profielle", response);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function resetPassword(params) {
  // console.log(params);
  let url = Config.USER_SERVICE.RESET_PASSWORD;
  let body = {
    username: params.username,
    password: params.password,
    new_password: params.new_password,
  };

  return userApiClient
    .post(url, body, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("erorrrreset", error.response);
      return null;
    });
}

function getOtp(params) {
  // console.log("gggeeeetttt", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.USER_SERVICE.GET_OTP;

  return userApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("tigerrrrrr", response.data);

        return response.data.success;
      }
      return null;
    })
    .catch((error) => {
      // console.log("tigerrrrrr", error.response);
      return null;
    });
}

function resetOtp(params) {
  // console.log("gggeeeetttt", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.USER_SERVICE.RESET_OTP;

  return userApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("tigerrrrrr", response.data);

        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("tigerrrrrr", error.response);
      return null;
    });
}

function uploadProfile(params) {
  // console.log("theeee", params);
  let formData = _.cloneDeep(params.payload);

  // console.log("gggeeeettttnnlll", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  formData = HelperService.removeField(formData, "token");

  let url = Config.USER_SERVICE.UPLOAD_PROFILE;

  return userApiClient
    .post(url, formData, {
      headers: {
        token: params.payload.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("tigerrrrrr", response);

        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("tigerrrrrrdddd", error.response);
      return null;
    });
}

function resetPasswordOtp(params) {
  // console.log("gggeeeetttt", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.USER_SERVICE.RESET_PASSWORD_OTP;

  return userApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("tigerrrrrr", response.data);

        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("tigerrrrrr", error.response);
      return null;
    });
}

function subArea(params) {
  // console.log("userrsss", params);
  let url = Config.USER_SERVICE.SUB_AREA;
  url += "?";
  url += `zx_team=${params.agentid}`;

  return userApiClient
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

export const userService = {
  fetchUser,
  loginUser,
  startDay,
  endDay,
  markUserAbsent,
  getAgentAreas,
  getAgentDetails,
  checkAttendance,
  getAllPSM,
  logoutUser,
  getAppVersion,
  getProfile,
  loginUserSession,
  logoutUserSession,
  resetPassword,
  getOtp,
  resetOtp,
  uploadProfile,
  resetPasswordOtp,
  subArea,
};
