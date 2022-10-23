function startpage() {
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            document.getElementById("return-to-top").style.display = "block";
        } else {
            document.getElementById("return-to-top").style.display = "none";
        }
    }
    // highlightm active menu 
    $(function() {
        // this will get the full URL at the address bar
        let url = window.location.href;

        // passes on every "a" tag 
        $("#nav a").each(function() {
            // checks if its the same on the address bar
            if (url == (this.href)) {
                $(this).closest("li a").addClass("active");
            } else if (url.endsWith("dismiss.html") || url.endsWith("insurance.html")) {
                $("#menu > li:nth-child(5)").addClass("active");
            }
        });
        if (url.endsWith("-law/")) {
            $("#menu > li:nth-child(2) > a").addClass("active");
        }
    });
    //highlight the li on the menu
    // $(document).ready(function() {
    //     $("#<?=$current_page?>").addClass("active");
    // });
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}