export const newIdFor = data =>
    Math.max(...data.map(d => d.id), 0) + 1

export const spaceship = (a, b) => {
    if (a < b) { return -1 }
    if (a > b) { return 1 }
    return 0
}

export const upperFirst = s => s[0].toUpperCase() + s.substring(1).toLowerCase()