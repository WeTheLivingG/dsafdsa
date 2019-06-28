$(function() {
  var page = 1
  var pageSize = 5
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
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
  $('.btn-add').on('click', function() {
    $('#addsecondModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function(info) {
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })
  // 确认按钮
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      url: '/category/addTopCategory',
      data: $('form').serialize(),
      type: 'post',
      success: function(info) {
        if (info.success) {
          $('form')[0].reset()
          $('#addsecondModal').modal('hide')
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

// 模态框各部分点击事件
$('.dropdown').on('click', 'a', function() {
  var text = $(this).text()
  $('.dropdown-text').text(text)

  var value = $(this).data('id')
  $('[name=categoryId]').val(value)

  $('form')
    .data('bootstrapValidator')
    .updateStatus('categoryId', 'VALID')
})

$('#file').fileupload({
  dataType: 'json',
  done: function(e, data) {
    console.log(data)
    var picAddr = data.result.picAddr
    $('.img-box img').attr('src', picAddr)
    $('[name=brandLogo]').val(picAddr)
    $('form')
      .data('bootstrapValidator')
      .updateStatus('brandLogo', 'VALID')
  }
})

// 表单验证
$('form').bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-thumbs-up',
    invalid: 'glyphicon glyphicon-thumbs-down',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: '请选择一级分类'
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: '请输入品牌名称'
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: '请上传品牌图片'
        }
      }
    }
  }
})

// 表单校验成功，发送ajax
$('form').on('success.form.bv', function(e) {
  e.preventDefault()
  $.ajax({
    type: 'post',
    url: '/category/addSecondCategory',
    data: $('form').serialize(),
    success: function(info) {
      if (info.success) {
        $('#addModal').modal('hide')
        // 重新渲染
        page = 1
        render()
        // 重置样式
        $('form')
          .data('bootstrapValidator')
          .resetForm(true)

        // 手动改变样式
        $('.dropdown-text').text('请选择一级分类')
        $('.img_box img').attr('src', 'images/none.png')
      }
    }
  })
})
