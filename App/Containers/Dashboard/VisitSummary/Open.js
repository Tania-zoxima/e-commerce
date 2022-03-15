import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";
import GenericDisplayCard from "App/Components/GenericDisplayCard/GenericDisplayCard";
import NoDataFound from "App/Components/NoDataFound";
import ProjectActions from "App/Stores/Project/Actions";

export class Open extends Component {
  render() {
    const { visitSummary, visitSummaryloader } = this.props;
    let visibleNode = [];
    if (visitSummary && visitSummary.length) {
      visibleNode = (
        <FlatList
          data={visitSummary}
          //   style={{ height: hp("77%") }}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          //   onRefresh={() => this.fetchCall()}
          renderItem={({ item }) => (
            <GenericDisplayCard
              dark={false}
              style={{ width: "88%", elevation: 0 }}
              key={item.id}
              heading={item.name}
              subHeading={"Customer No:" + item.accountnumber}
              content={[
                <GenericDisplayCardStrip
                  // key={"Min. Order" + data.sfid + item.product_name}
                  label={"Visit id"}
                  value={"VI-" + item.zx_recordid}
                />,
                <GenericDisplayCardStrip
                  // key={"Max. Order" + data.sfid + item.product_name}
                  label={"Visit date"}
                  value={HelperService.removeTimestringFromDate(
                    item.zx_visitdate
                  )}
                />,
                <GenericDisplayCardStrip
                  // key={"Max. Order" + data.sfid + item.product_name}
                  label={"Objective"}
                  value={item.zx_visitobjective}
                />,
                <GenericDisplayCardStrip
                  // key={"Max. Order" + data.sfid + item.product_name}
                  label={"Type"}
                  value={item.zx_visittype}
                />,
              ]}
            />
          )}
          keyExtractor={(item) => item.Id}
          // onRefresh={() => this.fetchExpense()}
          //   refreshing={loading}
          ListEmptyComponent={() => <NoDataFound text={"No Visit Found"} />}
        />
      );
    } else if (visitSummaryloader) {
      visibleNode = <Loading />;
    } else if (visitSummary && !visitSummary.length && !visitSummaryloader) {
      visibleNode = <NoDataFound text={"No Visit Found"} />;
    } else {
      visibleNode = <NoDataFound text={"No Visit Found"} />;
    }
    return <View>{visibleNode}</View>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    visitSummary:state.visits.visitSummary.open_visit,
    visitSummaryloader: state.visits.visitSummaryLoader,
  };
};

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Open);
