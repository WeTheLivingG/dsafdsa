$(function() {
  // 获取历史数据函数
  function getHistory() {
    return JSON.parse(localStorage.getItem('sh'))
  }

  // 设置历史数据函数
  function setHistory(sh) {
    return localStorage.setItem('sh', JSON.stringify(sh))
  }

  // 渲染
  function render() {
    var sh = getHistory() || []
    $('.history').html(template('tpl', { list: sh }))
  }
  render()

  // 搜索框点击事件
  $('.btn-search').click(function() {
    var sh = getHistory() || []
    var st = $('.text-search').val()
    // 文本框没有内容时弹框
    if (!st) {
      mui.toast('请输入商品名称', { duration: '1000', type: 'div' })
      return
    }
    // 记录上限
    if (sh.length >= 10) {
      sh.pop()
    }
    // 记录已存在
    if (sh.indexOf(st) !== -1) {
      sh.splice(sh.indexOf(st), 1)
    }

    sh.unshift(st)
    $('.text-search').val('')
    setHistory(sh)
    render()
    location.href = 'searchlist.html?key=' + st
  })
  // 清空事件
  $('.history').on('click', '.btn-empty', function() {
    mui.confirm(
      '你确定要清空所有历史记录吗',
      '温馨提示',
      ['是', '否'],
      function(e) {
        if (e.index === 0) {
          localStorage.removeItem('sh')
          render()
        }
      },
      'div'
    )
  })
  // 删除事件
  $('.history').on('click', '.history-cancel', function() {
    var index = $(this).data('index')
    var sh = getHistory()
    sh.splice(index, 1)
    setHistory(sh)
    render()
  })
})
