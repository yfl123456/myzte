// banner YangFangLing 2020年3月2日
var swiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay:true, //自动播放
    loop: true //循环模式选项
});

// 菜单分类
function getAll() {
    $.ajax({
        url:"../lib/index_nav.json",
        dataType:"json",
        success:function(res) {
            let str = ''
            res.forEach(item => {
                str += `
                    <li>
                        <h3><a href="">${ item.name }</a></h3>
                        <p>
                            <a href="">${ item.dat1 }</a>
                            <a href="">${ item.dat2 }</a>
                            <a href="">${ item.dat3 }</a>
                        </p>
                    </li>
                `
            })

            // 移入移出
            $('.banner ul.list-unstyled').html(str).on({
                mouseenter: () => $('.goods-block').stop().show(),
                mouseleave: () => $('.goods-block').stop().hide()
            }).children("li").on("mouseover",function(){
                const index = $(this).index()
                const list = res[index].list
                let str = ''
                list.forEach(item => {
                    str += `
                        <div class="item">
                            <div class="pic">
                                <img src="${ item.list_url }">
                            </div>
                            <a href="">${ item.list_name }</a>
                        </div>
                    `
                })
                $('.goods-block').html(str)

            })

            $(".goods-block").on({
                mouseover: function () { $(this).finish().show() },
                mouseout: function () { $(this).finish().hide() }
            })

        }
    })
}

getAll();

// 精品推荐
function getsj() {
    $.ajax({
        url:"../lib/jptj.json",
        dataType:"json",
        success:function(res){
            
            let str = "";

            res.forEach(item => {
                str += `
                    <li>
                        <a href="">
                            <div class="pic"><img src="${ item.img }" alt=""></div>
                            <h3>${ item.name }</h3>
                            <h4>${ item.dese }</h4>
                            <p>￥${ item.list_price -200 }<del>￥${ item.list_price }</del></p>
                        </a>
                    </li>
                `;
            })

            $(".zx-text ul").append(str);

        }
    })
}

getsj();

// 智能硬件
function getznyj() {
    $.ajax({
        url:"../lib/znyj.json",
        dataType:"json",
        success:function(res){
            let str = "";
            res.forEach(item => {
                str += `
                    <li>
                        <a href="">
                            <div class="pic"><img src="${ item.img }" alt=""></div>
                            <h3>${ item.name }</h3>
                            <h4>${ item.dese }</h4>
                            <p>￥${ item.list_price -100 }<del>￥${ item.list_price }</del></p>
                        </a>
                    </li>
                `;
            })
            $(".zx-znlist ul").append(str);
        }
    })
}

getznyj();

// 配件专区
$(".zx-pjzq .title ul li").mouseenter(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(".zx-pjzqls ul").removeClass("on").eq($(this).index()).addClass("on");
})