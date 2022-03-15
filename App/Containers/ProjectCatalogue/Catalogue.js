import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
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
import ProjectActions from "App/Stores/Project/Actions";
import UserActions from "App/Stores/User/Actions";

class Catalogue extends Component {
  componentDidMount() {
    this.fetchCall();
  }

  fetchCall() {
    const { agentid, token, logindata,subAreas } = this.props;
    this.props.getCatalogue({
      token,
      zx_substate: subAreas[0] && subAreas[0].zx_parentsubstate,
      zx_brandgroup: logindata && logindata.zx_brandgroup,
    });
  }

  

  getDataNode() {
    let visibleNode = [];

    const { data, Approved, loader, token, loading } = this.props;

    if (data && data.length) {
      if (data && data.length) {
        visibleNode = (
          <FlatList
            style={{ height: hp("78%"), top: hp("1%") }}
            contentContainerStyle={{ paddingBottom: 90, paddingTop: 10 }}
            onRefresh={() => this.fetchCall()}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            data={data}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 0.5,
                  borderColor: Colors.darkRedPink,
                  marginLeft: wp("5%"),
                  marginRight: wp("5%"),
                  marginTop: hp("2%"),
                  height: hp("15%"),
                  borderRadius: 10,
                  elevation: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.zx_attachment)}
                >
                  <Image
                    style={{ height: 60, width: 75, margin: "10%" }}
                    source={require("../../Assets/Images/file.png")}
                  />
                  <Text
                    style={{
                      marginLeft: "5%",
                      color: Colors.background,
                      bottom: "10%",
                    }}
                  >
                    Click To Open
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlignVertical: "center",
                    color: Colors.lightGrey,
                    marginLeft: "-8%",
                  }}
                >
                  Published on{" "}
                </Text>
                <Text
                  style={{
                    marginLeft: wp("5%"),
                    color: "black",
                    textAlignVertical: "center",
                    textAlign:"center",
                    fontWeight:"bold"
                  }}
                >
                  {HelperService.dateReadableFormat(
                    item.zx_publishon
                  )}
                </Text>
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

        <Text style={{ textAlign: "center", fontSize: 20, top: hp("0%") }}>
          PRODUCT CATALOGUE
        </Text>
        {this.getDataNode()}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  data: state.project.catalogue,
  loading: state.project.getCatalogueLoader,
  logindata: state.user.user_details,
  subAreas: state.user.subAreas,
});
const mapDispatchToProps = (dispatch) => ({
  getAllNotifications: (params) =>
    dispatch(CommonActions.getAllNotifications(params)),
  getCatalogue: (params) => dispatch(ProjectActions.getCatalogue(params)),
  getSubArea: (params) => dispatch(UserActions.getSubArea(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
