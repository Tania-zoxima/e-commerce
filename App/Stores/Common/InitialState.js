export const INITIAL_STATE = {
	isNetworkBannerVisible: false,
	currentScreen: 'SplashScreen',
	absentReasons: ['Planned', 'Ad-hoc'],
	categoryRatingMapping: {
		'A': 5,
		'B': 4,
		'C': 3
	},
	recurringMapping: [
		{ id: 'Monday', name: 'Every Monday' },
		{ id: 'Tuesday', name: 'Every Tuesday' },
		{ id: 'Wednesday', name: 'Every Wednesday' },
		{ id: 'Thursday', name: 'Every Thursday' },
		{ id: 'Friday', name: 'Every Friday' },
		{ id: 'Saturday', name: 'Every Saturday' }
	],
	genericActionModal: {
		visible: false,
		content: [],
		heading: '',
		bodyFlexHeight: '',
		disable: false
	},


	agentAreaPjp: [],
	agentPjp: [],
	agentBeatPjp:[],
	fetchAllAreaPjpLoading: false,
	
	objectiveList: [{id:'Order', name:'Order'},
	{id:'Collection', name:'Collection'},
	{id:'Relationship Building', name:'Relationship Building'},
	{id:'New Product Demo', name:'New Product Demo'},
	{id:'Issues Resolution', name:'Issues Resolution'},
	{id:'Meet', name:'Meet'},
	{id:'Workshop', name:'Workshop'},
	{id:'Others', name:'Others'},

],
	// fetchObjectiveLoading: false,

	stateList: [],
	fetchStateLoading: false,

	cityList: [],
	fetchCityLoading: false,

	cityAllList: [],
	fetchAllCityLoading: false,

	uploadImageLoader: false,

	uploadImageField: '',

	currentLocation: {
        latitude:'',
        longitude: ''
	},
	fetchCurrentLocationLoader: false,
	
	agentBeat: [],
	dealerType:[],
	retailerArea:[],
    fetchBeatLoading: false,
	fetchBeatFailure: false,
	
	fetchRetailerAreaLoading: false,
	fetchDealerTypeLoading: false,

	agentDistChannel:[],
	searchDistChannel:[],
	agentAllPlant:[],
	searchAllPlant:[],
	agentIncoTerm:[],
	agentAllRoute:[],
	agentAllInsurance:[],
	getBillPartyList: [],
  

	fetchDistChannelLoading: false,
	fetchAllPlantLoading: false,
	fetchIncoTermLoading: false,
	fetchAllRouteLoading: false,
	fetchAllInsuranceLoading: false,
	getBillPartyLoading: false,

	divisionList: [
		{id: 'a1B1y000000CUu2EAG', name: 'Board'},
		{id: 'a1B1y000000CUu1EAG', name: 'Paper'},
	],

	isObjModalVisible: false,

	languageSpoken :[
		{ id: "English", name: "English" },
		{ id: "Hindi", name: "Hindi" },
	  ],
	//   retailerForm: {},

	languageWriting :[
		{ id: "English", name: "English" },
		{ id: "Hindi", name: "Hindi" },
		{ id: "Punjabi", name: "Punjabi" },

	  ],
	  competitorName :[
		{ id: "Astral", name: "Astral" },
		{ id: "Ashirvad", name: "Ashirvad" },
		{ id: "Supreme", name: "Supreme" },

	  ],
	  competitorProduct :[
		{ id: "Drainage", name: "Drainage" },
		{ id: "Plumbing", name: "Plumbing" },
		{ id: "Others", name: "Others" },

	  ],
	  typeOptions :[
		{ id: "PPF", name: "PPF" },
		{ id: "Non PPF", name: "Non PPF" },
		],

		reasonOptions :[
			{ id: "Price", name: "Price" },
			{ id: "Margin", name: "Margin" },
			{ id: "Brand Visibility", name: "Brand Visibility" },
			{ id: "Brand Awareness Missing", name: "Brand Awareness Missing" },
			{ id: "Credit Period", name: "Credit Period" },
			{ id: "Relation with Distributor", name: "Relation with Distributor" },
			{ id: "Relation with Sales Person", name: "Relation with Sales Person" },
			{ id: "Availability", name: "Availability" },
			{ id: "Secondary Sales by Sales Person", name: "Secondary Sales by Sales Person" },
			{ id: "Transparency/Ease of Transactions", name: "Transparency/Ease of Transactions" },
			],
			

			notifications: [],
			getAllNotificationsLoader: false,

			uploadUserImageLoader: false,

	        uploadUserImageField: '',




	
}
