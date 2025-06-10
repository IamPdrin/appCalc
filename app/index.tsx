import { useRouter } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App Calc</Text>

            <TouchableOpacity
                style={styles.button} 
                onPress={() => router.push('/principal')}
            >
                <Text style={styles.buttonText}>Iniciar Cálculo</Text>
            </TouchableOpacity>
        </View>
    );
}