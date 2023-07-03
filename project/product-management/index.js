let alertDm = document.querySelector('.dm');
alertDm.addEventListener('click', function() {
  alert('Chưa làm xong hí hí');
})

function page(){
  alert('Làm màu thôi');
}

let body = document.querySelector('body');
let sidebar = document.querySelector('.sidebar');
let toggle = body.querySelector('.toggle');
let searchSidebar = body.querySelector('.search-box');

toggle.addEventListener('click', function() {
    sidebar.classList.toggle('close');
});

searchSidebar.addEventListener('click', function() {
    sidebar.classList.remove('close');
});

window.addEventListener('load', function() {
    sidebar.classList.toggle('close');
})

let logoutYes = document.querySelector('.yes')
logoutYes.addEventListener('click', function() {
    window.location.href = '../product-management/myhtml/signin.html';
})

let codePart1 = document.getElementById('code-part1');
let codePart2 = document.getElementById('code-part2');
let codePart3 = document.getElementById('code-part3');
let codePart4 = document.getElementById('code-part4');

[codePart1, codePart2, codePart3, codePart4].forEach((part, index, parts) => {
    part.addEventListener('input', () => {
      if (part.value.length === part.maxLength) {
        if (index < parts.length - 1) {
          parts[index + 1].focus();
        } else {
          parts.map((part) => part.value).join('');
        }
      }
    });

    part.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && part.value.length === 0 && index > 0) {
        parts[index - 1].focus();
      }
    });
});

let codeEditPart1 = document.getElementById('code-edit-part1');
let codeEditPart2 = document.getElementById('code-edit-part2');
let codeEditPart3 = document.getElementById('code-edit-part3');
let codeEditPart4 = document.getElementById('code-edit-part4');

[codeEditPart1, codeEditPart2, codeEditPart3, codeEditPart4].forEach((part, index, parts) => {
    part.addEventListener('input', () => {
      if (part.value.length === part.maxLength) {
        if (index < parts.length - 1) {
          parts[index + 1].focus();
        } else {
          parts.map((part) => part.value).join('');
        }
      }
    });

    part.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && part.value.length === 0 && index > 0) {
        parts[index - 1].focus();
      }
    });
});