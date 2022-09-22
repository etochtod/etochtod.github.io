// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'finish.html';
const nextLevel = 4;

// initial python strings
const initValueInTextArea =
`s1 = "Hello world!"
s2 = s1
s2 = s2.upper().title().lower()
print(f"Значення змінної s1 дорівнює: {s1}")
print(f"Значення змінної s2 дорівнює: {s2}")

list1 = [10, 20]
list2 = list1
list2.append(15)
print(f"Перший список дорівнює {list1}")
print(f"Другий список дорівнює {list2}")
`;
//s1 = "Hello world!".upper().lower().title()
//s1 = s1.upper().lower().title()
//list2 = list1.copy()


// list of triggers
triggers.triggersList = [t1, t2, t3, t4, t5, t6, t7];


// check if s1 displays "Hello World!"
function t1() {
    const required = "Значення змінної s1 дорівнює: Hello World!";
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

// check if tArea contains
//   s1 = "Hello world!".upper().lower().title()
// or
//   s1 = s1.upper().lower().title()
function t4() {
    const tArea = $("tArea").value;
    const pattern = /s1(\s*)=(\s*)(s1|\"Hello world!\")(\s*).(\s*)(upper|lower)(\s*)\((\s*)\)(\s*).(\s*)(upper|lower)(\s*)\((\s*)\)(\s*).(\s*)title(\s*)\((\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код привласнює змінній s1 значення, яке містить upper(), lower() та title()";
}

// check if tArea contains list2 = list1.copy()
function t5() {
    const tArea = $("tArea").value;
    const pattern = /list2(\s*)=(\s*)list1(\s*).(\s*)copy(\s*)\((\s*)\)(\s*)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "В коді змінній list2 привласнюється копія list1";
}

// check if s2 is absent
async function t6() {
    let tArea = $("tArea").value;
    tArea = 'if "s2" in globals():\r\n  del s2\r\n' + tArea + '\r\nif not "s2" in globals():\r\n  print("s2 not in globals")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("s2 not in globals"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "змінна s2 відсутня в глобальному просторі змінних";
}

// check if list1 = [10, 20] and list2 = [10, 20, 15]
async function t7() {
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
