import React from 'react'
import { View, Text } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './Style';
import { Colors, ApplicationStyles } from 'App/Theme'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from 'lodash'

const BrandComponent = ({ value, list, changeForm, label, error=false, disabled=false,width, styles={}}) => (
	<View style={{width: (width || wp('40%')), flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: wp('4%'),marginTop:5,}}>
		<SearchableDropdown
	        dataSource={list}
	        placeHolderText={'Select'}
	        selectedValue={value}
	        onChange={(value) => changeForm(value)}
	        placeholder={'Type or Select '}
	        invalid={error}
	        labelStyles={{ ...Style.pickerLabel }}
	        customPickerStyles={{ ...Style.picker, ...styles }}
			label={label || 'Brand'}
			disabled={disabled}
			key={value + _.uniqueId()}
	    />
	</View>
)

export default BrandComponent