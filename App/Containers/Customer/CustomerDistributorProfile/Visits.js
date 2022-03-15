import React, { Component } from "react";
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
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import SearchableDropdown from "App/Components/SearchableDropdown";

class Visits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: "",
    };
  }
  componentDidMount() {
    this.fetchCall();
  }
  fetchCall() {
    const { details, token } = this.props;

    this.props.getCustomerVisit({
      id: this.props.item.id,
      date: HelperService.dateReadableFormatWithHyphen(),
      token,
    });
    this.setState(() => ({
      obj: "",
    }));
  }

  getDataNode() {
    let visibleNode = [];

    const { details, loader } = this.props;

    if (details && details.length) {
      visibleNode = (
        <FlatList
          style={{ top: hp("3%"), height: hp("38%") }}
          contentContainerStyle={{ paddingBottom: hp("8%"), paddingTop: 10 }}
          data={details}
          keyExtractor={(item) => item.zx_customer}
          onRefresh={() => {this.fetchCall(),this.setState({obj:""})}}
          refreshing={loader}
          renderItem={({ item }) => (
            <DetailCard
              dark={false}
              style={{
                backgroundColor: Colors.white,
                borderColor: "#F66A676B",
                borderWidth: 0.5,
                right: hp("0.5%"),
                width: wp("85%"),
                height: hp("20%"),
              }}
              date={
                item.zx_visitdate
                  ? HelperService.getCurrentDate1(item.zx_visitdate) +
                    "\n" +
                    HelperService.getMonthMappingName(
                      HelperService.getCurrentMonth(item.zx_visitdate)
                    )
                  : "NA"
              }
              
              datestyle={Styles.date}
              // month={item.month}
              // monthstyle={Styles.month}
              heading1={"Visit Date"}
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
                  label={"Purpose"}
                  value={item.zx_visitobjective}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Visit Start"}
                  value={""}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Visit End"}
                  value={""}
                />,
                <DetailCardStrip
                  labelStyle={Styles.ttl}
                  valueStyle={{ ...Styles.detail }}
                  label={"Remarks"}
                  value={""}
                />,
              ]}
            />
          )}
        />
      );
    } else if (loader) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !loader)) {
      visibleNode = (
        <View style={{height:hp("20%")}}>
        <NoDataFound text={"No Visits found."}>
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
        </View>
      );
    } else {
      visibleNode = <NoDataFound text={"Not Visit Found"} />;
    }
    return visibleNode;
  }

  render() {
    const { details,token } = this.props;
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
      <View style={{top:hp("-6%")}}>
        <View
          style={{
            height: hp("8%"),
            top: hp("1%"),
            alignSelf: "center",
            width: wp("88%"),
          }}
        >
          <SearchableDropdown
            dataSource={[
              { id: "Order", name: "Order" },
              { id: "Collection", name: "Collection" },
              { id: "Relationship Building", name: "Relationship Building" },
              { id: "New Product Demo", name: "New Product Demo" },
              { id: "Issues Resolution", name: "Issues Resolution" },
              { id: "Meet", name: "Meet" },
              { id: "Workshop", name: "Workshop" },
              { id: "Others", name: "Others" },
              { id: "", name: "All" }
            ]}
            placeHolderText={"Select Objective"}
            selectedValue={this.state.obj}
            onChange={(value) => {
              this.props.getCustomerVisit({
                id: this.props.item.id,
                objective: value,
                date: HelperService.dateReadableFormatWithHyphen(),
                token,
              }),
                this.setState({ obj: value });
            }}
            placeholder={"Type or Select Objective"}
            invalid={false}
            customPickerStyles={{ width: wp("85%"), left: wp("0.2%") }}
            labelStyles={{
              color: Colors.darkRedPink,
              fontFamily: ApplicationStyles.textFont,
              textAlign: "center",
              //   width: "99%",
              //  padding:5,
              fontSize: 16,
              fontWeight: "bold",
              flexDirection: "row",
            }}
          />
        </View>
        <View>{this.getDataNode()}</View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerVisit,
  loader: state.retailers.getCustomerVisitLoader,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerVisit: (params) =>
    dispatch(RetailersActions.getCustomerVisit(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Visits);
const Styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontFamily: "Rubik",
    color: Colors.background,
    // left: hp("3%"),
    top: hp("4%"),
    textAlign: "center",
    fontWeight: "bold",
  },

  head1: {
    fontSize: 13,
    fontFamily: "Rubik",
    left: hp("0.8%"),
    top: hp("5%"),
    color: Colors.lightGrey,
  },

  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("1%"),
    top: hp("1%"),
    left: wp("11%"),
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3%"),
    fontFamily: "Rubik",
    fontWeight: "bold",
    bottom: hp("5%"),
    left: wp("18%"),
    top: hp("1%"),
    width: wp("30%"),
    // paddingBottom:hp("3%")
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
});
