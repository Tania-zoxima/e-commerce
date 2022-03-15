import React, {Component} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Item, Input, InputGroup, Icon, Container} from 'native-base'
import Style from './EditQuantityStyles';
import { Colors, ApplicationStyles } from 'App/Theme'
import GenericIcon from 'App/Components/GenericIcon'
import InputNumber from 'App/Components/FormInput/InputNumber'

export default class EditQuantity extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	      number: this.props.value || 0
	    };
	    this.timer = null;
	    this.addOne = this.addOne.bind(this);
	    this.subtractOne = this.subtractOne.bind(this);
	    this.stopTimer = this.stopTimer.bind(this);
  	}

  	setNumber(value) {
  		value = Number(value);
  		if (value < 0){
  			value = 0
  		}
  		
  		this.props.onChange(value)
  		this.setState({
	    	number: value
	    });
  	}

	addOne() {
		this.setNumber(this.state.number + 1);
	    //this.timer = setTimeout(this.addOne, 200);
	}

	subtractOne() {
		if (this.state.number == 0) return;
		this.setNumber(this.state.number - 1);
	    //this.timer = setTimeout(this.subtractOne, 200);
	}

  	stopTimer() {
    	clearTimeout(this.timer);
  	}

	render() {
		return (
			<View style={Style.container}>
				<TouchableOpacity 
					onPress={this.subtractOne} 
					style={Style.actionButtonIcon}>
					<GenericIcon 
						name="remove-circle"
						style={Style.actionButtonIcon}
					/>
				</TouchableOpacity>
					<Item style={{width: 45, borderWidth: 0, marginBottom: 0, paddingBottom: 0, height: 35, alignSelf: 'center', borderRadius: 3, borderBottomWidth: 0}}>
						<Input 
							value={String(this.props.value)}
							style={Style.quantityText} 
							onChangeText={(value) => this.setNumber(value)} 
							keyboardType={'phone-pad'}
						/>
					</Item>
				<TouchableOpacity 
					onPress={this.addOne} 
					style={Style.actionButtonIcon}>
					<GenericIcon 
						//show={true}
						name="add-circle"
						style={Style.actionButtonIcon}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}