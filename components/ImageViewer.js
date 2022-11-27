import { StyleSheet, Image } from "react-native";

const ImageViewer = ({ PlaceholderImage, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  return <Image source={imageSource} style={styles.image}></Image>;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
