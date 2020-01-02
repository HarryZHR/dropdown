const emptyContent = '-请选择-';
let dropFlag = false;
let emptyLiHtml = '<li class="option-li" data-id="-1"></li>';
let cityList = [];
let param = {
    targets: '',
    list: '',
    emptyContent: '-请选择-'
};
// 生成下拉选项
function appendLi(areaList) {
    let selectHtml = "";
    for (let index in areaList) {
        selectHtml += '<li class="option-li" data-id="' + areaList[index].id + '">' + areaList[index].areaName + '</li>';
    }
    return selectHtml;
}

// 找到子节点
function selectChildren(areaId, areaList) {
    for (let index in areaList) {
        if (areaList[index].id === areaId) {
            return areaList[index].children;
        }
    }
}

// 初始化下拉框
function Dropdown( param ) {
    let list = param.list;
    $('.select-show').text(param.emptyContent);

    $('.option-ul').html('').append(emptyLiHtml);
    let provHtml = appendLi(list);
    $('.select1').find('.option-ul').html('').append(emptyLiHtml).append(provHtml);

}

// 点击显示下拉框
$(document).on('click', '.select-show-wp', function (e) {
    if (dropFlag === false) {
        $(this).parent().find('.option-ul').css({
            display: 'block'
        });
        dropFlag = true;
    } else {
        $('.option-ul').css({
            display: 'none'
        });
        dropFlag = false;
    }

    e.stopPropagation();
});

// 选择下拉框内容
$(document).on('click', '.option-li', function () {
    let selectVal = $(this).text();
    let $show = $(this).parent().parent().find('.select-show');
    if (selectVal === '') {
        $show.text(emptyContent);
    } else {
        $show.text(selectVal);
    }
    $(this).parent().css({
        display: 'none'
    });
    dropFlag = false;
});

// 选择省
$(document).on('click', '.select1 .option-li', function () {
    let id = $(this).attr('data-id');
    cityList = selectChildren(id, areaList);
    let cityHtml = appendLi(cityList);
    // 清空第二个下拉框的选择
    $('.select2 .select-show').text(emptyContent);
    $('.select2').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>').append(cityHtml);
    // 清空第三个下拉框的选择
    $('.select3 .select-show').text(emptyContent);
    $('.select3').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>');
});

// 选择市
$(document).on('click', '.select2 .option-li', function () {
    let id = $(this).attr('data-id');
    let locationList = selectChildren(id, cityList);
    let locationHtml = appendLi(locationList);
    $('.select3 .select-show').text(emptyContent);
    $('.select3').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>').append(locationHtml);
});

// 点击收起下拉框
$(document).on('click', function (e) {
    if (dropFlag) {
        $('.option-ul').css({
            display: 'none'
        });
        dropFlag = false;
    }
});