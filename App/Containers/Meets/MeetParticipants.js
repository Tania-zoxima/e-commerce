import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Styles from "./MeetStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ApplicationStyles, Colors } from "App/Theme";
import Modal from "react-native-modal";
import AddParticipant from "./AddParticipant";

function MeetParticipants() {
  const [data, setdata] = useState([
    {
      name: "Shyam Retailers",
      phone: "90247982464",
      id: "1",
    },
    {
      name: "Shyam Retailers",
      phone: "90247982464",
      id: "2",
    },
    {
      name: "Shyam Retailers",
      phone: "90247982464",
      id: "3",
    },
    {
      name: "Shyam Retailers",
      phone: "90247982464",
      id: "4",
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.darkRedPink,
          width: wp("40%"),
          height: hp("5%"),
          justifyContent: "center",
          marginTop: hp("4%"),
          marginLeft: wp("55%"),
        }}
        onPress={toggleModal}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.white,
            fontWeight: "bold",
          }}
        >
          Add Participants
        </Text>
      </TouchableOpacity>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 90,
          paddingTop: 10,
          paddingLeft: 10,
        }}
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 0.5,
              marginTop: hp("5%"),
              padding: 20,
              marginHorizontal: 15,
              borderColor: Colors.lightGrey,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Colors.darkRedPink,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 11,
                paddingTop: 10,
                color: Colors.grey,
                fontWeight: "bold",
              }}
            >
              {item.phone}
            </Text>
          </View>
        )}
      />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{fontSize:20,marginLeft:hp("42%"),fontWeight:"bold"}}>X</Text>
          </TouchableOpacity>
          <AddParticipant/>
        </View>
      </Modal>
    </View>
  );
}

export default MeetParticipants;
