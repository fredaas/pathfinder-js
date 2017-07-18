function manhattan(dx, dy) {
    return Math.abs(dx) + Math.abs(dy);
}

function euclidean(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
}

function chebyshev(dx, dy) {
    return Math.max(dx, dy);
}

export { manhattan, euclidean, chebyshev }
