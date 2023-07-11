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

                        let blogs = await blogService.findAll();
                        console.log(blogs);
                        if (blogs.length === 0) {
                            console.log(blogs);
                            console.log(blogs.length);
                            // Chuyển hướng sang trang báo lỗi
                            return res.redirect('/error');
                        }

                        for (const allBlog of blogs) {
                            // console.log(allBlog);
                            str5 += `
                                <div class="index-content">
                                    <div class="post-container">
                                        <div class="user-profile">
                                            <img src="${allBlog.avatar}">
                                            <div>
                                                <p>${allBlog.name}</p>
                                                <div class="time-status">
                                                    <span>8 tháng 7 lúc 20:20</span>
                                                    <i class="fas fa-globe-americas" style="color: #65676B;"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-user">
                                            <p class="post-text">${allBlog.content}</p>
                                            <img src="${allBlog.image}" class="post-img">

                                            <div class="activity-icons"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                        let blogsById = await blogService.findAllByIdAccount(userID);

                        for (const blog of blogsById) {
                            str1 = `
                                <div class="ava">
                                    <a href="sign-in" onclick="deleteCookie()"><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                        title="Tài khoản" style="background-image: url('${blog.avatar}')"></i></a>
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

                                    <div class="post-input-container" id="create-post-form">
                                        <textarea name="textarea" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea> 
                                        <div class="add-post-links">
                                            <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
                                            <a href="#"><img src="img/photo.png"> Ảnh/video</a>
                                            <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
                                        </div>
                                    </div>
                                </div>
                            `;

                            str6 = `
                                ${blog.accId}
                            `
                        }

                        stringHTML = stringHTML.replace('{index-content}', str5);
                        stringHTML = stringHTML.replace('{avatar}', str1);
                        stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
                        stringHTML = stringHTML.replace('{story-avatar}', str3);
                        stringHTML = stringHTML.replace('{write-avatar}', str4);
                        stringHTML = stringHTML.replace('{accId-value}', str6);

                        res.write(stringHTML);
                        res.end();
                    } 
                } catch (err) {
                    console.error(err);
                    // res.status(500).send('Internal Server Error');
                }
            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                    console.log(data);
                    res.writeHead(302, {
                        Location: '/home',
                    });
                    res.end();
                })

            }
        })
    }
}


// add(req, res) {
//     let data = '';
//     req.on('data', dataRaw => {
//         data += dataRaw;
//     })
//     req.on('end', () => {
//         if (req.method === 'GET') {
//             try {
//                 let userID = await userController.getUserID(req);
//                 if (userID) {
//                     let stringHTML = await fs.promises.readFile('view/blog/home.html', 'utf-8');
//                     let str1 = '';
//                     let str2 = '';
//                     let str3 = '';
//                     let str4 = '';
//                     let str5 = '';

//                     let blogs = await blogService.findAll();

//                     for (const blog of blogs) {
//                         str5 += `
//                     <div class="index-content">
//                         <div class="post-container">
//                             <div class="user-profile">
//                                 <img src="${blog.avatar}">
//                                 <div>
//                                     <p>${blog.name}</p>
//                                     <div class="time-status">
//                                         <span>8 tháng 7 lúc 20:20</span>
//                                         <i class="fas fa-globe-americas" style="color: #65676B;"></i>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="post-user">
//                                 <p class="post-text">${blog.content}</p>
//                                 <img src="${blog.image}" class="post-img">

//                                 <div class="activity-icons"></div>
//                             </div>
//                         </div>
//                     </div>
//                             `;
//                     }

//                     let blogsById = await blogService.findAllByIdAccount(userID);

//                     for (const blog of blogsById) {
//                         str1 = `
//                             <div class="ava">
//                                 <a href="sign-in" onclick="deleteCookie()"><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom"
//                                     title="Tài khoản" style="background-image: url('${blog.avatar}')"></i></a>
//                             </div>
//                         `;

//                         str2 = `
//                             <li class="links link-avatar">
//                                 <a href="profile">
//                                     <div class="left-ava"><i class="bx left-avatar" style="background-image: url('${blog.avatar}');"></i></div>
//                                     <span style="margin-left: 5px;" class="text nav-text">${blog.name}</span>
//                                 </a>
//                             </li>
//                         `;

//                         str3 = `
//                             <div class="story" onclick="sendFetchAdd(${blog.accId})" data-bs-toggle="modal" data-bs-target="#modal-add-new-content" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('${blog.avatar}');">
//                                 <img src="../../img/upload.png" alt="">
//                                 <h6>Tạo tin</h6>
//                             </div> 
//                         `;

//                         str4 = `
//                         <div class="home-content">
//                         <div class="write-post-container">
//                             <div class="user-profile">
//                                 <img src="${blog.avatar}">
//                                 <div>
//                                     <p>${blog.name}</p>
//                                     <small>Public
//                                         <i class="fas fa-caret-down"></i>
//                                     </small>
//                                 </div>
//                             </div>
//                         </div>

//                         <div class="post-input-container" id="create-post-form">
//                             <textarea name="textarea" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea> 
//                             <div class="add-post-links">
//                                 <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
//                                 <a href="#"><img src="img/photo.png"> Ảnh/video</a>
//                                 <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
//                             </div>
//                         </div>
//                     </div>
//                         `;
//                     }

//                     stringHTML = stringHTML.replace('{index-content}', str5);
//                     stringHTML = stringHTML.replace('{avatar}', str1);
//                     stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
//                     stringHTML = stringHTML.replace('{story-avatar}', str3);
//                     stringHTML = stringHTML.replace('{write-avatar}', str4);

//                     res.write(stringHTML);
//                     res.end();
//         } else {
//             data = qs.parse(data);
//             const urlObject = url.parse(req.url, true);
//             const blogId = urlObject.query.id;
//             blogService.save(blogId).then(() => {
//                 console.log(blogId);
//                 res.write("Ok");
//                 res.end();
//             });
//         }
//     })
// }

export default new BlogController();


