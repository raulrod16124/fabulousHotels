import { SafeAreaView, StatusBar, View } from "react-native"
import theme from "../theme.json"

export const AppStatusBar = () => { 
    return ( 
        <View style={{backgroundColor: theme.colors.primary}}> 
            <SafeAreaView> 
                <StatusBar barStyle='light-content'/> 
            </SafeAreaView> 
        </View> 
    ) 
} 