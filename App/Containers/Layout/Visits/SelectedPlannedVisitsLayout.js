import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
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
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import BackArrowButton from "App/Components/BackArrowButton";
import { Colors, ApplicationStyles } from "App/Theme";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class SelectedPlannedVisitsLayout extends React.Component {
  render() {
    const { code } = this.props;
    return (
      <View>
        <Header style={Styles.header}>
          <Body style={Styles.headerBody}>
            <View style={{ alignSelf: "flex-start" }}>
              <BackArrowButton
                style={
                  code.zx_brandgroupcode == "1"
                    ? { fontSize: 30, color: Colors.darkRedPink }
                    : { fontSize: 30, color: Colors.bluebackground }
                }
              />
            </View>
            <View style={{ alignSelf: "center" }}>
              <Title
                style={code.zx_brandgroupcode == "1"?{
                  textAlign: "center",
                  fontFamily: ApplicationStyles.textMsgFont,
                  fontSize: 15,
                  color: Colors.white,
                  marginLeft: wp("23.5%"),
                  fontWeight: "bold",
                  backgroundColor: Colors.background,
                  width: wp("45%"),
                  height: hp("4%"),
                  borderRadius: 6,
                  paddingTop: hp("0.4%"),
                  top: hp("1.2%"),
                }:{
                  textAlign: "center",
                  fontFamily: ApplicationStyles.textMsgFont,
                  fontSize: 15,
                  color: Colors.white,
                  marginLeft: wp("23.5%"),
                  fontWeight: "bold",
                  backgroundColor: Colors.bluebackground,
                  width: wp("45%"),
                  height: hp("4%"),
                  borderRadius: 6,
                  paddingTop: hp("0.4%"),
                  top: hp("1.2%"),
                }}
              >
                {this.props.selectedPlannedVisits &&
                this.props.selectedPlannedVisits.length
                  ? "Planned Visits: " + this.props.selectedPlannedVisits.length
                  : []}
              </Title>
            </View>
          </Body>
        </Header>
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changePlannedSelectedDate: (params) =>
    dispatch(VisitsActions.changePlannedSelectedDate(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPlannedVisitsLayout);

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBody: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
});
