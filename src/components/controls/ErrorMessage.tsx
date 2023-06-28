import { Alert } from "react-bootstrap"

interface IErrorMessageProps {
    message: string
    error?: Error
}
export default function ErrorMessage(props: IErrorMessageProps) {
    const { message, error } = props
    return (
        <Alert variant="danger">
            <Alert.Heading>{message}</Alert.Heading>
            {error !== undefined && <p>{error.toString()}</p>}
        </Alert>
    )
}
