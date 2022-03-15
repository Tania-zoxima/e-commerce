import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Card } from "native-base";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import WhiteButton from "../../Components/WhiteButton";
import Style from "./AbsentScreenStyle";
import BlueButton from "../../Components/BlueButton";
import { CANCEL, SUBMIT, LEAVE, WEEK_OFF } from "../../Constants";
import { smallBottomMargin } from "../../Theme/Metrics";
import NavigationService from "App/Services/NavigationService";
import LayoutScreen from "../Layout/LayoutScreen";
import UserActions from "App/Stores/User/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import Wave from "../../Components/WaveCurls";

class AbsentScreen extends Component {
 async submit() {
     let location = await HelperService.requestLocation();

    // if (location == "DENIED") {
    //   Alert.alert(
    //     "Location permission is required to proceed.",
    //     "Go App Permissions and Turn on Location Permission for Re-Konekt."
    //   );
    //   this.props.userStartDayLoadingStop();
    //   return;
    // } else if (!location) {
    //   this.props.userStartDayLoadingStop();
    //   return;
    // }

    this.props.updateUserLocation(location);
    if (
      this.props.absentReason == "Planned Leave" ||
      this.props.absentReason == "Adhoc Leave"
    ) {
      this.props.markUserAbsent({
        date: HelperService.getCurrentTimestamp(),
                absent: this.props.absentReason,
                 user: this.props.agentid, 
                 latitude: location.latitude,
                 longitude: location.longitude,
      token: this.props.token,

                 
  
        type: "Absent",
       
      });
    } else {
      HelperService.showToast({
        message: "Absent Reason not selected.",
        duration: 2000,
        buttonText: "Okay",
      });
    }
  }

  updateAbsentReason(reason) {
    this.props.updateUserMarkedAbsentReason({ absentReason: reason });
  }
  goTo(screen) {
    NavigationService.navigate(screen);
  }

  render() {
    const{code}=this.props
    return (
      <View style={Style.container}>
        <Wave customStyles={Style.svgCurve} color={code.zx_brandgroupcode == "1"?"#ed1b24":"#018EBC"}/>

        <View style={code.zx_brandgroupcode == "1"?Style.waveBox:Style.waveBoxBlue}>
          <Text style={{ ...Style.title,right:"8%",textAlign:"center" }}>
            {"You will be marked absent"}
            <Text style={{ ...Style.title, ...Style.textClr }}>
              {" for today"}
            </Text>
          </Text>
          {/* <WhiteButton
            style={{ ...Style.actionButton, ...Style.mv4 }}
            title={"Planned"}
            // onPress={() => this.goTo("PresentScreen")}

             onPress={() => this.updateAbsentReason("Planned")}
          />
          <WhiteButton
            style={{ ...Style.actionButton, ...Style.mv4 }}
            title={"Ad-hoc"}
            // onPress={() => this.goTo("PresentScreen")}

             onPress={() => this.updateAbsentReason("Ad-hoc")} */}
          {/* /> */}
          <WhiteButton style={{...Style.actionButton, ...Style.mv10}} selected={this.props.selectedAbsentReason == 'Planned Leave'} title={'Planned'} onPress={() => this.updateAbsentReason('Planned Leave')}/>
                             <WhiteButton style={{...Style.actionButton, ...Style.mv10}} selected={this.props.selectedAbsentReason == 'Adhoc Leave'} title={'Ad-hoc'} onPress={() => this.updateAbsentReason('Adhoc Leave')}/>

                             <View style={Style.action}>
                            <WhiteButton style={{...Style.button}} rounded title={CANCEL} disabled={!!this.props.userMarkedAbsentLoader} onPress={() => { NavigationService.goback() }} />

                            <WhiteButton style={{...Style.button1,}} rounded large title={SUBMIT} disabled={!!this.props.userMarkedAbsentLoader} loading={!!this.props.userMarkedAbsentLoader} onPress={() => this.submit()} />



                        </View> 
        </View>
         
        {/* </Card> */}
      </View>
    );
  }
}

AbsentScreen.propTypes = {
  area: PropTypes.string,
  validation: PropTypes.object,
  agentAreas: PropTypes.array,
  token: PropTypes.string,
  agentid: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
   agentid: state.user.id,
  leaveType: state.user.leaveType,
  absentReason: state.user.absentReason,
  userMarkedAbsentLoader: state.user.userMarkedAbsentLoading,
  selectedAbsentReason: state.user.absentReason,
  absentReasons: state.common.absentReasons,
  sfid: state.user.id,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  markUserAbsent: (params) => dispatch(UserActions.markUserAbsent(params)),
  userMarkedAbsentLoading: () =>
    dispatch(UserActions.userMarkedAbsentLoading()),
  updateUserMarkedAbsentReason: (params) =>
    dispatch(UserActions.updateUserMarkedAbsentReason(params)),
    updateUserLocation: (location) =>
    dispatch(UserActions.updateUserLocation(location)),
  updateUserArea: (area) => dispatch(UserActions.updateUserArea(area)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AbsentScreen);
