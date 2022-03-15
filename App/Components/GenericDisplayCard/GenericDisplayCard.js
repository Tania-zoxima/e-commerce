import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import Style from "./GenericDisplayCardStyles";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";

const GenericDisplayCard = ({
  content,
  heading,
  dark,
  style,
  onPress,
  showSingleAddToCartAction,
  onPressAddToCart,
  disableAddCart,
  isAddedInCart,
  subHeading
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={
        dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }
      }
    >
      {heading ? (
        <View>
          <Text style={dark ? Style.darkTitle : Style.title}>{heading}</Text>
        </View>
      ) : (
        []
      )}
      {subHeading ? (
        <View>
          <Text style={dark ? Style.darksubTitle : Style.subTitle}>{subHeading}</Text>
        </View>
      ) : (
        []
      )}
      {showSingleAddToCartAction ? (
        <TouchableOpacity onPress={onPressAddToCart} disabled={disableAddCart}>
          {isAddedInCart ? (
            <GenericIcon
              name={"check-circle"}
              style={{
                marginLeft: wp("70%"),
                fontSize: 25,
                color: "green",
              }}
            />
          ) : (
            <GenericIcon
              name={"add-circle"}
              style={{
                marginLeft: wp("70%"),
                fontSize: 25,
                color: Colors.darkRedPink,
              }}
            />
          )}
        </TouchableOpacity>
      ) : (
        []
      )}
      <View>{content}</View>
    </View>
  </TouchableWithoutFeedback>
);

export default GenericDisplayCard;
