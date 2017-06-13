async function getMessage() {
    return new Promise((resolve) => setTimeout(() => resolve('Hello World!'), 1000));
}

async function main() {
    console.log(`${await getMessage()}`);
    console.log('Done.');
}

main();
