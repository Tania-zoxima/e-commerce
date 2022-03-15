import React from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Style from "./SelectedVisitCardStyles";
import { Icon, Input, Button, ActionSheet } from "native-base";
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
import DatePicker from "App/Components/DatePicker";
import ActionModal from "App/Components/ActionModal";
import Address from "App/Components/Address";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";

import DatePickerStyles from "App/Components/DatePicker/DatePickerStyles";
import RecurrenceSelection from "App/Containers/Visits/RecurrenceSelection";
import { widthPercentageToDP } from "react-native-responsive-screen";

const UnplannedVisitCard = ({
  name,
  type,
  categoryRatingMapping,
  onRemoveClick,
  plannedVisitData,
  id,
  sfid,
  editSelectedVisits,
  recurringMapping,
  agentid,
  psmList,
  code
}) => {
  let datePickerNode = (
    <Text style={Style.detail}>
      {`${HelperService.dateReadableFormatWithHyphen(
        plannedVisitData.zx_visitdate2
      )}  `}
      <GenericIcon
        name="create"
        style={code=="1"?{
          ...DatePickerStyles.icon,
          ...DatePickerStyles.iconActive,
          ...{ color: Colors.button, fontSize: 20, marginBottom: 0 },
        }:{
			...DatePickerStyles.icon,
			...DatePickerStyles.iconActive,
			...{ color: Colors.bluebackground, fontSize: 20, marginBottom: 0 },
		  }}
      />
      <Text style={code=="1"?{ color: Colors.button, fontSize: 13 }:{ color: Colors.bluebackground, fontSize: 13 }}> Edit</Text>
    </Text>
  );

  let recurringNode = (
    <View style={Style.strip}>
      <Text style={Style.detail}>{plannedVisitData.recurring_on}</Text>
      <Text style={Style.ttl}>
        <GenericIcon name={`repeat`} style={{ ...Style.ttlIcon }} />
        {"  Recurring on"}
      </Text>
    </View>
  );

  let recurringDateNode = (
    <View style={Style.strip}>
      <Text style={Style.detail}>
        {HelperService.dateReadableFormat(plannedVisitData.till_date)}
      </Text>
      <Text style={Style.ttl}>
        <GenericIcon name={`calendar`} style={{ ...Style.ttlIcon }} />
        {"  Recurring Till Date"}
      </Text>
    </View>
  );

  recurringNode = plannedVisitData.recurring_on ? recurringNode : [];
  recurringDateNode = plannedVisitData.till_date ? recurringDateNode : [];

  return (
    <View style={Style.box}>
      <View style={Style.tuple}>
        <View style={Style.userDtl}>
          <Text style={code=="1"?Style.title:Style.titleBlue}>{plannedVisitData.name}</Text>
        </View>
        <TouchableOpacity
          selected={false}
          disabled={false}
          onPress={() => onRemoveClick()}
        >
          <GenericIcon
            name="delete"
            style={code=="1"?{
              color: Colors.button,
              fontSize: 20,
              marginRight: 0,
              marginLeft: widthPercentageToDP("15%"),
            }:{
				color: Colors.bluebackground,
				fontSize: 20,
				marginRight: 0,
				marginLeft: widthPercentageToDP("15%"),
			  }}
          />
        </TouchableOpacity>
      </View>
      <View style={Style.btmBox}>
        <View style={Style.strip}>
          <Address
            style={{ color: Colors.grey, fontWeight: "800" }}
            value={`${plannedVisitData.address1_line1}`}
          />

          {/* <Text style={Style.detail}>{type}</Text> */}
          {/* <Text style={Style.ttl}> */}
          {/* <GenericIcon
							name={`business`}
							style={{ ...Style.ttlIcon }}
						/> */}
          {/* {'  Type'}
					</Text> */}
        </View>
        <View style={Style.strip}>
          <GenericDisplayCardStrip label={"Visit Date"} key={"Visit Date"} />
          <DatePicker
            allowRangeSelection={false}
            minDate={HelperService.getNextNDayTimestamp(1)}
            selectedStartDate={plannedVisitData.zx_visitdate2}
            selectedEndDate={plannedVisitData.zx_visitdate2}
            onDateChange={(params) =>
              editSelectedVisits({
                id: id,
                edited_field: "zx_visitdate2",
                edited_value: HelperService.dateReadableFormatWithHyphen(
                  params.selectedStartDate
                ),
              })
            }
            iconStyle={{ marginBottom: 0 }}
          >
            {datePickerNode}
          </DatePicker>

          {/* <Text style={Style.ttl}>
						<GenericIcon
							name={`date-range`}
							style={{ ...Style.ttlIcon }}
						/>
						{'  Visit date'}
					</Text> */}
        </View>
        {/* <View style={Style.strip}>
					<Text style={Style.detail}>{plannedVisitData.zx_team== agentid ? 'Self' : HelperService.findMatchingKeyValueInList(psmList, 'id', plannedVisitData.team_id__c, 'name')}</Text>
					<Text style={Style.ttl}>
						<GenericIcon
							name={`person`}
							style={{ ...Style.ttlIcon }}
						/>
						{'  Assigned to'}
					</Text>
				</View> */}
        <GenericDisplayCardStrip
          label={"Objective"}
          key={"Objective"}
          value={plannedVisitData.zx_visitobjective}
        />
        {plannedVisitData.zx_visitobjective=="Others"?<GenericDisplayCardStrip
          label={"Objective"}
          key={"Objective"}
          value={plannedVisitData.zx_remarksforothers}
        />:[]}
        {recurringNode}
        {recurringDateNode}
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
				
				<WhiteButton selected={false} title={'Remove'} disabled={false} onPress={() => onRemoveClick()} style={{ borderWidth: 1.5, alignSelf: 'center', backgroundColor: Colors.clrF1F9FF, height: 40, width:'50%', marginLeft:'25%' }} textStyle={{ fontSize: 14, fontFamily: ApplicationStyles.textMediumFont }}>
					<GenericIcon
						name="archive"
						style={{ color: Colors.button, fontSize: 20, marginRight: 0, marginLeft: 20 ,}}
					/>
				</WhiteButton>
			</View> */}
    </View>
  );
};

export default UnplannedVisitCard;
