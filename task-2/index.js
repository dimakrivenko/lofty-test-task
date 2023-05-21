// Задание 2
// Переписать Promise на Async/Await

const getJson = (url) => fetch(url).then(res => res.json());

getJson('https://dummyjson.com/products/1')
    .then(json => {
        if (json.id) {
            console.log(json);
            return getJson('https://dummyjson.com/products/2')
        }
        throw new Error('No key')
    })
    .then(json => {
        console.log(json);
        return json.id
    })
    .catch(error => {
        console.error(error)
    });

console.log('----------------------');


// Решение

(async () => {
    async function getJson1(url) {
        try {
            const res = await fetch(url);
            return res.json();
        } catch (error) {
            console.log(error);
        }
    }

    try {
        const res1 = await getJson1('https://dummyjson.com/products/1')

        console.log(res1);

        if (res1.id) {
            const res2 = await getJson1('https://dummyjson.com/products/2')
            console.log(res2);
        }
        
    } catch (error) {
        throw new Error('No key')
    } 
})();




