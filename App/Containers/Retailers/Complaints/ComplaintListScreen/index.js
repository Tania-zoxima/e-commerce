import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import RetailersActions from 'App/Stores/Retailers/Actions'
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import SitesActions from 'App/Stores/Sites/Actions';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Style from './Styles';
import { HelperService } from '../../../Services/Utils/HelperService';
import IssueTuple from '../IssueTuple';
import GenericIcon from 'App/Components/GenericIcon'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen"
import lodash from "lodash"

class ComplaintListScreen extends Component {
    componentDidMount() {
       
//this.fetchIssuesCall();
        

    }

    //fetchIssuesCall() {
      

        
    //}

  

    getDataNode() {
        const {
            data,
            loader ,
            agentAreas,
            selectedRetailer
        } = this.props;
  
       
          
          let visibleNode = [];
      
          if (data&&data.length) {
  
          
          
             let filteredClaimList=data
              
           
            if (filteredClaimList.length) {
              visibleNode = (
                <FlatList
                  data={filteredClaimList}
                  renderItem={({ item }) => 
                  this.getIssueCardNode(item)
                  }
                  keyExtractor={item => item.sfid}
                  refreshing={loader}
                  onRefresh={() => this.fetchIssuesCall()}
                />
              );
            } else {
              visibleNode =<NoDataFound text={'No Issues Found'} />
            }
          } else if (loader) {
            visibleNode = <Loading/>
          } else if ((!data || (data && !data.length) && !loader)) {
            visibleNode = (    <NoDataFound text={'No Issues Found'}>
            <GenericIcon 
              name={'refresh'}
              onPress={() => this.fetchIssuesCall()}
              style={Style.refreshIcon}
            />
          </NoDataFound>)
          }
      
          return visibleNode;
        }
  
  
  
    render() {
        const {
           
            selectedRetailer
        } = this.props;
         

    
        return (
            <View style={Style.container}>
                <View >
                {this.getDataNode()}
                </View>
              
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    agentAreas: state.user.agentAreas,
   // data: state.retailers.issueList,
   // loader: state.retailers.fetchIssuesLoader,
    selectedRetailer: state.retailers.selectedRetailer,
   
});

const mapDispatchToProps = (dispatch) => ({
    //selectSite: (params) => dispatch(SitesActions.selectSite(params)),
   // fetchIssues: (params) => dispatch(RetailersActions.fetchIssues(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplaintListScreen)