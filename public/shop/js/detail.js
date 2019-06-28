$(function() {
  var key = location.search.split('=')[1]

  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: key
    },
    success: function(info) {
      var arr = []
      var temp = info.size.split('-')
      for (var i = +temp[0]; i <= temp[1]; i++) {
        arr.push(i)
      }
      info.sizeArray = arr

      $('.mui-scroll').html(template('tpl', info))
      console.log(info)
      // 手动初始化轮播图
      mui('.mui-slider').slider({
        interval: 1000
      })
      // 手动初始化数字
      mui('.mui-numbox').numbox()
    }
  })
})
