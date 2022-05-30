/*const request = require('request');
const cheerio = require('cherrio');

var url ='https://www.tfpa.org.tw/big5/member/inquire.php?area=M';*/

const axios = require("axios");
const cheerio = require("cheerio");

async function getPage() {
  const res = await axios.get(
    "https://www.tfpa.org.tw/big5/member/inquire.php?area=M"
  );
  //console.log(res);  //測試是否成功讀取
  const $ = cheerio.load(res.data);
  /*const tbody = $('.shares_table').html();
    console.log(tbody);*/
  const shares_table = $(".shares_table .tbody").each((i, element1) => {
    
    let links = [];
    if (i % 2 == 0) {
        links.push({
            info: $(element1).find("a").html(),
            link: $(element1).find("a").attr("href"),
        })
      //const info = $(element1).find("a").html();
      console.log(links);
    }

    //測試是否為文字，是文字才印出來(失敗)
    /*const type = typeof content;
        if (type == 'string'){
            console.log(content);
        }*/
  });


}

getPage();
