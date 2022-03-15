import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
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
import Bookorder from "./../Bookorder/bookorder";
import UserActions from "App/Stores/User/Actions";
import CommonActions from "App/Stores/Common/Actions";
import Loading from "App/Components/Loading";
import influencerActions from "App/Stores/Influencers/Actions";

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    const { id, token, agentid } = this.props;
    this.state.timer = setTimeout(
      () =>
        this.props.getProfile({
          id: id,
          token,
        }),
      100
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getSubArea({
          token,
          agentid,
        }),
      200
    );
  }

  fetchCall() {}
  submit() {
    const { logoutUser, token } = this.props;

    logoutUser({
      user_logged_in: false,
      token,
    });
  }

  render() {
    const {
      data,
      loading,
      userPicture,
      uploadUserImageLoader,
      uploadImage,
      profile,
      userPicUploadLoader,
      uploadUserImageField,
      details,
      profileLoader,
      id,
    } = this.props;

    {
      this.props.uploadUserImageLoader == true ||
      this.props.userPicUploadLoader == true ||
      this.props.profileLoader == true ? (
        <View
          style={{
            justifyContent: "center",
            // alignItems: "center",
            position: "absolute",
            top: 15,
            height: hp("5%"),
            width: "10%",
            right: "75%",
            backgroundColor: "transparent",
          }}
        >
          <Loading />
        </View>
      ) : (
        []
      );
    }
    //  console.log("enuuuuuuuu",details.zx_profilepicture)
    return (
      <View style={Styles.mainContainer}>
        {/* {
                  uploadUserImageLoader|| userPicUploadLoader?
        <MenuInfoTuple
          data={data}
          profilepic={details.zx_profilepicture}
          ImageLoader={uploadUserImageLoader ||userPicUploadLoader||profileLoader||uploadUserImageField == "zx_profilepicture" } 
		      onImageSuccess={({image}) => uploadImage({image, params: {edited_field: 'zx_profilepicture'}})}
          loading={loading}
          onPressLogoout={() => this.submit()
          }
        />
        : <MenuInfoTuple
        data={data}
        profilepic={details.zx_profilepicture}
        ImageLoader={uploadUserImageLoader ||userPicUploadLoader||profileLoader||uploadUserImageField == "zx_profilepicture" } 
        onImageSuccess={({image}) => uploadImage({image, params: {edited_field: 'zx_profilepicture'}})}
        loading={loading}
        onPressLogoout={() => this.submit()
        }
      />
    
      }  */}
        {/* {this.props.uploadUserImageLoader == true ||
        this.props.userPicUploadLoader == true ? (
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
          </View>
        ) : ( */}
        <MenuInfoTuple
          data={data}
          profilepic={details[0] && details[0].zx_profilepicture}
          ImageLoader={
            uploadUserImageLoader || userPicUploadLoader || profileLoader
          }
          onImageSuccess={({ image }) => {
            uploadImage({
              image,
              params: { edited_field: "zx_profilepicture" },
            });
            // ,this.props.getProfile({
            //   id: id,
            // })
          }}
          // loading={loading}
          onPressLogoout={() => this.submit()}
        />

        {this.props.uploadUserImageLoader == true ||
        this.props.userPicUploadLoader == true ||
        this.props.profileLoader == true ? (
          <View
            style={{
              justifyContent: "center",
              // alignItems: "center",
              position: "absolute",
              top: 15,
              height: hp("5%"),
              width: "0%",
              right: "78%",
              backgroundColor: "transparent",
            }}
          >
            <Loading />
          </View>
        ) : (
          []
        )}
        <ScrollView>
          <View style={{ ...ApplicationStyles.container }}>
            {/* {
            <SelectionButton
              img={require("../../Assets/Images/map.png")}
              title="Visit Approvals"
              style={{ marginTop: "10%" }}
              onPress={() => NavigationService.navigate("VisitApprovalScreen")}
            />
          } */}

            {data.zx_designationname == "DSR" ? (
              []
            ) : (
              <SelectionButton
                img={require("../../Assets/Images/man.png")}
                title="Distributor Onboarding"
                style={{ marginTop: "10%" }}
                onPress={() =>
                  NavigationService.navigate("DistributorOnboardingScreen")
                }
              />
            )}
            {
              <SelectionButton
                img={require("../../Assets/Images/kyc.png")}
                title="KYC"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("KycScreen")}
              />
            }

            {/* {
            <SelectionButton
              img={require("../../Assets/Images/presentation.png")}
              title="Training"
              style={{ marginTop: "10%" }}
              onPress={() => NavigationService.navigate("Training")}
            />
          } */}
            {
              <SelectionButton
                img={require("../../Assets/Images/presentation.png")}
                title="Competitor Scheme Info"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("CompetitorInfo")}
              />
            }
            {/* {
            <SelectionButton
            img={require("../../Assets/Images/event.png")}
              title="Meets"
              style={{ marginTop: "10%" }}
              onPress={() => NavigationService.navigate("Meets")}
            />
          }
          {
            <SelectionButton

              img={require("../../Assets/Images/presentation.png")}
              title="Branding Requisition"
              style={{ marginTop: "10%" }}
              onPress={() => NavigationService.navigate("BrandRequisition")}

            
            />
          } */}

            {/* {
            <SelectionButton

              img={require("../../Assets/Images/new.png")}
              title="New Product"
              style={{ marginTop: "10%" }}
              onPress={() => NavigationService.navigate("Products")}

            
            />
          }         */}
            {
              <SelectionButton
                img={require("../../Assets/Images/influence.png")}
                title="Add Influencers"
                style={{ marginTop: "10%" }}
                onPress={() => {
                  NavigationService.navigate("CreateInfluencer");
                  this.props.clearInfluencerForm();
                }}
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/project.png")}
                title="Projects"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("Projects")}
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/growth.png")}
                title="Opportunity"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("Leads")}
              />
            }
            {data.zx_designationname == "DSR" ? (
              []
            ) : (
              <SelectionButton
                img={require("../../Assets/Images/packing-list.png")}
                title="Primary Orders"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("GetPrimaryOrder")}
              />
            )}
            {
              <SelectionButton
                img={require("../../Assets/Images/packing-list.png")}
                title="Secondary Orders"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("GetSecondaryOrder")}
              />
            }

            {
              <SelectionButton
                img={require("../../Assets/Images/shipping.png")}
                title="Primary Goods Return"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("PrimaryGoodReturn")}
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/shipping.png")}
                title="Secondary Goods Return"
                style={{ marginTop: "10%" }}
                onPress={() =>
                  NavigationService.navigate("SecondaryGoodReturn")
                }
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/Catalogue.jpeg")}
                title="Product Catalogue"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("Catalogue")}
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/statistics.png")}
                title="Udaan Reports"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("ReportScreen")}
              />
            }
            {
              <SelectionButton
                img={require("../../Assets/Images/statistics.png")}
                title="Loyalty Dashboards"
                style={{ marginTop: "10%" }}
                onPress={() => NavigationService.navigate("DashScreen")}
              />
            }
          </View>
        </ScrollView>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/princepipesofficial/")
            }
          >
            <Image
              style={{ height: 28, width: 28, margin: 3 }}
              source={require("../../Assets/Images/facebook.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com/Prince_Pipes")}
          >
            <Image
              style={{ height: 28, width: 28, margin: 3 }}
              source={require("../../Assets/Images/twiter.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://princeudaan.in/")}
          >
            <Image
              style={{ height: 45, width: 95, margin: 5, bottom: 15 }}
              source={require("../../Assets/Images/udaan.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/channel/UCGhM2x9hF0cCgz6hU8tnYqQ"
              )
            }
          >
            <Image
              style={{ height: 28, width: 28, margin: 4 }}
              source={require("../../Assets/Images/youtube.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/prince_pipes/")
            }
          >
            <Image
              style={{ height: 28, width: 28, margin: 4 }}
              source={require("../../Assets/Images/insta.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.user.user_details,
  profile: state.user,
  token: state.user.token,
  loading: state.user.userLogoutIsLoading,
  userPicUploadLoader: state.user.userPicUploadLoader,
  userPicture: state.user.userPicture,
  uploadUserImageLoader: state.common.uploadUserImageLoader,
  uploadUserImageField: state.common.uploadUserImageField,
  details: state.user.profile,
  id: state.user.id,
  profileLoader: state.user.profileLoader,
  agentid: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (data) => dispatch(UserActions.logoutUser(data)),
  changeForm: (params) => dispatch(UserActions.changeUploadProfile(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadUserImage(params)),
  getProfile: (params) => dispatch(UserActions.getProfile(params)),
  clearInfluencerForm: (params) =>
    dispatch(influencerActions.clearInfluencerForm(params)),
  getSubArea: (params) => dispatch(UserActions.getSubArea(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
    elevation: 10,
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
  textContainer: {
    // alignSelf: 'flex-start',
    // / paddingLeft: wp('8%')
  },
  countText: {
    color: Colors.grey,
    fontSize: wp("3%"),
    marginBottom: hp(".5%"),
    marginTop: hp("1%"),
    fontFamily: ApplicationStyles.textMsgFont,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp("5.5%"),
    alignSelf: "center",
    padding: 10,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
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
