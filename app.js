var random_pin = 0;
var get_pin = false;
var typed_number = '';
var count = 3;
const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function fail_message(){
    get_pin = false;
    document.getElementById("notify_fail").style.display = 'block';
    document.getElementById("notify_success").style.display = 'none';
    document.getElementById("action-left").innerText = "Please Generate Pin First";
    document.getElementById("display_pin").value = '';
}

function success_message(){
    get_pin = false;
    document.getElementById("notify_fail").style.display = 'none';
    document.getElementById("notify_success").style.display = 'block';
    document.getElementById("action-left").innerText = "";
    document.getElementById("display_pin").value = '';
    document.getElementById("display_type").value = '';
}

function verify(){
    if( count == 3 ){
        if( random_pin != parseInt(typed_number) ){
            count = 2;
            typed_number ='';
            document.getElementById("display_type").value = typed_number;
            document.getElementById("action-left").innerText = "You have 2 times left";
        }else{
            success_message();
            return;
        }
    }else if( count == 2 ){
        if( random_pin != parseInt(typed_number) ){
            count = 1;
            typed_number ='';
            document.getElementById("display_type").value = typed_number;
            document.getElementById("action-left").innerText = "This is your last chance";
        }else{
            success_message();
            return;
        }
    }else if( count == 1 ){
        if( random_pin != parseInt(typed_number) ){
            typed_number ='';
            document.getElementById("display_type").value = typed_number;
            fail_message();
        }else{
            success_message();
            return;
        }
    }
}

document.getElementById("Pin-Generator").addEventListener('click', function(){
    while(true){
        random_pin = Math.round( Math.random()*10000 );
        if( random_pin>=1000 && random_pin<=9999 ){
            break;
        }
    }
    get_pin = true;
    document.getElementById("display_pin").value = random_pin;
    document.getElementById("display_type").value = '';
    typed_number = '';
    count = 3;
    document.getElementById("action-left").innerText = "You have 3 times left";
    document.getElementById("notify_fail").style.display = 'none';
    document.getElementById("notify_success").style.display = 'none';
});

document.getElementById("key-pad").addEventListener('click', function(event){
    if( get_pin == false ){
        document.getElementById("action-left").innerText = "Please Generate Pin First";
    }else{
        const key = event.target.innerText;
        if( keys.indexOf(key) > -1 ){
            typed_number = typed_number + key;
        }else if( key == 'C' ){
            typed_number = '';
        }else if( key=='<'){
            typed_number = typed_number.substring(0, typed_number.length - 1);
        }else if( key == 'Submit' ){
            verify();
        }
        document.getElementById("display_type").value = typed_number;
    }
})