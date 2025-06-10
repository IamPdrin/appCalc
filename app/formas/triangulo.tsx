import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { calcularForma } from '../../utils/calculos';
import styles from '../styles';

export default function Triangulo() {
  const [ladoA, setLadoA] = useState('');
  const [ladoB, setLadoB] = useState('');
  const [ladoC, setLadoC] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultados, setResultados] = useState({
    area: '',
    perimetro: '',
    tipo: ''
  });

  const handleCalcular = () => {
    if (!ladoA || !ladoB || !ladoC) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os lados');
      return;
    }

    const a = parseFloat(ladoA);
    const b = parseFloat(ladoB);
    const c = parseFloat(ladoC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      Alert.alert('Valores inválidos', 'Por favor, informe números válidos');
      return;
    }

    if (a <= 0 || b <= 0 || c <= 0) {
      Alert.alert('Valores inválidos', 'Os lados devem ser maiores que zero');
      return;
    }

    // Verifica se é um triângulo válido
    if (a + b <= c || a + c <= b || b + c <= a) {
      Alert.alert('Triângulo inválido', 'A soma de dois lados deve ser maior que o terceiro');
      return;
    }

    const resultado = calcularForma('triangulo', [a, b, c]);
    
    setResultados({
      area: resultado.area,
      perimetro: resultado.perimetro,
      tipo: 'tipo' in resultado ? resultado.tipo : ''
    });
    
    setMostrarResultado(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>            
        <View style={styles.cardForm}>
          <Image source={require("../../assets/Triangulo.png")} />

          <TextInput
            style={styles.input}
            placeholder='Lado A'
            keyboardType='numeric'
            value={ladoA}
            onChangeText={setLadoA}
          />

          <TextInput
            style={styles.input}
            placeholder='Lado B'
            keyboardType='numeric'
            value={ladoB}
            onChangeText={setLadoB}
          />

          <TextInput
            style={styles.input}
            placeholder='Lado C'
            keyboardType='numeric'
            value={ladoC}
            onChangeText={setLadoC}
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
            <Text>Tipo: {resultados.tipo}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}