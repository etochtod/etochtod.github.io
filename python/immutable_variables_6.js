// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'namespaces_7.html';
const nextLevel = 7;

// initial python strings
const initValueInTextArea =
`s1 = "Hello world!"
s2 = s1
print(f"Значення змінної s2 дорівнює: {s2}")

list1 = [10, 20]
list2 = list1.copy().append(15)
print(f"Перший список дорівнює {list1}")
print(f"Другий список дорівнює {list2}")
`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4, t5];

// check if s2 displays "HELLO WORLD!"
function t1() {
    const required = "Значення змінної s2 дорівнює: HELLO WORLD!";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if list1 displays "[10, 20]"
function t2() {
    const required = "Перший список дорівнює [10, 20]";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if list2 displays "[10, 20, 15]"
function t3() {
    const required = "Другий список дорівнює [10, 20, 15]";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains list2.append(15)
function t4() {
    const tArea = $("tArea").value;
    const pattern = /\nlist2(\s*)(\s*)\.(\s*)append(\s*)\((\s*)15(\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Присутній код list2.append(15)";
}

// check if list1 = [10, 20] and list2 = [10, 20, 15]
async function t5() {
    let tArea = $("tArea").value;
    tArea += "\r\nprint('!'.join(str(x) for x in list1)+'@')\r\nprint('!'.join(str(x) for x in list2)+'@')";
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("10!20@") &&
        newResult.includes("10!20!15@"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "змінна list1 = [10, 20] та list2 = [10, 20, 15]";
}
