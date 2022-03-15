import { HelperService } from "App/Services/Utils/HelperService";

function validateLoginForm(params) {
  // console.log("ppppppppppp", params);
  if (!validateFieldIsEmpty(params.username)) {
    return {
      invalid_number: true,
      error_message: "Invalid Username Number",
    };
  }

  if (!validateFieldIsEmpty(params.password)) {
    return {
      invalid_password: true,
      error_message: "Invalid Password",
    };
  }

  return false;
}

function validateVisitInfo(params) {
  // console.log("pppppppppppvisitttttt", params);
  if (!validateFieldIsEmpty(params.zx_visit)) {
    return {
      invalid: true,
      invalid_field: "zx_visit",
      error_message: "Visit Id is empty",
    };
  }

  if (!validateFieldIsEmpty(params.zx_customername)) {
    return {
      invalid: true,
      invalid_field: "zx_customername",
      error_message: "Customer Id is empty",
    };
  }
  if (!validateFieldIsEmpty(params.zx_dealeravailable)) {
    return {
      invalid: true,
      invalid_field: "zx_dealeravailable",
      error_message: "Select Dealer Avaiable ",
    };
  }

  if (!validateFieldIsEmpty(params.zx_visitinforemarks)) {
    return {
      invalid: true,
      invalid_field: "zx_visitinforemarks",
      error_message: "Visit Remarks is empty",
    };
  }
  if (!validateFieldIsEmpty(params.zx_visitattachment)) {
    return {
      invalid: true,
      invalid_field: "zx_visitattachment",
      error_message: "Please Attach Image",
    };
  }

  return false;
}

function validateStartDay(params) {
  return false;
}

function validateNewGst(value) {
  // if (!value) return false;
  // var numValue = "^[0-9]*$";
  // return value.match(numValue);
  let error = false;
  if (!value) {
    error = false;
  } else if (
    !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(value)
  ) {
    error = true;
  }
  return error;
}

function validateNewPan(value) {
  let error = false;
  if (!value) {
    error = false;
  } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
    error = true;
  }
  return error;
}

function validateRetailerForm(params) {
  //Todo: write validations
  console.log("pppppppretailerrvalidation", params);
  // console.log("pppppppretailerrvalidation", !validateFieldIsEmpty(params.zx_gstno));
  // console.log("pppppppretailerrvalidation", !validateGstNumber(params.zx_gstno));
  if (!validateFieldIsEmpty(params.name)) {
    return {
      invalid_area: true,
      invalid_field: "name",
      error_message: "Firm Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_firstname)) {
    return {
      invalid_area: true,
      invalid_field: "zx_firstname",
      error_message: "First Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_lastname)) {
    return {
      invalid_area: true,
      invalid_field: "zx_lastname",
      error_message: "Last Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_udaannumber)) {
    return {
      invalid: true,
      invalid_field: "zx_udaannumber",
      error_message: "Udaan Number field is empty.",
    };
  }

  if (!validatePhoneNumber(params.zx_udaannumber)) {
    return {
      invalid: true,
      invalid_field: "zx_udaannumber",
      error_message: "Udaan Number is not valid.",
    };
  }

  if (!validatePhoneNumber(params.zx_alternatemobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_alternatemobileno",
      error_message: "Alt. Mobile Number not valid.",
    };
  }

  // if (!validateFieldIsEmpty(params.emailaddress1)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'emailaddress1',
  // 		error_message: 'Email Address field is empty.'
  // 	}
  // }

  // if (!validateEmail(params.emailaddress1)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'emailaddress1',
  // 		error_message: 'Email Address is not valid.'
  // 	}
  // }

  if (!validateFieldIsEmpty(params.address1_line1)) {
    return {
      invalid_area: true,
      invalid_field: "address1_line1",
      error_message: "Address1 field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.address1_line2)) {
    return {
      invalid_area: true,
      invalid_field: "address1_line2",
      error_message: "Address2 field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_zone)) {
    return {
      invalid: true,
      invalid_field: "zx_zone",
      error_message: "Zone field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_state)) {
    return {
      invalid: true,
      invalid_field: "zx_state",
      error_message: "State field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_substate)) {
    return {
      invalid: true,
      invalid_field: "zx_substate",
      error_message: "Substate field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_district)) {
    return {
      invalid: true,
      invalid_field: "zx_district",
      error_message: "District field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_city)) {
    return {
      invalid: true,
      invalid_field: "zx_city",
      error_message: "City field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_pincode)) {
    return {
      invalid: true,
      invalid_field: "zx_pincode",
      error_message: "Pincode field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_area)) {
    return {
      invalid: true,
      invalid_field: "zx_area",
      error_message: "Area field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_languageusedforspeaking)) {
    return {
      invalid: true,
      invalid_field: "zx_languageusedforspeaking",
      error_message: "Select Language Spoken",
    };
  }

  if (!validateFieldIsEmpty(params.zx_languageusedforwriting)) {
    return {
      invalid: true,
      invalid_field: "zx_languageusedforwriting",
      error_message: "Select Language For Writing",
    };
  }

  // if (params.gst && !validateGstNumber(params.zx_gstno)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_gstno",
  //     error_message: "Please Enter valid GST number.",
  //   };
  // }

  // if (!validateFieldIsEmpty(params.zx_gstno)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_gstno",
  //     error_message: "GST Number field is empty.",
  //   };
  // }

  // if (!validateFieldIsEmpty(params.zx_panno)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_panno",
  //     error_message: "Pan Number field is empty.",
  //   };
  // }

  // if (params.zx_panno && !validatePan(params.zx_panno)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_panno",
  //     error_message: "Please Enter Valid Pan No.(AQWER1234S)",
  //   };
  // }

  // if (!validateAadhaar(params.zx_aadharnumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_aadharnumber',
  // 		error_message: 'Please Enter Valid Aadhar No.(3675 9834 6012)'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.zx_aadharnumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_aadharnumber',
  // 		error_message: 'Aadhar Number field is empty.'
  // 	}
  // }

  // if (!validateDL(params.zx_drivinglicensenumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_drivinglicensenumber',
  // 		error_message: ' Driving License Number not valid.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.zx_drivinglicensenumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_drivinglicensenumber',
  // 		error_message: 'Driving License Number field is empty.'
  // 	}
  // }

  // if (!validateVoterId(params.zx_voteridnumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_voteridnumber',
  // 		error_message: ' Voter Id Number not valid.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.zx_voteridnumber)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_voteridnumber',
  // 		error_message: 'Voter Id Number field is empty.'
  // 	}
  // }

  if (!validateFieldIsEmpty(params.zx_udaanstatus)) {
    return {
      invalid: true,
      invalid_field: "zx_udaanstatus",
      error_message: "Udaan Status field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_enrolledinubs)) {
    return {
      invalid: true,
      invalid_field: "zx_enrolledinubs",
      error_message: "Enrolled in UBS field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_status)) {
    return {
      invalid: true,
      invalid_field: "zx_status",
      error_message: "Status field is empty.",
    };
  }

  if (
    params.zx_status == "PPF" &&
    !validateFieldIsEmpty(params.zx_dateofbirth)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_dateofbirth",
      error_message: "DOB field is empty.",
    };
  }

  if (
    params.zx_status == "PPF" &&
    !validateFieldIsEmpty(params.parentaccountid)
  ) {
    return {
      invalid: true,
      invalid_field: "parentaccountid",
      error_message: "Associated Distributor is empty.",
    };
  }

  if (!validateArrayIsEmpty(params.competitorName)) {
    return {
      invalid: true,
      invalid_field: "competitorName",
      error_message: "Competitor Name field is empty.",
    };
  }

  if (!validateArrayIsEmpty(params.competitorproduct)) {
    return {
      invalid: true,
      invalid_field: "competitorproduct",
      error_message: "Competitor Product field is empty.",
    };
  }

  if (params.zx_accounttype !== "Plumber" &&!validateArrayIsEmpty(params.zx_secondarysaletype)) {
    return {
      invalid: true,
      invalid_field: "zx_secondarysaletype",
      error_message: "Secondary Sale Type field is empty.",
    };
  }

  if (validateNewGst(params.zx_gstno)) {
    return {
      invalid: true,
      invalid_field: "zx_gstno",
      error_message: "Please Enter valid GST number.",
    };
  }

  if (validateNewPan(params.zx_panno)) {
    return {
      invalid: true,
      invalid_field: "zx_panno",
      error_message: "Please Enter Valid Pan No.(AQWER1234S)",
    };
  }

  // if (!validateFieldIsEmpty(params.id)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'id',
  // 		error_message: 'Whole Saler / Distributor is empty'
  // 	}
  // }

  //  if (!validateFieldIsEmpty(params.postal_code__c)) {
  //  	return {
  //  		invalid_area: true,
  //  		invalid_field: 'postal_code__c',
  // 	error_message: 'Postal Code field is empty.'
  //  	}
  //  }

  // if (params.postal_code__c && !validatePostalNumber(params.postal_code__c)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'postal_code__c',
  // 		error_message: 'Please Enter Valid Postal Code.'
  // 	}
  // }

  // if (params.postal_code__c &&!validateNumber(params.postal_code__c)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'postal_code__c',
  // 		error_message: 'Please Enter Valid Postal Code.'
  // 	}}

  // if (params.account_type__c == 'Retailer' && !validateFieldIsEmpty(params.area__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'area__c',
  // 		error_message: 'Area is not selected.'
  // 	}
  // }

  // if (params.account_type__c == 'CRM_Customer' && !validateFieldIsEmpty(params.area__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'area__c',
  // 		error_message: 'City is not selected.'
  // 	}
  // }

  // if (params.account_type__c == 'Retailer' && !validateFieldIsEmpty(params.beat__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'beat__c',
  // 		error_message: 'Beat is not selected.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.mobile__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'mobile__c',
  // 		error_message: 'Mobile Number field is empty.'
  // 	}
  // }

  // if (!validatePhoneNumber(params.mobile__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'mobile__c',
  // 		error_message: 'Mobile Number not valid.'
  // 	}
  // }

  // if (params.alternate_phone&&!validatePhoneNumber(params.tel2)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'tel2',
  // 		error_message: 'ALternate Mobile Number not valid.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.oname)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'oname',
  // 		error_message: 'Owner First Name field is Empty.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.last_name__c)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'last_name__c',
  // 		error_message: 'Owner Last Name field is Empty.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.dealer_type__c)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'dealer_type__c',
  // 		error_message: 'Dealer Type is not selected.'
  // 	}
  // }

  // if (params.gst && !validateGstNumber(params.gst)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'gst',
  // 		error_message: 'Please Enter valid GST number.'
  // 	}
  // }

  // if (params.account_type__c == 'CRM_Customer' && !validateFieldIsEmpty(params.parentid)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'parentid',
  // 		error_message: 'Whole Saler Attach to is not selected.'
  // 	}
  // }

  // if (params.account_type__c == 'Retailer' && !validateFieldIsEmpty(params.parentid)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'parentid',
  // 		error_message: 'Dealer is not selected.'
  // 	}
  // }

  // if (params.email&&!validateEmail(params.email)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'email',
  // 		error_message: 'Please Enter valid Email Id'
  // 	}
  // }

  return false;
}

function validateUpdateRetailerForm(params) {
  //Todo: write validations

  // if (!validateFieldIsEmpty(params.postal_code)) {
  //  	return {
  //  		invalid_area: true,
  //  		invalid_field: 'postal_code',
  //  		error_message: 'Postal Code field is empty.'
  //  	}
  //  }

  // if (params.postal_code && !validatePostalNumber(params.postal_code)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'postal_code',
  // 		error_message: 'Please Enter Valid Postal Code.'
  // 	}
  // }
  // if (params.postal_code&&!validateNumber(params.postal_code)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'postal_code',
  // 		error_message: 'Please Enter Valid Postal Code.'
  // 	}}

  // 	if (params.mobile__c&&!validatePhoneNumber(params.mobile__c)) {
  // 		return {
  // 			invalid: true,
  // 			invalid_field: 'mobile__c',
  // 			error_message: 'Alternate Mobile Number not valid.'
  // 		}
  // 	}
  // 	if (params.e_mail__c&&!validateEmail(params.e_mail__c)) {
  // 		return {
  // 			invalid: true,
  // 			invalid_field: 'email',
  // 			error_message: 'Please Enter valid Email Id'
  // 		}
  // 	}

  return false;
}

// validate eventForm

function validateEventForm(params) {
  //Todo: write validations
  if (!validateFieldIsEmpty(params.name)) {
    return {
      invalid_area: true,
      invalid_field: "name",
      error_message: "Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.event_date__c)) {
    return {
      invalid: true,
      invalid_field: "event_date__c",
      error_message: "Date is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.area__c)) {
    return {
      invalid: true,
      invalid_field: "area__c",
      error_message: "Area is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.budget__c)) {
    return {
      invalid: true,
      invalid_field: "budget__c",
      error_message: "Budget field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.expected_participation__c)) {
    return {
      invalid: true,
      invalid_field: "expected_participation__c",
      error_message: "Expected Participation field is empty.",
    };
  } else if (!validateNumber(params.expected_participation__c)) {
    return {
      invalid: true,
      invalid_field: "expected_participation__c",
      error_message: "Only Number are allowed.",
    };
  }

  if (!validateFieldIsEmpty(params.venue_details__c)) {
    return {
      invalid: true,
      invalid_field: "venue_details__c",
      error_message: "Venue details is empty",
    };
  }

  return false;
}

//validate site form

function validateSiteForm(params) {
  if (!validateFieldIsEmpty(params.name)) {
    return {
      invalid_area: true,
      invalid_field: "name",
      error_message: "Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.address_line_1__c)) {
    return {
      invalid: true,
      invalid_field: "address_line_1__c",
      error_message: "Address line 1 is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.area__c)) {
    return {
      invalid: true,
      invalid_field: "area__c",
      error_message: "Area is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.dealer__c)) {
    return {
      invalid: true,
      invalid_field: "dealer__c",
      error_message: "Dealer is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.retailer__c)) {
    return {
      invalid: true,
      invalid_field: "retailer__c",
      error_message: "Retailer is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.phone__c)) {
    return {
      invalid: true,
      invalid_field: "phone__c",
      error_message: "Phone field is empty.",
    };
  } else if (!validateNumber(params.phone__c)) {
    return {
      invalid: true,
      invalid_field: "phone__c",
      error_message: "Only Numbers are allowed.",
    };
  }

  if (!validateFieldIsEmpty(params.size__c)) {
    return {
      invalid: true,
      invalid_field: "size__c",
      error_message: "Size field is empty.",
    };
  } else if (!validateNumber(params.size__c)) {
    return {
      invalid: true,
      invalid_field: "size__c",
      error_message: "Only Numbers are allowed.",
    };
  }
  return false;
}

// validate siteProduct Form

function validateSiteProductForm(params) {
  // console.log(params, "VALIDATIONPARAMS");

  if (!validateFieldIsEmpty(params.name)) {
    return {
      invalid_area: true,
      invalid_field: "name",
      error_message: "Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.psm__c)) {
    return {
      invalid: true,
      invalid_field: "psm__c",
      error_message: "PSM is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.product__c)) {
    return {
      invalid: true,
      invalid_field: "product__c",
      error_message: "Product is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.product_category__c)) {
    return {
      invalid: true,
      invalid_field: "product_category__c",
      error_message: "Product Category is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.product_sub_category__c)) {
    return {
      invalid: true,
      invalid_field: "product_sub_category__c",
      error_message: "Product Sub is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.product_sub_sub_category__c)) {
    return {
      invalid: true,
      invalid_field: "product_sub_sub_category__c",
      error_message: "Product Sub Sub category is not selected.",
    };
  }

  if (!validateFieldIsEmpty(params.quantity__c)) {
    return {
      invalid: true,
      invalid_field: "quantity__c",
      error_message: "Quantity field is empty.",
    };
  } else if (!validateNumber(params.quantity__c)) {
    return {
      invalid: true,
      invalid_field: "quantity__c",
      error_message: "Only Numbers are allowed.",
    };
  }

  return false;
}

//validate Local expense form

function validateLocalExpenseForm(params) {
  // if (!validateFieldIsEmpty(params.mode__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'mode__c',
  // 		error_message: 'Mode of travel is not selected.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.kilometers_travelled__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'kilometers_travelled__c',
  // 		error_message: 'Kilometer travelled field is empty.'
  // 	}
  // } else if (!validateNumber(params.kilometers_travelled__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'kilometers_travelled__c',
  // 		error_message: 'Only Numbers are allowed.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.food__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'food__c',
  // 		error_message: 'Food field is empty.'
  // 	}
  // } else if (!validateNumber(params.food__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'food__c',
  // 		error_message: 'Only Numbers are allowed.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.toll_parking_charges__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'toll_parking_charges__c',
  // 		error_message: 'Toll parking field is empty.'
  // 	}
  // } else if (!validateNumber(params.toll_parking_charges__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'toll_parking_charges__c',
  // 		error_message: 'Only Numbers are allowed.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.amount__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'amount__c',
  // 		error_message: 'Amount field is empty.'
  // 	}
  // } else if (!validateNumber(params.amount__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'amount__c',
  // 		error_message: 'Only Numbers are allowed.'
  // 	}
  // }

  return false;
}

function validateLocalRemarkExpenseForm(params) {
  if (!validateFieldIsEmpty(params.remark__c)) {
    return {
      invalid: true,
      invalid_field: "remark__c",
      error_message: "Remarks field is empty.",
    };
  }

  return false;
}

function validateOutstationRemarkExpenseForm(params) {
  if (!validateFieldIsEmpty(params.remark__c)) {
    return {
      invalid: true,
      invalid_field: "remark__c",
      error_message: "Remarks field is empty.",
    };
  }

  return false;
}

function validateTourRemarkForm(params) {
  if (!validateFieldIsEmpty(params.remark__c)) {
    return {
      invalid: true,
      invalid_field: "remark__c",
      error_message: "Remarks field is empty.",
    };
  }

  return false;
}

function validateTourForm(params) {
  //Todo: write validations

  if (!validateFieldIsEmpty(params.tour_from__c)) {
    return {
      invalid_area: true,
      invalid_field: "tour_from__c",
      error_message: "From date field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.tour_to__c)) {
    return {
      invalid_area: true,
      invalid_field: "tour_to__c",
      error_message: "To date field is empty.",
    };
  }

  return false;
}

function validateUpdateTourForm(params) {
  if (!validateFieldIsEmpty(params.food__c)) {
    return {
      invalid: true,
      invalid_field: "food__c",
      error_message: "Food field is empty.",
    };
  } else if (!validateNumber(params.food__c)) {
    return {
      invalid: true,
      invalid_field: "food__c",
      error_message: "Only Numbers are allowed.",
    };
  }

  if (!validateFieldIsEmpty(params.hotel__c)) {
    return {
      invalid: true,
      invalid_field: "hotel__c",
      error_message: "Hotel field is empty.",
    };
  } else if (!validateNumber(params.hotel__c)) {
    return {
      invalid: true,
      invalid_field: "hotel__c",
      error_message: "Only Numbers are allowed.",
    };
  }

  if (!validateFieldIsEmpty(params.Comapny_Paid__c)) {
    return {
      invalid: true,
      invalid_field: "Comapny_Paid__c",
      error_message: "Company Paid field is empty.",
    };
  } else if (!validateNumber(params.Comapny_Paid__c)) {
    return {
      invalid: true,
      invalid_field: "Comapny_Paid__c",
      error_message: "Only Numbers are allowed.",
    };
  }

  if (!validateFieldIsEmpty(params.Travel_By__c)) {
    return {
      invalid_area: true,
      invalid_field: "Travel_By__c",
      error_message: "Travel Mode field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.Travel_Details__c)) {
    return {
      invalid_area: true,
      invalid_field: "Travel_Details__c",
      error_message: "Travel detail field is empty.",
    };
  }

  return false;
}

//validate influencer form

// "category__c" : "ASM",
// "psm__c" : "a0H1m000000E92TEAS",

// "status__c" : "Active",
// "title" : "Mr."

function validateInfluencerForm(params) {
  //Todo: write validations

  if (!validateFieldIsEmpty(params.zx_accounttype)) {
    return {
      invalid_area: true,
      invalid_field: "zx_accounttype",
      error_message: "Select Influncer Type",
    };
  }

  // if (!validateFieldIsEmpty(params.zx_otheraccounttype)) {
  // 	return {
  // 		invalid_area: true,
  // 		invalid_field: 'zx_otheraccounttype',
  // 		error_message: 'Contact creation field is empty.'
  // 	}
  // }

  if (!validateFieldIsEmpty(params.name)) {
    return {
      invalid_area: true,
      invalid_field: "name",
      error_message: "Person Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_designation)) {
    return {
      invalid_area: true,
      invalid_field: "zx_designation",
      error_message: "Designation field is empty.",
    };
  }

  // if (!validateFieldIsEmpty(params.lastname)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'lastname',
  // 		error_message: 'LastName field is empty.'
  // 	}
  // }

  if (!validateFieldIsEmpty(params.zx_mobile)) {
    return {
      invalid: true,
      invalid_field: "zx_mobile",
      error_message: "Mobile Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_nameoforganisation)) {
    return {
      invalid: true,
      invalid_field: "zx_nameoforganisation",
      error_message: "Name Of Organisation field is empty.",
    };
  }
  //  else if (!validateNumber(params.phone)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'phone',
  // 		error_message: 'Only Number are allowed.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.zx_alternatemobileno)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_alternatemobileno',
  // 		error_message: 'Alternate Number field is empty.'
  // 	}
  // }

  // if (!validateFieldIsEmpty(params.zx_dateofbirth)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_dateofbirth",
  //     error_message: "DOB field is empty.",
  //   };
  // }

  if (!validateFieldIsEmpty(params.address1_line1)) {
    return {
      invalid: true,
      invalid_field: "address1_line1",
      error_message: "Address field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_pincode)) {
    return {
      invalid: true,
      invalid_field: "zx_pincode",
      error_message: "Pincode field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_city)) {
    return {
      invalid: true,
      invalid_field: "zx_city",
      error_message: "City/Town field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_district)) {
    return {
      invalid: true,
      invalid_field: "zx_district",
      error_message: "District field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_substate)) {
    return {
      invalid: true,
      invalid_field: "zx_substate",
      error_message: "Substate field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_state)) {
    return {
      invalid: true,
      invalid_field: "zx_state",
      error_message: "State field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_zone)) {
    return {
      invalid: true,
      invalid_field: "zx_zone",
      error_message: "Zone field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_area)) {
    return {
      invalid: true,
      invalid_field: "zx_area",
      error_message: "Area field is empty.",
    };
  }

  return false;
}

function validatePlaceOrderForm(cart) {
  if (!validateFieldIsEmpty(cart.order.order_value__c)) {
    return {
      invalid: true,
      invalid_field: "order_value__c",
      error_message: "Order value is empty",
    };
  }

  if (!validateFieldIsEmpty(cart.order.dealer__c)) {
    return {
      invalid: true,
      invalid_field: "dealer__c",
      error_message: "Fulfiller is not present.",
    };
  }

  if (!cart.items.length) {
    return {
      invalid: true,
      invalid_field: "items",
      error_message: "Cannot Place Order. No items in cart.",
    };
  }

  if (!validateFieldIsEmpty(cart.order.retailer__c)) {
    return {
      invalid: true,
      invalid_field: "retailer__c",
      error_message: "Retailer is not present.",
    };
  }

  if (!validateFieldIsEmpty(cart.order.order_date__c)) {
    return {
      invalid: true,
      invalid_field: "order_date__c",
      error_message: "Order date is not present",
    };
  }

  if (!validateFieldIsEmpty(cart.order.unique_product_count__c)) {
    return {
      invalid: true,
      invalid_field: "unique_product_count__c",
      error_message: "Unique Product Count is not present",
    };
  }

  return false;
}

function validateAddVisitForm(data) {
  if (data.market_material_required__c == "false") {
    return {
      invalid: true,
      invalid_field: "market_material_required__c",
      error_message: "select market material required",
    };
  }

  if (!validateFieldIsEmpty(data.remarks__c)) {
    return {
      invalid: true,
      invalid_field: "remarks__c",
      error_message: "Remark Cannot be Empty",
    };
  }
  if (!validateFieldIsEmpty(data.attachment_url__c)) {
    return {
      invalid: true,
      invalid_field: "attachment_url__c",
      error_message: "Please Attach Image",
    };
  }

  return false;
}

function validatePaymentForm(params) {
  if (!validateFieldIsEmpty(params.payment_mode)) {
    return {
      invalid: true,
      invalid_field: "payment_mode",
      error_message: "Please select Payment Mode",
    };
  }

  if (
    params.payment_mode != "Cash" &&
    !validateFieldIsEmpty(params.payment_reference)
  ) {
    return {
      invalid: true,
      invalid_field: "payment_reference",
      error_message: "Payment reference cannot be empty",
    };
  }
  if (!validateFieldIsEmpty(params.amount)) {
    return {
      invalid: true,
      invalid_field: "amount",
      error_message: "Amount cannot be empty.",
    };
  }

  if (!validateFieldIsEmpty(params.date_of_payment__c)) {
    return {
      invalid: true,
      invalid_field: "date_of_payment__c",
      error_message: "Please enter date of payment",
    };
  }

  return false;
}

function validateCompetitor(params) {
  let validation = false;

  if (!params) {
    return {
      invalid: true,
      invalid_field: "Competitor",
      error_message: "Add atleast one Competitor details",
    };
  }

  if (!params.length) {
    return {
      invalid: true,
      invalid_field: "Competitor",
      error_message: "Add atleast one Competitor details",
    };
  }

  params.map((obj, index) => {
    validation = validateCompetitorForm(obj, index) || validation;
  });

  return validation;
}

function validateCompetitorForm(params, index) {
  if (!validateFieldIsEmpty(params.competitors__c)) {
    return {
      invalid: true,
      invalid_field: "competitor",
      error_message:
        "competitor name is  empty in Competitor form" + (index + 1),
    };
  }

  if (
    params.competitors__c == "a0E2w000002q6koEAA" &&
    !validateFieldIsEmpty(params.competitor_name__c)
  ) {
    return {
      invalid: true,
      invalid_field: "competitor_name__c",
      error_message: "Other  is empty in Competitor form " + (index + 1),
    };
  }
  if (
    params.competitors__c == "a0E2w000002q6koEAA" &&
    !validateCharacterLength(params.competitor_name__c)
  ) {
    return {
      invalid: true,
      invalid_field: "competitor_name__c",
      error_message: "Please Enter valid Name.",
    };
  }

  if (!validateFieldIsEmpty(params.competitor_product__c)) {
    return {
      invalid: true,
      invalid_field: "product",
      error_message: "Product value is empty in Competitor form " + (index + 1),
    };
  }

  if (!validateFieldIsEmpty(params.price__c)) {
    return {
      invalid: true,
      invalid_field: "price",
      error_message: "Price value is empty in Competitor form " + (index + 1),
    };
  }
  if (!validateFieldIsEmpty(params.potential_off_take__c)) {
    return {
      invalid: true,
      invalid_field: "potential",
      error_message:
        "Potential value is empty in Competitor form " + (index + 1),
    };
  }

  // if (!validateFieldIsEmpty(params.payment_term__c)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'payment_term__c',
  // 		error_message: 'Payment Term is empty in Competitor form ' + (index + 1)
  // 	}
  // }
}

function validateCharacterLength(number) {
  return number.length >= 3;
  // var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  // if (gstinformat.test(number)) {
  //        return true;
  //    } else {
  //        return false;
  //    }
}
function validateStock(params) {
  let validation = false;

  if (!params) {
    return {
      invalid: true,
      invalid_field: "Stock",
      error_message: "Add atleast one Stock details",
    };
  }
  if (!params.length) {
    return {
      invalid: true,
      invalid_field: "Stock",
      error_message: "Add atleast one Stock details",
    };
  }

  params.map((obj, index) => {
    validation = validateStockForm(obj, index) || validation;
  });

  return validation;
}

function validateStockForm(params, index) {
  if (!validateFieldIsEmpty(params.product_family__c)) {
    return {
      invalid: true,
      invalid_field: "product",
      error_message: "Product value is empty in Stock form " + (index + 1),
    };
  }

  if (!validateFieldIsEmpty(params.quantity__c)) {
    return {
      invalid: true,
      invalid_field: "quantity",
      error_message: "quantity value is empty in Stock form " + (index + 1),
    };
  }
}

function validatePhoneNumber(number) {
  if (!number) return false;
  var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return number.match(phoneNum);
}

function validateNumber(number) {
  if (!number) return false;
  var numValue = "^[0-9]*$";
  return number.match(numValue);
}

function validateFieldIsEmpty(value) {
  return !!value;
}

function validateArrayIsEmpty(value) {
  return value.length !== 0;
}

function validateDate(value) {
  var result = new Date(value);
  let error = false;
  if (result) {
    if (result.getDay() == 0 || result.getDay() == 6) {
      error = true;
    }
  }
  console.log("eroeeee", error);
  return error;
}

function validatePostalNumber(number) {
  return number.length == 6;
}

function validateEmail(email) {
  var userEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return userEmail.test(email);
}

function validateGstNumber(number) {
  return number.length == 15;
  // var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  // if (gstinformat.test(number)) {
  //        return true;
  //    } else {
  //        return false;
  //    }
}
function validateDistributorForm(params) {
  //Todo: write validations

  if (!validateFieldIsEmpty(params.zx_nameofthefirm)) {
    return {
      invalid_area: true,
      invalid_field: "zx_nameofthefirm",
      error_message: "Name field is empty.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_constitutionofthefirm)) {
    return {
      invalid: true,
      invalid_field: "zx_constitutionofthefirm",
      error_message: "constitution of the firm.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_distributorname)) {
    return {
      invalid_area: true,
      invalid_field: "zx_distributorname",
      error_message: "Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_mobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_mobileno",
      error_message: "Mobile Number field is empty.",
    };
  }

  if (!validatePhoneNumber(params.zx_mobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_mobileno",
      error_message: "Mobile Number not valid.",
    };
  }

  // if (!validatePhoneNumber(params.zx_telephoneno)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_telephoneno',
  // 		error_message: 'Telephone Number not valid.'
  // 	}
  // }

  if (!validatePhoneNumber(params.zx_alternatemobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_alternatemobileno",
      error_message: "Alt. Mobile Number not valid.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_billingaddress1)) {
    return {
      invalid: true,
      invalid_field: "zx_billingaddress1",
      error_message: "Please Enter Billing Address1",
    };
  }
  if (!validateFieldIsEmpty(params.zx_billingaddress2)) {
    return {
      invalid: true,
      invalid_field: "zx_billingaddress2",
      error_message: "Please Enter Billing Address2",
    };
  }
  if (!validateFieldIsEmpty(params.zx_billingpostcode)) {
    return {
      invalid: true,
      invalid_field: "zx_billingpostcode",
      error_message: "Please Enter Billing Postcode",
    };
  }
  if (!validateFieldIsEmpty(params.zx_billingcity)) {
    return {
      invalid: true,
      invalid_field: "zx_billingcity",
      error_message: "Please Enter Billing City",
    };
  }
  if (!validateFieldIsEmpty(params.zx_substate)) {
    return {
      invalid: true,
      invalid_field: "zx_substate",
      error_message: "Please Enter Billing Sub-State",
    };
  }
  if (!validateFieldIsEmpty(params.zx_district)) {
    return {
      invalid: true,
      invalid_field: "zx_district",
      error_message: "Please Enter Billing District",
    };
  }
  if (!validateFieldIsEmpty(params.zx_area)) {
    return {
      invalid: true,
      invalid_field: "zx_area",
      error_message: "Please Enter Billing Area",
    };
  }
  if (!validateFieldIsEmpty(params.zx_billingstate)) {
    return {
      invalid: true,
      invalid_field: "zx_billingstate",
      error_message: "Please Enter Billing State",
    };
  }
  if (!validateFieldIsEmpty(params.zx_deliveryaddress1)) {
    return {
      invalid: true,
      invalid_field: "zx_deliveryaddress1",
      error_message: "Please Enter Delivery Address1",
    };
  }
  if (!validateFieldIsEmpty(params.zx_deliveryaddress2)) {
    return {
      invalid: true,
      invalid_field: "zx_billingstate",
      error_message: "Please Enter Delivery Address2",
    };
  }
  if (!validateFieldIsEmpty(params.zx_deliverypostcode)) {
    return {
      invalid: true,
      invalid_field: "zx_billingstate",
      error_message: "Please Enter Delivery Postcode",
    };
  }
  if (!validateFieldIsEmpty(params.zx_deliverycity)) {
    return {
      invalid: true,
      invalid_field: "zx_deliverycity",
      error_message: "Please Enter Delivery City",
    };
  }
  if (!validateFieldIsEmpty(params.zx_deliverystate)) {
    return {
      invalid: true,
      invalid_field: "zx_deliverystate",
      error_message: "Please Enter Delivery State",
    };
  }
  if (!validateFieldIsEmpty(params.zx_residentialsubstate)) {
    return {
      invalid: true,
      invalid_field: "zx_residentialsubstate",
      error_message: "Please Enter Delivery Sub-State",
    };
  }
  if (!validateFieldIsEmpty(params.zx_residentialdistrict)) {
    return {
      invalid: true,
      invalid_field: "zx_residentialdistrict",
      error_message: "Please Enter Delivery District",
    };
  }
  if (!validateFieldIsEmpty(params.zx_residentialarea)) {
    return {
      invalid: true,
      invalid_field: "zx_residentialarea",
      error_message: "Please Enter Delivery Area",
    };
  }
  if (!validateFieldIsEmpty(params.zx_grossturnoverperannum)) {
    return {
      invalid: true,
      invalid_field: "zx_grossturnoverperannum",
      error_message: "Please Enter Gross turn over",
    };
  }
  if (!validateFieldIsEmpty(params.zx_dealingwithpvc)) {
    return {
      invalid: true,
      invalid_field: "zx_dealingwithpvc",
      error_message: "Please Dealing With PVC ",
    };
  }
  if (!validateFieldIsEmpty(params.zx_gstregtype)) {
    return {
      invalid: true,
      invalid_field: "zx_gstregtype",
      error_message: "Please Enter GST registration type",
    };
  }

  // if (params.gst && !validateGstNumber(params.zx_gstno)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_gstno',
  // 		error_message: 'Please Enter valid GST number.'
  // 	}

  // }
}

// function validateFax(number) {
//     if (!number) return false;
//         var faxNum = /^\+?[0-9]+$/;
// 	return number.match(faxNum);

// }
function validateFax(number) {
  if (!number) return false;
  var faxNum = /^\+?[0-9]{7,}$/;
  return number.match(faxNum);
}

function validatePan(number) {
  if (!number) return false;
  var panNum = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return number.match(panNum);
}

function validateAadhaar(number) {
  if (!number) return false;
  var adhaarNum = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  return number.match(adhaarNum);
}

function validateGst(number) {
  if (!number) return false;
  var gstNum = /^\+?[0-9]+$/;
  return number.match(gstNum);
}

function validateAccount(number) {
  if (!number) return false;
  var accNum = /[0-9]{9,18}/;
  return number.match(accNum);
}

function validateIfsc(number) {
  if (!number) return false;
  var ifscNum = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return number.match(ifscNum);
}

function validateDL(number) {
  if (!number) return false;
  var dLNum = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
  return number.match(dLNum);
}

function validateVoterId(number) {
  if (!number) return false;
  var voterNum = /^([a-zA-Z]){3}([0-9]){7}?$/;
  return number.match(voterNum);
}

function submitValidateDistributorForm(params) {
  // console.log("validation", params)

  if (!validateFieldIsEmpty(params.zx_dateofbirth)) {
    return {
      invalid: true,
      invalid_field: "zx_dateofbirth",
      error_message: "DOB field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_yearofestablishment)) {
    return {
      invalid: true,
      invalid_field: "zx_yearofestablishment",
      error_message: "Year of Establishment field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_telephoneno)) {
    return {
      invalid: true,
      invalid_field: "zx_telephoneno",
      error_message: "Telephone Number field is empty.",
    };
  }

  if (!validatePhoneNumber(params.zx_alternatemobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_alternatemobileno",
      error_message: "Alt. Mobile Number not valid.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_alternatemobileno)) {
    return {
      invalid: true,
      invalid_field: "zx_alternatemobileno",
      error_message: "Alt. Mobile Number field is empty.",
    };
  }

  if (!validateFax(params.zx_faxno)) {
    return {
      invalid: true,
      invalid_field: "zx_faxno",
      error_message: "Please Enter Valid Fax No.(+12345678976)",
    };
  }

  if (!validateFieldIsEmpty(params.zx_faxno)) {
    return {
      invalid: true,
      invalid_field: "zx_faxno",
      error_message: "Fax Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_cibilscore)) {
    return {
      invalid: true,
      invalid_field: "zx_cibilscore",
      error_message: "Cibil Score field is empty.",
    };
  }

  if (!validatePan(params.zx_panno)) {
    return {
      invalid: true,
      invalid_field: "zx_panno",
      error_message: "Please Enter Valid Pan No.(AQWER1234S)",
    };
  }

  if (!validateFieldIsEmpty(params.zx_panno)) {
    return {
      invalid: true,
      invalid_field: "zx_panno",
      error_message: "Pan Number field is empty.",
    };
  }

  if (!validateAadhaar(params.zx_aadharno)) {
    return {
      invalid: true,
      invalid_field: "zx_aadharno",
      error_message: "Please Enter Valid Aadhar No.(3675 9834 6012)",
    };
  }

  if (!validateFieldIsEmpty(params.zx_aadharno)) {
    return {
      invalid: true,
      invalid_field: "zx_aadharno",
      error_message: "Aadhar Number field is empty.",
    };
  }

  // if (!validateGst(params.zx_gstno)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_gstno',
  // 		error_message: 'Please Enter Valid GST No.'
  // 	}
  // }
  if (params.gst && !validateGstNumber(params.zx_gstno)) {
    return {
      invalid: true,
      invalid_field: "zx_gstno",
      error_message: "Please Enter valid GST number.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_gstno)) {
    return {
      invalid: true,
      invalid_field: "zx_gstno",
      error_message: "GST Number field is empty.",
    };
  }

  if (!validateAccount(params.zx_accountno)) {
    return {
      invalid: true,
      invalid_field: "zx_accountno",
      error_message: "Please Enter Valid Account No.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_accountno)) {
    return {
      invalid: true,
      invalid_field: "zx_accountno",
      error_message: "Account Number field is empty.",
    };
  }

  if (!validateIfsc(params.zx_ifsccode)) {
    return {
      invalid: true,
      invalid_field: "zx_ifsccode",
      error_message: "Please Enter Valid IFSC No.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_ifsccode)) {
    return {
      invalid: true,
      invalid_field: "zx_ifsccode",
      error_message: "IFSC Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_bankname)) {
    return {
      invalid: true,
      invalid_field: "zx_bankname",
      error_message: "Bank Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_bankaddress)) {
    return {
      invalid: true,
      invalid_field: "zx_bankaddress",
      error_message: "Bank Address field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_depositamount)) {
    return {
      invalid: true,
      invalid_field: "zx_depositamount",
      error_message: "Deposit Amount field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_credittermpipes)) {
    return {
      invalid: true,
      invalid_field: "zx_credittermpipes",
      error_message: "Credit Term Pipes field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_creditlimit)) {
    return {
      invalid: true,
      invalid_field: "zx_creditlimit",
      error_message: "Credit Limit field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_nameofnearestdistributorwithdistance)) {
    return {
      invalid: true,
      invalid_field: "zx_nameofnearestdistributorwithdistance",
      error_message:
        "Name of Nearest Distributor with Distance field is empty.",
    };
  }
}

function contactFormValidation(params) {
  // console.log("paramssscontact",params)
  if (!validateFieldIsEmpty(params.firstname)) {
    return {
      invalid: true,
      invalid_field: "firstname",
      error_message: "Enter First name.",
    };
  }

  if (!validateFieldIsEmpty(params.lastname)) {
    return {
      invalid: true,
      invalid_field: "lastname",
      error_message: "Last Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.telephone1)) {
    return {
      invalid: true,
      invalid_field: "telephone1",
      error_message: "Alternate Mobile no. field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.mobilephone)) {
    return {
      invalid: true,
      invalid_field: "mobilephone",
      error_message: "Mobile Number field is empty.",
    };
  }

  if (!validatePhoneNumber(params.mobilephone)) {
    return {
      invalid: true,
      invalid_field: "mobilephone",
      error_message: "Mobile Number not valid.",
    };
  }

  if (!validatePhoneNumber(params.telephone1)) {
    return {
      invalid: true,
      invalid_field: "telephone1",
      error_message: "Alt. Mobile Number not valid.",
    };
  }

  if (!validateFieldIsEmpty(params.emailaddress1)) {
    return {
      invalid: true,
      invalid_field: "emailaddress1",
      error_message: "Email Address field is empty.",
    };
  }

  if (!validateEmail(params.emailaddress1)) {
    return {
      invalid: true,
      invalid_field: "emailaddress1",
      error_message: "Email Address is not valid.",
    };
  }
}

function orderFormValidation(params) {
  if (!validateFieldIsEmpty(params.zx_remarks)) {
    return {
      invalid: true,
      invalid_field: "zx_remarks",
      error_message: "Remarks field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_scheduleddateofdelivery)) {
    return {
      invalid: true,
      invalid_field: "zx_scheduleddateofdelivery",
      error_message: "Schedule Date field is empty.",
    };
  }

  if (validateDate(params.zx_scheduleddateofdelivery)) {
    return {
      invalid: true,
      invalid_field: "zx_scheduleddateofdelivery",
      error_message: "Select Valid Schedule Date of Delivery",
    };
  }
}

function addressFormValidation(params) {
  if (!validateFieldIsEmpty(params.zx_contactperson)) {
    return {
      invalid: true,
      invalid_field: "zx_contactperson",
      error_message: "Contact Person Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_address)) {
    return {
      invalid: true,
      invalid_field: "zx_address",
      error_message: "Address field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_mobilenumber)) {
    return {
      invalid: true,
      invalid_field: "zx_mobilenumber",
      error_message: "Mobile Number field is empty.",
    };
  }

  if (!validatePhoneNumber(params.zx_mobilenumber)) {
    return {
      invalid: true,
      invalid_field: "zx_mobilenumber",
      error_message: "Mobile Number not valid.",
    };
  }
}

function secondaryOrderFormValidation(params) {
  if (!validateFieldIsEmpty(params.zx_remarks)) {
    return {
      invalid: true,
      invalid_field: "zx_remarks",
      error_message: "Remarks field is empty.",
    };
  }

  // if (!validateFieldIsEmpty(params.zx_scheduleddateofdelivery)) {
  // 	return {
  // 		invalid: true,
  // 		invalid_field: 'zx_scheduleddateofdelivery',
  // 		error_message: 'Schedule Date field is empty.'
  // 	}
  // }
}

function projectFormValidation(params) {
  // console.log("abcvdvd", params);
  if (!validateFieldIsEmpty(params.zx_type)) {
    return {
      invalid: true,
      invalid_field: "zx_type",
      error_message: "Type field is empty.",
    };
  }

  if (
    params.zx_type == "Others" &&
    !validateFieldIsEmpty(params.zx_otherprojecttype)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_otherprojecttype",
      error_message: "Others Type field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_pipelinestage)) {
    return {
      invalid: true,
      invalid_field: "zx_pipelinestage",
      error_message: "Pipeline stage field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_nameofproject)) {
    return {
      invalid: true,
      invalid_field: "zx_nameofproject",
      error_message: "Project Name field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_location)) {
    return {
      invalid: true,
      invalid_field: "zx_location",
      error_message: "Location field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_numberofbathrooms)) {
    return {
      invalid: true,
      invalid_field: "zx_numberofbathrooms",
      error_message: "Bathroom Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_numberoffloors)) {
    return {
      invalid: true,
      invalid_field: "zx_numberofbathrooms",
      error_message: "Floor Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_numberoftowers)) {
    return {
      invalid: true,
      invalid_field: "zx_numberoftowers",
      error_message: "Tower Number field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_landareaunderdevelopment)) {
    return {
      invalid: true,
      invalid_field: "zx_landareaunderdevelopment",
      error_message: "Land area under development field is empty.",
    };
  }

  // if (!validateFieldIsEmpty(params.zx_RERAnumber)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_RERAnumber",
  //     error_message: "RERA Number field is empty.",
  //   };
  // }

  // if (!validateFieldIsEmpty(params.zx_RERAImageofproof)) {
  //   return {
  //     invalid: true,
  //     invalid_field: "zx_RERAImageofproof",
  //     error_message: "RERA Number Image field is empty.",
  //   };
  // }

  if (!validateFieldIsEmpty(params.zx_gstnumber)) {
    return {
      invalid: true,
      invalid_field: "zx_gstnumber",
      error_message: "GST Number field is empty.",
    };
  }
  if (params.zx_gstnumber && !validateGstNumber(params.zx_gstnumber)) {
    return {
      invalid: true,
      invalid_field: "zx_gstnumber",
      error_message: "Please Enter valid GST number.",
    };
  }
  if (!validateFieldIsEmpty(params.zx_ImageofProof)) {
    return {
      invalid: true,
      invalid_field: "zx_ImageofProof",
      error_message: "Image field is empty.",
    };
  }

  if (!validateFieldIsEmpty(params.zx_referencefrom)) {
    return {
      invalid: true,
      invalid_field: "zx_referencefrom",
      error_message: "Refrence From field is empty.",
    };
  }

  if (
    params.zx_referencefrom == "Others" &&
    !validateFieldIsEmpty(params.zx_otherreference)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_otherreference",
      error_message: "Other Refrence From field is empty.",
    };
  }
}

function updateProjectFormValidation(params) {
  // console.log("abcvdvd", params);
  if (!validateFieldIsEmpty(params.zx_projectdeveloper)) {
    return {
      invalid: true,
      invalid_field: "zx_projectdeveloper",
      error_message: "Project Developer field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    !validateFieldIsEmpty(params.zx_nameofarchitect)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_nameofarchitect",
      error_message: "Name of Architect field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    params.zx_pipelinestage !== "Tendering stage" &&
    !validateFieldIsEmpty(params.zx_nameofplumbingcontractor)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_nameofplumbingcontractor",
      error_message: "Name of Plumbing Contractor field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    params.zx_pipelinestage !== "Tendering stage" &&
    params.zx_pipelinestage !== "Order issued to contractor" &&
    !validateFieldIsEmpty(params.zx_projectmanager)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_projectmanager",
      error_message: "Project Manager field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    params.zx_pipelinestage !== "Tendering stage" &&
    params.zx_pipelinestage !== "Order issued to contractor" &&
    !validateFieldIsEmpty(params.zx_siteengineer)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_siteengineer",
      error_message: "Site Engineer field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    params.zx_pipelinestage !== "Tendering stage" &&
    params.zx_pipelinestage !== "Order issued to contractor" &&
    !validateFieldIsEmpty(params.zx_purchasemanager)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_purchasemanager",
      error_message: "Purchase Manager field is empty.",
    };
  }

  if (
    params.zx_pipelinestage !== "Design stage" &&
    !validateFieldIsEmpty(params.zx_Nameofplumbingconsultant)
  ) {
    return {
      invalid: true,
      invalid_field: "zx_Nameofplumbingconsultant",
      error_message: "Name Of Plumbing Consultant field is empty.",
    };
  }
}

export const ValidationService = {
  validateLoginForm,
  validateStartDay,
  validateRetailerForm,
  validatePlaceOrderForm,
  validateAddVisitForm,
  validateEventForm,
  validateInfluencerForm,
  validateSiteForm,
  validateSiteProductForm,
  validateLocalExpenseForm,
  validateLocalRemarkExpenseForm,
  validateTourForm,
  validateUpdateTourForm,
  validateTourRemarkForm,
  validateOutstationRemarkExpenseForm,
  validatePaymentForm,
  validateCompetitor,
  validateStock,
  validateUpdateRetailerForm,
  validateDistributorForm,
  submitValidateDistributorForm,
  contactFormValidation,
  orderFormValidation,
  addressFormValidation,
  secondaryOrderFormValidation,
  projectFormValidation,
  validateVisitInfo,
  updateProjectFormValidation,
};
