import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from '../../Services/Utils/HelperService';
 
export default class SelectDate extends Component {
  constructor(props){
    super(props)
    this.state = {date:null}
  }
 
  render(){
    return (
      <DatePicker
        style={{width:wp("40%"),marginTop:hp("4%")}}
        date={this.props.date}
        mode="date"
        placeholder={"Select date"}
        disabled={this.props.disabled}
        // placeHolderText={date ? HelperService.dateReadableFormat(date) : placeholder}
        format="YYYY-MM-DD"
        minDate={this.props.minDate}
       maxDate={this.props.maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left:0,
            top: 4,
            marginLeft:0
          },
          dateInput: {
            marginLeft:0,
            borderColor:"white"
          }
          // ... You can check the source to find the other keys.
        }}
        // onDateChange={(date) => {this.setState({date: date})}}
        onDateChange={this.props.onDateChange}
      />
    )
  }
}