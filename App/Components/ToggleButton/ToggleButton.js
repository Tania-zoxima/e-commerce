import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
 
const ToggleButton = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  disable,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);
  const [getDisabled, setDisabled] = useState(false);

 
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
    // disabled=false;
  };
  //  disable =  setDisabled(updatedSwitchData()) ? !getDisabled:getDisabled
   
 
  return (
    <View>
      <View
        style={{
          height: 36,
          width: 155,
          backgroundColor: 'white',
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          //  disabled={disable}
          onPress={() =>!disable ? updatedSwitchData(true) :[]}
          style={{
            flex: 1,
 
            backgroundColor: getSelectionMode == true ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == true ? 'white' : selectionColor,
              fontSize:9
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
        //   value={isEnabled}
          

          onPress={() =>!disable? updatedSwitchData(false):[]}
          style={{
            flex: 1,
 
            backgroundColor: getSelectionMode == false ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == false ? 'white' : selectionColor,
              fontSize:9
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ToggleButton;