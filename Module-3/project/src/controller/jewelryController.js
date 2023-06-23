import { JewelryServices } from "../service/jewelryServices.js";
import fs from 'fs'
import qs from 'qs'
import url from 'url'
let jewelryServices = new JewelryServices()

class JewelryController {

    showListJewelry(req, res) {
        let data = ''
        req.on('data', (dataRaw) => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                showList(req, res)
                
            } else {
                data  = qs.parse(data);               
                jewelryServices.save(data);
                showList(req, res);            
            }
        })
    }
    
    showFormAdd(req, res) {
        fs.readFile('view/jewelry/addJewelry.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })   
    }

    showFormEdit(req, res) {
        fs.readFile('view/jewelry/editJewelry.html', 'utf-8', (err, html) => {
            const urlObject = url.parse(req.url, true);
            const proEdit = jewelryServices.findJewelryById(urlObject.query.idEdit);
            console.log(proEdit);
            html = html.replace('{id}', proEdit.id);
            html = html.replace('{name}', proEdit.name);
            html = html.replace('{price}', proEdit.price);
            html = html.replace('{image}', proEdit.image);
            res.write(html);
            res.end();
        }) 
    }

    delete(req, res) {
            const urlObject = url.parse(req.url, true);
            let test = jewelryServices.deleteJewelry(urlObject.query.id);
            res.write("deleted");
            res.end();
    }

    // search(req, res) {
    //     if (req.method === 'GET') {
    //         fs.readFile('view/jewelry/searchJewelry.html', 'utf-8', (err, html) => {
    //             res.write(html);
    //             res.end();
    //         });

    //     } else if (req.method === 'POST') {
    //         let data = '';
    //         req.on('data', (chunk) => {
    //             data += chunk;
    //         });
    
    //         req.on('end', () => {
    //             const parsedData = qs.parse(data);
    //             const searchResults = jewelryServices.findJewelryByName(parsedData.search);
    
    //             if (!parsedData.search) {
    //                 res.end('Loi!');
    //             } else {
    //                 fs.readFile('view/jewelry/searchJewelry.html', 'utf-8', (err, html) => {
    //                     let itemsHtml = '';
    //                     for (const item of searchResults) {
    //                         itemsHtml += `
    //                     <tr>
    //                         <td><a href="jewelry/edit?idEdit=${item.id}"><button type="button" class="btn bx bxs-edit-alt btn-button"></button></a></td>
    //                         <td>${item.id}</td>
    //                         <td>${item.name}</td>
    //                         <td>${item.score}</td>
    //                         <td><button type="button" class="btn btn-danger" onclick="sendFetchDelete(${item.id})">X</button></td>
    //                     </tr>
    //                     `

    //                     }
    //                     html = html.replace('opacity: 0; margin-left: -55px;', 'opacity: 1; margin-left: 0px;');
    //                     html = html.replace('{item}', itemsHtml);
    //                     res.write(html);
    //                     res.end();
    //                 });
    //             }
    //         });
    //     }
    // }

    sortById(req, res) {
        const urlObject = url.parse(req.url, true);
        let test = jewelryServices.sortByID(urlObject.query.id);
        res.write("sorted");
        res.end();
    }

    reSortById(req, res) {
        const urlObject = url.parse(req.url, true);
        let test = jewelryServices.reSortByID(urlObject.query.id);
        res.write("sorted");
        res.end();
    }

}    

function showList(req, res) {
    fs.readFile('view/index.html', 'utf-8', (err, html) => {
        let list = jewelryServices.findAll();
        console.log(list);
        let itemsHtml = '';
        for (const item of list) {     
            itemsHtml += `<li class="span4">
                                <a href="jewelry/edit?idEdit=${item.id}"><button type="button" class="btn bx bxs-edit-alt btn-button"></button></a>
                                <div class="thumbnail">
                                <a class="zoomTool" href="product_details.html" title="add to cart"><span class="icon-search"></span> QUICK VIEW</a>
                                <a href="product_details.html"><img src="${item.image}" alt=""></a>
                                <div class="caption">
                                    <h5>${item.name}</h5>
                                    <h4>
                                        <a class="defaultBtn" href="product_details.html" title="Click to view"><span class="icon-zoom-in"></span></a>
                                        <a class="shopBtn" href="#" title="add to cart"><span class="icon-plus"></span></a>
                                        <span class="pull-right">${item.price}</span>
                                    </h4>
                                </div>
                                </div>
                            </li>`
        }
        html = html.replace('{item}', itemsHtml);
        res.write(html);
        res.end();
    })
}

export default new JewelryController()