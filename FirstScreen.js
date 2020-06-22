import React from 'react';
import { StyleSheet, Text, View, AppRegistry, Dimensions, Animated, ImageBackground, Image } from 'react-native';
import Enemy from './Enemy';

class FirstScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movePlayerVal: new Animated.Value(40),
            playerSide: 'left',
            points: 0,
            moveEnemyVal: new Animated.Value(0),
            enemyStartPosX: 0,
            enemySide: 'left',
            gameOver: false,
            enemySpeed: 4200
        };
    }
    render() {
        return (
            <ImageBackground source={require("./assets/gamebg.png")} style={styles.container}>
                <View style={{ flex: 1, alignItems: "center", marginTop: 80 }}>
                    <View style={styles.points}>
                        <Text style={{ fontWeight: "bold", fontSize: 40 }}> {this.state.points} </Text>
                    </View>
                </View>
                <Animated.Image source={require('./assets/player.png')} style={{
                    height: 100,
                    width: 100,
                    position: "absolute",
                    zIndex: 1,
                    bottom: 50,
                    resizeMode: "stretch",
                    transform: [
                        { translateX: this.state.movePlayerVal }
                    ]
                }}></Animated.Image>
                <Enemy enemyStartPosX={this.state.enemyStartPosX} moveEnemyVal={this.state.moveEnemyVal} />
                <View style={styles.controls}>
                    <Text onPress={() => this.movePlayer('left')} style={styles.left}> {'<'}</Text>
                    <Text onPress={() => this.movePlayer('right')} style={styles.right}> {'>'}</Text>
                </View>
            </ImageBackground>
        );
    }
    componentDidMount() {
        this.animateEnemy()
    }

    animateEnemy() {
        // once it get started
        this.state.moveEnemyVal.setValue(-100);
        let windowH = Dimensions.get('window').height;

        //Generate left dis for enemy
        var r = Math.floor(Math.random() * 2) + 1;

        if (r == 2) {
            r = 40
            this.setState({ enemySide: 'left' })
        } else {
            r = Dimensions.get('window').width - 140
            this.setState({ enemySide: 'right' })
        }
        this.setState({ enemyStartPosX: r })
        // check collision
        let refreshntervalId;
        refreshntervalId = setInterval(() => {
            if (this.state.moveEnemyVal._value > windowH - 200 && this.state.moveEnemyVal._value < windowH - 100 && this.state.enemySide == this.state.playerSide) {
                clearInterval(refreshntervalId)
                this.setState({ gameOver: true })
                this.gameOver()
            }
        }, 50)

        //  Increase speed
        setInterval(() => {
            this.setState({ enemySpeed: this.state.enemySide - 50 })
        }, 20000)

        // animate enemy

        Animated.timing(
            this.state.moveEnemyVal,
            {
                toValue: Dimensions.get('window').height,
                duration: this.state.enemySpeed
            }
        ).start(event => {
            if (event.finished && this.state.gameOver == false) {
                clearInterval(refreshntervalId)
                this.setState({ points: ++this.state.points })
                this.animateEnemy()
            }
        })
    }
    gameOver() {
        alert("game over")
    }

    movePlayer(direction) {
        if (direction == 'right') {
            this.setState({ playerSide: 'right' })
            Animated.spring(
                this.state.movePlayerVal,
                {
                    toValue: Dimensions.get('window').width - 140,
                    tension: 120
                }
            ).start()
        } else {
            this.setState({ playerSide: 'left' })
            Animated.spring(
                this.state.movePlayerVal,
                {
                    toValue: 40,
                    tension: 120
                }
            ).start()
        }
    }
}
export default FirstScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
        position: "relative"
    },
    points: {
        width: 80,
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    playerImg: {},
    controls: {
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "center"
    },
    right: {
        flex: 1,
        color: '#fff',
        margin: 0,
        fontSize: 60,
        fontWeight: "bold",
        textAlign: "left"
    },
    left: {
        flex: 1,
        color: '#fff',
        fontSize: 60,
        fontWeight: "bold",
        textAlign: "right"
    }
})
