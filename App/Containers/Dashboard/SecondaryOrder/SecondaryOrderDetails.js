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
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";
import { HelperService } from "App/Services/Utils/HelperService";
import _ from "lodash";

class SecondaryOrderDetails extends Component {
  render() {
    let brandsNode = [];
    let record = this.props.navigation.state.params;
    let data = record.record;
    if (data && !_.isEmpty(data)) {
      data.orderLines.map((obj) => {
        brandsNode.push(obj);
      });
    }
    // console.log("bbbbbbbbb",brandsNode)
    let visibleNode = [];
    if (brandsNode.length) {
      visibleNode = (
        <FlatList
          data={brandsNode}
          keyExtractor={(item) => item.orderlineId}
          //    initialNumToRender={7}
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
              heading={"SOR-"+item.orderlineRecordId}
              Styletitle={Styles.head}
              content={[
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Item Code"}
                  value={item.zx_productcode?item.zx_productcode:"NA"}
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
                  label={"Order Bags"}
                  value={item.zx_noofbagspcs?item.zx_noofbagspcs:"0"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"UOM"}
                  value={item.zx_unitofmeasurecode?item.zx_unitofmeasurecode:"NA"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"UPP"}
                  value={item.zx_upp?item.zx_upp:"NA"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Order Qty"}
                  value={item.zx_qty?item.zx_qty:"0"}
                />,
                <DisplayCardStrip
                  stylettl={Styles.ttl}
                  styledetail={Styles.detail}
                  label={"Amount"}
                  value={item.zx_totalamount?item.zx_totalamount:"0"}
                />,
              ]}
            />
          )}
        />
      );
    } else {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }

  return (
    <View style={Styles.mainContainer}>
      <Card style={Styles.cardstyle}>
        <BackArrowButton style={Styles.backarrow} />
        <Text style={Styles.title}>
          {"Order Details"}
        </Text>
      </Card>

      {visibleNode}
    </View>
  );
}
}
export default SecondaryOrderDetails;
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
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    
    fontWeight: "bold",
  },
  head:{
    color: Colors.darkRedPink,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
  }
});
