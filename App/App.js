import React, { Component } from "react";
import { Provider } from "react-redux";
import { ReduxNetworkProvider } from "react-native-offline";
import { PersistGate } from "redux-persist/lib/integration/react";
import createStore from "App/Stores";
import RootScreen from "./Containers/Root/RootScreen";
import Loading from "App/Components/Loading";
import firebase from "react-native-firebase";
import AsyncStorage from "@react-native-community/async-storage";
if (Platform.OS === "android") {
  const channel = new firebase.notifications.Android.Channel(
    "test-channel",
    "Test Channel",
    firebase.notifications.Android.Importance.Max
  ).setDescription("My apps test channel");
  firebase.notifications().android.createChannel(channel);
}
const messaging = firebase.messaging();
messaging
  .hasPermission()
  .then((enabled) => {
    if (enabled) {
      messaging
        .getToken()
        .then(async (token) => {
          AsyncStorage.setItem("@fcmtoken", JSON.stringify(token));
          // console.log('fcm token====>',token);
        })
        .catch((error) => {
          //console.log('erorr', error);
        });
    } else {
      messaging
        .requestPermission()
        .then(() => {})
        .catch((error) => {
          // console.log('erorr', error);
        });
    }
  })
  .catch((error) => {});

const { store, persistor } = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxNetworkProvider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <RootScreen />
          </PersistGate>
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}
