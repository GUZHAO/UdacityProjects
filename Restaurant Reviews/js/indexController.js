// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function () {
            console.log('Registration worked!');
        })
        .catch(function () {
            console.log('Registration failed!');
        });
}