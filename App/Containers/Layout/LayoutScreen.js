import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import { Colors } from "App/Theme";
import { Body, Container, Header, Icon, Left, Right, Title } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { connect } from "react-redux";
import DashboardLayout from "./DashboardLayout";
import AddParticipantListScreenLayout from "./Events/AddParticipantListScreenLayout";
import EventInfoLayout from "./Events/EventInfoLayout";
import EventListLayout from "./Events/EventListLayout";
import EventparticipantListScreenLayout from "./Events/EventparticipantListScreenLayout";
import NewEventLayout from "./Events/NewEventLayout";
import FooterScreen from "./FooterScreen";
import InfluencerInfoLayout from "./Influencers/InfluencerInfoLayout";
import InfluencerListLayout from "./Influencers/InfluencerListLayout";
import NewInfluencerLayout from "./Influencers/NewInfluencerLayout";
import LocalExpenseListScreenLayout from "./LocalExpense/LocalExpenseListScreenLayout";
import LocalExpenseTabLayout from "./LocalExpense/LocalExpenseTabLayout";
import UpdateLocalExpenseLayout from "./LocalExpense/UpdateLocalExpenseLayout";
import OutstationExpenseListScreenLayout from "./OutstationExpense/OutstationExpenseListScreenLayout";
import OutstationExpenseTabLayout from "./OutstationExpense/OutstationExpenseTabLayout";
import UpdateOutstationExpenseScreenLayout from "./OutstationExpense/UpdateOutstationExpenseScreenLayout";
import DealerInfoLayout from "./Retailers/DealerInfoLayout";
import NewRetailerLayout from "./Retailers/NewRetailerLayout";
import SurveyRetailerLayout from "./Retailers/SurveyRetailerLayout";
import RetailerInfoLayout from "./Retailers/RetailerInfoLayout";
import RetailerListLayout from "./Retailers/RetailerListLayout";
import Drawer from "./SideBarLayout/Drawer";
import NewSiteProductLayout from "./Sites/NewSiteProductLayout";
import NewSitesLayout from "./Sites/NewSitesLayout";
import SiteProductInfoLayout from "./Sites/SIteProductInfoLayout";
import SiteProductListLayout from "./Sites/SiteProductListLayout";
import SiteInfoLayout from "./Sites/SitesInfoLayout";
import SiteListsLayout from "./Sites/SitesListLayout";
import NewTourLayout from "./Tour/NewTourLayout";
import TourListLayout from "./Tour/TourListLayout";
import UpdateTourLayout from "./Tour/UpdateTourLayout";
import AddPlannedVisitsLayout from "./Visits/AddPlannedVisitsLayout";
import SearchByAreaLayout from "./Visits/SearchByAreaLayout";
import SearchByLocationLayout from "./Visits/SearchByLocationLayout";
import SelectedPlannedVisitsLayout from "./Visits/SelectedPlannedVisitsLayout";
import StartVisitLayout from "./Visits/StartVisitLayout";
import VisitListLayout from "./Visits/VisitListLayout";
import TourApprovalLayout from "./TourApprovalLayout";
import VisitApprovalLayout from "./VisitApprovalLayout";
import UpdateOutstationExpenseLayout from "./UpdateOutstationExpenseLayout";
import TeamOutstationViewLayout from "./OutstationExpense/TeamOutstationViewLayout";
import ExpenseItemTabLayout from "./ExpenseItem/ExpenseItemTabLayout";
import SchemesListLayout from "./Schemes/SchemesListLayout";
import VisitBookOrderLayout from "./Visits/VisitBookOrderLayout";
import RetailerOrderLayout from "./Retailers/RetailerOrderLayout";
import NewDealerLayout from "./NewDealerLayout";
import ResetScreen from "../ResetScreen/ResetScreen";
import CustomerDistributorInfoLayout from "./CustomerDistributorInfoLayout";
import CreateLeadLayout from "./CreateLeadLayout";
import ComplaintLayout from "./ComplaintLayout";
import OrderLayout from "./OrderLayout";
import SecondaryOrderLayout from "./SecondaryOrderLayout";
import CompetitorLayout from "./CompetitorLayout";
import PrimaryGoodsLayout from "./PrimaryGoodsLayout";
import SecondaryGoodsLayout from "./SecondaryGoodsLayout";

class LayoutScreen extends React.Component {
  getCurrentLayoutScreen() {
    let customLayoutNode = [];
    let showTopHeader = false;
    let showBackArrow = false;
    let showMoreIcon = false;
    switch (this.props.currentScreen) {
      case "NewRetailer":
        customLayoutNode = <NewRetailerLayout />;
        break;

      case "RetailerList":
        customLayoutNode = <RetailerListLayout />;
        break;

      case "RetailerOrdersListScreen":
        customLayoutNode = <RetailerInfoLayout />;
        break;

      case "DealerInfoScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerInfoScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerInvoiceListScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerOutstandingListScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerInfoScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerPaymentsListScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerInvoiceListScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      case "DealerOutstandingListScreen":
        customLayoutNode = <DealerInfoLayout />;
        break;

      //case 'UpdateRetailer':
      case "OrdersListScreen":
        customLayoutNode = <NewRetailerLayout />;
        break;

      case "DealerOrdersListScreen":
        customLayoutNode = <RetailerOrderLayout />;
        break;

      case "VisitsScreen":
        customLayoutNode = <VisitListLayout />;
        break;

      case "DashboardScreen":
        customLayoutNode = <DashboardLayout />;
        break;

      // case 'NewDealerScreen':
      //   customLayoutNode = <NewDealerLayout />;
      //   break;
      case "CreateLeadScreen":
        customLayoutNode = <CreateLeadLayout />;
        break;

      // case 'DistributorProfile':
      //   customLayoutNode = <CustomerDistributorInfoLayout />;
      //   break;

      case "UnplannedOptionsScreen":
        customLayoutNode = <NewRetailerLayout />;
        break;

      case "RetailerResultListScreen":
      case "OrderInfoScreen":
      case "InvoiceInfoScreen":
      case "DealerOrderInfoScreen":
      case "VisitInfoScreen":
      case "TourInfoScreen":
      case "OrderLevelSchemeInfoScreen":
      case "ProductLevelSchemeInfoScreen":
      // case 'MenuDetailScreen':
      case "NewDsrScreen":
      case "VisitBookOrderHeader":
        customLayoutNode = <StartVisitLayout />;
        break;
      case "SurveyListScreen":
        customLayoutNode = <SurveyRetailerLayout />;
        break;

      case "StartVisitForm":
      case "VisitHistory":
      case "VisitRetailerInfo":
      case "VisitRetailerOutstanding":
      case "OutstandingPaymentInfo":
      case "AddCompetitorForm":
      case "AddStockForm":
      case "UpdateStockForm":
      case "UpdateCompetitorForm":
        customLayoutNode = <StartVisitLayout />;
        break;

      case "VisitBookOrder":
      case "VisitOrderCart":
        customLayoutNode = <VisitBookOrderLayout />;
        break;

      case "AddPlannedVisitsScreen":
        customLayoutNode = <AddPlannedVisitsLayout />;
        break;

      case "SchemesListScreen":
        customLayoutNode = <SchemesListLayout />;
        break;

      case "SelectedPlannedVisitsScreen":
        customLayoutNode = <SelectedPlannedVisitsLayout />;
        break;

      case "SearchByAreaScreen":
        customLayoutNode = <SearchByAreaLayout />;
        break;

      case "SearchByLocationScreen":
        customLayoutNode = <SearchByLocationLayout />;
        break;

      case "NewEvent":
        customLayoutNode = <NewEventLayout />;
        break;

      case "EventList":
        customLayoutNode = <EventListLayout />;
        break;

      case "EventInfoScreen":
        customLayoutNode = <EventInfoLayout />;
        break;

      case "UpdateEvent":
        customLayoutNode = <NewEventLayout />;
        break;

      case "EventParticipantListScreen":
        customLayoutNode = <EventparticipantListScreenLayout />;
        break;

      case "AddParticipantScreen":
        customLayoutNode = <AddParticipantListScreenLayout />;
        break;

      case "InfluencersListScreen":
        customLayoutNode = <InfluencerListLayout />;
        break;
      case "InfluencerSiteList":
        customLayoutNode = <InfluencerListLayout />;
        break;

      case "InfluencerInfoScreen":
        customLayoutNode = <InfluencerInfoLayout />;
        break;

      case "NewInfluencers":
        customLayoutNode = <NewInfluencerLayout />;
        break;

      case "UpdateInfluencer":
        customLayoutNode = <NewInfluencerLayout />;
        break;

      case "ProfileScreen":
        customLayoutNode = <NewRetailerLayout />;
        break;

      case "SiteProductListScreen":
        customLayoutNode = <SiteProductListLayout />;
        break;

      case "NewSites":
        customLayoutNode = <NewSitesLayout />;
        break;

      case "UpdateSite":
        customLayoutNode = <NewSitesLayout />;
        break;

      case "SiteListScreen":
        customLayoutNode = <SiteListsLayout />;
        break;

      case "SitesInfoScreen":
        customLayoutNode = <SiteInfoLayout />;
        break;

      case "NewSiteProduct":
        customLayoutNode = <NewSiteProductLayout />;
        break;

      case "UpdateSiteProduct":
        customLayoutNode = <NewSiteProductLayout />;
        break;

      case "SiteProductInfoScreen":
        customLayoutNode = <SiteProductInfoLayout />;
        break;

      case "LocalExpenseTabScreen":
        customLayoutNode = <LocalExpenseTabLayout />;
        break;

      case "LocalExpenseListScreen":
        customLayoutNode = <LocalExpenseListScreenLayout />;
        break;

      case "TeamExpenseListScreen":
        customLayoutNode = <LocalExpenseListScreenLayout />;
        break;

      case "LocalExpenseInfoScreen":
        customLayoutNode = <UpdateLocalExpenseLayout />;
        break;

      case "UpdateLocalExpenseScreen":
      case "TeamExpenseInfoScreen":
        customLayoutNode = <NewEventLayout />;
        break;

      case "OutstationExpenseTabScreen":
        customLayoutNode = <OutstationExpenseTabLayout />;
        break;

      case "OutstationAttachmentScreen":
        customLayoutNode = <UpdateOutstationExpenseScreenLayout />;
        break;

      case "OutstationExpenseListScreen":
        customLayoutNode = <OutstationExpenseListScreenLayout />;
        break;

      // case 'UpdateOutstationScreen':
      //   customLayoutNode = <UpdateOutstationExpenseLayout />
      //   break;

      case "TravelListScreen":
      case "ConvenienceListScreen":
      case "HotelListScreen":
      case "OtherListScreen":
      case "IncidentalListScreen":
      case "FoodListScreen":
      case "LocalExpenseList":
        customLayoutNode = <UpdateOutstationExpenseScreenLayout />;
        break;

      case "TravelListView":
      case "ConvenienceListView":
      case "HotelListView":
      case "OtherListView":
      case "IncidentalListView":
      case "FoodListView":
      case "LocalExpenseListView":
        customLayoutNode = <TeamOutstationViewLayout />;
        break;

      case "TravelUpdateScreen":
      case "ConvenienceUpdateScreen":
      case "UpdateHotelScreen":
      case "UpdateOtherScreen":
      case "UpdateIncidentalScreen":
      case "UpdateFoodScreen":
      case "UpdateLocalExpense":
        customLayoutNode = <NewEventLayout />;
        break;

      case "TourApprovalScreen":
        customLayoutNode = <TourApprovalLayout />;
        break;

      case "SelectVisitScreen":
        customLayoutNode = <VisitApprovalLayout />;
        break;

      case "TravelInfoScreen":
      case "ConvenienceInfoScreen":
      case "HotelInfoScreen":
      case "FoodInfoScreen":
      case "IncidentalInfoScreen":
      case "LocalExpenseInfo":
      case "OtherInfoScreen":
        customLayoutNode = <NewEventLayout />;
        break;

      case "TravelInfo":
      case "ConvenienceInfo":
      case "HotelInfo":
      case "FoodInfo":
      case "IncidentalInfo":
      case "LocalExpenseInfoView":
      case "OtherInfo":
        customLayoutNode = <NewEventLayout />;
        break;

      case "AddTravelScreen":
      case "AddConvenienceScreen":
      case "AddHotelScreen":
      case "AddOtherScreen":
      case "AddIncidentalScreen":
      case "AddFoodScreen":
      case "LocalExpenseInfoScreen":
        customLayoutNode = <NewEventLayout />;
        break;

      case "LocalAttachmentScreen":
        customLayoutNode = <UpdateLocalExpenseLayout />;
        break;

      case "TourTabScreen":
        customLayoutNode = <TourListLayout />;
        break;
      case "NewTourScreen":
        customLayoutNode = <NewTourLayout />;
        break;
      case "UpdateTourScreen":
        customLayoutNode = <UpdateTourLayout />;
        break;

      case "TourAttachmentScreen":
        customLayoutNode = <UpdateTourLayout />;
        break;

      case "ExpenseItemTabScreen":
        customLayoutNode = <ExpenseItemTabLayout />;
        break;

      case "CompetitorInfo":
        customLayoutNode = <CompetitorLayout />;
        break;

      case "CreateComplaint":
      case "NewComplaint":
        customLayoutNode = <ComplaintLayout />;
        break;

      case "VariableDiscount":
      case "ItemDetail":
      case "Shipping":
      case "OrderDetail":
      case "TransportDetail":
        customLayoutNode = <OrderLayout />;
        break;

      case "GoodItemDetail":
      case "ShippingGood":
      case "GoodOrderDetail":
      case "TransportGoodDetail":
        customLayoutNode = <PrimaryGoodsLayout />;
        break;

      case "SecondaryItemDetail":
      case "SecondaryShipping":
      case "SecondaryOrderDetail":
        customLayoutNode = <SecondaryGoodsLayout />;
        break;

      // case "VariableDiscountScreen":
      case "ItemDetailScreen":
      case "ShippingScreen":
      case "TransportScreen":
      case "OrderDetailScreen":
        customLayoutNode = <SecondaryOrderLayout />;
        break;

      default:
        customLayoutNode = [];
    }
    return {
      node: customLayoutNode,
      showTopHeader,
      showBackArrow,
      showMoreIcon,
    };
  }

  getFooterScreenNode() {
    let footerScreenNode = <FooterScreen />;
    switch (this.props.currentScreen) {
      case "SplashScreen":
        footerScreenNode = [];
        break;
      case "LoginScreen":
        footerScreenNode = [];
        break;
      case "ResetScreen":
        footerScreenNode = [];
        break;
        case "UserScreen":
        footerScreenNode = [];
        break;
        case "NewPassword":
          footerScreenNode = [];
          break;
      default:
        footerScreenNode = <FooterScreen />;
    }

    return footerScreenNode;
  }

  render() {
    var data = this.getCurrentLayoutScreen();
    return (
      <Container>
        {!data.showTopHeader ? (
          []
        ) : (
          <Header style={Styles.header}>
            <Left>
              {!data.showBackArrow ? (
                []
              ) : (
                <TouchableOpacity onPress={NavigationService.goback}>
                  <GenericIcon name={"arrow-back"} style={Styles.backIcon} />
                </TouchableOpacity>
              )}
            </Left>
            <Body>
              <Title></Title>
            </Body>
            <Right>
              {!data.showMoreIcon ? (
                []
              ) : (
                <Drawer>
                  <Icon name="menu" style={Styles.menuIcon} />
                </Drawer>
              )}
            </Right>
          </Header>
        )}
        {data.node}
        {this.props.children}
        {this.getFooterScreenNode()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  isVisible: state.common.isNetworkBannerVisible,
  currentScreen: state.common.currentScreen,
});

export default connect(mapStateToProps)(LayoutScreen);

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    borderBottomWidth: 0,
    elevation: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 0,
  },
  backIcon: {
    color: Colors.button,
    padding: 15,
    fontSize: wp("6%"),
  },
  menuIcon: {
    color: Colors.button,
    fontSize: 25,
    padding: 10,
  },
});
