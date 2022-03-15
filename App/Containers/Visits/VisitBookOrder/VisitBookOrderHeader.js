import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import CommonActions from "App/Stores/Common/Actions";
import WhiteButton from "App/Components/WhiteButton";
import Loading from "App/Components/Loading";
import VisitsActions from "App/Stores/Visits/Actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductActions from "App/Stores/Products/Actions";
import BookOrderCard from "../../../Components/BookOrderCard/BookOrderCard";
import BookOrderCardStrip from "../../../Components/BookOrderCard/BookOrderCardStrip";
import Style from "./VisitBookOrderStyles";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors, ApplicationStyles } from "App/Theme";
import { Badge } from "native-base";
import NavigationService from "App/Services/NavigationService";


class VisitBookOrderHeader extends Component {
  componentDidMount() {
    const { token,} = this.props;

    let params = {
      token,
      id: "64c95549-ced7-eb11-bacb-000d3ac9bbac",
      state: "60319e74-60d6-eb11-bacc-000d3af296c9",
    };
    let params1 = {
      token,
    };
    let params2 = {
      token,
    };
    this.props.getAllProducts(params);
    // this.props.getAllProductsBrands(params1);
    // this.props.getAllProductsClass(params2);
  
  }
  getProductCard() {
    const { products } = this.props;
    return (
      <FlatList
        style={{ top: "4%", marginBottom: hp("10%") }}
        data={products}
        keyExtractor={(item) => item.zx_product}
        renderItem={({ item }) => (
          <BookOrderCard
            dark={false}
            showSingleAddToCartAction={true}
            style={{
              backgroundColor: Colors.white,
              borderColor: "#F66A676B",
              borderWidth: 0.5,
              width: wp("89%"),
              height: hp("19%"),
            }}
            onPressAddToCart={() =>
              this.onPressAddToCart({
                item: item.zx_productname,
              itemcode:item.zx_productcode})
              }
            isAddedInCart={this.isAddedInCart({id:item.zx_productname})}
            disableAddCart={this.isAddedInCart({id:item.zx_productname})}
            heading={item.zx_productcode}
            icon={"circle"}
            heading1={item.zx_productname}
            title={"Enter Bags"}
            content={[
              <BookOrderCardStrip
                label={"UPP"}
                value={item.zx_pricelistitemcode}
              />,
              <BookOrderCardStrip label={"Price"} value={item.zx_amount} />,
            ]}
          />
        )}
      />
    );
  }

getbrand() {
    const { brands } = this.props;
    let brandname = [];
    if (brands && brands.length) {
      brands.map((obj) => {
        if ({ id: obj.zx_brandcode, name: obj.zx_brandcode }) {
          brandname.push({ id: obj.zx_brandcode, name: obj.zx_brandcode });
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
        if ({ id: obj.zx_itemclasscode, name: obj.zx_itemclasscode }) {
          classname.push({ id: obj.zx_itemclasscode, name: obj.zx_itemclasscode });
        }
      });
    }
    return classname;
  }
  onPressAddToCart(params){
    // console.log("pparamsinc",params.item)
  let data={
    name:params.item,
    code:params.itemcode
  }
  // data = HelperService.decorateWithLocalId(data);
  this.props.addOrderToCart(data)
  }

  isAddedInCart(item) {
    // console.log("abbbbbbbbbbbbb",item)
    const {
        cartItem,
        form
    } = this.props;

    let isPresent = false;

    cartItem.map((obj) => {
      // console.log("oobbjjjjjjj",obj)  
        if (obj.name == item.id) {
            isPresent = true;
        }
        // else{
        //   isPresent=false;
        // }

        // if (obj.product__c == item.sfid && obj.colour__c!=form.colour__c) {
        //     isPresent = false;
        // }

    });
    return isPresent
}

  render() {
    const { products,brands,productClass,selectedClass,selectedBrand,changeProductBrand,changeProductClass,cartItem} = this.props;
    // console.log("bbrraannddsseeeeeeclass",productClass)
    return (
      <View>
        <View
          style={{
            marginTop: 5,
            height: 70,
            width: "100%",
            marginLeft: wp("10%"),
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <SearchableDropdown
            dataSource={this.getbrand()}
            placeHolderText={"Select Brand"}
            selectedValue={selectedBrand}
            // selectedValue={data.sfid == form.id ? form.colour__c : ''}
            onChange={(value) => changeProductBrand(value)}
            placeholder={"Type or Select State"}
            invalid={false}
            labelStyles={{
              color: Colors.white,
              fontFamily: ApplicationStyles.textFont,
              textAlign: "center",
              //   width: "99%",
              //  padding:5,
              fontSize: 13,
              flexDirection: "row",
            }}
            customPickerStyles={{
              borderRadius: 5,
              width: "80%",
              height: hp("4.5%"),
              elevation: 5,
              // marginBottom: hp('5%'),
              paddingHorizontal: 0,
              marginLeft: 5,
              backgroundColor: Colors.cardblue,
              borderWidth: 0,
            }}
            // key={form.id}
          />
          <SearchableDropdown
            dataSource={this.getclass()}
            placeHolderText={"Select Class"}
            selectedValue={selectedClass}
            // selectedValue={data.sfid == form.id ? form.colour__c : ''}
            onChange={(value) => changeProductClass(value)}
            placeholder={"Type or Select State"}
            invalid={false}
            labelStyles={{
              color: Colors.white,
              fontFamily: ApplicationStyles.textFont,
              textAlign: "center",
              //   width: "99%",
              //   padding: 10,
              fontSize: 13,
              flexDirection: "row",
            }}
            customPickerStyles={{
              borderRadius: 5,
              width: "80%",
              height: hp("4.5%"),
              elevation: 5,
              // marginBottom: hp('5%'),
              paddingHorizontal: 0,
              marginLeft: 5,
              backgroundColor: Colors.cardblue,
              borderWidth: 0,
            }}
            // key={form.id}
          />
          <TouchableOpacity onPress={() => NavigationService.navigate('OrderCart')}>
          <Image
            style={{
              width: wp("7%"),
              height: hp("4%"),
              marginRight: wp("20%"),
              marginTop: hp("2%"),
            }}
            source={require("../../../Assets/Images/cart.png")}
          /></TouchableOpacity>
          <Badge
            style={{
              backgroundColor: Colors.white,
              padding: 0,
              borderWidth: 2,
              borderColor: Colors.primary,
              minWidth: wp("5%"),
              minHeight: wp("5%"),
              position: "absolute",
              borderRadius: wp("10%"),
              top: -hp("0%"),
              left: hp("40%"),
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
              {cartItem?cartItem.length:0}
            </Text>
          </Badge>
        </View>
        <View>{this.getProductCard()}</View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    retailersOffset: state.retailers.retailersOffset,
    retailersLimit: state.retailers.retailersLimit,
    orderHeaderForm: state.visits.orderHeaderForm,
    validation: state.retailers.retailerFormValidation,
    createRetailerLoader: state.retailers.createRetailerLoader,
    retailerCompetitors: state.retailers.retailerCompetitors,
    categories: state.retailers.categories,
    retailerCompetitors: state.retailers.retailerCompetitors,
    dealersSearchList: state.retailers.dealersSearchList,
    agentAreas: state.common.retailerArea,
    loader: state.common.fetchRetailerAreaLoading,
    beatList: state.common.agentBeat,
    dealersList: state.retailers.dealersSearchList,
    dealerType: state.common.dealerType,
    user_details: state.user.user_details,
    city: state.user.agentAreas,
    beatLoader: state.common.fetchBeatLoading,
    divisionList: state.common.divisionList,
    fetchAllInsuranceLoading: state.common.fetchAllInsuranceLoading,
    fetchAllRouteLoading: state.common.fetchAllRouteLoading,
    fetchIncoTermLoading: state.common.fetchIncoTermLoading,
    fetchAllPlantLoading: state.common.fetchAllPlantLoading,
    fetchDistChannelLoading: state.common.fetchDistChannelLoading,
    getBillPartyLoading: state.common.getBillPartyLoading,

    agentDistChannel: state.common.searchDistChannel,
    agentAllPlant: state.common.searchAllPlant,
    agentIncoTerm: state.common.agentIncoTerm,
    agentAllRoute: state.common.agentAllRoute,
    agentAllInsurance: state.common.agentAllInsurance,
    getBillPartyList: state.common.getBillPartyList,
    products: state.products.ProductList && state.products.ProductList,
    brands: state.products.BrandList && state.products.BrandList,
    productClass: state.products.ItemList && state.products.ItemList,
    selectedBrand: state.products.selectProduct.selectedBrand,
    selectedClass: state.products.selectProduct.selectedClass,
    cartItem:state.products.cart.cartItem
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeOrderHeaderForm: (params) =>
    dispatch(VisitsActions.changeOrderHeaderForm(params)),
  clearOrderHeaderForm: () => dispatch(VisitsActions.clearOrderHeaderForm()),

  fetchDistChannel: (params) =>
    dispatch(CommonActions.fetchDistChannel(params)),
  fetchAllPlant: (params) => dispatch(CommonActions.fetchAllPlant(params)),
  fetchIncoTerm: (params) => dispatch(CommonActions.fetchIncoTerm(params)),
  fetchAllRoute: (params) => dispatch(CommonActions.fetchAllRoute(params)),
  fetchAllInsurance: (params) =>
    dispatch(CommonActions.fetchAllInsurance(params)),
  getBillParty: (params) => dispatch(CommonActions.getBillParty(params)),
  getAllProducts: (params) => dispatch(ProductActions.getAllProducts(params)),
  getAllProductsBrands: (params) =>
    dispatch(ProductActions.getAllProductsBrands(params)),
  getAllProductsClass: (params) =>
    dispatch(ProductActions.getAllProductsClass(params)),
    changeProductBrand: (params) => dispatch(ProductActions.changeProductBrand(params)),
    changeProductClass: (params) => dispatch(ProductActions.changeProductClass(params)),
    addOrderToCart:(params)=> dispatch(ProductActions.addOrderToCart(params)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitBookOrderHeader);
