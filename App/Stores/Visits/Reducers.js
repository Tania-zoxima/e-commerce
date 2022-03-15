/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { VisitsTypes } from "./Actions";
import _ from "lodash";

export const openVisitsAction = (state) => ({
  ...state,
  visitsAction: true,
});

export const closeVisitsAction = (state) => ({
  ...state,
  visitsAction: false,
});

export const changeSearchFilters = (state, { payload }) => {
  let updated_search_filters = _.cloneDeep(state.searchFilters);
  updated_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    searchFilters: {
      ...state.searchFilters,
      ...updated_search_filters,
    },
  };
};

export const fetchVisitsStorageListSuccess = (state, { payload }) => {
  return {
    ...state,
    visitsStorageList: _.cloneDeep(payload),
  };
};

export const fetchVisitsStorageListFailure = (state, { payload }) => {
  return {
    ...state,
  };
};

export const fetchVisitsDisplayListSuccess = (state, { payload }) => {
  let updatedDisplayList = _.cloneDeep(state.visitsDisplayList);
  updatedDisplayList = _.extend(updatedDisplayList, payload);

  // let updatedStorageList = _.cloneDeep(state.visitsStorageList);
  // updatedStorageList = _.extend(updatedStorageList, payload);
  return {
    ...state,
    visitsDisplayList: payload,
    //visitsStorageList: updatedStorageList,
    fetchVisitsDisplayListLoader: false,
  };
};

export const fetchVisitsDisplayListFailure = (state, { payload }) => {
  return {
    ...state,
    fetchVisitsDisplayListLoader: false,
  };
};

export const fetchVisitsDisplayListLoading = (state) => {
  return {
    ...state,
    fetchVisitsDisplayListLoader: true,
  };
};

export const fetchVisitsDisplayListLoadingStop = (state) => {
  return {
    ...state,
    fetchVisitsDisplayListLoader: false,
  };
};

export const doNothing = (state) => ({
  ...state,
});

export const fetchFilteredVisitsDisplayListSuccess = (state, { payload }) => {
  return {
    ...state,
    filteredDisplayData: _.cloneDeep(payload),
  };
};

export const changeAddPlannedVisitsSearchFilters = (state, { payload }) => {
  let updated_planned_search_filters = _.cloneDeep(
    state.planVisit.searchFilters
  );
  updated_planned_search_filters[payload.edited_field] = payload.edited_value;
  //console.log(payload.edited_field)
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      searchFilters: {
        ...state.planVisit.searchFilters,
        ...updated_planned_search_filters,
      },
    },
  };
};

export const changePlannedSelectedDate = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedVisitDate: payload,
    },
  };
};

export const changePlannedSelectedObjective = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedObjective: payload,
    },
  };
};

export const changeCustomer = (state, { payload }) => {
  return {
    ...state,
    visitInfo: {
      ...state.visitInfo,
      selectedCustomer: payload,
    },
  };
};

export const changeBrand = (state, { payload }) => {
  let updatedSelectBrandForm = _.cloneDeep(state.SelectBrandForm);
  updatedSelectBrandForm.map((obj) => {
    if (obj.id == payload.id) {
      // console.log("obj");
      obj[payload.edited_field] = payload.edited_value;
      // obj["id"] = payload.id
    }
  });
  // console.log("abcccc", updatedSelectBrandForm);

  return {
    ...state,
    SelectBrandForm: updatedSelectBrandForm,
  };
};

export const changeUpdateBrand = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.updateBrand);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    updateBrand: {
      ...state.updateBrand,
      ...updated_form,
    },
  };
};

export const changePlannedSelectedOtherObjective = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedOtherObjective: payload,
    },
  };
};

export const changePlannedStartDate = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      startDate: payload,
    },
  };
};

export const changePlannedSelectedPSM = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedVisitPSM: payload,
    },
  };
};

export const addVisitToPlan = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: state.planVisit.selectedPlannedVisits.concat(
        payload
      ),
    },
  };
};

export const removeVisitFromPlan = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: state.planVisit.selectedPlannedVisits.filter(
        (obj) => obj.local_id != payload.id
      ),
    },
  };
};

export const editSelectedVisits = (state, { payload }) => {
  let updatedSelectedVisits = [];
  state.planVisit.selectedPlannedVisits.map((obj) => {
    if (obj.local_id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
    updatedSelectedVisits.push(obj);
  });
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: updatedSelectedVisits,
    },
  };
};

export const submitSelectedPlannedVisitsSuccess = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: [],
      submitPlannedVisitsLoader: false,
    },
  };
};

export const submitSelectedPlannedVisitsFailure = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      submitPlannedVisitsLoader: false,
    },
  };
};

export const submitSelectedPlannedVisitsLoading = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      submitPlannedVisitsLoader: true,
    },
  };
};

export const submitSelectedPlannedVisitsLoadingStop = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      submitPlannedVisitsLoader: false,
    },
  };
};

export const findNearMeLoading = (state) => {
  return {
    ...state,
    unplannedVisit: {
      ...state.unplannedVisit,
      findNearMeLoader: true,
    },
  };
};

export const findNearMeLoadingStop = (state) => {
  return {
    ...state,
    unplannedVisit: {
      ...state.unplannedVisit,
      findNearMeLoader: false,
    },
  };
};

export const setNearLocation = (state, { payload }) => {
  return {
    ...state,
    unplannedVisit: {
      ...state.unplannedVisit,
      nearLocation: payload,
    },
  };
};

export const changeSearchByAreaFilters = (state, { payload }) => {
  // console.log("changeSearchByAreaFilters",payload);
  let updated_unplanned_search_filters = _.cloneDeep(
    state.unplannedVisit.searchByAreaFilters
  );
  updated_unplanned_search_filters[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    unplannedVisit: {
      ...state.unplannedVisit,
      searchByAreaFilters: {
        ...state.unplannedVisit.searchFilters,
        ...updated_unplanned_search_filters,
      },
    },
  };
};

export const cancelVisitLoading = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      cancelVisitLoader: true,
    },
  };
};

export const cancelVisitSuccess = (state, { payload }) => {
  return {
    ...state,
    editVisit: {
      ...INITIAL_STATE.editVisit,
    },
  };
};

export const editVisitSuccess = (state, { payload }) => {
  return {
    ...state,
    editVisit: {
      ...INITIAL_STATE.editVisit,
    },
  };
};

export const cancelVisitFailure = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      cancelVisitLoader: false,
    },
  };
};

export const editVisitFailure = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      editVisitLoader: false,
    },
  };
};

export const editVisitLoading = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      editVisitLoader: true,
    },
  };
};

export const cancelVisitLoadingStop = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      cancelVisitLoader: false,
    },
  };
};

export const editVisitLoadingStop = (state) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      editVisitLoader: false,
    },
  };
};

export const updateVisitFormChange = (state, { payload }) => {
  let updated_visit_form_change = _.cloneDeep(state.editVisit.formData);
  updated_visit_form_change[payload.edited_field] = payload.edited_value;
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      formData: {
        ...state.editVisit.formData,
        ...updated_visit_form_change,
      },
      editVisitValidation: {
        invalid: false,
        invalid_field: "",
      },
    },
  };
};

export const editVisitValidationFailed = (state, { payload }) => {
  return {
    ...state,
    editVisit: {
      ...state.editVisit,
      editVisitValidation: {
        invalid: true,
        invalid_field: payload.invalid_field,
      },
    },
  };
};

export const executeVisit = (state, { payload }) => {
  return {
    ...state,
    executeVisitData: payload,
  };
};

export const clearVisitExecution = (state) => {
  return {
    ...state,
    executeVisitData: {},
  };
};

export const addItemToCartSuccess = (state, { payload }) => {
  //console.log('addItemToCartSuccess', payload)
  return {
    ...state,
    cart: _.cloneDeep(payload),
  };
};

export const removeItemFromCartSuccess = (state, { payload }) => {
  return {
    ...state,
    cart: _.cloneDeep(payload),
  };
};

export const editCartOrderSuccess = (state, { payload }) => {
  return {
    ...state,
    cart: _.cloneDeep(payload),
  };
};

export const placeOrderLoading = (state) => {
  return {
    ...state,
    placeOrderLoader: true,
  };
};

export const placeOrderLoadingStop = (state) => {
  return {
    ...state,
    placeOrderLoader: false,
  };
};

export const placeOrderSuccess = (state, { payload }) => {
  return {
    ...state,
    cart: {
      order: INITIAL_STATE.cart.order,
      items: [],
    },
    placeOrderLoader: false,
  };
};

export const placeOrderFailure = (state, { payload }) => {
  return {
    ...state,
    placeOrderLoader: false,
  };
};

export const clearCart = (state, { payload }) => {
  return {
    ...state,
    cart: {
      order: INITIAL_STATE.cart.order,
      items: [],
    },
    placeOrderLoader: false,
  };
};

// export const changeVisitInfoForm = (state, { payload }) => {
//     let updated_add_visit_info_form = _.cloneDeep(state.visitInfoForm);
//     updated_add_visit_info_form[payload.edited_field] = payload.edited_value;
//     return {
//         ...state,
//         visitInfoForm: {
//             ...state.visitInfoForm,
//             ...updated_add_visit_info_form
//         },
//         visitInfoFormValidation: {
//             invalid: false,
//             invalid_field: '',
//             error_message: ''
//         }
//     }
// };

export const addVisitInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    visitInfoForm: {
      ...INITIAL_STATE.visitInfoForm,
    },
    addVisitInfoLoader: false,
  };
};

export const addVisitInfoFailure = (state) => {
  return {
    ...state,
    addVisitInfoLoader: false,
  };
};

export const addVisitInfoLoading = (state) => {
  return {
    ...state,
    addVisitInfoLoader: true,
  };
};

export const addVisitInfoLoadingStop = (state) => {
  return {
    ...state,
    addVisitInfoLoader: false,
  };
};

export const visitInfoValidationFailed = (state, { payload }) => {
  return {
    ...state,
    visitInfoFormValidation: {
      invalid: true,
      ...payload,
    },
    // addVisitInfoLoader: false,
  };
};

export const clearAddInfoForm = (state, { payload }) => ({
  ...state,
  visitInfoForm: INITIAL_STATE.visitInfoForm,
});

export const setVisitInfoForm = (state, { payload }) => ({
  ...state,
  visitInfoForm: payload,
});

export const startVisitSuccess = (state, { payload }) => {
  // console.log("jaffffffffff", payload);
  return {
    ...state,
    startVisitLoader: false,
    executeVisitData: payload,
  };
};

export const startVisitFailure = (state, { payload }) => {
  return {
    ...state,
    startVisitLoader: false,
    executeVisitData: {},
  };
};

export const startVisitLoading = (state, { payload }) => {
  return {
    ...state,
    startVisitLoader: true,
    startVisitLoadingId: payload.id,
  };
};

export const startVisitLoadingStop = (state, { payload }) => {
  return {
    ...state,
    startVisitLoader: false,
    startVisitLoadingId: "",
  };
};

export const endVisitSuccess = (state, { payload }) => {
  return {
    ...state,
    endVisitLoader: false,
    executeVisitData: {},
    cart: INITIAL_STATE.cart,
    visitInfoForm: INITIAL_STATE.visitInfoForm,
  };
};

export const endVisitFailure = (state, { payload }) => {
  return {
    ...state,
    endVisitLoader: false,
  };
};

export const endVisitLoading = (state, { payload }) => {
  return {
    ...state,
    endVisitLoader: true,
    endVisitLoadingId: payload.id,
  };
};

export const endVisitLoadingStop = (state, { payload }) => {
  return {
    ...state,
    endVisitLoader: false,
    endVisitLoadingId: "",
  };
};

export const pressStartVisitSuccess = (state, { payload }) => {
  return {
    ...state,
    executeVisitData: payload,
  };
};

export const pressEndVisitSuccess = (state, { payload }) => {
  return {
    ...state,
  };
};

export const pressEditVisitSuccess = (state, { payload }) => {
  return {
    ...state,
  };
};

export const pressCancelVisitSuccess = (state, { payload }) => {
  return {
    ...state,
  };
};

export const fetchVisitInfoLoading = (state, { payload }) => {
  return {
    ...state,
    visitInfoFormLoader: true,
  };
};

export const fetchVisitInfoSuccess = (state, { payload }) => {
  return {
    // let updatedVisitInfoMapping = _.cloneDeep(state.visitInfoMapping);
    // updatedVisitInfoMapping[payload.id] = payload.data
    // return {
    //     ...state,
    //     fetchVisitInfoLoader: false,
    //     visitInfoMapping: updatedVisitInfoMapping
    // }
    ...state,
    visitInfoForm: _.cloneDeep(payload),
    visitInfoFormLoader: false,
  };
};

export const fetchVisitCompSuccess = (state, { payload }) => {
  let updatedBrandForm = [];
  // state.visitInfoFormMultiple.map((obj) => {
  //   if (payload != obj.id) {
  //     updatedVisitInfoFormMultiple.push(obj);
  //   }
  // });
  payload.map((obj) =>
    obj.competitorbrandvisitinfo.map((obj1) => updatedBrandForm.push({...obj1,parent:obj.Id}))
  );
  // console.log("hhhhhhhhhh", updatedBrandForm);
  return {
    ...state,
    updateCompForm: _.cloneDeep(payload),
    updateBrandForm: updatedBrandForm,
  };
};

export const fetchVisitInfoFailure = (state, { payload }) => {
  return {
    ...state,
    visitInfoFormLoader: false,
    visitInfoForm: {},
    updateCompForm: [],
    updateBrandForm: [],
  };
};

export const fetchVisitImageLoading = (state, { payload }) => {
  return {
    ...state,
    visitImageLoader: true,
  };
};
export const fetchVisitImageSuccess = (state, { payload }) => {
  let updatedvisitInfoImage = _.cloneDeep(state.visitInfoImage);
  updatedvisitInfoImage[payload.id] = payload.data;
  return {
    ...state,
    visitImageLoader: false,
    visitInfoImage: updatedvisitInfoImage,
  };
};

// export const fetchVisitImageSuccess = (state, { payload }) => {
//     return {
//         ...state,

//         visitInfoImage: payload
//     }
// };

export const fetchVisitImageFailure = (state, { payload }) => {
  return {
    ...state,
    visitImageLoader: false,
  };
};

export const clearImageData = (state, { payload }) => {
  return {
    ...state,
    visitInfoImage: "",
  };
};

export const addVisitInfoEntity = (state, { payload }) => {
  let updatedVisitInfoFormMultiple = _.cloneDeep(state.visitInfoFormMultiple);
  updatedVisitInfoFormMultiple.push({
    ...INITIAL_STATE.visitInfoForm,
    id: _.uniqueId(),
  });
  return {
    ...state,
    visitInfoFormMultiple: updatedVisitInfoFormMultiple,
  };
};

export const editVisitInfoEntity = (state, { payload }) => {
  let updatedVisitInfoFormMultiple = _.cloneDeep(state.visitInfoFormMultiple);
  updatedVisitInfoFormMultiple.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });
  return {
    ...state,
    visitInfoFormMultiple: updatedVisitInfoFormMultiple,
  };
};

export const removeVisitInfoEntity = (state, { payload }) => {
  let updatedVisitInfoFormMultiple = [];

  state.visitInfoFormMultiple.map((obj) => {
    if (payload != obj.id) {
      updatedVisitInfoFormMultiple.push(obj);
    }
  });

  return {
    ...state,
    visitInfoFormMultiple: updatedVisitInfoFormMultiple,
  };
};

export const addCompetitorForm = (state, { payload }) => {
  let updatedAddCompetitorForm = _.cloneDeep(state.AddCompetitorForm);
  updatedAddCompetitorForm.push(payload);
  return {
    ...state,
    AddCompetitorForm: updatedAddCompetitorForm,
  };
};

export const removeCompetitorForm = (state, { payload }) => {
  let updatedAddCompetitorForm = [];

  state.AddCompetitorForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddCompetitorForm.push(obj);
    }
  });

  return {
    ...state,
    AddCompetitorForm: updatedAddCompetitorForm,
  };
};

export const changeCompetitorForm = (state, { payload }) => {
  let updatedAddCompetitorForm = _.cloneDeep(state.AddCompetitorForm);
  updatedAddCompetitorForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddCompetitorForm: updatedAddCompetitorForm,
  };
};

export const submitCompetitorFormSuccess = (state, { payload }) => {
  return {
    ...state,
    CompetitorSubmitLoader: false,
    AddCompetitorForm: INITIAL_STATE.AddCompetitorForm,
  };
};

export const submitCompetitorFormFailure = (state, { payload }) => {
  return {
    ...state,
    CompetitorSubmitLoader: false,
  };
};

export const submitCompetitorFormLoading = (state, { payload }) => {
  return {
    ...state,
    CompetitorSubmitLoader: true,
  };
};

export const submitCompetitorFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    CompetitorSubmitLoader: false,
  };
};

export const CompetitorFormValidationFailed = (state, { payload }) => {
  return {
    ...state,
    CompetitorFormValidation: payload,
  };
};

export const addStockForm = (state, { payload }) => {
  let updatedAddStockForm = _.cloneDeep(state.AddStockForm);
  updatedAddStockForm.push(payload);
  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};

export const removeStockForm = (state, { payload }) => {
  let updatedAddStockForm = [];

  state.AddStockForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddStockForm.push(obj);
    }
  });

  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};

export const addBrandForm = (state, { payload }) => {
  let updatedAddBrandForm = _.cloneDeep(state.AddBrandForm);
  updatedAddBrandForm.push(payload);
  return {
    ...state,
    AddBrandForm: updatedAddBrandForm,
  };
};

export const removeBrandForm = (state, { payload }) => {
  let updatedAddBrandForm = [];

  state.AddBrandForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddBrandForm.push(obj);
    }
  });

  return {
    ...state,
    AddBrandForm: updatedAddBrandForm,
  };
};

export const changeBrandForm = (state, { payload }) => {
  let updatedAddCompForm = _.cloneDeep(state.AddBrandForm);
  updatedAddCompForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
      obj[payload.edited_field1] = payload.edited_value1;
    }
  });

  return {
    ...state,
    AddBrandForm: updatedAddCompForm,
  };
};

export const changeUpdateBrandForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.updateBrandForm);
  updated_form.map((obj) => {
    if (obj.Id == payload.Id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    updateBrandForm: updated_form,
  };
};

export const addCompForm = (state, { payload }) => {
  let updatedAddCompForm = _.cloneDeep(state.AddCompForm);
  updatedAddCompForm.push(payload);
  return {
    ...state,
    AddCompForm: updatedAddCompForm,
  };
};

export const removeCompForm = (state, { payload }) => {
  let updatedAddCompForm = [];

  state.AddCompForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedAddCompForm.push(obj);
    }
  });

  return {
    ...state,
    AddCompForm: updatedAddCompForm,
  };
};

export const changeCompForm = (state, { payload }) => {
  let updatedAddCompForm = _.cloneDeep(state.AddCompForm);
  updatedAddCompForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddCompForm: updatedAddCompForm,
  };
};

export const ChangeNewCompetitorFormSuccess = (state, { payload }) => {
  //console.log(state)
  //console.log(payload)
  return {
    ...state,

    AddCompForm: _.cloneDeep(payload),
  };
};

//   export const changeUpdateCompForm= (state, { payload }) => {

//     let updated_form= _.cloneDeep(state.visitInfoForm.competitorvisitinfo);
//     updated_form.map((obj) => {
//         if (obj.id == payload.id && !payload.show) {
//          obj.competitorbrandvisitinfo.map((items) => {
//              if(items.id == payload.childId){
//                 items[payload.edited_field] = payload.edited_value;
//              }
//          })

//         }
//         if(obj.id == payload.id && payload.show){

//         updated_form[payload.edited_field] = payload.edited_value;

//         }
//       });

//     return {
//       ...state,
//       visitInfoForm: {
//         ...state.visitInfoForm,
//         competitorvisitinfo:updated_form
//     }
//     }
//   }

export const changeUpdateCompForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.updateCompForm);

  updated_form.map((obj) => {
    if (obj.Id == payload.Id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    updateCompForm: updated_form,
  };
};

export const changeStockForm = (state, { payload }) => {
  let updatedAddStockForm = _.cloneDeep(state.AddStockForm);
  updatedAddStockForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    AddStockForm: updatedAddStockForm,
  };
};

export const changeUpdateStock = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.updateStockForm);
  updated_form[payload.edited_field] = payload.edited_value;
  updated_form[payload.edited_field1] = payload.edited_value1;
  return {
    ...state,
    updateStockForm: {
      ...state.updateStockForm,
      ...updated_form,
    },
  };
};
export const changeUpdateStockForm = (state, { payload }) => {
  let updatedAddStockForm = _.cloneDeep(state.visitStock);
  updatedAddStockForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    visitStock: updatedAddStockForm,
  };
};

export const changeUpdateCompetitorForm = (state, { payload }) => {
  let updatedAddCompetitorForm = _.cloneDeep(state.visitCompetitor);
  updatedAddCompetitorForm.map((obj) => {
    if (obj.id == payload.id) {
      obj[payload.edited_field] = payload.edited_value;
    }
  });

  return {
    ...state,
    visitCompetitor: updatedAddCompetitorForm,
  };
};

export const submitStockFormSuccess = (state, { payload }) => {
  return {
    ...state,
    StockSubmitLoader: false,
    AddStockForm: INITIAL_STATE.AddStockForm,
  };
};

export const submitStockFormFailure = (state, { payload }) => {
  return {
    ...state,
    StockSubmitLoader: false,
  };
};

export const submitStockFormLoading = (state, { payload }) => {
  return {
    ...state,
    StockSubmitLoader: true,
  };
};

export const submitStockFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    StockSubmitLoader: false,
  };
};

export const StockFormValidationFailed = (state, { payload }) => {
  return {
    ...state,
    StockFormValidation: payload,
  };
};

export const getCompetitorSuccess = (state, { payload }) => ({
  ...state,
  visitCompetitor: payload,
  getVisitCompetitorLoader: false,
});

export const getCompetitorFailure = (state) => ({
  ...state,
  visitCompetitor: [],

  getVisitCompetitorLoader: false,
});

export const getCompetitorLoading = (state) => ({
  ...state,

  getVisitCompetitorLoader: true,
});

export const getStockSuccess = (state, { payload }) => ({
  ...state,
  visitStock: payload,
  getVisitStockLoader: false,
});

export const getStockFailure = (state) => ({
  ...state,
  visitStock: [],

  getVisitStockLoader: false,
});

export const getStockLoading = (state) => ({
  ...state,

  getVisitStockLoader: true,
});

export const submitUpdateStockFormSuccess = (state, { payload }) => {
  return {
    ...state,
    UpdateStockSubmitLoader: false,
    // AddStockForm: INITIAL_STATE.AddStockForm
  };
};

export const submitUpdateStockFormFailure = (state, { payload }) => {
  return {
    ...state,
    UpdateStockSubmitLoader: false,
  };
};

export const submitUpdateStockFormLoading = (state, { payload }) => {
  return {
    ...state,
    UpdateStockSubmitLoader: payload.id,
  };
};

export const submitUpdateStockFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    UpdateStockSubmitLoader: false,
  };
};

export const submitUpdateCompetitorFormSuccess = (state, { payload }) => {
  return {
    ...state,
    UpdateCompetitorSubmitLoader: false,
    // AddStockForm: INITIAL_STATE.AddStockForm
  };
};

export const submitUpdateCompetitorFormFailure = (state, { payload }) => {
  return {
    ...state,
    UpdateCompetitorSubmitLoader: false,
  };
};

export const submitUpdateCompetitorFormLoading = (state, { payload }) => {
  return {
    ...state,
    UpdateCompetitorSubmitLoader: payload.id,
  };
};

export const submitUpdateCompetitorFormLoadingStop = (state, { payload }) => {
  return {
    ...state,
    UpdateCompetitorSubmitLoader: false,
  };
};

export const getParentAreasSuccess = (state, { payload }) => ({
  ...state,
  parentAreas: payload,
  getParentAreasLoader: false,
});

export const getParentAreasFailure = (state) => ({
  ...state,
  parentAreas: {},

  getParentAreasLoader: false,
});

export const getParentAreasLoading = (state) => ({
  ...state,

  getParentAreasLoader: true,
});

export const getObjectiveSuccess = (state, { payload }) => ({
  ...state,
  objectList: payload,
  objectListLoader: false,
});

export const getObjectiveFailure = (state) => ({
  ...state,
  objectList: [],

  objectListLoader: false,
});

export const getObjectiveLoading = (state) => ({
  ...state,

  objectListLoader: true,
});

export const changeOrderHeaderForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.orderHeaderForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    orderHeaderForm: {
      ...state.orderHeaderForm,
      ...updated_form,
    },
    // OrderFormValidation: {
    //     invalid: false,
    //     invalid_field: ''
    // }
  };
};

export const orderHeaderFormValidationFailed = (state, { payload }) => ({
  ...state,
  // OrderFormValidation: {
  //     ...payload
  // }
});

export const clearOrderHeaderForm = (state) => ({
  ...state,
  orderHeaderForm: {},
});

export const addBulkVisitsToPlanSuccess = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: payload,
    },
  };
};

export const removeBulkVisitsToPlanSuccess = (state, { payload }) => {
  return {
    ...state,
    planVisit: {
      ...state.planVisit,
      selectedPlannedVisits: payload,
    },
  };
};

export const setAddVisitData = (state, { payload }) => {
  return {
    ...state,
    addVisitData: payload,
  };
};

export const createVisitInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    visitInfoForm: {
      ...state.visitInfoForm,
    },
    // selectedDistributorForm: [],
    visitInfoFormLoader: false,
    record: payload.data,
  };
};

export const createVisitInfoFailure = (state, { payload }) => {
  return {
    ...state,
    visitInfoForm: {
      ...state.visitInfoForm,
    },
    visitInfoFormLoader: false,
  };
};

export const createVisitInfoLoading = (state) => ({
  ...state,
  visitInfoFormLoader: true,
});

export const createVisitInfoLoadingStop = (state) => {
  return {
    ...state,

    visitInfoFormLoader: false,
  };
};

export const changeVisitInfoForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.visitInfoForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    visitInfoForm: {
      ...state.visitInfoForm,
      ...updated_form,
    },
    formValidation: {
      invalid: false,
      invalid_field: "",
    },
  };
};

export const clearVisitInfo = (state) => ({
  ...state,
  visitInfoForm: {},
  AddStockForm: INITIAL_STATE.AddStockForm,
  AddBrandForm: INITIAL_STATE.AddBrandForm,
  AddCompForm: INITIAL_STATE.AddCompForm,
  SelectBrandForm: INITIAL_STATE.SelectBrandForm,
  brandInfo: INITIAL_STATE.brandInfo,
  compFactor: INITIAL_STATE.compFactor,
  imageForm: {},
});

export const clearBox = (state) => ({
  ...state,
  AddStockForm: [],
  AddBrandForm: [],
  AddCompForm: [],
  SelectBrandForm: [],
  brandInfo:[],
  compFactor: [],
});

export const getVisitSummaryLoading = (state, { payload }) => {
  return {
    ...state,
    visitSummaryLoader: true,
  };
};

export const getVisitSummarySuccess = (state, { payload }) => {
  return {
    ...state,
    visitSummary: _.cloneDeep(payload),
    visitSummaryLoader: false,
  };
};

export const getVisitSummaryFailure = (state, { payload }) => {
  return {
    ...state,
    visitSummaryLoader: false,
    visitSummary: {},
  };
};

export const getVisitHistoryLoading = (state, { payload }) => {
  return {
    ...state,
    visitHistoryLoader: true,
  };
};

export const getVisitHistorySuccess = (state, { payload }) => {
  return {
    ...state,
    visitHistory: _.cloneDeep(payload),
    visitHistoryLoader: false,
  };
};

export const getVisitHistoryFailure = (state, { payload }) => {
  return {
    ...state,
    visitHistoryLoader: false,
  };
};

export const updateVisitInfoSuccess = (state, { payload }) => ({
  ...state,
  visitInfoForm: {
    ...state.visitInfoForm,
  },

  record: payload.data,

  updateCompForm: [],

  updateBrandForm: [],
  updateVisitInfoLoader: false,
});

export const updateVisitInfoLoading = (state) => ({
  ...state,
  updateVisitInfoLoader: true,
});

export const updateVisitInfoLoadingStop = (state) => ({
  ...state,
  updateVisitInfoLoader: false,
});

export const updateVisitInfoFailure = (state, { payload }) => ({
  ...state,
  updateVisitInfoLoader: false,
});

export const selectBrandForm = (state, { payload }) => {
  let updatedSelectBrandForm = _.cloneDeep(state.SelectBrandForm);
  updatedSelectBrandForm.push(payload);
  return {
    ...state,
    SelectBrandForm: updatedSelectBrandForm,
  };
};

export const removeSelectForm = (state, { payload }) => {
  let updatedSelectBrandForm = [];

  state.SelectBrandForm.map((obj) => {
    if (obj.id != payload.id) {
      updatedSelectBrandForm.push(obj);
    }
  });

  return {
    ...state,
    SelectBrandForm: updatedSelectBrandForm,
  };
};

export const addBrandInfo = (state, { payload }) => ({
  ...state,
  brandInfo: _.cloneDeep(payload),
});

export const addCompFactor = (state, { payload }) => ({
  ...state,
  compFactor: _.cloneDeep(payload),
});

export const addCompInfo = (state, { payload }) => ({
  ...state,
  compInfo: _.cloneDeep(payload),
});
export const addCompBrand = (state, { payload }) => ({
  ...state,
  compBrand: _.cloneDeep(payload),
});

export const enabledForm = (state, { payload }) => ({
  ...state,
  showPicker: false,
  showInput: true,
  showButton: true,
  dropPicker: true,
});

export const disabledForm = (state, { payload }) => ({
  ...state,
  showPicker: true,
  showInput: false,
  showButton: false,
  dropPicker: false,
});

export const changeImageForm = (state, { payload }) => {
  let updated_form = _.cloneDeep(state.imageForm);
  updated_form[payload.edited_field] = payload.edited_value;

  return {
    ...state,
    imageForm: {
      ...state.imageForm,
      ...updated_form,
    },
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [VisitsTypes.FETCH_VISITS_STORAGE_LIST_SUCCESS]: fetchVisitsStorageListSuccess,
  [VisitsTypes.FETCH_VISITS_STORAGE_LIST_FAILURE]: fetchVisitsStorageListFailure,

  [VisitsTypes.FETCH_VISIT_IMAGE_SUCCESS]: fetchVisitImageSuccess,
  [VisitsTypes.FETCH_VISIT_IMAGE_FAILURE]: fetchVisitImageFailure,
  [VisitsTypes.FETCH_VISIT_IMAGE_LOADING]: fetchVisitImageLoading,

  [VisitsTypes.CLEAR_IMAGE_DATA]: clearImageData,

  [VisitsTypes.CLEAR_CART]: clearCart,
  [VisitsTypes.CLEAR_BOX]: clearBox,
  [VisitsTypes.CLEAR_VISIT_INFO]: clearVisitInfo,

  [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_SUCCESS]: fetchVisitsDisplayListSuccess,
  [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_FAILURE]: fetchVisitsDisplayListFailure,
  [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_LOADING]: fetchVisitsDisplayListLoading,
  [VisitsTypes.FETCH_VISITS_DISPLAY_LIST_LOADING_STOP]: fetchVisitsDisplayListLoadingStop,
  [VisitsTypes.FETCH_FILTERED_VISITS_DISPLAY_LIST_SUCCESS]: fetchFilteredVisitsDisplayListSuccess,

  [VisitsTypes.CHANGE_SEARCH_FILTERS]: changeSearchFilters,
  [VisitsTypes.OPEN_VISITS_ACTION]: openVisitsAction,
  [VisitsTypes.CLOSE_VISITS_ACTION]: closeVisitsAction,
  [VisitsTypes.DO_NOTHING]: doNothing,

  [VisitsTypes.CHANGE_ADD_PLANNED_VISITS_SEARCH_FILTERS]: changeAddPlannedVisitsSearchFilters,
  [VisitsTypes.CHANGE_PLANNED_SELECTED_DATE]: changePlannedSelectedDate,
  [VisitsTypes.CHANGE_PLANNED_SELECTED_OBJECTIVE]: changePlannedSelectedObjective,
  [VisitsTypes.CHANGE_CUSTOMER]: changeCustomer,
  [VisitsTypes.CHANGE_BRAND]: changeBrand,
  [VisitsTypes.CHANGE_PLANNED_SELECTED_OTHER_OBJECTIVE]: changePlannedSelectedOtherObjective,
  [VisitsTypes.CHANGE_PLANNED_START_DATE]: changePlannedStartDate,
  [VisitsTypes.CHANGE_PLANNED_SELECTED_PSM]: changePlannedSelectedPSM,

  [VisitsTypes.ADD_VISIT_TO_PLAN]: addVisitToPlan,
  [VisitsTypes.REMOVE_VISIT_FROM_PLAN]: removeVisitFromPlan,
  [VisitsTypes.EDIT_SELECTED_VISITS]: editSelectedVisits,
  // //[VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS]   			    : submitSelectedPlannedVisits,
  [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_SUCCESS]: submitSelectedPlannedVisitsSuccess,
  [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_FAILURE]: submitSelectedPlannedVisitsFailure,
  [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_LOADING]: submitSelectedPlannedVisitsLoading,
  [VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS_LOADING_STOP]: submitSelectedPlannedVisitsLoadingStop,

  [VisitsTypes.FIND_NEAR_ME_LOADING]: findNearMeLoading,
  [VisitsTypes.FIND_NEAR_ME_LOADING_STOP]: findNearMeLoadingStop,
  [VisitsTypes.SET_NEAR_LOCATION]: setNearLocation,
  [VisitsTypes.CHANGE_SEARCH_BY_AREA_FILTERS]: changeSearchByAreaFilters,

  [VisitsTypes.CANCEL_VISIT_LOADING]: cancelVisitLoading,
  [VisitsTypes.EDIT_VISIT_LOADING]: editVisitLoading,
  [VisitsTypes.EDIT_VISIT_SUCCESS]: editVisitSuccess,
  [VisitsTypes.CANCEL_VISIT_SUCCESS]: cancelVisitSuccess,
  [VisitsTypes.EDIT_VISIT_FAILURE]: editVisitFailure,
  [VisitsTypes.CANCEL_VISIT_FAILURE]: cancelVisitFailure,
  [VisitsTypes.CANCEL_VISIT_LOADING_STOP]: cancelVisitLoadingStop,
  [VisitsTypes.EDIT_VISIT_LOADING_STOP]: editVisitLoadingStop,
  [VisitsTypes.UPDATE_VISIT_FORM_CHANGE]: updateVisitFormChange,
  [VisitsTypes.EDIT_VISIT_VALIDATION_FAILED]: editVisitValidationFailed,
  [VisitsTypes.EXECUTE_VISIT]: executeVisit,
  [VisitsTypes.CLEAR_VISIT_EXECUTION]: clearVisitExecution,

  [VisitsTypes.ADD_ITEM_TO_CART_SUCCESS]: addItemToCartSuccess,
  [VisitsTypes.REMOVE_ITEM_FROM_CART_SUCCESS]: removeItemFromCartSuccess,
  [VisitsTypes.EDIT_CART_ORDER_SUCCESS]: editCartOrderSuccess,

  [VisitsTypes.PLACE_ORDER_LOADING]: placeOrderLoading,
  [VisitsTypes.PLACE_ORDER_LOADING_STOP]: placeOrderLoadingStop,
  [VisitsTypes.PLACE_ORDER_SUCCESS]: placeOrderSuccess,
  [VisitsTypes.PLACE_ORDER_FAILURE]: placeOrderFailure,

  // [VisitsTypes.CHANGE_VISIT_INFO_FORM]: changeVisitInfoForm,
  [VisitsTypes.ADD_VISIT_INFO_SUCCESS]: addVisitInfoSuccess,
  [VisitsTypes.ADD_VISIT_INFO_FAILURE]: addVisitInfoFailure,
  [VisitsTypes.ADD_VISIT_INFO_LOADING]: addVisitInfoLoading,
  [VisitsTypes.ADD_VISIT_INFO_LOADING_STOP]: addVisitInfoLoadingStop,
  [VisitsTypes.VISIT_INFO_VALIDATION_FAILED]: visitInfoValidationFailed,
  [VisitsTypes.CLEAR_ADD_INFO_FORM]: clearAddInfoForm,
  [VisitsTypes.SET_VISIT_INFO_FORM]: setVisitInfoForm,

  //[VisitsTypes.VISIT_INFO_VALIDATION_FAILED]                  : startVisit: ['payload'],
  [VisitsTypes.START_VISIT_SUCCESS]: startVisitSuccess,
  [VisitsTypes.START_VISIT_FAILURE]: startVisitFailure,
  [VisitsTypes.START_VISIT_LOADING]: startVisitLoading,
  [VisitsTypes.START_VISIT_LOADING_STOP]: startVisitLoadingStop,

  //[VisitsTypes.VISIT_INFO_VALIDATION_FAILED]                  : endVisit: ['payload'],
  [VisitsTypes.END_VISIT_SUCCESS]: endVisitSuccess,
  [VisitsTypes.END_VISIT_FAILURE]: endVisitFailure,
  [VisitsTypes.END_VISIT_LOADING]: endVisitLoading,
  [VisitsTypes.END_VISIT_LOADING_STOP]: endVisitLoadingStop,

  [VisitsTypes.PRESS_START_VISIT_SUCCESS]: pressStartVisitSuccess,
  [VisitsTypes.PRESS_END_VISIT_SUCCESS]: pressEndVisitSuccess,
  [VisitsTypes.PRESS_EDIT_VISIT_SUCCESS]: pressEditVisitSuccess,
  [VisitsTypes.PRESS_CANCEL_VISIT_SUCCESS]: pressCancelVisitSuccess,

  [VisitsTypes.FETCH_VISIT_INFO_LOADING]: fetchVisitInfoLoading,
  [VisitsTypes.FETCH_VISIT_INFO_SUCCESS]: fetchVisitInfoSuccess,

  [VisitsTypes.FETCH_VISIT_COMP_SUCCESS]: fetchVisitCompSuccess,
  [VisitsTypes.FETCH_VISIT_INFO_FAILURE]: fetchVisitInfoFailure,
  [VisitsTypes.ADD_VISIT_INFO_ENTITY]: addVisitInfoEntity,
  [VisitsTypes.REMOVE_VISIT_INFO_ENTITY]: removeVisitInfoEntity,

  [VisitsTypes.EDIT_VISIT_INFO_ENTITY]: editVisitInfoEntity,
  //[VisitsTypes.PRESS_CANCEL_VISIT_SUCCESS]: fetchVisitInfo

  [VisitsTypes.ADD_COMPETITOR_FORM]: addCompetitorForm,
  [VisitsTypes.REMOVE_COMPETITOR_FORM]: removeCompetitorForm,
  [VisitsTypes.CHANGE_COMPETITOR_FORM]: changeCompetitorForm,

  [VisitsTypes.COMPETITOR_FORM_VALIDATION_FAILED]: CompetitorFormValidationFailed,
  [VisitsTypes.SUBMIT_COMPETITOR_FORM_LOADING_STOP]: submitCompetitorFormLoadingStop,
  [VisitsTypes.SUBMIT_COMPETITOR_FORM_LOADING]: submitCompetitorFormLoading,
  [VisitsTypes.SUBMIT_COMPETITOR_FORM_FAILURE]: submitCompetitorFormFailure,
  [VisitsTypes.SUBMIT_COMPETITOR_FORM_SUCCESS]: submitCompetitorFormSuccess,

  [VisitsTypes.ADD_STOCK_FORM]: addStockForm,
  [VisitsTypes.REMOVE_STOCK_FORM]: removeStockForm,
  [VisitsTypes.ADD_BRAND_FORM]: addBrandForm,

  [VisitsTypes.REMOVE_BRAND_FORM]: removeBrandForm,
  [VisitsTypes.CHANGE_BRAND_FORM]: changeBrandForm,
  [VisitsTypes.CHANGE_UPDATE_BRAND_FORM]: changeUpdateBrandForm,

  [VisitsTypes.SELECT_BRAND_FORM]: selectBrandForm,
  [VisitsTypes.REMOVE_SELECT_FORM]: removeSelectForm,

  [VisitsTypes.ADD_COMP_FORM]: addCompForm,
  [VisitsTypes.REMOVE_COMP_FORM]: removeCompForm,
  [VisitsTypes.CHANGE_COMP_FORM]: changeCompForm,
  [VisitsTypes.CHANGE_NEW_COMPETITOR_FORM_SUCCESS]: ChangeNewCompetitorFormSuccess,
  [VisitsTypes.CHANGE_UPDATE_COMP_FORM]: changeUpdateCompForm,
  [VisitsTypes.CHANGE_UPDATE_STOCK]: changeUpdateStock,
  [VisitsTypes.CHANGE_UPDATE_BRAND]: changeUpdateBrand,

  [VisitsTypes.CHANGE_STOCK_FORM]: changeStockForm,
  [VisitsTypes.CHANGE_UPDATE_STOCK_FORM]: changeUpdateStockForm,

  [VisitsTypes.CHANGE_UPDATE_COMPETITOR_FORM]: changeUpdateCompetitorForm,

  [VisitsTypes.STOCK_FORM_VALIDATION_FAILED]: StockFormValidationFailed,
  [VisitsTypes.SUBMIT_STOCK_FORM_LOADING_STOP]: submitStockFormLoadingStop,
  [VisitsTypes.SUBMIT_STOCK_FORM_LOADING]: submitStockFormLoading,
  [VisitsTypes.SUBMIT_STOCK_FORM_FAILURE]: submitStockFormFailure,
  [VisitsTypes.SUBMIT_STOCK_FORM_SUCCESS]: submitStockFormSuccess,

  [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_LOADING_STOP]: submitUpdateCompetitorFormLoadingStop,
  [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_LOADING]: submitUpdateCompetitorFormLoading,
  [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_FAILURE]: submitUpdateCompetitorFormFailure,
  [VisitsTypes.SUBMIT_UPDATE_COMPETITOR_FORM_SUCCESS]: submitUpdateCompetitorFormSuccess,

  [VisitsTypes.GET_COMPETITOR_LOADING]: getCompetitorLoading,
  [VisitsTypes.GET_COMPETITOR_FAILURE]: getCompetitorFailure,
  [VisitsTypes.GET_COMPETITOR_SUCCESS]: getCompetitorSuccess,

  [VisitsTypes.GET_STOCK_LOADING]: getStockLoading,
  [VisitsTypes.GET_STOCK_FAILURE]: getStockFailure,
  [VisitsTypes.GET_STOCK_SUCCESS]: getStockSuccess,

  [VisitsTypes.GET_PARENT_AREAS_LOADING]: getParentAreasLoading,
  [VisitsTypes.GET_PARENT_AREAS_FAILURE]: getParentAreasFailure,
  [VisitsTypes.GET_PARENT_AREAS_SUCCESS]: getParentAreasSuccess,

  [VisitsTypes.GET_OBJECTIVE_LOADING]: getObjectiveLoading,
  [VisitsTypes.GET_OBJECTIVE_FAILURE]: getObjectiveFailure,
  [VisitsTypes.GET_OBJECTIVE_SUCCESS]: getObjectiveSuccess,

  [VisitsTypes.CHANGE_ORDER_HEADER_FORM]: changeOrderHeaderForm,
  [VisitsTypes.ORDER_HEADER_FORM_VALIDATION_FAILED]: orderHeaderFormValidationFailed,
  [VisitsTypes.CLEAR_ORDER_HEADER_FORM]: clearOrderHeaderForm,

  [VisitsTypes.ADD_BULK_VISITS_TO_PLAN_SUCCESS]: addBulkVisitsToPlanSuccess,
  [VisitsTypes.REMOVE_BULK_VISITS_TO_PLAN_SUCCESS]: removeBulkVisitsToPlanSuccess,

  [VisitsTypes.SET_ADD_VISIT_DATA]: setAddVisitData,

  [VisitsTypes.CHANGE_VISIT_INFO_FORM]: changeVisitInfoForm,

  [VisitsTypes.CREATE_VISIT_INFO_SUCCESS]: createVisitInfoSuccess,
  [VisitsTypes.CREATE_VISIT_INFO_FAILURE]: createVisitInfoFailure,
  [VisitsTypes.CREATE_VISIT_INFO_LOADING]: createVisitInfoLoading,
  [VisitsTypes.CREATE_VISIT_INFO_LOADING_STOP]: createVisitInfoLoadingStop,

  [VisitsTypes.GET_VISIT_SUMMARY_LOADING]: getVisitSummaryLoading,
  [VisitsTypes.GET_VISIT_SUMMARY_SUCCESS]: getVisitSummarySuccess,
  [VisitsTypes.GET_VISIT_SUMMARY_FAILURE]: getVisitSummaryFailure,

  [VisitsTypes.GET_VISIT_HISTORY_LOADING]: getVisitHistoryLoading,
  [VisitsTypes.GET_VISIT_HISTORY_SUCCESS]: getVisitHistorySuccess,
  [VisitsTypes.GET_VISIT_HISTORY_FAILURE]: getVisitHistoryFailure,

  [VisitsTypes.UPDATE_VISIT_INFO_LOADING]: updateVisitInfoLoading,
  [VisitsTypes.UPDATE_VISIT_INFO_LOADING_STOP]: updateVisitInfoLoadingStop,
  [VisitsTypes.UPDATE_VISIT_INFO_SUCCESS]: updateVisitInfoSuccess,
  [VisitsTypes.UPDATE_VISIT_INFO_FAILURE]: updateVisitInfoFailure,

  [VisitsTypes.ADD_BRAND_INFO]: addBrandInfo,
  [VisitsTypes.ADD_COMP_FACTOR]: addCompFactor,
  [VisitsTypes.ADD_COMP_INFO]: addCompInfo,
  [VisitsTypes.ADD_COMP_BRAND]: addCompBrand,

  [VisitsTypes.ENABLED_FORM]: enabledForm,
  [VisitsTypes.DISABLED_FORM]: disabledForm,
  [VisitsTypes.CHANGE_IMAGE_FORM]: changeImageForm,
});
