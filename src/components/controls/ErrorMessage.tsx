export interface ErrorMessageProps {
    message: string
    error?: Error
}
export default function ErrorMessage(props: ErrorMessageProps) {
    const { message, error } = props
    return (
        <div role="alert" className="fade alert alert-danger show">
            <h4 className="alert-heading h4">{message}</h4>
            {error !== undefined && <p>{error.toString()}</p>}
        </div>
    )
}
