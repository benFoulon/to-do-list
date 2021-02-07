import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
// import { useFonts } from 'expo-font';
import Task from './components/Task';
import axios from 'axios';

export default function App() {

  
  let [fontsLoaded] = useFonts({
    // 'Aton': require("./assets/fonts/Anton-Regular.ttf")
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });
  
  
  
  const[title, setTitle] = useState("")
  const[tasks, setTask] = useState([])
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res =>{
        setTask(res.data)
      })
    }, [])
  
const addTask = () =>{
  if(title !== "") {
      const newTask = {
      id:uuidv4(),
      title: title,
    }
    setTask([...tasks, newTask])
    setTitle("")
  }
}

const deleteTask =(taskId) => {
  const tmpTasks = [...tasks];
  const currTaskIndex = tmpTasks.findIndex(task => task.id === taskId);
  tmpTasks.splice(currTaskIndex, 1);
  setTask(tmpTasks)

  // OU : 

    // FILTRER la copie pour supprimer la tâche en cours (indice - sérieux?)
        // const tmpTasks = tasks.filter(task => task.id !== taskId);

    // Remplacer l'état tasks par cette copie de tableau (indice setTasks)
        // setTasks(tmpTasks);
}

const validateTask = (taskComplete) => {
  // const tmpIndex = [...tasks];
  const currTask = tasks[taskComplete].completed
  // console.log(taskComplete);
  console.log(currTask)
}

  if(!fontsLoaded){
    return (<AppLoading/>)
  } else {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>To do list !</Text>
      <View>
        <TextInput 
          onChangeText={addTaks => setTitle(addTaks)}
          placeholder="Ajouter une tâche"
          style={styles.input}
          value={title}
        />
        <Button onPress={addTask} color='#e37500' title="Ajouter"/>
      </View>
      
      {/* <ScrollView>
      <View>
        {tasks.map(task=>{
          return (
            <View style={styles.taskBox}>
            <Text key={task.id} style={styles.task}>{task.title}</Text>
            <Octicons name="trashcan" size={24} color="black" />
            </View>
          )
        })}
      </View>
      </ScrollView> */}

      <FlatList 
      data={tasks}
      renderItem={({item}) => {
        return <Task item={item} deleteTask={deleteTask} validateTask={validateTask}/>}}
      keyExtractor={item => item.id.toString()}
      />

    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop : 50,
    alignItems: 'center',
    backgroundColor: '#fcba03'
  },
  title:{
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
  },
  input:{
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor : 'white',
    borderRadius: 20,
    
  },
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
  },
  validTask:{
    width: 350,
    padding: 30,
    backgroundColor: "#bbe693",
    margin: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})