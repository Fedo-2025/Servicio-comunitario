const $ = require("jquery")

$(document).ready(() => {
  /*-------BACKGROUND Wrap---------*/
  var backgrounds = [
    "images/bg_body.png",
    "images/bg_body01.png",
    "images/bg_body02.png",
    "images/bg_body03.png",
    "images/bg_body04.png",
  ]
  var largo = backgrounds.length
  var randomnumber = Math.floor(Math.random() * largo)
  $("#bg_wrap").css({ "background-image": "url(" + backgrounds[randomnumber] + ")" })
  /*-*/
  /*----orla blanca del logo header---*/
  var canvas = document.getElementById("logo")
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d")
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(515, 0)
    ctx.quadraticCurveTo(0, 304, 0, 0)
    ctx.fill()
  }
  var canvas_footer = $("#orla_foot")
  var fw = $("footer").width()
  var fh = $("footer").height() - canvas_footer.height() + 35
  canvas_footer.width(fw)
  canvas_footer.height(fh)
  canvas_footer.css({ position: "absolute", bottom: "0", left: "0" })
  var canvas_footer_element = document.getElementById("orla_foot")
  if (canvas_footer_element && canvas_footer_element.getContext) {
    var context = canvas_footer_element.getContext("2d")
    context.fillStyle = "rgb(0,156,222)"
    context.beginPath()
    context.moveTo(0, 50)
    context.quadraticCurveTo(75, 0, 150, 0)
    context.quadraticCurveTo(225, 0, 300, 50)
    context.lineTo(300, 200)
    context.lineTo(0, 200)
    context.fill()
  }
  /*---------*/
  /*-----TORTA-----*/
  if ($("#torta").length) {
    let animationFrame = null
    let hasAnimated = false

    function animateTorta() {
      const $torta = $("#torta")
      const scrollTop = $(window).scrollTop()
      const windowHeight = $(window).height()
      const tortaOffset = $torta.offset()

      if (!tortaOffset) return

      const tortaTop = tortaOffset.top
      const tortaHeight = $torta.outerHeight()

      // Calculate if torta is in viewport with more generous bounds
      const viewportTop = scrollTop
      const viewportBottom = scrollTop + windowHeight
      const tortaBottom = tortaTop + tortaHeight

      // Element is visible if any part is in viewport
      const isVisible = tortaBottom > viewportTop && tortaTop < viewportBottom

      if (isVisible) {
        hasAnimated = true

        // Calculate center positions
        const viewportCenter = scrollTop + windowHeight / 2
        const tortaCenter = tortaTop + tortaHeight / 2

        // Calculate distance from center of viewport to center of torta
        const distance = Math.abs(viewportCenter - tortaCenter)

        // Maximum distance is when element just enters viewport
        const maxDistance = windowHeight / 2 + tortaHeight / 2

        // Progress from 0 (far) to 1 (centered)
        let progress = 1 - Math.min(distance / maxDistance, 1)

        // Apply easing for smoother animation
        progress = progress * progress * (3 - 2 * progress) // Smoothstep easing

        // Calculate movement (60px when progress is 0, 0px when progress is 1)
        const maxMovement = 60
        const movement = maxMovement * (1 - progress)

        // Apply transforms to each quadrant
        $("#torta a:nth-child(1)").css({
          transform: `translate(${movement}px, ${movement}px)`,
        })
        $("#torta a:nth-child(2)").css({
          transform: `translate(-${movement}px, ${movement}px)`,
        })
        $("#torta a:nth-child(3)").css({
          transform: `translate(${movement}px, -${movement}px)`,
        })
        $("#torta a:nth-child(4)").css({
          transform: `translate(-${movement}px, -${movement}px)`,
        })
      } else if (!hasAnimated) {
        // Reset to initial state if not yet animated
        const maxMovement = 60
        $("#torta a:nth-child(1)").css({ transform: `translate(${maxMovement}px, ${maxMovement}px)` })
        $("#torta a:nth-child(2)").css({ transform: `translate(-${maxMovement}px, ${maxMovement}px)` })
        $("#torta a:nth-child(3)").css({ transform: `translate(${maxMovement}px, -${maxMovement}px)` })
        $("#torta a:nth-child(4)").css({ transform: `translate(-${maxMovement}px, -${maxMovement}px)` })
      }
    }

    // Optimized scroll handler with requestAnimationFrame
    function onScroll() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrame = requestAnimationFrame(animateTorta)
    }

    // Attach event listeners
    $(window).on("scroll", onScroll)
    $(window).on("resize", () => {
      hasAnimated = false
      animateTorta()
    })

    // Initial animation check after page fully loads
    setTimeout(() => {
      animateTorta()
    }, 300)

    // Also check after images load
    $(window).on("load", () => {
      setTimeout(animateTorta, 100)
    })
  }
  /*-------*/
  /*---hover nav header---*/
  var act = $("header nav").find(".active")
  var span = $("header nav span")
  span.css({ opacity: 0.5 })
  var pad = $("header nav li").width() - $("header nav a").outerWidth()
  var offact = act.position()
  var offnav = $("header nav").offset()
  var offs = offact.left
  $("header nav span")
    .css({ display: "block", width: act.outerWidth() + "px", height: $("header nav").height() })
    .animate({ left: offact.left + "px" })
  $("header nav a").mouseover(function () {
    var offact2 = $(this).position()
    span.animate({ left: offact2.left, width: $(this).outerWidth() + "px" }, { queue: false })
  })
  $("header nav a").mouseout(() => {
    span.stop().animate({ left: offs + "px", width: act.outerWidth() + "px" })
  })
  /*------*/
  /*------SLider Slides------*/
  $("#slider .slide:first-child").addClass("active")
  $("#slider ul.circ li:first-child, #slider ul li:first-child a").addClass("act")
  $("#slider .slide").css({ display: "none" })
  $("#slider .active").css({ display: "block" })
  $("#slider #slider_contenedor").css({ height: $("#slider .active").height() + "px" })
  $(window).resize((e) => {
    $("#slider #slider_contenedor").css({ height: $("#slider .active").height() + "px" })
  })
  function cambia_slide(num_act) {
    var num = $("#slider .active").attr("id").substr(7, 7)
    var direccion
    if (num < num_act) {
      direccion = -1
    } else {
      direccion = 1
    }
    $("#slider li, #slider li a").removeClass("act")
    $("#slider .btn_slider0" + num_act).addClass("act")
    $("#slider .active").animate({ left: $("#slider .active").width() * direccion + "px" }, function () {
      $(this).css({ display: "none" }).removeClass("active")
      $("#slider #slide_0" + num_act)
        .addClass("active")
        .css({ left: -$("#slider #slide_0" + num_act).width() * direccion + "px", display: "block" })
        .animate({ left: 0 })
    })
  }
  $("#slider ul li, #slider ul li a").click(function () {
    var numero = $(this).attr("class").substr(11, 11)
    var num = $("#slider .active").attr("id").substr(7, 7)
    var number = numero.substr(1, 1)
    if (num != numero) {
      cambia_slide(numero)
    }
  })
  /*--------*/
  //$("#cintillo article").css({"left":($(window).width()-990)/2+"px"});
  var alto = $("#cintillo #formulario").height() + 60
  $("#btn_mail").click(function () {
    if ($(this).hasClass("activo")) {
      $("#cintillo, #container_cintillo").animate({ height: 6 + "px" })
      $(this).removeClass("activo")
    } else {
      $("#cintillo, #container_cintillo").animate({ height: 400 + "px" })
      $(this).addClass("activo")
    }
  })
})

/*-----FORMULARIO DE CONTACTO------*/

function sendform() {
  $("input,textarea").click(function () {
    if ($(this).hasClass("vertodos") == false) {
      $("#mensajecontacto").fadeOut()
    }
  })
  $("input,textarea").focus(function () {
    if ($(this).hasClass("vertodos") == false) {
      var ancho = $(this).width()
      var alto = $(this).height() + 10
      var offset = $(this).position()
      $("#mensajecontacto").animate({
        color: "#000",
        width: ancho + "px",
        top: offset.top + alto + "px",
        left: offset.left - 20 + "px",
      })
    }
  })
  $("input,textarea").blur(function () {
    $(this).css({ border: "1px solid #009cde" })
  })
  var nombre = $("input#nombre").val()
  var mail = $("input#mail").val()
  var telef = $("input#telef").val()
  var empresa = $("input#empresa").val()
  var comment = $("#comment").val()
  var p = $("#mensajecontacto").find("p")

  if (nombre == "" || nombre == "Nombre" || nombre == " ") {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque su nombre</p>").fadeIn()
    $("input#nombre").focus()
    return false
  }
  if (telef == "" || telef == "Nombre" || telef == " ") {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque su n&uacute;mero telef&oacute;nico</p>")
    $("input#telef").focus()
    return false
  }
  if (telef.length < 11) {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque su n&uacute;mero completo con codigo de &aacute;rea</p>")
    $("input#telef").focus()
    return false
  }
  if (mail == "" || mail == " ") {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque su direcci&oacute;n de e-mail</p>")
    $("input#mail").focus()
    return false
  }
  if (mail.indexOf("@") == -1 || mail.indexOf(".") == -1) {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque una direcci&oacute;n E-mail v&aacute;lida</p>")
    $("input#mail").focus()
    return false
  }
  if (comment == "" || comment == " ") {
    p.remove()
    $("#mensajecontacto").show().append("<p>Por favor coloque un comentario</p>")
    $("textarea#comment").focus()
    return false
  }

  var req = "&nombre=" + nombre + "&mail=" + mail + "&telef=" + telef + "&empresa=" + empresa + "&comment=" + comment
  $.ajax({
    type: "POST",
    url: "ajax_resp/process.php",
    data: req,
    success: () => {
      p.remove()
      $("#mensajecontacto")
        .css({ color: "#000" })
        .append("<p>Gracias! su mensaje ha sido enviado, nos comunicaremos con usted a la brevedad.</p>")

      $("#formulario").find("input").val("")
      $("#formulario").find(".btn").val("Enviar")
      $("#formulario").find("textarea").val("")
    },
  })
  return false
}
