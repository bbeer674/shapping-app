import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function IconActive({...props}: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 18L12 14.95L16 18L14.5 13.05L18.5 10.2H13.6L12 5L10.4 10.2H5.5L9.5 13.05L8 18ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
        fill="#1D192B"
      />
    </Svg>
  );
}

export function IconInActive({...props}: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 18L12 14.95L16 18L14.5 13.05L18.5 10.2H13.6L12 5L10.4 10.2H5.5L9.5 13.05L8 18ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#49454F"
      />
    </Svg>
  );
}

export function IconWrong({...props}: SvgProps) {
  return (
    <Svg width="66" height="65" viewBox="0 0 66 65" fill="none">
      <Path
        d="M23.25 46.0416L33 36.2916L42.75 46.0416L46.5417 42.25L36.7917 32.5L46.5417 22.75L42.75 18.9583L33 28.7083L23.25 18.9583L19.4584 22.75L29.2084 32.5L19.4584 42.25L23.25 46.0416ZM33 59.5833C29.2535 59.5833 25.7327 58.8724 22.4375 57.4505C19.1424 56.0286 16.2761 54.0989 13.8386 51.6614C11.4011 49.2239 9.47137 46.3576 8.0495 43.0625C6.62762 39.7673 5.91669 36.2465 5.91669 32.5C5.91669 28.7534 6.62762 25.2326 8.0495 21.9375C9.47137 18.6423 11.4011 15.776 13.8386 13.3385C16.2761 10.901 19.1424 8.97131 22.4375 7.54944C25.7327 6.12756 29.2535 5.41663 33 5.41663C36.7465 5.41663 40.2674 6.12756 43.5625 7.54944C46.8577 8.97131 49.724 10.901 52.1615 13.3385C54.599 15.776 56.5287 18.6423 57.9505 21.9375C59.3724 25.2326 60.0834 28.7534 60.0834 32.5C60.0834 36.2465 59.3724 39.7673 57.9505 43.0625C56.5287 46.3576 54.599 49.2239 52.1615 51.6614C49.724 54.0989 46.8577 56.0286 43.5625 57.4505C40.2674 58.8724 36.7465 59.5833 33 59.5833ZM33 54.1666C39.0486 54.1666 44.1719 52.0677 48.3698 47.8698C52.5677 43.6718 54.6667 38.5486 54.6667 32.5C54.6667 26.4513 52.5677 21.3281 48.3698 17.1302C44.1719 12.9323 39.0486 10.8333 33 10.8333C26.9514 10.8333 21.8281 12.9323 17.6302 17.1302C13.4323 21.3281 11.3334 26.4513 11.3334 32.5C11.3334 38.5486 13.4323 43.6718 17.6302 47.8698C21.8281 52.0677 26.9514 54.1666 33 54.1666Z"
        fill="#B3261E"
      />
    </Svg>
  );
}

export function IconBack({...props}: SvgProps) {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M15.825 21L21.425 26.6L20 28L12 20L20 12L21.425 13.4L15.825 19H28V21H15.825Z"
        fill="#1D1B20"
      />
    </Svg>
  );
}

export function IconBin({...props}: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
        fill="white"
      />
    </Svg>
  );
}

export function IconMark({...props}: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
        fill="#F5EFF7"
      />
    </Svg>
  );
}
