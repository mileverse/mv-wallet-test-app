import React,{useEffect, useState} from 'react';

import { SafeAreaView,Text,StyleSheet,View,TouchableOpacity } from 'react-native';
import ModalActivityIndicator from 'react-native-modal-activityindicator'
import AsyncStorage from '@react-native-community/async-storage';
import send from './module/send'

const Home = ({ navigation })=> {
    const [walletId,setWalletId] = useState('');
    const [walletAddr,setWalletAddr] = useState('');
    const [ethAmount,setEthAmount] = useState(0);
    const [mvcAmount,setMvcAmount] = useState(0);
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        const setWallet = async()=>{
            const storage = await AsyncStorage.getItem('@wallet');
            if(storage !== null) {
                const {address,id} = JSON.parse(storage);
                setWalletAddr(address);
                setWalletId(id);
                refreshAmount(id)
            }
        }
        setWallet();
    },[]);

    const init = async ()=>{
        setVisible(true);
        setWalletId("");
        setWalletAddr("");
        setEthAmount(0);
        setMvcAmount(0);
        setVisible(false);
        AsyncStorage.removeItem('@wallet');
        alert("초기화 완료")
    }

    const refreshAmount = async (_id)=> {
        if(_id !== '') {
            setVisible(true);
            const {data} = await send.get("/balance",{params:{depositId:_id}});
            setVisible(false);
            if(data.result === 'success') {
                setEthAmount(data.eth)
                setMvcAmount(data.mvc)
            } else {
                alert(data.msg)
            }
        } else {
            alert("지갑을 먼저 생성해주세요.")
        }
    }
    const createWallet = async() => {
        if(walletId !== '') {
            alert('이미 지갑을 생성하였습니다.')
        } else {
            const {data} = await send.get("/wallets");
            if(data.result === 'success') {
                await AsyncStorage.setItem('@wallet',JSON.stringify({address:data.addr,id:data.id}));
            } else {
                alert('다시 시도해 주세요.')
            }
        }
        
    }

    const onFlush = async() =>{
        if(walletId === '') {
            alert('지갑생성을 진행해주세요.')
        } else {
            setVisible(true)
            const {data} = await send.post("/flush",{depositId:walletId,eth:ethAmount,mvc:mvcAmount});
            setVisible(false)
            if(data.result === 'success') {
                alert("직금완료")
            } else {
                alert(data.msg)
            }
        }
    }

    return (
        <>
            <ModalActivityIndicator visible={visible} size='large' color='white' />
            <SafeAreaView style={stylse.container}>
                <View style={stylse.card}>
                    <View style={stylse.section}>
                        <Text style={stylse.title}>주소</Text>
                        <Text style={{fontSize:12}}>{walletAddr}</Text>
                    </View>
                    <View style={[stylse.section,{marginTop:8}]}>
                        <Text style={stylse.title}>ETH</Text>
                        <Text style={{fontSize:16}}>{ethAmount}</Text>
                    </View>
                    <View style={[stylse.section,{marginTop:8}]}>
                        <Text style={stylse.title}>MVC</Text>
                        <Text style={{fontSize:16}}>{mvcAmount}</Text>
                    </View>
                </View>
                <View style={[stylse.card,{marginTop:12}]}>
                    <View style={[stylse.section]}>
                        <TouchableOpacity onPress={()=>{
                            if(walletId) navigation.navigate("Deposit",{address:walletAddr})
                            else alert("지갑을 생성해 주세요.")
                        }}>
                            <View style={stylse.btn}>
                                <Text>입금</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            if(walletId) navigation.navigate("Withdraw")
                            else alert("지갑을 생성해 주세요.")
                        }}>
                            <View style={stylse.btn}>
                                <Text>출금</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[stylse.section,{marginTop:8}]}>
                        <TouchableOpacity onPress={createWallet}>
                            <View style={stylse.btn}>
                                <Text>지갑생성</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>refreshAmount(walletId)}>
                            <View style={stylse.btn}>
                                <Text>새로고침</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[stylse.section,{marginTop:8}]}>
                        <TouchableOpacity onPress={onFlush}>
                            <View style={stylse.btn}>
                                <Text>직금하기</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={init}>
                            <View style={[stylse.btn,{backgroundColor:"red"}]}>
                                <Text>초기화</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const stylse = StyleSheet.create({
    container:{flex:1,padding:16},
    card:{width:'100%',borderRadius:8,backgroundColor:"#FFFFFF",padding:8},
    title:{fontWeight:"bold",fontSize:16},
    section:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
    btn:{backgroundColor:"#7ccff2",borderRadius:6,justifyContent:'center',alignItems:'center',width:150,height:40},
})

export default Home;