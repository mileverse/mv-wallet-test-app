import React from 'react';

import { SafeAreaView,Text,View,TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-generator';
import Clipboard from '@react-native-community/clipboard';
const Deposit = ({route})=> {
    return (
        <SafeAreaView>
            <View style={{paddingVertical:60,justifyContent:'center',alignItems:"center",backgroundColor:"#FFFFFF",marginTop:8}}>
                <QRCode value={route.params.address} size={120} bgColor='black' fgColor='white' />
            </View>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:"#FFFFFF",paddingBottom:20}}>
                <Text>{route.params.address}</Text>
                <TouchableOpacity onPress={() => Clipboard.setString(route.params.address)}>
                    <View style={{backgroundColor:"#8D3981",height:30,width:100,borderRadius:6,marginTop:6,alignItems:"center",justifyContent:'center'}}>
                        <Text style={{color:"#FFFFFF"}}>복사하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Deposit;