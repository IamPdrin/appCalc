import { useRouter } from "expo-router";
import { View, TouchableOpacity, Image} from "react-native";
import styles from "./styles";

export default function Formas() {
    const router = useRouter();

    return (
        <View style={styles.container}>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("formas/circulo")}
                >
                    <Image source={require("../assets/Circulo.png")}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("formas/quadrado")}
                >
                    <Image source={require("../assets/Quadrado.png")}/>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("formas/elipse")}
                >
                    <Image source={require("../assets/Elipse.png")}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => router.push("formas/triangulo")}
                >
                    <Image source={require("../assets/Triangulo.png")}/>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}