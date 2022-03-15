import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import { Icon, Input, Button } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import _ from 'lodash'


const ProgressBar = ({progress}) => (
	   <Progress.Bar progress={progress} width={wp('75%')} color={Colors.darkRedPink} unfilledColor={Colors.lightPink} height={hp('1.3%')} useNativeDriver={true} borderRadius={hp('1%')}/>
);

export default ProgressBar
