export default function Button({ type, color, size, className, title, onClick, disabled, loading }) {
    return (
        <button
            type={type ?? "button"}
            className={`text-uppercase btn ${color ?? 'btn-primary'} ${size ?? 'btn-sm'} ${className ?? ''}`}
            onClick={onClick}
            disabled={disabled}
            style={{minWidth: "80px"}}
        >
            {loading ?
                <div className="spinner-border spinner-border-sm" role="status">
                </div>
                :
                title
            }
        </button>
    );
}