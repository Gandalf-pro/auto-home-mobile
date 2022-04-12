import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function sendObjectData(object:any) {
    console.log("Sending data");
    
    let ip = await AsyncStorage.getItem("defaultIp") || "192.168.1.1";

    let res = await axios.post(`http:\/\/` + ip + ':2564/', object);
    return res;
}