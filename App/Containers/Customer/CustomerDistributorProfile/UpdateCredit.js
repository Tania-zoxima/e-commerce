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

class UpdateCredit extends Component {
  componentDidMount() {
    const { token } = this.props;

    this.props.getAllProductsClass({ token });
  }
  getDataNode() {
    let visibleNode = [];
    let record = this.props.navigation.state.params;
    const { paymentForm, loader, paymentUpdateForm } = this.props;

    if (record.data && record.data.length) {
      visibleNode = (
        <FlatList
        
          data={record.data}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          //   onRefresh={() => this.fetchCall()}
          refreshing={loader}
          keyExtractor={(item) => item.Id}
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
                value={
                  paymentUpdateForm[item.zx_itemclass]
                    ? paymentUpdateForm[item.zx_itemclass]: paymentUpdateForm[item.zx_itemclass]=="" ? ""
                    : item.zx_termdays
                }
                editable={true}
                // value={
                //     item.zx_itemclasscode == paymentForm.id
                //       ? paymentForm.term
                //       : ""
                //   }
                onChangeText={(value) =>
                  this.props.changeUpdatePaymentForm({
                    edited_field: item.zx_itemclass,
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
    }
    return visibleNode;
  }

  getForm() {
    const { paymentUpdateForm } = this.props;
    let record = this.props.navigation.state.params;
    // console.log("kkkkkkkkkkkkkkkkk",record)
    let list = Object.entries(paymentUpdateForm).map((obj) => {
      return {
        id: this.getDiscount(obj[0]),
        zx_termdays: obj[1],
      };
    });
    return list;
  }

  getDiscount(item) {
    const { cartItem, variableDiscount } = this.props;
    let record = this.props.navigation.state.params;
    let discount = "";
    if (
      record.data &&
      record.data.length 
    ) {
      record.data.map((obj) => {
            if (obj.zx_itemclass == item) {
              discount = obj.Id;
            }
          });
        }
        return discount;
  }

  render() {
    const { loading, paymentForm, token } = this.props;
    // console.log("listttttttt", this.getForm());
    let record = this.props.navigation.state.params;
    // console.log("checkingggggg", record);
    // console.log("checkinggggggeeeeeeeeeee",paymentForm[item.zx_it)
    return (
      <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Update "}
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
            marginTop: hp("13%"),
            left: wp("30%"),
          }}
        >
          <BlueButton
            style={{
              width: wp("29%"),
              height: hp("5%"),
              marginTop: hp("-3%"),
              left: wp("8%"),
              paddingBottom: 14,
              borderRadius: 3,
            }}
            title={"SAVE"}
            onPress={() => {
              this.props.updatePayment({ form: this.getForm(), token });
            }}
            // disabled={loading}
            // loading={loading}
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
  paymentUpdateForm: state.retailers.paymentUpdateForm,
  data: state.retailers.getPayment,
});

const mapDispatchToProps = (dispatch) => ({
  getPayment: (params) => dispatch(RetailersActions.getPayment(params)),
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
  createPaymentForm: (params) =>
    dispatch(RetailersActions.createPaymentForm(params)),
  changePaymentForm: (params) =>
    dispatch(RetailersActions.changePaymentForm(params)),
  changeUpdatePaymentForm: (params) =>
    dispatch(RetailersActions.changeUpdatePaymentForm(params)),
  updatePayment: (params) => dispatch(RetailersActions.updatePayment(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCredit);
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
    // height: hp("48%"),
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
