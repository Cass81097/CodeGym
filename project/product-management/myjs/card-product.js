$( document ).ready(function() {   // == document.addEventListener('DOMContentLoaded', function()
    myLocal.loadProducts();
    showCard(); 
});    

function saveCard(){
       let clientName = document.getElementById('client-name').value;
       const formattedClientName = clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
       const upperCaseFormattedClientName = formattedClientName.toUpperCase();
       let codePart1 = document.getElementById('code-part1').value.trim()
       let codePart2 = document.getElementById('code-part2').value.trim()
       let codePart3 = document.getElementById('code-part3').value.trim()
       let codePart4 = document.getElementById('code-part4').value.trim()
       code = codePart1 + codePart2 + codePart3 + codePart4;
       addCard(upperCaseFormattedClientName, code);

}

function addCard(name, code){
    let card = {
        name : name,
        code : code,
    }

    let findCard = myLocal.findProductByCode(code);
    if ( findCard !== undefined ) {
        alert("Mã thẻ đã tồn tại!");
        return; 
    }
    
    if ( code.length != 16) {
        alert("Mã thẻ không hợp lệ!");
        return; 
    }

    if ( name.length < 5) {
        alert("Tên không hợp lệ!")
        return;
    }

    myLocal.addNewProduct(card);
    alert('Thêm card thành công!');

    document.getElementById('client-name').value = '';
    document.getElementById('code-part1').value = '';
    document.getElementById('code-part2').value = '';
    document.getElementById('code-part3').value = '';
    document.getElementById('code-part4').value = '';

    showCard(); 
}

function saveEditCard() {
    let clientName = document.getElementById('client-name-update').value;
    const formattedClientNameUpdate = clientName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    const upperCaseFormattedClientNameUpdate = formattedClientNameUpdate.toUpperCase();
    let codeEditPart1 = document.getElementById('code-edit-part1').value.trim();
    let codeEditPart2 = document.getElementById('code-edit-part2').value.trim();
    let codeEditPart3 = document.getElementById('code-edit-part3').value.trim();
    let codeEditPart4 = document.getElementById('code-edit-part4').value.trim();
    let codeEdit = codeEditPart1 + codeEditPart2 + codeEditPart3 + codeEditPart4;

    let findCardEdit = myLocal.findProductByCode(codeEdit);
    if (findCardEdit !== undefined ) {
        alert("Mã thẻ đã tồn tại!");
        return; 
    }
    
    if (codeEdit.length !== 16) {
        alert("Mã thẻ không hợp lệ!");
        return; 
    }

    if (upperCaseFormattedClientNameUpdate.length < 5) {
        alert("Tên không hợp lệ!");
        return;
    }

    for (let i = 0; i < myLocal.getProducts().length; i++) {
        let card = myLocal.getProducts()[i];
        let renderCardUpdate = document.getElementById('edit-code').innerHTML.replace(/\s/g, '')
        if (card.code === renderCardUpdate) {
            card.name = upperCaseFormattedClientNameUpdate;
            card.code = codeEdit;
            myLocal.saveProducts();
            alert('Sửa thẻ thành công!');
            $('#modal-edit-product').modal('hide');
            showCard();  
            break;   
        }
    }
}

function showCard(){
    let itemWrap = document.getElementsByClassName("home-text")[0];
    let cards = myLocal.getProducts();
    itemWrap.innerHTML = ''; 
 

    let cardHtml = cards.map((card, i) => {
        let { name, code } = card;
        return `
            <div class="container card-manager" style="background:#323271">
                <i onclick="clickRemove('${code}')" class="fa-solid fa-xmark button-remove" ></i>
                <i onclick="clickUpdate('${code}')" class="fa-solid fa-minus button-update"id=codeupdate-${i} data-bs-toggle="modal" data-bs-target="#modal-edit-product"></i>
                <div class="card-head">
                    <span class="logo">
                        <img src="images/logo.png" alt="">
                        <h5>Master Card</h5>
                    </span>
                    <span>
                        <img src="images/chip.png" alt="" class="chip">
                    </span>
                </div>

                <div class="card-details">
                    <div class="name-number">
                        <div class="card-icon">
                            <h6>Card Number</h6>
                            <i class='bx bx-wifi icon'></i>
                        </div>
                        <h5 style="font-weight: 600;" id="number-${i}" class="number">${code.match(/.{1,4}/g).join(" ")}</h5>
                        <input type="text" class="edit-code-input" id="edit-code-${i}" value="${code}" style="display:none;">
                    </div>
                    <div class="valid-date">
                        <div class="valid-from">
                            <h6>Valid From</h6>
                            <h5 style="text-align: center;">05/23</h5>
                        </div>
                        <div class="valid-thru">
                            <h6>Valid Thru</h6>
                            <h5 style="text-align: center;">05/27</h5>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div class="card-name">
                            <h6 style="font-weight: 600;" id="username-${i}">${name}</h6>
                           
                        </div>
                    </div>   
                </div>
            </div>`;
    })
    itemWrap.innerHTML = cardHtml.join('');
}

function clickRemove(code){
    let renderCode = code.match(/.{1,4}/g).join(" ")
    $('#remove-code').html(renderCode);
    $('#code-confirm-remove').html(code);
    $('#modal-confirm-delete').modal('show');
}

function clickConfirmRemove(){
    let code = $('#code-confirm-remove').html();
    $('#modal-confirm-delete').modal('hide');
    myLocal.removeProductByCode(code);
    alert(`Xóa thẻ ${code} thành công!`)
    showCard();
}

function clickUpdate(code){
    let renderCode = code.match(/.{1,4}/g).join(" ")
    $('#edit-code').html(renderCode);
}

function hideCard(){
    let itemWrap = document.getElementsByClassName("home-text")[0];
    itemWrap.innerHTML = ''; 
}

function inputCard(){
    hideCard(); 
    let search = document.getElementById('search-card').value.trim();
    let itemWrap = document.getElementsByClassName("home-text")[0];
    
    let cards = myLocal.searchProduct(search)
    for (let i = 0; i < cards.length; i++) {
        let { name, code } = cards[i];
        let cardHtml =  
            `<div class="container card-manager" style="background:#323271">
                <i onclick="clickRemove('${code}')" class="fa-solid fa-xmark button-remove"></i>
                <i onclick="clickUpdate('${code}')" class="fa-solid fa-minus button-update"id=codeupdate-${i} data-bs-toggle="modal" data-bs-target="#modal-edit-product"></i>
                <div class="card-head">
                    <span class="logo">
                        <img src="images/logo.png" alt="">
                        <h5>Master Card</h5>
                    </span>
                    <span>
                        <img src="images/chip.png" alt="" class="chip">
                    </span>
                </div>

                <div class="card-details">
                    <div class="name-number">
                        <div class="card-icon">
                            <h6>Card Number</h6>
                            <i class='bx bx-wifi icon'></i> 
                        </div>
                        <h5 style="font-weight: 600;" id="number-${i}" class="number">${code.match(/.{1,4}/g).join(" ")} </h5>
                    </div>
                    <div class="valid-date">
                        <div class="valid-from">
                            <h6>Valid From</h6>
                            <h5 style="text-align: center;">05/23</h5>
                        </div>
                        <div class="valid-thru">
                            <h6>Valid Thru</h6>
                            <h5 style="text-align: center;">05/27</h5>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div class="card-name">
                            <h6 style="font-weight: 600;" id="username-${i}">${name} </h6>
                        </div>
                    </div>   
                </div>
            </div>`;
        itemWrap.innerHTML += cardHtml;
    }
}   
 
