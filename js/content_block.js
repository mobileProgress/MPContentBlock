/*  MPContentBlock
    Copyright (C) 2013 Мобилен прогрес ЕООД, София, България

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    Linking "MPContentBlock" statically or dynamically with 
    other modules is making a combined work based on MPContentBlock. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "MPContentBlock" give you permission to combine 
    "MPContentBlock" with free software programs or 
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "MPContentBlock" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "MPContentBlock" 
    are not obligated to grant these special exceptions for their 
    modified versions; it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;
*/

var cur_content_block = 0;
var is_animate_auto = 0;

/*
 * content_block_animate
 *
 * updates the contents of the parent_el
 * parent_el - the parent element of the animations
 * content_arr - the contents of parent_el to animate
 * time - the time interval between changeing contents
 */
function content_block_animate(content_arr, parent_el, time)
{
    var add_el = $(content_arr[cur_content_block]).first();
    add_el = add_el.clone();
    add_el[0].className = "cb right_end";

    //insert the new element on the right end
    $(parent_el).last().after(add_el);

    setTimeout(function () {
        add_el[0].className = "cb";
	//animate the first element to the left
	$(parent_el).first()[0].className = "cb left_end"
	setTimeout(function() {
            $(parent_el).first().replaceWith("");
	}, 1000);
    }, 50);

    ++cur_content_block;
    if(cur_content_block >= content_arr.length)
    {
	cur_content_block = 0;
    }
    setTimeout(function (){
	content_block_animate(content_arr, parent_el, time);
    }, time);
    
}

function content_block_auto_animate(parent_el, time) {
    if(is_animate_auto) {
	return;
    } else {
	is_animate_auto = 1;
    }
    els = $(".cb_hidden");
    els.each(function(index, el) {
	center_content(el, parent_el);
    });
    els = $(".cb_hidden");
    
    content_block_animate(els, parent_el, time);
}

/*
 * center_content
 *
 * centers "content_el" in it's paretn "parent_el"
 */
function center_content(content_el, parent_el) {
    parent_width = parseFloat($(parent_el).css("width"));
    content_width = parseFloat($(content_el).css("width"));
    parent_height = parseFloat($(parent_el).css("height"));
    content_height = parseFloat($(content_el).css("height"));

    width_value = (parent_width - content_width) / 2.0 + "px";
    height_value = (parent_height - content_height) / 2.0 + "px";

    $(content_el).css("padding-left", width_value);
    $(content_el).css("padding-right", width_value);
    $(content_el).css("padding-top", height_value);
    $(content_el).css("padding-bottom", height_value);
}

