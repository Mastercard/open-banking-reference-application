export default function ExternalIcon({ data = '#8A2D0E', background }: any) {
    return (
        <svg width='24px' height='24px' viewBox='0 0 24 24' fill={background}>
            <g
                strokeWidth='2.1'
                stroke={data}
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <polyline points='17 13.5 17 19.5 5 19.5 5 7.5 11 7.5'></polyline>
                <path d='M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5'></path>
            </g>
        </svg>
    );
}
