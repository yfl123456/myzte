// 图片切换效果
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    }
    });

        // 获取 localStorage 里面的数据
        const info = JSON.parse(localStorage.getItem('goodsInfo'))

        // 判断数据是否存在
        if (!info) {
            alert('您要查看的数据不存在')
            // 跳转回列表页面
            window.location.href = './list.html'
        }

        // 渲染页面
        bindHtml()
        function bindHtml() {
            $('.goodsInfo img').attr('src', info.img)
            $('.goodsInfo img').attr('data-large', info.img)
            $('.detail-rig h3').text(info.name)
            $('.detail-rig p').text('￥: ' + info.age)
            $('.yanse span').text(info.yanse)
            $('.cpzsl span').text(info.zsl + '件')
        }

        // 点击添加购物车
        $('.addCart').click(() => { //添加点击事件

        alert("加入成功");

        // 加入到购物车数组里面
        const cartList = JSON.parse(localStorage.getItem('cartList')) || []

        // 判断有没有这个数据
        let exits = cartList.some(item => {
            // 数组里面每一个的 id === 本页面的这条数据的 id
            return item.id === info.id
        })

        if (exits) {
            let data = null
            for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].id === info.id) {
                data = cartList[i]
                break
            }
        }
            data.number++

            // 数量添加的时候, 小计价格要改变
            data.xiaoji = data.number * data.age // 数量 * 单价
        } else {
            info.number = 1

            // 多添加一些信息
            info.xiaoji = info.age // 因为默认是第一个, 小计就是单价
            info.isSelect = true // 默认选中
            cartList.push(info)
        }

            // 在存储到 localStorage 里面
            localStorage.setItem('cartList', JSON.stringify(cartList))
            
        })

        // 图片放大功能
        $('.demo5').imagezoomsl({
            zoomrange: [1, 12],
            zoomstart: 2,
            innerzoom: true,
            magnifierborder: 'none'		  
        });