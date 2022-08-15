import Image from 'next/image'

export default function CustomImage({ src, height, width, base64, ...otherProps }) {
  if (!src || !height || !width) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} height={height} width={width} {...otherProps} />
  }
  return (
    <Image
      layout="responsive"
      src={src}
      height={height}
      width={width}
      sizes="(min-width: 40em) 40em, 100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
    />
  )
}
