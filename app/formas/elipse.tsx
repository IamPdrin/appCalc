import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { calcularForma } from '../../utils/calculos';
import styles from '../styles';

export default function Elipse() {
  const [raioX, setRaioX] = useState('');
  const [raioY, setRaioY] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultados, setResultados] = useState({
    area: '',
    perimetro: '',
    excentricidade: ''
  });

  const handleCalcular = () => {
    if (!raioX || !raioY) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha ambos os raios');
      return;
    }

    const x = parseFloat(raioX);
    const y = parseFloat(raioY);

    if (isNaN(x) || isNaN(y)) {
      Alert.alert('Valores inválidos', 'Por favor, informe números válidos');
      return;
    }

    if (x <= 0 || y <= 0) {
      Alert.alert('Valores inválidos', 'Os raios devem ser maiores que zero');
      return;
    }

    const resultado = calcularForma('elipse', [x, y]);
    
    setResultados({
      area: resultado.area,
      perimetro: resultado.perimetro,
      excentricidade: 'excentricidade' in resultado ? resultado.excentricidade : ''
    });
    
    setMostrarResultado(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>            
        <View style={styles.cardForm}>
          <Image source={require("../../assets/Elipse.png")} />

          <TextInput
            style={styles.input}
            placeholder='Raio X'
            keyboardType='numeric'
            value={raioX}
            onChangeText={setRaioX}
          />

          <TextInput
            style={styles.input}
            placeholder='Raio Y'
            keyboardType='numeric'
            value={raioY}
            onChangeText={setRaioY}
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
            <Text>Excentricidade: {resultados.excentricidade}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}