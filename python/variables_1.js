// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'objects_2.html';
const nextLevel = 2;

// initial python strings
const initValueInTextArea =
`name = "Alex"
email = "alex@company.com"
`;
//print(f"Привіт, {name}. Твоя пошта {email}")
//is_married = True


// list of triggers
triggers.triggersList = [t1, t2, t3];

// check if result contains string "Привіт..."
function t1() {
    const required = "Привіт, Alex. Твоя пошта alex@company.com";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains "print(f'...')""
function t2() {
    const tArea = $("tArea").value;
    const pattern = /print(\s*)\((\s*)f(\'|\")Привіт,(\s*){(\s*)name(\s*)}.(\s*)Твоя(\s*)пошта(\s*){(\s*)email(\s*)}(\'|\")/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить print(f"...{}...")';
}

// check if execution has is_married = True
async function t3() {
    let tArea = $("tArea").value;
    tArea += '\r\nif is_married:\r\n  print("person is married")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("person is married"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "is_married завдана True";
}
