const MAXLENGTH = 5;

export function generateRandom(){
    let ans = "";
    const subset = "123456dsaasdfasdfargfdhtjykfkjasdkfasdf"
    for (let i = 0; i < MAXLENGTH; i ++){
        ans+= subset[Math.floor(Math.random() * subset.length)]
    }
    return ans;
}