import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './styles'

import logoImg from '../../assets/logo.png'

export default function Detail() {

    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const message = `Hello ${incident.name}, I am contacting you because I want to support the case "${incident.title}" with a value of ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}.`

    function navegateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of the case ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navegateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}, {incident.uf}</Text>

                <Text style={styles.incidentProperty}>Incident:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text style={[styles.incidentValue, { marginBottom: 0 }]}>
                            {Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(incident.value)}
                        </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>Save the day</Text>
                <Text style={styles.contactTitle}>Be the hero of this case!</Text>

                <Text style={styles.contactDescription}>Contact:</Text>
                
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Phone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}