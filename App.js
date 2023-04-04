import {useState, React} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Button,
  Pressable,
  FlatList,
  StatusBar,
} from 'react-native';
import {DropdownIcon, DeleteIcon} from './assets/icons';
export default function App() {
  const [item, setItem] = useState('');

  const [update, editupdate] = useState(0);
  const [list, setList] = useState([]);
  const additem = () => {
    setList([...list, {key: Math.random().toString(), data: item}]);
    setItem('');
    Keyboard.dismiss();
  };

  const handleDelete = key => {
    setList(() => list.filter(element => element.key != key));
  };

  const handleUpdate = item => {
    setItem(item.data);
    editupdate(item.key);
  };

  const updateList = () => {
    setList(() =>
      list.map(element =>
        element.key === update ? {key: element.key, data: item} : element,
      ),
    );

    setItem('');
    editupdate(0);
  };

  const renderElement = ({item, index}) => (
    <View style={styles.item}>
      <View style={styles.allItems}>
        <View style={styles.itemLeft}>
          <Text
            key={`item-${index}`}
            style={{
              color: 'white',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 17,
            }}>
            {`${index + 1}`}
          </Text>
        </View>
        <View>
          <TouchableOpacity key={item.key} onPress={() => handleUpdate(item)}>
            <Text style={styles.itemText}> {item.data} </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            key={item.key}
            onPress={() => handleDelete(item.key)}>
            <View>
              <DeleteIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#78cef7" />
      <View
        style={{
          backgroundColor: '#78cef7',
        }}>
        <Text style={styles.statustext}>To Do List</Text>
      </View>
      <View
        style={{
          marginTop: 30,
          marginLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.textPart}>
          <TextInput
            placeholder="Enter an item"
            value={item}
            style={{color: 'black'}}
            placeholderTextColor="black"
            onChangeText={setItem}
          />
          <View style={{marginLeft: 46, marginTop: 6}}>
            <DropdownIcon />
          </View>
        </View>
        <View style={styles.buttontext}>
          <Pressable
            disabled={item.length <= 0}
            onPress={update === 0 ? additem : updateList}>
            <Text
              style={{
                fontSize: 16,
                left: 15,
                color: 'black',
                fontWeight: '400',
                marginTop: 6,
                marginLeft: 5,
              }}>
              {update === 0 ? 'Add Item' : 'Update Item'}
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        style={{width: '100%'}}
        data={list}
        renderItem={renderElement}></FlatList>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}></KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statustext: {
    fontSize: 33,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    fontWeight: '400',
    marginBottom: 10,
  },
  textPart: {
    backgroundColor: 'white',
    width: 200,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 5,
    padding: 3,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    flexDirection: 'row',
    color: 'black',
  },
  buttontext: {
    width: 120,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 3,
    borderRadius: 20,
    backgroundColor: '#b6b5b7',
  },

  item: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  itemLeft: {
    backgroundColor: '#78cef7',
    height: 24,
    width: 24,
    borderRadius: 5,
  },
  itemRight: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 8,
  },
  allItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400',
    marginHorizontal: 1,
  },
});
