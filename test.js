let s1 = 'aabcc';
let s2 = 'adcaa';
let arrC = []

let foundMatch = false;

for (let i = 1; i <= s1.length; i++) {
    let currentCharA = s1[i];

    for (let j = 0; j < s2.length; j++) {
        if (currentCharA === s2[j]) {
            foundMatch = true;
            break;
        }
    }

    if (foundMatch) {
        // console.log([i]);
        arrC.push(i)
    }

    foundMatch = false;
}

return arrC.length;