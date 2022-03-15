import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Style from "./DetailCardStyles";
import GenericIcon from "App/Components/GenericIcon";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DetailCard = ({
  content,
  heading,
  dark,
  style,
  onPress,
  heading1,
  date,
  month,
  head1style,
  heading2,
  head2style,
  headstyle,
  datestyle,
  monthstyle,
  button1,
  button2,
  buttonStyle1,
  buttonStyle,
  textStyle,
  Stylestatus,
  status,
  onPressstatus,
  icon,
  onPressicon,
  callIcon,
  iconstyle,
  statusStyle,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={
        dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }
      }
    >
      <View style={Style.leftcard}>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {heading ? (
              <View>
                <Text style={dark ? Style.darkTitle : headstyle}>
                  {heading}
                </Text>
              </View>
            ) : (
              []
            )}
            {status ? (
              <TouchableOpacity onPress={onPressstatus} style={statusStyle}>
                <Text style={dark ? Style.darkTitle : Stylestatus}>
                  {status}
                </Text>
              </TouchableOpacity>
            ) : (
              []
            )}
            <TouchableOpacity onPress={onPressicon} style={callIcon}>
              {icon ? (
                <GenericIcon
                  name={icon}
                  style={{
                    left: wp("1%"),
                    fontSize: 20,
                    color: Colors.black,
                    top: wp("0%"),
                  }}
                />
              ) : (
                []
              )}
            </TouchableOpacity>
          </View>
          {date ? (
            <View>
              <Text style={dark ? Style.darkTitle : datestyle}>{date}</Text>
            </View>
          ) : (
            []
          )}
          {month ? (
            <View>
              <Text style={dark ? Style.darkTitle : monthstyle}>{month}</Text>
            </View>
          ) : (
            []
          )}
          {heading1 ? (
            <View>
              <Text style={dark ? Style.darkTitle : head1style}>
                {heading1}
              </Text>
            </View>
          ) : (
            []
          )}
          {heading2 ? (
            <View>
              <Text style={dark ? Style.darkTitle : head2style}>
                {heading2}
              </Text>
            </View>
          ) : (
            []
          )}
        </View>

        <View>{content}</View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={buttonStyle1}>
          <Text style={textStyle}>{button1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle}>
          <Text style={textStyle}>{button2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default DetailCard;
