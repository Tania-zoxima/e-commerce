import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
// import EditQuantity from "../../../Components/EditQuantity/EditQuantity";
import { Picker } from "native-base";
import GenericIcon from "App/Components/GenericIcon";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import SearchableDropdown from "App/Components/SearchableDropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HelperService } from "App/Services/Utils/HelperService";
// import Styles from "../../Menu/MenuInfoTuple/Styles";

const VariableCard = ({
  discount,
  productCode,
  productName,
  Number,

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
  amount,
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      width: wp(95),
      left: wp(2.5),
      height: hp(5),
      marginBottom: hp(1),
      // margin: 4,
      marginTop: hp(1),
      paddingLeft: wp("2%"),
      paddingRight: wp("2%"),
      borderColor: Colors.darkRedPink,
      elevation: 5,
      borderWidth: 0.5,
      shadowColor: Colors.darkRedPink,
    }}
  >
    <Text
      style={{
        textAlignVertical: "center",
        width: wp("9%"),
        borderColor: Colors.darkRedPink,
        borderRightWidth: 2,
        color: Colors.black,
        right: wp("-3%"),
      }}
    >
      {Number}
    </Text>
    <Text
      style={{
        textAlignVertical: "center",
        // width: wp("30%"),
        // borderColor: Colors.darkRedPink,
        // borderRightWidth: 2,
        color: Colors.black,
        right:wp("9%")
      }}
    >
      {productCode}
    </Text>
    <Text
      style={{
        textAlignVertical: "center",
        //  width: wp("3%"),
        // borderColor: Colors.darkRedPink,
        // borderRightWidth: 2,
        color: Colors.black,
        // fontSize:8
        right:wp("7%")
      }}
      // value={productName}
    >
      {productName}
    </Text>

    <Text
      style={{
        textAlignVertical: "center",
        // width: wp("30%"),
        // borderColor: Colors.darkRedPink,
        // borderRightWidth: 2,
        color: Colors.black,
        right: wp("5%"),
        alignSelf: "center",
      }}
    >
      {discount +"%"}
    </Text>
  </View>
  // <View style={styles.head}>
  //   <View style={styles.v2}>
  //     <View style={{ flexDirection: "row", justifyContent: "center" }}>
  //       <View style={{ flex: 2.5, width: "100%" }}>
  //         <Text style={styles.name_text}>{p_id}</Text>
  //       </View>

  //       {/* <View style={styles.qty}>
  //                   <EditQuantity value={Number(quantity)} onChange={(value) => onChangeQuantity(Number(value))} key={quantity} />
  //               </View> */}
  //       <View style={styles.v3}>
  //         <TouchableOpacity onPress={onRemoveClick}>
  //           <GenericIcon name="delete" style={styles.icon} />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <View>
  //       <Text
  //         style={{
  //           marginLeft: wp("4%"),
  //           marginTop: hp("1%"),
  //           fontWeight: "bold",
  //         }}
  //       >
  //         {name}
  //       </Text>
  //     </View>

  //     <View style={styles.ndp}>
  //       <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%") }}>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text style={{ fontSize: 14, color: "#666666C4", marginTop:1 }}>
  //             Discount
  //           </Text>
  //         </View>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               color: "#F66A67",
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               marginTop: 1,
  //             }}
  //           >
  //             {price ? HelperService.currencyValue(price) : 0}
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%") }}>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text style={{ fontSize: 14, color: "#666666C4", marginTop: 1 }}>
  //             Location
  //           </Text>
  //         </View>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               color: "#F66A67",
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               marginTop: 1,
  //             }}
  //           >
  //             {data ? data : 0}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%") }}>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text style={{ fontSize: 14, color: "#666666C4", marginTop: 1 }}>
  //             Bags
  //           </Text>
  //         </View>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               color: "#F66A67",
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               marginTop: 1,
  //             }}
  //           >
  //             {data_qty ? data_qty : 0}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%") }}>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text style={{ fontSize: 14, color: "#666666C4", marginTop: 1 }}>
  //             UPP
  //           </Text>
  //         </View>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               color: "#F66A67",
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               marginTop: 1,
  //             }}
  //           >
  //             {amount ? amount : 0}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: "row", marginTop: 10, width: wp("35%") }}>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text style={{ fontSize: 14, color: "#666666C4", marginTop: 1 }}>
  //             Total QTY
  //           </Text>
  //         </View>
  //         <View style={{ width: "100%", flex: 1 }}>
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               color: "#F66A67",
  //               fontSize: 14,
  //               fontWeight: "bold",
  //               marginTop: 1,
  //             }}
  //           >
  //             {amount ? amount : 0}
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // </View>
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

export default VariableCard;
