import React, {Component} from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";

import GenericIcon from "App/Components/GenericIcon";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

// import Styles from "../NewDealer/NewDealerScreenStyles";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";

import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";
import RetailersActions from 'App/Stores/Retailers/Actions'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";

import DistributorProfileTabs from "../Customer/CustomerDistributorProfile/DistributorProfileTabs";

class CustomerDistributorInfoLayout extends React.Component {
  componentDidMount() {
    const { details } = this.props;
    // console.log("iitteemmm",this.props.item)
    this.props.fetchRetailers({
      guId: this.props.item,
    });
  }
  render() {
    const { details } = this.props;
  return (
    <View>
      <View style={Styles.headView}>
        <BackArrowButton style={Styles.backBtn} />

        <Text style={Styles.headerText}>Distributor Profile</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...Styles.titleText }}>AK ENTERPRISES</Text>



        <Icon
          name={"call"}
          style={Styles.icon}
        />


      <GenericIcon name={"my-location"} style={Styles.icon1} />


      </View>

     
          <View>
              <Text style={{color:Colors.lightGrey, top:hp('-4%'),padding:17}}>Customer ID:6897965</Text>
          </View>

      <View style={{flexDirection:'row'}}>

      <TouchableOpacity  style={Styles.button}>

      <GenericIcon name={"pin-drop"} 
        style={{color:'white', fontSize:18, top:hp('1.3%'), left:wp('1.8%')}}
        />

        
        
          <Text style={Styles.buttontext}>Capture Geo Location</Text>

       
        
      </TouchableOpacity>

      <GenericIcon name={"emoji-events"} style={Styles.award} />

    

        <Text style={Styles.numStyle}>12</Text>
        </View>
        <Text style={Styles.titleText1}>Loyalty Points</Text>


      <Header style={{ ...Styles.header }}>
        <DistributorProfileTabs />
      </Header>
      
    </View>
  );
}
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerInvoice,
  retailersList: state.retailers.retailersList,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInvoice: (params) =>
    dispatch(RetailersActions.getCustomerInvoice(params)),
    fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDistributorInfoLayout);
const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    height: hp("11%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop: hp("-5%"),
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    padding:20
  },
  headView: {
    flexDirection: "row",
    shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.8,
        shadowRadius: 2,
        elevation: 2,
        borderBottomColor:Colors.lightGrey,

    height: hp("8.5%"),
  },

  titleText: {
    fontFamily: "Segoe UI",
    fontSize: 19,
    fontWeight: "bold",
    padding:18,
  },
  titleText1: {
    fontFamily: "Segoe UI",
    fontSize: 12,
    padding:18,
    left:wp('68%'),
    bottom:hp('7%'),
    color:Colors.background
  },
  icon: {
    left: wp("35%"),
    backgroundColor: Colors.phoneClr,
    color: Colors.white,
    borderRadius: 50,
    height: hp("3.8%"),
    width: wp("8%"),
    padding: ("1.3%"),
    fontSize: 20,
    fontWeight: "bold",
    top:hp('2.5%')
  },
  icon1: {
    left: wp("17%"),
    backgroundColor: Colors.cardblue,
    color: Colors.white,
    borderRadius: 50,
    height: hp("4%"),
    width: wp("8%"),
    padding:("1.4%"),
    fontSize: 20,
    fontWeight: "bold",
    top:hp('2.5%')

  },
  award:{
    left: wp("29%"),
    color: Colors.mustard,
    fontSize: 28,
    fontWeight: "bold",
    bottom:hp('3%')

  },
  textClr: {
    color: Colors.headerClr,
  },
  button: {
    borderRadius:20 ,
    height: hp("5.5%"),
    backgroundColor:Colors.background,
    left:wp('4.5%'),
    width:wp('45%'),
    bottom:hp('3%')

  },
  
  buttontext: {
    fontFamily: "Lato",
    fontSize: 14,
    color:Colors.white,
    left:hp('3.2%'),
    bottom:hp('1.2%')
    
  },
    backBtn:{
      color: Colors.background,
     paddingLeft: 3,
     paddingTop:22,
     fontSize: wp('6%')

    },
    numStyle:{
        left:wp('30%'),
        fontSize:25,
        bottom:hp('3.6%')

    },

  datePicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    width: wp("43%"),
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  monthPicker: {
    alignSelf: "center",
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: wp("25%"),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp("3.3%"),
    textTransform: "capitalize",
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp("7%"),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp("3%"),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: "center",
    paddingHorizontal: wp("3%"),
    fontSize: wp("11%"),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: "8%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    elevation: 5,
    marginLeft: "5%",
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
  },
  actionButtonText: {
    fontSize: wp("3%"),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp("20%"),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp("1.2%"),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5%"),
    alignSelf: "center",
    padding: hp("1%"),
    paddingBottom: 0,
    position: "absolute",
    right: wp("3.3%"),
    marginTop: hp("16.5%"),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("6.9%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("5.3%"),
    marginTop: hp("13.2%"),
    zIndex: 2,
  },
});
