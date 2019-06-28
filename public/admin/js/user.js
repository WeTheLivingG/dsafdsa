$(function() {
  var page = 1
  var pageSize = 5
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info)
        var html = template('tpl', info)
        $('tbody').html(html)

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize), //总页数
          size: 'small', //设置控件的大小，mini, small, normal,large
          onPageClicked: function() {
            page = arguments[3]
            render()
          }
        })
      }
    })
  }
  render()

  var id, isDelete
  $('tbody').on('click', 'button', function() {
    $('#userModal').modal('show')
    id = $(this)
      .parent()
      .data('id')
    isDelete = $(this).text() === '启用' ? 1 : 0
  })

  $('.btn-change').click(function() {
    console.log(1)
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      data: { id: id, isDelete: isDelete },
      success: function(info) {
        console.log(info)
        if (info.success) {
          $('#userModal').modal('hide')
          render()
        }
      }
    })
  })
})
