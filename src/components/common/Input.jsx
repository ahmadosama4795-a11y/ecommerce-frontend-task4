function Input({
    id,
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    disabled = false,
}) {
    return (
        <div className="form-field">
            {label && (
                <label htmlFor={id}>
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </label>
            )}

            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
            />

            {error && (
                <p id={`${id}-error`} className="form-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;