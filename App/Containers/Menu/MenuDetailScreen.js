import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Spinner } from "native-base";
import NavigationService from "App/Services/NavigationService";

import SelectionButton from "App/Components/SelectionButton";
import { ApplicationStyles, Colors } from "App/Theme";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MenuInfoTuple from "./MenuInfoTuple";
import { TextInput } from "react-native-paper";

import AgentInfo from "App/Components/AgentInfo";
import BackArrowButton from "App/Components/BackArrowButton";

import { Tab, Tabs } from "native-base";
import { Divider } from "react-native-paper";
import Separator from "../../Components/Separator/Separator";
import Info from "./Info";
import Personal from "./Personal";
import UserActions from "App/Stores/User/Actions";
import CommonActions from "App/Stores/Common/Actions";
import Loading from "App/Components/Loading";

class MenuDetailScreen extends Component {
  componentDidMount() {
    const { id,token } = this.props;
    this.props.getProfile({
      id: id,
      token
    });
  }

  fetchCall() {}

  render() {
    const { data,loading,uploadUserImageLoader,uploadImage,userPicUploadLoader,uploadUserImageField, businessChannel, psmList,details,profileLoader } = this.props;
    
   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",details);
    return (
      <View style={Styles.mainContainer}>
        <BackArrowButton
          style={
            data.zx_brandgroupcode == "1"
              ? { color: Colors.darkRedPink, fontSize: 32, paddingRight: 350 }
              : { color: Colors.bluebackground, fontSize: 32, paddingRight: 350 }
          }
        />
        {/* <BackArrowButton style={{color:Colors.darkRedPink,fontSize:32,paddingRight: 350,}}/> */}
        {/* <MenuInfoTuple data={data} Show={true} /> */}
        {/* {this.props.uploadUserImageLoader == true || this.props.userPicUploadLoader == true || this.props.profileLoader == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 10,
              height: hp("5%"),
              width: "100%",
            }}
          >
            <Loading />
          </View> */}
        {/* ) :  */}
        <MenuInfoTuple
        data={data}
        Show={true}
        profilepic={details[0] && details[0].zx_profilepicture}
        // ImageLoader={uploadUserImageLoader ||userPicUploadLoader||profileLoader||uploadUserImageField == "zx_profilepicture" } 
         onImageSuccess={({image}) => uploadImage({image, params: {edited_field: 'zx_profilepicture'}})}
        // loading={loading}
        // onPressLogoout={() => this.submit()
        // }
      />
        
          {/* <AgentInfo heading={"SFA Code"} value={"NA"} />
        <BackArrowButton
          style={
            data.zx_brandgroupcode == "1"
              ? { color: Colors.darkRedPink, fontSize: 32, paddingRight: 350 }
              : { color: Colors.bluebackground, fontSize: 32, paddingRight: 350 }
          }
        />
        <MenuInfoTuple data={data} Show={true} />
        {/* <ScrollView style={{ ...Styles.box }}> */}
        <View style={{ ...Styles.tabs }}>
          <Tabs
            tabBarUnderlineStyle={
              data.zx_brandgroupcode == "1"
                ? {
                    width: "14%",
                    marginLeft: "10%",
                    backgroundColor: Colors.darkRedPink,
                    marginBottom: "2%",
                    height: -1,
                  }
                : {
                    width: "14%",
                    marginLeft: "10%",
                    backgroundColor: Colors.bluebackground,
                    marginBottom: "2%",
                    height: -1,
                  }
            }
          >
            <Tab
              heading="Info "
              textStyle={{ color: Colors.lightGrey, fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
              activeTextStyle={
                data.zx_brandgroupcode == "1"
                  ? { color: Colors.darkRedPink, fontSize: 15 }
                  : { color: Colors.bluebackground, fontSize: 15 }
              }
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <ScrollView>
                <Info details={details} />
              </ScrollView>
            </Tab>
            <Tab
              heading="Personal"
              textStyle={{ color: Colors.lightGrey, fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white, flex: 1 }}
              activeTextStyle={
                data.zx_brandgroupcode == "1"
                  ? { color: Colors.darkRedPink, fontSize: 15 }
                  : { color: Colors.bluebackground, fontSize: 15 }
              }
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <ScrollView>
                <Personal details={details} />
              </ScrollView>
            </Tab>
          </Tabs>
        </View>

        {/* <AgentInfo heading={"SFA Code"} value={"NA"} />
          <AgentInfo heading={"Designation"} value={"NA"} />
          <AgentInfo heading={"Manager"} value={"NA"} /> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.user.id,
  token: state.user.token,
  data: state.user.user_details,
  businessChannel: state.user.user_details
    ? state.user.user_details.business_channel__c
    : "",
  psmList: state.user.psmList,
  details:state.user.profile,
  userPicUploadLoader:state.user.userPicUploadLoader,
  userPicture: state.user.userPicture,
  uploadUserImageLoader: state.common.uploadUserImageLoader,
  uploadUserImageField: state.common.uploadUserImageField,
  profileLoader:state.user.profileLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (params) =>
    dispatch(UserActions.getProfile(params)),
    uploadImage: (params) => dispatch(CommonActions.uploadUserImage(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetailScreen);

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: hp("0%"),
  },
  tabs: {
    flex: 1,
    marginTop: hp("4"),
    width: wp(90),
    alignSelf: "center",
    height: hp(80),
    borderWidth: 1,
    borderColor: Colors.tabBorder,
    shadowColor: Colors.black,
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: { width: 10, height: 10 },
    elevation: 15,
  },
  input: {
    marginVertical: 10,
    width: "80%",
    height: "7.5%",
    backgroundColor: Colors.white,
  },

  progressContainer: {
    width: wp("90%"),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: hp("14%"),
    backgroundColor: Colors.lightGrey,
    marginBottom: hp("8%"),
    borderRadius: wp("1.5%"),
    position: "relative",
  },
  value: {
    fontSize: wp("4%"),
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.primary,
  },
  box: {
    alignSelf: "center",
    width: Dimensions.get("window").width - 30,

    // marginVertical: ,
    padding: 15,
    // borderRadius: 10,
    // position: "relative",
    // borderWidth:1,
  },
  textContainer: {
    width: "100%",
    backgroundColor: Colors.lightGrey,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 7,

    //marginBottom:"5%"
  },
  name: {
    color: Colors.darkGrey,
    fontSize: wp("3.8%"),
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: "capitalize",
    marginBottom: hp(".1%"),
  },

  info: {
    color: Colors.darkGrey,
    fontSize: wp("3.3%"),
    fontFamily: ApplicationStyles.textMsgFont,
    textTransform: "capitalize",
    marginBottom: hp(".1%"),
  },

  countText: {
    color: Colors.grey,
    fontSize: wp("3%"),
    marginBottom: hp(".5%"),
    marginTop: hp("1%"),
    fontFamily: ApplicationStyles.textMsgFont,
  },

  loadingIcon: {
    color: Colors.primary,
    fontSize: wp("4%"),
    alignSelf: "center",
    position: "absolute",
    right: wp("2.3%"),
    top: -hp("2.3%"),
    zIndex: 2,
  },
});
