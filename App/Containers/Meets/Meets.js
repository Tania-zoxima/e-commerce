import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from "react-native";
import BackArrowButton from "App/Components/BackArrowButton";
import Styles from "./MeetStyles";
import { ApplicationStyles, Colors } from "App/Theme";
import { Card } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";
import { Tab, Tabs, Icon } from "native-base";
import Approved from "./Approved";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
import SearchableDropdown from "App/Components/SearchableDropdown";
import DatePicker from "App/Components/DatePicker";
import GenericIcon from "App/Components/GenericIcon";
// import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'


function Meets() {
  const K_OPTIONS = [
    {
      item: 'Juventus',
      id: 'JUVE',
    },
    {
      item: 'Real Madrid',
      id: 'RM',
    },
    {
      item: 'Barcelona',
      id: 'BR',
    },
    {
      item: 'PSG',
      id: 'PSG',
    },
    {
      item: 'FC Bayern Munich',
      id: 'FBM',
    },
    {
      item: 'Manchester United FC',
      id: 'MUN',
    },
    {
      item: 'Manchester City FC',
      id: 'MCI',
    },
    {
      item: 'Everton FC',
      id: 'EVE',
    },
    {
      item: 'Tottenham Hotspur FC',
      id: 'TOT',
    },
    {
      item: 'Chelsea FC',
      id: 'CHE',
    },
    {
      item: 'Liverpool FC',
      id: 'LIV',
    },
    {
      item: 'Arsenal FC',
      id: 'ARS',
    },
  
    {
      item: 'Leicester City FC',
      id: 'LEI',
    },
  ]
  const [data, setdata] = useState([
    {
      name: "Shyam Retailers",
      category: "Functional",
      id: "1",
      startdate: "19/07/2021",
      enddate: "19/08/2021",
    },
  ]);
  const [selectedTeams, setSelectedTeams] = useState([])
  let datePickerNode = (
    <View>
      <GenericIcon
        name={"calendar"}
        show={true}
        style={{ fontSize: 18, color: "white", backgroundColor: "#ed1b24" }}
      />
    </View>
  );
  return (
    <View style={Styles.mainContainer}>
      <Card style={Styles.cardstyle}>
        <BackArrowButton style={Styles.backarrow} />
        <Text style={Styles.title}>{"Meets "}</Text>
        <SearchBar
            placeholder={"Search by Salesperson name" }
            // placeholder={"Search Customer..."}
            //  onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            // onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            // onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
            // value={retailerSearchFilters['searchValue']}
            ContainerStyles={Styles.searchContainer}
          />

          <SearchBar
            // placeholder={`Search by ${retailerSearchFilters['searchBy']}`}
            placeholder={"Search by retailer name or phone no."}
            // placeHolderText={placeholder}

            // onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            // onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            // onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
            // value={retailerSearchFilters['searchValue']}
            ContainerStyles={Styles.searchContainer}
            // customPickerStyles={Styles.picker}

          />
      </Card>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <SearchableDropdown
          placeHolderText={"    Select Meet Type"}
          // customPickerStyles={{ ...Style.picker }}
          // labelStyles={{ ...Style.pickerLabel }}
        />
        <Text
          style={{ fontSize: 12, color: "#ed1b24", left: "-65%", top: "4%" }}
        >
          Filter by
        </Text>
        <View style={{ right: "60%", top: "4%" }}>
          <DatePicker
            iconStyle={{ marginBottom: 0 }}
            allowRangeSelection={true}
            onDateChange={(params) => this.onDateChange(params)}
          >
            {datePickerNode}
          </DatePicker>
        </View>
        </View>
        {/* <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      /> */}
        <Tabs
          tabBarUnderlineStyle={{ width: wp("22%"), marginLeft: wp("5%"),marginBottom:hp(".5%") }}
          style={{ width: wp("95%"),marginTop:hp("1.5%") }}
        >
          <Tab
            heading="Approved "
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.darkRedPink, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.darkRedPink }}
          >
            <Approved />
          </Tab>
          <Tab
            heading="Pending"
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.darkRedPink, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.darkRedPink }}
          >
           
          </Tab>
          <Tab
            heading="Rejected"
            textStyle={{ color: "#fff", fontSize: 15 }}
            tabStyle={{ backgroundColor: Colors.darkRedPink, flex: 1 }}
            activeTextStyle={{ color: "#fff", fontSize: 15 }}
            activeTabStyle={{ backgroundColor: Colors.darkRedPink }}
          >
           
          </Tab>
        </Tabs>
        
        <TouchableOpacity style={Styles.plusIcon} onPress={() => NavigationService.navigate("NewMeet")}>
          <Icon
            name={"ios-add"}
            ios={"ios-add"}
            android={"md-add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableOpacity>
        
      </View>
    
  );
  // function onMultiChange() {
  //   return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  // }
}

export default Meets;
