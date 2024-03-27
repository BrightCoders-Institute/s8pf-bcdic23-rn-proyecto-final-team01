import React, { useState } from "react";
import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeButtonComponent = () => {
    const [liked, setLiked] = useState<boolean>(false);

    return(
        <View>
            <Pressable style={styles.press} onPress={() => setLiked((isLiked) => !isLiked)}>
                <Icon
                    name={liked ? "heart" : "heart"}
                    size={liked ? 35 : 35}
                    color={liked ? 'white' : 'white'}
                    style={liked ? styles.onPressStyle : styles.heart}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    heart: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: 'rgba(128,128,128,0.8)',
    },
    press: {
        padding: 7,
        borderRadius: 14,
    },
    onPressStyle: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 0, 0, 0.8)'
    }
});

export default LikeButtonComponent;
