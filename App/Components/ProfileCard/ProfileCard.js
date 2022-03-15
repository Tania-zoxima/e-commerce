import React from 'react'
import { Text, View, TouchableOpacity, Dimensions} from 'react-native'
import Style from './ProfileCardStyles'
import { Icon, Input, Button } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import Ratings from 'App/Components/Ratings';
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import EditQuantity from 'App/Components/EditQuantity'
import _ from 'lodash'


const ProfileCard = ({data}) => (
	<View style={Style.box}>
	    <View style={Style.tuple}>
	        <View style={Style.userCircle}>
	            <Icon 
	              name={'ios-person'}
	              ios={'ios-person'}
	              android={'md-person'}
	              style={{color: Colors.button}}
	            />
	        </View>
	        <View style={Style.userDtl}>
	            <Text style={Style.title}>{data.team_member_name}</Text>
	        </View>
	    </View>
    </View>
);

export default ProfileCard
