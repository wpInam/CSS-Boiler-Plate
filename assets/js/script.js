jQuery(document).ready(function ($) {
    /**
     * Toggles
        * Tab Section
     * Ajax Calls
     * Post table of content
     *
     */

    // --- Toggles
    $('.map-items').click(function () {
        $(this).find('p').slideToggle().toggleClass('p-show')
    })

    $('.close-hamb, .hum-btn').click(function () {
        $('.desktop-header-menu').toggleClass('mobile-head-show')
    })

    $('.post-toggle-mbl').click(function () {
        $('.post-useful-data').toggleClass('post-useful-data-show')
    })

    // --- Tab Section
    $('.our-story-container .tabs-container a').click(function (e) {
        e.preventDefault();
        var btn_index = $(this).data('index');

        // --- Buttons
        $('.our-story-container .tabs-container a').removeClass('active-tab');
        $(this).addClass('active-tab');

        // --- Paragraph
        $('.tab-toggle-content p').addClass('hide');
        $('.toggleitem-' + btn_index).removeClass('hide');

    });

    // --- Ajax Calls

    // --- Tool Ajax Call
    $('#form_tool_story_gen').submit(function (event) {
        // Prevent default form submission
        event.preventDefault()

        $('#story-gen').addClass('loader')
        // Collect form data
        var formData = $(this).serialize()

        // Send AJAX request
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            success: function (response) {
                $('#story-gen').removeClass('loader')
                $('.essay-gen').addClass('show')

                $('.essay-gen-content').html(response.paragraph)
                $('#contactForm')[0].reset()
            },
            error: function (xhr, status, error) {
                $('#story-gen').removeClass('loader')
                // Error: show error message
                alert('Form submission failed. ' + error)
            }
        })
    })

    // --- Contact Form Ajax Call
    $('#contact-us').submit(function (event) {
        // Prevent default form submission
        event.preventDefault()

        $('.contact-form-submit-btn').addClass('loader')
        // Collect form data
        var formData = $(this).serialize()

        // Send AJAX request
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            success: function (response) {
                $('.contact-form-submit-btn').removeClass('loader')

                //--- Show Success Message
                $('.success-message').remove()
                $('.success').append(
                    '<div class="success-message">Form Submitted Successfully.</div>'
                )
                //--- End Show Success Message

                $('#contact-us')[0].reset()
            },
            error: function (response) {
                $('.contact-form-submit-btn').removeClass('loader')

                // --- Show Error Message
                $('.error').remove()
                $.each(
                    response.responseJSON.errors,
                    function (field_name, error) {
                        $(document)
                            .find('[name=' + field_name + ']')
                            .after('<div class="error">' + error + '</div>')
                    }
                )
                // --- End Show Error Message
            }
        })
    })

    // --- Post table of content
    $('.article-txt-content') .find('h1, h2, h3, h4, h5, h6').each(function (index) {
        $(this).attr('id', `postheading_${index}`)
        // Generate a table of contents item and append it to the list
        var title = $(this).text()
        var listItem =
            `<li><a href='#postheading_${index}'>` + title + '</a></li>'
        $('.tbl-of-content ol').append(listItem)

        // Add click event to smoothly scroll to corresponding heading
        $(this).on('click', function () {
            $('html, body').animate(
                {
                    scrollTop: $(this).offset().top
                },
                1000
            )
        })
    })

    $('.tbl-of-content ol li').click(function(){
        if ($('.active-heading').length > 0) {
            $('.active-heading').removeClass('active-heading')
        }
        $(this).addClass('active-heading')

    })
    $('.tbl-of-content ol li:first-child').addClass('active-heading');
    // --- End Post table of content

})
