import fs from "fs";
import blogService from "../service/blogService.js";
import qs from "qs";
import url from "url";
import userController from "../controller/userController.js";

class BlogController {

    async showHome(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', async () => {
            if (req.method === 'GET') {
                try {
                    let userID = await userController.getUserID(req);

                    if (userID) {
                        let stringHTML = await fs.promises.readFile('view/blog/home.html', 'utf-8');
                        let str1 = '';
                        let str2 = '';
                        let str3 = '';
                        let str4 = '';
                        let str5 = '';
                        let str6 = '';
                        let str7 = '';

                        let blogs = await blogService.findAllAndSortBlog();

                        for (const blog of blogs) {
                            // console.log(allBlog);
                            str6 += `
                                <div class="index-content">
                                    <div class="post-container">
                                        <div class="user-profile">
                                            <img src="${blog.avatar}">
                                            <div>
                                                <p>${blog.name}</p>
                                                <div class="time-status">
                                                    <span>8 tháng 7 lúc 20:20</span>
                                                    <i class="fas fa-globe-americas" style="color: #65676B;"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-user">
                                        <p class="post-text">${blog.content}</p>
                                            <div class="post-detail">
                                                <img src="${blog.image}" class="post-img">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                        let blogOnline = await blogService.findAll();

                        for (const blog of blogOnline) {                     
                            str7 += `
                            <div class="online-list">
                                <a href="">
                                    <div class="ava-contact">
                                        <img src="${blog.avatar}" class="bx avatar-contact online-contact">
                                    </div>
                                    <div class="name-contact">
                                        <h5>${blog.name}</h5>
                                    </div>
                                </a>
                            </div>
                            `
                        }

                        let blogsById = await blogService.findAllByIdAccount(userID);

                        for (const blog of blogsById) {
                            // console.log(blog);
                            str1 = `
                            <div class="ava">
                                <a href="#" onclick="confirmDeleteCookie()"><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tài khoản"
                                style="background-image: url('${blog.avatar}')"></i></a>
                            </div>
                            `;

                            str2 = `
                                <li class="links link-avatar">
                                    <a href="profile">
                                        <div class="left-ava"><i class="bx left-avatar" style="background-image: url('${blog.avatar}');"></i></div>
                                        <span style="margin-left: 5px;" class="text nav-text">${blog.name}</span>
                                    </a>
                                </li>
                            `;

                            str3 = `
                                <div class="story" data-bs-toggle="modal" data-bs-target="#modal-add-new-content" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('${blog.avatar}');">
                                    <img src="../../img/upload.png" alt="">
                                    <h6>Tạo tin</h6>
                                </div> 
                            `;

                            str4 = `
                                <div class="home-content">
                                    <div class="write-post-container">
                                        <div class="user-profile">
                                            <img src="${blog.avatar}">
                                            <div>
                                                <p>${blog.name}</p>
                                                <small>Public
                                                    <i class="fas fa-caret-down"></i>
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="post-input-container">
                                    <form action="/home" method="post">
                                    <div class="mb-id" hidden>
                                        <label for="formFile" class="form-label"><span>accId :</span></label>
                                        <input class="form-control" value="${blog.accountId}" type="text" name="accId" id="client-name" required>
                                    </div>
                                    <textarea name="content" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea> 
                                    <input name="image" value="" id="image" class="form-control" type="text" hidden>
                                    <div class="image-url" hidden>
                                        <img src="" alt="" id="image-url">
                                    </div>
                                    <div class="add-post-links">
                                        <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#modal-add-new-img-content"><img src="img/photo.png"> Ảnh/video</a>
                                        <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
                                    </div>
              
                                    <div class="confirm-content">
                                        <button class="btn btn-primary">Đăng</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            `;

                            str5 = `
                                ${blog.accId}
                            `                
                        }

                        stringHTML = stringHTML.replace('{index-content}', str6);
                        stringHTML = stringHTML.replace('{online-list}', str7);
                        stringHTML = stringHTML.replace('{avatar}', str1);
                        stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
                        stringHTML = stringHTML.replace('{story-avatar}', str3);
                        stringHTML = stringHTML.replace('{write-avatar}', str4);
                        stringHTML = stringHTML.replace('{accId-value}', str5);

                        res.write(stringHTML);
                        res.end();
                    }

                    if (userID == null) {
                        res.writeHead(302, {
                            Location: '/err',
                        });
                        res.end();
                    }
                } catch (err) {
                    console.error(err);
                    // res.status(500).send('Internal Server Error');
                }
            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/home',
                    });
                    res.end();
                })
            }
        })
    }
}

export default new BlogController();


