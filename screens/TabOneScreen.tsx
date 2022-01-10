

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Image } from 'react-native';
import { RootTabScreenProps } from '../types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet} from 'react-native';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One!</Text>
      <Image 
        style={{width: 50, height: 50}}
        source={require('../assets/images/handwave.png')} 
      /> 

<View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        />
      )}
    </View>
      <View style={styles.separator} 
        lightColor="#eee" 
        darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
