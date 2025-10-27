import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const apiUrl = "https://localhost:44372/api/Aluno";

export default function NovoAluno() {
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const router = useRouter();

  const salvarAluno = async () => {
    if (!nome || !email || !telefone) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await axios.post(apiUrl, { nome, email, telefone });
      Alert.alert("Sucesso", "Aluno cadastrado!");
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Aluno</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <Button title="Salvar" onPress={salvarAluno} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 5 },
});
