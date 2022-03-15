import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CheckBox, Label } from 'native-base';
import Style from './Styles'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import {Header} from 'App/Components/Header'
import {
	SUBMIT, 
} from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'

import { HelperService } from 'App/Services/Utils/HelperService';
import Select from 'App/Components/Select/Select';

class NewComplaintsScreen extends Component {
	componentDidMount() {
       
		
		
		
		
		// this.props.changeInfluencerForm({ edited_field: 'psm__c', edited_value: 'psm' });
	}

	componentWillUnmount() {
	//	this.props.clearIssueForm();
	}

	submit() {

		//const {   form,   selectedRetailer,createIssue } = this.props;
		//createIssue({

        //...form,
		//token: this.props.token,
		//party__c:  selectedRetailer.id,
		
			
		
		//});
	}

	render() {
	//	const { validation,   loader,changeForm,} = this.props;
		let navParams = this.props.navigation.state.params;
		let defaultSource =  navParams && navParams.source ? navParams.source : '';
		return (
			<View style={{ flex: 1}}>
                 <Header title={'New Complaint'}  />
				
				<ScrollView style={Style.action}>

				<Label style={{ ...Style.label }}>{'Category'}</Label>
            <Select style={{ ...Style.bottomMargin }}
            //  list={Category}
              //selected={form.category__c}
            //  onChange={(value) => this.props.changeForm({ edited_field: 'category__c', edited_value: value })}
             /> 


          
            <Label style={{ ...Style.label }}>{' Sub Category'}</Label>
            <Select style={{ ...Style.bottomMargin }}
             // list={subCategory}
             // selected={form.sub_category__c}
             // onChange={(value) => this.props.changeForm({ edited_field: 'sub_category__c', edited_value: value })}
        />  
       

         



			

			

					<BlueButton
						style={Style.button}
						
						title={SUBMIT}
						//disabled={loader}
						//loading={loader}
						//onPress={() => this.submit()}
					/>
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		agentid: state.user.id,
		selectedRetailer: state.retailers.selectedRetailer,
		//form: state.retailers.issueForm,
		//validation: state.retailers.issueFormValidation,
       // loader: state.retailers.createIssueLoader,
		//Category: state.retailers.issueCategory,
		//subCategory:state.retailers.issueSubCategory,
		
		
	
	}
}

const mapDispatchToProps = (dispatch) => ({
	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewComplaintsScreen)