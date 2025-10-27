import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const apiUrl = "https://localhost:44372/api/Aluno";

export default function EditarAluno() {
  const { id } = useLocalSearchParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const router = useRouter();

  useEffect(() => {
    const carregarAluno = async () => {
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        setNome(res.data.nome);
        setEmail(res.data.email);
        setTelefone(res.data.telefone);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar aluno");
      }
    };
    carregarAluno();
  }, []);

  const atualizarAluno = async () => {
    try {
      await axios.put(`${apiUrl}/${id}`, { nome, email, telefone });
      Alert.alert("Sucesso", "Aluno atualizado!");
      router.back();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Aluno</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
      <Button title="Atualizar" onPress={atualizarAluno} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 5 },
});
