# contextmenu
A simple contextmenu module in Javascript Vanilla. [DEMO](http://app.moonshark.fr/contextmenu/)
## How to use

```javascript
showContextMenu(event, menu, [, options]);

element.oncontextmenu = function(event) {
	showContextMenu(event, [
		{
			type: 'button',
			text: 'click me!',
			sub: [
				{
					type: 'button',
					text: 'submenu 1',
					sub: [
						{
							type: 'infos',	
							text: 'sub submenu 1'
						}, {
							type: 'infos',	
							text: 'sub submenu 2'
						}
					]
				}
			],
			onclick: function(event) {
				alert(event);
			}
		}, {
			type: 'infos',
			text: 'another one'
		}, {
			type: 'html',
			text: '<div>and the last</div>'
		}
	], {
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
show an arrow, or not:
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
define a width in pixel or percent for the menu

	width: '55%'
	width: '234px' // (width: '234' is the same)
	
### options.margin
add margin in pixel	

	margin: {
		top: 5,
		right: 0,
		bottom: 5,
		left: 0
	}
	
## embeded functions
### hideContextMenu
hide all context menu
```javascript
hideContextMenu()
```
### hideContextMenuChild
hide submenus after a level
```javascript
hideContextMenuChild(0) //hide all submenu
```
### addEvents
add multiple events with addEventListener or attachEvent
```javascript
addEvents(
	window, //element
	'keydown resize dragover click contextmenu DOMMouseScroll wheel mousewheel touch', //events
	hideContextMenu //handler
);
```
### removeEvents
remove multiple events with removeEventListener or detachEvent
```javascript
removeEvents(
	window, //element
	'keydown resize dragover click contextmenu DOMMouseScroll wheel mousewheel touch', //events
	hideContextMenu //handler
);
```
