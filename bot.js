// require('dotenv').config()
// const TelegrmaBotApi = require('node-telegram-bot-api')
// const token = '5386117368:AAEelTAzbWiTUYL8JzK9m9H_E2-8kylDR0Y'
// const api = new TelegrmaBotApi(token, {polling: true})
const axios = require('axios')
const { html } = require('cheerio')
const cheerio = require('cheerio')
const url = 'https://stroka.kg/snyat-kvartiru'
const fs =require('fs')
const path = require('path')

let items = [];
const promise1 = new Promise((resolve, reject) => {
    axios.get(url).then(resp => {
            const $ = cheerio.load(resp.data)  
            
                $('.topics-item-tr-title').each(function (i, attr) {
                    let text = $(attr).children().last().text();
                    let text2 = $(attr).children().first().text();
                    let obj = {
                        name: text, // price onlhy
                        price: text2// title
                    }
                    items.push(obj)
                })
                // $('.topics-item-view').each(function (i, attr) {
                //     let text = $(attr).text();
                    
                //     let obj2 = {
                //         name: text, // price onlhy
                //         title: text2// title
                //     }
                //     items2.push(obj)
                // })
        resolve(items);

    });
});

promise1.then((some) => {
    console.log(some);
    	
    fs.writeFileSync("./hello.txt", JSON.stringify(some))
    // console.log(items2)
    // expected output: "foo"
});


