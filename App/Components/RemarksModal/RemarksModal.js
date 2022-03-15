import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import TextArea from "../../Components/FormInput/TextArea";
import BlueButton from "../../Components/BlueButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from "../../Theme/Colors";

const RemarksModal = ({ isVisible, handleSubmit, handleCancel, toggleModal, expenseForm, changeExpenseForm, loader, validation }) => {
    let body = (
        <View style={{ margin: 8, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Text style={{ fontSize: 18, color: Colors.button, marginBottom: 10 }}>Remarks</Text>
            <TextArea
                placeholder={'Type Remarks'}
                numberOfLines={5}
                value={expenseForm.remark__c}
                onChange={(value) => changeExpenseForm({ edited_field: 'remark__c', edited_value: value })}
            />
            <View style={Style.actionContainer}>
                <BlueButton
                    onPress={handleSubmit}
                    title={'Submit'}
                    disabled={loader}
                    loading={loader}
                    style={Style.actionButton}
                />
                <BlueButton
                    onPress={handleCancel}
                    title={'Cancel'}
                    style={Style.actionButton}
                />
            </View>
        </View>
    );
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={toggleModal}
            animationIn={"slideInUp"}
        >
            <View style={Style.container}>
                {body}
            </View>
        </Modal>
    );
}
export default RemarksModal;

const Style = StyleSheet.create({
    actionButton: {
        width: wp('40%'),
        height: hp('5%')
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between'
    },
    container: {
        margin: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});