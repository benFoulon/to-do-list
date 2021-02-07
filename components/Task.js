import React from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Octicons, AntDesign } from '@expo/vector-icons';

const Task = ({ item, deleteTask, validateTask }) => {


    const deleteMess = () => Alert.alert(
                "Supression tâches",
                "Es-tu sur de vouloir l'effacer ?",
                [
                    {
                        text: "Oui",
                        onPress: () => deleteTask(item.id)
                    },
                    {
                        text: "Non",
                        onPress: () => console.log("Non je veux pas !"),
                        style: "cancel"
                    },
                ],
                { cancelable: false }
            )
    if(item.completed !== true){
    return (
        <View style={styles.task}>
            <TouchableOpacity onPress={() => validateTask(item.id)}>
                <AntDesign name="checkcircleo" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity onPress={deleteMess}>
                <Octicons name="trashcan" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
    } else {
        return(
            <View style={styles.validTask}>
            <TouchableOpacity onPress={() => validateTask(item.id)}>
                <AntDesign name="checkcircleo" size={24} color="#cfcfcf" />
            </TouchableOpacity>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity onPress={deleteMess}>
                <Octicons name="trashcan" size={24} color="red" />
            </TouchableOpacity>
        </View>
        )
    }
}

export default Task

const styles = StyleSheet.create({
    task:{
        width: 350,
        padding: 30,
        backgroundColor: "#ffd86e",
        margin: 5,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    taskTitle:{
        fontFamily: 'Quicksand_600SemiBold',
        color: '#404040',
    },
    validTask:{
        width: 350,
        padding: 30,
        backgroundColor: "#ddffbd",
        margin: 5,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})
