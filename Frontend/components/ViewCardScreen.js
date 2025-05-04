import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ViewCardScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>

      {item.image && <Image source={{ uri: `http://192.168.0.188:5000${item.image}` }} style={styles.image} />}
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ₹{item.price}</Text>
      <Text style={styles.payment}>Payment Status: {item.paymentStatus}</Text>

      {item.paymentStatus !== "Completed" && (
        <Button
          title="Make Payment"
          onPress={() => navigation.navigate("PaymentScreen", { requestId: item._id })}
        />
      )}

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  image: { width: "90%", height: 250, borderRadius: 10, marginBottom: 10 },
  description: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  price: { fontSize: 14, color: "green", marginBottom: 5 },
  payment: { fontSize: 14, color: "blue", marginBottom: 10 },
});

export default ViewCardScreen;
