stopped = 0,has=0,num=[];
function ifwin(n) {//第幾個對子
    //一次取一個順子或刻子
    if (n == 5)
        has = 1;
    if (stopped || has)
        return;
    for (let i = 0; i < 9; i++) {
        if (num[i] > 2) {
            num[i] -= 3;
            ifwin(n + 1);
            num[i] += 3;
        }
        if (i < 7 && num[i] && num[i + 1] && num[i + 2]) {
            num[i]--;
            num[i + 1]--;
            num[i + 2]--;
            ifwin(n + 1);
            num[i]++;
            num[i + 1]++;
            num[i + 2]++;
        }
        if (num[i])
            stopped = 1;
    }
    if (stopped || has)
        return;
    for (let i = 9; i < 18; i++) {
        if (num[i] > 2) {
            num[i] -= 3;
            ifwin(n + 1);
            num[i] += 3;
        }
        if (i < 16 && num[i] && num[i + 1] && num[i + 2]) {
            num[i]--;
            num[i + 1]--;
            num[i + 2]--;
            ifwin(n + 1);
            num[i]++;
            num[i + 1]++;
            num[i + 2]++;
        }
        if (num[i])
            stopped = 1;
    }
    if (stopped || has)
        return;
    for (let i = 18; i < 27; i++) {
        if (num[i] > 2) {
            num[i] -= 3;
            ifwin(n + 1);
            num[i] += 3;
        }
        if (i < 25 && num[i] && num[i + 1] && num[i + 2]) {
            num[i]--;
            num[i + 1]--;
            num[i + 2]--;
            ifwin(n + 1);
            num[i]++;
            num[i + 1]++;
            num[i + 2]++;
        }
        if (num[i])
            stopped = 1;
    }
    if (stopped || has)
        return;
    for (let i = 27; i < 34; i++) {
        if (num[i] >= 3) {
            num[i] -= 3;
            ifwin(n + 1);
            num[i] += 3;
        }
        if (num[i])
            stopped = 1;
    }
}
function solve(dat){
    //init
    num=dat;
    has=0,stopped=0;
    //generate listen list
    let listen=[];//聽牌
    for(let i=0;i<34;i++){//每種牌都放一次
        if(num[i]==4)
            continue;
        num[i]++;
        for (j = 0; j < 34; j++) {//拔掉眼睛
            if (num[j] > 1) {
                stop = 0;
                num[j] -= 2;
                ifwin(0);
                num[j] += 2;
            }
        }
        num[i]--;
        if (has) {//如果能湊成5個順子或刻子
            has = 0;
            listen.push(i);
        }
    }
    return listen;//把聽牌名單傳回去
}