import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import DatePicker from "App/Components/DatePicker";
// import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DisplayCard from "App/Components/DetailCard/DetailCard";
import DisplayCardStrip from "App/Components/DetailCard/DetailCardStrip";
import NavigationService from "App/Services/NavigationService";
import OrdersActions from "App/Stores/Orders/Actions";
import { connect } from "react-redux";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Tab, Tabs, Icon } from "native-base";
import SearchBar from "App/Components/SearchBar";
import CompetitorActions from "App/Stores/Competitor/Actions";
import { Col } from "react-native-table-component";

class TransportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }
  componentDidMount(){
    // 
    this.fetchCall()
  }
   
      onSelectTransport(params) {
        // console.log("ppppppppp",params)
        // NavigationService.navigate("TransportDetail");
        this.props.selectTransport(params);
        this.props.setModalVisible();
      }

      fetchCall() {
        const { getTransport, token,id} = this.props;
    
        getTransport({
          token,
        })
      }

      filterResults(list) {
        // console.log("lisstttt",list);
        const { searchFilters } = this.props;
        let filteredList = HelperService.sortListFilter(
          list,
          "zx_transportername",
          "ASC"
        );
        filteredList = HelperService.searchTextListFilter(filteredList, 'zx_transportername', searchFilters['name']);
    // console.log("ddddddddd",filteredList)
        return filteredList;
      }

      getDataNode() {
        let visibleNode = [];
    
        const { details, transportloader,addressloader } = this.props;
    
        if (details && details.length) {
          let searchedFilteredList = this.filterResults(details);
          // console.log("seacrrrrrrrrr",searchedFilteredList)
          if (searchedFilteredList) {
          visibleNode = (
            <FlatList
          style={{ top: "4%", marginBottom: hp("10%") }}
          data={searchedFilteredList}
          onRefresh={() => this.fetchCall()}
            refreshing={transportloader}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
              onPress={() => this.onSelectTransport(item)}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 1.5,
                width: wp("80%"),
                height: hp("19%"),
              }}
              heading={item.zx_transportername}
              headstyle={Styles.head}
              heading1={item.zx_transportcode}
              head1style={Styles.head1}
              content={[
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Address"}
                  value={item.zx_contactperson}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Phone"}
                  value={item.zx_mobile}
                />,
                <DisplayCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Contact"}
                  value={item.zx_phone}
                />,
              ]}
            />
          )}
        />
          );
        } else if (transportloader) {
          visibleNode = <Loading />;
        } else if (!details || (details && !details.length && !transportloader)) {
          visibleNode = (
            <NoDataFound text={"No Data found."}>
              <Icon
                name={"refresh"}
                onPress={() => this.fetchCall()}
                style={{
                  color: Colors.button,
                  fontSize: 25,
                  alignSelf: "center",
                  padding: "2%",
                }}
                type={"FontAwesome"}
              />
            </NoDataFound>
          )};
        }
        else {
          visibleNode = <NoDataFound text={"No Data Found"} />;
        }
        return visibleNode;
      }
  render() {
    const { details, transportloader,searchFilters,changeCompetitorSearchFilters } = this.props;
    return (
      <View style={Styles.mainContainer}>
        <View style={{ width: wp("90%") }}>
            <SearchBar
              placeholder={"Search by name"}
              onInputChange={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: text,
                })
              }
              onInputSubmit={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: text,
                })
              }
              onInputClear={(text) =>
                changeCompetitorSearchFilters({
                  edited_field: "name",
                  edited_value: "",
                })
              }
              value={searchFilters["searchValue"]}
              ContainerStyles={Styles.searchContainer}
            />
          </View>
        {this.getDataNode()}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    distributor: state.distributor.DistributorList,
    details:state.orders.getTransport,
    transportloader: state.orders.getTransportLoader,
    searchFilters: state.competitor.searchFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
    selectTransport: (params) =>
    dispatch(OrdersActions.selectTransport(params)),
    getTransport: (params) =>
    dispatch(OrdersActions.getTransport(params)),
    changeCompetitorSearchFilters: (params) =>
    dispatch(CompetitorActions.changeCompetitorSearchFilters(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TransportData);

const Styles = StyleSheet.create({
  head: {
    fontSize: 17,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
    color: Colors.background,
    top: hp("-1%"),
    position:"absolute"
  },
  head1: {
    fontSize: 13.5,
    fontFamily: "Rubik",
    left: hp("1%"),
    fontWeight: "bold",
    top: hp("3%"),
    position:"relative"
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("6.5%"),
    // left: wp("-25%"),
    right:wp("10%"),
    position:"relative"
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    top: hp("6.5%"),
    position:"relative",
    left: wp("8%"),
  },
  searchContainer: {
    width: wp("80%"),
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingTop: 0,
    elevation: 10,
    backgroundColor: Colors.lightPink,
    fontSize: wp("4.8%"),
    fontWeight: "700",
    color: Colors.blue,
    height: hp("5%"),
    alignSelf: "center",
  },
});