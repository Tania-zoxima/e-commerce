import React, { useState } from "react";
import { WebView } from "react-native-webview";
import * as Progress from "react-native-progress";
import { ScrollView, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import base64 from "react-native-base64";
import { connect } from "react-redux";
import UserActions from "App/Stores/User/Actions";
import GenericIcon from "App/Components/GenericIcon";
import NavigationService from "App/Services/NavigationService";

const LoyaltyDash = (props) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  let newurl = props.navigation.state.params;
  let mobile = props.logindata.zx_mobileno
    ? base64.encode("8220021381")
    : "";
  let url = "";
  if (newurl.id == "1") {
    url = `https://stage.firsthive.com/princepipes_v2_CnD/user/dashboardOneviewiFrame.php`;
  }
  if (newurl.id == "2") {
    url = `https://stage.firsthive.com/princepipes_v2_CnD/user/dashboardPerformancePartnersiFrame.php`;
  }
  if (newurl.id == "3") {
    url = `https://stage.firsthive.com/princepipes_v2_CnD/user/dashboardPointExpiryiFrame.php`;
  }
  if (newurl.id == "4") {
    url = `https://stage.firsthive.com/princepipes_v2_CnD/user/dashboardTop10iFrame.php`;
  }

  // let url = `https://stage.firsthive.com/princepipes_v2_CnD/reports/ledgerReportiFrame.php`;
  url += `?mobileNo=${mobile}`;
//   console.log("url", url);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {!isLoaded ? (
        <Progress.Bar
          progress={progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color="#ff8300"
        />
      ) : null}
      <GenericIcon
        name={"arrow-back"}
        onPress={NavigationService.goback}
        style={{ color: "#ed1b24", padding: 5, fontSize: 30 }}
      />
      <WebView
        source={{
          uri: url,
          headers: { key: "value" },
        }}
        // source={{ html: '<h1>This is a statsampleic HTML source!</h1>' }}
        // source={source}
        onError={(event) =>
          alert(`Webview error: ${event.nativeEvent.description}`)
        }
        // injectedJavaScript={javascript}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoadEnd={() => setLoaded(true)}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  logindata: state.user.user_details,
});
export default connect(mapStateToProps)(LoyaltyDash);
