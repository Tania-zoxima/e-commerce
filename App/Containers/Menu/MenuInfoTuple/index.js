import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Icon } from "native-base";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import Style from "./Styles";
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
import BackArrowButton from "App/Components/BackArrowButton";
import { Spinner } from "native-base";

const MenuInfoTuple = ({
  onPress,
  areas,
  data,
  id,
  Show,
  onPressLogoout,
  loading,
  profilepic,
  onImageSuccess,
  ImageLoader,
}) => {
  let [image, setImage] = useState("");
  let [filepath, setFilePath] = useState({
    data: "",
    uri: "",
  });
  let [fileUri, setFileUri] = useState("");
  let [fileData, setFileData] = useState("");
  let [load, setLoad] = useState(ImageLoader);

  // console.log("prrrrttttccc", ImageLoader);

  return (
    <View
      style={
        data.zx_brandgroupcode == "1"
          ? [Style.box, { backgroundColor: Colors.lightPink }]
          : [Style.box, { backgroundColor: Colors.lightbluebackground }]
      }
      onPress={onPress}
    >
      <View style={{ marginLeft: "0%", marginTop: "0%" }}>
        {fileData ? (
          <Image
            style={{ width: 120, height: 80 }}
            source={{ uri: "data:image/jpeg;base64," + fileData }}
          />
        ) : (
          <View style={Style.userCircle}>
            <Image
              style={{ width: 120, height: 80, left: "27%", zIndex: 1000 }}
              source={{ uri: profilepic }}
            />
            <Icon
              name={"ios-person"}
              ios={"ios-person"}
              android={"md-person"}
              style={
                data.zx_brandgroupcode == "1"
                  ? {
                      color: Colors.primary,
                      paddingRight: 5,
                      fontSize: wp("8.8%"),
                      right: 57,
                    }
                  : {
                      color: Colors.bluebackground,
                      paddingRight: 5,
                      fontSize: wp("8.8%"),
                      right: 57,
                    }
              }
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
                  const source = { uri: response.uri };
                  onImageSuccess({
                    image: response.uri,
                    filename: response.fileName,
                  });
                  setFilePath(response),
                    setFileData(response.data),
                    setFileUri(response.uri);
                  {
                    load ? (
                      <View
                        style={{
                          marginVertical: 0,
                          position: "absolute",
                          backgroundColor: "rgba(232, 229, 229, 0.5)",
                          height: "58%",
                          width: "100%",
                          zIndex: 2,
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                          borderRadius: 5,
                          marginTop: "1%",
                        }}
                      >
                        <Spinner color={Colors.primary} />
                        {/* <Text style={{color: Colors.primary}}>Loading...</Text> */}
                      </View>
                    ) : (
                      []
                    );
                  }

                  //   if(ImageLoader){

                  //     <View style={Style.spinner}>
                  //       <Spinner color={Colors.primary} />
                  //       <Text style={{color: Colors.primary}}>Processing Image...</Text>
                  //     </View>

                  // }
                }
              });
            } else {
              Alert.alert(
                "Storage permission Denied.",
                'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for Prince-Pipes.'
              );
            }
          }}
          style={Style.icon}
        >
          {Show?[]:<Icon
            name={"ios-camera"}
            ios={"ios-camera"}
            android={"md-camera"}
            style={
              data.zx_brandgroupcode == "1"
                ? { color: Colors.button, marginTop: "2%" }
                : { color: Colors.bluebackground, marginTop: "2%" }
            }
          />}
        </TouchableOpacity>

        {Show ? (
          []
        ) : (
          <View style={{ left: "200%", height: "25%", top: "12%" }}>
            <BlueButton
              title={"LOG OUT"}
              style={{ ...Style.button }}
              textStyle={
                data.zx_brandgroupcode == "1"
                  ? {
                      fontSize: wp("3.2%"),
                      fontWeight: "bold",
                      marginRight: wp("0%"),
                      color: Colors.primary,
                    }
                  : {
                      fontSize: wp("3.2%"),
                      fontWeight: "bold",
                      marginRight: wp("0%"),
                      color: Colors.bluebackground,
                    }
              }
              onPress={onPressLogoout}
              disabled={loading}
              loading={loading}
            ></BlueButton>
          </View>
        )}
      </View>
      <View style={Style.userDtl}>
        <Text
          style={data.zx_brandgroupcode == "1" ? Style.title : Style.titleBlue}
        >
          {" "}
          {data && data.zx_firstname ? data.zx_firstname : "NA"}{" "}
          {data && data.zx_lastname ? data.zx_lastname : " NA"}
        </Text>

        <Text style={Style.desc}>
          {data && data.zx_mobileno ? data.zx_mobileno : "NA"}
        </Text>
        <Text style={Style.desc}>
          {data && data.zx_emailid ? data.zx_emailid : "NA"}
        </Text>
        {Show ? (
          <Text
            style={
              data.zx_brandgroupcode == "1"
                ? {
                    color: Colors.darkRedPink,
                    fontSize: wp("3.6%"),
                    fontWeight: "700",
                    alignSelf: "flex-end",
                    marginRight: "20%",
                    marginTop: "1%",

                    fontFamily: ApplicationStyles.textFont,
                  }
                : {
                    color: Colors.bluebackground,
                    fontSize: wp("3.6%"),
                    fontWeight: "700",
                    alignSelf: "flex-end",
                    marginRight: "20%",
                    marginTop: "1%",

                    fontFamily: ApplicationStyles.textFont,
                  }
            }
            onPress={() => NavigationService.navigate("ChangePassword")}
          >
            Change Password{" "}
          </Text>
        ) : (
          <View style={{ width: "35%", left: wp("1%"), top: hp("0.5%") }}>
            <Text
              style={Style.desc1}
              onPress={() => NavigationService.navigate("MenuDetailScreen")}
            >
              View Profile{" "}
            </Text>
          </View>
        )}
        {/* {Show ? (
          []
        ) : (
          <BlueButton
            title={"LOG OUT"}
            style={{ ...Style.button }}
            textStyle={
              data.zx_brandgroupcode == "1"
                ? {
                    fontSize: wp("3.2%"),
                    fontWeight: "bold",
                    marginRight: wp("0%"),
                    color: Colors.primary,

                  }
                : {
                    fontSize: wp("3.2%"),
                    fontWeight: "bold",
                    marginRight: wp("0%"),
                    color: Colors.bluebackground,
                  }
            }
            onPress={onPressLogoout}
            disabled={loading}
            loading={loading}
          ></BlueButton>
        )} */}

        {/* {Show ? (
          <TouchableOpacity style={{backgroundColor:"yellow",width:wp("30%"),alignSelf:"flex-end"}}>
            <Text>Change Password</Text>
          </TouchableOpacity>
        ) : (
          []
        )} */}
      </View>
    </View>
  );
};
export default MenuInfoTuple;
