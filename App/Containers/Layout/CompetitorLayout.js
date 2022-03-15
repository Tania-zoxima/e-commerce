import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailCard from "../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../Components/DetailCard/DetailCardStrip";
import SearchBar from "App/Components/SearchBar";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
// import Styles from "./CompetitorInfoStyles";
import { connect } from "react-redux";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import SearchableDropdown from "App/Components/SearchableDropdown";
import DatePicker from "App/Components/DatePicker";
class CompetitorLayout extends Component {
  render() {
    const{code}=this.props
    return (
      <View style={Styles.mainContainer}>
        <Card style={code.zx_brandgroupcode=="1"?Styles.cardstyle:Styles.cardstyleblue}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Competitor "}
            <Text style={Styles.titleText}>{"Scheme Info"}</Text>
          </Text>
        </Card>
        
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  code: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  
});
export default connect(mapStateToProps, mapDispatchToProps)(CompetitorLayout)
const Styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: hp("0%"),
    // backgroundColor:"black",
    // height:hp("100%")
  },
  cardstyle: {
    flexDirection: "column",
    paddingTop: hp("2%"),
    paddingBottom: hp("1%"),
    width: wp("100%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  cardstyleblue: {
    flexDirection: "column",
    paddingTop: hp("2%"),
    paddingBottom: hp("1%"),
    width: wp("100%"),
    paddingLeft: wp("2%"),
    paddingRight: wp("2%"),
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("15%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingRight: wp("90%"),
    // paddingTop:hp("1.5%")
  },

  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 22,
    fontWeight: "bold",
    alignSelf:"center"
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 22,
    fontWeight: "bold",
    alignSelf:"center"
  },
});
