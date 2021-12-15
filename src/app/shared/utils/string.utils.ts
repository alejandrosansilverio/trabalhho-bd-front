export default class StringUtils {
    static removeBarrasDuplas(val: string) { 
        let valAux:string = val.replace(/\/\//g, '/');
    
        if(valAux.indexOf('http:/') >= 0) valAux = valAux.replace('http:/', 'http://');
        else if(valAux.indexOf('https:/') >= 0) valAux = valAux.replace('https:/', 'https://');
    
        return valAux;
    }

    static limpaCPF(val: string) { return val.replace(/[-.]/g, ''); }

    static limpaCelularETelefone(val: string) { return val.replace(/[\(\)-]/g, '').replace(/[ ]+/g, ''); }

    static formataTelefone(val: string) { return val ? '(' + val.substr(0, 2) + ') ' + val.substr(2, 4) + '-' + val.substr(6, 8) : ''; }
    static formataCelular(val: string) { return val ? '(' + val.substr(0, 2) + ') ' + val.substr(2, 5) + '-' + val.substr(7, 9) : ''; }
    static formataCPF(val: string) { return val ? val.substr(0, 3) + '.' + val.substr(3, 3) + '.' + val.substr(6, 3) + '-' + val.substr(9, 2) : ''; }

    static validaCPF(val: string){
        val = StringUtils.limpaCPF(val);

        if (val == "00000000000" || val == "11111111111" || val == "22222222222" || 
            val == "33333333333" || val == "44444444444" || val == "55555555555" || 
            val == "66666666666" || val == "77777777777" || val == "88888888888" || val == "99999999999") return false;

        let digito_1, digito_2, soma = 0;
            
        for (let i = 0; i < 9; i++) soma = soma + (10 - i) * Number(val.charAt(i));

        let resto = soma % 11;
        soma = 0;

        if (resto < 2) digito_1 = 0;
        else digito_1 = 11 - resto;

        for (let i = 0; i < 9; i++) soma = soma + (11 - i) * Number(val.charAt(i));

        soma = soma + 2 * digito_1;
        resto = soma % 11;

        if (resto < 2) digito_2 = 0;
        else digito_2 = 11 - resto;

        if (digito_1 === Number(val.charAt(9)) && digito_2 === Number(val.charAt(10))) return true;
        else return false;
    }

    static dataDMYToYMD(val: string){ return new Date(val).toISOString().slice(0,10); }

    static dataToYMDHMS(val: Date){
        let horas = (val.getHours() < 10 ? '0' + val.getHours().toString() : val.getHours().toString());
        let minutos = (val.getMinutes() < 10 ? '0' + val.getMinutes().toString() : val.getMinutes().toString());
        let segundos = (val.getSeconds() < 10 ? '0' + val.getSeconds().toString() : val.getSeconds().toString());

        return val.toISOString().slice(0,10) + ' ' + horas + '-' + minutos + '-' + segundos;
    }
    
    static reload: boolean = true; 

    static reloadPage(): boolean {
        if(StringUtils.reload){
            StringUtils.reload = false;
            return true;
        }

        return false;
    }
}   