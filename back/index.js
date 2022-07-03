
const puppeteer = require('puppeteer')
const request = require('request');
const dotenv = require('dotenv');
var cron = require('node-cron');

dotenv.config();

const url_line_notification = "https://notify-api.line.me/api/notify";

const listData = {
    name : {
        value : "test"
    },
    temp : {
        value : ""
    },
    drip : {
        value : ""
    },
    water : {
        value : ""
    },
    wind : {
        value : ""
    },
    cloud : {
        value : ""
    },
    sight : {
        value : ""
    },
    pressure : {
        value : ""
    },
    rain3hr : {
        value : ""
    },
    rainTotal : {
        value : ""
    },
    sunUp : {
        value : ""
    },
    sunDown : {
        value : ""
    },
    highTemp : {
        value : ""
    },
    lowTemp : {
        value : ""
    }
}

async function scrape() {
   const browser = await puppeteer.launch({})
   const page = await browser.newPage()

   await page.goto('https://www.tmd.go.th/province.php?id=57')
   for(i = 1; i < 2; i++){
    var name = await page.waitForSelector("#wrap > div:nth-child(2) > span")
    var nameText = await page.evaluate(name => name.textContent, name)

    var temp = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td.strokeme")
    var tempText = await page.evaluate(temp => temp.textContent, temp)

    var dripPoint = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)")
    var dripText = await page.evaluate(dripPoint => dripPoint.textContent, dripPoint)

    var waterPercent = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)")
    var waterText = await page.evaluate(waterPercent => waterPercent.textContent, waterPercent)
    
    var windSpeed = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)")
    var windText = await page.evaluate(windSpeed => windSpeed.textContent, windSpeed)

    var cloud = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)")
    var cloudText = await page.evaluate(cloud => cloud.textContent, cloud)

    var sight = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2)")
    var sightText = await page.evaluate(sight => sight.textContent, sight)
    
    var pressure = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2)")
    var pressureText = await page.evaluate(pressure => pressure.textContent, pressure)


    var rain3hr = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2)")
    var rain3hrText = await page.evaluate(rain3hr => rain3hr.textContent, rain3hr)

    var sunUp = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(1) > td:nth-child(2)")
    var sunUpText = await page.evaluate(sunUp => sunUp.textContent, sunUp)

    var sunDown = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2)")
    var sunDownText = await page.evaluate(sunDown => sunDown.textContent, sunDown)
    
    var highTemp = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(2)")
    var highTempText = await page.evaluate(highTemp => highTemp.textContent, highTemp)

    var lowTemp = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(2)")
    var lowTempText = await page.evaluate(lowTemp => lowTemp.textContent, lowTemp)

    var rainTotal = await page.waitForSelector("#wrap > div:nth-child(2) > p > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(5) > td:nth-child(2)")
    var rainTotalText = await page.evaluate(rainTotal => rainTotal.textContent, rainTotal)


    console.log("จังหวัด = " + i + " " + nameText + " temp = " + tempText)
    console.log(" จุดน้ำค้าง = " + dripText + " ความชื้นสัมพัทธ์ = " + waterText)
    console.log(" ความเร็วลม = " + windText + " เมฆ = " + cloudText)
    console.log(" ทัศวิสัย = " + sightText + " ความกดอากาศ = " + pressureText)
    console.log(" น้ำฝนราย 3 ชั่วโมง = " + rain3hrText + " ฝนสะสมวันนี้ = " + rainTotalText)
    console.log(" พระอาทิตย์ขึ้นวันนี้ = " + sunUpText + " พระอาทิตย์ตกวันนี้ = " + sunDownText)
    console.log(" อุณหภูมิสูงสุดวันนี้ = " + highTempText + " อุณหภูมิต่ำสุดวันนี้ = " + lowTempText)

    listData.name.value = nameText
    listData.temp.value = tempText
    listData.drip.value = dripText
    listData.water.value = waterText
    listData.wind.value = windText
    listData.cloud.value = cloudText
    listData.sight.value = sightText
    listData.pressure.value = pressureText
    listData.rain3hr.value = rain3hrText
    listData.rainTotal.value = rainTotalText
    listData.sunUp.value = sunUpText
    listData.sunDown.value = sunDownText
    listData.highTemp.value= highTempText
    listData.lowTemp.value = lowTempText


    cron.schedule('0 7 * * *', () => {
        console.log('running a task every 1 minutes');

        request({
            method: 'POST',
            uri: url_line_notification,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            auth: {
                bearer: process.env.TOKEN,
            },
            form: {
                message: "ListData = " + listData.name.value + " " +  listData.temp.value
                + " " + listData.drip.value + " "  + listData.water.value + " " + listData.wind.value + " " + listData.cloud.value + " " + listData.sight.value + " " + listData.pressure.value + " " + listData.rain3hr.value + " " + listData.rainTotal.value + " " + listData.sunUp.value + " " + listData.sunDown.value + " " + listData.highTemp.value + " " + listData.lowTemp.value
            },
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });


      }, {
        scheduled: true,
        timezone: "Asia/Bangkok"
      });


    

    // console.log(listData)

   
   browser.close()
    }
}
scrape()


