function Alert({ type = "info", children, message }) {
    if (!children && !message) {
        return null;
    }

    return (
        <div className={`alert alert--${type}`} role="alert">
            {children || message}
        </div>
    );
}

export default Alert;
