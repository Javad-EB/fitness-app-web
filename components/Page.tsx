import Head from "next/head";

export default function Page({
    title,
    content,
    children,
}: {
    title: string,
    content: string,
    children: any,
}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.png" type="image/png" />
            </Head>
            <main className="lg:mx-32 md:mx-18 mx-10 flex-grow">{children}</main>
        </div>
    )
}