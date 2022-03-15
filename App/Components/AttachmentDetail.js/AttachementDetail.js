import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Spinner } from 'native-base';
import Style from './AttachmentStyles';
import { Colors } from 'App/Theme';

const AttachmentDetail = ({ label, value, onPress, loading }) => (
    <View style={{ ...Style.container }}>
        <View style={{ ...Style.textContainerLabel }}><Text style={{ ...Style.label }}>{label}</Text></View>
        {!loading ? value ? <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ ...Style.textContainerLabel }}>
                <Image
                    style={{ ...Style.imageStyle }}
                    source={{
                        uri: value,
                    }}
                />
            </View>
        </TouchableWithoutFeedback> :
            <View style={{ ...Style.textContainerValue }}><Text style={{ ...Style.value }}>{'None'}</Text></View> :
            <View style={{ ...Style.textContainerValue }}><Spinner color={Colors.button} size="small" /></View>}
    </View>
)

export default AttachmentDetail