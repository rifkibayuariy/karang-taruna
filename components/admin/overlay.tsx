export default function Overlay({ mobile, onClick }: { mobile: boolean, onClick: () => void }) {
    return (
        <div
            className={`fixed ${mobile && ('md:hidden')} inset-0 bg-black opacity-50 z-30`}
            onClick={onClick}
        ></div>
    );
};
