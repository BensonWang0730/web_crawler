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

  let count = 0;
  let toLink = [];

  const shares_table = $(".shares_table .tbody").each((i, element1) => {
    let links = [];

    // 只要第二個 tbody
    if (i % 2 == 0) {
      links.push({
        info: $(element1).find("a").html(),
        link: $(element1).find("a").attr("href"),
      });

      toLink.push(links[0].link);
      console.log(links);

      count++;
    }

    //測試是否為文字，是文字才印出來(失敗)
    /*const type = typeof content;
        if (type == 'string'){
            console.log(content); 
        }*/
  });

  //console.log(toLink);
  console.log("資料數量:", count);
  
  let n = 0;
  async function getInnerURL(){
    const innerURL = await axios.get("https://www.tfpa.org.tw/big5/member/"+toLink[n++]);    //抓到資料可是要自行加上前面的網址
    //console.log(innerURL);                                                                 //AXIOS request: "Error: connect ECONNREFUSED 127.0.0.1:80" 可能要加 'https://'
    const $2 = cheerio.load(innerURL.data);
    const email = $2(".td a").html();
    console.log(email);

  }

  while(n<=count){
    try{
      getInnerURL();
    }catch(err){
      console.log(err);
    }
    
  }
  

}

getPage();
