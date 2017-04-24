var casper1 = require('casper').create();
var fs = require('fs');
var fname = new Date().getTime() + '.text';
var save = fs.pathJoin(fs.workingDirectory, 'nwaomachux', fname);
var casper2done = false;
var otb1 = '';
var row = '';
var table ='';
var x = require('casper').selectXPath;
casper1.userAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36');
casper1.options.waitTimeout = 200000;

casper1.start("https://internet-banking.dbs.com.sg/").then(function(){
  casper1.then(function() {
      this.echo(this.getTitle());
      this.capture('casper1_1.png');
  }).viewport(1200, 1000);

  casper1.then(function () {
      this.sendKeys('#UID','youwish');
      this.sendKeys('#PIN','youreallywish!!');
      console.log('Inputting ID');
  });

  casper1.wait(1000, function () {
      casper1.capture('casper1_2.png');
  });

  casper1.thenClick(x('/html/body/form[1]/div/div[7]/button[1]'), function () {
      console.log('Logging to account...');
  });

  casper1.wait(10000,function () {
      casper1.capture('casper1_3.png');
      this.page.switchToChildFrame('user_area');
      this.page.switchToChildFrame('iframe1');
      this.click(x('//*[@id="userBar"]/li[1]/div'));

  });

  casper1.wait(3000,function () {
      casper1.capture('casper1_4.png');
      this.page.switchToChildFrame('user_area');
      this.page.switchToChildFrame('iframe1');
      this.click(x('//*[@id="btnLabel"]'));
  });


  var casper2 = require('casper').create();
  casper2.options.waitTimeout = 200000;
  casper2.start("https://bankeasylah.wordpress.com/otp-magic/").then(function(){
    casper2.wait(100000, function() {
    casper2.capture("casper2_1.png");
    casper2.reload(function() {
      var otb2 = casper2.fetchText(x('//*[@id="masthead"]/h1'));
      casper1.echo(casper2.getCurrentUrl(), casper2.getTitle());
      casper2.capture("casper2_2.png");
      otb1 = otb2
      casper1.echo(otb2);
      casper1.echo(otb1);
      });
    });


  }).run(function(){
      this.echo("DONE 2");
      casper2done = true;
  });
}).waitFor(function check(){
  return casper2done;
}).then(function(){

  casper1.echo(casper1.getCurrentUrl(), casper1.getTitle()); 
  casper1.wait(3000,function () {
      casper1.capture('casper1_5.png');
      this.page.switchToChildFrame('user_area');
      this.page.switchToChildFrame('iframe1');
      var otb3 = otb1;
      casper1.echo(otb1);
      casper1.echo(otb3);
      this.sendKeys('#SMSLoginPin', otb3);
      casper1.wait(2000,function () {
          casper1.capture('casper1_6.png');
          casper1.click(x('//*[@id="submitButton"]'));
        });
      });

  casper1.wait(4000,function () {
    this.page.switchToChildFrame('user_area');
    this.page.switchToChildFrame('iframe1');
    casper1.capture('casper1_8.png');
    this.sendKeys('#date-from','01/11/2016');
    this.sendKeys('#date-to','26/01/2017');
     });

    casper1.wait(3000,function () {
      casper1.capture('casper1_9.png');
      this.click(x('//*[@id="search-more"]/div[1]/div[5]/button'));
      });

    casper1.wait(4000,function () {
      casper1.capture('casper1_10.png');  
      this.click(x('//*[@id="lastPage"]'));      
      });

    casper1.wait(4000,function () {
      casper1.capture('casper1_11.png');  
      var currentPageNum = casper1.fetchText(x('//*[@id="currentPageNum"]'));
      casper1.echo(currentPageNum); 
      });

    casper1.wait(3000, function () {


      casper1.then(function() {
          for (var j = 2; j < 200; j++) {
            for (var i = 1; i < 5; i++) {
                row = row + casper1.fetchText(x('//*[@id="results"]/tbody/tr['+ j +']/td[' + i + ']/span')) + '|';
                }
            row = row + casper1.fetchText(x('//*[@id="results"]/tbody/tr['+ j +']/td[5]/span')) + '\r\n';
            casper1.echo(row);
            table = table + row;
            row='';
            } 
          casper1.then(function() {fs.write(save, table, 'a');});
          });
    });
   

}).run(function(){
  this.echo("DONE");
  this.exit();
});

casper1.run();
