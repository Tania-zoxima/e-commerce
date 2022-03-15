import ItemDetail from 'App/Components/ItemDetail';
import Loading from 'App/Components/Loading';
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import OrdersActions from 'App/Stores/Orders/Actions';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import NoData from '../../../Components/NoDataFound/NoDataFound';
import BlueButton from 'App/Components/BlueButton'
import { HelperService } from 'App/Services/Utils/HelperService';
import ProductCartCard from 'App/Components/ProductCartCard';
import RetailersActions from 'App/Stores/Retailers/Actions'
import ProductActions from 'App/Stores/Products/Actions';
import Styles from './OrderInfoStyles'
import GenericIcon from 'App/Components/GenericIcon'
import NavigationService from 'App/Services/NavigationService'

class OrderInfoScreen extends Component {
  getRetailerData(id) {
    const {
      retailersList,
    } = this.props;

    let data = {};
    retailersList.map((obj) => {
      if (obj.seller.sfid == id) {
        data = obj.seller
      }
    });
    return data;
  }

  getDealerData(id) {
    const {
      dealersList,
    } = this.props;

    let data = {};
    dealersList.map((obj) => {
      if (obj.seller.sfid == id) {
        data = obj.seller
      }
    });
    return data;
  }


  componentDidMount() {
    const {
      id,
      data
    } = this.props.navigation.state.params;

   this.props.fetchOrderDetails({
      order_id: id,
      token: this.props.token,
      //agentid: this.props.agentid
    })
  }

  componentWillUnmount() {
    this.props.clearAddOrderLineData();
    }

  getTotalQuantity() {
    let quantity = 0;

    const {
      allOrdersDetailsMapping
    } = this.props;

    const {
      id,
      data,
    } = this.props.navigation.state.params;

    let orderLineData = allOrdersDetailsMapping[id];
    if (orderLineData) {
      orderLineData.map((obj) => {
        quantity += Number(obj.quantity__c)
      });
    }

    return quantity;
  }

	onChangeQuantity(params) {
		const {
			deleteOrderLine,
      token,
      editOrderQuantity,
		} = this.props;

		if (params.quantity__c == 0) {
			deleteOrderLine({token:token,  id: params.order_line_id, order_id: params.order_id});
		} else {
			editOrderQuantity(params)
		}
	}


  getItemDetailsNode() {
    let visibleNode = <Loading />;
    const {
      id,
      data,
    } = this.props.navigation.state.params;
    const {
      allOrdersDetailsMapping
    } = this.props;

    let orderLineData =  allOrdersDetailsMapping[id];
    //console.log(orderLineData)
    if (orderLineData) {
      visibleNode = (
        <ScrollView>
          {orderLineData.map((obj) =>
          	<ProductCartCard
            name={obj.product_name?obj.product_name:obj.name}
            data={obj}
            dealerDiscount={obj.component_2__c}
            quantity={obj.quantity__c}
           onRemoveClick={() => this.props.deleteOrderLine({token: this.props.token, id:  obj.pg_id__c ||obj.sfid , order_id: id })}
            onChangeQuantity={(quantity) => this.onChangeQuantity({ quantity: quantity,  order_id: obj.order_pg_id__c ,order_line_id:obj.pg_id__c ||obj.sfid  ,token:this.props.token})}
            editLoader={this.props.editOrderQuantityLoader}
            deleteLoader={this.props.deleteOrderLineLoader}
            show={true}
          />
          
          )}
        </ScrollView>
      );
    } else {
      visibleNode = <NoData></NoData>
    }
    return visibleNode;
  }

  

  getItemCount() {
    const {
      id,
      data,
    } = this.props.navigation.state.params;

    const {
      allOrdersDetailsMapping
    } = this.props;

    let orderLineData = allOrdersDetailsMapping[id];

    return (orderLineData && orderLineData.length ? orderLineData.length : 0);
  }

  getTotalOrderValueDiscount() {
	
		let value = 0;
    const {
      allOrdersDetailsMapping
    } = this.props;
    const {
      id,
      data,
    } = this.props.navigation.state.params;
    let orderLineData = allOrdersDetailsMapping[id];
   
    if(orderLineData){
      orderLineData.map((obj) => {
			
			if(obj.component_2__c)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))- (Number(obj.component_2__c))* Number(obj.quantity__c)
			else
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
		})}
		//console.log(value)
		return (value);
	}

	getTotalDiscount() {
	
		let value = 0;
    const {
      id,
      data,
    } = this.props.navigation.state.params;
    const {
      allOrdersDetailsMapping
    } = this.props;

    let orderLineData = allOrdersDetailsMapping[id];
    if(orderLineData){
      orderLineData.map((obj) => {
			
			if(obj.component_2__c)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.component_2__c))
			
		})}
		//console.log(value)
		return (value);
	}

	getTotalOrderValue() {
	
		let value = 0;
    const {
      allOrdersDetailsMapping
    } = this.props;
    const {
      id,
      data,
    } = this.props.navigation.state.params;
    let orderLineData = allOrdersDetailsMapping[id];
    if(orderLineData){
      orderLineData.map((obj) => {
			
			
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))
		})}
		//console.log(value)
		return (value);
	}

  render() {
    const {
      id,
      data
    } = this.props.navigation.state.params;
   
  

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <VisitOrderCartCard
          customerName={data.from_name}
          orderDate={data.order_date__c}
          items={this.getItemCount()}
          quantity={this.getTotalQuantity()}
          dark={true}
         
          orderValue={this.getTotalOrderValueDiscount()}
						orderValueWithoutDis={this.getTotalOrderValue()}
						//totalTax={this.getTotalTax(cart.items)}
						totalDiscount={this.getTotalDiscount()}
         // totalTax={data.total_tax__c}
        />
       <BlueButton 
                    title={'Add'} 
                    style={Styles.markLostButton} 
                    textStyle={Styles.markLostButtonText} 
                    onPress={() => {NavigationService.navigate('VisitBookOrder')
                    this.props.setAddOrderLineData({id:id ,status:true})
                  }}
                    >
                      <GenericIcon name="add-box" style={Styles.markLostButtonIcon}
                     // show={true}
                      />
                  </BlueButton>

        {this.getItemDetailsNode()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  fetchProductsLoader: state.products.fetchProductsLoader,
  fetchCategoryLoader: state.products.fetchCategoryLoader,
  fetchSubCategoryLoader: state.products.fetchSubCategoryLoader,
  fetchSubSubCategoryLoader: state.products.fetchSubSubCategoryLoader,
  productList: state.products.productList,
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
  allOrdersDetailsMapping: state.orders.allOrdersDetailsMapping,
  fetchOrderDetailsLoader: state.orders.fetchOrderDetailsLoader,
  deleteOrderLineLoader: state.retailers.deleteOrderLineLoader,
  editOrderQuantityLoader: state.retailers.editOrderQuantityLoader,
  
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderDetails: (params) => dispatch(OrdersActions.fetchOrderDetails(params)),
  deleteOrderLine: (params) => dispatch(RetailersActions.deleteOrderLine(params)),
  editOrderQuantity: (params) => dispatch(RetailersActions.editOrderQuantity(params)),
  setAddOrderLineData: (params) => dispatch(RetailersActions.setAddOrderLineData(params)),
  clearAddOrderLineData: () => dispatch(RetailersActions.clearAddOrderLineData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoScreen)
