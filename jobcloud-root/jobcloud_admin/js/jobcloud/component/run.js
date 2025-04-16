
$(document).ready(function () {
//    includehtml();
    $(".all").on("click", function () {
        $("#mobile-nav").addClass("is-open");
        $("html").css('overflow', 'hidden')
    });
    $("#close-nav").on("click", function () {
        $("#mobile-nav").removeClass("active");
        $("html").css('overflow', 'revert-layer')
    });

    const $btnGnb = $("#jc-header .header-top .btn-gnb");
    function toggleMenuState() {
        $("#jc-header").toggleClass("header-small")
        $("#container").toggleClass("container-small");
        $("#jc-footer").toggleClass("footer-small");
        $btnGnb.toggleClass("open");
    }
    $btnGnb.on("click", toggleMenuState);
    $(".gnb-list").on("click", "li .btn-op", function () {
        $(this).parent().addClass("active").siblings().removeClass("active");
    });

    function removeClassesOnResize() {
        if ($(window).width() <= 1024) {
            $("#jc-header").removeClass("header-small");
            $("#container").removeClass("container-small");
            $("#jc-footer").removeClass("footer-small");
            $btnGnb.removeClass("open");
        }
    }

    $(window).on("resize", removeClassesOnResize);
    removeClassesOnResize();

    // 토글 버튼
    $(".toggle-btn").on("click", function () {
        $(this).toggleClass("active");
    });
    //필터 버튼
    $('.filter-btn').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.items-group').find('.filter-item').slideToggle();
    });

    $(".sort-cancel-btn").on("click", function () {
        let $wrap = $(this).closest(".sort-options");
        $wrap.removeClass("active is-open");
    });

    // 테이블 상세 버튼
    $('.switch-group input[type="radio"]').change(function () {
        var $tableGroup = $(this).closest('.table-group');
        var $table = $tableGroup.find('.krds-table-wrap.tbl-type table');
        if ($tableGroup.find('#radio-one').is(':checked')) {
            $table.find('.detail').hide();
        } else {
            $table.find('.detail').show();
        }
    });
    // tree 메뉴
    var options = {
        placeholderCss: {
            'background-color': '#eee'
        },
        hintCss: {
            'background-color': '#ddd'
        },
        ignoreClass: 'clickable',
    };    
    $('#sTree2').sortableLists(options);
    $('.sTree .tree-btn').click(function () {
        $(this).parent().parent().parent().parent().toggleClass('s-l-open');
        if ($(this).parent().parent().parent().parent().hasClass("s-l-open")) {
            $(this).parent().parent().parent().parent().children('ul').show();
        } else if (!$(this).parent().parent().parent().parent().hasClass("s-l-open")) {
            $(this).parent().parent().parent().parent().children('ul').hide();
        }
    });
       $('.all-view').click(function () {
       $('.sTree > li  ul').show();
       $('.sTree  li').addClass('s-l-open');
    });
    $('.all-fold').click(function () {
        $('.sTree > li  ul').hide();
        $('.sTree  li').removeClass('s-l-open');
    });

    // 사이드 메뉴
    $(".side-open-btn").on("click", function () {
        $(".side-menu").addClass("is-open");
    });
    $(".side-close-btn").on("click", function () {
        $(".side-menu").removeClass("is-open");
    });

    // 탭메뉴
    $(".tabs li a").click(function () {
        $(this).parent().siblings("li").removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().parent().parent().find(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
    });

    // 라디오 버튼 드랍 메뉴
    let previousTarget = null;
    $('input[type="radio"]').on('change', function () {
        const $dropRadio = $(".drop-radio-menu:checked");
        const currentTarget = $dropRadio.data("target");
        const $currentTargetDropdown = $(`.drop-cont[data-target="${currentTarget}"]`);

        if (previousTarget && previousTarget !== currentTarget) {
            const $previousTargetDropdown = $(`.drop-cont[data-target="${previousTarget}"]`);
            $previousTargetDropdown.removeClass('is-open');
        }
        if ($dropRadio.length) {
            $currentTargetDropdown.addClass('is-open');
        }
        previousTarget = currentTarget;
    });
    $(".drop-cont").removeClass('is-open');
    
    // 드랍 토글 메뉴
    $(".drop-menu").on("click", function () {
        const target = $(this).data("target");
        const $targetDropdown = $(`.drop-cont[data-target="${target}"]`);
        $targetDropdown.toggleClass('is-open');
        $(this).toggleClass("active");
        $targetDropdown.toggleClass("active");
    });

    // 드랍 메뉴2
    $(".dropdown-btn").on("click", function (event) {
        event.stopPropagation();
        const target = $(this).data("target");
        const targetDropdown = $(`.dropdown-cont[data-target="${target}"]`);
        $(".dropdown-cont").not(targetDropdown).removeClass("show");
        targetDropdown.toggleClass("show");
      });
    $(document).on("click", function () {
        $(".dropdown-cont").removeClass("show");
    });

    // drop select cont
    const $select = $(".drop-sel");
    const $selbox = $(".drop-sel-cont");
    $select.on("change", function () {
        const $selectedOption = $(this).find(":selected");
        if ($selectedOption.hasClass("drop-sel-btn")) {
            $selbox.show();
        } else {
            $selbox.hide();
        }
    });
    // 초기 상태 설정
    if ($select.find(":selected").hasClass("drop-sel-btn")) {
        $selbox.show();
    } else {
        $selbox.hide();
    }


    // order-btn 태그 순서 이동
    $(document).on('click', '.c-item-list .order-btn', function() {
        const button = $(this);
        const curRow = button.closest('li');
        const list = button.closest('.c-item-list').find('ul'); 
        const listCnt = list.children('li').length;
        const curRowIdx = curRow.index();    
        if (button.hasClass('order-up') && curRowIdx > 0) {
            curRow.fadeOut(100, function() {
                $(this).prev().before(this);
                $(this).fadeIn();
            });
        } else if (button.hasClass('order-down') && curRowIdx < listCnt - 1) {
            curRow.fadeOut(100, function() {
                $(this).next().after(this);
                $(this).fadeIn();
            });
        }
    });

    // select 별점 메뉴
    $(".star-menu .select-btn").click(function(){
        $(this).parents().addClass("active");
    });
    $(".star-menu .options li").click(function(){
        var defaultOption = $(this).html();
        $(".star-menu .select-btn li").html(defaultOption);
        $(this).parents(".star-menu").removeClass("active");
    });
    
    // 신규메일 select list
    $(".sel-list-wrap .sel-item[data-value='option6'] .list-option > li").hide();
    $(".date-single-container").hide();
    $(".date-range-container").hide();

    $(".sel-list-wrap .sel-list").change(function() {
        var selectedValue = $(this).val();
        var $parent = $(this).closest(".sel-item");

        $parent.find(".list-option > li").hide();

        $parent.find(".list-option > li[data-value='" + selectedValue + "']").show();

        if (selectedValue === 'option6') {
            var $dateSelect = $parent.find(".list-option > li[data-value='option6'] .date-type-select");
            var $singleDateDiv = $parent.find(".date-single-container");
            var $rangeDateDiv = $parent.find(".date-range-container");

            $singleDateDiv.hide();
            $rangeDateDiv.hide();

            $dateSelect.change(function() {
                var dateSelectValue = $(this).val();

                if (dateSelectValue === 'type01' || dateSelectValue === 'type02') {
                    $singleDateDiv.show();
                    $rangeDateDiv.hide();
                } else if (dateSelectValue === 'type03') {
                    $singleDateDiv.hide();
                    $rangeDateDiv.show();
                } else {
                    $singleDateDiv.hide();
                    $rangeDateDiv.hide();
                }
            });
        }
    });
    
   
});
// function includehtml() {
//     var allElements = $(".include_wrap");
//     Array.prototype.forEach.call(allElements, function (el) {
//       var includePath = el.dataset.includePath;
//       console.log(includePath);
//       if (includePath) {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//           if (this.readyState == 4 && this.status == 200) {
//             el.outerHTML = this.responseText;
//           }
//         };
//         xhttp.open('GET', includePath, false);
//         xhttp.send();
//       }
//     });
//   }