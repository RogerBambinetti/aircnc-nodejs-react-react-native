import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, AsyncStorage, Image, StyleSheet } from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);

    return <ScrollView style={styles.container}>
        <Image source={logo} style={styles.logo}></Image>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    logo: {
        height: 35,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30
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