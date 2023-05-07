function* handlegenerator()
{
    yield 2023;
    return "check";
}

function* handlegeneratorWhile()
{
    while (true) {
        yield "listen";
    }
}
function* handlegeneratorGen()
{
    yield "hello";
    yield* Gen();
    yield "check";
    return "fi"
}
function* Gen()
{
    yield "Gen";
}
// const result = handlegeneratorGen();
// console.log('====================================');
// console.log("result1:", result.next());
// console.log('====================================');
// console.log('====================================');
// console.log("result2:", result.next());
// console.log('====================================');
// console.log('====================================');
// console.log("result3:", result.next());
// console.log('====================================');
// console.log('====================================');
// console.log("result4:", result.next());
// console.log('====================================');