
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

// ======================
// Interface do Aluno
// ======================
interface Aluno {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  escola: string;
}

const apiUrl = "https://localhost:44372/api/Aluno"; // ajuste se necessário

export default function App() {
  // ======================
  // Estados
  // ======================
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [escola, setEscola] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  // ======================
  // Carregar alunos
  // ======================
  const carregarAlunos = async () => {
    try {
      const response = await axios.get<Aluno[]>(apiUrl);
      setAlunos(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os alunos");
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);


  // ======================
  // Salvar aluno (add/editar)
  // ======================
  const handleSave = async () => {
    if (!nome || !email || !telefone || !escola) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      if (editandoId) {
        // Atualizar
        await axios.put(`${apiUrl}/${editandoId}`, { nome, email, telefone, escola });
        Alert.alert("Sucesso", "Aluno atualizado com sucesso!");
      } else {
        // Criar
        await axios.post(apiUrl, { nome, email, telefone, escola });
        Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
      }

      limparCampos();
      carregarAlunos();
    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar aluno");
    }
  };

  // ======================
  // Deletar aluno
  // ======================
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      Alert.alert("Sucesso", "Aluno excluído com sucesso!");
      carregarAlunos();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir aluno");
    }
  };

  // ======================
  // Editar aluno
  // ======================
  const handleEdit = (aluno: Aluno) => {
    setNome(aluno.nome);
    setEmail(aluno.email);
    setTelefone(aluno.telefone);
    setEscola(aluno.escola);
    setEditandoId(aluno.id);
  };

  // ======================
  // Limpar formulário
  // ======================
  const limparCampos = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setEscola("");
    setEditandoId(null);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Alunos</Text>

      {/* Formulário */}
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Escola" value={escola} onChangeText={setEscola} />

      <Button title={editandoId ? "Atualizar" : "Salvar"} onPress={handleSave} />

      {/* Lista de alunos */}
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>
              {item.nome} - {item.email} - {item.telefone} - {item.escola}
            </Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}



// ======================
// Estilos
// ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});


// index.tsx  e organizado:
// Tipagem do Aluno feita.
// Estados (nome, email, telefone, escola, editandoId).
// CRUD completo com Axios (GET, POST, PUT, DELETE).
// Alertas de sucesso/erro.
// Lista com FlatList para exibir e botões de editar/excluir.








// Versão adaptada para React Native com Material Design (react-native-paper).
//  AAtualizado, com substituindo Button e TextInput padrão pelos componentes do react-native-paper:

// import * as React from "react";
// import { View, StyleSheet } from "react-native";
// import { TextInput, Button, Card, Title, Paragraph } from "react-native-paper";

// export default function App() {
//   const [nome, setNome] = React.useState("");
//   const [email, setEmail] = React.useState("");

//   const handleSubmit = () => {
//     console.log("Nome:", nome);
//     console.log("Email:", email);
//   };

//   return (
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title style={styles.title}>Cadastro</Title>
//           <Paragraph>Preencha seus dados abaixo:</Paragraph>

//           <TextInput
//             label="Nome"
//             value={nome}
//             mode="outlined"
//             onChangeText={setNome}
//             style={styles.input}
//           />

//           <TextInput
//             label="Email"
//             value={email}
//             mode="outlined"
//             keyboardType="email-address"
//             onChangeText={setEmail}
//             style={styles.input}
//           />

//           <Button
//             mode="contained"
//             onPress={handleSubmit}
//             style={styles.button}
//           >
//             Enviar
//           </Button>
//         </Card.Content>
//       </Card>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f2f2f2",
//   },
//   card: {
//     padding: 10,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   title: {
//     marginBottom: 10,
//   },
//   input: {
//     marginBottom: 15,
//   },
//   button: {
//     marginTop: 10,
//     borderRadius: 8,
//   },
// });





// Versão com validação de campos usando react-native-paper, exibindo mensagens de erro quando o usuário tenta enviar sem preencher:
// import * as React from "react";
// import { View, StyleSheet } from "react-native";
// import { TextInput, Button, Card, Title, Paragraph, HelperText } from "react-native-paper";

// export default function App() {
//   const [nome, setNome] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [errors, setErrors] = React.useState({ nome: "", email: "" });

//   const validate = () => {
//     let valid = true;
//     let newErrors = { nome: "", email: "" };

//     if (!nome.trim()) {
//       newErrors.nome = "O nome é obrigatório";
//       valid = false;
//     }

//     if (!email.trim()) {
//       newErrors.email = "O email é obrigatório";
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Digite um email válido";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       console.log("Nome:", nome);
//       console.log("Email:", email);
//       alert("Dados enviados com sucesso!");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title style={styles.title}>Cadastro</Title>
//           <Paragraph>Preencha seus dados abaixo:</Paragraph>

//           <TextInput
//             label="Nome"
//             value={nome}
//             mode="outlined"
//             onChangeText={setNome}
//             style={styles.input}
//             error={!!errors.nome}
//           />
//           {errors.nome ? <HelperText type="error">{errors.nome}</HelperText> : null}

//           <TextInput
//             label="Email"
//             value={email}
//             mode="outlined"
//             keyboardType="email-address"
//             onChangeText={setEmail}
//             style={styles.input}
//             error={!!errors.email}
//           />
//           {errors.email ? <HelperText type="error">{errors.email}</HelperText> : null}

//           <Button
//             mode="contained"
//             onPress={handleSubmit}
//             style={styles.button}
//           >
//             Enviar
//           </Button>
//         </Card.Content>
//       </Card>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f2f2f2",
//   },
//   card: {
//     padding: 10,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   title: {
//     marginBottom: 10,
//   },
//   input: {
//     marginBottom: 5,
//   },
//   button: {
//     marginTop: 15,
//     borderRadius: 8,
//   },
// });
