import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './AgentPersonalStyle'
import DatePicker from "App/Components/DatePicker";

const AgentPersonal = ({heading, value, style={}},img) => (
	<View>
		{heading != 'Email ID' && heading !='Address' ? (
  	<View style={Style.container}>
	  
	   		<Text style={Style.heading} >{heading}</Text>
			   <Text style={Style.value} >{value}</Text>
               {/* <DatePicker
            iconStyle={{ marginBottom: 0 }}
            onDateChange={(params) => this.onDateChange(params)}
          >
            {img}
          </DatePicker> */}
	   
  	</View>):
	
	  <View style={Style.container1}>
	  <View>
		   <Text style={Style.heading} >{heading}</Text>
		   <Text style={Style.value} >{value}</Text>
	   </View>
	  
	 </View> 
	 } 
  </View>
);

export default AgentPersonal
