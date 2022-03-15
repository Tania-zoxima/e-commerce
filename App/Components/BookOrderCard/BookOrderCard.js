import React, { Children } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Image,
  Switch
} from "react-native";
import Style from "./BookOrderCardStyle";
import GenericIcon from "App/Components/GenericIcon";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import Switch from "../MySwitch/MySwitch";

const BookOrderCard = ({
  content,
  heading,
  dark,
  style,
  icon,
  icon1,
  heading1,
  title,
  showSingleAddToCartAction,
  onPressAddToCart,
  isAddedInCart,
  disableAddCart,
  children,
  maketoorder,
  focus,
  onValueChange,
  value,toogle,
  showButton,
  code
}) => (
  <TouchableWithoutFeedback>
    <View
      style={
        dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }
      }
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
      <View style={{ display: "flex", flexDirection: "row",width:wp("50%") }}>
        {heading ? (
          <View>
            <Text style={dark ? Style.darkTitle : code=="1"?Style.title:Style.titleBlue}>{heading}</Text>
          </View>
        ) : (
          []
        )}
        {focus ? (
          <Image
            style={{
              width: wp("6%"),
              height: hp("3%"),
              top:hp("0.5%")
              // marginRight: wp("20%"),
              // marginTop: hp("-0.5%"),
            }}
            source={require("../../Assets/Images/star.png")}
          />
        ) : (
          []
        )}
        {maketoorder ? (
          <Image
            style={{
              width: wp("5%"),
              height: hp("2.5%"),
              top:hp("0.5%")
              // marginRight: wp("20%"),
              // marginTop: hp("-0.5%"),
            }}
            source={require("../../Assets/Images/m.png")}
          />
        ) : (
          []
        )}
        {toogle?<Switch
          style={{
            marginLeft: wp("0%"),
            alignItems: "flex-end",
            marginTop: wp("-2%"),
          }}
          trackColor={{ false: "", true: Colors.primary }}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={onValueChange}
          value={value}
        />:[]}
         </View>
        {showSingleAddToCartAction ? (
          <TouchableOpacity
            onPress={onPressAddToCart}
            disabled={disableAddCart}
          >
            {isAddedInCart?(
              showButton?<GenericIcon name={"check-circle"} style={Style.add} />:[]
            ) : (
              showButton?<GenericIcon
                name={"add-circle"}
                style={{
                  marginLeft: wp("22%"),
                  fontSize: 25,
                  color: Colors.darkRedPink,
                }}
              />:[]
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

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {content}

      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {children}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default BookOrderCard;
