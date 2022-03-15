import React, { Component } from 'react'
import { View, Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './DashboardScreenStyle'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import { START, ABSENT, GOOD, MORNING } from 'App/Constants';
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import DashboardActions from 'App/Stores/Dashboard/Actions'
import SingleInfo from 'App/Components/SingleInfo';
import Separator from 'App/Components/Separator';
import DashboardHeading from 'App/Components/DashboardHeading';
import CircularProgressBar from 'App/Components/CircularProgressBar';
import AchievedTargets from './AchievedTargets';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';



//<ScrollableTab tabsContainerStyle={detail.zx_brandgroupcode == "1"?Style.tabHeading:Style.tabHeadingBlue} underlineStyle={Style.tabUnderLine} style={Style.mainTabs} />

class DashboardTabs extends React.Component {
  render() {
    const {
      isASM,
      searchFilters,
      changeSearchFilters,
      detail
    } = this.props
    return (
      <Tabs
      onChangeTab={(tab) =>
        changeSearchFilters({ edited_field: 'selectedTab', edited_value: tab.i })
      }
      tabBarUnderlineStyle={Style.tabUnderLine}
      style={Style.mainTabs}
      initialPage={searchFilters['selectedTab']}
    >
      <Tab
        selected={true}
        underlineStyle={Style.tabUnderLine}
        heading={
          <TabHeading style={detail.zx_brandgroupcode == "1"?Style.tabHeading:Style.tabHeadingBlue}>
            <Text style={Style.tabText}>Daily Report</Text>
          </TabHeading>
        }
      />
      
      
     <Tab
       selected={false}
        underlineStyle={Style.tabUnderLine}
        heading={
         <TabHeading style={detail.zx_brandgroupcode == "1"?Style.tabHeading:Style.tabHeadingBlue}>
           <Text style={Style.tabText1}>Sales Overview</Text>
          </TabHeading>
        }
      />
  
    
    <Tab
        selected={false}
        underlineStyle={Style.tabUnderLine}
        heading={
         <TabHeading style={detail.zx_brandgroupcode == "1"?Style.tabHeading:Style.tabHeadingBlue}>
           <Text style={Style.tabText1}>Loyalty Overview</Text>
          </TabHeading>
        }
     />
  
    </Tabs>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM  : state.user.psmList,
  psmList: state.user.psmList.concat([{ id: '', name: 'All' }]),
  searchFilters: state.dashboard.searchFilters,
  detail: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(DashboardActions.changeDashboardSearchFilters(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardTabs)
