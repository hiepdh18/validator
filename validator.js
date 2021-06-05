
function Validator(object) {
    var form = document.querySelector(object.form);
    var selectorRules = {};

    if(form) {
        var isValid = true;
        object.rules.forEach(rule => {
            // save rule for each input
            if (Array.isArray(selectorRules[rule.input]))
                selectorRules[rule.input].push(rule.check);
            else 
                selectorRules[rule.input] = [rule.check];
            
            var inputElement = form.querySelector(rule.input);
            if (inputElement) {
                inputElement.onblur = () => {
                    showMessage(rule, inputElement);
                };
                inputElement.oninput = () => {
                    showMessage(rule, inputElement);
                }
            }
        });
        form.onsubmit =(event) => {
            event.preventDefault()
            if(isValid) console.log('Khong co loi');
            else console.log('co loi');
        }
        
    }


    function showMessage(rule, inputElement) {
        let messageElement = inputElement.parentElement.querySelector(object.message);
        // let value = inputElement.value;
        let errorMsg;
        let rules = selectorRules[rule.input];

        for(var i = 0; i<= rules.length; i++) {
            errorMsg = rules[i](inputElement.value);
            if(errorMsg) {
                isValid = false;
                break;
            }
        }
        
        if (errorMsg) {
            messageElement.innerText = errorMsg;
            inputElement.parentElement.classList.add('invalid');
        } else {
            messageElement.innerText = "";
            inputElement.parentElement.classList.remove('invalid');
        }
    }
}

Validator.isFilled = (input,msg) => {
    return {
        input : input,
        check : (value) => {
            return value.trim() ? undefined : msg || "Không được bỏ trống tên!";
        },
    };
}
Validator.isEmail = (input, msg) => {
    return {
        input: input,
        check: (value) => {
            let reg = /^[\w-\.]+@([\w]+\.)+[\w-]{2,4}$/;
            return reg.test(value) ? undefined : msg || 'Trường này phải là email!';
        },
    };
}

Validator.checkPassword = (input, minLength, msg) => {
    return {
        input: input,
        check: (value) => {
            return value.trim().length >= minLength ? undefined : msg || `Độ dài mật khẩu phải k=lớn hơn ${minLength}}!`;
        },
    };
}

Validator.isConfirmed = (input, password, msg) => {
    return {
        input: input,
        check: (value) => {
            return value.trim() === document.querySelector(password).value ? undefined : msg || `Mật khẩu không khớp!`;
        },
    };
}
