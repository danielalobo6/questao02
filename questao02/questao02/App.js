import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const calcularMedia = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado('');

    if (!nome.trim()) {
      setErro('Por favor, digite o nome do estudante.');
      return;
    }

    const n1 = parseFloat(nota1.replace(',', '.'));
    const n2 = parseFloat(nota2.replace(',', '.'));
    const n3 = parseFloat(nota3.replace(',', '.'));

    if (isNaN(n1) || isNaN(n2) || isNaN(n3) || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10) {
      setErro('Informe todas as três notas com valores entre 0 e 10.');
      return;
    }

    const media = (n1 + n2 + n3) / 3;
    const situacao = media >= 7.0 ? 'Aprovado' : 'Reprovado';

    setResultado(`Estudante: ${nome}\nMédia: ${media.toFixed(1)}\nSituação: ${situacao}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cálculo de Média Acadêmica</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do aluno"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Nota 1 (0 a 10)"
          keyboardType="numeric"
          value={nota1}
          onChangeText={setNota1}
        />
        <TextInput
          style={styles.input}
          placeholder="Nota 2 (0 a 10)"
          keyboardType="numeric"
          value={nota2}
          onChangeText={setNota2}
        />
        <TextInput
          style={styles.input}
          placeholder="Nota 3 (0 a 10)"
          keyboardType="numeric"
          value={nota3}
          onChangeText={setNota3}
        />

        <Button title="Calcular média" onPress={calcularMedia} />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {resultado ? <Text style={styles.resultado}>{resultado}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  resultado: { marginTop: 15, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  erro: { marginTop: 15, fontSize: 14, color: 'red', textAlign: 'center' },
});