import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Icon } from "native-base";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
// import Style from '../Menu/MenuInfoTuple/Styles';
import {
  AREA,
  PREV_ORDER_VAL,
  VISIT_THIS_WEEK,
  MAIN_COMPETETOR,
} from "App/Constants";
import { HelperService } from "App/Services/Utils/HelperService";
import NavigationService from "App/Services/NavigationService";
import GenericIcon from "App/Components/GenericIcon";
import ImagePicker from "react-native-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BlueButton from "App/Components/BlueButton";

const ImageUploaderScreen = ({
  onPress,
  areas,
  data,
  id,
  Show,
  onPressLogoout,
  loading,
}) => {
  let [image, setImage] = useState("");
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        bottom: "0%",
        left: "25%",
        width: wp("80%"),
        height: hp("35%"),
      }}
      onPress={onPress}
    >
      <View style={{ marginLeft: "0%", marginTop: "0%" }}>
        {image ? (
          <Image
            style={{ width: 120, height: 80 }}
            source={{ uri: "data:image/jpeg;base64," + image }}
          />
        ) : (
          <View style={Style.userCircle}>
            <Icon
              name={"ios-person"}
              ios={"ios-person"}
              android={"md-person"}
              style={{
                color: Colors.white,
                paddingRight: 5,
                fontSize: wp("8.8%"),
              }}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={async () => {
            var options = {
              title: "Select Image",
              storageOptions: {
                skipBackup: true,
                path: "images",
              },
            };

            let permission = await HelperService.requestMultipleStoragePermission();

            if (permission) {
              ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                  alert(response.customButton);
                } else {
                  setImage(response.data);
                }
              });
            } else {
              Alert.alert(
                "Storage permission Denied.",
                'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for Vikas.'
              );
            }
          }}
          style={Style.icon}
        >
          <Icon
            name={"ios-add"}
            ios={"ios-add"}
            android={"md-add"}
            style={{
              color: Colors.firozi,
              bottom: "63%",
              marginRight: "82%",
              fontSize:30
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ImageUploaderScreen;

const Style = StyleSheet.create({
  userCircle: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: "row",
    borderColor: Colors.firozi,
    borderWidth: 1,
    borderStyle: "dashed",
    height: "54%",
    justifyContent: "center",
    width: "25%",
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "30%",
  },
});
