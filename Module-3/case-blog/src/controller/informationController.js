import fs from "fs";
import blogService from "../service/blogService.js";
import informationService from "../service/informationService.js";
import qs from "qs";
import url from "url";
import userController from "../controller/userController.js";
import userService from "../service/userService.js";

class InformationController {
    showAbout = async (req, res) => {
        let userID = await userController.getUserID(req)
        if (userID) {
            fs.readFile('view/blog/about.html', 'utf-8', (err, stringHTML) => {
                let str1 = '';
                let str2 = '';
                let str3 = '';
                let str4 = '';

                blogService.findAllByIdAccount(userID).then((blogs) => {
                    for (const blog of blogs) {
                        str1 = `
                        <div class="ava">
                            <a href=""><i class="bx avatar online" data-toggle="tooltip" data-placement="bottom" title="Tài khoản"
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
                                    <h3>Trương Hoàng Anh</h3>
                                    <p>1000 bạn bè - 20 bạn chung</p>
                                    <img src="img/my-img/hiep.jpg">
                                    <img src="img/my-img/nhuanh.jpg">
                                    <img src="img/my-img/quynh.jpg" width="200px">
                                    <img src="img/my-img/trananh.jpg">
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
                                <a href="profile/edit?idEdit=${blog.accId}">
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

                            <div class="right-about">

                                <div class="highlight">
                                <div class="field">
                                    <i class="fas fa-user-circle icon-about"></i>
                                    <span>${blog.name}</span>
                                </div>

                                <div class="featured-button">
                                    <a href="">
                                        <button id="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                    </a>
                                    <button class="btn-remove btn-delete-remove">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>
                                </div>
                                </div>

                                <div class="highlight">
                                <div class="field">
                                    <i class="fa fa-mobile fa-lg m-r-5 icon-about"></i>
                                    <span>${blog.phone}</span>
                                </div>

                                <div class="featured-button">
                                    <a href="">
                                        <button id="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                    </a>
                                    <button class="btn-remove btn-delete-remove">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>
                                </div>
                                </div>

                                <div class="highlight">
                                <div class="field">
                                    <i class="fas fa-address-card icon-about"></i>
                                    <span>${blog.address}</span>
                                </div>
                                <div class="featured-button">
                                    <a href="">
                                        <button id="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                    </a>
                                    <button class="btn-remove btn-delete-remove">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>
                                </div>
                                </div>

                                <div class="highlight">
                                <div class="field">
                                    <i class="fas fa-envelope icon-about"></i>
                                    <span>${blog.email}</span>
                                </div>

                                <div class="featured-button">
                                    <a href="">
                                        <button id="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                    </a>
                                    <button class="btn-remove btn-delete-remove">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>
                                </div>
                                </div>

                                <div class="highlight">
                                <div class="field">
                                    <i class="fas fa-graduation-cap icon-about"></i>
                                    <span>${blog.college}</span>
                                </div>

                                <div class="featured-button">
                                    <a href="">
                                        <button id="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                    </a>
                                    <button class="btn-remove btn-delete-remove">
                                        <span class="mdi mdi-delete mdi-24px"></span>
                                        <span class="mdi mdi-delete-empty mdi-24px"></span>
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
               
                    `
                    }

                    stringHTML = stringHTML.replace('{avatar}', str1)
                    stringHTML = stringHTML.replace('{sidebar-avatar}', str2)
                    stringHTML = stringHTML.replace('{profile-container}', str3)
                    stringHTML = stringHTML.replace('{profile-info}', str4)
                    res.write(stringHTML);
                    res.end();
                })
            })
        }
    }

    async showProfile(req, res) {
        let data = '';
        req.on('data', (dataRaw) => {
            data += dataRaw;
        });
    
        req.on('end', async () => { 
            if (req.method === 'GET') {
                let userID = await userController.getUserID(req);
                if (userID) {
                    fs.readFile('view/blog/profile.html', 'utf-8', (err, stringHTML) => {
                        let str1 = '';
                        let str2 = '';
                        let str3 = '';
                        let str4 = '';
                        let str5 = '';
                        let str6 = '';
                        blogService.findAllByIdAccount(userID).then((blogs) => {
                            for (const blog of blogs) {
                                // Khối mã để gán giá trị cho các biến str
                                str1 = `
                                <div class="ava">
                                    <a href=""><i class="bx avatar online" data-toggle="tooltip" data-placement="bottom" title="Tài khoản"
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
                                            <h3>Trương Hoàng Anh</h3>
                                            <p>1000 bạn bè - 20 bạn chung</p>
                                            <img src="img/my-img/hiep.jpg">
                                            <img src="img/my-img/nhuanh.jpg">
                                            <img src="img/my-img/quynh.jpg" width="200px">
                                            <img src="img/my-img/trananh.jpg">
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
                                        <a href="profile/edit?idEdit=${blog.accId}">
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
    
                                            <div class="picture-profile">
                                                <div class="picture-profile-1"
                                                    style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url(${blog.avatar});">
                                                </div>
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
                                            <input class="form-control" value="${blog.accId}" type="text" name="accId" id="client-name" required>
                                        </div>
                                        <textarea name="content" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea> 
                                        <div class="mb-price">
                                    <label for="formFile" class="form-label inputcode"><span>Image :</span></label>
                                    <input class="form-control" type="text" name="image" required>
                                </div>
                                        <div class="add-post-links">
                                            <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
                                            <a href="#"><img src="img/photo.png"> Ảnh/video</a>
                                            <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
                                        </div>
                                        <button>OK</button>
                                    </form>
                                    </div>
                                </div>
                                    `
    
                                str6 += `<div class="index-content">
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
                                    <img src="${blog.image}" class="post-img">
                
                                    <div class="activity-icons">
                                    </div>
                                </div>
                                </div>
                            </div>
                            `
                            }
    
                            stringHTML = stringHTML.replace('{avatar}', str1);
                            stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
                            stringHTML = stringHTML.replace('{profile-container}', str3);
                            stringHTML = stringHTML.replace('{info-col}', str4);
                            stringHTML = stringHTML.replace('{post-col}', str5);
                            stringHTML = stringHTML.replace('{index-content}', str6);
                            res.write(stringHTML);
                            res.end();
                        });
                    });
                } 
            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                    console.log(data);
                    res.writeHead(302, {
                        Location: `/profile`
                    });
                    res.end();
                });
            }
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
                        stringHTML = stringHTML.replace('{infoId}', profile.infoId);
                        stringHTML = stringHTML.replace('{accId}', profile.accId);
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
                    console.log(data);
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

