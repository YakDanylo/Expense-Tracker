import React from 'react'
import { Circle, Svg } from 'react-native-svg'
import { View,Text } from 'react-native'

const CircleComponents = ({ earned, expensed }) => {
  circumference = Math.PI*80
  let balance = earned-expensed
  let percentage = ((balance/earned)*100)*0.01
  console.log(percentage);
  return (
    <View style={{ width: 100, height: 100 }}>
      <Svg width={100} height={100}>
        <Circle
          cx={50}
          cy={50}
          r={40}
          fill="transparent"
          stroke="#ffca3a"
          strokeWidth={5}
          strokeDasharray={circumference}
          strokeDashoffset={circumference*(1-percentage)}
        />
      </Svg>
    </View>
  );
};


export default CircleComponents