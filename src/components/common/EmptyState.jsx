function EmptyState({
    title = "Nothing here yet",
    message = "",
    action = null,
}) {
    return (
        <section className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
                ∅
            </div>

            <h2>{title}</h2>

            {message && <p>{message}</p>}

            {action}
        </section>
    );
}

export default EmptyState;