import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Style from "./VisitCardStyles";
import HorziontalStrip from "../../../Components/GenericDisplayCard/GenericDisplayCardStrip";
import { Icon, Input, Button } from "native-base";
import {
  AREA,
  PREV_ORDER_VAL,
  VISIT_THIS_WEEK,
  MAIN_COMPETETOR,
} from "App/Constants";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import NavigationService from "App/Services/NavigationService";
import { HelperService } from "App/Services/Utils/HelperService";
import Ratings from "App/Components/Ratings";
import WhiteButton from "App/Components/WhiteButton";
import BlueButton from "App/Components/BlueButton";
import GenericIcon from "App/Components/GenericIcon";
import TextAvatar from "App/Components/TextAvatar";
import VisitStatusBar from "App/Containers/Visits/VisitStatusBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const VisitCard = ({
  visitData,
  orderData,
  categoryRatingMapping,
  onEditClick,
  onCancelClick,
  onPressStartVisit,
  onPressEndVisit,
  startVisitDisabled,
  endVisitDisabled,
  startVisitLoading,
  endVisitLoading,
  editDisabled,
  cancelDisabled,
  isASM,
  psmAssigned,
  showPsmDetails,
  startVisitText,
  disabled,
  actionVisible,
  infoVisible,
  code,
}) => {
  const [count, setCount] = useState(false);
  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: Colors.white,
        width: wp("90%"),
        borderRadius: 15,
        elevation: 8,
        borderColor: Colors.lightPink,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: wp("65%"),
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: wp("3.9%"),
            width: wp("60%"),
            fontFamily: ApplicationStyles.textMediumFont,
            fontWeight: "bold",
            marginLeft: wp("3%"),
            top: hp("1%"),
          }}
        >
          {visitData.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            position: "absolute",
            left: wp("60%"),
          }}
        >
          {visitData.zx_visitstatus == "Open" ? (
            <BlueButton
              style={{
                height: "7%",
                marginTop: hp("1.5%"),
                backgroundColor: Colors.cardblue,
                borderRadius: 7,
              }}
              title={visitData.zx_visitstatus}
              textStyle={{ fontSize: 9 }}
            />
          ) : visitData.zx_visitstatus == "Completed" ? (
            <BlueButton
              style={{
                height: "7%",
                marginTop: hp("1.5%"),
                backgroundColor: Colors.cardblue,
                borderRadius: 7,
              }}
              title={visitData.zx_visitstatus}
              textStyle={{ fontSize: 9 }}
            />
          ) : (
            <BlueButton
              style={{
                height: "7%",
                marginTop: hp("1.5%"),
                backgroundColor: Colors.cardblue,
                borderRadius: 7,
              }}
              title={visitData.zx_visitstatus}
              textStyle={{ fontSize: 9 }}
            />
          )}

          {visitData.zx_visitstatus == "Open" ? (
            <GenericIcon
              show={true}
              name={"pencil"}
              style={
                visitData.zx_visitstatus == "Completed"
                  ? {
                      marginTop: 2,
                      width: 20,
                      height: 15,
                      fontSize: 15,
                      color: Colors.darkGrey,
                      marginLeft: wp("1%"),
                    }
                  : visitData.zx_visitstatus == "Open"
                  ? {
                      marginTop: hp("1.5%"),
                      width: 20,
                      height: 15,
                      fontSize: 18,
                      color: Colors.darkGrey,
                      marginLeft: wp("3%"),
                    }
                  : {
                      marginTop: 2,
                      width: 20,
                      height: 15,
                      fontSize: 15,
                      color: Colors.darkGrey,
                      marginLeft: wp("1%"),
                    }
              }
              onPress={onEditClick}
            />
          ) : (
            []
          )}
        </View>
      </View>

      <Text
        style={{
          color: Colors.black,
          marginLeft: "0.8%",
          fontSize: 13,
          marginTop: hp("1%"),
          marginLeft: hp("1.5%"),
        }}
      >
        Customer No: {visitData.accountnumber}
      </Text>

      <View
        style={{
          flexDirection: "row",
          width: wp("90%"),
          marginTop: hp("1%"),
        }}
      >
        {actionVisible ? (
          <View
            style={{
              flexDirection: "row",
              width: wp("30%"),
              justifyContent: "center",
              left: wp("1%"),
            }}
          >
            {visitData.zx_visitstatus == "Started" ? (
              <GenericIcon
                show={true}
                name={"pause-circle"}
                onPress={onPressStartVisit}
                style={{
                  // marginTop: 3,
                  width: 45,
                  height: 45,
                  fontSize: 45,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "green",
                  zIndex: 500,
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={onPressStartVisit}
                style={
                  code == "1"
                    ? {
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: 100,
                        backgroundColor: Colors.darkRedPink,
                        margin: 4,
                      }
                    : {
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: 100,
                        backgroundColor: Colors.bluebackground,
                        margin: 4,
                      }
                }
              >
                <Text
                  style={{
                    fontSize: 9,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}
                >
                  START
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onPressEndVisit}
              style={
                code == "1"
                  ? {
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 1,
                      borderRadius: 100,
                      backgroundColor: Colors.darkRedPink,
                      margin: 4,
                    }
                  : {
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 1,
                      borderRadius: 100,
                      backgroundColor: Colors.bluebackground,
                      margin: 4,
                    }
              }
            >
              <Text
                style={{
                  fontSize: 9,
                  color: Colors.white,
                  fontWeight: "bold",
                }}
              >
                END
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              width: wp("30%"),
              justifyContent: "center",
            }}
          ></View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: wp("25%"),
            // marginLeft: wp("-25%"),
            top: hp("7%"),
            right: wp("25%"),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ height: hp("3%") }}>
              <GenericIcon
                show={true}
                name={"phone"}
                onPress={() => {
                  visitData.telephone1
                    ? HelperService.callNumber(visitData.telephone1)
                    : HelperService.showToast({
                        message: "Phone Number Not Available",
                        duration: 2000,
                        buttonText: "Okay",
                      });
                }}
                style={{
                  marginTop: 3,
                  width: 20,
                  height: 15,
                  fontSize: 15,
                  color: Colors.black,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ height: hp("3%") }}>
              <GenericIcon
                show={true}
                name={"target"}
                onPress={() => {
                  visitData.address1_latitude && visitData.address1_longitude
                    ? HelperService.showDirectionInGoogleMaps(
                        visitData.address1_latitude,
                        visitData.address1_longitude
                      )
                    : HelperService.showToast({
                        message: "Geo Location Not Available",
                        duration: 2000,
                        buttonText: "Okay",
                      });
                }}
                style={{
                  marginTop: 3,
                  width: 20,
                  height: 17,
                  fontSize: 18,
                  color: Colors.black,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: wp("45%"),
            right: wp("15%"),
          }}
        >
          <HorziontalStrip
            label={"Type"}
            value={visitData.zx_visittype}
            valueStyle={{
              color: Colors.black,
              textAlign: "left",

              fontSize: 12,
            }}
            labelStyle={{
              textAlign: "right",
              fontSize: 13,
              fontWeight: "bold",
            }}
          />

          <HorziontalStrip
            label={"Objective"}
            value={visitData.zx_visitobjective}
            valueStyle={{
              color: Colors.black,
              textAlign: "right",
              width: wp("20%"),
              fontSize: 12,
            }}
            labelStyle={{
              textAlign: "right",

              fontSize: 13,
              fontWeight: "bold",
            }}
          />

          <HorziontalStrip
            label={"Last visit Date"}
            value={
              visitData.last_visitdate
                ? HelperService.dateReadableFormat(visitData.last_visitdate)
                : "NA"
            }
            valueStyle={{
              color: Colors.black,
              textAlign: "left",
              fontSize: 12,
            }}
            labelStyle={{
              textAlign: "left",
              width: wp("20%"),
              fontSize: 13,
              fontWeight: "bold",
            }}
          />
          <HorziontalStrip
            label={"Visit id"}
            value={visitData.zx_recordid}
            valueStyle={{
              color: Colors.black,
              textAlign: "left",

              fontSize: 12,
            }}
            labelStyle={{
              textAlign: "right",

              fontSize: 13,
              fontWeight: "bold",
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {visitData.last_orderdate
              ? HelperService.dateReadableFormat(visitData.last_orderdate)
              : "NA"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              color: Colors.grey,
            }}
          >
            Last Order Date
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {visitData.order_last_totalamountinctax
              ? visitData.order_last_totalamountinctax
              : "NA"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              color: Colors.grey,
            }}
          >
            Last Order Value
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          top: hp("0.5%"),
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {visitData.last_invoicedate
              ? HelperService.dateReadableFormat(visitData.last_invoicedate)
              : "NA"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",

              color: Colors.grey,
            }}
          >
            Last Invoice Date
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            {visitData.saleinvoice_last_totalamount
              ? visitData.saleinvoice_last_totalamount
              : "NA"}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",

              color: Colors.grey,
            }}
          >
            Last Invoice Value
          </Text>
        </View>
      </View>

      <View style={{ margin: 10 }}>
        <TouchableOpacity
          style={{ width: wp("30%"), left: wp("55%") }}
          onPress={() => setCount(!count)}
        >
          {count ? (
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                textAlign: "right",
                color: Colors.cardblue,
              }}
            >
              View Less{" "}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                textAlign: "right",
                color: Colors.cardblue,
              }}
            >
              View More{" "}
            </Text>
          )}
        </TouchableOpacity>
        {count ? (
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {visitData.last_checkinTime
                  ? HelperService.getTimeSuffix(visitData.last_checkinTime)
                  : "NA"}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  width: wp("45%"),
                  color: Colors.grey,
                }}
              >
                Last Check In Time
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {visitData.last_checkoutTime
                  ? HelperService.getTimeSuffix(visitData.last_checkoutTime)
                  : "NA"}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  width: wp("45%"),
                  color: Colors.grey,
                }}
              >
                Last Check Out Time
              </Text>
            </View>
          </View>
        ) : (
          []
        )}
      </View>
    </View>
  );
};

export default VisitCard;
