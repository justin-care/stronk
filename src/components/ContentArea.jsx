const ContentArea = ({ children }) => {
    return (
        <div className="flex flex-col justify-start h-full p-4 pb-16 text-xl">
            {children}
        </div>
    )
}

export default ContentArea;