export default function Overlay({
    mobile,
    onClick,
    opacity
}: {
    mobile: boolean,
    onClick: () => void,
    opacity: string
}) {
    return (
        <div
            className={`fixed ${mobile && ('md:hidden')} inset-0 bg-black ${opacity} z-30`}
            onClick={onClick}
        ></div>
    );
};
