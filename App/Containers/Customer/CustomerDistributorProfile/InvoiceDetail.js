import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../../Components/DisplayCard/DisplayCardStrip";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import Loading from "App/Components/Loading";
import NoDataFound from "App/Components/NoDataFound";
class InvoiceDetail extends Component {
  componentDidMount() {
    const{token}=this.props
    const { id } = this.props.navigation.state.params;
    this.props.getCustomerInvoiceLines({
      id: id,
      token
    });
  }
  render() {
    const { details,getCustomerInvoiceLinesLoader } = this.props;
    let visibleNode = [];
    if (details && details.length) {
      visibleNode = (
        <FlatList
          data={details}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors.darkRedPink,
                borderWidth: 0.2,
                shadowOffset: {
                  width: 15,
                  height: 15,
                },
                shadowOpacity: 20,
                shadowRadius: 10,
                shadowColor: Colors.darkRedPink,
                elevation: 20,
              }}
              heading={item.zx_invoicelineid}
              Styletitle={Styles.head}
              heading1={item.zx_productgroupcode}
              headingStyle={Styles.head1}
              content={[
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Item Code"}
                  value={item.zx_itemclasscode?item.zx_itemclasscode:"NA"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Item Name"}
                  value={item.zx_productname?item.zx_productname:"NA"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Quantity"}
                  value={item.zx_quantity?item.zx_quantity:"0"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Amount"}
                  value={"₹"+item.zx_totalamount}
                />,
              ]}
            />
          )}
          keyExtractor={(item) => item.id}
          // onRefresh={() => this.fetchExpense()}
          refreshing={getCustomerInvoiceLinesLoader}
          ListEmptyComponent={() => (
            <NoDataFound text={"No Invoice Line Found"} />
          )}
        />
      );
    } else if (getCustomerInvoiceLinesLoader) {
      visibleNode = <Loading />;
    } else if (
      details &&
      !details.length &&
      !getCustomerInvoiceLinesLoader
    ) {
      visibleNode = <NoDataFound text={"No Invoice Line Found"} />;
    }
    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>{"Invoice Details"}</Text>
        </Card>
        {visibleNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerInvoiceLines,
  getCustomerInvoiceLinesLoader:state.retailers.getCustomerInvoiceLinesLoader
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInvoiceLines: (params) =>
    dispatch(RetailersActions.getCustomerInvoiceLines(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.white,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("8%"),
  },
  backarrow: {
    color: Colors.darkRedPink,
    fontSize: 25,
    paddingLeft: 7,
    paddingTop: 15,
  },
  title: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    left: wp("25%"),
    top: hp("-3%"),
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    fontWeight: "bold",
    // left:wp("5%")
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    width: wp("50%"),
    fontWeight: "bold",
    left:wp("8%")
  },
  head: {
    color: Colors.darkRedPink,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
  },
});
