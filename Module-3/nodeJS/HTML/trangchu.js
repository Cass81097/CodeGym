const http = require('http');
const qs = require('qs');
const fs = require ('fs');
const server = http.createServer((req, res) =>{
    let data  = '';
    req.on('data', (dataRaw) =>{
        data += dataRaw;
    });
    req.on('end', ()=>{
        data = qs.parse(data);
        if(data !== ''){           
            if(data.txt1 === 'user' && data.txt2 === '1'){
                fs.readFile('user.html', 'utf-8', (err, server) =>{
                    res.write(server);
                    res.end();
                })
            }
            if(data.txt1 === 'admin' && data.txt2 ==='2'){
                fs.readFile('admin.html', 'utf-8', (err, server) =>{
                    res.write(server);
                    res.end();
                })
            }
            else {                
                fs.readFile('form.html', 'utf-8', (err, server) =>{
                    res.write(server)
                    res.end();
                })
            }

        }
       
    })
    
})
server.listen('8080', () =>{
    console.log('da ket noi');
})