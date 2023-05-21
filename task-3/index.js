// Задание 3
// Реализовать функцию для кэширования результата выполнения асинхронной функции
// Первый аргумент - асинхронная функция
// Второй аргумент - время кэша в секундах

(async () => {
    const memoize = (asyncFunc, cacheTime) => {
        let cache = null;
        let lastUpdated = 0;
      
        return async function () {
            const currentTime = Date.now();

            if (cache && (currentTime - lastUpdated < cacheTime * 1000)) {
                return cache;
            }
      
            cache = await asyncFunc();

            lastUpdated = currentTime;
            return cache;
        };
    }

    var count = 0;
    var getData = function () { return Promise.resolve(++count); };
    var sleep = function (n) { return new Promise(function (resolve) { return setTimeout(resolve, n); }); };
    var getJsonMemoize = memoize(getData, 1);


    const q1 = await getJsonMemoize()
    const q2 = await getJsonMemoize()
    await sleep(3000)
    const q3 = await getJsonMemoize()

    console.log(q1);
    console.log(q2);
    console.log(q3);
})();
