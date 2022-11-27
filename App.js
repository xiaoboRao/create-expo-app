import {StatusBar} from 'expo-status-bar'
import {StyleSheet, View} from 'react-native'
import Button from './components/Button'
import { captureRef } from 'react-native-view-shot';
import CircleButton from './components/CircleButton'
import EmojiList from "./components/EmojiList";
import EmojiPicker from "./components/EmojiPicker";
import EmojiSticker from "./components/EmojiSticker";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import IconButton from './components/IconButton'
import ImageViewer from './components/ImageViewer'
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker'
import {useState, useRef } from 'react'

const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {
  const imageRef = useRef();
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('You did not select any image.')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  if(status === null) {
    requestPermission()
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer PlaceholderImage={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/> : null}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset}/>
              <CircleButton onPress={onAddSticker}/>
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>
        )}
        <EmojiPicker onClose={onModalClose} isVisible={isModalVisible}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}></EmojiList>
        </EmojiPicker>
        <StatusBar style="auto"/>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
