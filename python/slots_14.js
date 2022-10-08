// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'finish.html';
const nextLevel = 15;

// initial python strings
const initValueInTextArea =
`from dataclasses import dataclass

@dataclass
class Users:
    pass
    name: str
    email: str
    pass

a = Users("Alex", "alex@company.com")
print(f"Привіт, {a.name}, твоя пошта {a.email}")
print(a.__dict__)
`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4, t5];

// check if result displays "['name', 'email', 'password']"
function t1() {
    const required = "['name', 'email', 'password']";
    const result = $("result").innerText;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains '__slots__ = ["name", "email", "password"]'
function t2() {
    const tArea = $("tArea").value;
    const pattern = /__slots__(\s*)=(\s*)\[(\'|\")name(\'|\"),(\s*)(\'|\")email(\'|\"),(\s*)(\'|\")password(\'|\")\]/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Заданий атрибут __slots__';
}

// check if tArea contains 'class Users:\npassword: str'
function t3() {
    const tArea = $("tArea").value;
    const pattern = /class\sUsers:\n[\s\S]*password(\s*):(\s*)str/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Заданий атрибут password: str';
}

// check if tArea contains 'print(a.__slots__)'
function t4() {
    const tArea = $("tArea").value;
    const pattern = /print(\s*)\((\s*)a(\s*)\.(\s*)__slots__(\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Присутня команда print(a.__slots__)';
}

// check if a.password = "0000"
async function t5() {
    let tArea = $("tArea").value + '\r\nif a.password=="0000":\r\n  print("password has 0000")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("password has 0000"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return 'a.password дорівнює "0000"';
}
