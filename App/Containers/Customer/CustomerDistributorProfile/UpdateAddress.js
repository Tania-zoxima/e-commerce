import React, {Component} from "react";
import InputText from "App/Components/FormInput/InputText";
 import DistributorActions from "App/Stores/Distributor/Actions";
import { connect } from "react-redux";

import {
  View,
  Text,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Icon, Input, Button, ListItem, Radio, Left, Right } from "native-base";
import BlueButton from "../../../Components/BlueButton/BlueButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchableDropdown from "App/Components/SearchableDropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";
import InputNumber from 'App/Components/FormInput/InputNumber';
import Styles from "./CreateAddressStyles";
import BackArrowButton from "App/Components/BackArrowButton";
import { Card } from "react-native-paper";
import _ from "lodash";
import RetailersActions from "App/Stores/Retailers/Actions";







class UpdateAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }
    componentDidMount() {
        const { token, agentid } = this.props;

    this.props.clearForm();

        // this.state.timer=setTimeout(()=>(this.props.getAllArea({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhME85RDAwMDAwMWtGazRVQUUiLCJpYXQiOjE2MTM3Mzc5NjF9.55TGMfE5X4DcIWiOtHvcq6mbzkZNQT-aH526mWEDAIc",
        // })),5000);
      }

     

      getPincode() {
        const { area } = this.props;
        let pincode = [];
        if (area && area.length) {
          area.map((obj) => {
            if (obj.zx_level == 6) {
              pincode.push({
                id: obj.zx_salesterritoryid,
                name: obj.zx_territoryname,
              });
            }
          });
        }
        return pincode;
      }
    
      getState() {
        const { area } = this.props;
        let pincode = [];
        if (area && area.length) {
          area.map((obj) => {
            if (obj.zx_level == 2) {
              pincode.push({
                id: obj.zx_salesterritoryid,
                name: obj.zx_territoryname,
              });
            }
          });
        }
        return pincode;
      }
    
      getCity() {
        const { area } = this.props;
        let pincode = [];
        if (area && area.length) {
          area.map((obj) => {
            if (obj.zx_level == 5) {
              pincode.push({
                id: obj.zx_salesterritoryid,
                name: obj.zx_territoryname,
              });
            }
          });
        }
        return pincode;
      }
    
  render() {

    const complaintRef=[
        {id: "Bill To", name: "Bill To"},
       
    
      ];
    
    const {
      addressForm,
      distributorFormUpdate,
      submitValidation,
    token,
    agentid,
    loader,

      

    } = this.props;

   let recordid=this.props.navigation.state.params;


    let forms=
    {
        "zx_tickettype":"New Delivery Address",
        // "zx_customer":recordid.id,
        "zx_contactperson":addressForm.zx_contactperson,
        "zx_mobilenumber":"68958875932",
        "zx_gstno":"21656e2",
        "zx_address":addressForm.zx_address,
        "zx_city":addressForm.zx_city,
        "zx_area":"iuuj",
        "zx_district":"kpt",
        "zx_substate":"msjhj",
        "zx_state":addressForm.zx_state,
        "zx_team": agentid,
        "zx_deliveryaddresstobeupdated":"7uj98ipodcd3"
    
    }
    
   
  return (

    <View style={Styles.mainContainer}>
        <Card style={Styles.cardstyle1}>
          <BackArrowButton style={Styles.backarrow} />
          <Text style={Styles.title}>
            {"Update "}
            <Text style={Styles.titleText}>{"New Address "}</Text>
          </Text>
        </Card>

    <ScrollView style={{marginBottom:hp("5%")}}>
    <View style={{ ...Styles.outerView, left: "2.5%" }}>

      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Person Name</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Name"}
        value={addressForm.zx_contactperson}
        onChange={(value) =>
          this.props.changeAddressForm({
            edited_field: "zx_contactperson",
            edited_value: value,
          })
        }
        // error={submitValidation.invalid && submitValidation.invalid_field == 'zx_panno'}
         />
      </View>
      

      
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Address Type</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select Address Type"}
                  dataSource={complaintRef}

           selectedValue={addressForm.zx_addresstype}
         onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_addresstype', edited_value: value })}

              
               placeholder={"Select Address Type"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
            invalid={false}
            customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
            key={addressForm.zx_addresstype}
           
           />
           </View>
        </View>
        


      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Address</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Address"}
         value={addressForm.zx_address}
         onChange={(value) =>
           this.props.changeAddressForm({
             edited_field: "zx_address",
             edited_value: value,
           })
         } 
						//  error={submitValidation.invalid && submitValidation.invalid_field == 'zx_gstno'}
            />
      </View>

      <View style={{flexDirection:'column'}}>
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>City/Town</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select City"}
                  dataSource={this.getCity()}

           selectedValue={addressForm.zx_city}
           onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_city', edited_value: value })}

              
           placeholder={"Select City"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
              invalid={false}
             customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
            key={addressForm.city + _.uniqueId()}
           />
           </View>
        </View>
        
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Pin Code</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select Pincode"}
                   dataSource={this.getPincode()}

           selectedValue={addressForm.pincode}
          onChange={(value) => this.props.changeAddressForm({ edited_field: 'pincode', edited_value: value })}

              
           placeholder={"Select Pincode"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
             invalid={false}
             customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
          key={addressForm.pincode + _.uniqueId()}
           />
           </View>
        </View>
        
      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>State</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select State"}
                 dataSource={this.getState()}

         selectedValue={addressForm.zx_state}
           onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_state', edited_value: value })}

              
          placeholder={"Select State"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
             invalid={false}
             customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
           key={addressForm.state + _.uniqueId()}
           />
           </View>
        </View>

      <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>Sub-State</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select Sub-State"}
                  dataSource={this.getCity()}

           selectedValue={addressForm.zx_substate}
           onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_substate', edited_value: value })}

              
           placeholder={"Select City"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
              invalid={false}
             customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
            key={addressForm.city + _.uniqueId()}
           />
           </View>
        </View>

        <View style={Styles.dropDown}>
        <Text style={Styles.textStyle}>District</Text>

        <View style={{marginLeft:wp("-2%"),marginTop:hp("1%"),width:wp("100%")}}>
          <SearchableDropdown 
          placeHolderText={" Select District"}
                  dataSource={this.getCity()}

           selectedValue={addressForm.zx_district}
           onChange={(value) => this.props.changeAddressForm({ edited_field: 'zx_district', edited_value: value })}

              
           placeholder={"Select City"}
           
              labelStyles={{
            //   color: Colors.black,
              textAlign: "center",
              // width: "99%",
              //  padding:5,
            //   fontSize: 13,
              flexDirection: "row",
            }}
           
              invalid={false}
             customPickerStyles={{ width:"80%",marginLeft:6,marginTop:15,borderWidth:1,borderBottomColor:'lightgrey',borderColor:'white'}}
            key={addressForm.city + _.uniqueId()}
           />
           </View>
        </View>

        <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>Phone no.</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter Phone no."}
         value={addressForm.zx_mobilenumber}
         maxLength={10}
         onChange={(value) =>
           this.props.changeAddressForm({
             edited_field: "zx_mobilenumber",
             edited_value: value,
           })
         } 
						//  error={submitValidation.invalid && submitValidation.invalid_field == 'zx_gstno'}
            />
      </View>


      <View style={Styles.textView1}>
        <Text style={Styles.textStyle}>G.S.T No.</Text>
        <InputText style={Styles.placeholder} placeholder={"Enter G.S.T No."}
         value={addressForm.zx_gstno}
         onChange={(value) =>
           this.props.changeAddressForm({
             edited_field: "zx_gstno",
             edited_value: value,
           })
         } 
						//  error={submitValidation.invalid && submitValidation.invalid_field == 'zx_gstno'}
            />
      </View>
        
        </View>
       
      <View style={{
                height: hp("5%"),
                marginTop: hp("13%"),
                left: wp("27%"),
                
              }}>
        <BlueButton style={{ ...Styles.button }} title={"SAVE"} 
        onPress={() =>
            this.props.submitAddressForm({ form: forms, token })
          }
          // disabled={loader}
          // loading={loader}
        />
      </View>

    </View>
    
    </ScrollView>

    </View>
  );
}
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    agentid: state.user.id,
    addressForm: state.retailers.addressForm,
    area: state.distributor.getArea,
    loader: state.retailers.submitAddressFormLoader,
    customerAddress: state.retailers.customerAddress,





    

    
    
    
    

  };
};

const mapDispatchToProps = (dispatch) => ({
    changeAddressForm: (params) =>
    dispatch(RetailersActions.changeAddressForm(params)),
	submitAddressForm:(params) =>
   dispatch(RetailersActions.submitAddressForm(params)),
  getAllArea: (params) => dispatch(DistributorActions.getAllArea(params)),
  clearForm: (params) =>
    dispatch(RetailersActions.clearForm(params)),

  
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);
