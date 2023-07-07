function Validator(options) {

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        
        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule và kiểm tra
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if ( errorMessage ) {
            errorElement.innerText = errorMessage;
            errorElement.classList.add('invalid');
            inputElement.classList.add('border-invalid');
        }
        else {
            errorElement.innerText = '';
            errorElement.classList.remove('invalid');
            inputElement.classList.remove('border-invalid');
        }
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form); 
        if (formElement) {
            // Khi submit form
            formElement.onsubmit = (e) => {
                e.preventDefault();
                options.rules.forEach((rule) => {
                    var inputElement = formElement.querySelector(rule.selector);
                    validate(inputElement, rule);         
                })
            }

            // Lặp qua mỗi rule và xử lý sự kiện 
            options.rules.forEach(function (rule){

                // Lưu lại các rules cho mỗi input
                if (Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.announce); 
                }

                else {
                    selectorRules[rule.selector] = [rule.announce];
                }

                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                
                if (inputElement) {
                    
                    // Xử lý trường hợp blur khỏi input
                    inputElement.onblur = function() {
                        validate(inputElement, rule);        
                    }

                    // Xư lý mỗi khi user nhập vào input
                    inputElement.oninput = function() {
                        errorElement.innerText = '';
                        errorElement.classList.remove('invalid');
                        inputElement.classList.remove('border-invalid');
                    }
                }
            });        

            console.log(selectorRules); 
        }   
}

function isRequired(selector, message) {
    return {
        selector : selector,
        announce: function(value) {
            return value.trim() ? undefined : message
        }   
    }
}

function isEmail(selector, message) {
    return {
        selector : selector,
        announce: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message
        }
    }    
}

function pwMinLength(selector, min, message) {
    return {
        selector : selector,
        announce: function(value) {
            return value.length >=min ? undefined : message
        }
    }
}

function isConfirmed(selector, getConfirmValue, message){
    return {
        selector : selector,
        announce: function(value) {
            if ( value == ''){
                return value.trim() ? undefined : 'Bạn chưa nhập mật khẩu' 
            }
            else {
            return value == getConfirmValue() ? undefined : message 
            }
        }
    }
}