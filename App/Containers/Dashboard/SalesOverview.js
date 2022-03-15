import { View, Text } from "native-base";
import React from "react";
import SearchableDropdown from "App/Components/SearchableDropdown";
import CircularProgressBar from "App/Components/CircularProgressBar";
import DatePicker from "App/Components/DatePicker";
import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import GenericIcon from "App/Components/GenericIcon";
import { Colors, ApplicationStyles } from "App/Theme";
import { connect } from "react-redux";
import UserActions from "App/Stores/User/Actions";
import DashboardActions from "App/Stores/Dashboard/Actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity,ScrollView, } from "react-native";
import NavigationService from "App/Services/NavigationService";
import Card from "App/Components/Card/Card";

class SalesOverview extends React.Component {
  componentDidMount() {
  const{token,agentid} = this.props;
  this.props.getDrs({
    id:agentid,
    token
  })
  }
  render(){
    const{drsValue,token,agentid,loading,getDrs}= this.props;
  
  // let datePickerNode = (
  //   <View>
  //     <GenericIcon
  //       name={"calendar"}
  //       show={true}
  //       style={{ fontSize: 18, color: "white", backgroundColor: "#ed1b24" }}
  //     />
  //   </View>
  // );
  return (
    <ScrollView>
      <View style={{ ...ApplicationStyles.container }}>

        {<Card title="Primary Today's Sales " value={ "₹" +(drsValue.primaryTodaysales ? drsValue.primaryTodaysales : "0") } month="MONTH: NOV" />}
       { <Card title="Primary MTD Sales" value={"₹" +(drsValue.primaryMTDsales ? drsValue.primaryMTDsales : "0")} month="MONTH: NOV" />}
       { <Card title="Secondary Today's Sales" value={"₹" +(drsValue.secondaryTodaysales ? drsValue.secondaryTodaysales : "0")} month="MONTH: NOV" />}
       { <Card title="Secondary MTD Sales" value={"₹" +(drsValue.secondaryMTDsales ? drsValue.secondaryMTDsales : "0")} month="MONTH: NOV" />}

    </View>
    </ScrollView>
    //  "Primary Today's sales": null,
    //  "Primary MTD sales": 570000,
    //  "Secondary Today's sales": null,
    //  "Secondary MTD sales": 13468
 
  );
}}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  drsValue: state.dashboard.data.drsValue,
  loading: state.dashboard.loaders.drsValueLoader,

});
const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) =>
    dispatch(DashboardActions.changeDashboardSearchFilters(params)),
    getDrs: (params) =>
    dispatch(DashboardActions.getDrs(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SalesOverview);
