export default function Overlay({ onClick }: { onClick: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={onClick}
        ></div>
    );
};
