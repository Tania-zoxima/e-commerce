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
import GenericDisplayCardStrip from "../../Components/GenericDisplayCard/GenericDisplayCardStrip";
import GenericDisplayCard from "../../Components/GenericDisplayCard/GenericDisplayCard";
import NoDataFound from "App/Components/NoDataFound";
import ProjectActions from "App/Stores/Project/Actions";

export class ProductSold extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const { project, token, code } = this.props;
    this.props.getProjectProductSold({
      zx_project: project.zx_projectid,
      token,
    });
  }
  render() {
    const { data, loading } = this.props;
    let visibleNode = [];
    if (data && data.length) {
      visibleNode = (
        <FlatList
          data={data}
          style={{ height: hp("70%") }}
          contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
          renderItem={({ item }) => (
            <GenericDisplayCard
              dark={false}
              style={{ width: "88%", elevation: 0 }}
              key={item.id}
              //   heading={item.product_name}
              content={[
                <GenericDisplayCardStrip
                  // key={"Min. Order" + data.sfid + item.product_name}
                  label={"Product Code"}
                  value={item.zx_productcode}
                />,
                <GenericDisplayCardStrip
                  // key={"Max. Order" + data.sfid + item.product_name}
                  label={"Product Name"}
                  value={item.zx_productname}
                  valueStyle={{
                    width: wp("30%"),
                    alignSelf: "flex-end",
                    textAlign: "right",
                  }}
                />,
              ]}
            />
          )}
          keyExtractor={(item) => item.id}
          // onRefresh={() => this.fetchExpense()}
          refreshing={loading}
          ListEmptyComponent={() => <NoDataFound text={"No Data Found"} />}
        />
      );
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (data && !data.length && !loading) {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return <View>{visibleNode}</View>;
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    code: state.user.user_details,
    project: state.project.projectForm,
    loading: state.project.getProjectProductSoldLoader,
    data: state.project.getProjectProductSold,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProjectProductSold: (params) =>
    dispatch(ProjectActions.getProjectProductSold(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductSold);
