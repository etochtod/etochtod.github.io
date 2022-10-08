// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'slots_14.html';
const nextLevel = 14;

// initial python strings
const initValueInTextArea =
`from dataclasses import dataclass

@dataclass
class Users:
    pass
    pass

a = Users("Alex", "alex@company.com")
print(f"Привіт, {a.name}, твоя пошта {a.email}")
`;

// list of triggers
triggers.triggersList = [t1, t2, t3];

// check if result displays "Привіт, Alex, твоя пошта alex@company.com"
function t1() {
    const required = "Привіт, Alex, твоя пошта alex@company.com";
    const result = $("result").innerText;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains 'class Users:\nname: str\nemail: str'
function t2() {
    const tArea = $("tArea").value;
    const pattern = /class\sUsers:\n(?=[\s\S]*name(\s*):(\s*)str)(?=[\s\S]*email(\s*):(\s*)str)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Задані name: str та email: str';
}

// check if tArea contains 'print(f"Привіт, {a.name}, твоя пошта {a.email}")'
function t3() {
    const tArea = $("tArea").value;
    const pattern = /print\(f\"Привіт,\s\{a\.name\},\sтвоя\sпошта\s\{a\.email\}\"\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'В коді є print(f"Привіт, {a.name}, твоя пошта {a.email}")';
}
