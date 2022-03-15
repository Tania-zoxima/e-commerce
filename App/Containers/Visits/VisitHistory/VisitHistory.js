import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import VisitsActions from "App/Stores/Visits/Actions";
import { connect } from "react-redux";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "../../../Components/GenericDisplayCard/GenericDisplayCardStrip";
import GenericDisplayCard from "../../../Components/GenericDisplayCard/GenericDisplayCard";
import NoDataFound from "App/Components/NoDataFound";

class VisitHistory extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const { executeVisitData } = this.props;
    this.props.getVisitHistory({ id: executeVisitData.accountid });
  }

  render() {
    const { data, loader } = this.props;
    let visibleNode = [];
    if (data && data.length) {
        visibleNode = (
          <FlatList
            data={data}
            style={{ height: hp("77%") }}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
            renderItem={({ item }) => (
                <GenericDisplayCard
                dark={false}
                style={{ width: "88%", elevation: 0 }}
                key={item.product_name}
                heading={item.product_name}
                content={[
                  <GenericDisplayCardStrip
                    // key={"Min. Order" + data.sfid + item.product_name}
                    label={"Visit Id"}
                    value={"VI-" + item.zx_recordid}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Max. Order" + data.sfid + item.product_name}
                    label={"Visit Date"}
                    value={HelperService.removeTimestringFromDate(
                      item.zx_visitdate
                    )}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Discount" + data.sfid + item.product_name}
                    label={"Status"}
                    value={item.zx_visitstatus}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Discount" + data.sfid + item.product_name}
                    label={"Check In Time"}
                    value={HelperService.getTimeSuffix(item.zx_checkintime)}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Discount" + data.sfid + item.product_name}
                    label={"Check Out Time"}
                    value={HelperService.getTimeSuffix(item.zx_checkouttime)}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Discount" + data.sfid + item.product_name}
                    label={"Objective"}
                    value={item.zx_visitobjective}
                  />,
                  <GenericDisplayCardStrip
                    // key={"Discount" + data.sfid + item.product_name}
                    label={"Remarks"}
                    value={item.zx_visitinforemarks}
                    valueStyle={{width:wp("30%"),alignSelf:"flex-end",textAlign: "right"}}
                  />,
                ]}
              />
            )}
            keyExtractor={(item) => item.Id}
            // onRefresh={() => this.fetchExpense()}
            refreshing={loader}
            ListEmptyComponent={() => (
              <NoDataFound text={"No Visit History Found"} />
            )}
          />
        );
      } else if (loader) {
        visibleNode = <Loading />;
      } else if (
        data &&
        !data.length &&
        !loader
      ) {
        visibleNode = <NoDataFound text={"No Visit History Found"} />;
      }
    return (
      <View>
          {visibleNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  data: state.visits.visitHistory,
  executeVisitData: state.visits.executeVisitData,
  loader: state.visits.visitHistoryLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getVisitHistory: (params) => dispatch(VisitsActions.getVisitHistory(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VisitHistory);
