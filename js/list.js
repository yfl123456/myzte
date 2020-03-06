// 2-1. 准备一个变量
let currPage = 1
var flag = true

// 准备一个变量接收数组
var list2 = []

// 请求数据
function getList() {
    $.ajax({
        url:"../lib/list.json",
        dataType:"json",
        success:function(res){
            $('.pagi').pagination({
                pageCount: Math.ceil(res.length / 12), // 总页数
                current: 1, // 当前页
                jump: true,
                coping: true,
                homePage: '首页', // 首页按钮的文本
                endPage: '末页', // 末页按钮的文本
                prevContent: '上页',
                nextContent: '下页',
                callback:function(api){ //切换时会触发
                    let curr = api.getCurrent()
                    var list = res.slice((curr-1)*12,curr*12)
                    bindHtml(list)
                }
            });
            // 先把第一页的数据渲染一次
            bindHtml(res.slice(0, 12))

            // 给全局变量赋值
            list2 = res
        }
    })
}

getList()

function bindHtml(list) {

    let str = '' //创建空标签

    list.forEach(item => { //渲染li
        str += `
        <li data-id="${ item.id }">
            <a href="javascript:0">
                <div class="pic">
                    <img src="${ item.img }" alt="">
                </div>
                <div class="text">
                    <h3>${ item.name }</h3>
                    <p>¥${ item.age }</p>
                </div>
            </a>
        </li>
        `
    })

    $('.zx-container ul').html(str) //渲染的li添加到对应标签里面
}

// 事件委托绑定事件进详情
$(".zx-container ul").on("click","li",function(){
    const id = $(this).data("id");
    let data = {};

    for(let i = 0; i < list2.length; i++) {
        if (list2[i].id == id) {
            data = list2[i];
            break;
        }
    }

    // 要把这一条数据拿到 detail.html 页面去渲染一下
    localStorage.setItem('goodsInfo',JSON.stringify(data))

    // 存储好了以后就跳转页面
    window.location.href = './detail.html'
})

// 2. 排序
var btn = document.querySelector('.sort')
btn.onclick = function () {
    // 让准备好的变量改变
    flag = !flag

    // 不管是什么都要把数组重组
    list2.sort(function (a, b) {
        if (flag === true) {
        return a.id - b.id
        } else {
        return b.id - a.id
        }
    })

    $('.pagi').pagination({
        pageCount: Math.ceil(list2.length / 12), // 总页数
        current: 1, // 当前页
        jump: true,
        coping: true,
        homePage: '首页', // 首页按钮的文本
        endPage: '末页', // 末页按钮的文本
        prevContent: '上页',
        nextContent: '下页',
        callback: function (api) { // 当你切换页面的时候会触发
        let curr = api.getCurrent()
        // console.log(curr)
        var list = list2.slice((curr - 1) * 12, curr * 12)
        // 3-2. 每次使用分页器切换的时候渲染一次
        bindHtml(list)
        }
    })

    // 3. 先把第一页的数据渲染一次
    bindHtml(list2.slice(0, 12))
}