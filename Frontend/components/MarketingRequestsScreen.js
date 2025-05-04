import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MarketingRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://192.168.0.188:5000/api/marketingHelp");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submitted Marketing Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ViewCardScreen", { item })}>
            <View style={styles.card}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Price: ₹{item.price}</Text>
              {item.image && <Image source={{ uri: `http://192.168.0.188:5000${item.image}` }} style={styles.image} />}
              <Text style={styles.payment}>Payment Status: {item.paymentStatus}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#f9f9f9", padding: 15, marginBottom: 10, borderRadius: 10, elevation: 3 },
  description: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "green", marginVertical: 5 },
  payment: { fontSize: 14, color: "blue", marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 10, marginTop: 10 },
});

export default MarketingRequestsScreen;
