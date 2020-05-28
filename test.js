let result=[{a:1},{a:2},{a:3}].reduce((prev, cur)=>prev += cur.a, 0);

console.log(result);
