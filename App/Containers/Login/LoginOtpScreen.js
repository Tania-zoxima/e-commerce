import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Item, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './LoginScreenStyle'
import BlueButton from '../../Components/BlueButton'
import { RESEND_OTP, LOGIN, OTP } from '../../Constants'
import NavigationService from 'App/Services/NavigationService'
import Helpers from '../../Theme/Helpers'
import InputNumber from '../../Components/FormInput/InputMobile'
// import LayoutScreen from '../Layout/LayoutScreen'

export default class LoginOtpScreen extends Component {

    completeDay = () => {
        NavigationService.navigateAndReset('StartDayScreen')
    }
    render() {
        return (
            //   <LayoutScreen>
            <View style={Style.container}>
                <View style={Style.buttonBox}>
                    {/* <Image
                        style={{ width: 150, height: 150 }}
                        source={require('App/Assets/Images/logo.webp')}
                    /> */}
                    {/* <View style={Style.clock}>
            <Text style={Style.time}>08 : 29 : 42</Text>
          </View> */}
                </View>
                <View style={Style.action}>
                    <InputNumber placeholder={'OTP'}/>
                    <View style={Style.link}>
                        <Text style={Style.linkText}>
                            {RESEND_OTP}
                        </Text>
                    </View>
                    {/* <Button block rounded style={{ ...Style.button }} onPress={() => { }}>
                        <Text style={Style.text}>{LOGIN}</Text>
                    </Button> */}
                    {/* <BlueButton title={LOGIN} onPress={this.completeDay} /> */}
                </View>
            </View>
            //   </LayoutScreen>
        )
    }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(presentScreen)
