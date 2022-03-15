import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import NavigationService from "App/Services/NavigationService";
import Modal from "react-native-modal";

function TrainingAll() {
  const [data, setdata] = useState([
    {
      name: "Training A",
      category: "Functional",
      id: "1",
      startdate: "19/07/2021",
      enddate: "19/08/2021",
    },
    {
      name: "Training B",
      category: "Awareness",
      id: "2",
      startdate: "19/07/2021",
      enddate: "19/08/2021",
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        //    initialNumToRender={7}
        renderItem={({ item }) => (
          <DisplayCard
            dark={false}
            style={{
              backgroundColor: Colors.white,
              borderColor: Colors.darkRedPink,
              borderWidth: 0.5,
            }}
            heading={item.name}
            Styletitle={Styles.head}
            //   icon={"check"}
            //   iconstyle={Styles.checkicon}
            status={"ENROLL"}
            Stylestatus={Styles.status}
            onPressstatus={toggleModal}
            content={[
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Category"}
                value={item.category}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"Start Date"}
                value={item.startdate}
              />,
              <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                label={"End Date"}
                value={item.enddate}
              />,
            ]}
          />
        )}
      />
      <Modal isVisible={isModalVisible}>
        <View style={{  backgroundColor: "white",height:hp("20%")}}>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: hp("42%"),
                fontWeight: "bold",
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default TrainingAll;
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: hp("0%"),
  },
  cardstyle: {
    backgroundColor: Colors.darkRedPink,
    width: wp("100%"),
    top: hp("-1%"),
    height: hp("15%"),
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  backarrow: {
    color: Colors.white,
    fontSize: 32,
    paddingLeft: 7,
    paddingTop: 20,
  },
  title: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
    left: wp("15%"),
    top: hp("-1%"),
  },
  head: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  titleText: {
    color: Colors.black,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 28,
    fontWeight: "bold",
  },
  checkicon: {
    left: wp("75%"),
    top: hp("-4%"),
    backgroundColor: Colors.darkRedPink,
    color: Colors.white,
    borderRadius: 50,
    height: hp(4),
    width: wp(8),
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  ttl: {
    color: Colors.lightGrey,
    fontSize: wp("3.5%"),
    fontFamily: ApplicationStyles.textFont,
    left: wp("18%"),
    fontWeight: "bold",
  },
  detail: {
    color: Colors.black,
    fontSize: wp("3.7%"),
    fontFamily: ApplicationStyles.textMsgFont,
    right: wp("18%"),
    fontWeight: "bold",
  },
  status: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    backgroundColor: Colors.darkRedPink,
    fontSize: 12,
    width: wp("20%"),
    padding: wp(1.4),
    borderRadius: 2,
    // top: hp("-0.2%"),
    marginLeft: wp("38%"),
    height: hp("3.7%"),
    textAlign: "center",
    elevation: 3,
  },
});
