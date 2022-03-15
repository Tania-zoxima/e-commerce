import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({
  changeCompetitorForm: ['payload'],

  createCompetitorForm: ['payload'],
	createCompetitorFormSuccess: ['payload'],
	createCompetitorFormFailure: null,
	createCompetitorFormLoading: null,
	createCompetitorFormLoadingStop: null,

  getCompetitorName: ['payload'],
	getCompetitorNameSuccess: ['payload'],
	getCompetitorNameFailure: ['payload'],
	getCompetitorNameLoading: null,
	getCompetitorNameLoadingStop: null,

  getCompetitor: ['payload'],
  getCompetitorLoading: null,
  getCompetitorSuccess: ['payload'],
  getCompetitorFailure: null,
  getCompetitorLoadingStop: null,

  getCompetitorWithDate: ['payload'],
  getCompetitorWithDateLoading: null,
  getCompetitorWithDateSuccess: ['payload'],
  getCompetitorWithDateFailure: null,
  getCompetitorWithDateLoadingStop: null,

  getClass: ['payload'],
	getClassSuccess: ['payload'],
	getClassFailure: ['payload'],
	getClassLoading: null,
	getClassLoadingStop: null,
  
  changeCompetitorSearchFilters: ['payload'],

    clearCompetitorForm: null,

    getCompetitorParent: ['payload'],
    getCompetitorParentLoading: null,
    getCompetitorParentSuccess: ['payload'],
    getCompetitorParentFailure: null,
    getCompetitorParentLoadingStop: null,

    getCompetitorChild: ['payload'],
    getCompetitorChildLoading: null,
    getCompetitorChildSuccess: ['payload'],
    getCompetitorChildFailure: null,
    getCompetitorChildLoadingStop: null,

    searchCompetitor:["payload"],
   changeSearchCompetitorFilters: ['payload'],
   resetFilter:null,
   resetDateFilter:null
});

    export const CompetitorTypes = Types
    export default Creators