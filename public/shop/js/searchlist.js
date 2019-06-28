$(function() {
  // 获取地址
  var name = decodeURI(location.search).split('=')[1]
  var page = 1
  var pageSize = 4

  mui.init({
    pullRefresh: {
      container: '.mui-scroll-wrapper',
      // 下拉刷新
      down: {
        height: 50,
        auto: true,
        contentdown: '下拉可以刷新',
        contentover: '释放立即刷新',
        contentrefresh: '正在刷新...',
        callback: function() {
          page = 1
          render(function(info) {
            $('.product').html(template('tpl', info))
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .endPulldownToRefresh(true)
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .refresh(true)
          })
        }
      },
      // 上滑加载
      up: {
        callback: function() {
          page++
          render(function(info) {
            $('.product').append(template('tpl', info))

            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .endPullupToRefresh(info.data.length === 0)
          })
        }
      }
    }
  })

  // 渲染函数
  function render(callback) {
    var param = {
      proName: name,
      page: page,
      pageSize: pageSize
    }

    var $now = $('.product-top li.now')
    if ($now.length === 1) {
      var type = $now.data('type')
      console.log($('.icon-change').hasClass('mui-icon-arrowdown'))
      var value = $now.find('.icon-change').hasClass('mui-icon-arrowdown')
        ? 2
        : 1
      param[type] = value
    }

    $.ajax({
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        setTimeout(function() {
          callback && callback(info)
        }, 1000)
      }
    })
  }

  // 导航栏点击事件
  $('.product-top li[data-type]').on('tap', function() {
    if (!$(this).hasClass('now')) {
      $(this)
        .addClass('now')
        .siblings()
        .removeClass('now')

      $('.icon-change')
        .removeClass('mui-icon-arrowup ')
        .addClass('mui-icon-arrowdown')
    } else {
      $(this)
        .find('.icon-change')
        .toggleClass('mui-icon-arrowup')
        .toggleClass('mui-icon-arrowdown')
    }

    mui('.mui-scroll-wrapper')
      .pullRefresh()
      .pulldownLoading()
  })

  // 搜索跳转
  $('.btn-search').on('tap', function() {
    name = $('.text-search').val()
    $('.text-search').val('')
    location.href = 'searchList.html?key=' + name
  })
})

$('.product').on('tap', '.btn-buy', function() {
  var id = $(this).data('id')
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'GET',
    data: {
      id: id
    },
    success: function() {
      location.href = 'http://localhost:3000/shop/detail.html?key=' + id
    }
  })
})
