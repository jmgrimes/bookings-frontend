import Head from "next/head"
import Image from "next/image"

export default function HomePage() {
    return (
        <div className="container">
            <Head>
                <title>Bookings Application</title>
                <meta
                    name="description"
                    content="Book conference rooms, projectors, and other supplies for your meetings!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="row p-3">
                <div className="col text-md-center">
                    <h1>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>
                    <p>
                        Get started by editing <code>pages/index.tsx</code>
                    </p>
                </div>
            </div>
            <div className="row p-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Documentation &rarr;</h5>
                            <p className="card-text">Find in-depth information about Next.js features and API.</p>
                            <a className="card-link" href="https://nextjs.org/docs">
                                Read more...
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Learn &rarr;</h5>
                            <p className="card-text">Learn about Next.js in an interactive course with quizzes!</p>
                            <a className="card-link" href="https://nextjs.org/learn">
                                Read more...
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row p-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Examples &rarr;</h5>
                            <p className="card-text">Discover and deploy boilerplate example Next.js projects.</p>
                            <a className="card-link" href="https://github.com/vercel/next.js/tree/canary/examples">
                                Read more...
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Deploy &rarr;</h5>
                            <p className="card-title">
                                Instantly deploy your Next.js site to a public URL with Vercel.
                            </p>
                            <a
                                className="card-link"
                                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
                                Read more...
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row p-3">
                <div className="col text-md-center">
                    <hr />
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer">
                        Powered by{" "}
                        <span>
                            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
