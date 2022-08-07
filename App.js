import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Ulsan</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>sunny</Text>
        </View>
      </View>
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
    color:"#6868AC",
    fontSize: 32,
    fontWeight:"400",
  },
  weather:{
    flex: 3,
    
  },
  day:{
    flex: 1,
    alignItems:"center",
    
    
  },
  temp:{
    fontSize: 128,
    fontWeight:"300",
  },
  description:{
    marginTop: -10,
    fontSize: 28,
    
  },

});
