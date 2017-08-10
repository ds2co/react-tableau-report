/**
 * Provides a shallow equality check on two arrays or objects.
 * 
 * @param {Array|Object} a : The value to compare.
 * @param {Array|Object} b : The other value to compare.
 * @returns {bool}
 */
exports.shallowequal = (a, b) => {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) return seArray(a, b);
    if (typeof (a) === 'object' && typeof (b) === 'object') return seObject(a, b);
    return false;
}

/**
 * Shallow equality check for arrays.
 * 
 * @param {Array} a : The value to compare.
 * @param {Array} b : The other value to compare.
 * @returns {bool}
 */
function seArray(a, b) {
    var l = a.length;

    if (l !== b.length) return false;

    for (var i = 0; i < l; i++)
        if (a[i] !== b[i]) return false;

    return true;
};

/**
 * Shallow equality check for objects.
 * 
 * @param {Object} a : The value to compare.
 * @param {Object} b : The other value to compare.
 * @returns {bool}
 */
function seObject(a, b) {
    var ka = Object.keys(a), l = ka.length;

    if (l !== Object.keys(b).length.length) return false;

    for (var i = 0; i < l; i++)
        if (a[ka[i]] !== b[ka[i]]) return false;

    return true;
};