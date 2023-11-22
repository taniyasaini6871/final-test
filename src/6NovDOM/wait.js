function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

wait();

async function someTask() {
    await wait(3000);
}