import React, {useState} from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Constants from 'expo-constants';

const HomeScreen = ({navigation}) => {
    const [ciudad, setCiudad] = useState("");
    const [tempActual,setTempActual]=useState("")
    const [tempMax, setTempMax]= useState("");
    const [tempMin, setTempMin]= useState("");
    const [encontrado, setEncontrado] = useState(false);
    const [lat,setLat]=useState('');
    const [lon,setLon]=useState('');
    const titulo=ciudad.toUpperCase();

    async function buscar (city) {
        const key ="d19a1e62a0eb9dd8d9a3c1d1bb4dba55";
        const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

        const json= await fetch(api_url)
        const resultado= await json.json()
        if(json.status!==200){
            console.log('Nombre de ciudad inválido')
            setEncontrado(false);
            setTempMax("");
            setTempMin("");
            setTempActual("");
            setLon("");
            setLat("");
        }else{
            try{
                setTempActual(resultado.main.feels_like);
                setTempMax(resultado.main.temp_max);
                setTempMin(resultado.main.temp_min);
                setLat(resultado.coord.lat);
                setLon(resultado.coord.lon); 
                setEncontrado(true);
  
            }catch(e){
                console.log(e);
                setEncontrado(false);
                setTempMax("");
                setTempMin("");
                setTempActual("");
                setLon("");
                setLat("");
            }
        }
    }

    return (
    <View style={styles.container}>

        <SearchBar
            round
            containerStyle={{
                backgroundColor:'transparent',
                borderTopWidth:0,
                borderBottomWidth:0,
            }}
            inputStyle={{backgroundColor:'white'}}
            onChangeText={(texto)=>{
                setCiudad(texto);
                buscar(texto);
            }}
            onClear={()=>{
                setCiudad("");
                setEncontrado(false);
            }}
            value={ciudad}
            placeholder="Escribe aqui la ciudad..."
        />

        <View style={{margin:10, fontSize:20}}>
            {
                ciudad.length>0 
                ?
                    encontrado ?
                    <View style={[{ width: "100%", margin: 10, justifyContent:'center', alignItems:'center'}]}>
                        <Text style={styles.texto}> {tempActual}°C</Text>
                        <Text style={styles.texto}>Temperatura mínima: {tempMax}°C</Text>
                        <Text style={styles.texto}>Temperatura máxima: {tempMin}°C</Text>
                        <Button title="Pronóstico semanal" onPress={() => navigation.navigate('DetallesScreen',{lat,lon,titulo})}/>
                    </View>
                    :
                    <Text style={styles.texto2}>
                        Nombre de ciudad inválido
                    </Text>
                :
                <Text style={styles.texto}>
                    Realiza una búsqueda
                </Text>
            }

        </View>

    </View>);
}
 
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      justifyContent: 'flex-start',
      backgroundColor: '#fbfbfb',
    },
    images:{
      width: 100, 
      height: 150,
      margin:5,
    },
    texto:{
        color: 'black', 
        textAlign: 'center', 
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
    },
    texto1:{
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20,
      margin: 10,
      fontWeight: 'bold',
    },
    texto2:{
        color: 'black', 
        textAlign: 'center', 
        fontSize: 30,
        margin: 20,
        fontWeight: 'bold',
    }
});
