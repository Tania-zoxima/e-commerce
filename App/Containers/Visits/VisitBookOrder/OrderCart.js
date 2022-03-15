import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
  ImageBackground,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import Styles from "./OrderCartStyles";
import BackArrow from "../../../Components/BackArrowButton/BackArrowButton";
import { ScrollView } from "react-native";
import { Badge } from "native-base";
import NoDataFound from "App/Components/NoDataFound";
import { connect } from "react-redux";
import { HelperService } from "App/Services/Utils/HelperService";
// import ProductCardList from "../../Components/ProductCard/ProductCardList";
import { Colors, ApplicationStyles } from "App/Theme";
// import ProductCard from 'App/Components/ProductCard';
// import PriceDetails from 'App/Components/PriceDetails';
// import TotalPriceCard from 'App/Components/TotalPriceCard';
import { Picker } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import OrderCard from "./OrderCard";
import BlueButton from "App/Components/BlueButton";
// import SearchableDropdown from 'react-native-searchable-dropdown';
import TextArea from "App/Components/FormInput/TextArea";
import ProductActions from "App/Stores/Products/Actions";
import VisitAction from "../VisitsDisplayScreen/VisitAction";
import CommonActions from "App/Stores/Common/Actions";
import InputDate from "App/Components/FormInput/InputDate";
// import Datepicker from "../../Components/DatePicker/DatePicker";
import WhiteButton from "App/Components/WhiteButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputText from "App/Components/FormInput/InputText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// import GenericCheckBox from 'App/Components/GenericCheckBox'
// import EditQuantity from "App/Components/EditQuantity/EditQuantity";
// import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import moment from "moment";

class OrderCart extends Component {
  //     componentDidMount() {
  //         const {
  //             cart,
  //             state_id,
  //             fetchProductSchemes,
  //             dealerId
  //         } = this.props;
  //         let data = cart.items[0] || {};

  //         this.props.editCartOrder({ edited_field: 'from__c', edited_value: dealerId });
  //     }

  //     state = { sampleText: 'Select Date' };

  //     changeTextValue = () => {
  //         this.setState({ sampleText: HelperService.dateReadableFormat(new Date().getTime()) });

  //     }

  //     getTotalQuantity(items) {
  //         let quantity = 0;
  //         items.map((obj) => {
  //             quantity += Number(obj.quantity__c);
  //         })
  //         return quantity;
  //     }

  //     placeOrder() {

  //         HelperService.showAlert({
  //             // heading: 'Are you at Dealership ?',
  //                    message: 'Are you sure you want to place order ?',
  //                    cancelText: "No,Cancel",
  //                    confirmText: "Yes,Continue"
  //                  }).then(() => {
  //                     this.props.placeOrder(this.props.cart);
  //                  }).catch(() => {
  //                    // console.log('cancel');
  //                  })

  //        // this.props.placeOrder(this.props.cart);
  //     }

  //     getTotalTax(items) {
  //         const {
  //             Tax,
  //         } = this.props;

  //         let value = this.getTotalOrderValueDiscount(items);
  //         let taxValue = Tax && Tax.length && Tax[0].igst__c ? Tax[0].igst__c : 5
  //         let tax = Number(taxValue) / 100 * value;
  //         return tax;

  //     }

  //     getTotalOrderValueDiscount(items) {
  //         let value = 0;
  //         items.map((obj) => {
  //             value += Number(obj.quantity__c) * (Number(obj.per_bike_price__c))
  //         })
  //         return (value);
  //     }

  //     onChangeQuantity(params) {

  //         const {
  //             addingItemToCart,
  //             removingItemFromCart
  //         } = this.props;

  //         if (params.quantity__c == 0) {
  //             removingItemFromCart({ sfid: params.product__c, colour__c: params.colour__c });
  //         } else {
  //             addingItemToCart(params)
  //         }
  //     }

  //     onSelect(params) {
  //         const {
  //        token,
  //        //agentid,
  //        cart,
  //        data,
  //      } = this.props;

  //     //  let data = [{
  //     //        "retailer_dealer__c": params.sfid,
  //     //      "status__c": "unplanned",
  //     //      "visit_date__c": HelperService.getCurrentTimestamp(),
  //     //      "createddate": HelperService.getCurrentTimestamp(),
  //     //      "psm__c": agentid,
  //     //      "type__c": params.type
  //     //    }]
  //  //console.log('hii');
  //        Alert.alert(
  //            'Are you sure you want to place order ?',
  //        [
  //          {
  //            text: 'No,Cancel',
  //            onPress: () => console.log('Cancel Pressed'),
  //            style: 'cancel',
  //          },
  //          {text: 'Yes,Continue', onPress: () => this.placeOrder()},
  //         ],
  //        {cancelable: false},
  //      );
  //    }

  //     getProductCard(item) {
  //         const {
  //             cart,
  //             form
  //         } = this.props;

  //         return (
  //             <OrderCard
  //                 name={item.name}
  //                 data={item}
  //                 colour={this.props.dmsProductColorList}
  //                 colorValue={item.colour__c}
  //                 quantity={item.quantity__c}
  //                 form={this.props.form}
  //                 price={item.per_bike_price__c}
  //                 onRemoveClick={() => this.props.removingItemFromCart({ sfid: item.product__c, colour__c: item.colour__c, })}
  //                 onChangeQuantity={(quantity) => this.onChangeQuantity({
  //                     product__c: item.product__c,
  //                     per_bike_price__c: item.per_bike_price__c,
  //                     colour__c: item.colour__c,
  //                     colour_name: item.colour_name,
  //                     cgst_rs__c: item.cgst_rs__c,
  //                     igst_rs__c: item.igst_rs__c,
  //                     sgst_rs__c: item.sgst_rs__c,
  //                     quantity__c: quantity,

  //                     name: item.name,
  //                     order_header1__c: "a0G9D000003FUxfUAG",
  //                     // recordtypeid__c: "0129D000000lx9hQAA"

  //                 })}
  //                 onchangeColour={(color) => this.onChangeQuantity({
  //                     product__c: item.product__c,
  //                     per_bike_price__c: item.per_bike_price__c,
  //                     colour__c: color,
  //                     cgst_rs__c: item.cgst_rs__c,
  //                     igst_rs__c: item.igst_rs__c,
  //                     sgst_rs__c: item.sgst_rs__c,
  //                     quantity__c: item.quantity__c,
  //                     name: item.name,
  //                     order_header1__c: "a0G9D000003FUxfUAG",
  //                     // recordtypeid__c: "0129D000000lx9hQAA"

  //                 })}

  //             />

  //         );
  //     }

  //     getDataNode1() {
  //         const {
  //             enquiry,
  //             loader,
  //             data,
  //             cart
  //         } = this.props;
  //         let visibleNode = [];

  //         if (cart.items && cart.items.length) {

  //             visibleNode = (
  //                 <FlatList
  //                     data={cart.items}
  //                     renderItem={({ item }) => this.getProductCard(item)}
  //                     keyExtractor={item => item.product__c}

  //                 />
  //             );
  //         } else {
  //             visibleNode = <NoDataFound text={'No Items in Cart.'}></NoDataFound>
  //         }

  //         return visibleNode;
  //     }
  getCard() {
    const { cartItem } = this.props;
    // console.log("iteemssss",cartItem)
    return (
      <FlatList
      style={{ top: "3%", marginBottom: hp("10%") }}
        data={cartItem}
        // contentContainerStyle={{ paddingBottom: 90,paddingTop:10}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard 
          onRemoveClick={() => this.onRemoveClick(item.name)}
          p_id={item.code} name={item.name} price={item.price} amount={item.amount} data={item.upp} data_qty={item.qty} />
        )}
      />
    );
  }

  onRemoveClick(params) {
    const {
      deleteOrderToCart
    } = this.props;

    Alert.alert(
      'Delete order',
      'Do you want to delete this order?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => deleteOrderToCart({id: params})},
    ],
    {cancelable: false},
  );
    
  }


  render() {
    const {
      cartItem,
        cart,
        data,
        placeOrderLoader,
        editCartOrder
    } = this.props;

    return (
      <ScrollView>
        <View style={{ width: "100%", height: 30 }}>
          <TouchableOpacity>
            <BackArrow
              style={{
                marginLeft: 20,
                marginTop: 20,
                fontSize: 30,
                color: Colors.darkRedPink,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.outerView}>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Bill To</Text>
            <Text style={Styles.placeholder}>MK Traders</Text>
          </View>

          <View style={{ ...Styles.textView }}>
            <Text style={Styles.textStyle}>Ship To</Text>
            <Text style={Styles.placeholder}>MK Traders</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Document no.</Text>
            <Text style={Styles.placeholder}>341023</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Qty</Text>
            <Text style={Styles.placeholder}>2000</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Order Value</Text>
            <Text style={Styles.placeholder}>₹334000</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Tax</Text>
            <Text style={Styles.placeholder}>₹12541</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Total Amount Payable</Text>
            <Text style={Styles.placeholder}>₹167000</Text>
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.textStyle}>Location</Text>
            <Text style={Styles.placeholder}>Select Location</Text>
          </View>
        </View>
        
         
            {this.getCard()}
            {/* {this.getDataNode1()} */}
         
      
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItem:state.products.cart.cartItem

});

const mapDispatchToProps = (dispatch) => ({
  deleteOrderToCart:(params)=> dispatch(ProductActions.deleteOrderToCart(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCart);
