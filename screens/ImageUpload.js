import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { useState } from 'react'
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


export default function ImageUpload({ navigation }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Upload your full image to get recommendations.
            </Text>
            {uploadImage()}
        </View>
    )


    function uploadImage() {
        return (
            <TouchableOpacity style={styles.uploadImageBtn} onPress={() => { pickImage() }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Upload Image</Text>
                <MaterialCommunityIcons name="upload" size={24} color="black" />
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
    uploadImageBtn: {
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});