function Validator(options) {

    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorElement)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }

                inputElement.oninput = () => {
                    inputElement.parentElement.querySelector(options.errorElement).innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = (selector) => {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : 'Không được để trống!'
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email!'
        }
    }
}