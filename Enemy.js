import React from 'react';
import { StyleSheet, Text, View, AppRegistry, Dimensions, Animated, ImageBackground, Image } from 'react-native';

class Enemy extends React.Component {
    render() {
        return (
            // <ImageBackground source={require("./assets/gamebg.png")} style={styles.container}>
            <Animated.Image source={require('./assets/enemy.png')} style={{
                height: 100,
                width: 100,
                position: "absolute",
                resizeMode: "stretch",
                transform: [
                    { translateY: this.props.moveEnemyVal }
                ],
                left: this.props.enemyStartPosX
            }}></Animated.Image>
            // </ImageBackground>

        );
    }
}

export default Enemy;