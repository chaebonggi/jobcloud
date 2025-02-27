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

    // 테이블 정렬 버튼
    $(".sort-btn").on("click", function () {
        $(this).toggleClass("active");
        $(this).closest(".input-group").next(".sort-group").stop(true, true).slideToggle();
    });
    // 토글 버튼
    $(".toggle-btn").on("click", function () {
        $(this).toggleClass("active");
    });
    //필터 버튼
    $('.filter-btn').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.items-group').find('.filter-item').slideToggle();
    });
    // 정렬 추가
    $(".sort-add-btn").on("click", function () {
        let $wrap = $(this).closest(".sort-controls").find(".sort-options");
        $(this).toggleClass("active");
        $wrap.slideToggle();
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
        isAllowed: function (cEl, hint, target) {
            var currentDepth = cEl.parents('ul').length;  // 드래그하는 요소(현재)의 깊이
            var targetDepth = target.parents('ul').length; // 이동 대상 위치(목표)의 깊이

            // 같은 단계(Depth)에서만 이동 가능
            if (currentDepth !== targetDepth) {
                return false;
            }

            // 대메뉴(1단계)가 다른 대메뉴의 자식이 되는 것을 방지
            if (currentDepth === 1 && target.closest('ul').length > 1) {
                return false;
            }

            hint.css('background-color', '#ddd');
            return true;
        }
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




});