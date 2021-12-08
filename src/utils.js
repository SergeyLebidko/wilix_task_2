export function createFieldData(size) {
    const result = [];
    const numbers = [];

    for (let number = 1; number <= ((size ** 2) / 2); number++) {
        numbers.push(number, number);
    }

    let content;
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (numbers.length === 1) {
                content = numbers[0];
            } else {
                content = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
            }
            result.push({
                id: `${row}:${col}`,
                content,
                hasOpen: false
            });
        }
    }

    return result;
}