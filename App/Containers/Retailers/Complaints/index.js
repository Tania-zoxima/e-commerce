import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity,ScrollView } from 'react-native';
import {Spinner } from 'native-base';
import NavigationService from 'App/Services/NavigationService'

import SelectionButton from 'App/Components/SelectionButton';
import {ApplicationStyles, Colors} from 'App/Theme';
import GenericIcon from 'App/Components/GenericIcon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class ComplaintsScreen extends Component {

    componentDidMount() {
			
	}

	fetchCall() {
	
	}
 

    render() {
        const {
            data
        } = this.props;
        
       
        return (
           
            <ScrollView style={Styles.paddingTop}>
               
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <SelectionButton 
                        title="Pending(1)" 
                       style={{ backgroundColor:'#dc143c',height:hp('13.4%'),  marginVertical: hp('0%'),}}
                       textStyle={{color:Colors.white,alignItems:'center', }}
                       
                    />

                    <SelectionButton 
                         title="Resolved(1)" 
                        style={{ backgroundColor:'#008000',height:hp('13.4%'), marginVertical: hp('0%')}}
                        textStyle={{color:Colors.white,alignItems:'center', }}
                      
                    />

                   
                </View>
               <View style={{marginTop:'50%'}}>
                <TouchableOpacity
          style={Styles.plusIcon}
          onPress={() => NavigationService.navigate('NewComplaintsScreen')}
          >
          <GenericIcon
            name={'add-circle-outline'}
            style={{ color: Colors.white, fontSize: wp('14%'), alignSelf: 'center' }}
          />
        </TouchableOpacity> 
        </View>
              </ScrollView>
           
           
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.user.user_details,
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ComplaintsScreen)


const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        top:0,
       },
    plusIcon: {
        borderRadius: 50,
        bottom: 25,
        position: 'absolute',
        right:25,
        borderRadius: 50,
        height: 55,
        width: 55,
        backgroundColor: Colors.button,
        flexDirection: 'row',
       
      },
    progressContainer: {
        width: wp('90%'), 
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp('14%'), 
        backgroundColor: Colors.lightGrey,
        marginBottom: hp('8%'),
        borderRadius: wp('1.5%'),
        position: 'relative'
    },
    name: {
        color: Colors.darkGrey,
        fontSize: wp('3.8%'),
        fontFamily: ApplicationStyles.textMsgFont,
        textTransform: 'capitalize',
        marginBottom: hp('.1%'),
    },

    info: {
        color: Colors.darkGrey,
        fontSize: wp('3.3%'),
        fontFamily: ApplicationStyles.textMsgFont,
        textTransform: 'capitalize',
        marginBottom: hp('.1%'),
    },
    textContainer: {
       // alignSelf: 'flex-start',
       // / paddingLeft: wp('8%')
    },
    countText: {
        color: Colors.grey,
        fontSize: wp('3%'),
        marginBottom: hp('.5%'),
        marginTop: hp('1%'),
        fontFamily: ApplicationStyles.textMsgFont,
    },
    refreshIcon: {
        color: Colors.primary, 
        fontSize: wp('5.5%'),
        alignSelf: 'center', 
        padding: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2
    },
    loadingIcon: {
        color: Colors.primary, 
        fontSize: wp('4%'),
        alignSelf: 'center', 
        position: 'absolute',
        right: wp('2.3%'),
        top: -hp('2.3%'),
        zIndex: 2
    },
    paddingTop: {paddingHorizontal: 15, paddingVertical: 15 },
});