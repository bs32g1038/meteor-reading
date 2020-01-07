const generateRandomNumberArray = (len, maxNum) => {
    let i = 0;
    const s = new Set();
    while (i < len) {
        const num = Math.floor(Math.random() * maxNum);
        if (!s.has(num)) {
            s.add(num);
            i++;
        }
    }
    return [...s];
};

exports.generateRandomNumberArray = generateRandomNumberArray;
