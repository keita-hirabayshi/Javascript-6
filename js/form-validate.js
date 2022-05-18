ValidityState_form();
// jsによるバリデーションのメリット
// リアルタイムで入力値の合否を確認でき、ユーザービリティの向上にもつながる
// ただし、フロント側での確認はすり抜けられる場合もあるので、サーバー側でもチェックするようにする。
// フロントとサーバーチェックすれば、データベース面でチェックする必要はない

function ValidityState_form() {
    const $inputs = document.querySelectorAll('.validate-target');
    const $form = document.querySelector('.validate-form');

    if(!$form){
        return;
    // formが取得できなければ、処理を中断するコードを記述してあげる。
    }

    for(const $input of $inputs) {
        
        $input.addEventListener('input', function(event) {
            const $target = event.currentTarget;
        //  エラーの出力はtargetで取得した要素の真下に表示したい。targetの次の要素を取得するような定数feedbackを定義してあげる
            const $feedback = $target.nextElementSibling;
            // 取得した$feedbackにinvalidfeedbackがついているか確認する。誤って違うタグを書き換えることのないようにするため

            activateSubmitBtn($form);
            
            if($feedback.classList.contains('invalid-feedback')){
            // containsは対象のノードに対して特定のクラスが設定されているか確認できる。ここで、returnとしてあげると、後続する文の処理は停止する。
                return;
            }
            console.log($target.validity);
            if($target.checkValidity()) {
    
                $target.classList.add('is-valid');
                $target.classList.remove('is-invalid');
                $feedback.textContent='';
            } else {
    
                $target.classList.add('is-invalid');
                $target.classList.remove('is-valid');
    
                if($target.validity.valueMissing) {
                    $feedback.textContent = '値の入力が必須です。';
                } else if ($target.validity.tooShort) {
                    $feedback.textContent = $target.minLength + '文字以上で入力してください。現在の文字数は' + $target.value.length +'文字です。';
                } else if ($target.validity.tooLong) {
                    $feedback.textContent = $target.maxLength + '文字以下で入力してください。現在の文字数は' + $target.value.length +'文字です。';
                } else if ($target.validity.patternMismatch) {
                    $feedback.textContent = '半角英数字で入力してください。';
                } 
            }
            
        });
    }
    
}

function activateSubmitBtn($form){
    const $submitBtn = $form.querySelector('[type= "submit"]');
    if($form.checkValidity()){
        $submitBtn.removeAttribute('disabled');
    }else{
        $submitBtn.setAttribute('disabled',true)
    }
}