import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import GenericIcon from 'App/Components/GenericIcon'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

//onSubmit
export default class Dropdown extends Component {
	state = {
		modalVisible: false,
		isOpen: false,
		selectedValue: this.props.selectedValue,
		optArr: this.props.dataArray,
		isVisible: false,

	};


	onTouchData(data) {
		//console.warn(data)
		this.setState({ selectedValue: data.name,isVisible: false }); 
	//	console.warn("das----------------------------------------------------",data)
		this.props.setVal(data);
	}
	render() {
		const {
			children,
			body, onPress1, SelectValue, isOpen, dataArray, onPress2, style, style1, style2, onPress
		} = this.props;

		return (
			<SafeAreaView>
				<View style={[{
					width: '100%', alignSelf: 'center', borderRadius: 5, backgroundColor: Colors.white,
					justifyContent: "center", alignItems: "center",borderWidth:1
				}, style]}>
					<TouchableOpacity style={{
						width: 100, borderRadius: 5, backgroundColor:Colors.white,
						justifyContent: "center", alignItems: "center",borderWidth:1,
						height: 35

					}} onPress={() => {
						this.setState({ isVisible: !this.state.isVisible })
					}} activeOpacity={0}>

						<Text style={{ color: "#fff" }}>{this.state.selectedValue}</Text>


					</TouchableOpacity>



					{this.state.isVisible&&this.props.show?
						<View style={[{ backgroundColor: '#777AD3', width: "100%", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }, style1]}>
							{this.state.optArr.map((data, index) => { 
							//	console.warn(data)
								return (
									<TouchableOpacity style={[{
										width: 100, height: 24, justifyContent: 'center', alignItems: 'center', marginTop: 5
									}, style2]} onPress={() => {this.onTouchData(data)}} >
										<Text style={{ color: '#fff', fontSize: 15 }}>{data.name}</Text>
									</TouchableOpacity>
								)
							})

							}
						</View>
						: null}
				</View>

			</SafeAreaView>
		);
	}
}