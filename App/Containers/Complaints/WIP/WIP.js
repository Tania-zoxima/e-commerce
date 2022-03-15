import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Style from "./WIPStyle";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";
import { connect } from "react-redux";
import ComplaintCard from "App/Components/ComplaintComponent/ComplaintCard";
import DetailCard from "../../../Components/DetailCard/DetailCard";
import DetailCardStrip from "../../../Components/DetailCard/DetailCardStrip";
import { ApplicationStyles, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import { Icon, Input, Button } from "native-base";
import RetailersActions from "App/Stores/Retailers/Actions";

class WIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }
  componentDidMount() {
    this.fetchCall();
    this.state.timer = setTimeout(
      () =>
        this.props.getAllLocation({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
        }),
      1000
    );
    this.state.timer = setTimeout(
      () =>
        this.props.getNatureCode({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
        }),
      2000
    );
  }

  onSelectComplaint(params) {
    NavigationService.navigate("ComplaintInfo");
    this.props.selectComplaint(params);
  }

  fetchCall() {
    const { getCustomerComplaint, token } = this.props;

    let id = this.props.item;
    // console.log("iddd", id);
    //  let id=this.props.navigation.state.params
    getCustomerComplaint({
      token,
      form: {
        customerId: id,
      },
    });
  }
  getLocation() {
    const { location } = this.props;
    let pincode = [];
    if (location && location.length) {
      location.map((obj) => {
        if ({ id: obj.accountId, name: obj.name }) {
          pincode.push({ id: obj.accountId, name: obj.name });
        }
      });
    }
    return pincode;
  }
  getNature() {
    const { getNatureCodes } = this.props;
    let code = [];
    if (getNatureCodes && getNatureCodes.length) {
      getNatureCodes.map((obj) => {
        if ({ id: obj.id, name: obj.zx_description }) {
          code.push({ id: obj.id, name: obj.zx_description });
        }
      });
    }
    return code;
  }
  searchKeyValueInList(list) {
    let result = "";
    result = list.filter((obj) => obj.zx_complaintstatus == "WIP");
    // console.log(result);
    return result;
  }

  filterResults(list) {
    // console.log("listtttt", list);
    const { searchFilters, selected } = this.props;
    // console.log("hhhhhhhhhhhhhh", searchFilters["brand"]);
    // let siteSearchFilters = this.props.siteSearchFilters;
    // let filteredList = HelperService.searchTextListFilter(list,"zx_complainttype",searchFilters["brand"]);
    let filteredList = HelperService.multiFieldSearchText(
      list,
      searchFilters["brand"]
    );
    // console.log("aaaaaaaaaaaaaaa", filteredList);
    return filteredList;
  }

  getDataNode() {
    let visibleNode = [];

    const { details, complaintloader } = this.props;

    if (details && details.length) {
      let filteredSitesList = this.searchKeyValueInList(
        details.map((obj) => obj)
      );
      let searchList = this.filterResults(filteredSitesList);
      // console.log("fliterrrrr", searchList);
      if (filteredSitesList.length) {
        visibleNode = (
          <FlatList
            data={searchList}
            style={{ height: hp("38%") }}
            showsVerticalScrollIndicator={false}
            onRefresh={() => this.fetchCall()}
            refreshing={complaintloader}
            contentContainerStyle={{ paddingBottom: hp("5%"), paddingTop: 10 }}
            keyExtractor={(item) => item.zx_complaintsid}
            renderItem={({ item }) => (
              <DetailCard
                dark={false}
                onPress={() => this.onSelectComplaint(item)}
                style={{
                  backgroundColor: Colors.white,
                  borderWidth: 0.5,
                  width: wp("90%"),
                  //  right: wp("1%"),
                  borderColor: "#F66A676B",
                }}
                heading={item.zx_name}
                headstyle={Style.head}
                date={HelperService.dateReadableFormatwithmonthname(
                  item.zx_dateofregistration
                )}
                datestyle={Style.date}
                // month={item.month}
                // monthstyle={Styles.month}
                //  heading1={"INV-6778"}
                //  head1style={Style.head1}
                heading2={"Invoice No."}
                head2style={Style.head2}
                content={[
                  <DetailCardStrip
                    labelStyle={Style.ttl}
                    valueStyle={Style.detail}
                    label={"Complaint Type"}
                    value={item.zx_complainttype}
                  />,
                  <DetailCardStrip
                    labelStyle={Style.ttl}
                    valueStyle={Style.detail}
                    label={"Description"}
                    value={item.zx_description}
                  />,
                  <DetailCardStrip
                    labelStyle={Style.ttl}
                    valueStyle={Style.detail}
                    label={"Category"}
                    value={item.zx_itemcategorycode}
                  />,
                  //  <DetailCardStrip
                  //    labelStyle={Style.ttl}
                  //    valueStyle={Style.detail}
                  //    label={"Group code"}
                  //    value={item.groupCode}
                  //  />,
                  <DetailCardStrip
                    labelStyle={Style.ttl}
                    valueStyle={Style.detail}
                    label={"Nature of complaints"}
                    value={HelperService.getNameFromSFID(
                      this.getNature(),
                      item.zx_natureofthecomplaint
                    )}
                  />,
                  <DetailCardStrip
                    labelStyle={Style.ttl}
                    valueStyle={Style.detail}
                    label={"Location"}
                    value={HelperService.getNameFromSFID(
                      this.getLocation(),
                      item.zx_location
                    )}
                  />,
                ]}
              />
            )}
          />
        );
      } else {
        visibleNode = (
          <View style={{ bottom: hp("30%") }}>
            <NoDataFound text={"No Data Found"} />
          </View>
        );
      }
    } else if (complaintloader) {
      visibleNode = <Loading />;
    } else if (!details || (details && !details.length && !complaintloader)) {
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
    return <View>{this.getDataNode()}</View>;
  }
}
{
  /* <View  style={Style.Screen} >


<View style={{flexDirection:'row'}}>
  <View style={{marginTop:45,marginLeft:20}}>
    <View style={{width:'100%',height:50,alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:46, fontWeight:'600',textAlign:'right',color:'#C50404'}}>23</Text>
    </View>
    <View style={{width:'100%',height:20,marginLeft:25,marginTop:1}}><Text style={{fontSize:18,fontWeight:'500',color:'#C50404'}}>Apr</Text></View>
    <View style={{width:'100%',height:10,marginLeft:2,marginTop:6}}><Text style={{fontSize:11,fontWeight:'300',color:'#515C6F'}}>Complaint Date</Text></View>
  </View>

<View style={{marginTop:20,marginLeft:13} }>
  <View style={{flexDirection:'row' ,width:'90%'}}>
   
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13 ,paddingRight:13 ,textAlign:'right',color:'#9A9A9A'}}>Complaint No.</Text>
    </View>
    <View style={{width:'35%',marginLeft:15}}>
    <Text style={{color:'black',fontWeight:'bold',fontSize:13}}>IT-10001</Text>
    </View>
    </View>


    <View style={{flexDirection:'row',marginTop:4,width:'90%'}}>
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13,paddingRight:13, textAlign:'right',color:'#9A9A9A'}}>Category</Text>
    </View>
    <View style={{width:'35%',marginLeft:'6%'}}>
    <Text style={{color:'black' ,fontWeight:'bold',fontSize:13}}>Product Issue</Text>
    </View>
    </View>

    <View style={{flexDirection:'row',marginTop:4,width:'90%'}}>
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13,paddingRight:13,textAlign:'right',color:'#9A9A9A'}}>Sub category</Text>
    </View>
    <View style={{width:'35%',marginLeft:'6%'}}>
    <Text style={{color:'black' ,fontWeight:'bold',fontSize:13}}>Damaged in transit</Text>
    </View>
    </View>

    <View style={{flexDirection:'row',marginTop:4,width:'90%'}}>
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13,paddingRight:13,textAlign:'right',color:'#9A9A9A'}}>Order No.</Text>
    </View>
    <View style={{width:'35%',marginLeft:'6%'}}>
    <Text style={{color:'black' ,fontWeight:'bold',fontSize:13}}>OR-16811</Text>
    </View>
    </View>

    <View style={{flexDirection:'row',marginTop:4,width:'90%'}}>
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13,paddingRight:13,textAlign:'right',color:'#9A9A9A'}}>Invoice No.</Text>
    </View>
    <View style={{width:'35%',marginLeft:'6%'}}>
    <Text style={{color:'black' ,fontWeight:'bold',fontSize:13}}>INV-16811</Text>
    </View>
    </View>

    <View style={{flexDirection:'row',marginTop:4,width:'90%'}}>
    <View style={{width:'49%'}}>
    <Text  style={{fontSize:13,paddingRight:13,textAlign:'right',color:'#9A9A9A'}}>Description</Text>
    </View>
    <View style={{width:'35%',marginLeft:'6%'}}>
    <Text style={{color:'black' ,fontWeight:'bold',fontSize:13}}>Foot Mat Damaged</Text>
    </View>
    </View>

 </View>

</View>



</View>
  */
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  details: state.retailers.customerComplaint,
  location: state.retailers.getAllLocation,
  complaintloader: state.retailers.getCustomerComplaintLoader,
  getNatureCodes: state.retailers.getNatureCode,
  data: state.retailers.data,
  searchFilters: state.retailers.searchFilters,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerComplaint: (params) =>
    dispatch(RetailersActions.getCustomerComplaint(params)),
  getAllLocation: (params) => dispatch(RetailersActions.getAllLocation(params)),
  getNatureCode: (params) => dispatch(RetailersActions.getNatureCode(params)),
  selectComplaint: (params) =>
    dispatch(RetailersActions.selectComplaint(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WIP);
