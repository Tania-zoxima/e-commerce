import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import Styles from "./CreateComplaintStyles";
import InputText from "App/Components/FormInput/InputText";
//import BlueButton from "../../Components/BlueButton";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import { HelperService } from "App/Services/Utils/HelperService";



class CreateComplaint extends React.Component {
  componentDidMount() {
    const { details,token } = this.props;
    const {id}=this.props.navigation.state.params
    // console.log("iiiiiiiiiddddddddddd",id)
    this.props.getCustomerInvoiceLines({
      id:id,
      token
    });
  }
  render() {
    const comtype =[
      { id: "Technical", name: "Technical" },
      { id: "Commercial", name: "Commercial" }
    ];
    const { details,complaintForm } = this.props;
    // console.log("detailssscreate",details)
  return (
    <View style={Styles.mainContainer}>
      {/* <SearchBar
          placeholder={"Search Invoice"}
          ContainerStyles={Styles.searchContainer}
        /> */}
      {/* <Card style={Styles.cardstyle}>
        <BackArrowButton style={Styles.backarrow} />
        <Text style={Styles.title}>
          {"Create "}
          <Text style={Styles.titleText}>{"New Complaint"}</Text>
        </Text>
       
        <View style={{ height: hp("10%"),width:wp("20%"),marginLeft:wp("56%"),marginTop:hp("-3%") }}>
          <SearchableDropdown
          placeHolderText={"Select Complaint Type "}
          dataSource={comtype}
          // selectedValue={influencerForm.area__c}
          // onChange={(value) =>
          //   this.props.changeInfluencerForm({
          //     edited_field: "area__c",
          //     edited_value: value,
          //   })
          // }
          placeholder={"Select Complaint Type"}
          invalid={false}
        // customPickerStyles={{ ...Styles.picker1 }}
        labelStyles={{ ...Styles.pickerLabel }}
           />
        </View>
        <View style={{ height: hp("10%"),width:wp("20%"),marginLeft:wp("56%"),marginTop:hp("-4%")}}>
          <SearchableDropdown
          placeHolderText={"Select Location "}
          // selectedValue={influencerForm.area__c}
          // onChange={(value) =>
          //   this.props.changeInfluencerForm({
          //     edited_field: "area__c",
          //     edited_value: value,
          //   })
          // }
          placeholder={"Select Location "}
          invalid={false}
          labelStyles={{ ...Styles.pickerLabel }}
        //   customPickerStyles={{ ...Styles.picker1 }} 
          />
        </View>
       
      </Card> */}
      <FlatList
      style={{ top: hp("0%"), marginBottom: "10%" }}
      data={details}
      keyExtractor={(item) => item.zx_invoiceid}
      renderItem={({ item }) => (
        <DetailCard
          dark={false}
          style={{
            backgroundColor: Colors.white,
            borderColor: "#F66A676B",
            borderWidth: 0.5,
            right: hp("0.5%"),
            width: wp("89%"),
          }}
          heading={item.zx_invoicelineid}
          headstyle={Styles.head}
          date={item.zx_visitdate?HelperService.dateReadableFormatwithmonthname(item.zx_visitdate):"1"}
          datestyle={Styles.date}
          month={"Sept 2021"}
          monthstyle={Styles.month}
          icon={"add-circle"}
          callIcon={{ left: wp("30%"),width:wp("7%"),marginLeft:wp("18%"),height:hp("3%"),zIndex:1000, }}
          // iconstyle={{right:wp("90%")}}
          // heading1={"No:-34587-1788123"}
          // head1style={Styles.head1}
          onPressicon= {() =>  {complaintForm.zx_complainttype && complaintForm.zx_location ? NavigationService.navigate('NewComplaint',{recordid:item}):HelperService.showToast({
            message: 'Please Select Complaint Type and Location',
            duration: 1000,
            buttonText: ''
          });}}
          // heading2={"34587-1788123"}
          // head2style={Styles.head2}
          content={[
            <DetailCardStrip
              labelStyle={Styles.ttl}
              valueStyle={Styles.detail}
              label={"Code"}
              value={item.zx_invoicelineid?item.zx_invoicelineid:"NA"}
            />,
            <DetailCardStrip
              labelStyle={Styles.ttl1}
              valueStyle={Styles.detail1}
              label={"Name"}
              value={item.zx_productname?item.zx_productname:"NA"}
            />,
            <DetailCardStrip
              labelStyle={Styles.ttl}
              valueStyle={{ ...Styles.detail }}
              label={"Qty"}
              value={item.zx_quantity?item.zx_quantity:"NA"}
            />,
            <DetailCardStrip
              labelStyle={Styles.ttl}
              valueStyle={{ ...Styles.detail }}
              label={"Amount"}
              value={item.zx_totalamount?item.zx_totalamount:"NA"}
            />
          ]}
        />
      )}/>
    </View>
  );
}}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerInvoiceLines,
  complaintForm: state.retailers.complaintForm,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInvoiceLines: (params) =>
    dispatch(RetailersActions.getCustomerInvoiceLines(params)),
});
export default connect(mapStateToProps, mapDispatchToProps) (CreateComplaint);
