import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const getallUsers = async () => {
    await axios
      .get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
      .then((res) => {
        setUsers([...users,...res.data.results]);
      });
  };
  useEffect(() => {
    getallUsers();
  }, [currentPage]);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: "5%",
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor: "black",
        }}
      >
        <Image
          source={{ uri: item.picture.large }}
          style={{ marginRight: 16, width: 100, height: 100 }}
        />
        <View>
          <Text>{`${item.name.title}`}</Text>
          <Text>{`${item.email}`}</Text>
        </View>
      </View>
    );
  };
  const loadMoreItem=()=>{
    setcurrentPage(currentPage +1);
  }
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.email}
      ListFooterComponent={renderLoader}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
    />
  );
}
const renderLoader =()=>{
  return(
    <View style={{marginVertical:16 }}>
      <ActivityIndicator size="large" color="#aaa" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
