var num = 0;
var constdata = {onoff: [], values: []};
var LUSTRA_TEN = 6;
var LUSTRA = 4;
var onToggleVal = [];
var onOnOffVal = [];

var openedI = -1;


function saveUserVals() {
  // console.log('saveUserVals...');
   // console.log(constdata);
    setCookie('constdata', JSON.stringify(constdata));
    //setCookie('constdata','');
}
//Установка данных при выборе из шаблона
function setTemplData(data) {
    constdata = data;
    saveUserVals();
    setSelectedUserVal();
   
    console.log('-------------------------------');
    console.log(constdata.values[4]);
    if (constdata.values[4] == 0) {
        $('.img-group-6').hide();
    }
   
}

//Установка данных при загрузке
function setSelectedUserVal() {
    //constdata
    var data = getCookie('constdata');
    if (data != undefined) {
        constdata = JSON.parse(data);
    } else {
        constdata = {onoff: [], values: []};
    }

    //Установка данных типа "КАРТИНКА"
    console.log(constdata.values);
    if (constdata.values.length > 0) {
        constdata.values.forEach(function (j, i) {
            console.log(i + ":" + j);
            setElement(i, j, 1);
        });

    } else {
        console.log('constdata.values set default')
        setElement(0, 0);
        setElement(1, 0);
        setElement(2, 0);
        setElement(3, 0);
    }



    //Устанока типа потолка
    if (constdata.ceiling) {
        setCeiling(constdata.ceiling);
    } else
        setCeiling(0);

// Факутра потолка
    if (constdata.factura) {
        //  alert(constdata.factura);
        $('select[name="factura"]').val(constdata.factura).prop('selected', true);
        SetFactura();
    } else {
 $('select[name="factura"]').val(0).prop('selected', true);
        $('.factura-0').click();

    }
    //Цвет потолка 1 и 2 уровней
    if (!constdata.potolok1) {
        constdata.potolok1 = "#ccc";
    }
    if (!constdata.potolok2) {
        constdata.potolok2 = "#222";
    }

    if (constdata.potolok1) {
        $('.st0').css('fill', constdata.potolok1);
        $('.selected-item-cp1').css('background', constdata.potolok1);
    }
    if (constdata.potolok2) {
        $('.st2').css('fill', constdata.potolok2);
        $('.st1').css('fill', constdata.potolok2);
        $('.selected-item-cp2').css('background', constdata.potolok2);
    }

  console.log("============================ constdata.ontoggle ==================================");
  
  console.log(constdata.ontoggle);
    if (constdata.ontoggle) {
       
        constdata.ontoggle.forEach(function (j, i) {
            console.log(i + ":" + j);
           // alert(i+" - "+constdata.ontoggle[i]);
           onToggleVal[i] = j;
            if (i === 5) {
               
                $('.img-group-0').hide();
                $('.img-group-7').hide();
                if (constdata.ontoggle[i] == 0) {


                } else {
                    $('#img-0-' + constdata.ceiling).show();
                }

            }
            if (constdata.ontoggle[i] === 1) {
                // 
               $('#lamp-' + i).removeClass('off');
            } else {
                 $('#lamp-' + i).addClass('off').addClass('off2');
                
            }
        });

    }

    console.log("constdata.onoff.length = " + constdata.onoff.length);
    if (constdata.onoff.length == 0) {
        constdata.onoff[1] = 1;
        constdata.onoff[2] = 1;
        constdata.onoff[3] = 1;
        constdata.onoff[4] = 1;
        constdata.onoff[5] = 1;
        constdata.onoff[6] = 1;
      

    }
    
    
     console.log("============================ constdata.onoff ==================================");
    console.log(constdata.onoff);
    if (constdata.onoff.length > 0) {
        // console.log("onoff^");
      
        constdata.onoff.forEach(function (j, i) {
            // console.log(i + ":" + j);
            if (i == 5) {
 SetShadowOffLustra(); 

            }
            onOnOffVal[i] = j;
            if (onOnOffVal[i] == 0) {
                $('#img-' + i + '-0').hide();
                $('#img-' + i + '-1').hide();
                $('#checkbox-' + i).prop("checked", false);
            } else {
                $('#checkbox-' + i).prop("checked", true);
                if (constdata.values[i] == undefined) {
                    constdata.values[i] = 0;

                }
                $('#img-' + i + '-' + constdata.values[i]).show();
            }


            if (i == 4) {

                if (onOnOffVal[i] == 0) {
                    $('#img-' + 5 + '-0').hide();
                    $('#img-' + 5 + '-1').hide();
                } else {
                    // onOnOffVal[4]=1;
                    $('#img-' + 5 + '-0').show();
                    $('#img-' + 5 + '-1').show();
                }

            }
            if (i == 5) {

                if (onOnOffVal[i] == 0) {
                    $('.img-group-0').hide();
                    $('.img-group-7').hide();
                } else {
                     //$('#img-' + 7 + '-'+j).show();
                    //$('#img-' + 5 + '-1').show();

                }

            }



        });

    }

}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
function openPageInPopup(id) {
    $.fancybox.open(id);
}

function log(j) {

    console.log(j)
}

function setHome(n) {
    num = n;
    console.log('setHome....')
    constdata.num = num;
    $('.selhome').removeClass('active');
    $('#selhome-' + n).addClass('active');
    var style = $('#selhome-' + n).find('.image').attr('style');
    $('.selected-item-h').attr('style', style);
    setImages();
}

function setImages() {
    // log(data[num]);
    //loadinggif.setCetner('.draw-container');
    loadinggif.show();

    $('.draw-container').addClass('effect-blur ');
    var cont = '';
    var img = new Image();
    img.onload = function () {

        var cont2 = '<img  style="z-index:1" src="' + this.src + '" >';
        $('.draw-container').append(cont2);
        $('.draw-container').removeClass('effect-blur ');
        loadinggif.hide();
    }
    img.src = data[num].images_folder + data[num].image;

    //cont+= '<img  style="z-index:1" src="' + data[num].images_folder + data[num].image + '" >';
    for (var i = 0; i < data[num].elements.length; i++) {
        var obj = data[num].elements[i];
        if (obj.value != undefined) {
            cont +='\n\
<!-- ----- '+i+' ------ -->';
            for (var j = 0; j < obj.value.length; j++) {
                if (obj.value[j].image != undefined && obj.value[j].image != '') {
                    // console.log(data[num].images_folder + obj.value[j].image);
                    cont += '<img style="z-index:' + (obj.value[j].zindex != undefined ? obj.value[j].zindex : j) + ' ;' + (obj.value[j].style != undefined ? obj.value[j].style : "") + '"  src="' + data[num].images_folder + obj.value[j].image + '" id="img-' + i + '-' + j + '"  class="image-sets img-group-' + i + '">';
                }
                if (obj.value[j].svg != undefined) {
                    // cont +=  obj.value[j].svg;
                }
            }
        }

    }
    $('.draw-container').append(cont);


}



function showSelectColor(i) {
    console.log('showSelectColor:' + i)
    $('.select-colors').hide()
    if (openedI != i) {
        $('.select-colors-' + i).show(100);
        openedI = i;
    } else
        openedI = 0;

}