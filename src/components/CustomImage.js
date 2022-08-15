import Image from 'next/image'

export default function CustomImage({ src, height, width, alt, ...otherProps }) {
  if (!src || !height || !width) {
    return <img src={src} height={height} width={width} alt={alt} {...otherProps} />
  }
  return (
    <Image layout="responsive" src={src} height={height} width={width} alt={alt} {...otherProps} />
  )
}
