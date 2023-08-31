export interface LoadingMessageProps {
    message: string
}

export default function LoadingMessage(props: LoadingMessageProps) {
    const { message } = props
    return (
        <div role="alert" className="fade alert alert-info show">
            <h4 className="alert-heading h4">Component Loading</h4>
            <p>{message}</p>
        </div>
    )
}
