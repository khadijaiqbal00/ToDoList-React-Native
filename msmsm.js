import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [edit, checkEdit] = useState(0)

  const additem = () => {
          setList([...list, {key:Math.random().toString(), data: item}]);
          setItem("")
          Keyboard.dismiss();
        }

  const deleteItem =(key) =>
    {
        setList(() => list.filter((element)=> element.key != key ))
    }

    const updateItem = (item) =>
    {
      setItem(item.data)
      checkEdit(item.key)
    }

    const updateList = () =>
    {
      setList(() => list.map((element) =>  element.key === edit ? {key: element.key, data: item} : element)  )

      setItem("")
      checkEdit(0)
    }

    const renderElement= ({item}) => (
      <TouchableOpacity key={item.key} onPress={()=> updateItem(item)}>
          <View
            style={{
              flexDirection: 'row',
                width: '80%',
                alignSelf: 'center',
                backgroundColor: 'blue',
                margin: 10,
                borderRadius: 50,
                justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 20, margin: 10, color: 'white' }}>
               {item.data}{' '}
            </Text>

            <TouchableOpacity key={item.key} onPress={() => deleteItem(item.key)}>
              <View
                style={{
                  backgroundColor: 'black',
                  padding: 5,
                  borderRadius: 50,
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 20, color: 'white',fontWeight: 'bold', padding:5 }}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
          </TouchableOpacity>

    )

  return (
    <View style={{ alignItems: 'center', marginTop: 30, width: '100%' }}>
      <Text style={{ fontSize: 25 }}>To Do List</Text>

      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Enter your item here"
        value={item}
        onChangeText={setItem}
        >
      </TextInput>

      <Button
        disabled={item.length <= 0}
        title={edit === 0 ? "Add Item" : "Update Item"}
        onPress={edit === 0 ? additem : updateList}>
        {' '}
      </Button>

      <FlatList style= {{width:"100%"}} data={list} renderItem = {(renderElement)}>

          
       </FlatList>
      
    </View>
  );
}

const styles = StyleSheet.create({});
