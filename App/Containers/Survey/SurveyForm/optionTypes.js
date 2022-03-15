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
import GenericIcon from 'App/Components/GenericIcon'
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import SitesTuple from 'App/Containers/Sites/SitesTuple';
import InfluencersTuple from 'App/Containers/Influencers/InfluencerTuple';
import BlueButton from 'App/Components/BlueButton'
import Questionaire from './questionaire'
import InputText from 'App/Components/FormInput/InputText'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import _ from 'lodash';
import Styles from './style';


class OptionTypes extends Component {
	render(){
		const {
			data,
			onAnswer
		} = this.props;
		
		let visible_node= [];
		if (data.Input_Type__c == "Questionnaire") {
			visible_node = (
				<Questionaire
					id={data.Id}
					values={data.Input_Values__c ? data.Input_Values__c.split(',') : []}
					multiple={data.Is_Multiple__c}
					answer={data.answer ? data.answer.split(',') : []}
					onAnswer={(value) => onAnswer({id: data.Id, answer: value})}
				/>
			);
		}else if(data.Input_Type__c == "Text") {
			visible_node = (<InputText
						value={data.answer}
						onChange={(value) => onAnswer({id: data.Id, answer: value})}
						label={''}
						placeholder={data.Name}
						style={{borderRadius: 10}}

				/>
			)
		}else if(data.Input_Type__c == "Text_Area") {
			visible_node = (<InputText
						value={data.answer}
						onChange={(value) => onAnswer({id: data.Id, answer: value})}
						label={''}
						placeholder={data.Name}
						numberOfLines={8}
						style={{borderRadius: 10,height:'100%'}}
				/>
			)
		}else if(data.Input_Type__c == "Picklist") {
			visible_node = (
				<SearchableDropdown
	                dataSource={HelperService.convertArrayToSearchableListFormat(data.Input_Values__c ? data.Input_Values__c.split(',') : [])}
	                placeHolderText={'Select...'}
	                selectedValue={data.answer}
	                onChange={(value) => onAnswer({id: data.Id, answer: value})}
	                placeholder={'Select...'}
	                invalid={false}
	                key={'Picklist' + data.answer}
	                customPickerStyles={{width: '90%', alignSelf: 'center',padding:10}}
              	/>
			)
		}
		return (
			<View>
			{visible_node}
			</View>
		)
	}
}


const mapStateToProps = (state) => ({
 
  
});

const mapDispatchToProps = (dispatch) => ({
  
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionTypes)