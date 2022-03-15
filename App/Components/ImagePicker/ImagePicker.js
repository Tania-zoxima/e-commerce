import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	async chooseFile() {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		let permission = await HelperService.requestStoragePermission();

		if (permission) {
			ImagePicker.launchCamera(options, (response) => {
				console.log('Response = ', response);
				if (response.didCancel) {
					console.log('User cancelled image picker');
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
				} else if (response.customButton) {
					console.log('User tapped custom button: ', response.customButton);
					alert(response.customButton);
				} else {
					const source = { uri: 'data:image/jpeg;base64,' + response.data };
					this.props.onImageSuccess({ image: response.data, filename: response.fileName });
					this.setState({
						avatarSource: source
					});
				}
			});
		} else {
			Alert.alert(
				"Storage permission Denied.",
				'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for Re-Konekt.'
			);
		}
	};

	render() {
		const {
			image,
			children,
			loading
		} = this.props;
		let imageNode = (
			<Image
				source={this.state.avatarSource}
				style={{ width: 60, height: 60, resizeMode: 'stretch', borderRadius: 15 }}
			/>
		);
		if (!image) {
			imageNode = [];
		}

		let loading_node = [];


		if(loading){
			loading_node = (
				<View style={styles.spinner}>
					<Spinner color={Colors.primary} />
					{/* <Text style={{color: Colors.primary}}>Processing Image...</Text> */}
				</View>
			);
		}

		return (
			<View>
				<View style={styles.container}>
					<View>
						<TouchableOpacity transparent onPress={!this.props.enable ? () => this.chooseFile() : () => { }}>
							{children}
						</TouchableOpacity>
					</View>
					<View style={styles.imagePreviewContainer}>
						{imageNode}
					</View>
					{loading_node}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
	},
	imagePreviewContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		position: 'relative',
		minHeight: hp('8%'),
	},
	spinner: {
		marginVertical: 0,
		position: 'absolute',
		backgroundColor: 'rgba(232, 229, 229, 0.5)',
		height: '117%',
		width: '100%',
		zIndex: 2,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		borderRadius: 10
	}
});