import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

function SpotList({ tech, navigation }) {

    const [spots, setSpots] = useState([]);

    useEffect(() => {

        async function loadSpots() {
            const response = await api.get('spots', { params: { tech } });
            setSpots(response.data);
            console.log(response.data);
        }

        loadSpots();

    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Companys using {tech}</Text>
        <FlatList style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price ? `R$: ${item.price}/day` : 'free'}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item._id)}><Text style={styles.buttonText}>Request booking</Text></TouchableOpacity>
                </View>
            )} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    list: {
        marginBottom: 10
    },
    listItem: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor:'#fff',
        borderRadius: 4,
        elevation: 1
    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        backgroundColor: '#FFF',
        borderRadius: 4
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 18
    },
    price: {
        fontSize: 15,
        color: '#999'
    },
    button: {
        height: 35,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5a5f',
        marginTop: 10
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default withNavigation(SpotList);