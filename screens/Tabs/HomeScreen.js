import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from "../../styles/styles";

const Home = ({ navigation }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const data = [
        { id: 1, title: 'Товар 1', description: 'Описание товара 1'},
        { id: 2, title: 'Товар 2', description: 'Описание товара 2' },
        { id: 3, title: 'Товар 3', description: 'Описание товара 3' },
        { id: 4, title: 'Товар 4', description: 'Описание товара 4' },
        { id: 5, title: 'Товар 5', description: 'Описание товара 5' },
    ];

    const renderImplement = () => (
        <View style={styles.implementContainer}>
            <View style={styles.implementContent}>
                {selectedItem && (
                    <>
                        <Text style={styles.implementTitle}>{selectedItem.title}</Text>
                        <Text style={styles.implementDescription}>{selectedItem.description}</Text>
                    </>
                )}

                <TouchableOpacity style={styles.button_close} onPress={() => setSelectedItem(null)}>
                    <Text>Закрыть</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View>
            <Text>This is Home</Text>
            {data.map(item => (
                <TouchableOpacity key={item.id} onPress={() => setSelectedItem(item)}>
                    <Text style={styles.title_center}>{item.title}</Text>
                </TouchableOpacity>
            ))}

            {selectedItem && renderImplement()}
        </View>
    );
};
export default Home;
