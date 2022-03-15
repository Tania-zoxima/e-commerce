import React, { Children } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Image,
  Switch,
} from "react-native";
import Style from "./ReturnCardStyle";
import GenericIcon from "App/Components/GenericIcon";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import Switch from "../MySwitch/MySwitch";

const ReturnCard = ({
  content,
  heading,
  dark,
  style,
  heading1,
  showSingleAddToCartAction,
  onPressAddToCart,
  isAddedInCart,
  disableAddCart,
  children,
  showButton,
  code,
  date,
  month,
}) => (
  <TouchableWithoutFeedback>
    <View
      style={
        dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }
      }
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{ display: "flex", flexDirection: "row", width: wp("50%") }}
        >
          {heading ? (
            <View>
              <Text
                style={
                  dark
                    ? Style.darkTitle
                    : code == "1"
                    ? Style.title
                    : Style.titleBlue
                }
              >
                {heading}
              </Text>
            </View>
          ) : (
            []
          )}
        </View>
        {showSingleAddToCartAction ? (
          <TouchableOpacity
            onPress={onPressAddToCart}
            disabled={disableAddCart}
          >
            {isAddedInCart ? (
              showButton ? (
                <GenericIcon name={"check-circle"} style={Style.add} />
              ) : (
                []
              )
            ) : showButton ? (
              <GenericIcon
                name={"add-circle"}
                style={{
                  marginLeft: wp("22%"),
                  fontSize: 25,
                  color: Colors.darkRedPink,
                }}
              />
            ) : (
              []
            )}
          </TouchableOpacity>
        ) : (
          []
        )}
      </View>
      {heading1 ? (
        <View>
          <Text style={dark ? Style.darkTitle : Style.head}>{heading1}</Text>
        </View>
      ) : (
        []
      )}

      {/* <View style={{ flexDirection: "column" }}>
            {date ? (
              <Text style={dark ? Style.darkTitle : Style.date}>{date}</Text>
            ) : (
              []
            )}
            {month ? (
              <Text style={dark ? Style.darkTitle : Style.month}>{month}</Text>
            ) : (
              []
            )}
          </View> */}
      <View>{content}</View>
    </View>
  </TouchableWithoutFeedback>
);

export default ReturnCard;
