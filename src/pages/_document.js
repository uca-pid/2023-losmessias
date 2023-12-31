import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link
                    rel='icon'
                    type='image/png'
                    href='https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/book-bookmark-icon.png'
                />
            </Head>
            <body>
                <title>Leherer</title>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
