import React from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearchBar = ({term,onTermChange,onTermSubmit}) =>{
    return (<View style={styles.background}>
        <Feather name="search" size={30} />
        <TextInput 
            style={styles.inputStyle} 
            placeholder="Flickr Search"
            autoCorrect={false}
            autoCapitalize="none"
            value={term}
            onChangeText={onTermChange}
            onEndEditing={onTermSubmit}
            />
    </View>);
};

const styles= StyleSheet.create({
    background:{
        marginVertical:10,
        backgroundColor:'#F0EEEE',
        height:50,
        borderRadius:5,
        marginHorizontal:15,
        flexDirection:'row',
        padding:10
    },
    inputStyle:{
        marginLeft:10,
        flex:1,
       
    }
});

export default SearchBar;