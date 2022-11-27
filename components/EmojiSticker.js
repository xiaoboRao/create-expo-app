import {Image, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { TapGestureHandler, PanGestureHandler} from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

function EmojiSticker({imageSize, stickerSource}) {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if(scaleImage.value) {
        scaleImage.value = scaleImage.value*2
      }
    }
  })

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    console.log('scaleImage.value', scaleImage.value)
    return {
      width: withSpring(scaleImage.value),
      heigth: withSpring(scaleImage.value)
    }
  })
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
    <AnimatedView style={[containerStyle, { top: -350 }] }>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2} >
        <AnimatedImage source={stickerSource} resizeMode="contain" style={imageStyle}>
        </AnimatedImage>
      </TapGestureHandler>
    </AnimatedView>
    </PanGestureHandler>
  );
}

export default EmojiSticker;