$(function() {
  var page = 1
  var pageSize = 2
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page,
        pageSize
      },
      success: function(info) {
        $('tbody').html(template('tpl', info))
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
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

  // 添加按钮
  $('.btn-add').click(function() {
    $('#addModal').modal('show')
  })

  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      type: 'post',
      success: function(info) {
        if (info.success) {
          $('form')[0].reset()
          $('#addModal').modal('hide')
          page = 1
          render()
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)
        }
      }
    })
  })
})

// 表单验证
$('form').bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryName: {
      validators: {
        notEmpty: {
          message: '一级分类不能为空'
        },
        //长度校验
        stringLength: {
          min: 1,
          max: 30,
          message: '用户名长度必须在1到30之间'
        },
        //正则校验
        // regular expression
        regexp: {
          regexp: /^[a-zA-Z0-9_\.]+$/,
          message: '用户名由数字字母下划线和.组成'
        }
      }
    }
  }
})
