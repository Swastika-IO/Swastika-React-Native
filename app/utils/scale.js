import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const parentBorder = 30;

const scale = size => width / guidelineBaseWidth * size;
const scaleVertical = size => height / guidelineBaseHeight * size;
const scaleModerate = (size, factor = 0.5) => size + (scale(size) - size) * factor;

//Base on "react-native-viewport-units"
//Ref: https://github.com/jmstout/react-native-viewport-units
const vw = width / 100
const vh = height / 100
const vmin = Math.min(vw, vh);
const vmax = Math.max(vw, vh);

export const getPercentWidth = (widthPer) => {
    return widthPer * width / 100
}

export const getPercentHeight = (heightPer) => {
    return heightPer * height / 100
}

export { scale, scaleVertical, scaleModerate, vw, vh, vmin, vmax };