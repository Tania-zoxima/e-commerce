import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import EditQuantity from "../../../Components/EditQuantity/EditQuantity";
import { Picker, Input } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import SearchableDropdown from "App/Components/SearchableDropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import InputNumber from "App/Components/FormInput/InputNumber";

const SecondaryItemCard = ({
  name,
  p_id,
  onRemoveClick,
  quantity,
  onChangeQuantity,
  data,
  data_qty,
  amount,
}) => (
  <View style={styles.head}>
    <View style={styles.v2}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 2.5, width: "100%" }}>
          <Text style={styles.name_text}>{p_id}</Text>
        </View>

        {/* <View style={styles.qty}>
                    <EditQuantity value={Number(quantity)} onChange={(value) => onChangeQuantity(Number(value))} key={quantity} />
                </View> */}
        <View style={styles.v3}>
          <TouchableOpacity onPress={onRemoveClick}>
            <GenericIcon name="delete" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text
          style={{
            marginLeft: wp("4%"),
            marginTop: hp("1%"),
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>

      <View style={styles.ndp}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: wp("35%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 1,
                fontWeight: "bold",
              }}
            >
              Return Qty
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#ed1b24",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              {data_qty ? data_qty : 0}
            </Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: "row", marginTop: 10, width: wp("55%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                fontWeight: "bold",
                right: wp("12%"),
                marginTop: hp("0.8%"),
                width: wp("25%"),
              }}
            >
              Return Qty
            </Text>
          </View>
          <View style={{ marginRight: wp("10%") }}>
            <EditQuantity
              value={Number(data_qty)}
              onChange={(data_qty) => onChangeQuantity(Number(data_qty))}
              key={data_qty}
            />
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: wp("35%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 1,
                fontWeight: "bold",
              }}
            >
              Total QTY
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#ed1b24",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              {amount ? amount : 0}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%"),right:wp("22.5%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 1,
                fontWeight: "bold",
              }}
            >
              Location
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#F66A67",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 1,
              }}
            >
              {data ? data : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  head: {
    alignItems: "center",
    marginTop: 0,
    margin: 10,
  },
  name_text: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 18,
    fontWeight: "bold",
    color: Colors.darkRedPink,
  },
  v2: {
    width: "95%",
    paddingBottom: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000026",
    backgroundColor: "#F4F4F4E8",
    elevation: 5,
  },
  qty: {
    width: "100%",
    flex: 2,
    height: 20,
    marginLeft: 10,
    marginTop: 15,
  },
  v3: {
    marginLeft: 10,
    marginTop: 2.13,
    width: "100%",
    flex: 1,
  },
  icon: {
    color: "black",
    fontSize: 20,
    marginRight: 15,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  ndp: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  view2: {
    width: 104,
    height: 26,
    marginTop: 11,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#70707078",
  },
  picker2: {
    borderRadius: 0,
    width: wp("36%"),
    height: hp("4.5%"),
    elevation: 0,
    paddingHorizontal: 0,
    backgroundColor: Colors.white,
    borderWidth: 0.5,
  },
  pickerLabel: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
});

export default SecondaryItemCard;
