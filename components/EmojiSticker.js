import {Image, View} from 'react-native';

function EmojiSticker({imageSize, stickerSource}) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} resizeMode="contain" style={{width: imageSize, height: imageSize}}>

      </Image>
    </View>
  );
}

export default EmojiSticker;