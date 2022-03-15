import { createAppContainer, createStackNavigator } from "react-navigation";

import LoginScreen from "App/Containers/Login";
import LoginOtpScreen from "App/Containers/Login/LoginOtpScreen";
import SplashScreen from "App/Containers/SplashScreen/SplashScreen";
import StartDayScreen from "App/Containers/StartDay";
import StartDaySelectionScreen from "App/Containers/StartDay/StartDaySelectionScreen";
import PresentScreen from "App/Containers/Present";
import WorkFromHomeScreen from "App/Containers/Present/WorkFromHomeScreen";
import InDepotScreen from "App/Containers/Present/InDepotScreen";
import InFactoryScreen from "App/Containers/Present/InFactoryScreen";
import TravelScreen from "App/Containers/Present/TravelScreen";

import InOfficeScreen from "App/Containers/Present/InOfficeScreen";
import TravelModeScreen from "App/Containers/Present/TravelModeScreen";
import AbsentScreen from "App/Containers/Absent";
import EndDayScreen from "App/Containers/EndDay";
import CompletedDayScreen from "App/Containers/CompletedDay";
import VisitsScreen from "App/Containers/Visits/VisitsDisplayScreen";
import DashboardScreen from "App/Containers/Dashboard";
import NewRetailer from "App/Containers/Retailers/NewRetailer";
import UpdateRetailer from "App/Containers/Retailers/NewRetailer/UpdateRetailer";
import RetailerList from "App/Containers/Retailers/RetailerList";
import RetailerTabScreen from "App/Containers/Retailers/NewRetailer/RetailerTabScreen";
import ImageUploaderScreen from "App/Containers/Retailers/NewRetailer/ImageUploaderScreen";
import Filters from "App/Containers/Retailers/NewRetailer/Filters";

import RetailerInfoScreen from "App/Containers/Retailers/RetailerInfoScreen";
import DealerInfoScreen from "App/Containers/Retailers/DealerInfoScreen";
import RetailerOrdersListScreen from "App/Containers/Retailers/RetailerOrdersListScreen";
import OrdersListScreen from "App/Containers/Orders/OrdersListScreen";
import OrderInfoScreen from "App/Containers/Orders/OrderInfoScreen";
import ReOrderInfoScreen from "App/Containers/Orders/ReOrderInfoScreen";
import UnplannedOptionsScreen from "App/Containers/UnplannedVisits/OptionsScreen";
import RetailerResultListScreen from "App/Containers/UnplannedVisits/RetailerResultList";
import StartVisitForm from "App/Containers/Visits/VisitForm";
import AddPlannedVisitsScreen from "App/Containers/Visits/PlannedVisit/AddPlannedVisitsScreen";
import SelectedPlannedVisitsScreen from "App/Containers/Visits/PlannedVisit/SelectedPlannedVisitsScreen";
import SearchByAreaScreen from "App/Containers/UnplannedVisits/SearchByAreaScreen";
import SearchByLocationScreen from "App/Containers/UnplannedVisits/SearchByLocationScreen";
import VisitBookOrder from "App/Containers/Visits/VisitBookOrder";

import VisitBookOrderHeader from "App/Containers/Visits/VisitBookOrder/VisitBookOrderHeader";
import VisitOrderCart from "App/Containers/Visits/VisitOrderCart";
import VisitInfoScreen from "App/Containers/Visits/VisitInfoScreen";
import VisitRetailerInfo from "App/Containers/Visits/VisitRetailerInfo";
import EventList from "App/Containers/Event/EventList";
import InfluencersListScreen from "../Containers/Influencers/InfluencerList";
import ProfileScreen from "App/Containers/Profile";
import ParticipantsScreen from "App/Containers/Participants";
import SiteListScreen from "../Containers/Sites/SitesList/SiteList";
import NewEvent from "App/Containers/Event/NewEvent";
import EventInfoScreen from "App/Containers/Event/EventInfoScreen";
import UpdateEvent from "App/Containers/Event/NewEvent/UpdateEvent";
import AddParticipantScreen from "../Containers/Event/AddParticipantScreen";
import EventParticipantListScreen from "App/Containers/Event/EventParticipantListScreen";
import NewInfluencers from "../Containers/Influencers/NewInfluencer";
import CreateInfluencer from "../Containers/Influencers/NewInfluencer/CreateInfluencer";
import InfluencerInfoScreen from "../Containers/Influencers/InfluencerInfoScreen";
import UpdateInfluencer from "../Containers/Influencers/NewInfluencer/updateInfluencer";
import NewSites from "../Containers/Sites/NewSites";
import UpdateSite from "../Containers/Sites/NewSites/UpdateSite";
import SitesList from "../Containers/Sites/SitesList";
import SitesInfoScreen from "../Containers/Sites/SitesInfoScreen";
import NewSiteProduct from "../Containers/Sites/AddSiteProduct/AddSiteProduct";
import UpdateSiteProduct from "../Containers/Sites/AddSiteProduct/UpdateSiteProduct";
import SiteProductListScreen from "../Containers/Sites/SiteProductListScreen";
import SiteProductInfoScreen from "../Containers/Sites/SiteProductInfoScreen";
import InfluencerSiteList from "App/Containers/Influencers/InfluencerSiteList";
import DealerInvoiceListScreen from "App/Containers/Retailers/DealerInvoiceListScreen";
import DealerOrdersListScreen from "App/Containers/Retailers/DealerOrdersListScreen";
import DealerOutstandingListScreen from "App/Containers/Retailers/DealerOutstandingListScreen";
import InvoiceInfoScreen from "App/Containers/Invoice";
import DealerOrderInfoScreen from "App/Containers/Orders/OrderInfoScreen/DealerOrderInfoScreen";
import LocalExpenseListScreen from "App/Containers/LocalExpense/LocalExpenseListScreen/LocalExpenseListScreen";
import TeamExpenseListScreen from "App/Containers/LocalExpense/TeamExpenseListScreen/TeamExpenseListScreen/";
import TeamExpenseInfoScreen from "App/Containers/LocalExpense/TeamExpenseInfoScreen/TeamExpenseInfoScreen";
import UpdateLocalExpenseScreen from "App/Containers/LocalExpense/UpdateExpenseScreen";
import LocalAttachmentScreen from "App/Containers/LocalExpense/LocalAttachmentScreen/LocalAttachmentScreen";
import LocalExpenseInfoScreen from "App/Containers/LocalExpense/LocalExpenseInfoScreen/LocalExpenseInfoScreen";
import LocalExpenseTabScreen from "App/Containers/LocalExpense/LocalExpenseTabScreen";
import TourTabScreen from "App/Containers/Tour/TourTabScreen/TourTabScreen";
import TourInfoScreen from "App/Containers/Tour/TourInfoScreen";
import NewTourScreen from "App/Containers/Tour/NewTourScreen/NewTourScreen";
import UpdateTourScreen from "App/Containers/Tour/UpdateTourScreen";
import TourAttachmentScreen from "App/Containers/Tour/TourAttachementScreen";
import OutstationExpenseTabScreen from "App/Containers/OutstationExpense/OutstationExpenseTabScreen";
import OutstationExpenseListScreen from "App/Containers/OutstationExpense/OutstationExpenseListScreen";
import OutstationAttachmentScreen from "App/Containers/OutstationExpense/OutstationAttachmentScreen";
import AddTravelScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/AddTravel";
import TravelListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelListScreen";
import TravelUpdateScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelUpdateScreen";
import AddConvenienceScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/AddConvenience/AddConvenience";
import ConvenienceListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/ConvenienceListScreen";
import ConvenienceUpdateScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/ConvenienceUpdateScreen";
import AddHotelScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/AddHotel/AddHotel";
import HotelListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/HotelListScreen";
import UpdateHotelScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/UpdateHotel";
import AddOtherScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Other/AddOther/AddOther";
import OtherListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Other/OtherListScreen";
import UpdateOtherScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Other/UpdateOther";
import AddIncidentalScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/AddIncidental/AddIncidental";
import IncidentalListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/IncidentalListScreen";
import UpdateIncidentalScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/UpdateIncidental";
import AddFoodScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Food/AddFood/AddFood";
import FoodListScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Food/FoodListScreen";
import UpdateFoodScreen from "App/Containers/OutstationExpense/UpdateOutstationScreen/Food/UpdateFood";
import TourApprovalScreen from "App/Containers/OutstationExpense/OutstationMyExpenseScreen/TourApprovalScreen/TourApprovalScreen";
import SelectVisitScreen from "App/Containers/OutstationExpense/OutstationMyExpenseScreen/SelectVisitScreen/SelectVisitScreen";
import LocalExpenseList from "App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/LocalExpenseList";
import ConvenienceListView from "App/Containers/OutstationExpense/TeamOutstationView/Conveneince/ConvenienceList";
import HotelListView from "App/Containers/OutstationExpense/TeamOutstationView/Hotel/HotelList";
import IncidentalListView from "App/Containers/OutstationExpense/TeamOutstationView/Incidental/IncidentalList";
import FoodListView from "App/Containers/OutstationExpense/TeamOutstationView/Food/FoodList";
import TravelListView from "App/Containers/OutstationExpense/TeamOutstationView/Travel/TravelList";
import LocalExpenseListView from "App/Containers/OutstationExpense/TeamOutstationView/LocalExpense/LocalExpenseList";
import OtherListView from "App/Containers/OutstationExpense/TeamOutstationView/Other/OtherList";
import TravelInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Travel/TravelInfo";
import ConvenienceInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Conveneince/ConvenienceInfo";
import HotelInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Hotel/HotelInfo";
import FoodInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Food/FoodInfo";
import IncidentalInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Incidental/IncidentalInfo";
import LocalExpenseInfo from "App/Containers/OutstationExpense/TeamOutstationView/LocalExpense/LocalExpenseInfo";
import OtherInfoScreen from "App/Containers/OutstationExpense/TeamOutstationView/Other/OtherInfo";
import TravelInfo from "App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelInfo";
import HotelInfo from "App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/HotelInfo";
import FoodInfo from "App/Containers/OutstationExpense/UpdateOutstationScreen/Food/FoodInfo";
import IncidentalInfo from "App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/IncidentalInfo";
import OtherInfo from "App/Containers/OutstationExpense/UpdateOutstationScreen/Other/OtherInfo";
import LocalExpenseInfoView from "App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/LocalExpenseInfoView";
import ExpenseItemTabScreen from "App/Containers/ExpenseItem/ExpenseItemTabScreen/ExpenseItemTabScreen";
import UpdateLocalExpense from "App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/UpdateLocalExpense/UpdateLocalExpenseScreen";

import VisitRetailerOutstanding from "App/Containers/Visits/VisitRetailerOutstanding";
import OutstandingPaymentInfo from "App/Containers/Visits/VisitRetailerOutstanding/OutstandingPaymentInfo";
import DealerPaymentsListScreen from "App/Containers/Retailers/DealerPaymentsListScreen";
import DistributorOnboardingScreen from "App/Containers/DistributorOnboard/DistributorOnboardingScreen";
import NewDealerLayout from "App/Containers/Layout/NewDealerLayout";
import NewDealerScreen from "App/Containers/NewDealer/NewDealerScreen";
import Training from "App/Containers/Training/Training";
import CustomerScreen from "../Containers/Customer/CustomerList/CustomerScreen";
import UpdateProject from "../Containers/Projects/UpdateProject";
import Catalogue from "../Containers/ProjectCatalogue/Catalogue";

import SchemesListScreen from "App/Containers/Schemes";
import OrderLevelSchemeInfoScreen from "App/Containers/Schemes/orderLevelSchemeInfo";
import ProductLevelSchemeInfoScreen from "App/Containers/Schemes/productLevelSchemeInfo";

import MenuScreen from "App/Containers/Menu";
import MenuDetailScreen from "App/Containers/Menu/MenuDetailScreen";

import Bookorder from "./../Containers/Bookorder/bookorder";
import Addtocart from "./../Containers/Bookorder/addtocart";
import EventListScreen from "./../Containers/Event/EventList/EventList";
import Selectproduct from "./../Containers/Product/selectproduct";
import Selectbrand from "./../Containers/Product/selectbrand";
import Selectgsm from "./../Containers/Product/selectgsm";
import MyDetails from "../Containers/Dashboard/SummaryTables/MyDetails";
import DashboardFilter from "../Containers/Dashboard/DashboardFilter";

import ComplaintsScreen from "App/Containers/Retailers/Complaints";
import NewComplaintsScreen from "App/Containers/Retailers/Complaints/NewComplaints";
import DailyReport from "../Containers/Dashboard/DailyReport";
import AddCompetitorForm from "App/Containers/Visits/VisitForm/AddCompetitorForm";
import AddStockForm from "App/Containers/Visits/VisitForm/AddStockForm";
import UpdateStockForm from "App/Containers/Visits/VisitForm/UpdateStockForm";
import UpdateCompetitorForm from "App/Containers/Visits/VisitForm/UpdateCompetitorForm";
import VisitFormSuccess from "App/Containers/Visits/VisitForm/VisitFormSuccess";
import UpdateVisitSuccess from "App/Containers/Visits/VisitForm/UpdateVisitSuccess";
import VisitForm from "App/Containers/Visits/VisitForm/VisitForm";

import Communication from "../Containers/NewDealer/Communication";
import Tax from "../Containers/NewDealer/Tax";
import Leads from "../Containers/Leads";
// import VisitApprovalScreen from '../Containers/VisitApproval/VisitApprovalScreen'
import VisitApprovalTuple from "../Containers/VisitApproval/VisitApprovalTuple";
import PrimaryDistributor from "../Containers/Customer/CustomerList/PrimaryDistributor";
import DistributorProfile from "../Containers/Customer/CustomerDistributorProfile/DistributorProfile";
import DistributorProfileInfo from "../Containers/Customer/CustomerDistributorProfile/DistributorProfileInfo";
import DistributorProfileTabs from "../Containers/Customer/CustomerDistributorProfile/DistributorProfileTabs";

import PrimaryOrder from "../Containers/Dashboard/PrimaryOrder/PrimaryOrder";
import NewDsrScreen from "App/Containers/Retailers/RetailerInfoScreen/DsrScreen/NewDsrScreen";
import DsrListScreen from "App/Containers/Retailers/RetailerInfoScreen/DsrScreen/DsrListScreen";
import CreditLimit from "App/Containers/CreditLimit";
import SecondaryOrder from "../Containers/Dashboard/SecondaryOrder/SecondaryOrder";

import SurveyListScreen from "App/Containers/Survey";
import SurveyFormScreen from "App/Containers/Survey/SurveyForm";
import CreateLeadScreen from "../Containers/Leads/CreateLeadScreen";
import { Easing, Animated } from "react-native";
import ComplaintScreen from "App/Containers/Complaints/ComplaintScreen";
import NewComplaint from "App/Containers/Complaints/NewComplaint/NewComplaint";
import ComplaintInfo from "App/Containers/Complaints/NewComplaint/ComplaintInfo";

import ComplaintSecondScreen from "App/Containers/Complaints/ComplaintSecondScreen/ComplaintSecond";

import Complaints from "../Containers/Customer/CustomerDistributorProfile/Complaints";

import SecondaryOrderDetails from "../Containers/Dashboard/SecondaryOrder/SecondaryOrderDetails";
import PrimaryOrderDetails from "../Containers/Dashboard/PrimaryOrder/PrimaryOrderDetails";
import CreateLeadLayout from "../Containers/Layout/CreateLeadLayout";
import ResetScreen from "../Containers/ResetScreen/ResetScreen";
import NewPassword from "../Containers/ResetScreen/NewPassword";
import UserScreen from "../Containers/ResetScreen/UserScreen";


import CompetitorInfo from "../Containers/Competitor Info/CompetitorInfo";
import CompetitorInfoForm from "../Containers/Competitor Info/CompetitorInfoForm";

import BrandRequisition from "../Containers/BrandingRequisition/BrandRequisitionScreen";
import NewRequisitionScreen from "../Containers/BrandingRequisition/NewRequisitionScreen";
import AddInfluencerScreen from "../Containers/Influencers/NewInfluencer/AddInfluencerScreen";

import Meets from "../Containers/Meets/Meets";
import Approved from "../Containers/Meets/Approved";
import NewMeet from "../Containers/Meets/NewMeet";
import MeetPage from "../Containers/Meets/MeetPage";
import MeetInfo from "../Containers/Meets/MeetInfo";
import MeetParticipants from "../Containers/Meets/MeetParticipants";
import OrderCart from "../Containers/Visits/VisitBookOrder/OrderCart";
import Projects from "../Containers/Projects/Projects";
import NewProject from "../Containers/Projects/NewProject";
import InvoiceDetail from "../Containers/Customer/CustomerDistributorProfile/InvoiceDetail";
import CreateComplaint from "../Containers/Customer/CustomerDistributorProfile/CreateComplaint";
import Analytics from "../Containers/Customer/CustomerDistributorProfile/Analytics";
import Products from "../Containers/Product/Products";
import NewProduct from "../Containers/Product/NewProduct";
import CreateAddress from "../Containers/Customer/CustomerDistributorProfile/CreateAddress";
import CreateContact from "../Containers/Customer/CustomerDistributorProfile/CreateContact";
import UpdateAddress from "../Containers/Customer/CustomerDistributorProfile/UpdateAddress";

import CustomerFilters from "../Containers/Customer/CustomerDistributorProfile/CustomerFilters";
import ComplaintFilters from "../Containers/Complaints/ComplaintFilters";
import CompetitorFilters from "../Containers/Competitor Info/CompetitorFilter";

import Notifications from "../Containers/Notifications/Notifications";
import PlacePrimaryOrder from "../Containers/PlaceOrder/PlacePrimaryOrder";
import PlaceSecondaryOrder from "../Containers/PlaceOrder/PlaceSecondaryOrder";
import SecondaryOrderLayout from "../Containers/Layout/SecondaryOrderLayout";
import VariableDiscountScreen from "../Containers/PlaceOrder/SecondaryOrder/VariableDiscountScreen";
import ItemDetailScreen from "../Containers/PlaceOrder/SecondaryOrder/ItemDetailScreen";
import ShippingScreen from "../Containers/PlaceOrder/SecondaryOrder/ShippingScreen";
import AddressDetailScreen from "../Containers/PlaceOrder/SecondaryOrder/AddressDetailScreen";
import TransportScreen from "../Containers/PlaceOrder/SecondaryOrder/TransportScreen";
import OrderDetailScreen from "../Containers/PlaceOrder/SecondaryOrder/OrderDetailScreen";
import GetPrimaryOrder from "../Containers/PlaceOrder/GetPrimaryOrder/GetPrimaryOrder";
import OrderDetails from "../Containers/PlaceOrder/GetPrimaryOrder/OrderDetails";
import OrderLineScreen from "../Containers/PlaceOrder/GetPrimaryOrder/OrderLineScreen";
import GetSecondaryOrder from "../Containers/PlaceOrder/GetSecondary/GetSecondaryOrder";

import OrderLayout from "../Containers/Layout/OrderLayout";
import VariableDiscount from "../Containers/Orders/VariableDiscount";
import ItemDetail from "../Containers/Orders/ItemDetail";
import Shipping from "../Containers/Orders/Shipping";
import AddressDetail from "../Containers/Orders/AddressDetail";
import TransportDetail from "../Containers/Orders/TransportDetail";
import OrderDetail from "../Containers/Orders/OrderDetail";
import KycScreen from "../Containers/Retailers/NewRetailer/KycScreen";
import ChangePassword from "../Containers/ResetScreen/ChangePassword";
import CreateCredit from "../Containers/Customer/CustomerDistributorProfile/CreateCredit";
import UpdateCredit from "../Containers/Customer/CustomerDistributorProfile/UpdateCredit";
import OrderSecondaryDetails from "../Containers/PlaceOrder/GetSecondary/OrderSecondaryDetails";
import VisitHistory from "../Containers/Visits/VisitHistory/VisitHistory";
import SecondaryOrderSuccess from "../Containers/PlaceOrder/SecondaryOrder/SecondaryOrderSuccess";
import PrimaryOrderSuccess from "../Containers/Orders/PrimaryOrderSuccess";
import CreateLead from "../Containers/Leads/CreateLead";
import UpdateLead from "../Containers/Leads/UpdateLead";
import UpdateCustomerInfo from "../Containers/Customer/CustomerDistributorProfile/UpdateCustomerInfo";
import OrderTab from "../Containers/Customer/Order/OrderTab";
import UpdateSuccess from "../Containers/DistributorOnboard/UpdateSuccess";
import CreateSuccess from "../Containers/DistributorOnboard/CreateSuccess";
import CreateLeadSuccess from "../Containers/Leads/CreateLeadSuccess";
import UpdateLeadSuccess from "../Containers/Leads/UpdateLeadSuccess";
import CompetitorSuccess from "../Containers/Competitor Info/CompetitorSuccess";
import ProjectSuccess from "../Containers/Projects/ProjectSuccess";
import ProjectUpdateSuccess from "../Containers/Projects/ProjectUpdateSuccess";
import PrimaryGoodReturn from "../Containers/GoodReturn/PrimaryGoodReturn/PrimaryGoodReturn";
import PrimaryLines from "../Containers/GoodReturn/PrimaryGoodReturn/PrimaryLines";
import PlacePrimaryGoodReturn from "../Containers/GoodReturn/PrimaryGoodReturn/PlacePrimaryGoodReturn";
import GoodItemDetail from "../Containers/GoodReturn/PrimaryGoodReturn/GoodItemDetail";
import GoodOrderDetail from "../Containers/GoodReturn/PrimaryGoodReturn/GoodOrderDetail";
import ShippingGood from "../Containers/GoodReturn/PrimaryGoodReturn/ShippingGood";
import PrimaryGoodSuccess from "../Containers/GoodReturn/PrimaryGoodReturn/PrimaryGoodSuccess";
import SecondaryGoodReturn from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryGoodReturn";
import PlaceSecondaryGoodReturn from "../Containers/GoodReturn/SecondaryGoodReturn/PlaceSecondaryGoodReturn";
import SecondaryLines from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryLines";
import SecondaryItemDetail from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryItemDetail";
import SecondaryOrderDetail from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryOrderDetail";
import SecondaryShipping from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryShipping";
import SecondaryGoodSuccess from "../Containers/GoodReturn/SecondaryGoodReturn/SecondaryGoodSuccess";
import TransportGoodDetail from "../Containers/GoodReturn/PrimaryGoodReturn/TransportGoodDetail";
import ChangePasswordSuccess from "../Containers/ResetScreen/ChangePasswordSuccess";
import RetailerSuccess from "../Containers/Retailers/NewRetailer/RetailerSuccess"
import Loyalty from "../Containers/Menu/Loyalty";
import UpdateRetailerSuccess from "../Containers/Customer/CustomerDistributorProfile/UpdateRetailerSuccess";
import InfluncerSuccess from "../Containers/Influencers/NewInfluencer/InfluncerSuccess";
import ProjectFilter from "../Containers/Projects/ProjectFilter";
import LeadFilter from "../Containers/Leads/LeadFilter";
import ReportScreen from "../Containers/Menu/ReportScreen";
import UpdateTab from "../Containers/Projects/UpdateTab";
import ComplaintSucces from "../Containers/Complaints/NewComplaint/ComplaintSucces";
import AddProduct from "../Containers/Projects/AddProduct";
import CompetitorDetail from "../Containers/Competitor Info/CompetitorDetail";
import VisitSummaryTab from "../Containers/Dashboard/VisitSummary/VisitSummaryTab";
import AddProductSuccess from "../Containers/Projects/AddProductSuccess";
import DashScreen from "../Containers/Menu/DashScreen";
import LoyaltyDash from "../Containers/Menu/LoyaltyDash";
/**
 * The root screen contains the application's navigation.
 *
 */
const StackNavigator = createStackNavigator(
  {
    Complaints,
    DashScreen,
    LoyaltyDash,
    AddProductSuccess,
    CompetitorDetail,
    AddProduct,
    ComplaintSucces,
    UpdateTab,
    VisitSummaryTab,
    ReportScreen,
    LeadFilter,
    ProjectFilter,
    RetailerSuccess,
    InfluncerSuccess,
    UpdateRetailerSuccess,
    Loyalty,
    SecondaryGoodSuccess,
    SecondaryGoodReturn,
    ChangePasswordSuccess,
    SecondaryLines,
    TransportGoodDetail,
    PlaceSecondaryGoodReturn,
    SecondaryItemDetail,
    SecondaryOrderDetail,
    SecondaryShipping,
    PrimaryGoodReturn,
    PrimaryGoodSuccess,
    ShippingGood,
    GoodOrderDetail,
    GoodItemDetail,
    ProjectSuccess,
    PlacePrimaryGoodReturn,
    PrimaryLines,
    ProjectUpdateSuccess,
    CompetitorSuccess,
    UpdateLeadSuccess,
    CreateSuccess,
    CreateLeadSuccess,
    UpdateSuccess,
    PrimaryOrderSuccess,
    UpdateCustomerInfo,
    VisitHistory,
    SplashScreen,
    CreditLimit,
    CreateLead,
    UpdateLead,
    UpdateProject,
    Catalogue,
    EventListScreen,
    StartDayScreen,
    Selectproduct,
    Selectbrand,
    Selectgsm,
    StartDaySelectionScreen,
    EndDayScreen,
    PresentScreen,
    WorkFromHomeScreen,
    InDepotScreen,
    InFactoryScreen,
    TravelScreen,
    OrderSecondaryDetails,
    InOfficeScreen,
    TravelModeScreen,
    AbsentScreen,
    CompletedDayScreen,
    LoginScreen,
    LoginOtpScreen,
    VisitsScreen,
    DashboardScreen,
    NewRetailer,
    RetailerList,
    RetailerTabScreen,
    Filters,
    RetailerInfoScreen,
    ImageUploaderScreen,
    DealerInfoScreen,
    OrdersListScreen,
    OrderInfoScreen,
    RetailerOrdersListScreen,
    DealerInvoiceListScreen,
    DealerOrdersListScreen,
    DealerOutstandingListScreen,
    EventParticipantListScreen,
    AddParticipantScreen,
    UpdateRetailer,
    AddPlannedVisitsScreen,
    SelectedPlannedVisitsScreen,
    UnplannedOptionsScreen,
    RetailerResultListScreen,
    StartVisitForm,
    SearchByAreaScreen,
    SearchByLocationScreen,
    VisitBookOrder,
    VisitOrderCart,
    VisitRetailerInfo,
    VisitInfoScreen,
    EventList,
    NewEvent,
    EventInfoScreen,
    UpdateEvent,
    InfluencersListScreen,
    InfluencerInfoScreen,
    ProfileScreen,
    ParticipantsScreen,
    SiteListScreen,
    NewInfluencers,
    CreateInfluencer,
    UpdateInfluencer,
    NewSites,
    UpdateSite,
    SitesList,
    SitesInfoScreen,
    DistributorOnboardingScreen,
    NewSiteProduct,
    UpdateSiteProduct,
    SiteProductListScreen,
    SiteProductInfoScreen,
    InvoiceInfoScreen,
    OrderTab,
    InfluencerSiteList,
    DealerOrderInfoScreen,
    LocalExpenseListScreen,
    UpdateLocalExpenseScreen,
    LocalAttachmentScreen,
    LocalExpenseTabScreen,
    TeamExpenseListScreen,
    TourTabScreen,
    TourInfoScreen,
    NewTourScreen,
    UpdateTourScreen,
    TourAttachmentScreen,
    OutstationExpenseTabScreen,
    OutstationExpenseListScreen,
    OutstationAttachmentScreen,
    AddTravelScreen,
    TravelListScreen,
    TravelUpdateScreen,
    ConvenienceListScreen,
    ConvenienceUpdateScreen,
    AddConvenienceScreen,
    AddHotelScreen,
    HotelListScreen,
    UpdateHotelScreen,
    AddOtherScreen,
    OtherListScreen,
    UpdateOtherScreen,
    AddIncidentalScreen,
    IncidentalListScreen,
    UpdateIncidentalScreen,
    AddFoodScreen,
    FoodListScreen,
    UpdateFoodScreen,
    LocalExpenseInfoScreen,
    TourApprovalScreen,
    SelectVisitScreen,
    LocalExpenseList,
    ConvenienceListView,
    HotelListView,
    IncidentalListView,
    FoodListView,
    TravelListView,
    LocalExpenseListView,
    OtherListView,
    TravelInfoScreen,
    ConvenienceInfoScreen,
    HotelInfoScreen,
    FoodInfoScreen,
    IncidentalInfoScreen,
    LocalExpenseInfo,
    OtherInfoScreen,
    TravelInfo,
    HotelInfo,
    FoodInfo,
    IncidentalInfo,
    OtherInfo,
    LocalExpenseInfoView,
    TeamExpenseInfoScreen,
    ExpenseItemTabScreen,
    UpdateLocalExpense,
    VisitRetailerOutstanding,
    OutstandingPaymentInfo,
    DealerPaymentsListScreen,
    SchemesListScreen,
    OrderLevelSchemeInfoScreen,
    ProductLevelSchemeInfoScreen,
    ReOrderInfoScreen,
    MenuScreen,
    MenuDetailScreen,
    ComplaintsScreen,
    NewComplaintsScreen,
    MyDetails,
    Communication,
    DashboardFilter,
    Tax,
    VisitApprovalTuple,
    Training,
    AddCompetitorForm,
    AddStockForm,
    UpdateStockForm,
    UpdateCompetitorForm,
    VisitFormSuccess,
    VisitForm,
    UpdateVisitSuccess,
    // VisitApprovalScreen,
    Leads,
    Bookorder,
    Addtocart,
    DailyReport,
    NewDsrScreen,
    DsrListScreen,
    VisitBookOrderHeader,
    SurveyListScreen,
    SurveyFormScreen,
    ComplaintScreen,
    NewComplaint,
    ComplaintInfo,
    ComplaintSecondScreen,
    NewDealerLayout,
    NewDealerScreen,
    SecondaryOrderSuccess,
    CustomerScreen,
    PrimaryDistributor,
    DistributorProfile,
    DistributorProfileInfo,
    DistributorProfileTabs,
    PrimaryOrder,
    SecondaryOrder,
    SecondaryOrderDetails,
    PrimaryOrderDetails,
    CreateLeadScreen,
    CreateLeadLayout,
    ResetScreen,
    NewPassword,
    UserScreen,
    CompetitorInfo,
    CompetitorInfoForm,

    BrandRequisition,
    NewRequisitionScreen,
    AddInfluencerScreen,

    Meets,
    Approved,
    NewMeet,
    MeetPage,
    MeetInfo,
    MeetParticipants,
    OrderCart,
    Projects,
    NewProject,
    InvoiceDetail,
    CreateComplaint,
    Analytics,
    Products,
    NewProduct,
    CreateAddress,
    CreateContact,
    UpdateAddress,
    Notifications,
    PlacePrimaryOrder,
    OrderLayout,
    VariableDiscount,
    ItemDetail,
    Shipping,
    PlaceSecondaryOrder,
    SecondaryOrderLayout,
    VariableDiscountScreen,
    ItemDetailScreen,
    ShippingScreen,
    AddressDetailScreen,
    TransportScreen,
    OrderDetailScreen,
    GetPrimaryOrder,
    OrderDetails,
    OrderLineScreen,

    CustomerFilters,
    ComplaintFilters,
    CompetitorFilters,

    Notifications,
    AddressDetail,
    TransportDetail,
    OrderDetail,
    KycScreen,
    CreateCredit,
    UpdateCredit,

    ChangePassword,
    GetSecondaryOrder,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: "SplashScreen",
    headerMode: "none",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX: translateX }] };
      },
    }),
  }
);

export default createAppContainer(StackNavigator);
