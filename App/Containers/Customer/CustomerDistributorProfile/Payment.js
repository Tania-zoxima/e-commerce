import React, {Component} from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
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
import DatePicker from "App/Components/DatePicker";
import { Icon } from "native-base";
import { connect } from "react-redux";
import RetailersActions from "App/Stores/Retailers/Actions";
import SearchBar from "App/Components/SearchBar";


class Payment extends React.Component {
  componentDidMount() {

    this.props.getCustomerVisit({
      id:this.props.item.id
    });
  }

  render() {
    const { details } = this.props;
    // const [data, setdata] = useState([
    //   {
    //     date: "29",
    //     id: "1",
    //     month: "June 2021",

    //     visitStatus: "Closed",
    //     Purpose: "Order",
    //   },
    //   {
    //     date: "20",
    //     id: "1",
    //     month: "June 2021",

    //     visitStatus: "Closed",
    //     Purpose: "Relationship",
    //   },
    //   {
    //     date: "19",
    //     id: "1",
    //     month: "June 2021",

    //     visitStatus: "Closed",
    //     Purpose: "Daily Visit",
    //   },
    // ]);
    let datePickerNode = (
      <View>
        <GenericIcon
          name={"calendar"}
          show={true}
          style={{ fontSize: 18, color: "white", backgroundColor: "#ed1b24" }}
        />
      </View>
    );
    return (
      <View >
        <View style={{ display: "flex", flexDirection: "row",left:wp("5%"),top:hp("2%")}}>
        <SearchBar
          placeholder={"Search Payment"}
          ContainerStyles={Styles.searchContainer}
        />
        {/* <Text
          style={{ fontSize: 12, color: "#F66A67", left: "55%", top: "4%" }}
        >
          Filter by
        </Text>
        <View style={{ left:wp("15%"),top: "4%" }}>
          <DatePicker
            iconStyle={{ marginBottom: 0 }}
            allowRangeSelection={true}
            onDateChange={(params) => this.onDateChange(params)}
          >
            {datePickerNode}
          </DatePicker>
        </View> */}
        </View>
        <FlatList
          style={{ top: hp("-1%"), marginBottom: "0%" }}
          data={details}
          keyExtractor={(item) => item.zx_customer}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                right: hp("0.5%"),
                width: wp("89%"),
                // height: hp("11%"),
              }}
              date={HelperService.dateReadableFormatwithmonthname(item.zx_visitdate)}
              datestyle={Styles.date}
              // month={item.month}
              // monthstyle={Styles.month}
              heading1={"Payment Date"}
              head1style={Styles.head1}
              content={[
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={Styles.detail}
                  label={"Visit Status"}
                  value={item.zx_visitstatus}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Payment Mode"}
                  value={item.zx_visitobjective}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Reference no"}
                  value={""}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Invoice no"}
                  value={""}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Amount"}
                  value={""}
                />,
              ]}
            />
          )}
        />
        <TouchableOpacity
                    style={Styles.plusIcon}>
                    {/* onPress={() => {NavigationService.navigate("CreateComplaint",{id:id});this.props.clearForm()}} */}
                  
                  <Icon
                        name={'ios-add'}
                        ios={'ios-add'}
                        android={'md-add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerVisit,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerVisit: (params) =>
    dispatch(RetailersActions.getCustomerVisit(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
const Styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("4%"),
    textAlign:"center",
    fontWeight:"bold"
  },
  

  head1: {
    fontSize: 13,
    fontFamily: "Rubik",
    // left: hp("0.8%"),
    top: hp("5%"),
    color: Colors.lightGrey,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("4%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("1%"),
    left: wp("11%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("4%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("5%"),
    left: wp("18%"),
    top: hp("1%"),
    width:wp("30%"),
    // paddingBottom:hp("3%")
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
  },
  plusIcon: {
    borderRadius: 50,
// bottom: 40,
position: "absolute",
// left: 10,
top:hp("45%"),
left:wp("80%"),
borderRadius: 50,
height: 45,
width: 45,
backgroundColor: Colors.button,
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
zIndex:100
}, 
});