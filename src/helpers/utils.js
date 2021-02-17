export function textTruncate(str = "", maxLength) {
    return !maxLength || str.length <= maxLength ?
        str : str.slice(0, maxLength) + "..."
}