import { SliderBox } from "react-native-image-slider-box";

import React, { Component } from 'react'
import { View } from "react-native";

export default class ImageSilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          images: [
            //  this.props.data
            //  "https://hero--hero--c.documentforce.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Jpg&versionId=0689D000000ryJ6&operationContext=DELIVERY&contentId=05T9D000004bCWT&page=0&d=/a/9D0000004ozD/6V6lOQFCV7RM1IUEuSkSApEow9ibtl.5XKmwD5x7CWU&oid=00D9D0000008inZ&dpt=null&viewId="
            // 'https://www.profitsheets.com/wp-content/uploads/2019/12/Prince-Pipes-launch-its-initial-public-offering-IPO-details.jpg',
            // 'https://globalprimenews.com/wp-content/uploads/2020/08/IMG-20200824-WA0049-1.jpg',
// "https://media-exp3.licdn.com/dms/image/C4E22AQGiwhozM12dNA/feedshare-shrink_800/0/1624017775060?e=1629331200&v=beta&t=fX9Z8H_O0y2-3mCNovpSwiYmPWzy9yfLr8rmOcidrlo",
  // "https://scontent.fluh1-1.fna.fbcdn.net/v/t1.6435-9/200195451_1111214696031381_4063858873466332736_n.png?_nc_cat=107&ccb=1-3&_nc_sid=973b4a&_nc_ohc=6b-e6y6Dfz4AX-B2SNV&_nc_ht=scontent.fluh1-1.fna&oh=ddf41c5ff347d9cfb30169647ff0a5a9&oe=60FEC4C2"             
 ]
        };
      }
    render() {
        return (
            <View>
             <SliderBox sliderBoxHeight={180}  autoplay circleLoop images={this.props.data} onCurrentImagePressed={this.props.onclick}/>   
            </View>
        )
    }
}