import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents() {

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    
    function navigateToDetails(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {

        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total){
            return;
        }

        setLoading(true)

        const response = await api.get('incidents', { 
            params: { page }
        })
        
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} incidents</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Choose an incident to support:</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.5}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>NGO:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Incident:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Value:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(incident.value)}
                        </Text>
                        
                        <TouchableOpacity
                            style={styles.detailsButtun}
                            onPress={() => navigateToDetails(incident)}
                        >
                            <Text style={styles.detailsButtunText}>More details</Text>
                            <Feather name='arrow-right' size={17} color='#e02041' />
                        </TouchableOpacity>
                    </View>                    
                )}
            />
            
        </View>
    )
}