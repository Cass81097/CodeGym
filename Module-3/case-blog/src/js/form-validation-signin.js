Validator({
    form : '#form-1',
    errorSelector : '.form-message',
    rules: [
      // isEmail('#email', 'Vui lòng nhập địa chỉ Email'),
      isRequired('#usn', 'Vui lòng nhập Username'),
      pwMinLength('#password', 6, 'Mật khẩu tối thiểu 6 ký tự'),
    ]
  })    