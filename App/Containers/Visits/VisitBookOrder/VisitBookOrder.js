import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList, Dimensions, Modal, ImageStore} from 'react-native'
import ImageViewer from "react-native-image-zoom-viewer";
import { Button, Text, Icon, Col } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './VisitBookOrderStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import ProductCard from 'App/Components/ProductCard'
import ProductInfoCard from 'App/Components/ProductInfoCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import SearchBar from 'App/Components/SearchBar'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import ProductActions from 'App/Stores/Products/Actions'
import BookOrderFilters from 'App/Containers/Visits/BookOrderFilters';
import { Colors } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Select from 'App/Components/Select';


class VisitBookOrder extends React.Component {
	state = { imageViewerModalVisible: false, productImagesToShowInModal: [] };
	
	componentDidMount() {
    	const {
      		productList,
			  executeVisitData,
			  getParentAreas,
			  token,
			  fetchProductCategories,
			  selectedRetailer
    	} = this.props;
		//let navParams = this.props.navigation.state.params;
		//let id =  navParams && navParams.id ? navParams.id : '';

		if(selectedRetailer.id)
		{
			fetchProductCategories({token ,
				type: this.props.user_details.business_channel__c ,
				party: selectedRetailer.id
				})
				
		}
		getParentAreas({token})
  		//this.fetchProductsCall();
	  }
	  
	  componentWillUnmount() {
	this.props.clearProductFilter();
	}

  	fetchProductsCall() {
	    const {
	      token,
	      agentid,
	      productLimit,
    	  productOffset,
	      fetchProducts,
	      executeVisitData
	    } = this.props;

	    fetchProducts({
	      	token, 
	      	agentid, 
	      	offset: productOffset,
	      	priceListSfid: executeVisitData.price_list_sfid__c || 'a0q2x000001Fcz6AAC'
	    });
  	}

  	isPresentInCartValue(itemId) {
  		const {
	      cart
	    } = this.props;

	   let itemPresentValue = 0;
	   cart.items.map((obj) => {
	   		if (obj.product_item__c == itemId.id&&obj.size == itemId.size&&obj.packaging == itemId.packaging) {
	   			itemPresentValue = obj.quantity__c
	   		}
	   });
	   return itemPresentValue
  	}

  	onChangeQuantity(params) {
  		const {
  		 	addItemToCart,              
  			removeItemFromCart   
  		} = this.props;

  		if (params.quantity__c == 0) {
  			removeItemFromCart(params);
  		}else {
  			addItemToCart(params)
  		}
		}

		onChangeQuantity(params) {
			const {
				 addItemToCart,              
				removeItemFromCart   
			} = this.props;
  
			if (params.quantity__c == 0) {
				removeItemFromCart(params);
			}else {
				addItemToCart(params)
			}
		  }
			  
		
		getProductImages = productData => {
			let images=[];
			for(let url of productData.product_url__c)
			{
				images.push({url})		

			}
			return images;
		}
	

		onProductImageClick = async productData => {
			let productImages =  this.getProductImages(productData);
			if (productImages && productImages.length) {
				this.setState({ imageViewerModalVisible: true, productImagesToShowInModal: productImages });
			}
		}

		closeProductImageViewer = () => {
			this.setState({ imageViewerModalVisible: false, productImagesToShowInModal: [] });
		}


	getCardNode(data) {
		const {
			openModal,
			searchFilters,
			productSizeForm,
			changeSizeForm,
			BrandList  
		} = this.props;

		return (
			<ProductCard 
				data={data} 
				productName={searchFilters.selectedSubSubCategories.name?searchFilters.selectedSubSubCategories.name:''}
				quantityInCart={this.isPresentInCartValue({id :data.sfid,size:data.size,packaging: data.packaging} )}
				onChangeQuantity={(quantity) => this.onChangeQuantity({quantity__c: quantity, product_item__c: data.sfid, exmill_price: data.exmill_value__c?data.exmill_value__c.replace(/[^0-9\.]+/g,""):'',product_family__c:searchFilters.selectedCategories, product_variant__c:searchFilters.selectedSubSubCategories.sfid,  width:data.width, length: data.length, size:data.size,packaging: data.packaging,brand__c: data.brand })}
				onRemoveClick={() => this.props.removeItemFromCart({ product_item__c: data.sfid})}
				productSizeForm={productSizeForm}
				changeSizeForm={changeSizeForm}
				//onImageClick={() => {
					//this.onProductImageClick(data);
				//}}
				//onPressInfo={() => {
					//return openModal({
							//content: <ProductInfoCard data={data} />, 
						//	heading: 'Product Info', 
							//bodyFlexHeight: .5
					//})}
				//}
			/>
		);
	}

	filterResults(list) {
	    //let searchFilters = this.props.searchFilters;
		//console.log(this.props.sizeSearchFilters['searchBy'])
	    // filteredList = HelperService.searchTextListFilter(list, 'product_name__c', searchFilters['name']);
	    //filteredList = HelperService.searchArrayListFilter(filteredList, searchFilters['selectedCategories'], 'product_category__c');
	    //filteredList = HelperService.searchArrayListFilter(filteredList, searchFilters['selectedSubCategories'], 'product_sub_category__c');
		//let filteredList = HelperService.searchArrayListFilter(list, searchFilters.selectedSubSubCategories.name, 'gsm_name');
		let filteredList = HelperService.searchTextListFilter(list, 'size', this.props.sizeSearchFilters['searchBy']);
		filteredList = HelperService.searchTextListFilter(filteredList, 'packaging', this.props.sizeSearchFilters['searchValue']);
	    return filteredList;
	  }
	  
	  scrollToIndex(index){
		let distanceToBeScrolled = (index)*wp('23%');
		if (this.flatListRef){
		  this.flatListRef.scrollTo({x: distanceToBeScrolled, y: 0, animated: true});
		}
	  }

  	render() {
	  	const {
	  		token,
  			agentid,
  			openModal,						
 			fetchProductsLoader,		
    		fetchCategoryLoader,		
    		fetchSubCategoryLoader, 	
    		fetchSubSubCategoryLoader,
    		productList,			
    		filteredProductList,	
    		//productCategoryList,		
    		productSubCategoryList,	
    		productSubSubCategoryList,
    		searchFilters,			
    		categoryOffset,			
    		categoryLimit,			
    		productLimit,			
			productOffset,
			fetchItemLoader,
			productItemList,
			changeSearchFilters	,
			productCategoryList	,
			productGsmList,	
			productBrandList,
			sizeList,
			sizeSearchFilters,	
			updateSearchFilters,
			packagingList,
	  	} = this.props;

	  	let visibleNode = [];

	  	if (productItemList && productItemList.length) { 
	  		let filteredProductList = this.filterResults(productItemList); 
	  		if (filteredProductList.length) { 
		        visibleNode = (
		            <FlatList
		              data={filteredProductList}
		              renderItem={({ item }) => this.getCardNode(item)}
		             // onRefresh={() => this.fetchProductsCall()}
		              keyExtractor={(item , index)=> item+ index}
		              refreshing={fetchProductsLoader}
		            />
		        );
		    }else {
		    	visibleNode = (
	        		<NoDataFound text={'No Products for this criteria.'}></NoDataFound>
	        	);
		    }
	    }else if(fetchItemLoader){
	        visibleNode = <Loading />
	    }else if(productList && !productList.length && !fetchItemLoader) {
	        visibleNode = (
	        	<NoDataFound text={'No Products.'}></NoDataFound>
	        );
	    }

	    return (
	    	<View style={{...Style.container,backgroundColor:Colors.lightGrey}}>
					<Modal
						transparent={true}
						visible={this.state.imageViewerModalVisible}
						onRequestClose={this.closeProductImageViewer}
					>
						<ImageViewer
							imageUrls={this.state.productImagesToShowInModal}
							saveToLocalByLongPress={false}
							backgroundColor={Colors.overlay}
							
							onCancel={this.closeProductImageViewer}
							enableSwipeDown={true}
							renderHeader={() => (
								<TouchableHighlight
									onPress={this.closeProductImageViewer}
									style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
								>
									<GenericIcon name={'close-circle'} style={{fontSize: 40, color: Colors.white}} />
								</TouchableHighlight>
							)}
						/>
				
				
					</Modal>
					<View 
              
			  style={{flexDirection:'row', backgroundColor:Colors.white }}
             >
	            	
               
              <WhiteButton 
                 title={`Product ${productCategoryList	 ? '(' + productCategoryList + ')' : ''}`} 
                  style={{...Style.actionButton, ...Style.customSelectedStyleCorpBlue, marginTop:wp('3%'), marginLeft:wp('2%')}}
                  textStyle={Style.actionButtonText}
				  onPress={() => {
					openModal({
						content: (<BookOrderFilters />), 
						heading: 'filter',
						bodyFlexHeight: 1
					});
					changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'Product'})}
				}   
                 //selected={currentScreen == 'VisitBookOrder'}
                 customSelectedStyle={{...Style.customSelectedStyleCorpBlue, ...Style.selected}}
                 customSelectedTextStyle={Style.customSelectedTextStyle}
                />
                 <WhiteButton 
                 title={`Brand${productBrandList ? '(' + productBrandList + ')' : ''}`} 
                  style={{...Style.actionButton, ...Style.customSelectedStyleCorpBlue, marginTop:wp('3%'),marginLeft:wp('2%')}}
                  textStyle={Style.actionButtonText}
				  onPress={() => {
					openModal({
						content: (<BookOrderFilters />), 
						heading: 'filter',
						bodyFlexHeight: 1
					});
					changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'Brand'})}
				  	}	 
                 //selected={currentScreen == 'VisitBookOrder'}
                 customSelectedStyle={{...Style.customSelectedStyleCorpBlue, ...Style.selected}}
                 customSelectedTextStyle={Style.customSelectedTextStyle}
                />
                  <WhiteButton 
                 title={`GSM ${productGsmList ? '(' + productGsmList + ')' : ''}`} 
                  style={{...Style.actionButton, ...Style.customSelectedStyleCorpBlue, marginTop:wp('3%')}}
                  textStyle={Style.actionButtonText}
				  onPress={() => {
					openModal({
						content: (<BookOrderFilters />), 
						heading: 'filter',
						bodyFlexHeight: 1
					});
					changeSearchFilters({edited_field: 'selectedCategoryParentFilter', edited_value: 'GSM'})}
				} 
                // selected={currentScreen == 'VisitBookOrder'}
                 customSelectedStyle={{...Style.customSelectedStyleCorpBlue, ...Style.selected}}
                 customSelectedTextStyle={Style.customSelectedTextStyle}
                /> 
            

	            
                 
                   
                
              
               
               
            	</View> 
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>

		{ 
		
		productItemList&&productItemList.length&&sizeList&&sizeList.length?		
             <Select style={Style.selectPickerStyle}
            placeholder={'Select Size'}
            list={this.props.sizeListAll}
            selected={sizeSearchFilters['searchBy']}
            onChange={(value) => updateSearchFilters({ edited_field: 'searchBy', 'edited_value': value })} 
          />
		  :[]
		}   
			{
			
			productItemList&&productItemList.length&&packagingList&&packagingList.length?		
             <Select style={Style.selectPickerStyle}
            placeholder={'Select Pacakage'}
            list={this.props.packagingListAll}
            selected={sizeSearchFilters['searchValue']}
            onChange={(value) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': value })} 
          />
		  :[]
		}  
		</View>   
	    {		
				/*		<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
		    		<SearchBar 
		              placeholder={`Search product name`} 
		              onInputChange={(text) => changeSearchFilters({edited_field: 'name', edited_value: text})} 
		              onInputSubmit={(text) => changeSearchFilters({edited_field: 'name', edited_value: text})} 
		              onInputClear={(text)  => changeSearchFilters({edited_field: 'name', edited_value: text})} 
		              value={searchFilters['name']} 
		              ContainerStyles={{
		              	width: Math.round(Dimensions.get('window').width - 120), 
		              	backgroundColor: Colors.clrF1F9FF, 
		              	borderWidth: 1, 
		              	borderRadius: 100, 
		              	borderBottomWidth: 0, 
		              	marginBottom: 8,
		              	textAlign: 'left',
		              	flexDirection: 'row',
		              	justifyContent: 'flex-start'
		              }}
	            	/>
	            	<WhiteButton
	            		title="FILTER"
	            		textStyle={{fontSize: 11, paddingLeft: 8, flexWrap: 'wrap'}} 
	            		onPress={() => 
	            			openModal({
								content: (<BookOrderFilters />), 
								heading: 'Filters',
								bodyFlexHeight: 1
							})
	            		}
	            		style={{ 
	            			backgroundColor: Colors.clrF1F9FF, 
	            			borderWidth: 0,
	            			height: 42,
	            			marginLeft: 10,
	            			marginTop: 2,
	            			flexDirection: 'row',
	            			width: Math.round(Dimensions.get('window').width - (Dimensions.get('window').width - 120) - 30)
	            		}}>
	            		 <GenericIcon 
			              	name={'funnel'}
			              	style={{color: Colors.button, fontSize: 25, paddingRight: 0, marginRight: 0}}
			            />
	            	</WhiteButton>
				</View> */
					}
					
		       	{visibleNode}
				 
		    </View>
	    )
  	}
}

const mapStateToProps = (state) => ({
  	token						: state.user.token,
  	agentid						: state.user.id,
 	fetchProductsLoader			: state.products. fetchProductsBrandLoader,
    fetchCategoryLoader			: state.products.fetchCategoryLoader,
    fetchSubCategoryLoader	 	: state.products. fetchGsmLoader,
    fetchSubSubCategoryLoader	: state.products.fetchSubSubCategoryLoader,
 
    filteredProductList			: state.products.filteredProductList,
    productCategoryList			: state.products.productCategoryList,
    productSubCategoryList		: state.products.productGsmList,
    productSubSubCategoryList	: state.products.productSubSubCategoryList,
    searchFilters				: state.products.searchFilters,
    categoryOffset				: state.products.categoryOffset,
    categoryLimit				: state.products.categoryLimit,
    productLimit				: state.products.productLimit,
	productOffset				: state.products.productOffset,
	productSizeForm				: state.products.productSizeForm,
    cart 						: state.visits.cart,
	executeVisitData            : state.visits.executeVisitData,
	productItemList				: state.products.productItemList,
	sizeList				    : state.products.sizeList,
	BrandList   				: state.products.BrandList,
	sizeListAll					: [{value: '', label: 'ALL'}].concat(state.products.sizeList),
	packagingList			    : state.products.packagingList,
	packagingListAll			:[{ value: '', label: 'ALL' }].concat(state.products.packagingList),
	fetchItemLoader				: state.products.fetchItemLoader,
	productCategoryList				: state.products.productCategoryList.length||'',
	productGsmList				: state.products.productGsmList.length||'',
	productBrandList				: state.products.productBrandList.length||'',
	user_details: state.user.user_details,
	selectedRetailer: state.retailers.selectedRetailer,
	sizeSearchFilters : state.products.sizeSearchFilters,
	agentDistChannel : state.common.agentDistChannel,
	agentAllPlant:   state.common.agentAllPlant,
	
});

const mapDispatchToProps = (dispatch) => ({
  openModal:(params)		 			=> dispatch(CommonActions.openModal(params)),
  disableModal:(params)		 			=> dispatch(CommonActions.disableModal(params)),
  fetchProducts:(params)		 		=> dispatch(ProductActions.fetchProductsBrand(params)),
  fetchProductCategories:(params)		=> dispatch(ProductActions.fetchProductCategories(params)),
  fetchProductSubCategories:(params)	=> dispatch(ProductActions.fetchProductGsm(params)),
  fetchProductSubSubCategories:(params)	=> dispatch(ProductActions.fetchProductSubSubCategories(params)), 
  changeSizeForm:(params)	=> dispatch(ProductActions.changeSizeForm(params)),
  changeSearchFilters:(params)		 	=> dispatch(ProductActions.changeSearchFilters(params)),
  addItemToCart:(params)                => dispatch(VisitsActions.addItemToCart(params)),
  removeItemFromCart:(params)           => dispatch(VisitsActions.removeItemFromCart(params)),
  getParentAreas:(params)           => dispatch(VisitsActions.getParentAreas(params)),
  clearProductFilter: () => dispatch(ProductActions.clearProductFilter()),
  updateSearchFilters : (params) => dispatch(ProductActions.updateSizeSearchFilters(params)),


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitBookOrder)

