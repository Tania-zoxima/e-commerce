import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import GenericIcon from "App/Components/GenericIcon";

import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
// import BlueButton from "../../Components/BlueButton";
import DatePicker from "App/Components/DatePicker";
import SearchBar from "App/Components/SearchBar";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import NavigationService from "App/Services/NavigationService";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Icon } from "native-base";

class Invoices extends React.Component {
  // const [data, setdata] = useState([
  //   {
  //       order:"INV-97768",
  //       date: "29",
  //       id: "1",
  //       month: "june 2021",
  //       name:"No.:34587-1788123",

  //       itemClass:"Fittings",
  //       No:"898242",
  //       Amount:"Rs 4494.7",

  //     },

  // ]);
  componentDidMount() {
    this.fetchCall()
    
  }
  fetchCall() {
    const { details } = this.props;

    this.props.getCustomerInvoice({
      id: this.props.item.id,
    });
  }
  // getDataNode() {
  //   let visibleNode = [];
  //   let id=this.props.item.id;
  //   const { details,loader } = this.props;

  //   if (details && details.length) {
  //     visibleNode = (
  //       <FlatList
  //         style={{ top: hp("2%"), marginBottom: "10%" }}
  //         data={details}
  //         onRefresh={() => this.fetchCall()}
  //         refreshing={loader}
  //         keyExtractor={(item) => item.zx_invoiceid}
  //         renderItem={({ item }) => (
  //           <DetailCard
  //             dark={false}
  //             style={{
  //               backgroundColor: Colors.white,
  //               borderColor: "#F66A676B",
  //               borderWidth: 0.5,
  //               right: hp("0.5%"),
  //               width: wp("89%"),
  //             }}
  //             heading={item.zx_invoiceid}
  //             headstyle={Styles.head}
  //             // date={item.zx_visitdate?HelperService.dateReadableFormatwithmonthname(item.zx_visitdate):"1"}
  //             // datestyle={Styles.date}
  //             // month={"Sept 2021"}
  //             // monthstyle={Styles.month}
  //             // heading1={"No:-34587-1788123"}
  //             // head1style={Styles.head1}
  //             onPress= {() =>  NavigationService.navigate('InvoiceDetail',{id:id})}
  //             // heading2={"34587-1788123"}
  //             // head2style={Styles.head2}
  //             content={[
  //               <DetailCardStrip
  //                 labelStyle={Styles.ttl}
  //                 valueStyle={Styles.detail}
  //                 label={"Item Class"}
  //                 value={item.zx_invoicetype?item.zx_invoicetype:"NA"}
  //               />,
  //               <DetailCardStrip
  //                 labelStyle={Styles.ttl}
  //                 valueStyle={Styles.detail}
  //                 label={"No"}
  //                 value={item.zx_invoicelineid?item.zx_invoicelineid:"na"}
  //               />,
  //               <DetailCardStrip
  //                 labelStyle={Styles.ttl}
  //                 valueStyle={{ ...Styles.detail }}
  //                 label={"Amount"}
  //                 value={item.zx_totalamount?item.zx_totalamount:"na"}
  //               />,
  //             ]}
  //           />
  //         )}
  //       />
  //     );
  //   } else if (loader) {
  //     visibleNode = <Loading />;
  //   } else if (!details || (details && !details.length && !loader)) {
  //     visibleNode = (
  //       <NoDataFound text={"No Invoice found."}>
  //         <GenericIcon
  //           name={"refresh"}
  //           show={true}
  //           onPress={() => this.fetchCall()}
  //           style={{
  //             color: Colors.button,
  //             fontSize: 25,
  //             alignSelf: "center",
  //             padding:10,
  //           }}
  //         />
  //       </NoDataFound>
  //     );
  //   }
  //   else {
  //     visibleNode = <NoDataFound text={"Not Invoice Found"} />;
  //   }
  //   return visibleNode;
  // }

  

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['area'])

    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_invoiceid",
      searchFilters["name"]
    );
    filteredList = HelperService.sortListFilter(
      filteredList,
      "zx_invoiceid",
      "ASC"
    );

    return filteredList;
  }

getDataNode(){
  let visibleNode = [];
  const { details, Approved, loader, token, loading } = this.props;
  let id=this.props.item.id;


  // console.log("detailsssaajajja", details);

  if (details && details.length) {
    let searchedFilteredList = this.filterResults(details);
    // console.log("seacrrrrrrrrrAKK",searchedFilteredList)
    if (searchedFilteredList) {
      visibleNode = (

  <FlatList
          style={{height:hp("38%") }}
          data={searchedFilteredList}
          keyExtractor={(item) => item.zx_invoiceid}
          contentContainerStyle={{ paddingBottom:hp("5%"),paddingTop:10}}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                right: hp("0.5%"),
                width: wp("85%"),
                // marginTop:hp("-1%")
              }}
              heading={item.zx_invoiceid}
              headstyle={Styles.head}
              date={item.zx_invoicedate?HelperService.getCurrentDate1(
                item.zx_invoicedate
              ):"NA"}
              datestyle={Styles.date}
              month={item.zx_invoicedate?HelperService.getMonthMappingName(HelperService.getCurrentMonth(
                item.zx_invoicedate
              )):"NA"}
              monthstyle={Styles.month}
              // heading1={"No:-34587-1788123"}
              // head1style={Styles.head1}
              onPress= {() =>  NavigationService.navigate('InvoiceDetail',{id:item.Id})}
              // heading2={"34587-1788123"}
              // head2style={Styles.head2}
              content={[
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Item Class"}
                  value={item.zx_invoicetype?item.zx_invoicetype:"NA"}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"No"}
                  value={item.zx_invoicelineid?item.zx_invoicelineid:"na"}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Amount"}
                  value={item.zx_totalamount?"₹"+item.zx_totalamount:"na"}
                />,
              ]}
            />
          )}
        />
        );
      } else {
        visibleNode = <NoDataFound text={"No Data Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !loading)) {
      visibleNode = (
        <NoDataFound text={"No Invoices found."}>
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
      );
    }

    return visibleNode;
            }

  render() {
    const { details, changeInvoiceSearchFilters, searchFilters } = this.props;
    // console.log("invicesdata", details);
    let id=this.props.item.id
    return (
      <ScrollView style={{top:hp("-6%")}}>
        <View style={Styles.mainContainer}>
          <SearchBar
          onInputChange={(text) => changeInvoiceSearchFilters({ edited_field: 'name', 'edited_value': text })}
          onInputSubmit={(text) => changeInvoiceSearchFilters({ edited_field: 'name', 'edited_value': text })}
          onInputClear={(text) => changeInvoiceSearchFilters({ edited_field: 'name', 'edited_value': '' })}
           value={searchFilters['searchValue']}

            placeholder={"Search Invoice"}
            ContainerStyles={Styles.searchContainer}
          />

{/* <TouchableOpacity style={{flexDirection:'row'}}
        onPress={() => NavigationService.navigate('CustomerFilters')}>
        <Text
          style={{ fontSize: 15, color: "#F66A67", left: "0%", }}
        >
          Filter by
        </Text>
        <GenericIcon 
			              	name={'tune'}
			              	style={{color: Colors.button, fontSize: 23, paddingRight: 0, left:"10%",}}
			            />
        </TouchableOpacity> */}





          {/* <Text
            style={{
              color: Colors.background,
              fontWeight: "bold",
              fontSize: 15,
              top: hp("-2%"),
              left: hp("2.5%"),
            }}
          >
            NOV 2020
          </Text>

          <GenericIcon
            name={"chevron-left"}
            style={{
              fontSize: 25,
              backgroundColor: Colors.background,
              borderRadius: 15,
              color: "white",
              top: hp("-2%"),
              left: hp("1.5%"),
            }}
          />

          <GenericIcon
            name={"chevron-right"}
            style={{
              fontSize: 25,
              backgroundColor: Colors.background,
              borderRadius: 15,
              color: "white",
              top: hp("-2%"),
            }}
          /> */}
        </View>
        {this.getDataNode()}
        
        
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerInvoice,
  searchFilters: state.retailers.invoiceSearchFilters,
  loading: state.retailers.getCustomerInvoiceLoader,
  

});

const mapDispatchToProps = (dispatch) => ({
  getCustomerInvoice: (params) =>
    dispatch(RetailersActions.getCustomerInvoice(params)),
    changeInvoiceSearchFilters: (params) =>
    dispatch(RetailersActions.changeInvoiceSearchFilters(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: hp("2%"),
    display: "flex",
    flexDirection: "row",
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.background,
    fontSize: 34,
    paddingRight: 360,
    paddingTop: 15,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    bottom: hp("1%"),
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },

  date: {
    fontSize: 30,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("3%"),
    textAlign:"center",
    // fontWeight:"bold"
  },
  month: {
    fontSize: 18,
    fontFamily: "Rubik",
    color: Colors.background,
    // fontWeight: "bold",
    top: hp("1%"),
    textAlign:"center",
  },
  head: {
    fontSize: 16,
    fontFamily: "Rubik",
    // left: hp("1.5%"),
    fontWeight: "bold",
    color: Colors.background,
    position:"absolute"
  },
  head1: {
    fontSize: 11,
    fontFamily: "Rubik",
    left: hp("-0%"),
    fontWeight: "bold",
    top: hp("0.6%"),
    color: Colors.cardblue,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("4%"),
    left: wp("10%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    left: wp("30%"),
    top: hp("4%"),
  },
  searchContainer: {
    width: wp("50%"),
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
    right:wp("18%")
  },
});
