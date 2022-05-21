
export const sleep = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay))
}

export function ellipseAddress(address = "", width = 10): string {
    return `${address.slice(0, width)}...${address.slice(-width)}`;
}