import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "../../Components/GenericDisplayCard/GenericDisplayCardStrip";
import GenericDisplayCard from "../../Components/GenericDisplayCard/GenericDisplayCard";
import NoDataFound from "App/Components/NoDataFound";
import ProjectActions from "App/Stores/Project/Actions";
import WhiteButton from "App/Components/WhiteButton";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";

export class ProductOffer extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const { project, token, code } = this.props;
    this.props.getProductOffer({
      projectId: project.zx_projectid,
      token,
    });
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
    };
    this.props.addProductToCart(data);
  }

  isAddedInCart(item) {
    const { cartItem, form } = this.props;

    let isPresent = false;

    cartItem.map((obj) => {
      if (obj.name == item.id && obj.name == item.id) {
        isPresent = true;
      }
    });
    return isPresent;
  }

  render() {
    const { data, loading, code } = this.props;
    let visibleNode = [];
    if (data && data.length) {
      visibleNode = (
        <FlatList
          data={data}
          style={{ height: hp("70%") }}
          contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
          onRefresh={() => this.fetchCall()}
          renderItem={({ item }) => (
            <GenericDisplayCard
              dark={false}
              style={{ width: "88%", elevation: 0 }}
              key={item.id}
              // showSingleAddToCartAction={true}
              // onPressAddToCart={() =>
              //   this.onPressAddToCart({
              //     zx_productname: item.zx_productname,
              //     zx_productcode: item.zx_productcode,
              //   })
              // }
              // isAddedInCart={this.isAddedInCart({
              //   zx_productname: item.zx_productname,
              //   zx_productcode: item.zx_productcode,
              // })}
              // disableAddCart={this.isAddedInCart({
              //   zx_productname: item.zx_productname,
              //   zx_productcode: item.zx_productcode,
              // })}
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
          ListEmptyComponent={() => (
            <NoDataFound text={"No Data Found"} />
          )}
        />
      );
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (data && !data.length && !loading) {
      visibleNode = <NoDataFound text={"No Data Found"} />;
    }
    return (
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
          // onPress={ () => this.props.createProjectProduct({form: item,token,id:item.Id})}
          onPress={() => NavigationService.navigate("AddProduct")}
          title={"Add Products"}
          textStyle={{ color: Colors.white, fontSize: 14 }}
        ></WhiteButton>
        {visibleNode}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    code: state.user.user_details,
    project: state.project.projectForm,
    loading: state.project.getProductOfferLoader,
    data: state.project.getProductOffer,
    cartItem: state.project.cart.cartItem,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProductOffer: (params) => dispatch(ProjectActions.getProductOffer(params)),
  addProductToCart: (params) =>
    dispatch(ProjectActions.addProductToCart(params)),
  createProjectProduct: (params) =>
    dispatch(ProjectActions.createProjectProduct(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductOffer);
