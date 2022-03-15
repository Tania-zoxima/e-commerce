import React,{Component} from 'react';
import {View ,Text,TouchableOpacity,ScrollView} from 'react-native';
import Style from './CompalintSecondStyle';
import InputText from 'App/Components/FormInput/InputText';
import TextArea from "App/Components/FormInput/TextArea";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService'
import BlueButton from 'App/Components/BlueButton';
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'

import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
class ComplaintSecondScreen extends Component{

render(){

return(
    <ScrollView  showsVerticalScrollIndicator={false}
    >
     <View style={Style.container2}>
     <TouchableOpacity onPress={NavigationService.goback}>
                     <GenericIcon
                      name={'arrow-back'}
                      style={Style.backIcon}
                    />
                  </TouchableOpacity>
             
                  <Text style={Style.heading}>Complaint</Text>

<View style={{marginTop:10,justifyContent:'center'}}>

<Text style={Style.label}>Category</Text>

 

 <View style={Style.textContainer2} >

 <Text >  </Text>
                         
 </View>
 

          
 <Text style={Style.label}>Sub Category</Text>
 <View style={Style.textContainer2} >
 <Text > </Text>
                         
 </View>





 
    <Text style={Style.label}>Order no.</Text>
    <View style={Style.textContainer2} >
 
 <Text ></Text>
                         
 </View>


 <Text style={Style.label}>Invoice no.</Text>
 <View style={Style.textContainer2} >
 <Text >  </Text>
                         
 </View>
 </View>
  
 <Text style={Style.label}>Description</Text>
 
 <View style={Style.textContainer} >
 <Text >  </Text>
                         
 </View>

 </View>


<View style={{width:'90%',alignSelf:'center',marginTop:20}}>
<GenericDisplayCardStrip key={'Attachment:'} label={'Attachment:'}
//value={<Text style={data.attachments__c&&data.attachments__c.length ? {textDecorationLine: 'underline', color: '#1890ff'} : {}} 
           //onPress={()=>{ return  openModal({
                               // content:<View style={{flex: 1,}}>
                               //     <ImageSlider images={data.attachments__c==null ? [] : data.attachments__c.split(' ')} />
                                    
                              //      </View>, 
                              //  heading: 'Preview', 
                            //  bodyFlexHeight: .7
                   //    })}}>{data.attachments__c? 'View' : 'No file'}</Text>}
                   />
          </View>



    
          </ScrollView>

)


}


}
export default ComplaintSecondScreen;