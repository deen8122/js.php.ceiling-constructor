


/*
 * Устанавливаем факутур потлока при выборе
 * из select ввода
 */
function SetFactura() {
    console.log('SetFactura...');
    var factura = $('#factura option:checked').val();
    var facturaSel = factura;
    var opacity = 1;
    //Матовый
    if (facturaSel == 1) {
        opacity = 0;
        factura = 1;
        setElement(8, 0);
    }
    //Сатиновый
    if (facturaSel == 2) {
        opacity = 0.7;
        factura = 1;
        setElement(8, 0)
    }
    //Тканевый
    if (facturaSel == 3) {
        opacity = 0.5;
        factura = 1;
        setElement(8, 1);
    }
    //Глянец
    if (facturaSel == 0) {
        factura = 3;
        setElement(8, 4);
        $('#img-8-4').css('opacity', '1');
    }

    //Глянец 2 80%
    if (facturaSel == 4) {
        factura = 3;
        opacity = 0.5;

        setElement(8, 4);
        $('#img-8-4').css('opacity', '0.6');
    }


    console.log(factura);
    if (constdata.factura == undefined) {
        constdata.factura = 0;
    }
    constdata.factura = facturaSel;
    console.log('constdata.factura=' + constdata.factura);
    /*
     * Данные фактуры потолка
     * хранятся в файле data.php  под номером 6
     */
    $('#a-6-' + factura).click();
    $('#img-6-' + factura).css('opacity', opacity);
    SetShadowOffLustra();
    saveUserVals();
}
function SetShadowOffLustra() {
    console.log("SetShadowOffLustra START" );
     console.log(onOnOffVal );
     console.log(onOnOffVal[4] );
     //Если  люстра не показывается то выходим из функции
     if( onOnOffVal[4]!==1) {
         
        hideElement(6);
        return false;
     }
    var isLightOn = onToggleVal[4];
    var factura = $('#factura option:checked').val();
     console.log("SetShadowOffLustra isLightOn="+isLightOn );
      console.log("SetShadowOffLustra factura="+factura );
    //Глянец
    if (factura == 0) {
        if(isLightOn===1) setElement(6, 5);
        else setElement(6, 4);
        $('#img-6-4').css('opacity', '0.5');
          $('#img-6-5').css('opacity', '0.5')

    }

    //Глянец 2 80%
    if (factura == 4) {
          $('#img-6-4').css('opacity', '0.3');
          $('#img-6-5').css('opacity', '0.3');
      if(isLightOn===1) setElement(6, 5);
        else setElement(6, 4);

    }
    //Сатиновый
    if (factura == 2) {
         if(isLightOn===1) setElement(6, 7);
        else setElement(6, 6);
    }


}
$(".first").click(function () {
    if ($(this).parent().find(".second").hasClass("on"),
            $(this).parent().find(".tumbler").hasClass("on")) {
        $(this).parent().find(".second").removeClass("on"),
                $(this).parent().find(".tumbler").removeClass("on"),
                $(this).addClass("on");
    }

    return false;
});
$('.lamp-5 ').click(function () {
    if (!$('#checkbox-5').prop('checked')) {
        $('#checkbox-5').click();
    }

});
$('.lamp-4 ').click(function () {
    if (!$('#checkbox-4').prop('checked')) {
        $('#checkbox-4').click();
    }

});
$(".second").click(function () {
    if ($(this).parent().find(".first").hasClass('on')) {
        $(this).parent().find(".first").removeClass('on'),
                $(this).addClass('on'),
                $(this).parent().find(".tumbler").addClass('on');
    }
    return false;
});

$(".tumbler").click(function () {
    if ($(this).hasClass('on'),
            $(this).parent().find(".second").hasClass('on')) {
        $(this).removeClass('on'),
                $(this).parent().find(".second").removeClass('on'),
                $(this).parent().find(".first").addClass('on');
    } else {
        $(this).addClass('on'),
                $(this).parent().find(".first").removeClass('on'),
                $(this).parent().find(".second").addClass('on');
    }
    return false;

});

//Установка типа потолка
function setCeiling(i) {


    console.log("setCeiling =" + i);
    var svg = $('.ceiling-item-' + i).data('svg');
    $('.seling-selected').css('background-image', 'url(' + svg + ')');
    $('.ceiling').hide();
    $('.ceiling-' + i).show();
    $('.ceiling-item').removeClass('active');
    $('.ceiling-item-' + i).addClass('active');
    if (constdata.ceiling == undefined) {
        constdata.ceiling = 0;
    }
    constdata.ceiling = i;
    $('.img-group-7').hide();
    // onToggle(5);
    setElement(0, i);
    if (constdata.onoff[5] == 1) {
        //  $('.img-group-0').show();

    } else {
        $('.img-group-0').hide();
    }
    saveUserVals();
}


function hideElement(i,j){
    if(i== undefined) return false;
    if(j== undefined){
        $('.img-group-' + i).hide();
    }else{
        $('#img-' + i + '-' + j).hide();
    }
}
//=============================
function setElement(i, j, nosave) {
     console.log("setElement " + i + "," + j);
    constdata.values[i] = j;
    var obj = data[num].elements[i].value[j];
    $('.img-group-' + i).hide();
    $('#img-' + i + '-' + j).show();
    $('.nav-' + i).find('.menu-icon').removeClass('active');
    $('#a-' + i + '-' + j).addClass('active');
    var style = $('#a-' + i + '-' + j).find('.image').attr('style');
    $('.selected-item-' + i).attr('style', style);
    if (nosave != 1) {
        saveUserVals();
    }
//Если люстра  спрятана то прячем и тени
    if (constdata.onoff[LUSTRA] == 0) {
        $('.img-group-6').hide();
    }
   
}


//Вклучение выключение светильников
function onToggle(i) {

    if (onToggleVal[i] === 1) {
        onToggleVal[i] = 0;

    } else {
        onToggleVal[i] = 1;

    }
    if (onToggleVal[i] === 1) {
        $('.lamp-' + i).addClass('on');
    } else {
        $('.lamp-' + i).removeClass('off');
    }

    if (constdata.ontoggle == undefined) {
        constdata.ontoggle = [];
    }
    constdata.ontoggle[i] = onToggleVal[i];


    //Если  событие относится к светильникам
    if (i === 5) {

        $('.img-group-0').hide();
        $('.img-group-7').hide();
        if (onToggleVal[i] == 1) {
            console.log("свет выкл");
            $('#img-7-' + constdata.ceiling).show();
        } else {
            console.log("свет вкл");
            $('#img-0-' + constdata.ceiling).show();
        }
    }



    saveUserVals();
    setElement(i, onToggleVal[i]);
    console.log(constdata.ontoggle);
     SetShadowOffLustra();
}


/*
 * Включеные и выключение ЛЮСТРЫ
 */
function onOnOffLustra() {
    var i = 4;
    console.log('---------------------ЛЮСТРА----------------------------- ');
    $('#img-' + 5 + '-0').hide();
    $('#img-' + 5 + '-1').hide();
    $('#img-' + 6 + '-0').hide();
    $('#img-' + 6 + '-1').hide();
    if (onOnOffVal[i] == 0) {
        //$('#factura').prop('disabled', true).css('opacity', '0.5');
        console.log('---------------------ЛЮСТРА  ВЫКЛ ----------------------------- ');
    } else {
        console.log('---------------------ЛЮСТРА  ВКЛ ----------------------------- ');
        $('#img-' + 5 + '-' + constdata.factura).show();
        $('#img-' + 6 + '-' + 1).show();
        //$('#factura').prop('disabled', false).css('opacity', '1');
    }
    
    
      
}
function onOnOffSvt() {
    var i = 5;
    console.log('onOnOffSvt>>>>>>>>>>>>>>>>>>>>> ');
    if (constdata.ontoggle == undefined) {
        constdata.ontoggle = [];
        constdata.ontoggle[i] = 0;
    }
    console.log('constdata.ontoggle[i]> ' + constdata.ontoggle[i]);
    console.log('constdata.onoff[i]> ' + constdata.onoff[i]);
    console.log('constdata.ceiling> ' + constdata.ceiling);
    $('.img-group-0').hide();
    $('.img-group-7').hide();

    if (constdata.onoff[i] == 0) {
        console.log("11111");
    } else {
        console.log("2222");

        if (constdata.ontoggle[i] == 1) {
            console.log("свет выкл");
            $('#img-7-' + constdata.ceiling).show();
        } else {
            console.log("свет вкл");
            $('#img-0-' + constdata.ceiling).show();
        }
    }
}
function onOnOff(i) {
    if (onOnOffVal[i] == 1) {
        onOnOffVal[i] = 0;
    } else {
        onOnOffVal[i] = 1;
    }

    console.log('onOnOffVal[i] > ' + onOnOffVal[i]);
    if (onOnOffVal[i] == 0) {
        $('#img-' + i + '-0').hide();
        $('#img-' + i + '-1').hide();
        $('#checkbox-' + i).prop("checked", false);
    } else {
        if (constdata.values[i] == undefined) {
            constdata.values[i] = 0;
            $('#checkbox-' + i).prop("checked", true);
        }
        $('#img-' + i + '-' + constdata.values[i]).show();
    }
    //ЕСЛИ ЛЮСТРА
    if (i === 4) {
        onOnOffLustra()

    }
    if (constdata.onoff == undefined) {
        constdata.onoff = [];
    }
    constdata.onoff[i] = onOnOffVal[i];

    if (i == 5) {
        onOnOffSvt();

    }
    SetShadowOffLustra();
    saveUserVals();
}


//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {

    setHome(0);
    setSelectedUserVal();
    // setImages();
    $('.ajaxform').submit(function () {
        var data = $(this).serialize();
        var formsuccess = $(this).data('success');
        var cd = JSON.stringify(constdata);
        // log(cd);
        // log(data);
        //data.post = cd;
        //    log(data);
        $.ajax({
            type: "POST",
            url: 'sendform.php?data=' + encodeURIComponent(cd),
            data: data,
            success: function (msg) {
                log(msg);
                // $.fancybox.open(formsuccess);
            }
        });

        return false;
    });


    $('#colorpicker').farbtastic(callbackSetColor);
    $('#colorpicker2').farbtastic(callbackSetColor2);
    $('.f-close').click(function () {
        $('.select-colors').hide();
        openedI = -1;
    });

    $('#slider-templ').bxSlider({maxSlides: 5, slideWidth: 135});

});


function callbackSetColor(color) {
    $('.st0').css('fill', color)
    $('.selected-item-cp1').css('background', color);
    constdata.potolok1 = color;
    saveUserVals();
}

function callbackSetColor2(color) {
    $('.st2').css('fill', color);
    $('.st1').css('fill', color);
    $('.selected-item-cp2').css('background', color);
    constdata.potolok2 = color;
    saveUserVals();
}



function downimg() {
}
var tabIsPressed = false;

$(window).keydown(function (event) {
    if (event.keyCode == 9) {
        tabIsPressed = true;
        event.preventDefault();
    }
});

$(window).keyup(function (event) {
    if (event.keyCode == 9) {
        tabIsPressed = false;
        event.preventDefault();
    }
});

$(window).on('keydown', function (e) {
    if (tabIsPressed && event.keyCode === 13) {
        event.preventDefault();
        alert(JSON.stringify(constdata));
        return;
    }
});