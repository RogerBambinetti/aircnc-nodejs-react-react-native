import React, { useState } from 'react';
import { View, AsyncStorage, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } })
        alert("Request sended");
        navigation.navigate('List');
    }

    async function handleCancel() {
        navigation.navigate('List');
    }

    return <View style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.label}>CHOOSE A DATE *</Text>
            <TextInput style={styles.input} value={date} onChangeText={setDate} keyboardType="email-address" placeholder="Date" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText}>Request</Text></TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    logo: {
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 40,
        marginBottom: 20,
        borderRadius: 4,
    },
    button: {
        height: 45,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5a5f'
    },
    cancelButton: {
        height: 45,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});