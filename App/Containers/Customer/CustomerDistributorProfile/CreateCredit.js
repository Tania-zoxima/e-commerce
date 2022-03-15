import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RetailersActions from "App/Stores/Retailers/Actions";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";
import { connect } from "react-redux";
import ProductActions from "App/Stores/Products/Actions";
import BlueButton from "../../../Components/BlueButton/BlueButton";

class CreateCredit extends Component {
  componentDidMount() {
    const { token } = this.props;

    this.props.getAllProductsClass({ token });
  }

  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_showforpaymentterms == "Yes");
    // console.log(result);
    return result;
  }

  getDataNode() {
    let visibleNode = [];

    const { details, loader, paymentForm } = this.props;

    if (details && details.length) {
      let filteredSitesList = this.searchKeyValueInList(
        details.map((obj) => obj)
      );
      visibleNode = (
        <FlatList
          data={filteredSitesList}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          //   onRefresh={() => this.fetchCall()}
          refreshing={loader}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#C1E8E8",
                flexDirection: "row",
                justifyContent: "space-around",
                width: wp(80),
                left: wp(4),
                height: hp(5),
                margin: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlignVertical: "center",
                  left: wp("-3%"),
                  color: Colors.red,
                  width: wp("28%"),
                }}
              >
                {item.zx_itemclasscode}
              </Text>
              <TextInput
                style={{ height: 40 }}
                placeholder="Enter here!"
                textAlign="center"
                value={paymentForm.zx_termdays}
                // value={
                //     item.zx_itemclasscode == paymentForm.id
                //       ? paymentForm.term
                //       : ""
                //   }
                onChangeText={(value) =>
                  this.props.changePaymentForm({
                    edited_field: item.zx_itemclassid,
                    //   edited_field1: "id",
                    edited_value: value,
                    //   edited_value1: item.zx_itemclasscode,
                  })
                }
              />
              {/* <Text
                    style={{
                      left: wp("-12%"),
                      top: hp(1.5),
                      alignContent: "flex-end",
                    }}
                  >
                    {item.zx_termdays}
                  </Text> */}
            </View>
          )}
        />
      );
    } else if (loader) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !loader)) {
      visibleNode = (
        <NoDataFound text={"No Data found."}>
          <Icon
            name={"refresh"}
            // onPress={() => this.fetchCall()}
            style={{
              color: Colors.button,
              fontSize: 25,
              alignSelf: "center",
              padding: "2%",
            }}
            type={"FontAwesome"}
          />
        </NoDataFound>
      );
    } else {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return visibleNode;
  }

  getForm() {
    const { paymentForm } = this.props;
    let record = this.props.navigation.state.params;
    let list = Object.entries(paymentForm).map((obj) => {
      return {
        zx_itemclass: obj[0],
        zx_termdays: obj[1],
        zx_customer: record.id,
      };
    });
    return list;
  }
  render() {
    const { loading, paymentForm, token } = this.props;
    // console.log("listttttttt", this.getForm());
    let forms = {
      zx_itemclass: "",
      zx_termdays: paymentForm.zx_termdays,
      zx_customer: "7e9ac804-4605-ec11-b6e6-000d3ac9f36b",
    };

    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Create "}
            <Text style={Styles.titleText}>{"Payment Terms"}</Text>
          </Text>
        </Card>

        <View style={Styles.container2}>
          <Text style={Styles.title1}>Credit Term Period</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: Colors.darkRedPink,
              width: wp(80),
              left: wp(4),
              height: hp(6),
              marginBottom: hp(1),
              margin: 4,
              marginTop: hp(5),
            }}
          >
            <Text
              style={{
                color: Colors.white,
                textAlignVertical: "center",
                fontSize: 13,
                borderRightWidth: 1,
                width: wp(28),
                borderColor: Colors.white,
              }}
            >
              ITEM CLASS
            </Text>
            <Text
              style={{
                color: Colors.white,
                textAlignVertical: "center",
                fontSize: 13,

                borderColor: Colors.white,
              }}
            >
              PAYMENT TERMS DAYS
            </Text>
          </View>
          <View>
            {this.getDataNode()}
          </View>
        </View>
        <View
          style={{
            height: hp("5%"),
            marginTop: hp("1%"),
            left: wp("27%"),
          }}
        >
          <BlueButton
            style={{
              width: wp("29%"),
              height: hp("5%"),
              marginTop: hp("0%"),
              left: wp("10%"),
              paddingBottom: 14,
              borderRadius: 3,
            }}
            title={"SAVE"}
            onPress={() => {
              this.props.createPaymentForm({ forms: this.getForm(), token });
            }}
            disabled={loading}
            loading={loading}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.products.ItemList && state.products.ItemList,
  loader: state.retailers.getPaymentLoader,
  paymentForm: state.retailers.paymentForm,
  loading: state.retailers.paymentFormLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
  createPaymentForm: (params) =>
    dispatch(RetailersActions.createPaymentForm(params)),
  changePaymentForm: (params) =>
    dispatch(RetailersActions.changePaymentForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCredit);
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("15%"),
    top: hp("-1%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  container2: {
    borderWidth: 0.8,
    borderColor: Colors.lightGrey,
    // height: hp("45%"),
    marginTop: hp("3%"),
    width: wp("90%"),
    left: wp("5%"),
    elevation: 2,
  },
  title1: {
    fontSize: wp(5),
    fontWeight: "bold",
    left: wp("5%"),
    top: hp("1.5%"),
  },
});
