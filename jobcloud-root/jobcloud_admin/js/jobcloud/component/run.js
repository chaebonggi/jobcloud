$(document).ready(function () {
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
        let $btn = $wrap.siblings(".sort-add-btn");
        $btn.removeClass("active");
        $wrap.slideUp();
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

    // 드랍 토글 메뉴
    $(".drop-menu").on("click", function () {
        const target = $(this).data("target");
        const $targetDropdown = $(`.drop-cont[data-target="${target}"]`);
        $targetDropdown.slideToggle(300);
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
    
});