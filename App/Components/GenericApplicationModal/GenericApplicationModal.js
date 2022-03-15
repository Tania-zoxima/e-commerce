import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import GenericIcon from 'App/Components/GenericIcon'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { GestureHandlerRootView } from "react-native-gesture-handler";

//onSubmit
export default class ActionModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  toggleModal() {
  	this.setState({
      	modalVisible: !this.state.visible
    });
  }

  hideModal() {
  	this.setState({
      	modalVisible: false
    });
  }

  onSubmit() {
  	this.setState({
      	modalVisible: false
    });

    //this.props.onSubmit()
  }

  onClose() {
  	this.setState({
      	modalVisible: false
    });

    //this.props.onClose();
  }

  onClear() {
  	this.props.onClear();
  }

  render() {
  	const {
      heading,
  		children,
      visible,
      disabled,
      animationType,
      content,
      close,
      bodyFlexHeight,
      icon
  	} = this.props;

    let parentFlex = 1;
    let topContainerFlexHeight = .4;
    let bottomContainerFlexHeight = .6;

    if (!!bodyFlexHeight) {
      bottomContainerFlexHeight = bodyFlexHeight;
      topContainerFlexHeight = parentFlex  - bottomContainerFlexHeight;
    }


    return (
      	<SafeAreaView>
		        <Modal
		          animationType={animationType || 'slide'}
		          transparent={true}
		          visible={visible}
		          onRequestClose={() => {
		            this.hideModal()
		          }}>
              <GestureHandlerRootView style={{flex:1}}>
		          <TouchableWithoutFeedback onPress={() => close()} disabled={disabled}>
                <View style={{flex: topContainerFlexHeight, backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 100}}></View>
              </TouchableWithoutFeedback>
		          <View style={{flex: bottomContainerFlexHeight, backgroundColor: Colors.white, zIndex: 4}}>
		          		<View style={{flex: .13, alignItems: 'center', justifyContent: 'center'}}>
		          			<Text style={{color: Colors.button, alignSelf: 'center', fontFamily: ApplicationStyles.textMsgFont, fontSize: 25}}>{heading}</Text>
				              <TouchableHighlight
				              	style={{paddingTop: 2, position: 'absolute', left: 0, paddingLeft: 8}}
                        disabled={disabled}
				                onPress={() => {
				                  close();
				                }}>
				                <GenericIcon name={'close-circle'} style={{fontSize: 30, color: Colors.button}}
                        show={true}
                        />
				              </TouchableHighlight>
                     
			          	</View>
			          	<View style={{flex: 1}}>
		          			{content}
		          		</View>
		        </View>
            </GestureHandlerRootView>
		    </Modal>
      	</SafeAreaView>
    );
  }
}