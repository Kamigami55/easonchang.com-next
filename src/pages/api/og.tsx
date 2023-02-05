import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const TITLE_LIMIT = 100;
const DESCRIPTION_LIMIT = 130;

// ! NOTE cannot use custom Traditional Chinese font now, because Vercel Edge only allow import 1mb of data
// and the font is 5mb...

// Make sure the font exists in the specified path:
// const NotoSansTCRegular = fetch(
//   new URL('../../assets/NotoSansTC-Regular.otf', import.meta.url)
// ).then((res) => res.arrayBuffer());
// const NotoSansTCBold = fetch(
//   new URL('../../assets/NotoSansTC-Bold.otf', import.meta.url)
// ).then((res) => res.arrayBuffer());

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const isTitleTooLong =
      hasTitle && searchParams.get('title')?.length > TITLE_LIMIT;
    let title = hasTitle
      ? searchParams.get('title')?.slice(0, TITLE_LIMIT)
      : '';
    if (isTitleTooLong) {
      title = `${title}...`;
    }

    // ?desc=<desc>
    const hasDescription = searchParams.has('desc');
    const isDescriptionTooLong =
      hasDescription && searchParams.get('desc')?.length > DESCRIPTION_LIMIT;
    let description = hasDescription
      ? searchParams.get('desc')?.slice(0, DESCRIPTION_LIMIT)
      : '';
    if (isDescriptionTooLong) {
      description = `${description}...`;
    }

    // const NotoSansTCRegularData = await NotoSansTCRegular;
    // const NotoSansTCBoldData = await NotoSansTCBold;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
            // fontFamily: 'Noto Sans TC, sans-serif',
          }}
        >
          <img
            src="https://easonchang.com/og-background.jpg"
            alt=""
            width={1200}
            height={630}
            tw="flex absolute w-full h-full"
          />
          <div tw="bg-white absolute flex flex-col right-0 bottom-0 h-[550px] w-[1100px] rounded-tl-[80px] p-[60px] shadow-2xl">
            <div tw="flex w-full items-center mb-4">
              <img
                src="https://easonchang.com/logo.png"
                alt="Eason Chang"
                width={100}
                height={100}
                tw="flex w-[100px] h-[100px] bg-gray-300 rounded-full"
              />
              <h2 tw="text-[48px] font-bold leading-none text-slate-900 ml-6">
                Eason Chang
              </h2>
            </div>
            <h1 tw="w-full text-[48px] font-bold leading-none text-slate-900 mb-2 overflow-hidden max-h-[176px] shrink-0">
              {title}
            </h1>
            <h3 tw="w-full text-[32px] leading-tight font-normal text-slate-600 overflow-hidden max-h-[140px] shrink-0">
              {description}
            </h3>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Noto Sans TC',
        //     data: NotoSansTCRegularData,
        //     weight: 400,
        //     style: 'normal',
        //   },
        //   {
        //     name: 'Noto Sans TC',
        //     data: NotoSansTCBoldData,
        //     weight: 700,
        //     style: 'normal',
        //   },
        // ],
      }
    );
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
