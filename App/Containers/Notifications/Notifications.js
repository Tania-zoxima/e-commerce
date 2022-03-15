import React, { Component } from "react";
import { View, Image, Text, FlatList } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CommonActions from "App/Stores/Common/Actions";
import { connect } from "react-redux";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "App/Services/Utils/HelperService";
class Notifications extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const { agentid, token } = this.props;
    this.props.getAllNotifications({
      token,
      id: agentid,
    });
  }

  getDataNode() {
    let visibleNode = [];

    const { data, Approved, loader, token, loading } = this.props;

    // console.log("datassaajajja", details);

    if (data && data.length) {
      // let searchedFilteredList = this.filterResults(data);
      // console.log("seacrrrrrrrrr", searchedFilteredList);
      if (data && data.length) {
        visibleNode = (
          <FlatList
            style={{ height: hp("78%"), top: hp("1%") }}
            contentContainerStyle={{ paddingBottom: 90, paddingTop: 10 }}
            onRefresh={() => this.fetchCall()}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            data={data}
            keyExtractor={(item) => item.createdon}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1,
                  padding:10,
                  borderColor: Colors.darkRedPink,
                  marginLeft: wp("5%"),
                  marginRight: wp("5%"),
                  marginTop: hp("2%"),
                  // height: hp("12%"),
                  borderRadius: 8,
                }}
              >
                {/* <Image
            style={{
              width: 55,
              height: 52,
              // resizeMode: "contain",
              marginTop: 10,
              marginRight: wp("5%"),
            }}
            source={require("App/Assets/Images/flags.png")}
          /> */}
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 30,
                      fontWeight: "bold",
                      marginLeft: wp("6%"),
                      top: hp("1.5%"),
                    }}
                  >
                    {HelperService.getCurrentDate1(item.createdon)}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: "bold",
                      marginLeft: wp("6%"),
                      top: hp("1.5%"),
                    }}
                  >
                    {HelperService.getMonthMappingName(
                      HelperService.getCurrentMonth(item.createdon)
                    )}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      width: wp("60%"),
                      textAlign: "left",
                      marginLeft: wp("7%"),
                      color: Colors.red,
                      top:hp("1%")
                      // textAlignVertical: "center",
                    }}
                  >
                    {item.zx_title}
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 13,
                      width: wp("65%"),
                      textAlign: "left",
                      marginLeft: wp("7%"),
                      top:hp("1.5%"),
                      marginBottom:hp("1%")
                    }}
                  >
                    {item.zx_body}
                  </Text>
                </View>
              </View>
            )}
          />
        );
      } else {
        visibleNode = <NoDataFound text={"Not  Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!data || (data && !data.length && !loading)) {
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
      );
    }

    return visibleNode;
  }
  render() {
    return (
      <View>
        <BackArrowButton style={{ fontSize: 30, color: Colors.darkRedPink }} />
        <View style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}>
          <Image
            style={{
              width: 247,
              height: 52,
              resizeMode: "contain",
              marginTop: 30,
            }}
            source={require("App/Assets/Images/bell1.png")}
          />
          <Text style={{ right: wp("22%"), fontSize: 20, top: hp("5%") }}>
            NOTIFICATIONS
          </Text>
        </View>
        {this.getDataNode()}
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 0.5,
            borderColor: Colors.darkRedPink,
            marginLeft: wp("5%"),
            marginRight: wp("5%"),
            marginTop: hp("2%"),
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: wp("1%"),
            }}
          >
            2 {"\n"}
            <Text>NOV</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              width: wp("72%"),
              textAlign: "left",
              marginLeft: wp("4%"),
              textAlignVertical: "center",
            }}
          >
            Gaurav Chawla visited AK Enterprises for the third consecutive day
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 0.5,
            borderColor: Colors.darkRedPink,
            marginLeft: wp("5%"),
            marginRight: wp("5%"),
            marginTop: hp("2%"),
          }}
        >
          <Image
            style={{
              width: 55,
              height: 52,
              // resizeMode: "contain",
              marginTop: 10,
              marginRight: wp("5%"),
            }}
            source={require("App/Assets/Images/flags.png")}
          />
          <Text
            style={{
              fontSize: 16,
              width: wp("72%"),
              textAlign: "left",
              marginLeft: wp("4%"),
              color: Colors.red,
              // textAlignVertical: "center",
            }}
          >
            Happy Birthday Sunil {"\n"}
            <Text style={{ color: Colors.black, fontSize: 14 }}>
              Wishing you have a wonderful and happy day.{" "}
            </Text>
          </Text>
        </View> */}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  data: state.common.notifications,
  loading: state.common.getAllNotificationsLoader,
});
const mapDispatchToProps = (dispatch) => ({
  getAllNotifications: (params) =>
    dispatch(CommonActions.getAllNotifications(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
