import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import CommonActions from "App/Stores/Common/Actions";
import BlueButton from "App/Components/BlueButton";
import Loading from "App/Components/Loading";
import VisitsActions from "App/Stores/Visits/Actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductActions from "App/Stores/Products/Actions";
import BookOrderCard from "../../Components/BookOrderCard/BookOrderCard";
import BookOrderCardStrip from "../../Components/BookOrderCard/BookOrderCardStrip";
import Styles from "./PlaceOrderStyle";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors, ApplicationStyles } from "App/Theme";
import { Badge, Picker } from "native-base";
import NavigationService from "App/Services/NavigationService";
import OrdersActions from "App/Stores/Orders/Actions";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import SearchBar from "App/Components/SearchBar";
import { HelperService } from "App/Services/Utils/HelperService";
import NoDataFound from "App/Components/NoDataFound";
import RetailersActions from "App/Stores/Retailers/Actions";
import _, { result } from "lodash";
import { Icon, Input, Button } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import Select from "App/Components/Select";
import TransportData from "../Orders/TransportData";

class PlacePrimaryOrder extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      toggle: false,
      text: "Select Transport",
      limit: 50,
      offset: 50,
    };
  }
  componentDidMount() {
    const {
      token,
      agentid,
      primaryOrderForm,
      retailersList,
      list,
      code,
      productClass,
      brands,
    } = this.props;

    let params1 = {
      token,
      zx_brandgroup: code.zx_brandgroup,
    };
    let params2 = {
      token,
    };
    if (list && _.isEmpty(list)) {
      this.state.timer = setTimeout(
        () => this.props.fetchRetailers({ token, agentid }),
        2000
      );
    }
    if (productClass && !productClass.length) {
      this.state.timer = setTimeout(
        () => this.props.getAllProductsClass(params2),
        5000
      );
    }
    if (brands && !brands.length) {
      this.state.timer = setTimeout(
        () => this.props.getAllProductsBrands(params1),
        4000
      );
    }
    this.props.showModal();
    this.props.clearPlaceOrderForm();
  }

  componentWillUnmount() {
    this.props.clearProductApi();
    this.props.clearOrderForm();
  }

  fetchCall() {
    const {
      token,
      agentid,
      primaryOrderForm,
      retailersList,
      logindata,
    } = this.props;
    let params = {
      token,
      state: this.filter()[0].zx_substate,
      // state : "306abc28-11e3-eb11-bacb-000d3ac9d1f5",
      brandgroup: logindata && logindata.zx_brandgroup,
      pid: "64c95549-ced7-eb11-bacb-000d3ac9bbac",
      itemclass: primaryOrderForm.itemclass,
      brand: primaryOrderForm.brand,
    };
    this.props.getAllProducts(params);
  }

  fetchMore() {
    const {
      token,
      agentid,
      primaryOrderForm,
      retailersList,
      logindata,
    } = this.props;
    let params = {
      token,
      state: this.filter()[0].zx_substate,
      // state : "306abc28-11e3-eb11-bacb-000d3ac9d1f5",
      brandgroup: logindata && logindata.zx_brandgroup,
      pid: "64c95549-ced7-eb11-bacb-000d3ac9bbac",
      offset: this.state.offset,
      limit: this.state.limit,
      show: false,
    };
    this.props.getAllProducts(params);
  }

  handleMoreLoad() {
    this.setState({ offset: this.state.offset + 50 }, this.fetchMore());
  }

  searchKeyValueInList(list) {
    const { primaryOrderForm } = this.props;
    let result = "";
    // if (primaryOrderForm.zx_ordertype2 == "Free Supplies") {
    //   result = list.filter((obj) => obj.zx_FreeSamples == "Yes");
    // }
    if (primaryOrderForm.zx_ordertype2 == "Complimentary") {
      result = list.filter((obj) => obj.zx_ComplimentaryProduct == "Yes");
    }
    if (primaryOrderForm.zx_ordertype2 == "Product Samples") {
      result = list.filter((obj) => obj.zx_Productsamples == "Yes");
    }
    if (primaryOrderForm.zx_ordertype2 == "Normal") {
      result = list.filter(
        (obj) =>
          obj.zx_ComplimentaryProduct !== "Yes" &&
          obj.zx_Productsamples !== "Yes"
      );
    }
    if (primaryOrderForm.zx_ordertype2 == "Project") {
      result = list.filter(
        (obj) =>
          obj.zx_ComplimentaryProduct !== "Yes" &&
          obj.zx_Productsamples !== "Yes"
      );
    }
    if (primaryOrderForm.zx_ordertype2 == "Retail Orders(Project)") {
      result = list.filter(
        (obj) =>
          obj.zx_ComplimentaryProduct !== "Yes" &&
          obj.zx_Productsamples !== "Yes"
      );
    }
    if (primaryOrderForm.zx_ordertype2 == "NPD") {
      result = list.filter(
        (obj) =>
          obj.zx_ComplimentaryProduct !== "Yes" &&
          obj.zx_Productsamples !== "Yes"
      );
    } else {
      result = list;
    }
    // console.log("lllllllllllll", result);
    return result;
  }

  filterResults(list) {
    // let BrandSearchFilters = this.props.searchFilters;
    let filteredList = HelperService.searchTextListFilter(
      list,
      // "zx_productcode",
      this.props.searchFilters["searchBy"],
      this.props.searchFilters["searchvalue"]
    );
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      "zx_brand",
      this.props.searchFilters["name"]
    );
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      "zx_itemclass",
      this.props.searchFilters["class"]
    );
    return filteredList;
  }

  getDistributor() {
    const { retailerdata, orderForm, list } = this.props;
    // console.log("listttt", list);
    let distributor = [];
    if (retailerdata && retailerdata.length) {
      retailerdata.map((obj) => {
        if (
          obj.zx_accounttype == "Primary Distributor" ||
          obj.zx_accounttype == "Distributor"
        ) {
          distributor.push({
            id: obj.id,
            name: obj.name + " " + `(${obj.accountnumber})`,
          });
        }
      });
    }
    return distributor;
  }

  getLocation() {
    const { location } = this.props;
    let loc = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.zx_location, name: obj.name }) {
          loc.push({
            id: obj.zx_location,
            name: obj.name,
          });
        }
      });
    }
    return loc;
  }
  // toggleModal(){
  //   this.setState({isModalVisible:!this.state.isModalVisible});
  // };
  getUom(item) {
    const { products } = this.props;
    let uom = [];
    if (products && products.length) {
      products.map((obj) => {
        if (
          obj.itemViseUom &&
          obj.itemViseUom.length &&
          obj.zx_productmasterid == item
        ) {
          obj.itemViseUom.map((obj1) => {
            if (obj1.zx_unitofmeasurecode !== "PCS") {
              uom.push({
                id: obj1.zx_unitofmeasurecode,
                name: obj1.zx_unitofmeasurecode,
              });
            }
          });
        }
      });
    }
    // console.log("aajaaaaaaa", uom);
    return uom;
  }
  getDefault(item) {
    let result = "";
    result = this.getUom(item).some((e) => e.name == "SP-1");
    return result;
  }

  getUomID(item) {
    // console.log("kkkkkkkkkkkkkkkgggg",item)
    const { products } = this.props;
    let uom = "";
    if (products && products.length) {
      products.map((obj) => {
        if (
          obj.itemViseUom &&
          obj.itemViseUom.length &&
          obj.zx_productmasterid == item.id
        ) {
          obj.itemViseUom.map((obj1) => {
            if (obj1.zx_unitofmeasurecode == item.name) {
              uom = obj1.zx_uom;
            }
          });
        }
      });
    }
    return uom;
  }

  getUomValue(item) {
    const { products, orderForm } = this.props;
    let uom1 = "";
    if (orderForm.uom == "SP-1") {
      if (products && products.length) {
        products.map((obj) => {
          if (
            obj.itemViseUom &&
            obj.itemViseUom.length &&
            obj.zx_productmasterid == item
          ) {
            obj.itemViseUom.map((obj1) => {
              if (obj1.zx_unitofmeasurecode == "SP-1") {
                uom1 = obj1.zx_qtyperuom;
              }
            });
          }
        });
      }
    }
    if (orderForm.uom == "SSP") {
      if (products && products.length) {
        products.map((obj) => {
          if (
            obj.itemViseUom &&
            obj.itemViseUom.length &&
            obj.zx_productmasterid == item
          ) {
            obj.itemViseUom.map((obj1) => {
              if (obj1.zx_unitofmeasurecode == "SSP") {
                uom1 = obj1.zx_qtyperuom;
              }
            });
          }
        });
      }
    }

    return uom1;
  }

  getUomValue1(item) {
    const { products, orderForm } = this.props;
    let uom1 = "";
    if (orderForm.uom == "") {
      if (this.getDefault(item)) {
        if (products && products.length) {
          products.map((obj) => {
            if (
              obj.itemViseUom &&
              obj.itemViseUom.length &&
              obj.zx_productmasterid == item
            ) {
              obj.itemViseUom.map((obj1) => {
                if (obj1.zx_unitofmeasurecode == "SP-1") {
                  uom1 = obj1.zx_qtyperuom;
                }
              });
            }
          });
        }
      } else {
        if (products && products.length) {
          products.map((obj) => {
            if (
              obj.itemViseUom &&
              obj.itemViseUom.length &&
              obj.zx_productmasterid == item
            ) {
              obj.itemViseUom.map((obj1) => {
                if (
                  obj1.zx_unitofmeasurecode ==
                  String(
                    this.getUom(item).length &&
                      this.getUom(item) &&
                      this.getUom(item)[0].name
                  )
                ) {
                  uom1 = obj1.zx_qtyperuom;
                }
              });
            }
          });
        }
      }
    }
    if (orderForm.uom !== "") {
      if (this.getDefault(item)) {
        if (products && products.length) {
          products.map((obj) => {
            if (
              obj.itemViseUom &&
              obj.itemViseUom.length &&
              obj.zx_productmasterid == item
            ) {
              obj.itemViseUom.map((obj1) => {
                if (obj1.zx_unitofmeasurecode == "SP-1") {
                  uom1 = obj1.zx_qtyperuom;
                }
              });
            }
          });
        }
      } else {
        if (products && products.length) {
          products.map((obj) => {
            if (
              obj.itemViseUom &&
              obj.itemViseUom.length &&
              obj.zx_productmasterid == item
            ) {
              obj.itemViseUom.map((obj1) => {
                if (
                  obj1.zx_unitofmeasurecode ==
                  String(
                    this.getUom(item).length &&
                      this.getUom(item) &&
                      this.getUom(item)[0].name
                  )
                ) {
                  uom1 = obj1.zx_qtyperuom;
                }
              });
            }
          });
        }
      }
    }
    return uom1;
  }

  getUnitPrice(item) {
    const { products } = this.props;
    let price = "";
    if (products && products.length) {
      products.map((obj) => {
        if (
          obj.PriceListunitofmeasurecode == "MTR" &&
          obj.itemViseUom &&
          obj.itemViseUom.length &&
          obj.zx_productmasterid == item &&
          obj.itemClassDescription == "PIPES"
        ) {
          obj.itemViseUom.map((obj1) => {
            price = obj1.zx_length * obj.zx_amount;
          });
        } else if (obj.zx_productmasterid == item) {
          price = obj.zx_amount;
        }
      });
    }
    return price;
  }

  getDiscount(item) {
    // console.log("itemmmmm", item);
    const { cartItem, variableDiscount } = this.props;
    // console.log("aajjaaaaa",item)
    let discount = "";
    if (variableDiscount && variableDiscount.length) {
      variableDiscount.map((obj) => {
        // console.log("jjjjjjjjj111", obj.productname == item);
        if (obj.productname == item) {
          discount = obj.discount;
        }
      });
    }
    // console.log("discounttt", discount);
    return discount;
  }

  getRegular() {
    const { products, regularOrders } = this.props;
    let result = products.filter((o1) =>
      regularOrders.some((o2) => o2.zx_productname === o1.zx_productname)
    );
    return result;
  }

  getLocationAccount(value) {
    const { location } = this.props;
    let account = "";
    if (location && location.length) {
      location.map((obj) => {
        if (obj.zx_location == value) {
          account = obj.zx_accounttype;
        }
      });
    }
    return account;
  }

  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {this.props.products &&
        this.props.products.length &&
        this.props.products[0].totalCount > 50 ? (
          this.props.count !== 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.handleMoreLoad()}
              //On Click of button calling getData function to load more data
              style={{
                padding: 10,
                backgroundColor: "#800000",
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15, textAlign: "center" }}
              >
                Load More
              </Text>
              {this.props.loading ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          ) : null
        ) : null}
      </View>
    );
  };
  getProductCard() {
    let visibleNode = [];
    const {
      products,
      loading,
      orderForm,
      token,
      agentid,
      primaryOrderForm,
      location,
      code,
    } = this.props;
    if (products && products.length) {
      let filteredSitesList = this.searchKeyValueInList(
        products.map((obj) => obj)
      );
      let searchedFilteredList = this.filterResults(filteredSitesList);
      if (searchedFilteredList) {
        visibleNode = (
          <FlatList
            style={{ marginTop: hp("1%"), height: hp("60%") }}
            contentContainerStyle={{ paddingBottom: 70, paddingTop: 10 }}
            data={searchedFilteredList}
            keyExtractor={(item) => item.zx_product}
            refreshing={loading}
            onRefresh={() => this.fetchCall()}
            // ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <BookOrderCard
                toogle={true}
                dark={false}
                code={code.zx_brandgroupcode}
                focus={item.zx_focusedproduct == "Yes" ? true : false}
                maketoorder={item.zx_maketoorder}
                showButton={this.getUom(item.zx_productmasterid).length}
                showSingleAddToCartAction={true}
                onValueChange={(value) => {
                  item.zx_productmasterid == orderForm.id
                    ? this.props.changeOrderForm({
                        edited_field: "toogle",
                        edited_value: value,
                        edited_field1: "id",
                        edited_value1: item.zx_productmasterid,
                      })
                    : this.props.clearPlaceOrderForm(),
                    this.props.changeOrderForm({
                      edited_field: "toogle",
                      edited_value: value,
                      edited_field1: "id",
                      edited_value1: item.zx_productmasterid,
                    });
                  this.props.changeOrderForm({
                    edited_field: "uom",
                    edited_field1: "id",
                    edited_value: this.getUom(item.zx_productmasterid).length
                      ? this.getDefault(item.zx_productmasterid)
                        ? "SP-1"
                        : this.getUom(item.zx_productmasterid)[0].name
                      : "",
                    edited_value1: item.zx_productmasterid,
                  });
                  this.getUom(item.zx_productmasterid);
                }}
                value={
                  item.zx_productmasterid == orderForm.id
                    ? orderForm.toogle
                    : false
                }
                style={{
                  backgroundColor: Colors.white,
                  borderColor: "#F66A676B",
                  borderWidth: 0.5,
                  width: wp("89%"),
                  // height: hp("32%"),
                }}
                onPressAddToCart={() => {
                  orderForm.qty &&
                  orderForm.id == item.zx_productmasterid &&
                  orderForm.location &&
                  orderForm.uom &&
                  orderForm.transportname !== "Select Transport"
                    ? this.onPressAddToCart({
                        item: item.zx_productname,
                        itemcode: item.zx_productcode,
                        upp: this.getUomValue(item.zx_productmasterid),
                        total_qty:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty,
                        total_price:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty *
                          this.getUnitPrice(item.zx_productmasterid),
                        itembrand: item.zx_brandgroup,
                        itemtarget: item.zx_targetgroup,
                        itemproductcode: item.zx_targetgroupcode,
                        itemtargetname: item.targetgroupDescription,
                        discount: item.zx_targetgroupcode,
                        zx_salesorderlineno: "abhi",
                        zx_itemcode: item.zx_itemclasscode,
                        zx_product: item.zx_product,
                        zx_productgroup: item.zx_productgroup,
                        zx_hsn: item.zx_hsncode,
                        zx_brand: item.zx_brand,
                        zx_itemclass: item.zx_itemclass,
                        zx_targetgroup: item.zx_targetgroup,
                        zx_itemcategory: item.zx_itemcategory,
                        zx_itemsubcategory: item.zx_itemsubcategory,
                        zx_maketoorder:
                          item.zx_maketoorder == true ? "Yes" : "No",
                        zx_focused: item.zx_focusedproduct,
                        zx_upp: item.zx_unitperparcel,
                        zx_unitprice: this.getUnitPrice(
                          item.zx_productmasterid
                        ),
                        zx_ordereduom: this.getUomID({
                          id: item.zx_productmasterid,
                          name: orderForm.uom,
                        }),
                        zx_noofbagspcs: orderForm.qty,
                        zx_qty:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty,
                        zx_location: orderForm.location,
                        // zx_totaldiscount:
                        //   (this.getDiscount(item.zx_targetgroupcode) / 100) *
                        //   this.getUomValue(item.zx_productmasterid) *
                        //   orderForm.qty *
                        //   this.getUnitPrice(item.zx_productmasterid),
                        zx_totalamount:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty *
                          this.getUnitPrice(item.zx_productmasterid),
                        zx_sgst: "12.3",
                        zx_igst: "12.4",
                        zx_cgst: "12.5",
                        zx_totaltax: "213.65",
                        zx_categorycode: item.zx_categorycode,
                        zx_productmasterid: item.zx_productmasterid,
                        zx_targetgroupcode: item.zx_targetgroupcode,
                      })
                    : HelperService.showToast({
                        message: "Please Select/Fill the values first",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
                isAddedInCart={this.isAddedInCart({
                  id: item.zx_productname,
                  location: orderForm.location,
                  uom: orderForm.uom,
                  transportname: orderForm.transportname,
                })}
                disableAddCart={this.isAddedInCart({
                  id: item.zx_productname,
                  location: orderForm.location,
                  uom: orderForm.uom,
                  transportname: orderForm.transportname,
                })}
                heading={item.zx_productcode}
                heading1={item.zx_productname}
                content={[
                  <BookOrderCardStrip
                    label={"UPP"}
                    value={
                      item.zx_productmasterid == orderForm.id
                        ? this.getUomValue(item.zx_productmasterid)
                        : this.getUomValue1(item.zx_productmasterid)
                    }
                  />,
                  <BookOrderCardStrip
                    label={"Unit Price"}
                    value={HelperService.FixedDecimalValue(
                      this.getUnitPrice(item.zx_productmasterid)
                    )}
                  />,
                  <BookOrderCardStrip label={"Pending QTY"} value={"20"} />,
                ]}
                children={[
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: wp("100%"),
                      marginTop: hp("1%"),
                    }}
                  >
                    <View
                      style={
                        this.getLocation().length &&
                        orderForm.id == item.zx_productmasterid
                          ? {
                              display: "flex",
                              flexDirection: "row",
                              width: wp("100%"),
                              marginTop: hp("1%"),
                              marginLeft: wp("2%"),
                            }
                          : {
                              display: "flex",
                              flexDirection: "row",
                              width: wp("100%"),
                              marginTop: hp("1%"),
                              marginLeft: wp("7%"),
                            }
                      }
                    >
                      <TextInput
                        style={{
                          height: hp(5),
                          backgroundColor: Colors.lightPink,
                          width: wp(20),
                          // right: wp("5%"),
                          left: wp("7%"),
                          marginTop: hp("0.5%"),
                          borderRadius: 5,
                          fontSize: 12,
                        }}
                        placeholder={"Enter bags"}
                        textAlign={"center"}
                        keyboardType="numeric"
                        value={
                          item.zx_productmasterid == orderForm.id
                            ? orderForm.qty
                            : ""
                        }
                        onChangeText={(value) => {
                          if (item.zx_productmasterid == orderForm.id) {
                            this.props.changeOrderForm({
                              edited_field: "qty",
                              edited_field1: "id",
                              edited_value: value,
                              edited_value1: item.zx_productmasterid,
                            });
                            this.props.getOrderLocation({
                              token,
                              distributor_id: primaryOrderForm.zx_orderfrom,
                              // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                              product_id: item.zx_productmasterid,
                              zx_productgroup: item.zx_productgroup,
                            });
                            this.props.changeOrderForm({
                              edited_field: "uom",
                              edited_field1: "id",
                              edited_value: this.getUom(item.zx_productmasterid)
                                .length
                                ? this.getDefault(item.zx_productmasterid)
                                  ? "SP-1"
                                  : this.getUom(item.zx_productmasterid)[0].name
                                : "",
                              edited_value1: item.zx_productmasterid,
                            });
                            this.getUom(item.zx_productmasterid);
                          } else {
                            this.props.clearPlaceOrderForm();
                            this.props.changeOrderForm({
                              edited_field: "qty",
                              edited_field1: "id",
                              edited_value: value,
                              edited_value1: item.zx_productmasterid,
                            });
                            this.props.getOrderLocation({
                              token,
                              distributor_id: primaryOrderForm.zx_orderfrom,
                              // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                              product_id: item.zx_productmasterid,
                              zx_productgroup: item.zx_productgroup,
                            });
                            this.props.changeOrderForm({
                              edited_field: "uom",
                              edited_field1: "id",
                              edited_value: this.getUom(item.zx_productmasterid)
                                .length
                                ? this.getDefault(item.zx_productmasterid)
                                  ? "SP-1"
                                  : this.getUom(item.zx_productmasterid)[0].name
                                : "",
                              edited_value1: item.zx_productmasterid,
                            });
                            this.getUom(item.zx_productmasterid);
                          }
                        }}
                        // onSubmitEditing={() => {
                        //   this.props.getOrderLocation({
                        //     token,
                        //     distributor_id: primaryOrderForm.zx_orderfrom,
                        //     // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                        //     product_id: item.zx_productmasterid,
                        //   });
                        // }}
                      />
                      {this.getLocation().length &&
                      orderForm.id == item.zx_productmasterid ? (
                        <View
                          style={{ width: wp("25%"), marginLeft: wp("13%") }}
                        >
                          <SearchableDropdown
                            dataSource={this.getLocation()}
                            placeHolderText={"Select Location"}
                            selectedValue={orderForm.location}
                            key={orderForm.location + _.uniqueId()}
                            // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                            onChange={(value) => {
                              if (orderForm.id == item.zx_productmasterid) {
                                this.props.changeOrderForm({
                                  edited_field: "location",
                                  edited_field1: "id",
                                  edited_value: value,
                                  edited_value1: item.zx_productmasterid,
                                });
                                this.props.changeOrderForm({
                                  edited_field: "account",
                                  edited_field1: "id",
                                  edited_value: this.getLocationAccount(value),
                                  edited_value1: item.zx_productmasterid,
                                });
                              } else {
                                this.props.clearPlaceOrderForm();
                                this.props.changeOrderForm({
                                  edited_field: "location",
                                  edited_field1: "id",
                                  edited_value: value,
                                  edited_value1: item.zx_productmasterid,
                                });
                                this.props.changeOrderForm({
                                  edited_field: "account",
                                  edited_field1: "id",
                                  edited_value: this.getLocationAccount(value),
                                  edited_value1: item.zx_productmasterid,
                                });
                              }
                            }}
                            placeholder={"Type or Select State"}
                            invalid={false}
                            labelStyles={{
                              color: Colors.darkRedPink,
                              fontFamily: ApplicationStyles.textFont,
                              textAlign: "center",
                              //   width: "99%",
                              //  padding:5,
                              fontSize: 10,
                              flexDirection: "row",
                            }}
                            customPickerStyles={{
                              borderRadius: 5,
                              width: "65%",
                              height: hp("4.5%"),
                              elevation: 5,
                              // marginBottom: hp('5%'),
                              // paddingHorizontal: 0,
                              // marginRight:wp("3%"),
                              marginLeft: wp("15%"),
                              backgroundColor: Colors.lightPink,
                              borderWidth: 0,
                            }}
                            // key={form.id}
                          />
                        </View>
                      ) : (
                        []
                      )}

                      <SearchableDropdown
                        dataSource={this.getUom(item.zx_productmasterid)}
                        placeHolderText={"Select UOM"}
                        selectedValue={
                          item.zx_productmasterid == orderForm.id
                            ? orderForm.uom
                            : this.getUom(item.zx_productmasterid).length
                            ? this.getDefault(item.zx_productmasterid)
                              ? "SP-1"
                              : this.getUom(item.zx_productmasterid)[0].name
                            : ""
                        }
                        // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                        onChange={(value) => {
                          item.zx_productmasterid == orderForm.id
                            ? this.props.changeOrderForm({
                                edited_field: "uom",
                                edited_field1: "id",
                                edited_value: value,
                                edited_value1: item.zx_productmasterid,
                              })
                            : this.props.clearPlaceOrderForm();
                          this.props.changeOrderForm({
                            edited_field: "uom",
                            edited_field1: "id",
                            edited_value: value,
                            edited_value1: item.zx_productmasterid,
                          });
                        }}
                        placeholder={"Type or Select State"}
                        invalid={false}
                        disablePicker={
                          orderForm.account == "Depot" ? false : true
                        }
                        key={orderForm.uom + _.uniqueId()}
                        labelStyles={{
                          color: Colors.darkRedPink,
                          fontFamily: ApplicationStyles.textFont,
                          textAlign: "center",
                          //   width: "99%",
                          // padding:5,
                          fontSize: 10,
                          flexDirection: "row",
                        }}
                        customPickerStyles={{
                          borderRadius: 5,
                          width: "55%",
                          height: hp("4.5%"),
                          elevation: 5,
                          // marginBottom: hp('5%'),
                          // paddingHorizontal: 0,
                          marginLeft: wp("15%"),
                          backgroundColor: Colors.lightPink,
                          borderWidth: 0,
                        }}
                        // key={form.id}
                      />
                    </View>

                    <TouchableOpacity
                      style={{
                        left: wp("15%"),
                        top: hp("1%"),
                        backgroundColor: Colors.lightPink,
                        borderRadius: 5,
                        width: "70%",
                        height: hp("4.5%"),
                      }}
                      onPress={() => this.props.showTransportModal()}
                    >
                      <Text
                        style={{
                          textAlignVertical: "center",
                          top: hp("1%"),
                          alignSelf: "center",
                        }}
                      >
                        {item.zx_productmasterid == orderForm.id
                          ? orderForm.transportname
                          : "Select Transport"}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: wp("100%"),

                        justifyContent: "space-evenly",
                      }}
                    >
                      <BookOrderCardStrip
                        label={"Total Qty:"}
                        value={
                          item.zx_productmasterid == orderForm.id
                            ? this.getUomValue(item.zx_productmasterid) *
                              orderForm.qty
                            : "0"
                        }
                      />
                      <BookOrderCardStrip
                        label={"Total Price:"}
                        value={
                          item.zx_productmasterid == orderForm.id
                            ? HelperService.FixedDecimalValue(
                                this.getUomValue(item.zx_productmasterid) *
                                  orderForm.qty *
                                  this.getUnitPrice(item.zx_productmasterid)
                              )
                            : "0"
                        }
                      />
                    </View>
                  </View>,
                ]}
              />
            )}
          />
        );
      } else {
        visibleNode = <NoDataFound text={"No Data  Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!products || (products && !products.length && !loading)) {
      visibleNode = (
        <Text
          style={{
            justifyContent: "center",
            fontSize: 15,
            textAlign: "center",
            width: wp("40%"),
            alignSelf: "center",
            top: hp("3%"),
            color: "#C0C0C0",
          }}
        >
          Please Select Brand And Item Class And Press on Search
        </Text>
        // <NoDataFound text={"Please Select Brand And Item Class And Press on Search"}>
        //   <GenericIcon
        //     name={"refresh"}
        //     show={true}
        //     onPress={() => this.fetchCall()}
        //     style={{
        //       color: Colors.button,
        //       fontSize: 25,
        //       alignSelf: "center",
        //       padding: 10,
        //     }}
        //   />
        // </NoDataFound>
      );
    }

    return visibleNode;
  }

  getRegularProductCard() {
    let visibleNode = [];
    const {
      products,
      loading,
      orderForm,
      token,
      agentid,
      primaryOrderForm,
      location,
      code,
    } = this.props;
    if (products && products.length) {
      let filteredSitesList = this.getRegular();
      // console.log("filterrrr", filteredSitesList);
      let searchedFilteredList = this.filterResults(filteredSitesList);
      if (searchedFilteredList) {
        visibleNode = (
          <FlatList
            style={{ top: "1%", height: hp("60%") }}
            contentContainerStyle={{ paddingBottom: 70, paddingTop: 10 }}
            data={searchedFilteredList}
            keyExtractor={(item) => item.zx_product}
            refreshing={loading}
            onRefresh={() => this.fetchCall()}
            renderItem={({ item }) => (
              <BookOrderCard
                toogle={true}
                dark={false}
                code={code.zx_brandgroupcode}
                focus={item.zx_focusedproduct == "Yes" ? true : false}
                maketoorder={item.zx_maketoorder}
                showButton={this.getUom(item.zx_productmasterid).length}
                showSingleAddToCartAction={true}
                onValueChange={(value) => {
                  item.zx_productmasterid == orderForm.id
                    ? this.props.changeOrderForm({
                        edited_field: "toogle",
                        edited_value: value,
                        edited_field1: "id",
                        edited_value1: item.zx_productmasterid,
                      })
                    : this.props.clearPlaceOrderForm();
                  this.props.changeOrderForm({
                    edited_field: "toogle",
                    edited_value: value,
                    edited_field1: "id",
                    edited_value1: item.zx_productmasterid,
                  });
                  this.props.changeOrderForm({
                    edited_field: "uom",
                    edited_field1: "id",
                    edited_value: this.getUom(item.zx_productmasterid).length
                      ? this.getDefault(item.zx_productmasterid)
                        ? "SP-1"
                        : this.getUom(item.zx_productmasterid)[0].name
                      : "",
                    edited_value1: item.zx_productmasterid,
                  });
                  this.getUom(item.zx_productmasterid);
                }}
                value={
                  item.zx_productmasterid == orderForm.id
                    ? orderForm.toogle
                    : false
                }
                style={{
                  backgroundColor: Colors.white,
                  borderColor: "#F66A676B",
                  borderWidth: 0.5,
                  width: wp("89%"),
                  // height: hp("32%"),
                }}
                onPressAddToCart={() => {
                  orderForm.qty &&
                  orderForm.id == item.zx_productmasterid &&
                  orderForm.location &&
                  orderForm.uom
                    ? this.onPressAddToCart({
                        item: item.zx_productname,
                        itemcode: item.zx_productcode,
                        upp: this.getUomValue(item.zx_productmasterid),
                        total_qty:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty,
                        total_price:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty *
                          this.getUnitPrice(item.zx_productmasterid),
                        itembrand: item.zx_brandgroup,
                        itemtarget: item.zx_targetgroup,
                        itemproductcode: item.zx_targetgroupcode,
                        itemtargetname: item.targetgroupDescription,
                        discount: item.zx_targetgroupcode,
                        zx_itemcode: item.zx_itemclasscode,
                        zx_product: item.zx_product,
                        zx_productgroup: item.zx_productgroup,
                        zx_hsn: item.zx_hsncode,
                        zx_brand: item.zx_brand,
                        zx_itemclass: item.zx_itemclass,
                        zx_targetgroup: item.zx_targetgroup,
                        zx_itemcategory: item.zx_itemcategory,
                        zx_itemsubcategory: item.zx_itemsubcategory,
                        zx_maketoorder:
                          item.zx_maketoorder == true ? "Yes" : "No",
                        zx_focused: item.zx_focusedproduct,
                        zx_upp: item.zx_unitperparcel,
                        zx_unitprice: this.getUnitPrice(
                          item.zx_productmasterid
                        ),
                        zx_ordereduom: this.getUomID({
                          id: item.zx_productmasterid,
                          name: orderForm.uom,
                        }),
                        zx_noofbagspcs: orderForm.qty,
                        zx_qty:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty,
                        zx_location: orderForm.location,
                        // zx_totaldiscount:
                        //   (this.getDiscount(item.zx_targetgroupcode) / 100) *
                        //   this.getUomValue(item.zx_productmasterid) *
                        //   orderForm.qty *
                        //   this.getUnitPrice(item.zx_productmasterid),
                        zx_totalamount:
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty *
                          this.getUnitPrice(item.zx_productmasterid),
                        zx_sgst: "12.3",
                        zx_igst: "12.4",
                        zx_cgst: "12.5",
                        zx_totaltax: "213.65",
                        zx_categorycode: item.zx_categorycode,
                        zx_productmasterid: item.zx_productmasterid,
                        zx_targetgroupcode: item.zx_targetgroupcode,
                      })
                    : HelperService.showToast({
                        message: "Please Select/Fill the values first",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
                isAddedInCart={this.isAddedInCart({
                  id: item.zx_productname,
                  location: orderForm.location,
                  uom: orderForm.uom,
                  transportname: orderForm.transportname,
                })}
                disableAddCart={this.isAddedInCart({
                  id: item.zx_productname,
                  location: orderForm.location,
                  uom: orderForm.uom,
                  transportname: orderForm.transportname,
                })}
                heading={item.zx_productcode}
                heading1={item.zx_productname}
                content={[
                  <BookOrderCardStrip
                    label={"UPP"}
                    value={this.getUomValue(item.zx_productmasterid)}
                  />,
                  <BookOrderCardStrip
                    label={"Unit Price"}
                    value={this.getUnitPrice(item.zx_productmasterid)}
                  />,
                  <BookOrderCardStrip label={"Pending QTY"} value={"20"} />,
                ]}
                children={[
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: wp("100%"),
                      marginTop: hp("1%"),
                    }}
                  >
                    <View
                      style={
                        this.getLocation().length &&
                        orderForm.id == item.zx_productmasterid
                          ? {
                              display: "flex",
                              flexDirection: "row",
                              width: wp("100%"),
                              marginTop: hp("1%"),
                              marginLeft: wp("2%"),
                            }
                          : {
                              display: "flex",
                              flexDirection: "row",
                              width: wp("100%"),
                              marginTop: hp("1%"),
                              marginLeft: wp("7%"),
                            }
                      }
                    >
                      <TextInput
                        style={{
                          height: hp(5),
                          backgroundColor: Colors.lightPink,
                          width: wp(20),
                          // right: wp("5%"),
                          left: wp("7%"),
                          marginTop: hp("0.5%"),
                          borderRadius: 5,
                          fontSize: 12,
                        }}
                        placeholder={"Enter bags"}
                        textAlign={"center"}
                        keyboardType="numeric"
                        value={
                          item.zx_productmasterid == orderForm.id
                            ? orderForm.qty
                            : ""
                        }
                        onChangeText={(value) => {
                          if (item.zx_productmasterid == orderForm.id) {
                            this.props.changeOrderForm({
                              edited_field: "qty",
                              edited_field1: "id",
                              edited_value: value,
                              edited_value1: item.zx_productmasterid,
                            });
                            this.props.getOrderLocation({
                              token,
                              distributor_id: primaryOrderForm.zx_orderfrom,
                              // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                              product_id: item.zx_productmasterid,
                              zx_productgroup: item.zx_productgroup,
                            });
                            this.props.changeOrderForm({
                              edited_field: "uom",
                              edited_field1: "id",
                              edited_value: this.getUom(item.zx_productmasterid)
                                .length
                                ? this.getDefault(item.zx_productmasterid)
                                  ? "SP-1"
                                  : this.getUom(item.zx_productmasterid)[0].name
                                : "",
                              edited_value1: item.zx_productmasterid,
                            });
                            this.getUom(item.zx_productmasterid);
                          } else {
                            this.props.clearPlaceOrderForm();
                            this.props.changeOrderForm({
                              edited_field: "qty",
                              edited_field1: "id",
                              edited_value: value,
                              edited_value1: item.zx_productmasterid,
                            });
                            this.props.getOrderLocation({
                              token,
                              distributor_id: primaryOrderForm.zx_orderfrom,
                              // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                              product_id: item.zx_productmasterid,
                              zx_productgroup: item.zx_productgroup,
                            });
                            this.props.changeOrderForm({
                              edited_field: "uom",
                              edited_field1: "id",
                              edited_value: this.getUom(item.zx_productmasterid)
                                .length
                                ? this.getDefault(item.zx_productmasterid)
                                  ? "SP-1"
                                  : this.getUom(item.zx_productmasterid)[0].name
                                : "",
                              edited_value1: item.zx_productmasterid,
                            });
                            this.getUom(item.zx_productmasterid);
                          }
                        }}
                        // onSubmitEditing={() => {
                        //   this.props.getOrderLocation({
                        //     token,
                        //     distributor_id: primaryOrderForm.zx_orderfrom,
                        //     // distributor_id: "46b6c804-4605-ec11-b6e6-000d3ac9f36b",
                        //     product_id: item.zx_productmasterid,
                        //     zx_productgroup: item.zx_productgroup,
                        //   });
                        // }}
                      />
                      {this.getLocation().length &&
                      orderForm.id == item.zx_productmasterid ? (
                        <View
                          style={{ width: wp("25%"), marginLeft: wp("13%") }}
                        >
                          <SearchableDropdown
                            dataSource={this.getLocation()}
                            placeHolderText={"Select Location"}
                            selectedValue={orderForm.location}
                            key={orderForm.location + _.uniqueId()}
                            // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                            onChange={(value) => {
                              if (orderForm.id == item.zx_productmasterid) {
                                this.props.changeOrderForm({
                                  edited_field: "location",
                                  edited_field1: "id",
                                  edited_value: value,
                                  edited_value1: item.zx_productmasterid,
                                });
                                this.props.changeOrderForm({
                                  edited_field: "account",
                                  edited_field1: "id",
                                  edited_value: this.getLocationAccount(value),
                                  edited_value1: item.zx_productmasterid,
                                });
                              } else {
                                this.props.clearPlaceOrderForm();
                                this.props.changeOrderForm({
                                  edited_field: "location",
                                  edited_field1: "id",
                                  edited_value: value,
                                  edited_value1: item.zx_productmasterid,
                                });
                                this.props.changeOrderForm({
                                  edited_field: "account",
                                  edited_field1: "id",
                                  edited_value: this.getLocationAccount(value),
                                  edited_value1: item.zx_productmasterid,
                                });
                              }
                            }}
                            placeholder={"Type or Select State"}
                            invalid={false}
                            labelStyles={{
                              color: Colors.darkRedPink,
                              fontFamily: ApplicationStyles.textFont,
                              textAlign: "center",
                              //   width: "99%",
                              //  padding:5,
                              fontSize: 10,
                              flexDirection: "row",
                            }}
                            customPickerStyles={{
                              borderRadius: 5,
                              width: "65%",
                              height: hp("4.5%"),
                              elevation: 5,
                              // marginBottom: hp('5%'),
                              // paddingHorizontal: 0,
                              // marginRight:wp("3%"),
                              marginLeft: wp("15%"),
                              backgroundColor: Colors.lightPink,
                              borderWidth: 0,
                            }}
                            // key={form.id}
                          />
                        </View>
                      ) : (
                        []
                      )}

                      <SearchableDropdown
                        dataSource={this.getUom(item.zx_productmasterid)}
                        placeHolderText={"Select UOM"}
                        selectedValue={
                          item.zx_productmasterid == orderForm.id
                            ? orderForm.uom
                            : this.getUom(item.zx_productmasterid).length
                            ? this.getDefault(item.zx_productmasterid)
                              ? "SP-1"
                              : this.getUom(item.zx_productmasterid)[0].name
                            : ""
                        }
                        // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                        onChange={(value) => {
                          item.zx_productmasterid == orderForm.id
                            ? this.props.changeOrderForm({
                                edited_field: "uom",
                                edited_field1: "id",
                                edited_value: value,
                                edited_value1: item.zx_productmasterid,
                              })
                            : this.props.clearPlaceOrderForm();
                          this.props.changeOrderForm({
                            edited_field: "uom",
                            edited_field1: "id",
                            edited_value: value,
                            edited_value1: item.zx_productmasterid,
                          });
                        }}
                        placeholder={"Type or Select State"}
                        invalid={false}
                        disablePicker={
                          orderForm.account == "Depot" ? false : true
                        }
                        key={orderForm.uom + _.uniqueId()}
                        labelStyles={{
                          color: Colors.darkRedPink,
                          fontFamily: ApplicationStyles.textFont,
                          textAlign: "center",
                          //   width: "99%",
                          // padding:5,
                          fontSize: 10,
                          flexDirection: "row",
                        }}
                        customPickerStyles={{
                          borderRadius: 5,
                          width: "55%",
                          height: hp("4.5%"),
                          elevation: 5,
                          // marginBottom: hp('5%'),
                          // paddingHorizontal: 0,
                          marginLeft: wp("15%"),
                          backgroundColor: Colors.lightPink,
                          borderWidth: 0,
                        }}
                        // key={form.id}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        left: wp("15%"),
                        top: hp("1%"),
                        backgroundColor: Colors.lightPink,
                        borderRadius: 5,
                        width: "70%",
                        height: hp("4.5%"),
                      }}
                      onPress={() => this.props.showTransportModal()}
                    >
                      <Text
                        style={{
                          textAlignVertical: "center",
                          top: hp("1%"),
                          alignSelf: "center",
                        }}
                      >
                        {item.zx_productmasterid == orderForm.id
                          ? orderForm.transportname
                          : "Select Transport"}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: wp("100%"),

                        justifyContent: "space-evenly",
                      }}
                    >
                      <BookOrderCardStrip
                        label={"Total Qty:"}
                        value={
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty
                        }
                      />
                      <BookOrderCardStrip
                        label={"Total Price:"}
                        value={
                          this.getUomValue(item.zx_productmasterid) *
                          orderForm.qty *
                          this.getUnitPrice(item.zx_productmasterid)
                        }
                      />
                    </View>
                  </View>,
                ]}
              />
            )}
          />
        );
      } else {
        visibleNode = <NoDataFound text={"Not  Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!products || (products && !products.length && !loading)) {
      visibleNode = (
        <Text
          style={{
            justifyContent: "center",
            fontSize: 15,
            textAlign: "center",
            width: wp("40%"),
            alignSelf: "center",
            top: hp("3%"),
            color: "#C0C0C0",
          }}
        >
          Please Select Brand And Item Class And Press on Search
        </Text>
      );
    }

    return visibleNode;
  }

  getbrand() {
    const { brands } = this.props;
    let brandname = [];
    if (brands && brands.length) {
      brands.map((obj) => {
        if ({ id: obj.zx_brandsid, name: obj.zx_brandcode }) {
          brandname.push({ id: obj.zx_brandsid, name: obj.zx_brandcode });
        }
      });
    }
    return brandname;
  }
  getclass() {
    const { productClass } = this.props;
    let classname = [];
    if (productClass && productClass.length) {
      productClass.map((obj) => {
        if ({ id: obj.zx_itemclassid, name: obj.zx_itemclasscode }) {
          classname.push({
            id: obj.zx_itemclassid,
            name: obj.zx_itemclasscode,
          });
        }
      });
    }
    return classname;
  }

  onPressAddToCart(params) {
    const {
      orderForm,
      token,
      cartItem,
      retailerItems,
      variableDiscount,
      agentid,
      primaryOrderForm,
    } = this.props;

    this.props.clearOrderLocation();
    // this.props.clearTransport();

    let data = {
      name: params.item,
      code: params.itemcode,
      quantity: orderForm.qty,
      location: HelperService.getNameFromSFID(
        this.getLocation(),
        orderForm.location
      ),
      uom: orderForm.uom,
      upp: params.upp,
      total_qty: params.total_qty,
      total_price: params.total_price,
      brandgroup: params.itembrand,
      targetgroup: params.itemtarget,
      discount: params.discount,
      product_id: params.zx_product,
      zx_unitprice: params.zx_unitprice,
      zx_itemclass: params.zx_itemclass,
    };

    // let data1 = [
    //   {
    //     zx_itemcode: params.itemcode,
    //     zx_product: params.zx_product,
    //     zx_hsn: params.zx_hsn,
    //     zx_brand: params.zx_brand,
    //     zx_itemclass: params.zx_itemclass,
    //     zx_targetgroup: params.zx_targetgroup,
    //     zx_itemcategory: params.zx_itemcategory,
    //     zx_itemsubcategory: params.zx_itemsubcategory,
    //     zx_productgroup: params.zx_productgroup,
    //     zx_maketoorder: params.zx_maketoorder == true ? "Yes" : "No",
    //     zx_focused: params.zx_focused,
    //     zx_upp: params.zx_upp,
    //     zx_unitprice: params.zx_unitprice,
    //     zx_ordereduom: params.zx_ordereduom,
    //     zx_noofbagspcs: orderForm.qty,
    //     zx_qty: params.zx_qty,
    //     zx_location: orderForm.location,
    //     zx_totaldiscount:params.zx_totaldiscount,
    //     zx_totalamount: params.zx_totalamount,
    //     zx_team: agentid,
    //     zx_priority: orderForm.toogle ? "YES" : "NO",
    //     zx_brandgroup: params.itembrand,
    //     zx_transportermobileno: orderForm.transportmobile,
    //     zx_transportercode: orderForm.transportcode,
    //     zx_transporterphoneno: orderForm.transportphone,
    //     zx_transportdetails: orderForm.transportid,
    //     zx_transportername: orderForm.transportname,
    //     zx_transportercontactperson: orderForm.transportcontactperson,
    //   },
    // ];

    // data = HelperService.decorateWithLocalId(data);
    // this.props.addOrderToCart(data);
    // this.props.addBodyToCart(data1);
    // this.filter();
    // this.props.clearPlaceOrderForm();
    if (cartItem && cartItem.length) {
      cartItem.map((obj) => {
        if (obj.zx_itemclass == params.zx_itemclass) {
          this.props.getVariableDiscount({
            token,
            form: {
              zx_brandgroup: params.itembrand,
              zx_state: this.filter()[0].zx_state,
              // zx_state: "306abc28-11e3-eb11-bacb-000d3ac9d1f5",
              zx_targetgroup: params.itemtarget,
              zx_saletype: this.filter()[0].zx_saletype,
              // zx_saletype: "Retail",
              zx_product: params.itemproductcode,
              zx_productname: params.itemtargetname,
              zx_customer: primaryOrderForm.zx_orderfrom,
              zx_customercode: this.filter()[0].accountnumber,
            },
          });
          this.props.addOrderToCart(data);
          this.state.timer = setTimeout(
            () =>
              this.props.addBodyToCart([
                {
                  zx_itemcode: params.itemcode,
                  zx_product: params.zx_product,
                  zx_hsn: params.zx_hsn,
                  zx_brand: params.zx_brand,
                  zx_itemclass: params.zx_itemclass,
                  zx_targetgroup: params.zx_targetgroup,
                  zx_itemcategory: params.zx_itemcategory,
                  zx_itemsubcategory: params.zx_itemsubcategory,
                  zx_productgroup: params.zx_productgroup,
                  zx_maketoorder: params.zx_maketoorder == true ? "Yes" : "No",
                  zx_focused: params.zx_focused,
                  zx_upp: params.zx_upp,
                  zx_unitprice: params.zx_unitprice,
                  zx_ordereduom: params.zx_ordereduom,
                  zx_noofbagspcs: orderForm.qty,
                  zx_qty: params.zx_qty,
                  zx_location: orderForm.location,
                  zx_totaldiscount:
                    (this.getDiscount(params.zx_targetgroupcode) / 100) *
                    this.getUomValue(params.zx_productmasterid) *
                    orderForm.qty *
                    this.getUnitPrice(params.zx_productmasterid),
                  zx_totalamount: params.zx_totalamount,
                  zx_team: agentid,
                  zx_priority: orderForm.toogle ? "YES" : "NO",
                  zx_brandgroup: params.itembrand,
                  zx_transportermobileno: orderForm.transportmobile,
                  zx_transportercode: orderForm.transportcode,
                  zx_transporterphoneno: orderForm.transportphone,
                  zx_transportdetails: orderForm.transportid,
                  zx_transportername: orderForm.transportname,
                  zx_transportercontactperson: orderForm.transportcontactperson,
                  zx_TotalAmountwithoutdiscount:
                    params.zx_totalamount -
                    (this.getDiscount(params.zx_targetgroupcode) / 100) *
                      this.getUomValue(params.zx_productmasterid) *
                      orderForm.qty *
                      this.getUnitPrice(params.zx_productmasterid),
                  zx_ordertype1: "425120000",
                },
              ]),
            500
          );
          HelperService.showToast({
            message: "Add to Cart Successfully",
          });
          this.props.clearPlaceOrderForm();
        } else {
          HelperService.showToast({
            message: "Products of Same Item Class Can Be added only",
          });
        }
      });
    } else {
      this.props.getVariableDiscount({
        token,
        form: {
          zx_brandgroup: params.itembrand,
          zx_state: this.filter()[0].zx_state,
          // zx_state: "306abc28-11e3-eb11-bacb-000d3ac9d1f5",
          zx_targetgroup: params.itemtarget,
          zx_saletype: this.filter()[0].zx_saletype,
          // zx_saletype: "Retail",
          zx_product: params.itemproductcode,
          zx_productname: params.itemtargetname,
          zx_customer: primaryOrderForm.zx_orderfrom,
          zx_customercode: this.filter()[0].accountnumber,
        },
      });
      this.props.addOrderToCart(data);
      HelperService.showToast({
        message: "Add to Cart Successfully",
      });
      this.state.timer = setTimeout(
        () =>
          this.props.addBodyToCart([
            {
              zx_itemcode: params.itemcode,
              zx_product: params.zx_product,
              zx_hsn: params.zx_hsn,
              zx_brand: params.zx_brand,
              zx_itemclass: params.zx_itemclass,
              zx_targetgroup: params.zx_targetgroup,
              zx_itemcategory: params.zx_itemcategory,
              zx_itemsubcategory: params.zx_itemsubcategory,
              zx_productgroup: params.zx_productgroup,
              zx_maketoorder: params.zx_maketoorder == true ? "Yes" : "No",
              zx_focused: params.zx_focused,
              zx_upp: params.zx_upp,
              zx_unitprice: params.zx_unitprice,
              zx_ordereduom: params.zx_ordereduom,
              zx_noofbagspcs: orderForm.qty,
              zx_qty: params.zx_qty,
              zx_location: orderForm.location,
              zx_totaldiscount:
                (this.getDiscount(params.zx_targetgroupcode) / 100) *
                this.getUomValue(params.zx_productmasterid) *
                orderForm.qty *
                this.getUnitPrice(params.zx_productmasterid),
              zx_totalamount: params.zx_totalamount,
              zx_team: agentid,
              zx_priority: orderForm.toogle ? "YES" : "NO",
              zx_brandgroup: params.itembrand,
              zx_transportermobileno: orderForm.transportmobile,
              zx_transportercode: orderForm.transportcode,
              zx_transporterphoneno: orderForm.transportphone,
              zx_transportdetails: orderForm.transportid,
              zx_transportername: orderForm.transportname,
              zx_transportercontactperson: orderForm.transportcontactperson,
              zx_TotalAmountwithoutdiscount:
                params.zx_totalamount -
                (this.getDiscount(params.zx_targetgroupcode) / 100) *
                  this.getUomValue(params.zx_productmasterid) *
                  orderForm.qty *
                  this.getUnitPrice(params.zx_productmasterid),
              zx_ordertype1: "425120000",
            },
          ]),
        500
      );
      this.props.clearPlaceOrderForm();
    }
    // zx_totaldiscount:
    //                       (this.getDiscount(item.zx_targetgroupcode) / 100) *
    //                       this.getUomValue(item.zx_productmasterid) *
    //                       orderForm.qty *
    //                       this.getUnitPrice(item.zx_productmasterid),
  }

  isAddedInCart(item) {
    // console.log(item)
    const { cartItem, form } = this.props;
    let isPresent = false;

    cartItem.map((obj) => {
      if (
        obj.name == item.id &&
        obj.location ==
          HelperService.getNameFromSFID(this.getLocation(), item.location) &&
        obj.uom == item.uom
      ) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  filter() {
    const { retailerdata, primaryOrderForm, getRetailerItems } = this.props;

    let filterList = HelperService.searchTextListFilter(
      retailerdata,
      "id",
      primaryOrderForm.zx_orderfrom
    );

    return filterList;
  }

  checkCondition() {
    if (
      this.filter()[0].zx_activationstatus == "Deactivate" ||
      this.filter()[0].zx_customerstatus == "Hold"
    ) {
      let msg = "";
      let msg1 = "";
      if (this.filter()[0].zx_activationstatus == "Deactivate") {
        msg = "Activate Status is not active..";
      }
      if (this.filter()[0].zx_customerstatus == "Hold") {
        msg1 = "Customer is on hold..";
      }
      HelperService.showToast({
        message: "Order Cannot be Placed.." + " " + msg + " " + " " + msg1,
        duration: 1000,
        buttonText: "",
      });
    } else {
      this.props.closeModal();
    }
  }

  render() {
    const {
      products,
      brands,
      productClass,
      changeProductBrand,
      changeProductClass,
      cartItem,
      searchFilters,
      changeBrandSearchFilters,
      token,
      variableDiscount,
      retailerItems,
      logindata,
      primaryOrderForm,
      regularOrders,
      code,
    } = this.props;
    let changingValue = searchFilters["name"];
    let onChangeCallback = (value) =>
      changeBrandSearchFilters({ edited_field: "name", edited_value: value });
    let changingValue1 = searchFilters["class"];
    let onChangeCallback1 = (value) =>
      changeBrandSearchFilters({ edited_field: "class", edited_value: value });
    this.props.orderForm.transportname = this.props.selectedTransport
      .zx_transportername
      ? this.props.selectedTransport.zx_transportername
      : "Select Transport";
    this.props.orderForm.transportmobile = this.props.selectedTransport.zx_mobile;
    this.props.orderForm.transportphone = this.props.selectedTransport.zx_phone;
    this.props.orderForm.transportcode = this.props.selectedTransport.zx_transportcode;
    this.props.orderForm.transportid = this.props.selectedTransport.Id;
    this.props.orderForm.transportcontactperson = this.props.selectedTransport.zx_contactperson;
    let result = [];
    {
      this.state.toggle
        ? (result = products.filter((o1) =>
            regularOrders.some((o2) => o2.zx_productname === o1.zx_productname)
          ))
        : (result = products);
    }
    // console.log("checkkkkkingg", result);
    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <View
            style={{
              paddingTop: hp("0%"),
              paddingBottom: hp("1%"),
              right: "5%",
            }}
          >
            <BackArrowButton style={Styles.backarrow} />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <Text style={{ ...Styles.titleText }}>{"Primary Orders"}</Text>
            <View style={{ top: hp("-4%"), left: wp("55%") }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  style={{
                    width: wp("5%"),
                    height: hp("2.5%"),
                    left: wp("2%"),
                    // marginRight: wp("20%"),
                    // marginTop: hp("-0.5%"),
                  }}
                  source={require("../../Assets/Images/star.png")}
                />
                <Text
                  style={{ marginLeft: wp("5%"), color: "white", fontSize: 10 }}
                >
                  Focused Product
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: hp("0.5%"),
                }}
              >
                <Image
                  style={{
                    width: wp("5%"),
                    height: hp("2.5%"),
                    left: wp("2%"),
                    // marginRight: wp("20%"),
                    // marginTop: hp("-0.5%"),
                  }}
                  source={require("../../Assets/Images/m.png")}
                />
                <Text
                  style={{ marginLeft: wp("5%"), color: "white", fontSize: 10 }}
                >
                  Make To Order
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Switch
                  style={{
                    marginLeft: wp("0%"),
                    alignItems: "flex-end",
                    marginTop: wp("-1%"),
                  }}
                  trackColor={{ false: "", true: Colors.black }}
                  thumbColor="white"
                  ios_backgroundColor="gray"
                  onValueChange={(value) => {
                    this.setState({ toggle: value }),
                      this.props.fetchRegularOrders({
                        token,
                        id: primaryOrderForm.zx_orderfrom,
                      });
                  }}
                  value={this.state.toggle}
                />
                <Text
                  style={{ color: "white", fontSize: 10, right: wp("2.5%") }}
                >
                  Regular Product
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", top: hp("-3%") }}>
            <SearchBar
              placeholder={`Search by`}
              onInputChange={(text) =>
                changeBrandSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                changeBrandSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                changeBrandSearchFilters({
                  edited_field: "searchvalue",
                  edited_value: "",
                })
              }
              value={searchFilters["searchvalue"]}
              ContainerStyles={Styles.searchContainer}
            />

            <Select
              style={Styles.selectPickerStyle}
              placeholder={"Search By"}
              list={searchFilters.searchByOptions}
              selected={searchFilters["searchBy"]}
              onChange={(value) =>
                changeBrandSearchFilters({
                  edited_field: "searchBy",
                  edited_value: value,
                })
              }
            />
          </View>
          {/* <SearchBar
            placeholder={"Search product by item code or name"}
            ContainerStyles={Styles.searchContainer}
          /> */}
        </Card>
        <View
          style={{
            marginTop: hp("20%"),
            height: 70,
            width: "100%",
            // marginLeft: wp("5%"),
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              width: wp("30%"),
              height: hp("10%"),
              left: wp("4%"),
            }}
          >
            <SearchableDropdown
              dataSource={this.getclass()}
              placeHolderText={"Select Class"}
              selectedValue={this.props.primaryOrderForm.itemclass}
              // selectedValue={data.sfid == form.id ? form.colour__c : ''}
              onChange={(value) =>
                this.props.changePrimaryOrderForm({
                  edited_field: "itemclass",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select State"}
              invalid={false}
              labelStyles={
                code.zx_brandgroupcode == "1"
                  ? {
                      color: Colors.darkRedPink,
                      fontFamily: ApplicationStyles.textFont,
                      textAlign: "center",
                      //   width: "99%",
                      //  padding:5,
                      fontSize: 13,
                      flexDirection: "row",
                    }
                  : {
                      color: Colors.bluebackground,
                      fontFamily: ApplicationStyles.textFont,
                      textAlign: "center",
                      //   width: "99%",
                      //  padding:5,
                      fontSize: 13,
                      flexDirection: "row",
                    }
              }
              customPickerStyles={
                code.zx_brandgroupcode == "1"
                  ? {
                      borderRadius: 5,
                      width: "80%",
                      height: hp("4.5%"),
                      elevation: 5,
                      // marginBottom: hp('5%'),
                      paddingHorizontal: 0,
                      marginLeft: wp("8%"),
                      backgroundColor: Colors.lightPink,
                      borderWidth: 0,
                    }
                  : {
                      borderRadius: 5,
                      width: "80%",
                      height: hp("4.5%"),
                      elevation: 5,
                      // marginBottom: hp('5%'),
                      paddingHorizontal: 0,
                      marginLeft: wp("8%"),
                      backgroundColor: Colors.lightbluebackground,
                      borderWidth: 0,
                    }
              }
              // key={form.id}
            />
          </View>
          <View
            style={{
              width: wp("30%"),
              height: hp("10%"),
              left: wp("3.5%"),
            }}
          >
            <SearchableDropdown
              dataSource={this.getbrand()}
              placeHolderText={"Select Brand"}
              selectedValue={this.props.primaryOrderForm.brand}
              // selectedValue={data.sfid == form.id ? form.colour__c : ''}
              onChange={(value) =>
                this.props.changePrimaryOrderForm({
                  edited_field: "brand",
                  edited_value: value,
                })
              }
              placeholder={"Type or Select State"}
              invalid={false}
              labelStyles={
                code.zx_brandgroupcode == "1"
                  ? {
                      color: Colors.darkRedPink,
                      fontFamily: ApplicationStyles.textFont,
                      textAlign: "center",
                      //   width: "99%",
                      //  padding:5,
                      fontSize: 12,
                      flexDirection: "row",
                    }
                  : {
                      color: Colors.bluebackground,
                      fontFamily: ApplicationStyles.textFont,
                      textAlign: "center",
                      //   width: "99%",
                      //  padding:5,
                      fontSize: 11,
                      flexDirection: "row",
                    }
              }
              customPickerStyles={
                code.zx_brandgroupcode == "1"
                  ? {
                      borderRadius: 5,
                      width: "80%",
                      height: hp("4.5%"),
                      elevation: 5,
                      // marginBottom: hp('5%'),
                      paddingHorizontal: 0,
                      marginLeft: wp("10%"),
                      backgroundColor: Colors.lightPink,
                      borderWidth: 0,
                    }
                  : {
                      borderRadius: 5,
                      width: "80%",
                      height: hp("4.5%"),
                      elevation: 5,
                      // marginBottom: hp('5%'),
                      paddingHorizontal: 0,
                      marginLeft: wp("10%"),
                      backgroundColor: Colors.lightbluebackground,
                      borderWidth: 0,
                    }
              }
              // key={form.id}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.primaryOrderForm.itemclass &&
              this.props.primaryOrderForm.brand
                ? this.fetchCall()
                : HelperService.showToast({
                    message: "Select Item Class and Brand",
                    duration: 1000,
                    buttonText: "",
                  });
            }}
            // onPress={() => NavigationService.navigate("OrderLayout")}
          >
            <GenericIcon
              name={"search"}
              style={
                code.zx_brandgroupcode == "1"
                  ? {
                      fontSize: 30,
                      left:wp("2%"),
                      // marginRight: wp("1%"),
                      marginTop: hp("2%"),
                      color: Colors.darkRedPink,
                    }
                  : {
                      fontSize: 30,
                      left:wp("2%"),
                      // marginRight: wp("1%"),
                      marginTop: hp("2%"),
                      color: Colors.bluebackground,
                    }
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              cartItem.length
                ? (NavigationService.navigate("VariableDiscount"),
                  this.props.clearPlaceOrderForm())
                : // this.props.getVariableDiscount({
                  //  token,
                  //  "zx_brandgroup": cartItem.brandgroup,
                  //  "zx_state": retailerItems.zx_state,
                  //  "zx_targetgroup": cartItem.targetgroup,
                  //  "zx_saletype": "Retail",
                  //  "zx_product": item.zx_productname,

                  // })
                  // this.props.clearPlaceOrderForm())
                  HelperService.showToast({
                    message: "Select Order to add in cart",
                    duration: 1000,
                    buttonText: "",
                  });
            }}
            // onPress={() => NavigationService.navigate("OrderLayout")}
          >
            <GenericIcon
              name={"shopping-cart"}
              style={
                code.zx_brandgroupcode == "1"
                  ? {
                      fontSize: 30,
                      marginRight: wp("8%"),
                      marginTop: hp("2%"),
                      color: Colors.darkRedPink,
                    }
                  : {
                      fontSize: 30,
                      marginRight: wp("8%"),
                      marginTop: hp("2%"),
                      color: Colors.bluebackground,
                    }
              }
            />
            {/* <Image
              style={{
                width: wp("7%"),
                height: hp("4%"),
                marginRight: wp("20%"),
                marginTop: hp("2%"),
              }}
              source={require("../../Assets/Images/cart.png")}
            /> */}
          </TouchableOpacity>
          <Badge
            style={{
              backgroundColor: Colors.white,
              padding: 0,
              borderWidth: 2,
              borderColor: Colors.black,
              minWidth: wp("5%"),
              minHeight: wp("5%"),
              position: "absolute",
              borderRadius: wp("10%"),
              top: -hp("0%"),
              left: hp("45%"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Text style={Style.countBadgeText}>{cart.products ? cart.products.length : 0}</Text> */}
            <Text
              style={{
                color: Colors.black,
                fontFamily: ApplicationStyles.textMsgFont,
                fontSize: wp("4%"),
              }}
            >
              {cartItem ? cartItem.length : 0}
            </Text>
          </Badge>
        </View>
        <View>
          {this.state.toggle
            ? this.getRegularProductCard()
            : this.getProductCard()}
        </View>
        <Modal visible={this.props.showmodal} transparent={true}>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.8)",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "#fff",
                padding: 20,
                alignItems: "center",
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate("GetPrimaryOrder"),
                    this.props.closeModal();
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: wp("70%"),
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <Text
                style={
                  code.zx_brandgroupcode == "1"
                    ? {
                        textAlign: "center",
                        fontSize: wp("6.5%"),
                        fontWeight: "bold",
                        fontFamily: ApplicationStyles.textMediumFont,
                        color: Colors.darkRedPink,
                        marginBottom: hp("2%"),
                      }
                    : {
                        textAlign: "center",
                        fontSize: wp("6.5%"),
                        fontWeight: "bold",
                        fontFamily: ApplicationStyles.textMediumFont,
                        color: Colors.bluebackground,
                        marginBottom: hp("2%"),
                      }
                }
              >
                {"Place Order"}
              </Text>

              <View
                style={{
                  width: "85%",
                  // borderWidth: 1.2,
                  // borderColor: Colors.grey,
                  // borderRadius: 30,
                  marginVertical: 30,
                  height: hp("30%"),
                }}
              >
                <SearchableDropdown
                  dataSource={[
                    { id: "Normal", name: "Normal" },
                    { id: "Complimentary", name: "Complimentary" },
                    { id: "Product Samples", name: "Product Samples" },
                    { id: "Project", name: "Project" },
                    { id: "NPD", name: "NPD" },
                    { id: "Industrial", name: "Industrial" },
                    {
                      id: "Retail Orders(Project)",
                      name: "Retail Orders(Project)",
                    },
                  ]}
                  placeHolderText={"Select Order Type"}
                  selectedValue={this.props.primaryOrderForm.zx_ordertype2}
                  // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                  onChange={(value) =>
                    this.props.changePrimaryOrderForm({
                      edited_field: "zx_ordertype2",
                      edited_value: value,
                    })
                  }
                  placeholder={"Type or Select State"}
                  invalid={false}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  label={"Order Type"}
                  headerStyle={{
                    fontFamily: ApplicationStyles.textMsgFont,
                    color: Colors.black,
                    fontSize: wp("4.4%"),
                    top: hp("-1%"),
                    // marginBottom: wp('3%'),
                    width: "106%",
                    textAlign: "left",
                    marginLeft: wp("2%"),
                  }}
                  customPickerStyles={{
                    // borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("20%"),
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                  }}
                  // key={form.id}
                />
                <SearchableDropdown
                  dataSource={this.getDistributor()}
                  placeHolderText={"Select Distributor"}
                  selectedValue={this.props.primaryOrderForm.zx_orderfrom}
                  // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                  onChange={(value) =>
                    this.props.changePrimaryOrderForm({
                      edited_field: "zx_orderfrom",
                      edited_value: value,
                    })
                  }
                  placeholder={"Type or Select State"}
                  invalid={false}
                  label={"Distributor"}
                  headerStyle={{
                    fontFamily: ApplicationStyles.textMsgFont,
                    color: Colors.black,
                    fontSize: wp("4.4%"),
                    // marginBottom: wp('3%'),
                    width: "106%",
                    textAlign: "left",
                    marginLeft: wp("2%"),
                    top: hp("-1%"),
                  }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  customPickerStyles={{
                    // borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("20%"),
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                  }}
                  // key={form.id}
                />
                {/* <SearchableDropdown
                  dataSource={this.getclass()}
                  placeHolderText={"Select Item Class"}
                  selectedValue={this.props.primaryOrderForm.itemclass}
                  // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                  onChange={(value) =>
                    this.props.changePrimaryOrderForm({
                      edited_field: "itemclass",
                      edited_value: value,
                    })
                  }
                  placeholder={"Type or Select Item Class"}
                  invalid={false}
                  label={"Item Class"}
                  headerStyle={{
                    fontFamily: ApplicationStyles.textMsgFont,
                    color: Colors.black,
                    fontSize: wp("4.4%"),
                    // marginBottom: wp('3%'),
                    width: "106%",
                    textAlign: "left",
                    marginLeft: wp("2%"),
                    top: hp("-1%"),
                  }}
                  labelStyles={{
                    color: Colors.black,
                    fontFamily: ApplicationStyles.textFont,
                    textAlign: "center",
                    //   width: "99%",
                    //  padding:5,
                    fontSize: 13,
                    flexDirection: "row",
                  }}
                  customPickerStyles={{
                    // borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("20%"),
                    backgroundColor: Colors.white,
                    borderWidth: 1,
                  }}
                  // key={form.id}
                /> */}
              </View>
              <TouchableOpacity
                style={
                  code.zx_brandgroupcode == "1"
                    ? {
                        width: "40%",
                        // marginTop: hp("2%"),
                        // marginBottom: hp("2%"),
                        height: hp("4.8"),
                        backgroundColor: Colors.darkRedPink,
                      }
                    : {
                        width: "40%",
                        // marginTop: hp("2%"),
                        // marginBottom: hp("2%"),
                        height: hp("4.8"),
                        backgroundColor: Colors.bluebackground,
                      }
                }
                onPress={() => {
                  this.props.primaryOrderForm.zx_ordertype2 &&
                  this.props.primaryOrderForm.zx_orderfrom
                    ? this.checkCondition()
                    : HelperService.showToast({
                        message: "Please Select Order Type and Distributor",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.white,
                    textAlignVertical: "center",
                    fontSize: 25,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={this.props.showtransportmodal} transparent={true}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <TouchableOpacity onPress={() => this.props.closeTransportModal()}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: hp("42%"),
                  fontWeight: "bold",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
            <TransportData
              setModalVisible={() => this.props.closeTransportModal()}
            />
          </View>
        </Modal>
        {this.props.loader == true || this.props.variableLoader == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 210,
              height: hp("5%"),
              width: "100%",
            }}
          >
            <Loading />
          </View>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    products: state.products.ProductList && state.products.ProductList,
    brands: state.products.BrandList && state.products.BrandList,
    productClass: state.products.ItemList && state.products.ItemList,
    cartItem: state.products.cart.cartItem,
    showmodal: state.orders.showModal,
    showtransportmodal: state.orders.showtransportmodal,
    searchFilters: state.orders.searchFilters,
    loading: state.products.getAllProductsLoader,
    list: state.retailers.retailersList,
    retailerdata: state.retailers.retailersList.list,
    primaryOrderForm: state.orders.primaryOrderForm,
    variableDiscount: state.orders.variableDiscount,
    variableLoader: state.orders.getVariableDiscountLoader,
    selectedTransport: state.orders.selectedTransport,
    orderForm: state.orders.placeOrderForm,
    location: state.orders.orderLocation,
    loader: state.orders.orderLocationLoader,
    retailerItems: state.orders.retailerItems,
    logindata: state.user.user_details,
    regularOrders: state.orders.regularOrders,
    code: state.user.user_details,
    count: state.products.count.count,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (params) => dispatch(ProductActions.getAllProducts(params)),
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
  changeProductBrand: (params) =>
    dispatch(ProductActions.changeProductBrand(params)),
  changeProductClass: (params) =>
    dispatch(ProductActions.changeProductClass(params)),
  addOrderToCart: (params) => dispatch(ProductActions.addOrderToCart(params)),
  addBodyToCart: (params) => dispatch(ProductActions.addBodyToCart(params)),
  showModal: () => dispatch(OrdersActions.showModal()),
  closeModal: () => dispatch(OrdersActions.closeModal()),
  showTransportModal: () => dispatch(OrdersActions.showTransportModal()),
  closeTransportModal: () => dispatch(OrdersActions.closeTransportModal()),
  changeBrandSearchFilters: (params) =>
    dispatch(OrdersActions.changeBrandSearchFilters(params)),
  changePrimaryOrderForm: (params) =>
    dispatch(OrdersActions.changePrimaryOrderForm(params)),
  getVariableDiscount: (params) =>
    dispatch(OrdersActions.getVariableDiscount(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  changeOrderForm: (params) => dispatch(OrdersActions.changeOrderForm(params)),
  clearPlaceOrderForm: (params) =>
    dispatch(OrdersActions.clearPlaceOrderForm(params)),
  clearOrderLocation: (params) =>
    dispatch(OrdersActions.clearOrderLocation(params)),
  clearTransport: (params) => dispatch(OrdersActions.clearTransport(params)),
  getOrderLocation: (params) =>
    dispatch(OrdersActions.getOrderLocation(params)),
  fetchRegularOrders: (params) =>
    dispatch(OrdersActions.fetchRegularOrders(params)),
  clearSizeForm: (params) => dispatch(ProductActions.clearSizeForm(params)),
  clearProductApi: (params) => dispatch(ProductActions.clearProductApi(params)),
  clearOrderForm: (params) => dispatch(OrdersActions.clearOrderForm(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PlacePrimaryOrder);
