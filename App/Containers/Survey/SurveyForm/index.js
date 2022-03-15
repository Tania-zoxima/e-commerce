import ProgressBar from 'App/Components/ProgressBar';
import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SurveyTuple from 'App/Containers/Survey/SurveyTuple'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import SurveyActions from 'App/Stores/Surveys/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import SitesTuple from 'App/Containers/Sites/SitesTuple';
import InfluencersTuple from 'App/Containers/Influencers/InfluencerTuple';
import BlueButton from 'App/Components/BlueButton'
import OptionTypes from './optionTypes';
import _ from 'lodash';
import Styles from './style';

var surveyForm = {
		'Name':'Gautam Doley',
		'current_question':1,
		'total_questions':5,
		'questions':[{'Is_Multiple__c':true,'Id':1,'Name':'How are you??','Input_Values__c':'good,bad, very good, very bad','Input_Type__c':'Questionnaire','answer':''},
		{'Is_Multiple__c':false,'Id':2,'Name':'Where are you from??','Input_Values__c':'','Input_Type__c':'Text','answer':''},
		{'Is_Multiple__c':false,'Id':3,'Name':'Experiance in short??','Input_Values__c':'','Input_Type__c':'Text_Area','answer':''},
		{'Is_Multiple__c':true,'Id':4,'Name':'What is Your nationality??','Input_Values__c':'India,Usa,Italy','Input_Type__c':'Picklist','answer':''},
		{'Is_Multiple__c':true,'Id':5,'Name':'What is your hobbie??','Input_Values__c':'Playing,reading,singing,others','Input_Type__c':'Questionnaire','answer':''}]
	};
class SurveyForm extends Component {

constructor(props) {
    super(props);
    this.state = {
            surveyForm: surveyForm,
            current_question: 1,
    };

  }
		
	onPressNext() {
		const {
			// surveyForm
		} = this.props;

		surveyForm=surveyForm;
		this.setState({
       		 current_question: this.state.surveyForm.current_question++,
     	 });

	}

	onSubmitSurvey(){
		// this.props.surveyForm = surveyForm;
		const {
			token,
			agentid,
			// surveyForm,
			// submitSurvey,
			// executeVisitData
		} = this.props;
		if (this.state.surveyForm.questions[this.state.current_question - 1].answer) {
			submitSurvey();
			// submitSurvey({...surveyForm, token, agentid, executeVisitData})
		}else {
			HelperService.showToast({ message: 'Please answer this question to proceed.', duration: 2000, buttonText: 'Okay' });
		}
	}
 
	render(){
		const {
			token,
			agentid,
			// surveyForm,                                                                       
			submitSurvey,
			answerQuestion,
			gotoNextQuestion,
			submitSurveyLoader,                                              
			gotoPreviousQuestion
		} = this.props;
		

		return (
			<View style={{flex: 1, alignItems: 'center'}}>
				<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
					<Text style={Styles.question}>{`${this.state.surveyForm.Name}`}</Text>
				</View>

				<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%', justifyContent: 'center'}}>
					{this.state.current_question > 1 ?<FontAwesome name='arrow-circle-left' style={Styles.previousIcon} onPress={() => gotoPreviousQuestion()} />  : []}
					<Text style={Styles.indicatorText}>{`${this.state.current_question} of ${surveyForm.total_questions}`}</Text>
				</View>
				
				{this.state.current_question && this.state.surveyForm.total_questions ? <ProgressBar progress={this.state.current_question/this.state.surveyForm.total_questions} /> : []}

				<View style={{flexDirection: 'row', marginVertical: 20, width: '85%', alignItems: 'flex-start'}}>
					 <Text style={Styles.question}>{this.state.surveyForm.questions[this.state.current_question - 1]['Name']}</Text>
				</View>
				<ScrollView style={{width: '95%'}} contentContainerStyle={{flexGrow: 0.4}}>
					<OptionTypes 
						data={this.state.surveyForm.questions[this.state.current_question - 1]}
						onAnswer={(params) => answerQuestion(params)}
					/>
				</ScrollView>
				{this.state.surveyForm.total_questions == this.state.current_question ? 
					<BlueButton 
					 	style={Styles.Button} 
					 	textStyle={Styles.nextButtonText}
						title={'Submit'} 
						disabled={submitSurveyLoader} 
						loading={submitSurveyLoader}
						onPress={() => submitSurvey()} 
					/>
				: 
					<BlueButton
						style={Styles.Button} 
					 	textStyle={Styles.nextButtonText}
						title={'Next'} disabled={false} loading={false} onPress={() => this.onPressNext()} 
					/>
			}

			</View>
		)
	}
}


const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  offset: state.retailers.retailersOffset,
  limit: state.retailers.retailersLimit,
  agentAreas: state.user.agentAreas,
  // surveyForm: state.survey.surveyForm,
  // getSurveysLoader: state.survey.getSurveysLoader,
  // submitSurveyLoader: state.survey.submitSurveyLoader,
  // executeVisitData: state.visits.executeVisitData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveys: (params) => dispatch(SurveyActions.getSurveys(params)),
  startSurvey: (params) => dispatch(SurveyActions.startSurvey(params)),
  gotoNextQuestion: (params) =>dispatch(SurveyActions.gotoNextQuestion(params)),
  gotoPreviousQuestion: (params) => dispatch(SurveyActions.gotoPreviousQuestion(params)),
  answerQuestion: (params) => dispatch(SurveyActions.answerQuestion(params)),
  submitSurvey: (params) => NavigationService.navigate('SurveyListScreen'),
  // submitSurvey: (params) => dispatch(SurveyActions.submitSurvey(params)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyForm)