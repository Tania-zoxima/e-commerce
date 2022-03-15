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
  Text,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";
import Styles from "./DistributorOnboardingStyles";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { connect } from "react-redux";
import DistributorActions from "App/Stores/Distributor/Actions";
import NavigationService from "App/Services/NavigationService";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { HelperService } from "../../Services/Utils/HelperService";
import { Icon, Input, Button } from "native-base";
import WhiteButton from "../../Components/WhiteButton/WhiteButton";
import DashboardActions from "App/Stores/Dashboard/Actions";
class Rejected extends Component {
  componentDidMount() {
    this.fetchCall();
  }
  //  const [data, setdata] = useState([
  //      {name:"Builder",id:"1",phone:"Design stage",firm:"Proprietor",gross:"3-5 Cr"},
  //  ])
  fetchCall() {
    const { token, distributor, id } = this.props;
    let params = {
      token,
      salesexecutive: id,
    };
    this.props.getDistributor(params);
  }
  onSelectDistributor(params) {
    NavigationService.navigate("NewDealerScreen", { show: true });
    this.props.selectDistributor(params);
  }
  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_overallstatus == "Rejected");
    // console.log(result)
    return result;
  }

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['area'])

    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_distributorname",
      searchFilters["name"]
    );
    filteredList = HelperService.sortListFilter(
      filteredList,
      "zx_recordid",
      "DSC"
    );

    return filteredList;
  }
  getDataNode() {
    let visibleNode = [];

    const { distributor, Approved, loader, token, loading } = this.props;

    if (distributor && distributor.length) {
      let filteredSitesList = this.searchKeyValueInList(
        distributor.map((obj) => obj)
      );

      if (filteredSitesList && filteredSitesList.length) {
        let searchedFilteredList = this.filterResults(filteredSitesList);
        if (searchedFilteredList.length) {
          visibleNode = (
            <FlatList
              data={filteredSitesList}
              contentContainerStyle={{ paddingBottom: 320, paddingTop: 10 }}
              keyExtractor={(item) => item.Id}
              onRefresh={() => this.fetchCall()}
              refreshing={loading}
              //    initialNumToRender={7}
              renderItem={({ item }) => (
                <DisplayCard
                  dark={false}
                  // onPress={() => this.onSelectDistributor(item)}
                  style={{
                    backgroundColor: Colors.white,
                    borderColor: Colors.lightPink,
                    borderWidth: 1,
                  }}
                  iconstyle={Styles.iconstyle}
                  onPressicon={() => {
                    item.zx_mobileno
                      ? HelperService.callNumber(item.zx_mobileno)
                      : HelperService.showToast({
                          message: "Phone Number Not Available",
                          duration: 2000,
                          buttonText: "Okay",
                        });
                  }}
                  callIcon={{
                    width: wp("10%"),
                    marginLeft: wp("75%"),
                    marginTop: hp("2.5%"),
                    height: hp("3%"),
                    position: "absolute",
                  }}
                  heading={item.zx_distributorname}
                  Styletitle={Styles.head}
                  status={item.zx_overallstatus}
                  Stylestatus={Style.status}
                  icon={"call"}
                  icon1={"create"}
                  iconStyle={{ marginLeft: wp("5%"), fontSize: 25 }}
                  locationIcon={{
                    width: wp("13%"),
                    marginLeft: wp("60%"),
                    marginTop: hp("2%"),
                    marginBottom: hp("2%"),
                    position: "absolute",
                  }}
                  onPresslocation={() => {
                    this.onSelectDistributor(item);
                    this.props.clearSearchFilter();
                  }}
                  content={[
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Name"}
                      value={item.zx_nameofthefirm}
                    />,
                    // <DisplayCardStrip
                    //   stylettl={Styles.ttl}
                    //   styledetail={Styles.detail}
                    //   label={"Phone No."}
                    //   value={item.zx_mobileno}
                    // />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Constitution of Firm"}
                      value={item.zx_constitutionofthefirm}
                    />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Year of Establishment"}
                      value={HelperService.dateReadableFormat(
                        item.zx_yearofestablishment
                      )}
                    />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Gross Turnover"}
                      value={item.zx_grossturnoverperannum}
                    />,
                    <WhiteButton
                      style={{
                        backgroundColor: Colors.darkRedPink,
                        height: hp("5%"),
                        borderRadius: 5,
                        width: wp("50%"),
                        marginLeft: wp("15%"),
                        marginTop: hp("1%"),
                      }}
                      // onPress={ () => this.props.sendApproval({form: item,token,id:item.Id})}
                      onPress={() =>
                        this.props.sendApproval({
                          form: item,
                          token,
                          id: { id: item.Id },
                        })
                      }
                      loading={loader && loader == item.Id}
                      disabled={loader}
                      refreshing={loader}
                      onRefresh={() => this.fetchCall()}
                      title={"SUBMIT FOR APPROVAL"}
                      textStyle={{ color: Colors.white, fontSize: 12 }}
                    ></WhiteButton>,
                  ]}
                />
              )}
            />
          );
        }
      } else {
        visibleNode = <NoDataFound text={"No Data found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (
      !distributor ||
      (distributor && !distributor.length && !loading)
    ) {
      visibleNode = (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            top: hp("5%"),
          }}
        >
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: Colors.grey,
                fontFamily: ApplicationStyles.textMsgFont,
                fontSize: wp("4.4%"),
                marginTop: "15%",
                alignSelf: "center",
              }}
            >
              No Data Found
            </Text>
            <Icon
              name={"refresh"}
              onPress={() => this.fetchCall()}
              style={{
                color: Colors.button,
                fontSize: 25,
                alignSelf: "center",
                padding: "2%",
              }}
              type={"FontAwesome"}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return visibleNode;
  }
  render() {
    const { distributor, clearDistributorForm } = this.props;
    // console.log("distributtorrrrdata",distributor)

    return (
      <View>
        {this.getDataNode()}

        {/* <FlatList
          data={distributor}
          contentContainerStyle={{ paddingBottom:180,paddingTop:10}}
          keyExtractor={(item) => item.zx_customerid}
          //    initialNumToRender={7}
          renderItem={({ item }) => (
            <DisplayCard
             dark={false}
              onPress={() => this.onSelectDistributor(item)}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors.lightPink,
                borderWidth:1,
              }}
              iconstyle={Styles.iconstyle}
              onPressicon={() => {
                item.zx_mobileno
                  ? HelperService.callNumber(item.zx_mobileno)
                  : HelperService.showToast({
                      message: "Phone Number Not Available",
                      duration: 2000,
                      buttonText: "Okay",
                    });
              }}
              callIcon={{width:wp("10%"),marginLeft:wp("75%"),marginTop:hp("-3%"),height:hp("3%") }}
              heading={item.zx_distributorname}
              Styletitle={Styles.head}
              status={item.zx_overallstatus}
              Stylestatus={Styles.status}
              icon={"call"}
              content={[
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Name"}
                  value={item.zx_nameofthefirm}
                />,
                // <DisplayCardStrip
                //   stylettl={Styles.ttl}
                //   styledetail={Styles.detail}
                //   label={"Phone No."}
                //   value={item.zx_mobileno}
                // />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Constitution of Firm"}
                  value={item.zx_constitutionofthefirm}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Gross Turnover"}
                  value={item.zx_grossturnoverperannum}
                />,
              ]}
            />
          )}
        />  */}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    distributor: state.distributor.DistributorList,
    loader: state.distributor.sendApproval.sendApprovalLoader,
    loading: state.distributor.getDistributorLoader,
    searchFilters: state.distributor.searchFilters,
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
  sendApproval: (params) => dispatch(DistributorActions.sendApproval(params)),
  clearSearchFilter: (params) =>
    dispatch(DashboardActions.clearSearchFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rejected);
const Style = StyleSheet.create({
  status: {
    color: Colors.white,

    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 8,
    // marginBottom: 3,
    backgroundColor: Colors.cardblue,
    width: wp(24),
    padding: wp(0.5),
    borderRadius: 5,
    top: hp("1%"),
    left: wp("3%"),
    height: hp("2%"),
    textAlign: "center",
  },
});
