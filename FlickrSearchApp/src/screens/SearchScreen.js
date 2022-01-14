import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList,Button,Alert } from 'react-native';
import SearchBar from '../components/SearchBar';
import flickr from '../api/flickr';


const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [photos, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [filteredData, setfilteredData] = useState([]);
    const searchApi = async (searchTerm) => {
        console.log('Flickr arama apisi çağrıldı.');
        
      

        try {
            if (searchTerm == '' || searchTerm == null) {
                searchTerm = 'pastağ';
            }
            const response = await flickr.get('?', {
                params: {
                    method: 'flickr.photos.search',
                    tags: searchTerm,
                    format: 'json',
                    nojsoncallback: 1,
                    api_key: '9aad88e2cf70848f3f5590f9ce57277d',
                }
            });
            setfilteredData(response.data.photos.photo)
            console.log(response.data.photos.photo)
            setResults(response.data.photos.photo);

        } catch (err) {
            console.log(err);
            setErrorMessage('Beklenmeyen bir hatayla karşılaşıldı.');
        }
    };
    useEffect(() => { searchApi('Makarna') }, []);
    useEffect(() => { console.log('Aranılan kelime değiştirildi.') }, [term, photos, errorMessage]);

    const ItemView = ({ }) => {
        
        return (
            <View>
                
                {photos.map((item) => (
                    <Image style={{
                         margin: 20, flex: 1, height: 250, borderRadius: 120,
                        
                         }}
                        source={{ uri: 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg' == undefined ? '' : 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg' }} />
                )
                )
                }
            </View>
        )
    }

  
    return (
        

        <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row',justifyContent: 'center',}} >
      <Image
        style={styles.logo}
        source={require('../../assets/FlickrLogo.jpg')}
      />
      </View>
    
            <SearchBar term={term}
                onTermChange={
                    (newTerm) => {
                        setTerm(newTerm);
                    }
                }
                onTermSubmit={() => searchApi(term)}
            />
            
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'red' }} >Aranılan kelime : {term}</Text>
            <Text>{errorMessage}</Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'green' }} >{photos.length} adet içerik listelenmiştir.</Text>
            <View >
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

    },
    itemStyle: {
        padding: 15
    },
    logo: {
        height:80,
        width:140
    },
})


export default SearchScreen;

