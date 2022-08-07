import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps:false}
    );
    setCity(location[0].city);
  };
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>  
        </View>
      </ScrollView>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDD5EC',
  },
  city:{
    marginTop: 50,
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName:{
    marginTop: 10,
    color:"#6868AC",
    fontSize: 32,
    fontWeight:"400",
  },
  weather:{
    
  },
  day:{
    width: SCREEN_WIDTH,
    alignItems:"center", 
  },
  temp:{
    color:"#6868AC",
    fontSize: 128,
    fontWeight:"200",
  },
  description:{
    color:"#6868AC",
    marginTop: -5,
    fontSize: 28,
    fontWeight:"300",
    
  },

});
