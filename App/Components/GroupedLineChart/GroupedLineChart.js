import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import * as shape from 'd3-shape'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Circle } from 'react-native-svg';
import Legend from 'App/Components/Legend'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class GroupedLineChart extends Component {

    render() {

        const data1 = [ 50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80 ]
        const data2 = [ 87, 66, 69, 92, 40, 61, 16, 62, 20, 93, 54, 47, 89, 44, 18 ]
        const data3 = [ 34, 46, 64, 32, 40, 61, 16, 62, 2, 9, 4, 7, 8, 4, 12 ]
        const xdata = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80]
        const ydata = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80]
        const contentInset = { top: 20, bottom: 20 }

        const data = [
            {
                data: data1,
                svg: { stroke: Colors.red },
            },
            {
                data: data2,
                svg: { stroke: Colors.green },
            },
            {
                data: data3,
                svg: { stroke: Colors.button },
            }
        ]

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
            ))
        }

        return (
        	<View style={{alignItems: 'center'}}>
        	<View style={{alignItems: 'center', flexDirection: 'row',  width: wp('80%')}}>
        		<YAxis
                    data={ydata}
                    contentInset={contentInset}
                    style={{height: 200}}
                    svg={{
                        fill: 'grey',
                        fontSize: 10
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}`}
                />
	            <LineChart
	                style={{width: wp('80%'), backgroundColor: Colors.white }}
	                data={ data }
	                contentInset={{ top: 20, bottom: 20 }}
	                curve={shape.curveNatural}
	                bezier
	                hideLegend={false}
	            >
	                <Grid />
	            </LineChart>
	          
            </View>
            <View>
             <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={xdata}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    style={{width: wp('80%')}}
                    svg={{ fontSize: 10, fill: 'black' ,fontFamily: ApplicationStyles.textMediumFont}}
                />
            </View>
            	<View style={{width: wp('80%'), flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
	            <Legend fillColor={Colors.red} heading={'New Retailers'} />
	            <Legend fillColor={Colors.green} heading={'Events'}/>
	            <Legend fillColor={Colors.button} heading={'Electrician Enrolled'}/>
	            </View>
            </View>
        )
    }

}