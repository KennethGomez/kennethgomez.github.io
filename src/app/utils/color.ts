export const componentToHex = (n: number) => n.toString(16).padStart(2, '0');

export const toHex = (n: number, a: number) => {
    const r = (n >> 16) & 0xFF;
    const g = (n >> 8) & 0xFF;
    const b = n & 0xFF;

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${componentToHex(a)}`;
};
