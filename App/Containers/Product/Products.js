import React,{ useState} from "react";
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import GenericIcon from "App/Components/GenericIcon";

import { ScrollableTab, TabHeading, Tab, Tabs } from "native-base";
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from "App/Theme";
// import Card from '../../Components/Card/Card';
import Styles from "./ProductStyle";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Segment,
} from "native-base";
import NavigationService from "App/Services/NavigationService";
import SearchBar from "App/Components/SearchBar";
// import Card from '../../Components/Card/Card'
import WhiteButton from "App/Components/WhiteButton";
import { HelperService } from "App/Services/Utils/HelperService";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Card } from "react-native-paper";
import BackArrowButton from "App/Components/BackArrowButton";
import DisplayCard from "../../Components/DisplayCard/DisplayCard";
import DisplayCardStrip from "../../Components/DisplayCard/DisplayCardStrip";

function Products (){
 const [data, setdata] = useState([
     {name:"10/05/2021",id:"1",phone:"Design stage",firm:"Residential"},
 ])

 

    return (
      <View>
        
          <Card style={Styles.card}>
            <View
              style={{
                paddingTop: hp("0%"),
                paddingBottom: hp("1%"),
                right: "5%",
              }}
            >

              
              <BackArrowButton style={Styles.backarrow} />

            </View>
            <Text style={{ ...Styles.titleText }}>
              {"Products "}
              
            </Text>
            <SearchBar
              placeholder={"Search..."}
              ContainerStyles={Styles.searchContainer}
            />
          </Card>
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          //    initialNumToRender={7}
          renderItem={({ item }) => (
            <DisplayCard
              dark={false}
            //   onPress= {() =>  NavigationService.navigate('NewDealerScreen')}
              style={{ backgroundColor: Colors.white,borderColor:Colors.darkRedPink,borderWidth:0 }}
              iconstyle={Styles.iconstyle}
              heading={"Kanjaria pipes"}
              Styletitle={Styles.head}
              status={"open"}
               Stylestatus={Styles.status}
              icon={"call"}
              content={[
                  
                <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                  label={"Created on"}
                  value={item.name}
                />,
                <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                  label={"Stage"}
                  value={item.phone}
                />,
                <DisplayCardStrip
                stylettl={Styles.ttl}
                styledetail={Styles.detail}
                  label={"Project Type"}
                  value={item.firm}
                />,
                
                
              ]}
            />
          )}
        />
        <TouchableOpacity style={Styles.plusIcon} onPress={() => NavigationService.navigate("NewProduct")}>
          <Icon
            name={"ios-add"}
            ios={"ios-add"}
            android={"md-add"}
            style={{ color: Colors.white, fontSize: 45, alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    );
  }

export default Products;
