import fs from "fs";
import blogService from "../service/blogService.js";
import categoryService from "../service/categoryService.js";
import qs from "qs";
import url from "url";
import userController from "../controller/userController.js";
import userService from "../service/userService.js";

class BlogController {
    showHome = async (req, res) => {
        try {
            let userID = await userController.getUserID(req);
            if (userID) {
                let stringHTML = await fs.promises.readFile('view/blog/home.html', 'utf-8');
    
                let str1 = '';
                let str2 = '';
                let str3 = '';
                let str4 = '';
                let str5 = '';
    
                let blogs = await blogService.findAll();
    
                for (const blog of blogs) {
                    str5 += `
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
                                    <img src="${blog.image}" class="post-img">
                                    <div class="activity-icons">                         
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
    
                let blogsById = await blogService.findAllByIdAccount(userID);
    
                for (const blog of blogsById) {
                    str1 = `
                        <div class="ava">
                            <a href=""><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                title="Tài khoản" style="background-image: url('${blog.avatar}')"></i></a>
                        </div>
                    `;
    
                    str2 = `
                        <li class="links link-avatar">
                            <a href="">
                                <div class="left-ava"><i class="bx left-avatar" style="background-image: url('${blog.avatar}');"></i></div>
                                <span style="margin-left: 5px;" class="text nav-text">${blog.name}</span>
                            </a>
                        </li>
                    `;
    
                    str3 = `
                        <div class="story" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('${blog.avatar}');">
                            <img src="../../img/upload.png" alt="">
                            <h6>Tạo tin</h6>
                        </div> 
                    `;
    
                    str4 = `
                        <div class="user-profile">
                            <img src="${blog.avatar}">
                            <div>
                                <p>${blog.name}</p>
                                <small>Public
                                <i class="fas fa-caret-down"></i>
                                </small>
                            </div>
                        </div>
                    `;
                }
    
                stringHTML = stringHTML.replace('{index-content}', str5);
                stringHTML = stringHTML.replace('{avatar}', str1);
                stringHTML = stringHTML.replace('{sidebar-avatar}', str2);
                stringHTML = stringHTML.replace('{story-avatar}', str3);
                stringHTML = stringHTML.replace('{write-avatar}', str4);
    
                res.write(stringHTML);
                res.end();
            }
        } catch (err) {
            // Handle any errors here
            console.error(err);
            // res.status(500).send('Internal Server Error');
        }
    }
    

    // showHome = async (req, res) => {
    //     let userID = await userController.getUserID(req)
    //     if (userID) {
    //         // console.log('UserId', userID, 'signed in');
    //         fs.readFile('view/blog/home.html', 'utf-8', (err, stringHTML) => {
    //             let str1 = '';
    //             let str2 = '';
    //             let str3 = '';
    //             let str4 = '';
    //             let str5 = '';

    //             blogService.findAllByIdAccount(userID).then((blogs) => {
    //                 for (const blog of blogs) {
    //                     str1 = `
    //                     <div class="ava">
    //                     <a href=""><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom"
    //                         title="Tài khoản" style="background-image: url('${blog.avatar}')"></i></a>
    //                         </div>
    //                 `

    //                     str2 = `
    //                 <li class="links link-avatar">
    //                 <a href="">
    //                 <div class="left-ava"><i class="bx left-avatar" style="background-image: url('${blog.avatar}');"></i></div>
    //                 <span style="margin-left: 5px;" class="text nav-text">${blog.name}</span>
    //                 </a>
    //                 </li>
    //                 `

    //                     str3 = `
    //                 <div class="story" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('${blog.avatar}');">
    //                 <img src="../../img/upload.png" alt="">
    //                 <h6>Tạo tin</h6>
    //                 </div> 
    //                 `

    //                     str4 = `
    //                 <div class="user-profile">
    //                 <img src="${blog.avatar}">
    //                 <div>
    //                 <p>${blog.name}</p>
    //                 <small>Public
    //                 <i class="fas fa-caret-down"></i>
    //                 </small>
    //                 </div>
    //                 </div>
    //                 `

    //                     str5 += `
    //                     <div class="index-content">
    //                 <div class="post-container">
    //                 <div class="user-profile">
    //                 <img src="${blog.avatar}">
    //                 <div>
    //                 <p>${blog.name}</p>
    //                 <div class="time-status">
    //                 <span>8 tháng 7 lúc 20:20</span>
    //                 <i class="fas fa-globe-americas" style="color: #65676B;"></i>
    //                 </div>
    //                     </div>
    //                 </div>
    //                 <div class="post-user">
    //                 <p class="post-text">${blog.content}</p>
    //                 <img src="${blog.image}" class="post-img">
    //                 <div class="activity-icons">                         
    //                 </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //                 `
    //                 }
    //                 stringHTML = stringHTML.replace('{avatar}', str1)
    //                 stringHTML = stringHTML.replace('{sidebar-avatar}', str2)
    //                 stringHTML = stringHTML.replace('{story-avatar}', str3)
    //                 stringHTML = stringHTML.replace('{write-avatar}', str4)
    //                 stringHTML = stringHTML.replace('{index-content}', str5)
    //                 res.write(stringHTML);
    //                 res.end();
    //             })
    //         })
    //     }
    // }

    showProfile = async (req, res) => {
        let userID = await userController.getUserID(req)
        if (userID) {
            // console.log('UserId', userID, 'signed in');
            fs.readFile('view/blog/profile.html', 'utf-8', (err, stringHTML) => {
                let str1 = '';
                let str2 = '';
                let str3 = '';
                let str4 = '';
                // let str5 = '';
                blogService.findAllByIdAccount(userID).then((blogs) => {
                    console.log(blogs);
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
                              <button type="button" class="btn btn-secondary btn-edit">
                                 <i class="fas fa-pen fa-xz"><span>Chỉnh sửa trang cá nhân</span></i>
                              </button>
                           </div>
                        </div>
                     </div>
                    `

                        str4 = `
                        <div class="profile-info">
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
                        </div>
               
                        <div class="post-col">
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
                                 <textarea name="textarea" id="textarea" placeholder="Bạn đang nghĩ gì thế?" rows="3"></textarea>
                                 <div class="add-post-links">
                                    <a href="#"><img src="img/live-video.png"> Video trực tiếp</a>
                                    <a href="#"><img src="img/photo.png"> Ảnh/video</a>
                                    <a href="#"><img src="img/feeling.png"> Cảm xúc/hoạt động</a>
               
                                 </div>
                              </div>
                           </div>
               
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
                                    <img src="${blog.image}" class="post-img">
               
                                    <div class="activity-icons">
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
               
                    `

                        //     str5 = `
                        // <div class="post-container">
                        // <div class="user-profile">
                        // <img src="${blog.avatar}">
                        // <div>
                        // <p>${blog.name}</p>
                        // <div class="time-status">
                        // <span>8 tháng 7 lúc 20:20</span>
                        // <i class="fas fa-globe-americas" style="color: #65676B;"></i>
                        // </div>
                        //     </div>
                        // </div>
                        // <div class="post-user">
                        // <p class="post-text">${blog.content}</p>
                        // <img src="${blog.image}" class="post-img">
                        // <div class="activity-icons">                         
                        // </div>
                        // </div>
                        // </div>
                        // `
                    }

                    stringHTML = stringHTML.replace('{avatar}', str1)
                    stringHTML = stringHTML.replace('{sidebar-avatar}', str2)
                    stringHTML = stringHTML.replace('{profile-container}', str3)
                    stringHTML = stringHTML.replace('{profile-info}', str4)
                    // stringHTML = stringHTML.replace('{index-content}', str5)
                    res.write(stringHTML);
                    res.end();
                })
            })
        }
    }

    showAll(req, res) {
        fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            blogService.findAll().then((blogs) => {
                for (const item of blogs) {
                    str += `
                    <h3>${item.id}. ${item.title}, ${item.content}, ${item.name}</h3>
                    `
                }
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    add(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) => {
                    categoryService.findAll().then(categories => {
                        let str = '';
                        for (const item of categories) {
                            str += `
                            <option value="${item.id}">${item.name}</option>      
                            `
                        }
                        stringHTML = stringHTML.replace('{listCategory}', str)
                        res.write(stringHTML);
                        res.end();
                    })
                })
            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/blogs',
                    });
                    res.end();
                })
            }
        }
        )
    }
}

export default new BlogController();
