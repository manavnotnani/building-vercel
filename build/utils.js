"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom = void 0;
const MAXLENGTH = 5;
function generateRandom() {
    let ans = "";
    const subset = "123456dsaasdfasdfargfdhtjykfkjasdkfasdf";
    for (let i = 0; i < MAXLENGTH; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
exports.generateRandom = generateRandom;
