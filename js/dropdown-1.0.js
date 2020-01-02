let emptyLiHtml = '<li class="option-li" data-id="-1"></li>';
let cityList = [];
let param = {
    targets: '',
    list: '',
    emptyContent: '-请选择-',
    number:'',
    dropFlag: false
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
    let targets = param.targets;
    for (let i = 0; i < param.number; i++) {
        let initHtml = '<div class="select-wp data-index='+ i +'"><div class="select-show-wp"></div><ul class="option-ul"></ul></div>';
        $(targets).append(initHtml);
    }
    let selectShowHtml = '<div class="select-show">' + param.emptyContent + '</div>';
    let dropBtnHtml = '<div class="select-right">▼</div>';
    $(targets + ' .select-show-wp').append(selectShowHtml).append(dropBtnHtml);
    $(targets + ' .select-show').text(param.emptyContent);

    $(targets + ' .option-ul').html('').append(emptyLiHtml);
    let provHtml = appendLi(list);
    $(targets + ' .select-wp').eq(0).find('.option-ul').html('').append(emptyLiHtml).append(provHtml);

}

// 点击显示下拉框
$(document).on('click', '.select-show-wp', function (e) {
    if (param.dropFlag === false) {
        $(this).parent().find('.option-ul').css({
            display: 'block'
        });
        param.dropFlag = true;
    } else {
        $('.option-ul').css({
            display: 'none'
        });
        param.dropFlag = false;
    }

    e.stopPropagation();
});

// 选择下拉框内容
$(document).on('click', '.option-li', function () {
    let selectVal = $(this).text();
    let $show = $(this).parent().parent().find('.select-show');
    if (selectVal === '') {
        $show.text(param.emptyContent);
    } else {
        $show.text(selectVal);
    }
    $(this).parent().css({
        display: 'none'
    });
    param.dropFlag = false;
});

// 选择省
$(document).on('click', '.select1 .option-li', function () {
    let id = $(this).attr('data-id');
    cityList = selectChildren(id, areaList);
    let cityHtml = appendLi(cityList);
    // 清空第二个下拉框的选择
    $('.select2 .select-show').text(param.emptyContent);
    $('.select2').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>').append(cityHtml);
    // 清空第三个下拉框的选择
    $('.select3 .select-show').text(param.emptyContent);
    $('.select3').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>');
});

// 选择市
$(document).on('click', '.select2 .option-li', function () {
    let id = $(this).attr('data-id');
    let locationList = selectChildren(id, cityList);
    let locationHtml = appendLi(locationList);
    $('.select3 .select-show').text(param.emptyContent);
    $('.select3').find('.option-ul').html('').append('<li class="option-li" data-id="-1"></li>').append(locationHtml);
});

// 点击收起下拉框
$(document).on('click', function (e) {
    if (param.dropFlag) {
        $('.option-ul').css({
            display: 'none'
        });
        param.dropFlag = false;
    }
});