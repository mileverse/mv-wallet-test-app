/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home';
import DepositScreen from './src/Deposit';
import WithdrawScreen from './src/Withdraw';
import ScannerScreen from './src/Scanner';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer initialRouteName={"Deposit"}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '마일벌스 지갑 TEST' }}/>
        <Stack.Screen name="Deposit" component={DepositScreen} options={{ title: '입금' }}/>
        <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ title: '출금' }}/>
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'QR코드 스캔' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
