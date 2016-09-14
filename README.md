# contextmenu
A simple contextmenu module in Javascript Vanilla

## How to use

```javascript
showContextMenu(menu, event [, options]);

element.oncontextmenu = function(event) {
	showContextMenu([
		{
			type: 'button',
			text: 'click me!',
			sub: [{
				type: 'button',
				text: 'click me!'
			}],
			onclick: function(event) {
				alert(event);
			}
		}
	], event, {
		arrow: true, 
		align: 'center', 
		element: element, 
		toggleClass: element, 
		width: '100%', 
		margin: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	});
};
```

## menu
Objects array
### menu.object.text
string or HTML code when type: 'html'
### menu.object.type
'button', 'infos', 'html', 'button' by default
when 'html', you can put HTML code on the text
	
	type: 'html',
	text: '<div>Hello</div>'
	
### menu.object.onclick
add a function on click

	onclick: function(event) {
		alert(event);
	}
	
### menu.object.sub
submenu, same syntax than menu

## options
### options.arrow
show an arrow:
true or false, false by default.

	arrow: true
	
### options.align
align the context menu horizontally:
'center', 'left', 'right' or false, false by default.

	align: 'center'
	
### options.element 
align the context menu vertically relatively to an element and add 'contextmenu-active' class to him when the menu is active:

	element: document.getElementById('id')
	
### options.toggleClass
add 'contextmenu-active' class to element when the menu is active

	toggleClass: document.getElementById('id')
	
### options.width
define a width for the menu

	width: '55%'
	width: '234px' // (width: '234' id the same)
	
### options.margin
add margin	

	margin: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
	
