
import {ServerStyleSheets} from '@material-ui/core/styles'
import {NextPage} from "next"
import Document, {DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript} from 'next/document'
import {Children} from 'react'

const MyDocument: NextPage<DocumentInitialProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (context: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = context.renderPage
  
  context.renderPage = () => originalRenderPage({
    // eslint-disable-next-line react/display-name
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
  })

  const initialProps = await Document.getInitialProps(context)

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default MyDocument