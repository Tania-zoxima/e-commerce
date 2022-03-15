import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ApplicationStyles, Colors } from "App/Theme";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backIcon: {
    color: Colors.button,
    padding: 15,
    fontSize: wp("6%"),
  },

  tabs: {
    flex: 1,
    marginTop: hp("3%"),
    width: "90%",
    alignSelf: "center",
  },
  plusIcon: {
    borderRadius: 50,
    // bottom: 40,
    position: "absolute",
    // left: 10,
    top: hp("40%"),
    left: wp("80%"),
    borderRadius: 50,
    height: 45,
    width: 45,
    backgroundColor: Colors.button,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  heading: {
    alignSelf: "center",
    color: "#0720C4",
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 10,
  },
});
