import { View, Text, useColorScheme, SafeAreaView, StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React from 'react'

export const HotelsListScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Text>HotelsListScreen</Text>
        </SafeAreaView>
    )
}