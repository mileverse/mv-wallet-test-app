import React,{useState} from 'react';

import { SafeAreaView,Text,View,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import ModalActivityIndicator from 'react-native-modal-activityindicator'

import send from './module/send'

const radio_props = [
    {label: 'ETH', value: "ETH" },
    {label: 'MVC', value: "MVC" }
];
const Withdraw = ( {navigation} )=> {
    const [addr,setAddr] = useState("");
    const [amount,setAmount] = useState("");
    const [ticker,setTicker] = useState("ETH");
    const [visible,setVisible] = useState(false);

    const onTransfer = async ()=>{
        if(addr === '') {
            alert('주소를 입력해주세요.')
        } else if(amount === '' || amount === 0) {
            alert('수량을 입력해주세요.')
        } else {
            setVisible(true)
            const {data} = await send.post("/transfer",{ticker:ticker,toAddr:addr,send_amount:amount});
            setVisible(false)
            if(data.result === 'success') {
                alert('전송 완료')
            } else {
                alert(data.msg)
            }
        }
    }

    return (
        <>
            <ModalActivityIndicator visible={visible} size='large' color='white' />
            <SafeAreaView>
                <View style={styles.card}>
                    <Text style={styles.banner}>종류 선택</Text>
                    <RadioForm
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {setTicker(value);}}
                    />  
                </View>
                <View style={styles.card}>
                    <Text style={styles.banner}>수량입력</Text>
                    <View style={[styles.inputWrap,{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}]}>
                        <TextInput placeholder="수량을 입력해주세요." keyboardType={'numeric'} style={styles.input} onChangeText={text=>setAmount(text)}/>
                        <Text>ETH</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.banner}>주소입력</Text>
                    <View style={[styles.inputWrap]}>
                        <TextInput placeholder="주소를 입력해주세요." style={styles.input} value={addr} onChangeText={text=>setAddr(text)}/>
                    </View>
                    <View style={{width:'100%',justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("Scanner",{
                                getAddr:(_value)=>{
                                    if(_value) setAddr(_value);
                                }
                            })
                        }}>
                            <View style={styles.btn}>
                                <Text>QR코드 스캔</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={onTransfer}>
                        <View style={[styles.btn,{width:"100%",backgroundColor:"hotpink"}]}>
                            <Text>전송하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    card:{marginTop:8,backgroundColor:"#FFFFFF",padding:8},
    banner:{fontSize:12,fontWeight:"bold"},
    inputWrap:{borderRadius:8,borderColor:'#EFEFEF',borderWidth:1,width:"100%",height:38,marginTop:6,paddingHorizontal:6},
    input:{height:38,flex:1,padding:0,paddingHorizontal:4},
    btn:{width:200,height:40,backgroundColor:"cyan",marginTop:6,borderRadius:8,justifyContent:"center",alignItems:'center'}
})
export default Withdraw;