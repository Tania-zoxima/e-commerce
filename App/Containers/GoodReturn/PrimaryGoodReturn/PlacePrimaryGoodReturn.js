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
import ReturnCard from "../../../Components/ReturnCard/ReturnCard";
import ReturnCardStrip from "../../../Components/ReturnCard/ReturnCardStrip";
import Styles from "./PrimaryStyle";
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

class PlacePrimaryGoodReturn extends Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      limit: 50,
      offset: 0,
    };
  }
  componentDidMount() {
    const {
      token,
      agentid,
      primaryOrderForm,
      retailersList,
      list,
      code
    } = this.props;

    let params1 = {
      token,
      zx_brandgroup:code.zx_brandgroup
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
    this.state.timer = setTimeout(
      () => this.props.getAllProductsClass(params2),
      5000
    );
    this.state.timer = setTimeout(
      () => this.props.getAllProductsBrands(params1),
      4000
    );
    this.state.timer = setTimeout(
      () => this.props.getAllLocation(params1),
      6000
    );
    this.props.showModal();
    this.props.clearPrimaryPlaceGoodForm();
  }

  fetchCall() {
    const { token, agentid, primaryGoodForm } = this.props;
    let params = {
      token,
      id: primaryGoodForm.zx_orderfrom,
      offset: 0,
      limit: 50,
      show: true,
    };
    this.props.getCustomerInvoiceLines(params);
    this.setState(() => ({
      offset: 0,
    }));
  }

  fetchMore() {
    const { token, agentid, primaryGoodForm } = this.props;
    let params = {
      token,
      token,
      id: primaryGoodForm.zx_orderfrom,
      offset: this.state.offset,
      limit: this.state.limit,
      show: false,
    };
    this.props.getCustomerInvoiceLines(params);
  }

  handleMoreLoad() {
    this.setState({ offset: this.state.offset + 50 }, this.fetchMore());
  }

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['name'])

    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_invoicelineid",
      searchFilters["type"]
    );
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      "zx_brand",
      searchFilters["name"]
    );
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      "zx_itemclass",
      searchFilters["class"]
    );
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      "zx_invoicefrom",
      searchFilters["location"]
    );
    filteredList = HelperService.sortDesc(filteredList, "zx_recordid");
    // console.log("jjjjjjjjjjjjj", filteredList);
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
            name: obj.name+ " " + `(${obj.accountnumber})`,
          });
        }
      });
    }
    return distributor;
  }
  getLocation() {
    const { location } = this.props;
    let pincode = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.accountId, name: obj.name }) {
          pincode.push({ id: obj.accountId, name: obj.name });
        }
      });
    }
    return pincode;
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
        {this.props.count !== 0 ? (
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
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              Load More
            </Text>
            {this.props.loading ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
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
      placeGoodForm,
      location,
      code,
      details,
    } = this.props;
    if (details && details.length) {
      let searchedFilteredList = this.filterResults(details);
      // console.log("ffffffff", searchedFilteredList);
      if (searchedFilteredList.length) {
        visibleNode = (
          <FlatList
            style={{ height: hp("58%") }}
            data={searchedFilteredList}
            contentContainerStyle={{
              paddingBottom: hp("5%"),
              paddingTop: 10,
            }}
            keyExtractor={(item) => item.id}
            // onRefresh={() => this.fetchCall()}
            // ListFooterComponent={this.renderFooter}
            // refreshing={loading}
            renderItem={({ item }) => (
              <ReturnCard
                dark={false}
                code={code.zx_brandgroupcode}
                showSingleAddToCartAction={true}
                showButton={true}
                style={{
                  backgroundColor: Colors.white,
                  borderColor: "#F66A676B",
                  borderWidth: 0.5,
                  width: wp("89%"),
                  // height: hp("32%"),
                }}
                // date={
                //   item.zx_invoicedate
                //     ? HelperService.getCurrentDate1(item.zx_invoicedate)
                //     : "0"
                // }
                // month={
                //   item.zx_invoicedate
                //     ? HelperService.getMonthMappingName(
                //         HelperService.getCurrentMonth(item.zx_invoicedate)
                //       )
                //     : "NA"
                // }
                onPressAddToCart={() => {
                  placeGoodForm.qty && placeGoodForm.id == item.zx_invoicelineid
                    ? placeGoodForm.id == item.zx_invoicelineid &&
                      placeGoodForm.qty <= item.zx_quantity
                      ? this.onPressAddToCart({
                          zx_salesinvoicelines: item.zx_salesinvoice,
                          zx_invoicedquantity: item.zx_quantity
                            ? item.zx_quantity
                            : "0",
                          zx_productmaster: item.zx_product,
                          zx_recordid: item.zx_recordid,
                          zx_productcode: item.zx_productcode,
                          zx_productname: item.zx_productname,
                          location: item.invoicefromName,
                          location_id: item.zx_invoicefrom,
                        })
                      : HelperService.showToast({
                          message:
                            "Return Quantity is more than Ordered Quantity",
                          duration: 1000,
                          buttonText: "",
                        })
                    : HelperService.showToast({
                        message: "Please Select/Fill the values first",
                        duration: 1000,
                        buttonText: "",
                      });
                }}
                isAddedInCart={this.isAddedInCart({
                  id: item.zx_productname,
                  code: item.zx_recordid,
                })}
                disableAddCart={this.isAddedInCart({
                  id: item.zx_productname,
                  code: item.zx_recordid,
                })}
                heading={"INV-" + item.zx_recordid}
                heading1={item.zx_productname}
                content={[
                  <ReturnCardStrip
                    // labelStyle={Styles.ttl}
                    // valueStyle={Styles.detail}
                    label={"Invoice Date"}
                    value={HelperService.dateReadableFormat(
                      item.zx_invoicedate
                    )}
                    // value={this.getData1(item.Id)}
                  />,
                  <ReturnCardStrip
                    // labelStyle={Styles.ttl}
                    // valueStyle={Styles.detail}
                    label={"Quantity"}
                    value={item.zx_quantity ? item.zx_quantity : "0"}
                    // value={this.getData1(item.Id)}
                  />,
                  <ReturnCardStrip
                    // labelStyle={Styles.ttl}
                    // valueStyle={Styles.detail}
                    label={"Location"}
                    value={item.invoicefromName ? item.invoicefromName : "NA"}
                  />,
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      top: hp("1%"),
                      width: wp("85%"),
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.lightGrey,
                        fontSize: wp("3.2%"),
                        fontFamily: ApplicationStyles.textFont,
                        fontWeight: "bold",
                        top: hp("1.5%"),
                        // left: wp("1%"),
                      }}
                    >
                      Return Qty
                    </Text>
                    <TextInput
                      style={{
                        height: hp(5),
                        backgroundColor: Colors.lightPink,
                        width: wp(20),
                        // right: wp("5%"),
                        // left: wp("3%"),
                        marginTop: hp("0.5%"),
                        right: wp("1.5%"),
                        borderRadius: 5,
                        fontSize: 12,
                      }}
                      placeholder={"Enter here"}
                      textAlign={"center"}
                      keyboardType="numeric"
                      value={
                        item.zx_invoicelineid == placeGoodForm.id
                          ? placeGoodForm.qty
                          : ""
                      }
                      onChangeText={(value) => {
                        this.props.changePlaceGoodForm({
                          edited_field: "qty",
                          edited_field1: "id",
                          edited_value: value,
                          edited_value1: item.zx_invoicelineid,
                        });
                      }}
                    />
                  </View>,
                  <ReturnCardStrip
                    labelStyle={Styles.ttl}
                    valueStyle={{ ...Styles.detail }}
                    label={"Total Qty"}
                    value={
                      item.zx_invoicelineid == placeGoodForm.id
                        ? placeGoodForm.qty
                        : "0"
                    }
                  />,
                ]}
                // children={[
                //   <View style={{ flexDirection: "row" }}>
                //     <View
                //       style={{
                //         display: "flex",
                //         flexDirection: "row",
                //         top: hp("1%"),
                //       }}
                //     >
                //       <Text
                //         style={{
                //           color: Colors.lightGrey,
                //           fontSize: wp("3.2%"),
                //           fontFamily: ApplicationStyles.textFont,
                //           fontWeight: "bold",
                //           top: hp("1.5%"),
                //           left: wp("1%"),
                //         }}
                //       >
                //         Return Qty
                //       </Text>
                //       <TextInput
                //         style={{
                //           height: hp(5),
                //           backgroundColor: Colors.lightPink,
                //           width: wp(20),
                //           // right: wp("5%"),
                //           left: wp("7%"),
                //           marginTop: hp("0.5%"),
                //           borderRadius: 5,
                //           fontSize: 12,
                //         }}
                //         placeholder={"Enter here"}
                //         textAlign={"center"}
                //         keyboardType="numeric"
                //         value={
                //           item.zx_invoicelineid == placeGoodForm.id
                //             ? placeGoodForm.qty
                //             : ""
                //         }
                //         onChangeText={(value) => {
                //           this.props.changePlaceGoodForm({
                //             edited_field: "qty",
                //             edited_field1: "id",
                //             edited_value: value,
                //             edited_value1: item.zx_invoicelineid,
                //           });
                //         }}
                //       />
                //     </View>
                //     <View style={{ left: wp("4%"), top: hp("0.5%") }}>
                //       <ReturnCardStrip
                //         labelStyle={Styles.ttl}
                //         valueStyle={{ ...Styles.detail }}
                //         label={"Total Qty"}
                //         value={
                //           item.zx_invoicelineid == placeGoodForm.id
                //             ? placeGoodForm.qty
                //             : "0"
                //         }
                //       />
                //     </View>
                //   </View>,
                // ]}
              />
            )}
          />
        );
      } else {
        visibleNode = <NoDataFound text={"No Data Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (details && !details.length && !loading) {
      visibleNode = <NoDataFound text={"No Data Found"} />;
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
    // console.log("paramsssstocart", params);
    const {
      orderForm,
      token,
      cartItem,
      retailerItems,
      variableDiscount,
      agentid,
      primaryOrderForm,
      placeGoodForm,
    } = this.props;

    let data = {
      zx_salesinvoicelines: params.zx_salesinvoicelines,
      zx_invoicedquantity: params.zx_invoicedquantity,
      zx_returnquantity: placeGoodForm.qty,
      zx_productmaster: params.zx_productmaster,
      zx_recordid: params.zx_recordid,
      zx_productname: params.zx_productname,
      zx_productcode: params.zx_productcode,
      location: params.location,
      location_id: params.location_id,
    };

    if (cartItem && cartItem.length) {
      cartItem.map((obj) => {
        if (obj.location == params.location) {
          this.props.addPrimaryGoodToCart(data);
          this.props.clearPrimaryPlaceGoodForm();
          HelperService.showToast({
            message: "Add to Cart Successfully",
          });
        } else {
          HelperService.showToast({
            message: "Return is only for same location",
          });
        }
      });
    } else {
      this.props.addPrimaryGoodToCart(data);
      this.props.clearPrimaryPlaceGoodForm();
      HelperService.showToast({
        message: "Add to Cart Successfully",
      });
    }
  }

  isAddedInCart(item) {
    const { cartItem, form } = this.props;
    let isPresent = false;

    cartItem.map((obj) => {
      if (obj.zx_productname == item.id && obj.zx_recordid == item.code) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  filter() {
    const { retailerdata, primaryGoodForm } = this.props;

    let filterList = HelperService.searchTextListFilter(
      retailerdata,
      "id",
      primaryGoodForm.zx_orderfrom
    );

    return filterList;
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
      changeGoodReturnSearchFilters,
      token,
      variableDiscount,
      retailerItems,
      logindata,
      primaryOrderForm,
      regularOrders,
      code,
    } = this.props;
    let changingValue = searchFilters["brand"];
    let onChangeCallback = (value) =>
      changeGoodReturnSearchFilters({
        edited_field: "name",
        edited_value: value,
      });
    let changingValue1 = searchFilters["class"];
    let onChangeCallback1 = (value) =>
      changeGoodReturnSearchFilters({
        edited_field: "class",
        edited_value: value,
      });
    let changingValue2 = searchFilters["location"];
    let onChangeCallback2 = (value) =>
      changeGoodReturnSearchFilters({
        edited_field: "location",
        edited_value: value,
      });
    return (
      <View>
        <Card
          style={code.zx_brandgroupcode == "1" ? Styles.card : Styles.cardBlue}
        >
          <BackArrowButton style={Styles.backarrow} />
          <Text
            style={{
              color: Colors.white,
              fontFamily: ApplicationStyles.textFont,
              fontSize: 22,
              fontWeight: "bold",
              textAlign: "center",
              bottom: hp("1%"),
              top: hp("1.5%"),
            }}
          >
            {"Primary "}
            <Text style={{ ...Styles.titleText, ...Styles.textClr }}>
              {" Goods Return"}
            </Text>
          </Text>

          <SearchBar
            placeholder={"Search By Invoice no."}
            onInputChange={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "type",
                edited_value: text,
              })
            }
            onInputSubmit={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "type",
                edited_value: text,
              })
            }
            onInputClear={(text) =>
              changeGoodReturnSearchFilters({
                edited_field: "type",
                edited_value: "",
              })
            }
            value={searchFilters["searchValue"]}
            ContainerStyles={{
              paddingVertical: 8,
              width: "88%",
              borderRadius: 10,
              paddingHorizontal: 3,
              paddingTop: 7,
              elevation: 10,
              backgroundColor: "white",
              fontSize: wp("4.8%"),
              fontWeight: "700",
              color: Colors.blue,
              height: "25%",
              top: hp("3%"),
              alignSelf: "center",
            }}
          />
        </Card>
        <View
          style={{
            flexDirection: "column",
            height: hp("5%"),
            top: hp("1%"),
          }}
        >
          <View
            style={{
              // height: 70,
              width: "100%",
              marginLeft: wp("7%"),
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <SearchableDropdown
              dataSource={[{ id: "", name: "All" }].concat(this.getbrand())}
              placeHolderText={"Select Brand"}
              selectedValue={changingValue}
              // selectedValue={data.sfid == form.id ? form.colour__c : ''}
              onChange={onChangeCallback}
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
                      marginLeft: 5,
                      backgroundColor: Colors.lightPink,
                      borderWidth: 0,
                      left: wp("0%"),
                    }
                  : {
                      borderRadius: 5,
                      width: "80%",
                      height: hp("4.5%"),
                      elevation: 5,
                      // marginBottom: hp('5%'),
                      paddingHorizontal: 0,
                      marginLeft: 5,
                      backgroundColor: Colors.lightbluebackground,
                      borderWidth: 0,
                    }
              }
              // key={form.id}
            />

            <SearchableDropdown
              dataSource={[{ id: "", name: "All" }].concat(this.getclass())}
              placeHolderText={"Select Class"}
              selectedValue={changingValue1}
              // selectedValue={data.sfid == form.id ? form.colour__c : ''}
              onChange={onChangeCallback1}
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
                      marginLeft: 5,
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
                      marginLeft: 5,
                      backgroundColor: Colors.lightbluebackground,
                      borderWidth: 0,
                    }
              }
              // key={form.id}
            />
            <TouchableOpacity
              onPress={() => {
                cartItem.length
                  ? (NavigationService.navigate("GoodItemDetail"),
                    this.props.clearPrimaryPlaceGoodForm(),
                    this.props.clearTransport())
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
                        marginRight: wp("20%"),
                        marginTop: hp("1%"),
                        color: Colors.darkRedPink,
                      }
                    : {
                        fontSize: 30,
                        marginRight: wp("20%"),
                        marginTop: hp("1%"),
                        color: Colors.bluebackground,
                      }
                }
              />
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
                top: hp("-1%"),
                left: hp("40%"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
        </View>
        <View
          style={{
            marginTop: hp("2%"),
            height: 60,
            width: "60%",
            marginLeft: wp("8%"),
          }}
        >
          <SearchableDropdown
            dataSource={[{ id: "", name: "All" }].concat(this.getLocation())}
            placeHolderText={"Select Location"}
            selectedValue={changingValue2}
            // selectedValue={data.sfid == form.id ? form.colour__c : ''}
            onChange={onChangeCallback2}
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
                    width: "95%",
                    height: hp("4.5%"),
                    elevation: 5,
                    marginBottom: hp("7%"),
                    paddingHorizontal: 0,
                    backgroundColor: Colors.lightPink,
                    borderWidth: 0,
                    top: hp("3%"),
                    left: wp("3%"),
                  }
                : {
                    borderRadius: 5,
                    width: "80%",
                    height: hp("4.5%"),
                    elevation: 5,
                    // marginBottom: hp('5%'),
                    paddingHorizontal: 0,
                    marginLeft: 5,
                    backgroundColor: Colors.lightbluebackground,
                    borderWidth: 0,
                  }
            }
            // key={form.id}
          />
        </View>
        <View>{this.getProductCard()}</View>
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
                width: "60%",
                backgroundColor: "#fff",
                padding: 20,
                alignItems: "center",
                borderRadius: 3,
                height: hp("45%"),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate("PrimaryGoodReturn"),
                    this.props.closeModal();
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: wp("45%"),
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
                        fontSize: wp("6%"),
                        fontWeight: "bold",
                        fontFamily: ApplicationStyles.textMediumFont,
                        color: Colors.darkRedPink,
                        top: hp("1%"),
                      }
                    : {
                        textAlign: "center",
                        fontSize: wp("6%"),
                        fontWeight: "bold",
                        fontFamily: ApplicationStyles.textMediumFont,
                        color: Colors.bluebackground,
                        top: hp("1%"),
                      }
                }
              >
                {"Primary Goods Return"}
              </Text>

              <View
                style={{
                  marginVertical: 30,
                  height: hp("25%"),
                }}
              >
                <SearchableDropdown
                  dataSource={this.getDistributor()}
                  placeHolderText={"Select Distributor"}
                  selectedValue={this.props.primaryGoodForm.zx_orderfrom}
                  // selectedValue={data.sfid == form.id ? form.colour__c : ''}
                  onChange={(value) =>
                    this.props.changePrimaryGoodForm({
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
                    // width: "106%",
                    textAlign: "center",
                    // marginLeft: wp("2%"),
                    top: hp("1.5%"),
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
                    // marginBottom: hp("7%"),
                    // paddingHorizontal: 0,
                    marginLeft: wp("14%"),
                    backgroundColor: Colors.white,
                    top: hp("-2%"),
                    borderWidth: 1,
                  }}
                  // key={form.id}
                />

                <TouchableOpacity
                  style={
                    code.zx_brandgroupcode == "1"
                      ? {
                          width: "50%",
                          top: hp("-4%"),
                          left: wp("20%"),
                          height: hp("4.8"),
                          backgroundColor: Colors.darkRedPink,
                        }
                      : {
                          width: "50%",
                          top: hp("-4%"),
                          left: wp("20%"),
                          height: hp("4.8"),
                          backgroundColor: Colors.bluebackground,
                        }
                  }
                  onPress={() => {
                    this.props.primaryGoodForm.zx_orderfrom
                      ? (this.props.closeModal(), this.fetchCall())
                      : HelperService.showToast({
                          message: "Please Select Distributor",
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
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    brands: state.products.BrandList && state.products.BrandList,
    productClass: state.products.ItemList && state.products.ItemList,
    cartItem: state.orders.cart.cartItem,
    showmodal: state.orders.showGoodModal,
    searchFilters: state.orders.goodReturnFilters,
    list: state.retailers.retailersList,
    retailerdata: state.retailers.retailersList.list,
    primaryGoodForm: state.orders.primaryGoodForm,
    code: state.user.user_details,
    details: state.retailers.customerInvoiceLines,
    getCustomerInvoiceLinesLoader:
      state.retailers.getCustomerInvoiceLinesLoader,
    placeGoodForm: state.orders.placeGoodForm,
    location: state.retailers.getAllLocation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
  addPrimaryGoodToCart: (params) =>
    dispatch(OrdersActions.addPrimaryGoodToCart(params)),
  showModal: () => dispatch(OrdersActions.showGoodModal()),
  closeModal: () => dispatch(OrdersActions.closeGoodModal()),
  changeGoodReturnSearchFilters: (params) =>
    dispatch(OrdersActions.changeGoodReturnSearchFilters(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  changePrimaryGoodForm: (params) =>
    dispatch(OrdersActions.changePrimaryGoodForm(params)),
  getCustomerInvoiceLines: (params) =>
    dispatch(RetailersActions.getCustomerInvoiceLines(params)),
  changePlaceGoodForm: (params) =>
    dispatch(OrdersActions.changePlaceGoodForm(params)),
  clearPrimaryPlaceGoodForm: (params) =>
    dispatch(OrdersActions.clearPrimaryPlaceGoodForm(params)),
  clearTransport: (params) => dispatch(OrdersActions.clearTransport(params)),
  getAllLocation: (params) => dispatch(RetailersActions.getAllLocation(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacePrimaryGoodReturn);
