import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './VisitOrderCartStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import InputNumber from 'App/Components/FormInput/InputNumber'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import ProductCartCard from 'App/Components/ProductCartCard'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import ProductActions from 'App/Stores/Products/Actions'
import { Colors } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class VisitOrderCart extends React.Component {
	componentDidMount() {
		const {
			cart,
			editCartOrder,
			dealersList,
			retailersList
		} = this.props;

		if (retailersList && retailersList.success) {
		} else {
			this.fetchRetailersCall();
		}

	

		//this.updateDealer();
		// editCartOrder({
		// 	edited_field: 'order_value__c', 
		// 	edited_value: this.getTotalOrderValue(cart.items) + this.getTotalTax(cart.items)
		// })
	}

	

	fetchRetailersCall() {
		const {
			token,
			agentid,
			retailersOffset,
			retailersLimit,
			fetchRetailers
		} = this.props;

		fetchRetailers({
			token,
			agentid,
			offset: retailersOffset,
			limit: retailersLimit
		});
	}

	fetchDealersCall() {
		const {
			token,
			agentid,
			retailersOffset,
			retailersLimit,
			fetchDealers
		} = this.props;

		fetchDealers({
			token,
			agentid,
			offset: retailersOffset,
			limit: retailersLimit
		});
	}

	getItemData(id) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
		} = this.props;
		let data = {};

		productItemList.map((obj) => {
			if (obj.sfid == id) {
				data = obj
			}
		});
		//console.log(data)
		return data;
	}


	getItemWeigthData(id) {
		const {
			productItemList	,
			productItemPriceList
		} = this.props;
		let data = {};

		productItemPriceList.map((obj) => {
			if (obj.sfid == id) {
				data = obj
			}
		});
		return data;
	}

	// updateDealer() {
	// 	const {
	// 		editCartOrder,
	// 		retailersList,
	// 		executeVisitData
	// 	} = this.props;

	// 	let data = {};
	// 	retailersList.map((obj) => {
	// 		if (obj.seller.sfid == executeVisitData.retailer_dealer__c) {
	// 			data = obj.seller
	// 			editCartOrder({ edited_field: 'dealer__c', edited_value: data.dealer__c })
	// 		}
	// 	});
	// 	return data;
	// }

	getRetailerData() {
		const {
			retailersList,
			dealersList,
			executeVisitData
		} = this.props;

		let data = {};
		retailersList.map((obj) => {
			if (obj.seller.sfid == executeVisitData.retailer_dealer__c) {
				data = obj.seller
			}
		});

		

		return data;
	}

	onChangeQuantity(params) {
		const {
			addItemToCart,
			removeItemFromCart
		} = this.props;

		if (params.quantity__c == 0) {
			removeItemFromCart(params);
		} else {
			addItemToCart(params)
		}
	}

	getCardNode(item) {
		const {
			editDealerDiscount,
			
			openDealerDiscountEdit,
			  closeDealerDiscountEdit,
			  changeDealerDiscount,
			  selectedRetailer,
			executeVisitData,
			searchFilters,
		} = this.props;
		return (
			<ProductCartCard
				name={this.getItemData(item.product_item__c).gsm_name}
				data={item}
				weigthData={this.getItemWeigthData(item.product_item__c)}
				quantity={item.quantity__c}
				onRemoveClick={() => this.props.removeItemFromCart({ product_item__c: item.product_item__c })}
				onChangeQuantity={(quantity) => this.onChangeQuantity({ quantity__c: quantity, product_item__c: item.product_item__c, exmill_price: item.exmill_price,width:item.width, length: item.length, size:item.size,packaging: item.packaging })}
				dealerDiscount={item.additional_discount}
				openDealerDiscountEdit={() => openDealerDiscountEdit()}
				  closeDealerDiscountEdit={() => closeDealerDiscountEdit()}
				  changeDealerDiscount={(value) => changeDealerDiscount(value)}
				  editDealerDiscount={editDealerDiscount}
				  selectedRetailer={selectedRetailer}
				  executeVisitData={executeVisitData}

			/>
		);
	}

	placeOrder() {
		this.props.placeOrder(this.props.cart);
	}

	getTotalQuantity(items) {
		let quantity = 0;
		items.map((obj) => {
			quantity += Number(obj.quantity__c);
		})
		return quantity;
	}


	getTotalOrderValueDiscount(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
			selectedRetailer,
			executeVisitData
		} = this.props;
		let value = 0;
		items.map((obj) => {
			
			if(obj.additional_discount)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))- (Number(obj.additional_discount))* Number(obj.quantity__c)
			else
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
		})
		//console.log(value)
		return (value);
	}

	getTotalDiscount(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart
		} = this.props;
		let value = 0;
		items.map((obj) => {
			
			if(obj.additional_discount)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.additional_discount))
			
		})
		//console.log(value)
		return (value);
	}

	getTotalOrderValue(items) {
		const {
			productItemList	,
			productItemPriceList,
			cart,
			selectedRetailer,
			executeVisitData
		} = this.props;
		let value = 0;
		items.map((obj) => {
			
			
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))
		})
		//console.log(value)
		return (value);
	}


	getTotalTax(items) {
		let value = this.getTotalOrderValue(items);
		let tax = .18*value;
		
		return tax;
	}




	render() {
		const {
			token,
			agentid,
			cart,
			executeVisitData,
			editCartOrder,
			placeOrderLoader,
			dealersSearchList,
			addOrderLineLoader,
			
		} = this.props;

		let data = cart.items;
		let visibleNode = [];
		if (data && data.length) {
			visibleNode = (
				<View style={Style.itemListContainer}>
					<FlatList
						data={data}
						renderItem={({ item }) => this.getCardNode(item)}
						keyExtractor={item => item.product_item__c}
					/>
				</View>
			);
		} else {
			visibleNode = <NoDataFound text={'No Items in Cart.'}></NoDataFound>
		}



		return (
			<View style={{...Style.container, marginTop:'2%'}}>
				<View style={Style.visitCardContainer}>
					<VisitOrderCartCard
						customerName={executeVisitData.customer_name__c}
						orderDate={(new Date()).getTime()}
						items={cart.items.length}
						quantity={this.getTotalQuantity(cart.items)}
						orderValue={this.getTotalOrderValueDiscount(cart.items)}
						orderValueWithoutDis={this.getTotalOrderValue(cart.items)}
						//totalTax={this.getTotalTax(cart.items)}
						totalDiscount={this.getTotalDiscount(cart.items)}
						dark={true}
					/>
				</View>
				
				{
				visibleNode
				}
			
			
				<View 
				style={{...Style.placeOrderContainer,marginTop:'0%'}}>
					<BlueButton
						title={'Place Order'}
						style={Style.placeOrderAction}
						disabled={!cart.items.length || placeOrderLoader||addOrderLineLoader}
						loading={placeOrderLoader||addOrderLineLoader}
						onPress={() => this.placeOrder()}
						textStyle={Style.placeOrderActionText}
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	agentid: state.user.id,
	fetchProductsLoader: state.products.fetchProductsLoader,
	fetchCategoryLoader: state.products.fetchCategoryLoader,
	fetchSubCategoryLoader: state.products.fetchSubCategoryLoader,
	fetchSubSubCategoryLoader: state.products.fetchSubSubCategoryLoader,
	
	filteredProductList: state.products.filteredProductList,
	productCategoryList: state.products.productCategoryList,
	productSubCategoryList: state.products.productSubCategoryList,
	productSubSubCategoryList: state.products.productSubSubCategoryList,
	searchFilters: state.products.searchFilters,
	categoryOffset: state.products.categoryOffset,
	categoryLimit: state.products.categoryLimit,
	productLimit: state.products.productLimit,
	productOffset: state.products.productOffset,
	cart: state.visits.cart,
	retailersList: state.retailers.retailersList,
	executeVisitData: state.visits.executeVisitData,
	placeOrderLoader: state.visits.placeOrderLoader,
	dealersSearchList: state.retailers.dealersSearchList,
	retailersOffset: state.retailers.retailersOffset,
	retailersLimit: state.retailers.retailersLimit,
	dealersList: state.retailers.dealersList,
	productItemList				: state.products.productItemList,
	productItemPriceList				: state.products.productItemPriceList,
	searchFilters				: state.products.searchFilters,
	editDealerDiscount: state.products.editDealerDiscount,
	selectedRetailer: state.retailers.selectedRetailer,
	addOrderLineLoader: state.retailers.addOrderLineLoader,
	
});

const mapDispatchToProps = (dispatch) => ({
	openModal: (params) => dispatch(CommonActions.openModal(params)),
	disableModal: (params) => dispatch(CommonActions.disableModal(params)),
	fetchProducts: (params) => dispatch(ProductActions.fetchProducts(params)),
	fetchProductCategories: (params) => dispatch(ProductActions.fetchProductCategories(params)),
	fetchProductSubCategories: (params) => dispatch(ProductActions.fetchProductSubCategories(params)),
	fetchProductSubSubCategories: (params) => dispatch(ProductActions.fetchProductSubSubCategories(params)),
	changeSearchFilters: (params) => dispatch(ProductActions.changeSearchFilters(params)),
	addItemToCart: (params) => dispatch(VisitsActions.addItemToCart(params)),
	removeItemFromCart: (params) => dispatch(VisitsActions.removeItemFromCart(params)),
	editCartOrder: (params) => dispatch(VisitsActions.editCartOrder(params)),
	placeOrder: (params) => dispatch(VisitsActions.placeOrder(params)),
	fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
	fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
	openDealerDiscountEdit:(params)    => dispatch(ProductActions.openDealerDiscountEdit(params)),
  closeDealerDiscountEdit:(params)   => dispatch(ProductActions.closeDealerDiscountEdit(params)),
  changeDealerDiscount:(params)      => dispatch(ProductActions.changeDealerDiscount(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisitOrderCart)

