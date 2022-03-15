import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import EditQuantity from "../../../Components/EditQuantity/EditQuantity";
import { Picker } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import SearchableDropdown from "App/Components/SearchableDropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
import Styles from "../../Menu/MenuInfoTuple/Styles";

const LinesOrderCard = ({
  name,
  price,
  p_id,
  colour,
  dataSource,
  selectedValue,
  form,
  onRemoveClick,
  quantity,
  onChangeQuantity,
  colorValue,
  onchangeColour,
  data,
  data_qty,
  amount1,
  amount,
  valuedis,
  value,
  order_no,
  discount,
  maketoorder,
  focus,
  bags,
  location,
  value1,
  primary,
  pending,
  shipping,
  nav,
}) => (
  <View style={styles.head}>
    <View style={styles.v2}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 2.5, width: wp("100%") }}>
          <Text style={styles.name_text}>{primary?"POR-" + order_no:"SOR-" + order_no}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 2.5, width: "100%" }}>
          <Text style={styles.name_text}>
            {nav ? "Nav-" + nav : "Nav-" + "NA"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={styles.name_text}>{p_id}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf:"center"
          }}
        >
          {focus ? (
            <Image
              style={{
                width: wp("6%"),
                height: hp("3%"),
                position:"relative"
                // left: wp("0.2%"),
              }}
              source={require("../../../Assets/Images/star.png")}
            />
          ) : (
            []
          )}
          {maketoorder == "Yes" ? (
            <Image
              style={{
                width: wp("4%"),
                height: hp("2.5%"),
                position:"relative"
              }}
              source={require("../../../Assets/Images/m.png")}
            />
          ) : (
            []
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          left: wp("4%"),
          width:wp("75%")
        }}
      >
        <Text
          style={{
            textAlign:"left",
            fontWeight: "bold",
            width:wp("75%")
          }}
        >
          {name}
        </Text>
      </View>

      <View style={styles.ndp}>
        <View style={{ flexDirection: "row", marginTop: 5, width: wp("35%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              UPP
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
              }}
            >
              {price ? price : 0}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginTop: 5, width: wp("35%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Unit Price
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
              }}
            >
              {data ? HelperService.currencyValue(data) : 0}
            </Text>
          </View>
        </View>
        {primary ? (
          <View
            style={{ flexDirection: "row", marginTop: 5, width: wp("35%") }}
          >
            <View style={{ width: "100%", flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#666666C4",
                  fontWeight: "bold",
                  marginTop: hp(0),
                }}
              >
                Location
              </Text>
            </View>
            <View style={{ width: "100%", flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#ed1b24",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 0.6,
                }}
              >
                {/* <EditQuantity value={Number(data_qty)} onChange={(data_qty) => onChangeQuantity(Number(data_qty))} key={data_qty} /> */}
                {location ? location : "NA"}
              </Text>
            </View>
          </View>
        ) : (
          []
        )}
        <View style={{ flexDirection: "row", marginTop: 5, width: wp("35%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              UOM
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#ed1b24",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
              }}
            >
              {amount1 ? amount1 : "NA"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5, width: wp("35%") }}>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Bags
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#ed1b24",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
              }}
            >
              {bags ? bags : 0}
            </Text>
          </View>
        </View>
        <View
          style={
            primary
              ? { flexDirection: "row", marginTop: 5, width: wp("35%") }
              : {
                  flexDirection: "row",
                  marginTop: 5,
                  width: wp("35%"),
                  right: wp("22%"),
                }
          }
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Total Qty
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
              }}
            >
              {amount ? amount : 0}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: wp("84%"),
            marginLeft: wp("5%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Pending QTY
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
                left: wp("5%"),
              }}
            >
              {pending ? pending : 0}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: wp("84%"),
            marginLeft: wp("5%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Shipping QTY
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
                left: wp("5%"),
              }}
            >
              {shipping ? shipping : 0}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: wp("84%"),
            marginLeft: wp("5%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Total Price(without discount):
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
                left: wp("5%"),
              }}
            >
              {value ? HelperService.currencyValue(value) : 0}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: wp("84%"),
            marginLeft: wp("5%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Discount
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
                left: wp("5%"),
              }}
            >
              {discount ? HelperService.currencyValue(discount) : 0}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            width: wp("84%"),
            marginLeft: wp("5%"),
          }}
        >
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#666666C4",
                marginTop: 0.6,
                fontWeight: "bold",
              }}
            >
              Total Price(with discount)
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 0.6,
                left: wp("5%"),
              }}
            >
              {HelperService.currencyValue(value - discount)}
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
    marginTop: 10,
    margin: 10,
  },
  name_text: {
    fontSize: 19,
    marginLeft: 15,
    fontWeight: "bold",
    color: Colors.darkRedPink,
  },
  v2: {
    width: "95%",
    paddingBottom: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: Colors.background,
    backgroundColor: "white",
    elevation: 10,
    // height: hp("45%"),
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

export default LinesOrderCard;
