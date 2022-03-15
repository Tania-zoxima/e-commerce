import React, { Component } from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";
import { HelperService } from "../../Services/Utils/HelperService";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { connect } from "react-redux";
import NavigationService from "App/Services/NavigationService";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Icon, Input, Button } from "native-base";
import WhiteButton from "../../Components/WhiteButton/WhiteButton";
import ProjectActions from "App/Stores/Project/Actions";
import Styles from "./ProjectStyle";
import Loader from "../Loader/Loader";

export class Lost extends Component {
  // componentDidMount() {
  //   this.fetchCall();
  // }
  fetchCall() {
    const { token, project, id, searchFilters } = this.props;
    let params = {
      token,
      form: {
        team: id,
        projecttype: [],
        projectPipelinestage: [],
        fromDate: null,
        toDate: null,
      },
    };

    this.props.getProject(params);
    this.props.resetFilter(), this.onReset();
  }
  onReset() {
    this.props.filter.map((item) => {
      if (item.checked == true) {
        item.checked = false;
      }
    });
  }

  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_projectstatus == "Lost");
    // console.log(result);
    return result;
  }

  filterResults(list) {
    const { searchFilters } = this.props;
    let filteredList = [];

    //  filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['area'])

    filteredList = HelperService.searchTextListFilter(
      list,
      "zx_nameofproject",
      searchFilters["name"]
    );
    filteredList = HelperService.sortListFilter(
      filteredList,
      "zx_recordid",
      "DSC"
    );

    return filteredList;
  }

  onSelectProject(params) {
    this.props.selectProject(params);
    NavigationService.navigate("UpdateProject", { show: false });

    // this.props.clearUpdateLongForm()
  }

  getDataNode() {
    let visibleNode = [];

    const { project, loading } = this.props;

    if (project && project.length) {
      let filteredSitesList = this.searchKeyValueInList(
        project.map((obj) => obj)
      );

      if (filteredSitesList && filteredSitesList.length) {
        let searchedFilteredList = this.filterResults(filteredSitesList);
        if (searchedFilteredList.length) {
          visibleNode = (
            <FlatList
              data={searchedFilteredList}
              contentContainerStyle={{ paddingBottom: 320, paddingTop: 10 }}
              keyExtractor={(item) => item.Id}
              onRefresh={() => this.fetchCall()}
              refreshing={loading}
              //    initialNumToRender={7}
              renderItem={({ item }) => (
                <DisplayCard
                  dark={false}
                  //   onPress= {() =>  NavigationService.navigate('NewDealerScreen')}
                  style={{
                    backgroundColor: Colors.white,
                    borderColor: "#F66A676B",
                    borderWidth: 1,
                    width: wp("89%"),
                    // height: hp("19%"),
                  }}
                  iconstyle={{
                    left: wp("3%"),
                    // top: hp("-4%"),
                    // backgroundColor: Colors.phoneClr,
                    color: Colors.black,
                    borderRadius: 50,
                    // height: 30,
                    // width: 30,
                    padding: 6,
                    fontSize: 22,
                    zIndex: 200,
                  }}
                  heading={item.zx_nameofproject}
                  Styletitle={Styles.head}
                  status={item.zx_projectstatus}
                  Stylestatus={Styles.status}
                  icon={"create"}
                  callIcon={{
                    width: wp("15%"),
                    left: wp("67%"),
                    top: hp("-4%"),
                    height: hp("5%"),
                    zIndex: 200,
                  }}
                  onPressicon={() => this.onSelectProject(item)}
                  content={[
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Created on"}
                      value={HelperService.dateReadableFormat(item.createdon)}
                    />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Stage"}
                      value={item.zx_pipelinestage}
                    />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Project Type"}
                      value={item.zx_type}
                    />,
                    <DisplayCardStrip
                      stylettl={Styles.ttl}
                      styledetail={Styles.detail}
                      label={"Project Id"}
                      value={item.zx_recordid}
                    />,
                  ]}
                />
              )}
            />
          );
        }
      } else {
        visibleNode = <NoDataFound text={"No Data Found"} />;
      }
    } else if (loading) {
      visibleNode = <Loading />;
    } else if (!project || (project && !project.length && !loading)) {
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
    const { loading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <Loader loading={loading} /> */}
        {this.getDataNode()}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    id: state.user.id,
    project: state.project.getProject,
    loading: state.project.getProjectLoader,
    searchFilters: state.project.searchFilters,
    filter: state.project.filter,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProject: (params) => dispatch(ProjectActions.getProject(params)),
  selectProject: (params) => dispatch(ProjectActions.selectProject(params)),
  resetFilter: (params) => dispatch(ProjectActions.resetFilter(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Lost);
