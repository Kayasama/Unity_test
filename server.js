var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function(request, response){
   console.log("Somebody came! ");
   
   var pathname = url.parse(request.url).pathname;
   if(pathname == "/"){
       pathname = "index.html"
   }

   var fileURL = "./" + path.normalize("./html_test/" + pathname);

   var extname = path.extname(pathname);

   fs.readFile(fileURL, function(err, data){
       if(err){
           response.writeHead(404,{
               "Content-Type":"text/plain;charset=UTF8"
           })
           response.end("404~");
       }
       else{
           getMime(extname, function(mime){
               response.writeHead(200,{
                   "Content-Type":mime
               })
               response.end(data);
               console.log("extname" + extname);
           })
       }
   })
});

//Server IP Port
server.listen("3001");

function getMime(extname, callback){
    fs.readFile("./mime.json", function(err, data){
        if(err){
            throw Error("mime.json not found"+ extname);
        }
        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname] || "text/html";
        callback(mime);
    })
}