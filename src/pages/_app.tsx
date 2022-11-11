import { NextPage } from "next"
import { AppProps } from "next/app"
import Head from "next/head"
import { Fragment } from "react"

import "bootstrap/dist/css/bootstrap.css"

type ApplicationProps = AppProps<Record<string, never>>
const Application: NextPage<ApplicationProps> = props => {
    const { Component, pageProps } = props
    return (
        <Fragment key="application">
            <Head key="viewport">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default Application
