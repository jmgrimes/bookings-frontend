import { Alert, ProgressBar } from "react-bootstrap"

interface ILoadingMessageProps {
    message: string
}

export default function LoadingMessage(props: ILoadingMessageProps) {
    const { message } = props
    return (
        <Alert variant="info">
            <Alert.Heading>{message}</Alert.Heading>
            <ProgressBar now={100} animated={true} label="Please wait..." />
        </Alert>
    )
}
