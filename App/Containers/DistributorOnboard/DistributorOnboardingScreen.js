import React, { Component } from "react";
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
  TouchableHighlight,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
// import Card from '../../Components/Card/Card';
import Styles from "./DistributorOnboardingStyles";
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
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import Draft from "./Draft";
import Pending from "./Pending";
import Approved from "./Approved";
import Rejected from "./Rejected";

class DistributorOnboarding extends Component {
  componentDidMount() {
    const { token, distributor, id } = this.props;
    let params = {
      token,
      salesexecutive: id,
    };
    this.props.getDistributor(params);
  }
  //  const [data, setdata] = useState([
  //      {name:"Builder",id:"1",phone:"Design stage",firm:"Proprietor",gross:"3-5 Cr"},
  //  ])
  onSelectDistributor(params) {
    NavigationService.navigate("NewDealerScreen", { show: true });
    this.props.selectDistributor(params);
  }
  render() {
    const {
      distributor,
      clearDistributorForm,
      changeDistributorSearchFilters,
      searchFilters,
      code,
    } = this.props;
    // console.log("distributtorrrrdata",distributor)
    return (
      <View style={Styles.mainContainer}>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text style={{ ...Styles.titleText }}>
            {"Distributor "}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Onboarding"}
            </Text>
          </Text>
          <SearchBar
            placeholder={"Search by name of the firm..."}
            onInputChange={(text) =>
              changeDistributorSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeDistributorSearchFilters({
                edited_field: "name",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeDistributorSearchFilters({
                edited_field: "name",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={Styles.searchContainer}
          />
        </Card>
        <View style={Styles.container}>
          <TouchableHighlight
            style={code.zx_brandgroupcode == "1"?Styles.plusIcon:Styles.plusIconBlue}
            onPress={() => {
              NavigationService.navigate("NewDealerScreen", { show: false });
              this.props.clearDistributorForm();
            }}
          >
            <GenericIcon
              name={"add"}
              style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
            />
          </TouchableHighlight>
        </View>
        <View>
          <Tabs
            renderTabBar={() => (
              <ScrollableTab tabStyle={{ backgroundColor: "white" }} />
            )}
            tabBarUnderlineStyle={
              code.zx_brandgroupcode == "1"
                ? { backgroundColor: Colors.darkRedPink }
                : { backgroundColor: Colors.bluebackground }
            }
            style={{ marginTop: hp("1.5%") }}
          >
            <Tab
              heading="Draft"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Draft />
            </Tab>
            <Tab
              heading="Pending for approval"
              textStyle={{
                color: "#9A9A9A",
                fontSize: 15,
                textAlign: "center",
              }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{
                color: Colors.black,
                fontSize: 15,
                textAlign: "center",
              }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Pending />
            </Tab>
            <Tab
              heading="Approved"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Approved />
            </Tab>
            <Tab
              heading="Rejected"
              textStyle={{ color: "#9A9A9A", fontSize: 15 }}
              tabStyle={{ backgroundColor: Colors.white }}
              activeTextStyle={{ color: Colors.black, fontSize: 15 }}
              activeTabStyle={{ backgroundColor: Colors.white }}
            >
              <Rejected />
            </Tab>
          </Tabs>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    distributor: state.distributor.DistributorList,
    searchFilters: state.distributor.searchFilters,
    code: state.user.user_details,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDistributor: (params) =>
    dispatch(DistributorActions.getDistributor(params)),
  selectDistributor: (params) =>
    dispatch(DistributorActions.selectDistributor(params)),
  clearDistributorForm: () =>
    dispatch(DistributorActions.clearDistributorForm()),
  changeDistributorSearchFilters: (params) =>
    dispatch(DistributorActions.changeDistributorSearchFilters(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorOnboarding);
