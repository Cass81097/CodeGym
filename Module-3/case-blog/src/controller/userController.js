import fs from "fs";
import qs from 'qs';
import cookie from 'cookie';
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
                if (data.password === data.passConfirm) {
                    userService.addUser(data)
                        .then(() => {
                            console.log(data);
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
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(`<script>alert("Tai khoan da co nguoi su dung")</script>`);
                    res.write('<meta http-equiv="refresh" content="0;URL=\'/sign-up\'" />');
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
                        // console.log(result);
                        if (result.length > 0) {
                            res.setHeader('Set-Cookie', cookie.serialize('userID', String(result[0].accountId), {
                                httpOnly: false,
                                maxAge: 60 * 60 * 24 * 7 // 1 week
                            }));

                            res.writeHead(302, {
                                Location: '/home'
                            });
                            res.end();
                        } else {           
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write('<script>alert("Sai tài khoản hoặc mật khẩu")</script>');
                            res.write('<meta http-equiv="refresh" content="0;URL=\'/sign-in\'" />');
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

    getUserID = async (req) => {
        if (req.headers.cookie) {
            let cookies = cookie.parse(req.headers.cookie);
            let userID = parseInt(cookies.userID);
            if (isNaN(userID)) {
                return null
            } else if (await userService.checkUserID(userID)) {
                return userID
            }
        }
        return null
    }
}

export default new UserController();    
