import fs from "fs";
import blogService from "../service/blogService.js";
import informationService from "../service/informationService.js";
import qs from "qs";
import url from "url";
import userController from "../controller/userController.js";
import userService from "../service/userService.js";

class InformationController {

    async showProfile(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', async () => {
            if (req.method === 'GET') {
                try {
                    let userID = await userController.getUserID(req);
                    // console.log(userID);
                    if (userID) {
                        let stringHTML = await fs.promises.readFile('view/blog/profile.html', 'utf-8');
                        let str1 = '';
                        let str2 = '';
                        let str3 = '';
                        let str4 = '';
                        let str5 = '';
                        let str6 = '';
                        let str7 = '';
                        let str8 = '';
                        let str9 = '';

                        let blogs = await blogService.findAccountAndsortBlog(userID)

                        for (const blog of blogs) {
                            // console.log(blog);

                            if (blog.image !== '') {
                            str6 += `
                            <div class="index-content">
                                <div class="post-container">
                                <div class="user-profile">
                                    <img src="${blog.avatar}">
                                    <div>
                                        <p>${blog.name}</p>
                                        <div class="time-status">
                                            <span>8 tháng 7 lúc 20:20</span>
                                            <i class="fas fa-globe-americas" style="color: #65676B; transform: translateY(8%)"></i>
                                        </div>
                                    </div>

                                    <div class="featured-button">
                                    <button class="btn-remove btn-delete-remove" onclick="handleDelete(${blog.postId})">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>

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
                            `
                            }  else {
                                str6 += `
                            <div class="index-content">
                                <div class="post-container">
                                <div class="user-profile">
                                    <img src="${blog.avatar}">
                                    <div>
                                        <p>${blog.name}</p>
                                        <div class="time-status">
                                            <span>8 tháng 7 lúc 20:20</span>
                                            <i class="fas fa-globe-americas" style="color: #65676B; transform: translateY(8%)"></i>
                                        </div>
                                    </div>

                                    <div class="featured-button">
                                    <button class="btn-remove btn-delete-remove" onclick="handleDelete(${blog.postId})">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>

                                    </div>
                                </div>
                                <div class="post-user">
                                <p class="post-text">${blog.content}</p>
                                   
                                </div>
                                </div>
                            </div>
                            `
                            }

                            if (blog.image !== '') {
                                str8 += `
                                    <div class="picture-profile">
                                        <div class="picture-profile-1" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url(${blog.image});">
                                        </div>
                                    </div>
                                `;
                            }
                        }

                        let blogsById = await blogService.findAllByIdAccount(userID);

                        for (const blog of blogsById) {
                            // console.log(blog);
                            str1 = `
                            <div class="ava">
                                <a href="#" onclick="confirmDeleteCookie()"><i class="bx avatar online" data-toggle="tooltip" data-placement="bottom" title="Tài khoản"
                                style="background-image: url('${blog.avatar}');"></i></a>
                            </div>
                        `

                            str2 = `
                            <li class="links link-avatar">
                            <a href="">
                            <div class="left-ava"><i class="select bx left-avatar"
                                    style="background-image: url('${blog.avatar}');"></i></div>
                            </a>
                        </li>
                        `

                            str3 = `
                            <div class="profile-container">
                            <img src="${blog.cover_photo}" class="cover-img">
                            <div class="profile-details">
                            <div class="pd-left">
                                <div class="pd-row">
                                    <img class="pd-image" src="${blog.avatar}">
                                    <div>
                                        <h3>${blog.name}</h3>
                                        <p>{total-friend} bạn bè</p>
                                        {list-friend}
                                    </div>
                                </div>
                            </div>
                            <div class="pd-right">
                            <div class="add-button">
                                <button type="button" class="btn btn-primary btn-add" onclick="window.scroll({ top: 600 });">
                                    <i class="fas fa-plus fa-xa"><span>Thêm vào tin</span></i>
                                </button>
                            </div>
                            <div class="edit-button">
                                    <a href="profile/edit?idEdit=${blog.accountId}">
                                        <button type="button" class="btn btn-secondary btn-edit">
                                            <i class="fas fa-pen fa-xz"><span>Chỉnh sửa trang cá nhân</span></i>
                                        </button>
                                    </a>
                            </div>
                            </div>
                        </div>
                        `

                            str4 = `
                                    <div class="info-col">
                                        <div class="about-info">
                                        <h5>Giới thiệu</h5>
                                        </div>

                                        <div class="profile-about">
                                        <div class="class-profile">
                                            <i class="fas fa-graduation-cap icon-profile"></i>
                                            <span>Từng học tại ${blog.college}</span>
                                        </div>

                                        <div class="address-profile">
                                            <i class="fas fa-map-marker-alt icon-profile"></i>
                                            <span>Đến từ ${blog.address}</span>
                                        </div>

                                        <div class="list-image-content">
                                            {list-image-content}
                                        </div>
                                    </div>
                        `
                            str5 = `
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
                                <form action="/profile" method="post">
                                    <div class="mb-id" hidden>
                                        <label for="formFile" class="form-label"><span>accId :</span></label>
                                        <input class="form-control" value="${blog.accountId}" type="text" name="accId" id="client-name" required>
                                    </div>
                                    <textarea name="content" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea> 
                                    <input name="image" value="" id="image" class="form-control" type="text" hidden>
                                    <div class="image-url">
                                        <img id="image-url">
                                    </div>
                                    <div class="add-post-links">
                                        <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
                                        <a href="#" data-bs-toggle="modal" data-bs-target="#modal-add-new-img-content"><img src="img/photo.png"> Ảnh/video</a>
                                        <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
                                    </div>
              
                                    <div class="confirm-content" style="display:none">
                                        <button class="btn btn-primary">Đăng</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        `
                        }

                        let blogOnline = await blogService.findAllExcept(userID);

                        for (const blog of blogOnline) {
                            str7 += `
                                <img src="${blog.avatar}">
                            `
                        }

                        let accountUser = await userService.countUser();

                        for (const user of accountUser) {
                            str9 = `
                                ${user.accountCount-1}
                            `
                        }

                        stringHTML = stringHTML.replace('{index-content}', str6);
                        stringHTML = stringHTML.replace('{avatar}', str1);
                        stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
                        stringHTML = stringHTML.replace('{profile-container}', str3);
                        stringHTML = stringHTML.replace('{info-col}', str4);
                        stringHTML = stringHTML.replace('{post-col}', str5);
                        stringHTML = stringHTML.replace('{list-friend}', str7);
                        stringHTML = stringHTML.replace('{list-image-content}', str8);
                        stringHTML = stringHTML.replace('{total-friend}', str9);


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
                        Location: '/profile',
                    });
                    res.end();
                })
            }
        })
    }

    async showAbout(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', async () => {
            if (req.method === 'GET') {
                try {
                    let userID = await userController.getUserID(req);
                    // console.log(userID);
                    if (userID) {
                        let stringHTML = await fs.promises.readFile('view/blog/about.html', 'utf-8');
                        let str1 = '';
                        let str2 = '';
                        let str3 = '';
                        let str4 = '';
                        let str5 = '';
                        let str6 = '';
            
                    let blogs = await blogService.findAllByIdAccount(userID)
                    for (const blog of blogs) {
                        str1 = `
                        <div class="ava">
                            <a href="#" onclick="confirmDeleteCookie()">
                            <i class="bx avatar online" data-toggle="tooltip" data-placement="bottom" title="Tài khoản"
                            style="background-image: url('${blog.avatar}');"></i>
                            </a>
                         </div>
                    `

                        str2 = `
                        <li class="links link-avatar">
                        <a href="">
                           <div class="left-ava" ><i class="select bx left-avatar"; style="background-image: url('${blog.avatar}')"></i></div>
                        </a>
                     </li>
                    `

                        str3 = `
                        <div class="profile-container">
                        <img src="${blog.cover_photo}" class="cover-img">
                        <div class="profile-details">
                           <div class="pd-left">
                              <div class="pd-row">
                                 <img class="pd-image" src="${blog.avatar}">
                                 <div>
                                    <h3>${blog.name}</h3>
                                    <p>{total-friend} bạn bè</p>
                                    {list-friend}
                                 </div>
                              </div>
                           </div>
                        <div class="pd-right">
                           <div class="add-button">
                              <button type="button" class="btn btn-primary btn-add">
                                 <i class="fas fa-plus fa-xa"><span>Thêm vào tin</span></i>
                              </button>
                           </div>
                           <div class="edit-button">
                                <a href="profile/edit?idEdit=${blog.accountId}">
                                    <button type="button" class="btn btn-secondary btn-edit">
                                        <i class="fas fa-pen fa-xz"><span>Chỉnh sửa trang cá nhân</span></i>
                                    </button>
                                </a>
                           </div>
                        </div>
                     </div>
                    `

                        str4 = `
                        
                        <div class="about">
                            <div class="left-about">
                                <div class="title-about">
                                <h5>Giới thiệu</h5>
                                </div>

                                <div class="content-about">
                                <a href="#">Tổng quan</a>
                                </div>
                            </div>

                            <div class="about-table">
                                <table>
                                    <tr>
                                        <td>
                                        <i class="fas fa-user-circle icon-about"></i>
                                        </td>
                                        <td>${blog.name}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <i class="fas fa-phone-alt m-r-5 icon-about"></i>
                                        </td>
                                        <td>${blog.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <i class="fas fa-address-card icon-about"></i>
                                        </td>
                                        <td>${blog.address}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <i class="fas fa-envelope icon-about"></i>
                                        </td>
                                        <td>${blog.email}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <i class="fas fa-graduation-cap icon-about"></i>
                                        </td>
                                        <td>${blog.college}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    `
                    }   

                    let blogOnline = await blogService.findAllExcept(userID);

                        for (const blog of blogOnline) {
                            str5 += `
                                <img src="${blog.avatar}">
                            `
                        }

                    let accountUser = await userService.countUser();

                        for (const user of accountUser) {
                            str6 = `
                                ${user.accountCount-1}
                            `
                        }
                        
                    stringHTML = stringHTML.replace('{avatar}', str1)
                    stringHTML = stringHTML.replace('{sidebar-avatar}', str2)
                    stringHTML = stringHTML.replace('{profile-container}', str3)
                    stringHTML = stringHTML.replace('{profile-info}', str4)
                    stringHTML = stringHTML.replace('{list-friend}', str5)
                    stringHTML = stringHTML.replace('{total-friend}', str6)

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
            }
        })
    }

    delete(req, res) {
        const urlObject = url.parse(req.url, true);
        const profileId = urlObject.query.id;
        informationService.deletePost(profileId).then(() => {
            res.write("Deleted");
            res.end();
        });
    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/blog/edit.html', 'utf-8', (err, stringHTML) => {
                    let urlObject = url.parse(req.url, true)
                    informationService.findById(urlObject.query.idEdit).then((profile) => {
                        // console.log(profile);
                        stringHTML = stringHTML.replace('{accountId}', profile.accountId);
                        stringHTML = stringHTML.replace('{name}', profile.name);
                        stringHTML = stringHTML.replace('{phone}', profile.phone);
                        stringHTML = stringHTML.replace('{college}', profile.college);
                        stringHTML = stringHTML.replace('{address}', profile.address);
                        stringHTML = stringHTML.replace('{email}', profile.email);
                        stringHTML = stringHTML.replace('{avatar}', profile.avatar);
                        stringHTML = stringHTML.replace('{cover_photo}', profile.cover_photo);
                        res.write(stringHTML);
                        res.end();
                    });
                })

            } else {
                data = qs.parse(data);
                informationService.update(data).then(() => {
                    // console.log(data);
                    res.writeHead(302, {
                        Location: `/about`,
                    });
                    res.end();
                })
            }
        })
    }


}

export default new InformationController();

