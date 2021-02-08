export function textTruncate(str = "") {
    return str.length < 60 ? str : str.slice(0, 60) + "..."
}