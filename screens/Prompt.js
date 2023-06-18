import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';


export default function Prompt({ navigation }) {
    const [promptText, setPromptText] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [promptData, setPromptData] = useState({});
    const handlePrompt = () => {
        setDataRecieved(false);
        setLoading(true);
        getPrompt();
    };

    const getPrompt = async () => {
        console.log("Prompt Text Checker:", promptText);
        const data = await axios.post("http://192.168.18.180:3000/api", { "text": promptText }).then((response) => { console.log(response.data); setLoading(false); ToastAndroid.show("Data Recieved", ToastAndroid.LONG); setDataRecieved(true); setPromptData(JSON.parse(response.data)); return response; });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Describe your dressing style and requirements
            </Text>
            {searchBar()}
            {skipToHome()}
            {loading ? loadingIndicator() : null}
            {dataRecieved && promptData ? AIResult() : null}
            {dataRecieved && promptData ? MoveToHome() : null}
            {tryButton()}
        </View>
    )

    function loadingIndicator() {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.aiText}>Feeding Data to AI Model...</Text>
            </View>

        )
    }

    function AIResult() {
        console.log("Prompt Data:", promptData.color);
        return (
            <View>
                <Text style={{ fontSize: 20 }}>Here is what the 🤖 thinks:</Text>
                <Text style={{ fontSize: 16 }}>Gender: {promptData.gender}</Text>
                <Text style={{ fontSize: 16 }}>Colors: {promptData.color ? promptData.color.toString() : promptData.color}</Text>
                <Text style={{ fontSize: 16 }}>Size: {promptData.size}</Text>
                <Text style={{ fontSize: 16 }}>Event: {promptData.event}</Text>
                <Text style={{ fontSize: 16 }}>Recommendation From AI 🤖: {promptData.typeOfClothing ? promptData.typeOfClothing.toString() : promptData.typeOfClothing}</Text>
            </View>
        )
    }

    function searchBar() {
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    // placeholder=""
                    placeholderTextColor="#888"
                    value={promptText}
                    onChangeText={setPromptText}
                    onPressIn={() => { setDataRecieved(false) }}
                    onSubmitEditing={handlePrompt}
                />
                <TouchableOpacity onPress={handlePrompt}>
                    <MaterialIcons
                        name="send"
                        size={24}
                        color="black"
                        style={styles.searchIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function skipToHome() {
        return (
            <TouchableOpacity style={styles.skipToHomeBtn} onPress={() => { navigation.navigate("Home"); }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Skip To View All Products</Text>
            </TouchableOpacity>
        );
    }

    function MoveToHome() {
        return (
            <TouchableOpacity style={styles.moveToHomeBtn} onPress={() => { navigation.navigate("Home", { aiPrompt: promptData }); }}>
                <Text style={{ color: 'white', fontSize: 18 }}>View Recommended Products</Text>
            </TouchableOpacity>
        );
    }

    function tryButton() {
        return (
            <TouchableOpacity style={styles.tryBtn} onPress={() => { navigation.navigate("ImageUpload"); }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Try Image Recognition</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
        marginVertical: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    searchIcon: {
        marginLeft: 8,
    },
    skipToHomeBtn: {
        backgroundColor: '#fe6a03',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 80,
    },
    moveToHomeBtn: {
        backgroundColor: '#ffce30',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 135,
    },
    tryBtn: {
        backgroundColor: '#ae12ea',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25,
    },
    aiText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        color: 'grey',
    }
});