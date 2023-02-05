import Image, { ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function CustomImage({
  src,
  height,
  width,
  base64,
  ...otherProps
}: Props) {
  if (!src) return null;
  if (typeof src === 'string' && (!height || !width)) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} height={height} width={width} {...otherProps} />;
  }
  return (
    <Image
      src={src}
      height={height}
      width={width}
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
      sizes="(min-width: 40em) 40em, 100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}
