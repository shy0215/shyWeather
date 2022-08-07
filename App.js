import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView,Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "09c08184876c7376fa48a19489727f4d";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
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
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator 
              color="#6868AC" 
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => 
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinydescription}>{day.weather[0].description}</Text>
            </View>
          )
        )}
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
    fontSize: 32,
    fontWeight:"300",
    
  },
  tinydescription:{
    color:"#6868AC",
  }

});
