import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { View, Text, LogBox } from 'react-native'
import {  } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Scanner = ({navigation, route})=>{
    const onSuccess = (e)=>{
        route.params.getAddr(e.data);
        navigation.goBack();
    }
    return (
        <QRCodeScanner
            showMarker={true}
            onRead={onSuccess}
            bottomContent={
                <View style={{justifyContent:'center',alignItems:'center',width:"100%",height:"100%",backgroundColor:"#FFFFFF"}}>
                    <Text style={{fontSize:20}}>QR코드를 스캔해주세요</Text>
                </View>
            }
        />
    )
}

export default Scanner;