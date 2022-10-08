// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'base_class_12.html';
const nextLevel = 12;

// initial python strings
const initValueInTextArea =
`class Users:
    def __init__():
        pass
        pass

a = Users()
print(f"Привіт {a.name}, твоя пошта {a.email}")
print("Власні атрибути істанса a:")
print(a.__dict__)
print("Атрибути інстанса a, включно з наслідуваними:")
print(a.__dir__())
`;

// list of triggers
triggers.triggersList = [t1, t2];

// check if result displays "Привіт Alex, твоя пошта alex@company.com"
function t1() {
    const required = "Привіт Alex, твоя пошта alex@company.com";
    const result = $("result").innerText;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains 'def __init__(self, name, mail):\n'
function t2() {
    const tArea = $("tArea").value;
    const pattern = /def\s__init__\(self,\sname,\smail\):\n(\s*)self(\s*)\.(\s*)name(\s*)=(\s*)name\n(\s*)self(\s*)\.(\s*)email(\s*)=(\s*)mail\n/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Атрибути self.name та self.email задані в __init__';
}
