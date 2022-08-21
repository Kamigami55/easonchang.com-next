// Custom rehype plugin to add width and height to local images
// To make Next.js <Image/> works
// Ref: https://kylepfromer.com/blog/nextjs-image-component-blog

// Similiar structure to:
// https://github.com/JS-DevTools/rehype-inline-svg/blob/master/src/inline-svg.ts
import imageSize from 'image-size';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';

const sizeOf = promisify(imageSize);

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node) {
  const img = node;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  );
}

/**
 * Filters out non absolute paths from the public folder.
 */
function filterImageNode(node) {
  return node.properties.src.startsWith('/');
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node) {
  const res = await sizeOf(
    path.join(process.cwd(), 'public', node.properties.src)
  );
  const { base64 } = await getPlaiceholder(node.properties.src, { size: 10 }); // 10 is to increase detail (default is 4)

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  node.properties.width = res.width;
  node.properties.height = res.height;
  node.properties.base64 = base64;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export default function imageMetadata() {
  return async function transformer(tree) {
    const imgNodes = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree;
  };
}
