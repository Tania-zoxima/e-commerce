import React from 'react'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Style from './BackArrowButtonStyles'
import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService'
import {View, Modal, TouchableOpacity} from 'react-native';

const BackArrowButton = ({ icon, show, onPress,style}) => (
	<TouchableOpacity transparent>
		<GenericIcon
	  		name={'arrow-back'}
	  		onPress={show? onPress:NavigationService.goback}
	    	// style={Style.button}
			style={style}
		/>
	</TouchableOpacity>
)

export default BackArrowButton
