import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  SafeAreaView,
  createAppContainer
} from "react-navigation";
import { StatusBar, YellowBox, Text } from "react-native";
import NetworkMonitor from "./NetworkMonitor";
import Login from "./Login";
import Register from "./Register";
import Events from "./Events";
import Centers from "./Centers";
import ApplicationLoading from "./ApplicationLoading";
import variables from "../assets/styles/variable";
import SideDrawer from './SideDrawer';

YellowBox.ignoreWarnings(['RCTBridge', 'relay:check']);

const AppDrawer = createDrawerNavigator({
  Events: {
    screen: Events,
    navigationOptions: {
      title: 'Events',
      drawerLabel: 'Events',
    }
  },
  Centers: {
    screen: Centers,
    navigationOptions: {
      title: 'Centers',
      drawerLabel: 'Centers',
    }
  }
}, {
  initialRouteName: "Events",
  contentComponent: SideDrawer,
  contentOptions: {
    activeTintColor: '#ffffff',
    activeBackgroundColor: '#343a40',
    itemsContainerStyle: {
      marginVertical: 0,
      textAlign: 'center',
    },
    iconContainerStyle: {
      opacity: 1
    },
    labelStyle:{
      textAlign: 'center',
    },
    itemStyle:{
      fontWeight: "bold",
      color: "#000000",
      fontSize: 15,
      padding: 5,
      margin: 5,
      borderRadius: 2,
      borderColor: '#343a40',
      borderWidth: 1,
      textAlign: 'center'
    }
  },
  navigationOptions: ({
    navigation
  }) => ({
    headerStyle: {
      color: '#000000'
    },
    title: 'Event Manager',
    headerLeft: < DrawerIcon navigation = {
      navigation
    }
    />
  }),
});

const AppStack = createStackNavigator({
  AppDrawer: {
    screen: AppDrawer,
  }
}, {});

const AuthStack = createStackNavigator(
  {
    Register: {
      screen: Register,
    },
    Login: {
      screen: Login,
    }
  },
  {
    initialRouteName: "Login",
    headerMode: 'none',
  }
);

const AppSwitch = createSwitchNavigator(
  {
    AppLoading: ApplicationLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AppLoading"
  }
);

const AppContainer = createAppContainer(AppSwitch);

const Application = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <StatusBar
      backgroundColor={variables.navigationHeader.headerStyle.backgroundColor}
      barStyle="light-content"
    />
    <NetworkMonitor />
    <AppContainer/>
  </SafeAreaView>
);

const DrawerIcon = (props) => (
  <Text onPress={() =>
    props.navigation.toggleDrawer()}
    style={{color: '#000000', fontWeight: 'bold', fontSize: 15, marginHorizontal: 20,}}>
      Menu
    </Text>
);

export default Application;
