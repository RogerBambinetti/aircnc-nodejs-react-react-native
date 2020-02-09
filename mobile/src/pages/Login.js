import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        });
    }, []);

    async function handleSubmit() {
        const response = await api.post('sessions', { email });
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.form}>
            <Text style={styles.label}>YOUR E-EMAIL *</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="E-mail" placeholderTextColor="#999" />
            <Text style={styles.label}>TECHS *</Text>
            <TextInput style={styles.input} value={techs} onChangeText={setTechs} placeholder="Techs" placeholderTextColor="#999" />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    logo: {
        width: 160,
        height: 50,
        resizeMode: 'stretch'
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
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});