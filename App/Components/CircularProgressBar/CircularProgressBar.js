import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './CircularProgressBarStyles'
import { Colors, ApplicationStyles, Fonts, Metrics } from 'App/Theme'
import { Circle } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const CircularProgressBar = ({ style = {}, target, value, color, datasource }) => (


	<View style={{ left:"5%",top:"5%"}}>
		<AnimatedCircularProgress
			size={wp('30%')}
			width={wp('2%')}
			// fill={(value / target) * 100}
			// fill={(datasource.credit_limit_used__c / datasource.total_credit_limit__c) * 100}
			arcSweepAngle={360}
			rotation={-90}
			tintColor={color ? color : Colors.red}
			backgroundColor={Colors.user}
			style={{ position: 'relative', height: wp('41%') }}
		>
			
		</AnimatedCircularProgress>


		<View style={{ position: 'absolute', left: wp('13%'), bottom: wp('5%') }}>
			<Text style={Style.targetTextIndicator}>
				{/* {0} */}
				{/* {datasource.credit_limit_used__c} */}
			</Text>
		</View>
		<View style={{ position: 'absolute', left: wp('66%'), bottom: wp('5%') }}>
			<Text style={Style.targetTextIndicator}>
				{/* {datasource.total_credit_limit__c} */}
			</Text>
		</View>
		{/* <View style={{ position: 'absolute', left: wp('16%'), bottom: wp('3%') }}>
			<Text style={Style.targetTextIndicator}>
				{target}
			</Text>
		</View> */}
	</View>

);

export default CircularProgressBar
