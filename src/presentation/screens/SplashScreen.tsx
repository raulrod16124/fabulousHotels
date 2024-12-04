import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import theme from "../theme.json";

interface IProps extends StackScreenProps<RootStackParams, "SplashScreen">{}

export const SplashScreen = ({navigation}: IProps) => {
    const [fadeAnimTop] = useState(new Animated.Value(0));
    const [fadeAnimBottom] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnimTop, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    
        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(fadeAnimBottom, {
                toValue: 1,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    
        setTimeout(() => {
            Animated.timing(fadeAnimTop, {
                toValue: 0,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
            navigation.replace("HotelsListScreen");
        }, 3000);
    }, [fadeAnimTop, fadeAnimBottom, navigation]);
    
    return (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.deepPrimary, theme.colors.darkPrimary]}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <Animated.View style={[styles.textContainer, { opacity: fadeAnimTop }]}>
                    <Text style={styles.smallText}>Spend your time in</Text>
                </Animated.View>

                <Animated.View style={[styles.fabulousContainer, { opacity: fadeAnimBottom }]}>
                    <Text style={styles.fabulousText}>Fabulous Hotels</Text>
                </Animated.View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    smallText: {
        fontSize: 24,
        fontFamily: theme.fonts.primary,
        color: theme.colors.white,
        marginBottom: 10,
    },
    fabulousContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fabulousText: {
        fontSize: 40,
        fontFamily: theme.fonts.primary,
        color: theme.colors.secondary,
    },
});
