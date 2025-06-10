import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { calcularForma } from '../../utils/calculos';
import styles from '../styles';

export default function Circulo() {
  const [raio, setRaio] = useState(''); // Apenas 1 estado
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultados, setResultados] = useState({
    area: '',
    perimetro: '',
    diametro: ''
  });

  const handleCalcular = () => {
    if (!raio) { // Valida apenas 1 campo
      Alert.alert('Campo obrigatório', 'Por favor, informe o raio');
      return;
    }

    const r = parseFloat(raio);
    
    if (isNaN(r)) {
      Alert.alert('Valor inválido', 'Informe um número válido');
      return;
    }

    if (r <= 0) {
      Alert.alert('Valor inválido', 'O raio deve ser maior que zero');
      return;
    }

    const resultado = calcularForma('circulo', [r]);
    const area = resultado.area;
    const perimetro = resultado.perimetro;
    const diametro = 'diametro' in resultado ? resultado.diametro : '';

    setResultados({ area, perimetro, diametro });
    setMostrarResultado(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >            
        <View style={styles.cardForm}>
          <Image source={require("../../assets/Circulo.png")} />

          <TextInput
            style={styles.input}
            placeholder='Raio'
            keyboardType='numeric'
            value={raio}
            onChangeText={setRaio}
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
            <Text>Diâmetro: {resultados.diametro}</Text>
            <Text>Perímetro: {resultados.perimetro}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}