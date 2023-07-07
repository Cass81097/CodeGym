import fs from "fs";
import qs from 'qs';
import userService from "../service/userService.js";

class UserController {
    
    signUp(req, res) {
        let data = '';
        req.on('data', (dataRaw) => {
            data += dataRaw;
        });
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/user/signUp.html', 'utf-8', (err, stringHTML) => {
                    res.write(stringHTML);
                    res.end();
                });
            } else {
                data = qs.parse(data);
                if(data.password === data.passConfirm){
                    userService.addUser(data)
                        .then(() => {
                            fs.readFile('view/user/signIn.html', 'utf-8', (err, stringHTML) => {
                                let str = '';
                                str += `<div class="container mt-5">
                                            <div class="alert alert-success" role="alert" style="text-align: center;">
                                            Đăng ký thành công!
                                            </div>
                                        </div>
                                        `
                                stringHTML = stringHTML.replace('<div style="display: none;">', '<div>');
                                stringHTML = stringHTML.replace('{list}', str)
                                res.write(stringHTML);
                                res.end();
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.writeHead(302, {
                                Location: '/sign-up'
                            });
                            res.write('Username already exists')
                            res.end();
                        });
                } else {
                    res.writeHead(302, {
                        Location: '/sign-up?1'
                    });
                    res.write('Password error')
                    res.end();
                }
            }
        });
    }

    signIn(req, res) {
        let data = '';
        req.on('data', (dataRaw) => {
            data += dataRaw;
        });
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/user/signIn.html', 'utf-8', (err, stringHTML) => {
                    res.write(stringHTML);
                    res.end();
                });
            } else {
                data = qs.parse(data);
                console.log(data);
                userService.checkUser(data)
                    .then((result) => {
                        if (result.length > 0) {
                            res.writeHead(302, {
                                Location: '/home'
                            });
                            res.end();
                        } else {
                            res.writeHead(302, {
                                Location: '/sign-in'
                            });
                            res.write('Tài khoản đã tồn tại')
                            res.end();
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        res.writeHead(500);
                        res.end();
                    });
            }
        });
    }
}

export default new UserController();
