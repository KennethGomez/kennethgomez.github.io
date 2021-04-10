export const get2DVectorDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): number => Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);

export const get2DVectorToRectDistance = (
    pX: number,
    pY: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number,
): number => Math.sqrt(
    Math.max(rectX - pX, 0, pX - (rectX + rectWidth)) ** 2
    + Math.max(rectY - pY, 0, pY - (rectY + rectHeight)) ** 2,
);
