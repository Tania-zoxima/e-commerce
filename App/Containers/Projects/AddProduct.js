import { Container, Content, Text, Tabs, Tab } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import React, { Component } from "react";
import UpdateProject from "./UpdateProject";
import { connect } from "react-redux";
import { Card } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackArrowButton from "App/Components/BackArrowButton";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "../../Components/GenericDisplayCard/GenericDisplayCardStrip";
import GenericDisplayCard from "../../Components/GenericDisplayCard/GenericDisplayCard";
import NoDataFound from "App/Components/NoDataFound";
import ProjectActions from "App/Stores/Project/Actions";
import WhiteButton from "App/Components/WhiteButton";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "App/Services/Utils/HelperService";

export class AddProduct extends Component {
  componentDidMount() {
    const { data } = this.props;
    if (data && !data.length) {
      this.fetchCall();
    }
  }

  fetchCall() {
    const { project, token, code } = this.props;
    this.props.getProductSold({ brandgroup: code.zx_brandgroup, token });
  }

  onPressAddToCart(params) {
    // console.log("jjjjjjjjjj", params);
    const {
      orderForm,
      token,
      cartItem,
      retailerItems,
      variableDiscount,
      agentid,
      secondaryOrderForm,
    } = this.props;

    let data = {
      zx_productname: params.zx_productname,
      zx_productcode: params.zx_productcode,
      id: params.id,
    };
    this.props.addProductToCart(data);
    HelperService.showToast({
      message: "Add to Cart Successfully",
    });
  }

  isAddedInCart(item) {
    const { cartItem, form } = this.props;

    let isPresent = false;

    cartItem.map((obj) => {
      if (
        obj.zx_productname == item.zx_productname &&
        obj.zx_productcode == item.zx_productcode
      ) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  getProduct() {
    const { cartItem } = this.props;
    let arr = [];
    cartItem.map((obj) => arr.push(obj.id));
    // console.log("arrr",arr)
    return arr;
  }

  render() {
    const { data, loading, code, project, token } = this.props;
    let form = {
      zx_project: project.Id,
      zx_product: this.getProduct(),
    };
    // console.log("kkkkkkk",this.getProduct())
    let visibleNode = [];
    if (data && data.length) {
      visibleNode = (
        <FlatList
          data={data}
          //   style={{ height: hp("77%") }}
          contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
          renderItem={({ item }) => (
            <GenericDisplayCard
              dark={false}
              style={{ width: "88%", elevation: 0 }}
              key={item.id}
              showSingleAddToCartAction={true}
              onPressAddToCart={() =>
                this.onPressAddToCart({
                  zx_productname: item.zx_productname,
                  zx_productcode: item.zx_productcode,
                  id: item.id,
                })
              }
              isAddedInCart={this.isAddedInCart({
                zx_productname: item.zx_productname,
                zx_productcode: item.zx_productcode,
              })}
              disableAddCart={this.isAddedInCart({
                zx_productname: item.zx_productname,
                zx_productcode: item.zx_productcode,
              })}
              //   heading={item.product_name}
              content={[
                // <GenericIcon
                //   name={"close-circle"}
                //   style={{ fontSize: 30, color: Colors.button }}
                //   show={true}
                // />,
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
    return (
      <Container>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <View>
            <BackArrowButton style={Styles.backarrow} />
          </View>
          <Text style={{ ...Styles.titleText, marginLeft: wp("22%") }}>
            {"Projects"}
            {/* <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Retailer"}
            </Text> */}
          </Text>
        </Card>
        <View>
          <WhiteButton
            style={{
              backgroundColor:
                code.zx_brandgroupcode == "1"
                  ? Colors.darkRedPink
                  : Colors.bluebackground,
              height: hp("5%"),
              borderRadius: 5,
              width: wp("30%"),
              left: wp("62%"),
              top: hp("1.5%"),
            }}
            onPress={() =>
              this.props.createProjectProduct({ form: form, token })
            }
            // onPress={() => this.updateLocation()}
            title={"SUBMIT"}
            textStyle={{ color: Colors.white, fontSize: 14 }}
          ></WhiteButton>
          {visibleNode}
        </View>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    code: state.user.user_details,
    project: state.project.projectForm,
    loading: state.project.getProductSoldLoader,
    data: state.project.getProductSold,
    cartItem: state.project.cart.cartItem,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductSold: (params) => dispatch(ProjectActions.getProductSold(params)),
  addProductToCart: (params) =>
    dispatch(ProjectActions.addProductToCart(params)),
  createProjectProduct: (params) =>
    dispatch(ProjectActions.createProjectProduct(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Segoe UI",
    color: Colors.black,
    top: hp("2.5%"),
    fontSize: 13,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.background,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  cardBlue: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 5,

    paddingLeft: 10,
    paddingRight: 10,
    elevation: 10,
    backgroundColor: Colors.bluebackground,
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    width: wp("100%"),
    right: "0.5%",
    top: "0%",
  },
  titleText: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 26,
    fontWeight: "bold",
    left: "12%",
    bottom: hp("3%"),
  },
  textClr: {
    color: Colors.headerClr,
  },
  backarrow: {
    marginRight: wp("90%"),
    fontSize: 25,
    color: Colors.white,
  },
});
