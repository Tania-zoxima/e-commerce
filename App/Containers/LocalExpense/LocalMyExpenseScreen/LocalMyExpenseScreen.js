import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from 'App/Services/Utils/HelperService';
import LocalMyExpenseTupleScreen from '../LocalMyExpenseTuple';
import Style from './LocalMyExpenseScreenStyle';

class LocalMyExpenseScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.fetchExpense();
    }

    fetchExpense() {
        const { token, agentid, fetchLocalExpenseData, monthNumber } = this.props;
        fetchLocalExpenseData({
            token,
            agentid,
            type: 'local',
            month: monthNumber,
            expense_type: 'self'
        });
    }

    onExpenseItemClick(item){
        if (item.expense_status__c === 'Draft') {
            this.props.selectLocalExpense(item);
            NavigationService.navigate('LocalExpenseListScreen', { 'Local': true });
        } else {
            this.props.selectLocalExpense(item);
            NavigationService.navigate('LocalExpenseListScreen', { 'Local': false });
        }
    }


    render() {
        const { fetchLocalExpenseLoader } = this.props;
        // const { localExpenseList, fetchLocalExpenseLoader } = this.props;
        const localExpenseList = [{
            'name':'0100',
            'member_branch_name':'NA',
            'expense_status__c':'Draft',
            'total_amount__c':'4250'
        },{
            'name':'0101',
            'member_branch_name':'NA',
            'expense_status__c':'Pending for Approval',
            'total_amount__c':'4450'
        },{
            'name':'0102',
            'member_branch_name':'NA',
            'expense_status__c':'Approved',
            'total_amount__c':'5450'
        },{
            'name':'0103',
            'member_branch_name':'NA',
            'expense_status__c':'Draft',
            'total_amount__c':'15450'
        }];

        let visibleNode = [];

        if (localExpenseList && localExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={localExpenseList}
                    renderItem={({ item }) =>
                        <LocalMyExpenseTupleScreen
                            data={item}
                            list={localExpenseList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={fetchLocalExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />}
                />)
        } else if (fetchLocalExpenseLoader) {
            visibleNode = <Loading />
        } else if (localExpenseList && !localExpenseList.length && !fetchLocalExpenseLoader) {
            visibleNode = <NoDataFound text={'No Expense Found'} />
        }

        return (
            <View style={Style.container}>
                {visibleNode}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    offset: state.retailers.retailersOffset,
    limit: state.retailers.retailersLimit,
    localExpenseList: state.local.localExpenseList,
    fetchLocalExpenseLoader: state.local.fetchLocalExpenseLoader,
    monthNumber: state.local.monthNumber,
    type: state.local.type
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocalExpenseData: (params) => dispatch(LocalActions.fetchLocalExpenseData(params)),
    selectLocalExpense: (params) => dispatch(LocalActions.selectLocalExpense(params)),
    clearSelectLocalExpense: () => dispatch(LocalActions.clearSelectLocalExpense()),
    clearLocalExpense: () => dispatch(LocalActions.clearLocalExpense())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalMyExpenseScreen)

