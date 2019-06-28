$(function() {
  $(document).ajaxStart(function() {
    NProgress.start()
  })
  $(document).ajaxStop(function() {
    setTimeout(function() {
      NProgress.done()
    }, 1000)
  })
})

$('.second')
  .prev()
  .click(function() {
    $('.second')
      .stop(true)
      .slideToggle()
  })

$('.icon-toggle').click(function() {
  $('.lt-aside,.topbar,.lt-content').toggleClass('now')
})

$('.icon-out').click(function() {
  $('#logoutModal').modal('show')
  $('.btn-logout').click(function() {
    console.log(1)
    $.ajax({
      url: '/employee/employeeLogout',
      success: function(info) {
        if (info.success) {
          $('#logoutModal').modal('hide')
          location.href = 'login.html'
        }
      }
    })
  })
})
