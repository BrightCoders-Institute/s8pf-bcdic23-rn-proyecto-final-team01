import React, { useState, useEffect } from "react";
import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';


const LikeButtonComponent = () => {
    const [liked, setLiked] = useState<boolean>();

    useEffect(() => {
        const checkInitialLikeState = async () => {
            try {
                const favoritosRef = firestore().collection('favorites');
                const snapshot = await favoritosRef.doc('userId').get();
                const data = snapshot.data();
                if (data && data.liked) {
                    setLiked(true);
                }
            } catch (error) {
                console.error('Error al verificar el estado inicial del like: ' + error);
            }
        };

        checkInitialLikeState();
    }, []); 

    const handleLikePress = async () => {
        try {
            const favoritosRef = firestore().collection('favorites');

            if (liked) {
                await favoritosRef.doc('userId').delete();
            } else {
                await favoritosRef.doc('userId').set({
                    liked: true,
                    timestamp: firestore.FieldValue.serverTimestamp()
                });
            }

            // Después de manejar el like, actualizamos el estado local
            setLiked((isLiked) => !isLiked);
        } catch (error) {
            console.error('Error al manejar el like: ' + error);
        }
    };

    return(
        <View>
            <Pressable style={styles.press} onPress={handleLikePress}>
                <Icon
                    name={liked ? "heart" : "heart"}
                    size={35}
                    color={liked ? 'red' : 'white'}
                    style={styles.heart}
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

