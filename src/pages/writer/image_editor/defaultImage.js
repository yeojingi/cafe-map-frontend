import Image from '../../../image/write-default-image.png';

const dataURLtoFile = (dataurl, fileName) => {
  if (dataurl.includes("base64")){
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);
    console.log(mime);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, {type:mime});
  }
}

const defaultImage = () => {
  return Image
}

export default defaultImage;