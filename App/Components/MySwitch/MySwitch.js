import * as React from 'react';
import { Switch } from 'react-native-paper';
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

const MySwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }} color={Colors.darkRedPink}/>;
};

export default MySwitch;