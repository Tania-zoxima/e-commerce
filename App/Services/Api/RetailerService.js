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

const retailerApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-name": "ANDROID_APP",
  },
});

function createRetailer(params) {
  let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  //formData = HelperService.removeField(formData, 'postal_code');
  let url = Config.RETAILER_SERVICE.CREATE;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return retailerApiClient
    .post(url, formData.form, {
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

function updateRetailer(params) {
  // console.log("updateeeeparamsss", params);
  let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");

  const url = Config.RETAILER_SERVICE.UPDATE_RETAILER;
  // url += `?team__c=${params.team__c}`;

  return retailerApiClient
    .post(url, formData.form1, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("kkkkkkkkdata", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("erroeeeupdate", error.response);
      return null;
    });
}

function EditRetailer(params) {
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "token");
  let url = Config.RETAILER_SERVICE.EDIT_RETAILER;
  return retailerApiClient
    .post(url, formData, {
      headers: {
        token: "Bearer " + params.token,
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

function fetchRetailers(params) {
  // console.log("pppppppppp",params)
  let url = Config.RETAILER_SERVICE.FETCH_RETAILERS;
  url += "?";
  url += `team_id=${params.agentid}`;
  url += `&nolimit=20`;
  return retailerApiClient
    .get(
      url,

      {
        headers: {
          token: params.token,
        },
      }
    )
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("Retailer", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("Retailerssssss", error.response);

      return null;
    });
}

function fetchCreditLimit(params) {
  let url = Config.RETAILER_SERVICE.FETCH_CREDIT_LIMIT;
  url += `?account_id=${params.account_id}`;

  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["divisions"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDealers(params) {
  let url = Config.RETAILER_SERVICE.FETCH_DEALERS;
  url += `?offset=${params.offset}&limit=${params.limit}&type=Dealer`;
  url += params.area ? `&area_id=${params.area}` : "";
  url += params.search ? `&search=${params.search}` : "";
  return retailerApiClient
    .get(url, {
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

function fetchRetailerDealerByLocation(params) {
  let url = Config.RETAILER_SERVICE.SEARCH_BY_LOCATION;
  url += `?offset=${params.offset}&limit=${params.limit}`;
  url += params.latitude ? `&lat=${params.latitude}` : "";
  url += params.longitude ? `&long=${params.longitude}` : "";
  return retailerApiClient
    .get(url, {
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

function fetchRetailerOrders(params) {
  // console.log("Orderrrtttt", params);
  let url = Config.RETAILER_SERVICE.FETCH_ORDERS;
  url += "?";
  url += `zx_orderfrom=${params.id}`;

  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("resultttt", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("API FAILSS=", error.response);
      return null;
    });
}

function fetchDealerOrders(params) {
  let url = Config.RETAILER_SERVICE.FETCH_ORDERS;
  url += `?sfid=${params.sfid}&order_date=${params.date}`;
  return retailerApiClient
    .get(url, {
      headers: {
        token: "Bearer " + params.token,
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

function deleteOrderLine(params) {
  let url = Config.RETAILER_SERVICE.DELETE_ORDER_LINE;
  url += `?id=${params.id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        token: "Bearer " + params.token,
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

function editOrderQuantity(params) {
  let url = Config.RETAILER_SERVICE.EDIT_ORDER_LINE;
  //url += `?id=${params.id}`;
  let formData = _.cloneDeep(params);

  formData = HelperService.removeField(formData, "token");

  return retailerApiClient
    .post(url, formData, {
      headers: {
        token: "Bearer " + params.token,
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

function addOrderLine(params) {
  let url = Config.RETAILER_SERVICE.ADD_ORDER_LINE;
  //url += `?id=${params.id}`;
  let formData = _.cloneDeep(params);

  formData = HelperService.removeField(formData, "token");

  return retailerApiClient
    .post(url, formData, {
      headers: {
        token: "Bearer " + params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["order_line"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDealerInvoice(params) {
  let url = Config.RETAILER_SERVICE.FETCH_DEALER_INVOICE;
  url += `?offset=${params.offset}&limit=${params.limit}&sellerid=${params.seller_id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["dealer-invoices"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDealerOutstanding(params) {
  let url = Config.RETAILER_SERVICE.FETCH_DEALER_OUTSTANDING;
  url += `?offset=${params.offset}&limit=${params.limit}&sellerid=${params.seller_id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["outstandings"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDealerPayments(params) {
  let url = Config.RETAILER_SERVICE.FETCH_DEALER_PAYMENTS;
  url += `?sellerid=${params.seller_id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["payments"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function updateRetailerLocation(params) {
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "local_id");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "seller_id");
  formData = HelperService.removeField(formData, "agentid");

  let url = Config.RETAILER_SERVICE.UPDATE_LOCATION;
  url += `?party__c=${params.seller_id}`;

  return retailerApiClient
    .post(url, formData, {
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

function fetchRetailerCompetitors(params) {
  let url = Config.RETAILER_SERVICE.FETCH_COMPETITORS;
  // url += `?team__c=${params.team__c}`
  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["competitor"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchInvoiceDetail(params) {
  let url = Config.RETAILER_SERVICE.INVOICE_DETAIL;
  url += `&invoiceid=${params.invoice_id}`;

  if (!params.invoice_id) {
    return null;
  }
  return retailerApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["invoice-line-items"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDealerOrderDetail(params) {
  let url = Config.RETAILER_SERVICE.DEALER_ORDER_DETAILS;
  url += `&orderid=${params.order_id}`;

  if (!params.invoice_id) {
    return null;
  }

  return retailerApiClient
    .get(url, {
      headers: {
        Authorization: "Bearer " + params.token,
        agentid: params.agentid,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["dealer-orederLineItems"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function submitPaymentsForm(params) {
  let url = Config.RETAILER_SERVICE.SUBMIT_PAYMENT;
  return retailerApiClient
    .post(
      url,
      { payment: params },
      {
        headers: {
          Authorization: "Bearer " + params.token,
          agentid: params.agentid,
          "Content-Type": "application/json",
        },
      }
    )
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

function getComplaintType(params) {
  let url = Config.RETAILER_SERVICE.GET_COMPLAINT_TYPE;
  // url += `?team__c=${params.team__c}`

  return userApiClient
    .get(url, {
      headers: {
        token: "Bearer " + params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["complainType"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function getComplaints(params) {
  let url = Config.RETAILER_SERVICE.GET_COMPLAINTS;
  // url += `?team__c=${params.team__c}`

  return userApiClient
    .get(url, {
      headers: {
        token: "Bearer " + params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["complainType"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function createCompetitor(params) {
  let url = Config.RETAILER_SERVICE.CREATE_COMPETITOR;
  return retailerApiClient
    .post(
      url,
      { name: params.Name },
      {
        headers: {
          token: "Bearer " + params.token,
        },
      }
    )
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"][0];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDsr(params) {
  let url = Config.RETAILER_SERVICE.GET_DSR;
  url += `?sfid=${params.sfid}`;
  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"]["DSR"];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function fetchDsrArea(params) {
  let url = Config.RETAILER_SERVICE.GET_DSR_AREA;
  url += `?sfid=${params.sfid}`;

  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
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
function fetchDsrAreaList(params) {
  let url = Config.RETAILER_SERVICE.GET_DSR_AREA_L4;
  url += `?team__c=${params.sfid}`;

  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
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

function createDsr(params) {
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "local_id");
  formData = HelperService.removeField(formData, "token");
  let url = Config.RETAILER_SERVICE.CREATE_DSR;
  return retailerApiClient
    .post(url, formData, {
      headers: {
        token: "Bearer " + params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response["data"]["data"][0];
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
}

function createDsrArea(params) {
  let formData = _.cloneDeep(params);
  formData = HelperService.removeField(formData, "id");
  formData = HelperService.removeField(formData, "token");

  let url = Config.RETAILER_SERVICE.ADD_DSR_AREA;
  url += `?id=${params.id}`;

  return retailerApiClient
    .post(
      url,
      { area: [formData.area__c] },
      {
        headers: {
          token: "Bearer " + params.token,
        },
      }
    )
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

function getCustomerInfo(params) {
  let url = Config.RETAILER_SERVICE.GET_CUSTOMER_INFO;
  url += "?";
  url += `customerId=${params.customerId}`;
  return retailerApiClient
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
      // console.log("infoooooerrorrr",error.response)
      return null;
    });
}

function getCustomerVisit(params) {
  // console.log("paramsss", params);
  let url = Config.RETAILER_SERVICE.GET_CUSTOMER_VISIT;
  url += "?";
  url += `customer=${params.id}`;
  url += `&zx_currentdate=${params.date}`;
  params.objective ? (url += `&visitobjective=${params.objective}`) : null;
  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("hhhhh", response);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("hhhhh", error.response);
      return null;
    });
}

function getCustomerInvoice(params) {
  let url = Config.RETAILER_SERVICE.GET_CUSTOMER_INVOICE;
  url += "?";
  url += `account=${params.id}`;
  return retailerApiClient
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

function getCustomerComplaint(params) {
  let url = Config.RETAILER_SERVICE.GET_CUSTOMER_COMPLAINT;
  // url += '?'
  // url += `customerId=${params.id}`
  // console.log("complaint", params);
  return retailerApiClient
    .post(url, params.form, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("compalintservice..........", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("eeeeerrrrrrroooooooocompalint", error.response);
      return null;
    });
}

function createComplaint(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.RETAILER_SERVICE.CREATE_COMPLAINT;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return retailerApiClient
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
      // console.log("the", error.response);
      return null;
    });
}

function getCustomerInvoiceLines(params) {
  let url = Config.RETAILER_SERVICE.GET_CUSTOMER_INVOICE_LINES;
  url += "?";
  params.id ? (url += `account=${params.id}`) : null;
  params.invoice ? (url += `invoiceId=${params.invoice}`) : null;
  return retailerApiClient
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
      // console.log("compalintservice..........", error.response);
      return null;
    });
}

function getAllLocation(params) {
  // console.log("pppppppppppppppppppp", params);
  let url = Config.RETAILER_SERVICE.GET_LOCATION;
  return retailerApiClient
    .get(url, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("failllocationmillgyi", response.data.data);

        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("failllocation", error.response);

      return null;
    });
}

function getNatureCode(params) {
  // console.log("pppppppppppppppppppp", params);
  let url = Config.RETAILER_SERVICE.GET_NATURE_CODE;
  return retailerApiClient
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

function getCustomerAddress(params) {
  let url = Config.RETAILER_SERVICE.GET_ADDRESS;
  // url += '?'
  // url += `customerId=${params.id}`
  // console.log("ADDRESS", params);
  return retailerApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("addressservice..........", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("eeeeerrrrrrrooooooooaddress", error.response);
      return null;
    });
}

// function createComplaint(params) {
//   let formData = _.cloneDeep(params);
//   //  formData = HelperService.removeField(formData, "agentid");
//   formData = HelperService.removeField(formData, "token");
//   formData = HelperService.removeField(formData, "local_id");
//   // formData = HelperService.removeField(formData, "team__c");
//   // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
//   let url = Config.RETAILER_SERVICE.CREATE_COMPLAINT;
//   // url += `?team__c=${params.team__c}`;
//   //url += params.type ? `&type=${params.type}` : '';

//     return retailerApiClient
//       .post(url, formData.form, {
//         headers: {
//           token: params.token,
//            },
//       })
//       .then((response) => {
//         if (in200s(response.status)) {
//           return response.data;
//           }
//         return null;
//       })
//       .catch((error) => {

//   console.log("the", error.response)
//       return null;
//       });
//   }

// function getCustomerInvoiceLines(params) {
//   let url = Config.RETAILER_SERVICE.GET_CUSTOMER_INVOICE_LINES
//   url += '?'
//   url += `invoice=${params.id}`
//   return retailerApiClient
//     .get(url,{
//       headers: {
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
//       },
//     })
//     .then((response) => {
//     if (in200s(response.status)) {
//       return response.data.data
//     }
//     return null
//     })
//     .catch((error) => {
//     return null
//     })
//   }

// function getAllLocation(params) {
//   console.log("pppppppppppppppppppp",params)
//   let url = Config.RETAILER_SERVICE.GET_LOCATION;
//   return retailerApiClient
//     .get(url, {
//       headers: {
//         token:params.token,

//       },
//     })
//     .then((response) => {
//       if (in200s(response.status)) {
//         console.log("failllocationmillgyi",response.data.data)

//         return response.data.data;

//       }
//       return null;
//     })
//     .catch((error) => {

//       console.log("failllocation",error.response)

//       return null;
//     });
// }

// function getNatureCode(params) {
//   console.log("pppppppppppppppppppp",params)
//   let url = Config.RETAILER_SERVICE.GET_NATURE_CODE;
//   return retailerApiClient
//     .get(url, {
//       headers: {
//         token:params.token,
//       },
//     })
//     .then((response) => {
//       if (in200s(response.status)) {
//         return response.data.data;
//       }
//       return null;
//     })
//     .catch((error) => {
//       return null;
//     });
// }

function createAddress(params) {
  // console.log("rrrrretryyyyyy", params);

  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.RETAILER_SERVICE.CREATE_ADDRESS;
  // url += `?team__c=${params.team__c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return retailerApiClient
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
      return null;
    });
}

// function getCustomerAddress(params) {
//   let url = Config.RETAILER_SERVICE.GET_ADDRESS;
//   // url += '?'
//   // url += `customerId=${params.id}`
//   console.log("ADDRESS", params);
//   return retailerApiClient
//     .post(url, params.form, {
//       headers: {
//         token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
//       },
//     })
//     .then((response) => {
//       if (in200s(response.status)) {
//         console.log("addressservice..........", response.data.data);
//         return response.data.data;
//       }
//       return null;
//     })
//     .catch((error) => {
//       console.log("eeeeerrrrrrrooooooooaddress", error.response);
//       return null;
//     });
// }
function createContact(params) {
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.RETAILER_SERVICE.CREATE_CONTACT;
  // url += `?team_c=${params.team_c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return retailerApiClient
    .post(url, formData.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("contactervice", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("contacterror", error.response);
      return null;
    });
}

function getContact(params) {
  // console.log("paramsscontact", params);
  // let requestParams = {
  // 	guId: params.guId,
  //   };

  let url = Config.RETAILER_SERVICE.GET_CONTACT;
  // let url = "https://pp-backend.azurewebsites.net/contact/getContact"

  return retailerApiClient
    .post(url, params.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("responseee", response.data.data);
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("erorecontact", error.response);
      return null;
    });
}

function getPincodeInfo(params) {
  let url = Config.RETAILER_SERVICE.GET_PINCODE_INFO;
  url += "?";
  url += `pincodeGuid=${params.id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("errorrrpincodee", error.response);
      return null;
    });
}

function getAreaInfo(params) {
  let url = Config.RETAILER_SERVICE.GET_AREA_INFO;
  url += "?";
  url += `zx_parentpincode=${params.id}`;
  return retailerApiClient
    .get(url, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        return response.data.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("errorrrpincodeeareaaa", error.response);
      return null;
    });
}

function getPayment(params) {
  let url = Config.RETAILER_SERVICE.GET_PAYMENT_TERMS;
  url += "?";
  url += `id=${params.id}`;
  return retailerApiClient
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
      // console.log("errorrrpayment", error.response);
      return null;
    });
}

function createPayment(params) {
  // console.log("pppayayaaaa",params)
  let formData = _.cloneDeep(params);
  //  formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");
  // formData = HelperService.removeField(formData, "team__c");
  // formData = HelperService.removeField(formData.form, 'submitDistributorFormLoader');
  let url = Config.RETAILER_SERVICE.CREATE_PAYMENT_TERMS;
  // url += `?team_c=${params.team_c}`;
  //url += params.type ? `&type=${params.type}` : '';

  return retailerApiClient
    .post(url, formData.forms, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("contactervicePAYMENTTTT", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("contacterrorPAYMENTTTT", error.response);
      return null;
    });
}

function updatePayment(params) {
  // console.log("updateeeeparamsss", params);
  let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "agentid");
  formData = HelperService.removeField(formData, "token");
  formData = HelperService.removeField(formData, "local_id");

  const url = Config.RETAILER_SERVICE.UPDATE_PAYMENT_TERMS;
  // url += `?team__c=${params.team__c}`;

  return retailerApiClient
    .post(url, formData.form, {
      headers: {
        token: params.token,
      },
    })
    .then((response) => {
      if (in200s(response.status)) {
        // console.log("kkkkkkkkdata", response.data);
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      // console.log("erroeeeupdate", error.response);
      return null;
    });
}

function captureLocation(params) {
  // console.log("gggeeeetttt", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.RETAILER_SERVICE.CAPTURE_LOCATION;

  return retailerApiClient
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

function CustomerAccountStatus(params) {
  // console.log("gggeeeettttnn", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.RETAILER_SERVICE.ACCOUNT_STATUS;

  return retailerApiClient
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

function PffAutomation(params) {
  // console.log("gggeeeettttnnlll", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.RETAILER_SERVICE.PFF_AUTOMATION;

  return retailerApiClient
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

function HoldAndActive(params) {
  // console.log("gggeeeettttnnlll", params)
  // let formData = _.cloneDeep(params);
  // formData = HelperService.removeField(formData, "token");
  // formData = HelperService.removeField(formData, "local_id");
  let url = Config.RETAILER_SERVICE.HOLD_ACTIVE;

  return retailerApiClient
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

function getLanguage(params) {
  let url = Config.RETAILER_SERVICE.LANGUAGE;
  return retailerApiClient
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
      // console.log("errorrrpayment", error.response);
      return null;
    });
}

export const retailerService = {
  createRetailer,
  updateRetailer,
  fetchRetailers,
  fetchDealers,
  fetchRetailerCompetitors,
  fetchRetailerOrders,
  updateRetailerLocation,
  fetchRetailerDealerByLocation,
  fetchDealerOrders,
  fetchDealerInvoice,
  fetchDealerOutstanding,
  fetchDealerPayments,
  fetchInvoiceDetail,
  submitPaymentsForm,

  EditRetailer,
  getComplaintType,
  getComplaints,

  createCompetitor,
  fetchDsr,
  fetchDsrArea,
  createDsr,
  createDsrArea,
  fetchDsrAreaList,
  fetchCreditLimit,
  deleteOrderLine,
  editOrderQuantity,
  addOrderLine,
  getCustomerInfo,
  getCustomerVisit,
  getCustomerInvoice,
  getCustomerComplaint,

  createComplaint,
  getNatureCode,

  getCustomerInvoiceLines,
  getAllLocation,
  createAddress,

  getCustomerAddress,
  createContact,
  getContact,
  getPincodeInfo,
  getAreaInfo,
  captureLocation,
  getPayment,
  createPayment,
  updatePayment,
  CustomerAccountStatus,
  PffAutomation,
  HoldAndActive,
  getLanguage,
};
