import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { calcularForma } from '../../utils/calculos';
import styles from '../styles';

export default function Quadrado() {
  const [lado, setLado] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultados, setResultados] = useState({
    area: '',
    perimetro: '',
    diagonal: ''
  });

  const handleCalcular = () => {
    if (!lado) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha o lado do quadrado');
      return;
    }

    const l = parseFloat(lado);

    if (isNaN(l)) {
      Alert.alert('Valor inválido', 'Por favor, informe um número válido');
      return;
    }

    if (l <= 0) {
      Alert.alert('Valor inválido', 'O lado deve ser maior que zero');
      return;
    }

    const { area, perimetro, diagonal } = calcularForma('quadrado', [l]) as { area: string; perimetro: string; diagonal: string };
    
    setResultados({
      area,
      perimetro,
      diagonal
    });
    
    setMostrarResultado(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>            
        <View style={styles.cardForm}>
          <Image source={require("../../assets/Quadrado.png")} />

          <TextInput
            style={styles.input}
            placeholder='Lado do quadrado'
            keyboardType='numeric'
            value={lado}
            onChangeText={setLado}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleCalcular}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {mostrarResultado && (
          <View style={styles.cardRes}>
            <Text style={styles.title}>Resultado</Text>
            <Text>Área: {resultados.area}</Text>
            <Text>Perímetro: {resultados.perimetro}</Text>
            <Text>Diagonal: {resultados.diagonal}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}