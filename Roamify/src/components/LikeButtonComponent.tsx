import React, { useState, useEffect } from "react";
import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import  firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const LikeButtonComponent = ({eventId, eventName}) => {
    const { userId } = useAuth();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkInitialLikeState = async () => {
            try {
                const favoriteRef = firestore().collection('users').doc(userId).collection('favorites').doc(eventId);
                const doc = await favoriteRef.get();
                if (doc.exists) {
                    setLiked(true);
                }
            } catch (error) {
                console.error('Error al verificar el estado inicial del like: ', error);
            }
        };

        checkInitialLikeState();
    }, [eventId, userId]);

    const handleLikePress = async () => {
        try {
            const favoriteRef = firestore().collection('users').doc(userId).collection('favorites').doc(eventId);

            if (liked) {
                await favoriteRef.delete();
            } else {
                await favoriteRef.set({
                    liked: true,
                    event: eventName,
                    timestamp: firestore.FieldValue.serverTimestamp()
                });
            }

            setLiked(!liked);
        } catch (error) {
            console.error('Error al manejar el like: ', error);
        }
    };
    if (!eventId) {
        return null; 
    }

    return (
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

