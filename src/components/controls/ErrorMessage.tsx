import { FunctionComponent } from "react"
import { Alert } from "react-bootstrap"

interface ErrorMessageProps {
    message: string
    error?: Error
}
const ErrorMessage: FunctionComponent<ErrorMessageProps> = props => {
    return (
        <Alert variant="danger">
            <Alert.Heading>{props.message}</Alert.Heading>
            {props.error !== undefined && <p>{props.error.toString()}</p>}
        </Alert>
    )
}

export default ErrorMessage
