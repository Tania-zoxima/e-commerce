import React from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Style from "./PlannedVisitCardStyles";
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
import Address from "App/Components/Address";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SitesPlannedVisitCard from "./SitesPlannedVisitCard";
import InfluencerPlannedVisitCard from "./InfluencerPlannedVisitCard";

const PlannedVisitCard = ({
  data,
  categoryRatingMapping,
  added,
  onAddClick,
  areas,
  onEditClick,
  onRemoveClick,
  type,
  show,
  onPress,
  code
}) => {
  // console.log("Naaaam", data.name)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={Style.box}>
        <View style={Style.tuple}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={code=="1"?Style.title:Style.titleBlue}>{data.name}</Text>
              <Text style={Style.titles}>{data.address1_line1}</Text>
            </View>

            {/* <Address style={{ color: Colors.grey, fontWeight:'800',  }} value={`${data.billingstreet || ''} ${data.billingcity ? ', ' + data.billingcity  :  ''} ${data.billingpostalcode || ''}`} /> */}
            <TouchableOpacity
              style={{ width: wp("8%"), left: wp("20%"), height: hp("4%") }}
            >
              <GenericIcon
                name={"call"}
                onPress={() => {
                  data.telephone1
                    ? HelperService.callNumber(data.telephone1)
                    : HelperService.showToast({
                        message: "Phone Number Not Available",
                        duration: 2000,
                        buttonText: "Okay",
                      });
                }}
                style={{
                  borderRadius: 50,
                  width: wp("7%"),
                  height: hp("5%"),
                  marginLeft: wp("0.8%"),
                  backgroundColor: Colors.phoneClr,
                  color: Colors.white,
                  borderRadius: 50,
                  height: hp("4%"),
                  width: wp("8%"),
                  paddingLeft: wp("1.5%"),
                  paddingTop: hp("0.7%"),
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ right: "-15%" }}>
              <GenericIcon
                name={"location-on"}
                onPress={() => {
                  data.address1_latitude && data.address1_longitude
                    ? HelperService.showDirectionInGoogleMaps(
                        data.address1_latitude,
                        data.address1_longitude
                      )
                    : HelperService.showToast({
                        message: "Geo Location Not Available",
                        duration: 2000,
                        buttonText: "Okay",
                      });
                }}
                style={{
                  backgroundColor: Colors.cardblue,
                  color: Colors.white,
                  borderRadius: 50,
                  height: hp("4%"),
                  width: wp("8%"),
                  paddingLeft: "1.9%",
                  paddingRight: "1%",
                  paddingTop: "1.5%",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <GenericDisplayCardStrip
          label={"Last Order Date"}
          key={"Last Order Date"}
          value={HelperService.dateReadableFormat(
            data.last_order_date__c || ""
          )}
        />
        {/* <GenericDisplayCardStrip label={'Total Order Value'} key={ 'Total Order Value'} value={''} /> */}
        <GenericDisplayCardStrip
          label={"Last Visit Date"}
          key={"Last Visit Date"}
        />
        {/* <GenericDisplayCardStrip label={'Last Visit Date'} key={data.sfid+ 'Last Visit Date'} value={data.last_visit_date__c} /> */}

        <View style={Style.actionContainer}>
          {show ? (
            []
          ) : (
            <BlueButton
              selected={false}
              title={!added ? "ADD" : ""}
              disabled={false}
              loading={false}
              onPress={() => {
                added ? onRemoveClick() : onAddClick();
              }}
              style={code=="1"?Style.addActionButton:Style.addActionButtonBlue}
              textStyle={Style.addActionButtonText}
            >
              {added ? (
                <GenericIcon name="check" style={Style.addActionButtonIcon} />
              ) : (
                []
              )}
            </BlueButton>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlannedVisitCard;
