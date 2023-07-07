Validator({
    form : '#form-1',
    errorSelector : '.form-message',
    rules: [
      isRequired('#usn', 'Vui lòng nhập tên'),
      isRequired('#email', 'Vui lòng nhập địa chỉ Email'), 
      isEmail('#email', 'Vui lòng nhập đúng địa chỉ Email'), 
      isRequired('#password', 'Vui lòng nhập mật khẩu'), 
      pwMinLength('#password', 6, 'Mật khẩu tối thiểu 6 ký tự'),
      isConfirmed('#password-confirmation', function() {
        return document.querySelector('#form-1 #password').value;
      }, 'Mật khẩu nhập lại không chính xác')
    ]
  })      