// 获取数据
const cartList = JSON.parse(localStorage.getItem('cartList'))
    
// 判断有没有数据
if (!cartList) {
  alert('您的购物车为空, 快去选购把')
  window.location.href = './list.html'
} else {
  // 渲染页面
  bindHtml()

  // 添加各种事件
  bindEvent()
}

function bindHtml() {
  let selectAll = cartList.every(item => {
    return item.isSelect === true
  })

  let str = `
    <div class="top">
      <input class="selectAll" type="checkbox" ${ selectAll ? 'checked' : '' }>   全选
      <span>商品名称</span>
      <span class="zx-dj">单价</span>
      <span class="zx-sl">数量</span>
      <span class="zx-xj">小计</span>
      <span class="zx-cz">操作</span>
    </div>
    <ul class="center">
  `
  cartList.forEach(item => {
    str += `
      <li>
        <div class="select">
          <input data-id=${ item.id } class="selectOne" type="checkbox" ${ item.isSelect ? 'checked' : '' }>
        </div>
        <div class="info">
          <img src="${ item.img }" alt="">
          <p>${ item.name }</p>
        </div>
        <p class="price">￥${ item.age }</p>
        <div class="number">
          <button class="sub" data-id=${ item.id }>-</button>
          <input type="text" value="${ item.number }">
          <button class="add" data-id=${ item.id }>+</button>
        </div>
        <p class="xiaoji">￥： ${ item.xiaoji }</p>
        <div class="del" data-id=${ item.id }>删除</div>
      </li>
    `
  })

  // 选中商品数量需要渲染
  let selectArr = cartList.filter(item => item.isSelect)

  // 选中商品数量计算
  let selectNumber = 0
  // 选中商品总价
  let selectPrice = 0
  selectArr.forEach(item => {
    selectNumber += item.number
    selectPrice += item.xiaoji
  })

  // 去支付要不要禁用, 如果没有选中的商品, 就应该禁用
  str += `
    </ul>
    <div class="bottom">
      <p>选中商品数量：<span>${ selectNumber }</span></p>
      <p>总 价：<span>￥：${ selectPrice}</span></p>
      <div>
        <button class="pay" ${ selectArr.length ? '' : 'disabled'}>去支付</button>
        <button class="clear">清空购物车</button>  
      </div>
    </div>
  `
  // 整体添加到页面的盒子里面
  $('.cart .content').html(str)
}

function bindEvent() {
  // 全选按钮的事件
  $('.cart .content').on('change', '.selectAll', function () {
    cartList.forEach(item => {
      item.isSelect = this.checked
    })

    bindHtml()

    // 在从新存储一遍 localStorage
    localStorage.setItem('cartList', JSON.stringify(cartList))
  })

  // 单选按钮的事件
  $('.cart .content').on('change', '.selectOne', function () {
    const id = $(this).data('id')

    // 找到数组中 id 一样的那一条数据改变一下 isSelect 属性
    cartList.forEach(item => {
      if (item.id === id) {
        item.isSelect = !item.isSelect
      }
    })

    // 从新渲染页面
    bindHtml()

    // 从新存储到 lcoalStorage 里面
    localStorage.setItem('cartList', JSON.stringify(cartList))
  })

  // 减少商品数量的事件
  $('.cart .content').on('click', '.sub', function () {
    const id = $(this).data('id')

    // 循环数组, 把 id 对应的这个数据的 number 和 小计修改了
    cartList.forEach(item => {
      if (item.id === id) {
        item.number > 1 ? item.number-- : ''
        item.xiaoji = item.age * item.number
      }
    })

    // 从新渲染一遍页面
    bindHtml()

    // 在从新存储一遍 localStorage
    localStorage.setItem('cartList', JSON.stringify(cartList))
  })

  // 添加商品按钮的事件
  $('.cart .content').on('click', '.add', function () {
    const id = $(this).data('id')

    // 循环数组找到一个id 对应的数据
    cartList.forEach(item => {
      if (item.id === id) {
        item.number++
        item.xiaoji = item.number * item.age
      }
    })

    // 从新渲染页面
    bindHtml()

    // 在从新存储一遍 localStorage
    localStorage.setItem('cartList', JSON.stringify(cartList))
  })

  // 点击删除的事件
  $('.cart .content').on('click', '.del', function () {
    alert("确定要删除吗？")
    $(this).parent().remove();
  })

  // 点击清除的事件
  $('.cart .content').on('click', '.clear', function () {
    alert("确定清空购物车吗？");
    $(".cart .content ul").remove();
    localStorage.removeItem("cartList");

  })
}