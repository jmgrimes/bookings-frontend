interface ILoadingMessageProps {
    message: string
}

export default function LoadingMessage(props: ILoadingMessageProps) {
    const { message } = props
    return (
        <div role="alert" className="fade alert alert-info show">
            <h4 className="alert-heading h4">Component Loading</h4>
            <p>{message}</p>
        </div>
    )
}
