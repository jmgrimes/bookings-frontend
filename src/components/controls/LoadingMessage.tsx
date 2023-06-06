import { FunctionComponent } from "react"
import { Alert, ProgressBar } from "react-bootstrap"

interface LoadingMessageProps {
    message: string
}
const LoadingMessage: FunctionComponent<LoadingMessageProps> = props => {
    return (
        <Alert variant="info">
            <Alert.Heading>{props.message}</Alert.Heading>
            <ProgressBar now={100} animated={true} label="Please wait..." />
        </Alert>
    )
}

export default LoadingMessage
