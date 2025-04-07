

const Message = ({ varient, children }) => {
    const getVariantClass = () => {
        switch (varient) {
            case "success":
                return "bg-green-100 text-green-800"
            case "error":
                return "bg-red-100 text-red-700"
            default:
                return "bg-bule-100 text-bule-700"
        }
    }
    return (
        <div className={`p-4 rounded ${getVariantClass()}`}>
            {children}
        </div>
    )
}

export default Message
