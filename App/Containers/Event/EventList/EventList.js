import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import { HelperService } from 'App/Services/Utils/HelperService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import EventActions from '../../../Stores/Events/Actions';
import EventTuple from '../EventTuple/EventTuple';
import Style from './EventListStyle';

class EventListScreen extends Component {
    componentDidMount() {
        const {
            eventList,
        } = this.props;
        // if (eventList && eventList.length) {
        // } else {
        //     this.fetchEventsCall();
        // }

        this.fetchEventsCall();
    }

    fetchEventsCall() {
        const {
            token,
            agentid,
            eventOffset,
            eventLimit,
            fetchEvents
        } = this.props;

        fetchEvents({
            token,
            agentid,
            offset: eventOffset,
            limit: eventLimit
        });
    }

    filterResults(list) {
        let eventSearchFilters = this.props.eventSearchFilters;
        let filteredList = HelperService.multiFieldSearchText(list, eventSearchFilters['searchValue']);
        return filteredList;
    }

    onSelectEvent(params) {
        NavigationService.navigate('EventInfoScreen', params);
        this.props.selectEvent(params.data);
    }


    render() {
        const {
            eventList,
            agentAreas,
            fetchEventsLoader
        } = this.props;

        let visibleNode = [];

        if (eventList && eventList.length) {
            let filteredEventList = this.filterResults(eventList.map((obj) => obj));
            if (filteredEventList.length) {
                visibleNode = (
                    <FlatList
                        data={filteredEventList}
                        renderItem={({ item }) => <EventTuple data={item} id={item.sfid} areas={agentAreas} onPress={() => this.onSelectEvent({ id: item.sfid, data: item, type: 'Events' })} />}
                        keyExtractor={item => item.sfid}
                        onRefresh={() => this.fetchEventsCall()}
                        refreshing={fetchEventsLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Event Found'} />}
                    />
                );
            } else {
                visibleNode = <NoDataFound text={'No Event Found'} />
            }
        } else if (fetchEventsLoader) {
            visibleNode = <Loading />
        } else if (eventList && !eventList.length && !fetchEventsLoader) {
            visibleNode = <NoDataFound text={'No Event Found'} />
        }

        return (
            <View style={Style.container}>
                <View >
                    {visibleNode}
                </View>
{
          /*      <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('NewEvent')}>
                    <Icon
                        name={'ios-add'}
                        ios={'ios-add'}
                        android={'md-add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableHighlight> */
    }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    eventOffset: state.events.eventOffset,
    eventLimit: state.events.eventLimit,
    agentAreas: state.user.agentAreas,
    eventList: state.events.eventList,
    fetchEventsLoader: state.events.fetchEventsLoader,
    eventSearchFilters: state.events.eventSearchFilters,
    isConnected: state.network.isConnected
});

const mapDispatchToProps = (dispatch) => ({
    selectEvent: (params) => dispatch(EventActions.selectEvent(params)),
    fetchEvents: (params) => dispatch(EventActions.fetchEvents(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListScreen)