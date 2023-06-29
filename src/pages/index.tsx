import Head from "next/head"
import Image from "next/image"
import { Card, Col, Container, Row } from "react-bootstrap"

export default function HomePage() {
    return (
        <Container>
            <Head>
                <title>Bookings Application</title>
                <meta
                    name="description"
                    content="Book conference rooms, projectors, and other supplies for your meetings!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Row className="p-3">
                <Col className="text-md-center">
                    <h1>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>
                    <p>
                        Get started by editing <code>pages/index.tsx</code>
                    </p>
                </Col>
            </Row>
            <Row className="p-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Documentation &rarr;</Card.Title>
                            <Card.Text>Find in-depth information about Next.js features and API.</Card.Text>
                            <Card.Link href="https://nextjs.org/docs">Read more...</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Learn &rarr;</Card.Title>
                            <Card.Text>Learn about Next.js in an interactive course with quizzes!</Card.Text>
                            <Card.Link href="https://nextjs.org/learn">Read more...</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="p-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Examples &rarr;</Card.Title>
                            <Card.Text>Discover and deploy boilerplate example Next.js projects.</Card.Text>
                            <Card.Link href="https://github.com/vercel/next.js/tree/canary/examples">
                                Read more...
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Deploy &rarr;</Card.Title>
                            <Card.Text>Instantly deploy your Next.js site to a public URL with Vercel.</Card.Text>
                            <Card.Link href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
                                Read more...
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="p-3">
                <Col className="text-md-center">
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
                </Col>
            </Row>
        </Container>
    )
}
