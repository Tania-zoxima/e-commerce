import React, { Component } from "react";
import InputText from "App/Components/FormInput/InputText";
import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import BlueButton from "../../Components/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";

export default class NewProduct extends Component {
  render() {
    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
          {"Create "}
          <Text style={Styles.titleText}>{"New Product"}</Text>
        </Text>
        </Card>
        <ScrollView>
          {/* <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Type*</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={" Select Type"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Type"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Styles.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                //  label={"Area"}
              />
            </View>
          </View>
          <View style={Styles.dropDown}>
            <Text style={Styles.textStyle}>Pipeline stage*</Text>

            <View style={Styles.dropDownInner}>
              <SearchableDropdown
                // dataSource={this.props.agentAreas}
                placeHolderText={" Select Type"}
                // selectedValue={influencerForm.area__c}
                // onChange={(value) =>
                //   this.props.changeInfluencerForm({
                //     edited_field: "area__c",
                //     edited_value: value,
                //   })
                // }
                placeholder={"Select Type"}
                invalid={false}
                customPickerStyles={{ ...Styles.picker }}
                // labelStyles={{ ...Styles.pickerLabel }}
                // invalid={
                //   validation.invalid && validation.invalid_field == "area__c"
                // }
                //  label={"Area"}
              />
            </View>
          </View> */}
          <View style={Styles.outerView}>
          <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Person Name</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Person Name"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Requested By Dealer Name & Place</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Requested By Dealer Name & Place"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Product Launch Date</Text>
        <InputText style={Styles.placeholder} placeholder={"Select Product Launch Date"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Category</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Category"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Size</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Size"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Application</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Application"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Type Of Joint</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Type Of Joint"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Main Competitors</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Main Competitors"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Name of Competitors</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name of Competitors"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Expected Selling Price</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Expected Selling Price"} />
      </View>
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Expected Monthly Sale</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Expected Monthly Sale"} />
      </View>
      
      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Remarks</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Remarks"} />
      </View>
            <View>
              <BlueButton style={Styles.button} title={"SAVE"} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("12%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("2%"),
    color: Colors.white,
  },

  head: {
    fontSize: 25,
    fontFamily: "Rubik",
    left: hp("0%"),
    fontWeight: "bold",
    color: Colors.black,
    top: hp("-1.5%"),
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("8%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("8%"),
    fontWeight: "bold",
  },
  plusIcon: {
    borderRadius: 50,
    bottom: hp("10%"),
    position: "absolute",
    right: wp("4.5%"),
    borderRadius: 50,
    height: hp("6%"),
    width: wp("12%"),
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    elevation: 6,
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  placeholder: {
    borderColor: "transparent",
    right: wp("1.5%"),
    fontFamily: "Segoe UI",
    // color:Colors.black,
    fontSize: 13,
    top: hp("2%"),
    fontWeight: "bold",
  },

  outerView: {
    flexDirection: "row",
    flexWrap: "wrap",
    left: "0%",
    right: "8%",
    top: "0%",
    marginBottom: "20%",
  },
  textView: {
    width: wp("80%"),
    marginTop: hp("1.5%"),
    display:"flex",
    flexDirection:"row",
    height:hp(15)
  },

  textView1: {
    width: wp("80%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left:wp("7%"),
  },
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  dropDown: {
    width: wp("85%"),
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
    marginLeft: wp("6%"),
  },
  dropDownInner: {
    left: wp("5%"),
    top: hp("3.5%"),
  },
  picker: {
    // borderRadius: 100,
    width: wp("85%"),
    // height: hp('5.7%'),
    marginBottom: hp("2%"),
    paddingHorizontal: 8,
  },
  button: {
    width: wp("29%"),
    height: hp("5%"),
    top: hp("5%"),
    left: wp("29%"),
    // paddingBottom: 4,
    borderRadius: 3,
  },
  textView2: {
    width: wp("40%"),
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    marginTop: hp("1.5%"),
    left:wp("7%"),
    height:hp(11)
  },
});
