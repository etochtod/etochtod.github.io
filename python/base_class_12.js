// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'dataclasses_13.html';
const nextLevel = 13;

// initial python strings
const initValueInTextArea =
`class Users:
    def __init__(self, name, mail):
        self.name = name
        self.email = mail

a = Users("Alex", "alex@company.com")

class Moders:
    def __init__():
        self.password = password
        pass

moder = Moders("Conan", "conan@company.com")

print(f"Привіт, {moder.name}, твоя пошта {moder.email}, твій пароль {moder.password}")
`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4];

// check if result displays "Привіт, Conan, твоя пошта conan@company.com, твій пароль 0000"
function t1() {
    const required = "Привіт, Conan, твоя пошта conan@company.com, твій пароль 0000";
    const result = $("result").innerText;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains 'print(f"Привіт, {moder.name}, твоя пошта {moder.email}, твій пароль {moder.password}")'
function t2() {
    const tArea = $("tArea").value;
    triggers.triggerSuccess = tArea.includes('print(f"Привіт, {moder.name}, твоя пошта {moder.email}, твій пароль {moder.password}")');
    return 'Виконується команда print(f"...{moder.password}")';
}

// check if tArea contains 'def __init__(self, name, mail, password):\n'
function t3() {
    let tArea = $("tArea").value;
    const pattern = /def(\s*)__init__(\s*)\((\s*)self,(\s*)name,(\s*)mail,(\s*)password(\s*)\):[\s\S]*super(\s*)\((\s*)\)\.(\s*)__init__/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Атрибути класа Moders задані через super';
}

// check if tArea contains 'class Moders(Users):\n'
function t4() {
    let tArea = $("tArea").value;
    const pattern = /class(\s*)Moders(\s*)\((\s*)Users(\s*)\):/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить "class Moders(Users):"';
}
