type Props = {
    label: string,
    onClick: () => void,
    isActive: boolean
}

export default ({ label, onClick, isActive }: Props) => (
    <div
        className={`tab ${isActive ? "active" : ""}`}
        onClick={onClick}>
        {label}
    </div>
);