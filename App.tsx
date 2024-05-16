// import React, { useState } from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const DATA = [
//   {
//     id: '1',
//     title: 'Resumo - exemplo 01',
//     resumo: 'Texto exemplo do resumo',
//     // isEnabled: false,
//   },
//   {
//     id: '2',
//     title: 'Resumo - exemplo 02',
//     resumo: 'Texto exemplo do resumo',
//     // isEnabled: false,
//   },
//   {
//     id: '3',
//     title: 'Resumo - exemplo 03',
//     resumo: 'Texto exemplo do resumo',
//     // isEnabled: false,
//   },
// ];

// // type ItemProps = {title: string; resumo: string; isEnabled: boolean; toggleSwitch: any};
// type ItemProps = {
//   title: string;
//   resumo: string;
//   item: any;
//   onPress: any;
//   backgroundColor: string;
//   textColor: string;
// };

// // const Item = ({title, resumo, isEnabled, toggleSwitch}: ItemProps) => (
// const Item = ({
//   title,
//   resumo,
//   onPress,
//   backgroundColor,
//   textColor,
//   item,
// }: ItemProps) => (
//   // <SafeAreaView style={styles.container}>
//   <View style={styles.item}>
//     <TouchableOpacity
//       onPress={onPress}
//       style={[styles.item, {backgroundColor}]}>
//       <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
//     </TouchableOpacity>
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.resumo}>{resumo}</Text>
//     </View>

//     {/* <Switch
//       trackColor={{false: '#767577', true: '#81b0ff'}}
//       thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
//       ios_backgroundColor="#3e3e3e"
//       onValueChange={toggleSwitch}
//       value={isEnabled}
//     /> */}
//   </View>
//   /* </SafeAreaView> */
// );

// const App = () => {
//   // const [isEnabled, setIsEnabled] = useState(false);
//   // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   const [selectedId, setSelectedId] = useState();
//   const renderItem = ({item}) => {
//     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     const color = item.id === selectedId ? 'white' : 'black';
//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         backgroundColor={backgroundColor}
//         textColor={color}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         // renderItem={({item}) => <Item title={item.title} resumo={item.resumo} isEnabled={item.isEnabled} toggleSwitch={toggleSwitch}/>}
//         renderItem={({item}) => <Item title= {item.title} resumo={item.resumo} />}
//         keyExtractor={item => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
//   resumo: {
//     fontSize: 12,
//   },
// });

// export default App;
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

const DATA = [
  {
    id: '1',
    title: 'Resumo - exemplo 01',
    resumo: 'Texto exemplo do resumo',
    // isEnabled: false,
  },
  {
    id: '2',
    title: 'Resumo - exemplo 02',
    resumo: 'Texto exemplo do resumo',
    // isEnabled: false,
  },
  {
    id: '3',
    title: 'Resumo - exemplo 03',
    resumo: 'Texto exemplo do resumo',
    // isEnabled: false,
  },
];

const Item = ({item, onPress, backgroundColor, textColor, resumo}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    <Text style={[styles.resumo, {color: textColor}]}>{item.resumo}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState();
  const [resumo, setResumo] = useState();
  const loadProducts = async () => {
    console.log('Antes endpoint');
    const response = await api.get('/resumo');
    //const { docs } = response.data;
    console.log(response);
  };
  // useEffect(() => {
  //   api
  //     .get('/resumo')
  //     .then(response => {
  //       console.log(response);
  //       setResumo(response.data);
  //     })
  //     .catch(err => {
  //       console.error('opa! ocorreu um erro' + err);
  //     });
  // }, []);
  const showAlert = (msg: any) =>
    Alert.alert(
      'Alert Title',
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

  const confirmarSelecao = () => {
    showAlert(selectedId);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        resumo={undefined}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <p>teste: {resumo}</p> */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      {/* <View style={styles.container} /> */}
      <Button
        onPress={confirmarSelecao}
        title="Confimar"
        color="#841584"
        accessibilityLabel=".."
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  resumo: {
    fontSize: 20,
  },
});

export default App;
