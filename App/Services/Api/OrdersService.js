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

const orderApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name": "ANDROID_APP",
  },
});

function createPrimaryOrder(params) {
  // console.log("Orderrrrrrrrrparams", {order: params.form1 , items:params.itemarry});

  //  formData = HelperService.removeField(formData, "agentid");

  let url = Config.ORDERS_SERVICE.CREATE_PRIMARY;
  // let url = "https://pp-backend.azurewebsites.net/order/createSecondaryOrder"
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';
  return orderApiClient
    .post(
      url,
      { order: params.form1, items: params.itemarry },
      {
        headers: {
          token: params.token,
        },
      }
    )
    .then((response) => {
      if (in200s(response.status)) {
        console.log("Orderrrrrrrrr", response.data);

        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("thewwwwwwwwwwwwww", error.response);

      return null;
    });
}

function fetchOrderDetails(params) {
  let url = Config.ORDERS_SERVICE.DETAIL;
  url += `?orderid=${params.order_id}`;

  if (!params.order_id) {
    return null;
  }

  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["order_line"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

// function fetchDealerOrderDetails(params) {
//   let url = Config.ORDERS_SERVICE.DEALER_ORDER_DETAIL;
//   url += `?orderid=${params.order_id}`;

//   if (!params.order_id) {
//     return null;
//   }

function fetchOrders(params) {
  // console.log("paramsssseeeeeeeeeeee");
  let url = Config.ORDERS_SERVICE.FETCH_ORDERS;
  url += `?zx_team=${params.order_id}`;
  // url += `?offset=${params.offset}&limit=${params.limit}`;
  // url += params.type ? `&type=${params.type}` : '';
  console.log("urllllll", url);
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.OrderOfMyTeam;
      }
      return null;
    })
    .catch((error) => {
      console.log("API FAIL=", error.response);
      return null;
    });
}

function getOrderCount(params) {
  console.log("paramssss");
  let url = Config.ORDERS_SERVICE.FETCH_ORDERS;
  url += `?zx_team=${params.order_id}`;
  url += `&offset=${params.offset}`;
  url += `&limit=${params.limit}`;
  // url += `?offset=${params.offset}&limit=${params.limit}`;
  // url += params.type ? `&type=${params.type}` : '';
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      console.log("API FAIL=", error.response);
      return null;
    });
}
// function fetchAllOrders(params) {
//   let url = Config.ORDERS_SERVICE.FETCH_ORDERS;
//   url += `?offset=${params.offset}&limit=${params.limit}`;
//   url += params.type ? `&type=${params.type}` : "";
//   return orderApiClient
//     .get(url, {
//       headers: {
//         Authorization: "Bearer " + params.token,
//         agentid: params.agentid,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       if (in200s(response.status)) {
//         return response["data"]["data"]["orders"];
//       }
//       return null;
//     })
//     .catch((error) => {
//       console.log("API FAIL=", error.response.data.message);
//       return null;
//     });
// }

function repeatOrder(params) {
  let url = Config.ORDERS_SERVICE.REPEAT_ORDER;
  url += `?order__c=${params.order__c}&order_date__c=${params.order_date__c}`;
  return orderApiClient
    .post(url, params, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
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
function getTransport(params) {
  let url = Config.ORDERS_SERVICE.GET_TRANSPORT;
  return orderApiClient
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

function getVariableDiscount(params) {
  // console.log("parammsmsmsmmsms", params)
  // let requestParams = {
  // 	guId: params.guId,
  //   };

  let url = Config.ORDERS_SERVICE.VARIABLE_DISCOUNT;

  return orderApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("teeeeeeeeeeeeeee", response)
        return response.data.data[0];
      }
      return null;
    })
    .catch((error) => {
      // console.log("teeeeeeeeeeeeeeemmmmm", error.response)
      return null;
    });
}

function getOrderLocation(params) {
  let url = Config.ORDERS_SERVICE.ORDER_LOCATION;
  url += `?distributor=${params.distributor_id}`;
  url += `&product=${params.product_id}`;
  url += `&zx_productgroup=${params.zx_productgroup}`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("sucessssss",response)
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("faillll",error.response)
      return null;
    });
}
function getOrderLine(params) {
  let url = Config.ORDERS_SERVICE.ORDER_LINE;
  url += `?Id=${params.order_id}`;
  // url += `&product=${params.product_id}`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        console.log("sucessssss", response);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      console.log("faillll", error.response);
      return null;
    });
}

function fetchSecondaryOrders(params) {
  let url = Config.ORDERS_SERVICE.SECONDARY_ORDER;
  url += `?zx_team=${params.order_id}`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.OrderOfMyTeam;
      }
      return null;
    })
    .catch((error) => {
      console.log("errorrrrrr", error.response);
      return null;
    });
}

function getSecondaryCount(params) {
  let url = Config.ORDERS_SERVICE.SECONDARY_ORDER;
  url += `?zx_team=${params.order_id}`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      console.log("errorrrrrr", error.response);
      return null;
    });
}

function createSecondaryOrder(params) {
  let url = Config.ORDERS_SERVICE.CREATE_SECONDARY;
  return orderApiClient
    .post(
      url,
      { order: params.form1, items: params.itemarry },
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
function fetchRegularOrders(params) {
  let url = Config.ORDERS_SERVICE.REGULAR_ORDERS;
  url += `?accountid=${params.id}`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
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

function getParty(params) {
  let url = Config.ORDERS_SERVICE.GET_PARTY;
  url += `?team_id=${params.id}`;
  url += `&nolimit=20`;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        // agentid: params.agentid,
        "Content-Type": "application/json",
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

function getGoodReturn(params) {
  let url = Config.ORDERS_SERVICE.GOOD_RETURN;
  url += `?teamid=${params.id}`;
  url += `&returnordertype=${params.type}`;
  params.fromdate
    ? (url += `&fromDate=${HelperService.dateReadableFormatWithHyphen(
        params.fromdate
      )}`)
    : null;
  params.todate
    ? (url += `&toDate=${HelperService.dateReadableFormatWithHyphen(
        params.todate
      )}`)
    : null;
  console.log("urllll", url);
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        console.log("dataaaaaaaaaa", response);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      console.log("errorrrr", error.response);
      return null;
    });
}

function createPrimaryGood(params) {
  let url = Config.ORDERS_SERVICE.CREATE_PRIMARY_GOOD;
  return orderApiClient
    .post(url, params.form1, {
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

function getSecondaryGood(params) {
  let url = Config.ORDERS_SERVICE.GOOD_RETURN;
  url += `?teamid=${params.id}`;
  url += `&returnordertype=${params.type}`;
  params.fromdate
    ? (url += `&fromDate=${HelperService.dateReadableFormatWithHyphen(
        params.fromdate
      )}`)
    : null;
  params.todate
    ? (url += `&toDate=${HelperService.dateReadableFormatWithHyphen(
        params.todate
      )}`)
    : null;
  return orderApiClient
    .get(url, {
      headers: {
        token: params.token,
        "Content-Type": "application/json",
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

function createSecondaryGood(params) {
  let url = Config.ORDERS_SERVICE.CREATE_PRIMARY_GOOD;
  return orderApiClient
    .post(url, params.form1, {
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

export const ordersService = {
  repeatOrder,
  fetchOrders,
  fetchOrderDetails,
  // fetchDealerOrderDetails,
  getTransport,
  createPrimaryOrder,
  getVariableDiscount,
  getOrderLocation,
  getOrderLine,
  fetchSecondaryOrders,
  createSecondaryOrder,
  fetchRegularOrders,
  getParty,
  getOrderCount,
  getSecondaryCount,
  getGoodReturn,
  createPrimaryGood,
  getSecondaryGood,
  createSecondaryGood,
};
