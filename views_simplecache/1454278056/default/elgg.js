if (typeof elgg != 'object') {
	throw new Error('elgg configuration object is not defined! You must include the js/initialize_elgg view in html head before JS library files!');
}
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2010.09.06 - 0.7-beta1
  - features: vsprintf, support for named placeholders
  - enhancements: format cache, reduced global namespace pollution

2010.05.22 - 0.6:
 - reverted to 0.4 and fixed the bug regarding the sign of the number 0
 Note:
 Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
 who warned me about a bug in 0.5, I discovered that the last update was
 a regress. I appologize for that.

2010.05.09 - 0.5:
 - bug fix: 0 is now preceeded with a + sign
 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
 - switched from GPL to BSD license

2007.10.21 - 0.4:
 - unit test and patch (David Baird)

2007.09.17 - 0.3:
 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)

2007.09.11 - 0.2:
 - feature: added argument swapping

2007.04.03 - 0.1:
 - initial release
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

var vsprintf = function(fmt, argv) {
	argv.unshift(fmt);
	return sprintf.apply(null, argv);
};
/**
 * @namespace Singleton object for holding the Elgg javascript library
 */
var elgg = elgg || {};

/**
 * Pointer to the global context
 *
 * @see elgg.require
 * @see elgg.provide
 */
elgg.global = this;

/**
 * Duplicate of the server side ACCESS_PRIVATE access level.
 *
 * This is a temporary hack to prevent having to mix up js and PHP in js views.
 */
elgg.ACCESS_PRIVATE = 0;

/**
 * Convenience reference to an empty function.
 *
 * Save memory by not generating multiple empty functions.
 */
elgg.nullFunction = function() {};

/**
 * This forces an inheriting class to implement the method or
 * it will throw an error.
 *
 * @example
 * AbstractClass.prototype.toBeImplemented = elgg.abstractMethod;
 */
elgg.abstractMethod = function() {
	throw new Error("Oops... you forgot to implement an abstract method!");
};

/**
 * Merges two or more objects together and returns the result.
 */
elgg.extend = jQuery.extend;

/**
 * Check if the value is an array.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isArray = jQuery.isArray;

/**
 * Check if the value is a function.
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isFunction = jQuery.isFunction;

/**
 * Check if the value is a "plain" object (i.e., created by {} or new Object())
 *
 * No sense in reinventing the wheel!
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isPlainObject = jQuery.isPlainObject;

/**
 * Check if the value is a string
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isString = function(val) {
	return typeof val === 'string';
};

/**
 * Check if the value is a number
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNumber = function(val) {
	return typeof val === 'number';
};

/**
 * Check if the value is an object
 *
 * @note This returns true for functions and arrays!  If you want to return true only
 * for "plain" objects (created using {} or new Object()) use elgg.isPlainObject.
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isObject = function(val) {
	return typeof val === 'object';
};

/**
 * Check if the value is undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isUndefined = function(val) {
	return val === undefined;
};

/**
 * Check if the value is null
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNull = function(val) {
	return val === null;
};

/**
 * Check if the value is either null or undefined
 *
 * @param {*} val
 *
 * @return boolean
 */
elgg.isNullOrUndefined = function(val) {
	return val == null;
};

/**
 * Throw an exception of the type doesn't match
 *
 * @todo Might be more appropriate for debug mode only?
 */
elgg.assertTypeOf = function(type, val) {
	if (typeof val !== type) {
		throw new TypeError("Expecting param of " +
							arguments.caller + "to be a(n) " + type + "." +
							"  Was actually a(n) " + typeof val + ".");
	}
};

/**
 * Throw an error if the required package isn't present
 *
 * @param {String} pkg The required package (e.g., 'elgg.package')
 */
elgg.require = function(pkg) {
	elgg.assertTypeOf('string', pkg);

	var parts = pkg.split('.'),
		cur = elgg.global,
		part, i;

	for (i = 0; i < parts.length; i += 1) {
		part = parts[i];
		cur = cur[part];
		if (elgg.isUndefined(cur)) {
			throw new Error("Missing package: " + pkg);
		}
	}
};

/**
 * Generate the skeleton for a package.
 *
 * <pre>
 * elgg.provide('elgg.package.subpackage');
 * </pre>
 *
 * is equivalent to
 *
 * <pre>
 * elgg = elgg || {};
 * elgg.package = elgg.package || {};
 * elgg.package.subpackage = elgg.package.subpackage || {};
 * </pre>
 *
 * @example elgg.provide('elgg.config.translations')
 *
 * @param {string} pkg The package name.
 */
elgg.provide = function(pkg, opt_context) {
	elgg.assertTypeOf('string', pkg);

	var parts = pkg.split('.'),
		context = opt_context || elgg.global,
		part, i;


	for (i = 0; i < parts.length; i += 1) {
		part = parts[i];
		context[part] = context[part] || {};
		context = context[part];
	}
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @example
 * <pre>
 * function ParentClass(a, b) { }
 *
 * ParentClass.prototype.foo = function(a) { alert(a); }
 *
 * function ChildClass(a, b, c) {
 *     //equivalent of parent::__construct(a, b); in PHP
 *     ParentClass.call(this, a, b);
 * }
 *
 * elgg.inherit(ChildClass, ParentClass);
 *
 * var child = new ChildClass('a', 'b', 'see');
 * child.foo('boo!'); // alert('boo!');
 * </pre>
 *
 * @param {Function} Child Child class constructor.
 * @param {Function} Parent Parent class constructor.
 */
elgg.inherit = function(Child, Parent) {
	Child.prototype = new Parent();
	Child.prototype.constructor = Child;
};

/**
 * Converts shorthand urls to absolute urls.
 *
 * If the url is already absolute or protocol-relative, no change is made.
 *
 * elgg.normalize_url('');                   // 'http://my.site.com/'
 * elgg.normalize_url('dashboard');          // 'http://my.site.com/dashboard'
 * elgg.normalize_url('http://google.com/'); // no change
 * elgg.normalize_url('//google.com/');      // no change
 *
 * @param {String} url The url to normalize
 * @return {String} The extended url
 */
elgg.normalize_url = function(url) {
	url = url || '';
	elgg.assertTypeOf('string', url);

	function validate(url) {
		url = elgg.parse_url(url);
		if (url.scheme){
			url.scheme = url.scheme.toLowerCase();
		}
		if (url.scheme == 'http' || url.scheme == 'https') {
			if (!url.host) {
				return false;
			}
			/* hostname labels may contain only alphanumeric characters, dots and hypens. */
			if (!(new RegExp("^([a-zA-Z0-9][a-zA-Z0-9\\-\\.]*)$", "i")).test(url.host) || url.host.charAt(-1) == '.') {
				return false;
			}
		}
		/* some schemas allow the host to be empty */
		if (!url.scheme || !url.host && url.scheme != 'mailto' && url.scheme != 'news' && url.scheme != 'file') {
			return false;
		}
		return true;
	};

	// ignore anything with a recognized scheme
	if (url.indexOf('http:') === 0 ||
		url.indexOf('https:') === 0 ||
		url.indexOf('javascript:') === 0 ||
		url.indexOf('mailto:') === 0 ) {
		return url;
	}

	// all normal URLs including mailto:
	else if (validate(url)) {
		return url;
	}

	// '//example.com' (Shortcut for protocol.)
	// '?query=test', #target
	else if ((new RegExp("^(\\#|\\?|//)", "i")).test(url)) {
		return url;
	}


	// watch those double escapes in JS.

	// 'install.php', 'install.php?step=step'
	else if ((new RegExp("^[^\/]*\\.php(\\?.*)?$", "i")).test(url)) {
		return elgg.config.wwwroot + url.ltrim('/');
	}

	// 'example.com', 'example.com/subpage'
	else if ((new RegExp("^[^/]*\\.", "i")).test(url)) {
		return 'http://' + url;
	}

	// 'page/handler', 'mod/plugin/file.php'
	else {
		// trim off any leading / because the site URL is stored
		// with a trailing /
		return elgg.config.wwwroot + url.ltrim('/');
	}
};

/**
 * Displays system messages via javascript rather than php.
 *
 * @param {String} msgs The message we want to display
 * @param {Number} delay The amount of time to display the message in milliseconds. Defaults to 6 seconds.
 * @param {String} type The type of message (typically 'error' or 'message')
 * @private
 */
elgg.system_messages = function(msgs, delay, type) {
	if (elgg.isUndefined(msgs)) {
		return;
	}

	var classes = ['elgg-message'],
		messages_html = [],
		appendMessage = function(msg) {
			messages_html.push('<li class="' + classes.join(' ') + '"><p>' + msg + '</p></li>');
		},
		systemMessages = $('ul.elgg-system-messages'),
		i;

	//validate delay.  Must be a positive integer.
	delay = parseInt(delay || 6000, 10);
	if (isNaN(delay) || delay <= 0) {
		delay = 6000;
	}

	//Handle non-arrays
	if (!elgg.isArray(msgs)) {
		msgs = [msgs];
	}

	if (type === 'error') {
		classes.push('elgg-state-error');
	} else {
		classes.push('elgg-state-success');
	}

	msgs.forEach(appendMessage);

	if (type != 'error') {
		$(messages_html.join('')).appendTo(systemMessages)
			.animate({opacity: '1.0'}, delay).fadeOut('slow');
	} else {
		$(messages_html.join('')).appendTo(systemMessages);
	}
};

/**
 * Wrapper function for system_messages. Specifies "messages" as the type of message
 * @param {String} msgs  The message to display
 * @param {Number} delay How long to display the message (milliseconds)
 */
elgg.system_message = function(msgs, delay) {
	elgg.system_messages(msgs, delay, "message");
};

/**
 * Wrapper function for system_messages.  Specifies "errors" as the type of message
 * @param {String} errors The error message to display
 * @param {Number} delay  How long to dispaly the error message (milliseconds)
 */
elgg.register_error = function(errors, delay) {
	elgg.system_messages(errors, delay, "error");
};

/**
 * Logs a notice about use of a deprecated function or capability
 * @param {String} msg         The deprecation message to display
 * @param {Number} dep_version The version the function was deprecated for
 * @since 1.9
 */
elgg.deprecated_notice = function(msg, dep_version) {
	if (elgg.is_admin_logged_in()) {
		var parts = elgg.release.split('.');
		var elgg_major_version = parseInt(parts[0], 10);
		var elgg_minor_version = parseInt(parts[1], 10);
		var dep_major_version = Math.floor(dep_version);
		var dep_minor_version = 10 * (dep_version - dep_major_version);

		msg = "Deprecated in Elgg " + dep_version + ": " + msg;

		if ((dep_major_version < elgg_major_version) || (dep_minor_version < elgg_minor_version)) {
			elgg.register_error(msg);
		} else {
			if (typeof console !== "undefined") {
				console.warn(msg);
			}
		}
	}
};

/**
 * Meant to mimic the php forward() function by simply redirecting the
 * user to another page.
 *
 * @param {String} url The url to forward to
 */
elgg.forward = function(url) {
	location.href = elgg.normalize_url(url);
};

/**
 * Parse a URL into its parts. Mimicks http://php.net/parse_url
 *
 * @param {String} url       The URL to parse
 * @param {Int}    component A component to return
 * @param {Bool}   expand    Expand the query into an object? Else it's a string.
 *
 * @return {Object} The parsed URL
 */
elgg.parse_url = function(url, component, expand) {
	// Adapted from http://blog.stevenlevithan.com/archives/parseuri
	// which was release under the MIT
	// It was modified to fix mailto: and javascript: support.
	expand = expand || false;
	component = component || false;
	
	var re_str =
			// scheme (and user@ testing)
			'^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?'
			// possibly a user[:password]@
			+ '((?:(([^:@]*)(?::([^:@]*))?)?@)?'
			// host and port
			+ '([^:/?#]*)(?::(\\d*))?)'
			// path
			+ '(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))'
			// query string
			+ '(?:\\?([^#]*))?'
			// fragment
			+ '(?:#(.*))?)',
		keys = {
			1: "scheme",
			4: "user",
			5: "pass",
			6: "host",
			7: "port",
			9: "path",
			12: "query",
			13: "fragment"
		},
		results = {};

	if (url.indexOf('mailto:') === 0) {
		results['scheme'] = 'mailto';
		results['path'] = url.replace('mailto:', '');
		return results;
	}

	if (url.indexOf('javascript:') === 0) {
		results['scheme'] = 'javascript';
		results['path'] = url.replace('javascript:', '');
		return results;
	}

	var re = new RegExp(re_str);
	var matches = re.exec(url);

	for (var i in keys) {
		if (matches[i]) {
			results[keys[i]] = matches[i];
		}
	}

	if (expand && typeof(results['query']) != 'undefined') {
		results['query'] = elgg.parse_str(results['query']);
	}

	if (component) {
		if (typeof(results[component]) != 'undefined') {
			return results[component];
		} else {
			return false;
		}
	}
	return results;
};

/**
 * Returns an object with key/values of the parsed query string.
 *
 * @param  {String} string The string to parse
 * @return {Object} The parsed object string
 */
elgg.parse_str = function(string) {
	var params = {},
		result,
		key,
		value,
		re = /([^&=]+)=?([^&]*)/g,
		re2 = /\[\]$/;

	// assignment intentional
	while (result = re.exec(string)) {
		key = decodeURIComponent(result[1].replace(/\+/g, ' '));
		value = decodeURIComponent(result[2].replace(/\+/g, ' '));

		if (re2.test(key)) {
			key = key.replace(re2, '');
			if (!params[key]) {
				params[key] = [];
			}
			params[key].push(value);
		} else {
			params[key] = value;
		}
	}
	
	return params;
};

/**
 * Returns a jQuery selector from a URL's fragement.  Defaults to expecting an ID.
 *
 * Examples:
 *  http://elgg.org/download.php returns ''
 *	http://elgg.org/download.php#id returns #id
 *	http://elgg.org/download.php#.class-name return .class-name
 *	http://elgg.org/download.php#a.class-name return a.class-name
 *
 * @param {String} url The URL
 * @return {String} The selector
 */
elgg.getSelectorFromUrlFragment = function(url) {
	var fragment = url.split('#')[1];

	if (fragment) {
		// this is a .class or a tag.class
		if (fragment.indexOf('.') > -1) {
			return fragment;
		}

		// this is an id
		else {
			return '#' + fragment;
		}
	}
	return '';
};

/**
 * Adds child to object[parent] array.
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {Mixed}  value  The value
 */
elgg.push_to_object_array = function(object, parent, value) {
	elgg.assertTypeOf('object', object);
	elgg.assertTypeOf('string', parent);

	if (!(object[parent] instanceof Array)) {
		object[parent] = [];
	}

	if ($.inArray(value, object[parent]) < 0) {
		return object[parent].push(value);
	}

	return false;
};

/**
 * Tests if object[parent] contains child
 *
 * @param {Object} object The object to add to
 * @param {String} parent The parent array to add to.
 * @param {Mixed}  value  The value
 */
elgg.is_in_object_array = function(object, parent, value) {
	elgg.assertTypeOf('object', object);
	elgg.assertTypeOf('string', parent);

	return typeof(object[parent]) != 'undefined' && $.inArray(value, object[parent]) >= 0;
};

/**
 * Create a new ElggEntity
 * 
 * @class Represents an ElggEntity
 * @property {number} guid
 * @property {string} type
 * @property {string} subtype
 * @property {number} owner_guid
 * @property {number} site_guid
 * @property {number} container_guid
 * @property {number} time_created
 * @property {number} time_updated
 * @property {string} url
 * 
 */
elgg.ElggEntity = function(o) {
	$.extend(this, o);
};
/**
 * Create a new ElggUser
 *
 * @param {Object} o
 * @extends ElggEntity
 * @class Represents an ElggUser
 * @property {string} name
 * @property {string} username
 * @property {string} language
 * @property {boolean} admin
 */
elgg.ElggUser = function(o) {
	elgg.ElggEntity.call(this, o);
};

elgg.inherit(elgg.ElggUser, elgg.ElggEntity);

/**
 * Is this user an admin?
 *
 * @warning The admin state of the user should be checked on the server for any
 * actions taken that require admin privileges.
 *
 * @return {boolean}
 */
elgg.ElggUser.prototype.isAdmin = function() {
	return this.admin;
};
/**
 * Priority lists allow you to create an indexed list that can be iterated through in a specific
 * order.
 */
elgg.ElggPriorityList = function() {
	this.length = 0;
	this.priorities_ = [];
};

/**
 * Inserts an element into the priority list at the priority specified.
 *
 * @param {Object} obj          The object to insert
 * @param {Number} opt_priority An optional priority to insert at.
 * 
 * @return {Void}
 */
elgg.ElggPriorityList.prototype.insert = function(obj, opt_priority) {
	var priority = 500;
	if (arguments.length == 2 && opt_priority !== undefined) {
		priority = parseInt(opt_priority, 10);
	}

	priority = Math.max(priority, 0);

	if (elgg.isUndefined(this.priorities_[priority])) {
		this.priorities_[priority] = [];
	}

	this.priorities_[priority].push(obj);
	this.length++;
};

/**
 * Iterates through each element in order.
 *
 * Unlike every, this ignores the return value of the callback.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
elgg.ElggPriorityList.prototype.forEach = function(callback) {
	elgg.assertTypeOf('function', callback);

	var index = 0;

	this.priorities_.forEach(function(elems) {
		elems.forEach(function(elem) {
			callback(elem, index++);
		});
	});

	return this;
};

/**
 * Iterates through each element in order.
 *
 * Unlike forEach, this returns the value of the callback and will break on false.
 *
 * @param {Function} callback The callback function to pass each element through. See
 *                            Array.prototype.every() for details.
 * @return {Object}
 */
elgg.ElggPriorityList.prototype.every = function(callback) {
	elgg.assertTypeOf('function', callback);

	var index = 0;

	return this.priorities_.every(function(elems) {
		return elems.every(function(elem) {
			return callback(elem, index++);
		});
	});
};

/**
 * Removes an element from the priority list
 *
 * @param {Object} obj The object to remove.
 * @return {Void}
 */
elgg.ElggPriorityList.prototype.remove = function(obj) {
	this.priorities_.forEach(function(elems) {
		var index;
		while ((index = elems.indexOf(obj)) !== -1) {
			elems.splice(index, 1);
			this.length--;
		}
	});
};
/**
 * Interates through each element of an array and calls a callback function.
 * The callback should accept the following arguments:
 *	element - The current element
 *	index	- The current index
 *
 * This is different to Array.forEach in that if the callback returns false, the loop returns
 * immediately without processing the remaining elements.
 *
 *	@param {Function} callback
 *	@return {Bool}
 */
if (!Array.prototype.every) {
	Array.prototype.every = function(callback) {
		var len = this.length, i;

		for (i = 0; i < len; i++) {
			if (i in this && !callback.call(null, this[i], i)) {
				return false;
			}
		}

		return true;
	};
}

/**
 * Interates through each element of an array and calls callback a function.
 * The callback should accept the following arguments:
 *	element - The current element
 *	index	- The current index
 *
 * This is different to Array.every in that the callback's return value is ignored and every
 * element of the array will be parsed.
 *
 *	@param {Function} callback
 *	@return {Void}
 */
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback) {
		var len = this.length, i;

		for (i = 0; i < len; i++) {
			if (i in this) {
				callback.call(null, this[i], i);
			}
		}
	};
}

/**
 * Left trim
 *
 * Removes a character from the left side of a string.
 * @param {String} str The character to remove
 * @return {String}
 */
if (!String.prototype.ltrim) {
	String.prototype.ltrim = function(str) {
		if (this.indexOf(str) === 0) {
			return this.substring(str.length);
		} else {
			return this;
		}
	};
}
/*
 * Javascript hook interface
 */

elgg.provide('elgg.config.hooks');
elgg.provide('elgg.config.instant_hooks');
elgg.provide('elgg.config.triggered_hooks');

/**
 * Registers a hook handler with the event system.
 *
 * The special keyword "all" can be used for either the name or the type or both
 * and means to call that handler for all of those hooks.
 *
 * Note that handlers registering for instant hooks will be executed immediately if the instant
 * hook has been previously triggered.
 *
 * @param {String}   name     Name of the plugin hook to register for
 * @param {String}   type     Type of the event to register for
 * @param {Function} handler  Handle to call
 * @param {Number}   priority Priority to call the event handler
 * @return {Bool}
 */
elgg.register_hook_handler = function(name, type, handler, priority) {
	elgg.assertTypeOf('string', name);
	elgg.assertTypeOf('string', type);
	elgg.assertTypeOf('function', handler);

	if (!name || !type) {
		return false;
	}

	var priorities =  elgg.config.hooks;

	elgg.provide(name + '.' + type, priorities);

	if (!(priorities[name][type] instanceof elgg.ElggPriorityList)) {
		priorities[name][type] = new elgg.ElggPriorityList();
	}

	// call if instant and already triggered.
	if (elgg.is_instant_hook(name, type) && elgg.is_triggered_hook(name, type)) {
		handler(name, type, null, null);
	}

	return priorities[name][type].insert(handler, priority);
};

/**
 * Emits a hook.
 *
 * Loops through all registered hooks and calls the handler functions in order.
 * Every handler function will always be called, regardless of the return value.
 *
 * @warning Handlers take the same 4 arguments in the same order as when calling this function.
 * This is different from the PHP version!
 *
 * @note Instant hooks do not support params or values.
 *
 * Hooks are called in this order:
 *	specifically registered (event_name and event_type match)
 *	all names, specific type
 *	specific name, all types
 *	all names, all types
 *
 * @param {String} name   Name of the hook to emit
 * @param {String} type   Type of the hook to emit
 * @param {Object} params Optional parameters to pass to the handlers
 * @param {Object} value  Initial value of the return. Can be mangled by handlers
 *
 * @return {Bool}
 */
elgg.trigger_hook = function(name, type, params, value) {
	elgg.assertTypeOf('string', name);
	elgg.assertTypeOf('string', type);

	// mark as triggered
	elgg.set_triggered_hook(name, type);

	// default to null if unpassed
	value = !elgg.isNullOrUndefined(value) ? value : null;

	var hooks = elgg.config.hooks,
		tempReturnValue = null,
		returnValue = value,
		callHookHandler = function(handler) {
			tempReturnValue = handler(name, type, params, returnValue);
			if (!elgg.isNullOrUndefined(tempReturnValue)) {
				returnValue = tempReturnValue;
			}
		};

	elgg.provide(name + '.' + type, hooks);
	elgg.provide('all.' + type, hooks);
	elgg.provide(name + '.all', hooks);
	elgg.provide('all.all', hooks);

	var hooksList = [];
	
	if (name != 'all' && type != 'all') {
		hooksList.push(hooks[name][type]);
	}

	if (type != 'all') {
		hooksList.push(hooks['all'][type]);
	}

	if (name != 'all') {
		hooksList.push(hooks[name]['all']);
	}

	hooksList.push(hooks['all']['all']);

	hooksList.every(function(handlers) {
		if (handlers instanceof elgg.ElggPriorityList) {
			handlers.forEach(callHookHandler);
		}
		return true;
	});

	return returnValue;
};

/**
 * Registers a hook as an instant hook.
 *
 * After being trigger once, registration of a handler to an instant hook will cause the
 * handle to be executed immediately.
 *
 * @note Instant hooks must be triggered without params or defaults. Any params or default
 * passed will *not* be passed to handlers executed upon registration.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 * @return {Int}
 */
elgg.register_instant_hook = function(name, type) {
	elgg.assertTypeOf('string', name);
	elgg.assertTypeOf('string', type);

	return elgg.push_to_object_array(elgg.config.instant_hooks, name, type);
};

/**
 * Is this hook registered as an instant hook?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.is_instant_hook = function(name, type) {
	return elgg.is_in_object_array(elgg.config.instant_hooks, name, type);
};

/**
 * Records that a hook has been triggered.
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.set_triggered_hook = function(name, type) {
	return elgg.push_to_object_array(elgg.config.triggered_hooks, name, type);
};

/**
 * Has this hook been triggered yet?
 *
 * @param {String} name The hook name.
 * @param {String} type The hook type.
 */
elgg.is_triggered_hook = function(name, type) {
	return elgg.is_in_object_array(elgg.config.triggered_hooks, name, type);
};

elgg.register_instant_hook('init', 'system');
elgg.register_instant_hook('ready', 'system');
elgg.register_instant_hook('boot', 'system');

/**
 * Hold security-related data here
 */
elgg.provide('elgg.security.token');

elgg.security.tokenRefreshFailed = false;

elgg.security.tokenRefreshTimer = null;

/**
 * Sets the currently active security token and updates all forms and links on the current page.
 *
 * @param {Object} json The json representation of a token containing __elgg_ts and __elgg_token
 * @return {Void}
 */
elgg.security.setToken = function(json) {	
	//update the convenience object
	elgg.security.token = json;

	//also update all forms
	$('[name=__elgg_ts]').val(json.__elgg_ts);
	$('[name=__elgg_token]').val(json.__elgg_token);

	// also update all links that contain tokens and time stamps
	$('[href*="__elgg_ts"][href*="__elgg_token"]').each(function() {
		this.href = this.href
			.replace(/__elgg_ts=\d*/, '__elgg_ts=' + json.__elgg_ts)
			.replace(/__elgg_token=[0-9a-f]*/, '__elgg_token=' + json.__elgg_token);
	});
};

/**
 * Security tokens time out so we refresh those every so often.
 * 
 * @private
 */
elgg.security.refreshToken = function() {
	elgg.getJSON('refresh_token', function(data) {
		if (data && data.__elgg_ts && data.__elgg_token) {
			elgg.security.setToken(data);
			if (elgg.is_logged_in() && data.logged_in === false) {
				elgg.session.user = null;
				elgg.register_error(elgg.echo('session_expired'));
			}
		}
	});
};


/**
 * Add elgg action tokens to an object, URL, or query string (with a ?).
 *
 * @param {Object|string} data
 * @return {Object} The new data object including action tokens
 * @private
 */
elgg.security.addToken = function(data) {

	// 'http://example.com?data=sofar'
	if (elgg.isString(data)) {
		// is this a full URL, relative URL, or just the query string?
		var parts = elgg.parse_url(data),
			args = {},
			base = '';
		
		if (parts['host'] === undefined) {
			if (data.indexOf('?') === 0) {
				// query string
				base = '?';
				args = elgg.parse_str(parts['query']);
			}
		} else {
			// full or relative URL

			if (parts['query'] !== undefined) {
				// with query string
				args = elgg.parse_str(parts['query']);
			}
			var split = data.split('?');
			base = split[0] + '?';
		}
		args["__elgg_ts"] = elgg.security.token.__elgg_ts;
		args["__elgg_token"] = elgg.security.token.__elgg_token;

		return base + jQuery.param(args);
	}

	// no input!  acts like a getter
	if (elgg.isUndefined(data)) {
		return elgg.security.token;
	}

	// {...}
	if (elgg.isPlainObject(data)) {
		return elgg.extend(data, elgg.security.token);
	}

	// oops, don't recognize that!
	throw new TypeError("elgg.security.addToken not implemented for " + (typeof data) + "s");
};

elgg.security.init = function() {
	// elgg.security.interval is set in the `elgg.js` view.
	elgg.security.tokenRefreshTimer = setInterval(elgg.security.refreshToken, elgg.security.interval);
};

elgg.register_hook_handler('boot', 'system', elgg.security.init);

/*globals vsprintf*/
/**
 * Provides language-related functionality
 */
elgg.provide('elgg.config.translations');

// default language - required by unit tests
elgg.config.language = 'en';

/**
 * Analagous to the php version.  Merges translations for a
 * given language into the current translations map.
 */
elgg.add_translation = function(lang, translations) {
	elgg.provide('elgg.config.translations.' + lang);

	elgg.extend(elgg.config.translations[lang], translations);
};

/**
 * Get the current language
 * @return {String}
 */
elgg.get_language = function() {
	var user = elgg.get_logged_in_user_entity();

	if (user && user.language) {
		return user.language;
	}

	return elgg.config.language;
};

/**
 * Translates a string
 *
 * @param {String} key      The string to translate
 * @param {Array}  argv     vsprintf support
 * @param {String} language The language to display it in
 *
 * @return {String} The translation
 */
elgg.echo = function(key, argv, language) {
	//elgg.echo('str', 'en')
	if (elgg.isString(argv)) {
		language = argv;
		argv = [];
	}

	//elgg.echo('str', [...], 'en')
	var translations = elgg.config.translations,
		dlang = elgg.get_language(),
		map;

	language = language || dlang;
	argv = argv || [];

	map = translations[language] || translations[dlang];
	if (map && map[key]) {
		return vsprintf(map[key], argv);
	}

	return key;
};


/*globals elgg, $*/
elgg.provide('elgg.ajax');

/**
 * @author Evan Winslow
 * Provides a bunch of useful shortcut functions for making ajax calls
 */

/**
 * Wrapper function for jQuery.ajax which ensures that the url being called
 * is relative to the elgg site root.
 *
 * You would most likely use elgg.get or elgg.post, rather than this function
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options Optional. {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.ajax = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.url = elgg.normalize_url(options.url);
	return $.ajax(options);
};
/**
 * @const
 */
elgg.ajax.SUCCESS = 0;

/**
 * @const
 */
elgg.ajax.ERROR = -1;

/**
 * Handle optional arguments and return the resulting options object
 *
 * @param url
 * @param options
 * @return {Object}
 * @private
 */
elgg.ajax.handleOptions = function(url, options) {
	var data_only = true,
		data,
		member;

	//elgg.ajax('example/file.php', {...});
	if (elgg.isString(url)) {
		options = options || {};

	//elgg.ajax({...});
	} else {
		options = url || {};
		url = options.url;
	}

	//elgg.ajax('example/file.php', function() {...});
	if (elgg.isFunction(options)) {
		data_only = false;
		options = {success: options};
	}

	//elgg.ajax('example/file.php', {data:{...}});
	if (options.data) {
		data_only = false;
	} else {
		for (member in options) {
			//elgg.ajax('example/file.php', {callback:function(){...}});
			if (elgg.isFunction(options[member])) {
				data_only = false;
			}
		}
	}

	//elgg.ajax('example/file.php', {notdata:notfunc});
	if (data_only) {
		data = options;
		options = {data: data};
	}

	if (!elgg.isFunction(options.error)) {
		// add a generic error handler
		options.error = function(xhr, status, error) { 
			elgg.ajax.handleAjaxError(xhr, status, error);
		};
	}
	
	if (url) {
		options.url = url;
	}

	return options;
};

/**
 * Handles low level errors like 404
 *
 * @param xhr
 * @param status
 * @param error
 * @private
 */
elgg.ajax.handleAjaxError = function(xhr, status, error) {
	elgg.register_error(elgg.echo('ajax:error'));
};

/**
 * Wrapper function for elgg.ajax which forces the request type to 'get.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.get = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.type = 'get';
	return elgg.ajax(options);
};

/**
 * Wrapper function for elgg.get which forces the dataType to 'json.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.getJSON = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.dataType = 'json';
	return elgg.get(options);
};

/**
 * Wrapper function for elgg.ajax which forces the request type to 'post.'
 *
 * @param {string} url Optionally specify the url as the first argument
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.post = function(url, options) {
	options = elgg.ajax.handleOptions(url, options);

	options.type = 'post';
	return elgg.ajax(options);
};

/**
 * Perform an action via ajax
 *
 * @example Usage 1:
 * At its simplest, only the action name is required (and anything more than the
 * action name will be invalid).
 * <pre>
 * elgg.action('name/of/action');
 * </pre>
 *
 * The action can be relative to the current site ('name/of/action') or
 * the full URL of the action ('http://elgg.org/action/name/of/action').
 *
 * @example Usage 2:
 * If you want to pass some data along with it, use the second parameter
 * <pre>
 * elgg.action('friend/add', { friend: some_guid });
 * </pre>
 *
 * @example Usage 3:
 * Of course, you will have no control over what happens when the request
 * completes if you do it like that, so there's also the most verbose method
 * <pre>
 * elgg.action('friend/add', {
 *     data: {
 *         friend: some_guid
 *     },
 *     success: function(json) {
 *         //do something
 *     },
 * }
 * </pre>
 * You can pass any of your favorite $.ajax arguments into this second parameter.
 *
 * @note If you intend to use the second field in the "verbose" way, you must
 * specify a callback method or the data parameter.  If you do not, elgg.action
 * will think you mean to send the second parameter as data.
 *
 * @note You do not have to add security tokens to this request.  Elgg does that
 * for you automatically.
 *
 * @see jQuery.ajax
 *
 * @param {String} action The action to call.
 * @param {Object} options
 * @return {jqXHR}
 */
elgg.action = function(action, options) {
	elgg.assertTypeOf('string', action);

	// support shortcut and full URLs
	// this will mangle URLs that aren't elgg actions.
	// Use post, get, or ajax for those.
	if (action.indexOf('action/') < 0) {
		action = 'action/' + action;
	}

	options = elgg.ajax.handleOptions(action, options);

	// This is a misuse of elgg.security.addToken() because it is not always a
	// full query string with a ?. As such we need a special check for the tokens.
	if (!elgg.isString(options.data) || options.data.indexOf('__elgg_ts') == -1) {
		options.data = elgg.security.addToken(options.data);
	}
	options.dataType = 'json';

	//Always display system messages after actions
	var custom_success = options.success || elgg.nullFunction;
	options.success = function(json, two, three, four) {
		if (json && json.system_messages) {
			elgg.register_error(json.system_messages.error);
			elgg.system_message(json.system_messages.success);
		}

		custom_success(json, two, three, four);
	};

	return elgg.post(options);
};

/**
 * Make an API call
 *
 * @example Usage:
 * <pre>
 * elgg.api('system.api.list', {
 *     success: function(data) {
 *         console.log(data);
 *     }
 * });
 * </pre>
 *
 * @param {String} method The API method to be called
 * @param {Object} options {@link jQuery#ajax}
 * @return {jqXHR}
 */
elgg.api = function (method, options) {
	elgg.assertTypeOf('string', method);

	var defaults = {
		dataType: 'json',
		data: {}
	};

	options = elgg.ajax.handleOptions(method, options);
	options = $.extend(defaults, options);

	options.url = 'services/api/rest/' + options.dataType + '/';
	options.data.method = method;

	return elgg.ajax(options);
};

/**
 * Provides session methods.
 */
elgg.provide('elgg.session');

/**
 * Helper function for setting cookies
 * @param {string} name
 * @param {string} value
 * @param {Object} options
 * 
 * {number|Date} options[expires]
 * {string} options[path]
 * {string} options[domain]
 * {boolean} options[secure]
 * 
 * @return {string|undefined} The value of the cookie, if only name is specified. Undefined if no value set
 */
elgg.session.cookie = function(name, value, options) {
	var cookies = [], cookie = [], i = 0, date, valid = true;
	
	//elgg.session.cookie()
	if (elgg.isUndefined(name)) {
		return document.cookie;
	}
	
	//elgg.session.cookie(name)
	if (elgg.isUndefined(value)) {
		if (document.cookie && document.cookie !== '') {
			cookies = document.cookie.split(';');
			for (i = 0; i < cookies.length; i += 1) {
				cookie = jQuery.trim(cookies[i]).split('=');
				if (cookie[0] === name) {
					return decodeURIComponent(cookie[1]);
				}
			}
		}
		return undefined;
	}
	
	// elgg.session.cookie(name, value[, opts])
	options = options || {};
	
	if (elgg.isNull(value)) {
		value = '';
		options.expires = -1;
	}
	
	cookies.push(name + '=' + value);

    if (options.expires) {
        if (elgg.isNumber(options.expires)) {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else if (options.expires.toUTCString) {
            date = options.expires;
        }

        if (date) {
            cookies.push('expires=' + date.toUTCString());
        }
    }
	
	// CAUTION: Needed to parenthesize options.path and options.domain
	// in the following expressions, otherwise they evaluate to undefined
	// in the packed version for some reason.
	if (options.path) {
		cookies.push('path=' + (options.path));
	}

	if (options.domain) {
		cookies.push('domain=' + (options.domain));
	}
	
	if (options.secure) {
		cookies.push('secure');
	}
	
	document.cookie = cookies.join('; ');
};

/**
 * Returns the object of the user logged in.
 *
 * @return {ElggUser} The logged in user
 */
elgg.get_logged_in_user_entity = function() {
	return elgg.session.user;
};

/**
 * Returns the GUID of the logged in user or 0.
 *
 * @return {number} The GUID of the logged in user
 */
elgg.get_logged_in_user_guid = function() {
	var user = elgg.get_logged_in_user_entity();
	return user ? user.guid : 0;
};

/**
 * Returns if a user is logged in.
 *
 * @return {boolean} Whether there is a user logged in
 */
elgg.is_logged_in = function() {
	return (elgg.get_logged_in_user_entity() instanceof elgg.ElggUser);
};

/**
 * Returns if the currently logged in user is an admin.
 *
 * @return {boolean} Whether there is an admin logged in
 */
elgg.is_admin_logged_in = function() {
	var user = elgg.get_logged_in_user_entity();
	return (user instanceof elgg.ElggUser) && user.isAdmin();
};

/**
 * @deprecated Use elgg.session.cookie instead
 */
jQuery.cookie = elgg.session.cookie;

// This just has to happen after ElggUser is defined, however it's probably
// better to have this procedural code here than in ElggUser.js
if (elgg.session.user) {
	elgg.session.user = new elgg.ElggUser(elgg.session.user);
}

/**
 * Provides page owner and context functions
 *
 * @todo This is a stub. Page owners can't be fully implemented until
 * the 4 types are finished.
 */

/**
 * @return {number} The GUID of the page owner entity or 0 for no owner
 */
elgg.get_page_owner_guid = function() {
	if (elgg.page_owner !== undefined) {
		return elgg.page_owner.guid;
	} else {
		return 0;
	}
};


elgg.provide('elgg.config');

/**
 * Returns the current site URL
 *
 * @return {String} The site URL.
 */
elgg.get_site_url = function() {
	return elgg.config.wwwroot;
};

/**
 * Get the URL for the cached file
 * 
 * @param {String} view    The full view name
 * @param {String} subview If the first arg is "css" or "js", the rest of the view name
 * @return {String} The site URL.
 */
elgg.get_simplecache_url = function(view, subview) {
	var lastcache, path;

	if (elgg.config.simplecache_enabled) {
		lastcache = elgg.config.lastcache;
	} else {
		lastcache = 0;
	}

	if (!subview) {
		path = '/cache/' + lastcache + '/' + elgg.config.viewtype + '/' + view;
	} else {
		if ((view === 'js' || view === 'css') && 0 === subview.indexOf(view + '/')) {
			subview = subview.substr(view.length + 1);
		}
		path = '/cache/' + lastcache + '/' + elgg.config.viewtype + '/' + view + '/' + subview;
	}

	return elgg.normalize_url(path);
};


elgg.provide('elgg.comments');

/**
 * @param {Number} guid
 * @constructor
 */
elgg.comments.Comment = function (guid) {
	this.guid = guid;
	this.$item = $('#elgg-object-' + guid);
};

elgg.comments.Comment.prototype = {
	/**
	 * Get a jQuery-wrapped reference to the form
	 *
	 * @returns {jQuery} note: may be empty
	 */
	getForm: function () {
		return this.$item.find('.elgg-form-comment-save');
	},

	/**
	 * @param {Function} complete Optional function to run when animation completes
	 */
	hideForm: function (complete) {
		complete = complete || function () {};
		this.getForm().slideUp('fast', complete).data('hidden', 1);
	},

	showForm: function () {
		this.getForm().slideDown('medium').data('hidden', 0);
	},

	loadForm: function () {
		var that = this;

		// Get the form using ajax
		elgg.ajax('ajax/view/core/ajax/edit_comment?guid=' + this.guid, {
			success: function(html) {
				// Add the form to DOM
				that.$item.find('.elgg-body').first().append(html);

				that.showForm();

				var $form = that.getForm();

				$form.find('.elgg-button-cancel').on('click', function () {
					that.hideForm();
					return false;
				});

				// save
				$form.on('submit', function () {
					that.submitForm();
					return false;
				});
			}
		});
	},

	submitForm: function () {
		var that = this,
			$form = this.getForm(),
			value = $form.find('textarea[name=generic_comment]').val();

		elgg.action('comment/save', {
			data: $form.serialize(),
			success: function(json) {
				// https://github.com/kvz/phpjs/blob/master/LICENSE.txt
				function nl2br(content) {
					if (/<(?:p|br)\b/.test(content)) {
						// probably formatted already
						return content;
					}
					return content.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
				}

				if (json.status === 0) {
					// Update list item content
					if (json.output) {
						that.$item.find('[data-role="comment-text"]').replaceWith(json.output);
					} else {
						// action has been overridden and doesn't return comment content
						that.$item.find('[data-role="comment-text"]').html(nl2br(value));
					}
				}
				that.hideForm(function () {
					that.getForm().remove();
				});
			}
		});

		return false;
	},

	toggleEdit: function () {
		var $form = this.getForm();
		if ($form.length) {
			if ($form.data('hidden')) {
				this.showForm();
			} else {
				this.hideForm();
			}
		} else {
			this.loadForm();
		}
		return false;
	}
};

/**
 * Initialize comment inline editing
 * 
 * @return void
 */
elgg.comments.init = function() {
	$(document).on('click', '.elgg-item-object-comment .elgg-menu-item-edit > a', function () {
		// store object as data in the edit link
		var dc = $(this).data('Comment'),
			guid;
		if (!dc) {
			guid = this.href.split('/').pop();
			dc = new elgg.comments.Comment(guid);
			$(this).data('Comment', dc);
		}
		dc.toggleEdit();
		return false;
	});
};

elgg.register_hook_handler('init', 'system', elgg.comments.init);
elgg.provide('elgg.ui');

elgg.ui.init = function () {
	// @todo we need better documentation for this hack
	// iOS Hover Event Class Fix
	$('.elgg-page').attr("onclick", "return true");

	// add user hover menus
	elgg.ui.initHoverMenu();

	//if the user clicks a system message, make it disappear
	$(document).on('click', '.elgg-system-messages li', function() {
		$(this).stop().fadeOut('fast');
	});

	$('.elgg-system-messages li').animate({opacity: 0.9}, 6000);
	$('.elgg-system-messages li.elgg-state-success').fadeOut('slow');

	$(document).on('click', '[rel=toggle]', elgg.ui.toggles);

	$(document).on('click', '[rel=popup]', elgg.ui.popupOpen);

	$(document).on('click', '.elgg-menu-page .elgg-menu-parent', elgg.ui.toggleMenu);

    $(document).on('click', '*[data-confirm], .elgg-requires-confirmation', elgg.ui.requiresConfirmation);
    if ($('.elgg-requires-confirmation').length > 0) {
        elgg.deprecated_notice('Use of .elgg-requires-confirmation is deprecated by data-confirm', '1.10');
    }

	$('.elgg-autofocus').focus();
	if ($('.elgg-autofocus').length > 0) {
		elgg.deprecated_notice('Use of .elgg-autofocus is deprecated by html5 autofocus', 1.9);
	}

	elgg.ui.initAccessInputs();

	// Allow element to be highlighted using CSS if its id is found from the URL
	var elementId = elgg.getSelectorFromUrlFragment(document.URL);
	$(elementId).addClass('elgg-state-highlight');
};

/**
 * Toggles an element based on clicking a separate element
 *
 * Use rel="toggle" on the toggler element
 * Set the href to target the item you want to toggle (<a rel="toggle" href="#id-of-target">)
 * or use data-toggle-selector="your_jquery_selector" to have an advanced selection method
 * 
 * By default elements perform a slideToggle. 
 * If you want a normal toggle (hide/show) you can add data-toggle-slide="0" on the elements to prevent a slide.
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.toggles = function(event) {
	event.preventDefault();
	var $this = $(this),
		target = $this.data().toggleSelector;
	
	if (!target) {
		// @todo we can switch to elgg.getSelectorFromUrlFragment() in 1.x if
		// we also extend it to support href=".some-class"
		target = $this.attr('href');
	}

	$this.toggleClass('elgg-state-active');

	$(target).each(function(index, elem) {
		var $elem = $(elem);
		if ($elem.data().toggleSlide != false) {
			$elem.slideToggle('medium');
		} else {
			$elem.toggle();
		}
	});
};

/**
 * Pops up an element based on clicking a separate element
 *
 * Set the rel="popup" on the popper and set the href to target the
 * item you want to toggle (<a rel="popup" href="#id-of-target">)
 *
 * This function emits the getOptions, ui.popup hook that plugins can register for to provide custom
 * positioning for elements.  The handler is passed the following params:
 *	targetSelector: The selector used to find the popup
 *	target:         The popup jQuery element as found by the selector
 *	source:         The jquery element whose click event initiated a popup.
 *
 * The return value of the function is used as the options object to .position().
 * Handles can also return false to abort the default behvior and override it with their own.
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.popupOpen = function(event) {
	event.preventDefault();
	event.stopPropagation();

	var target = elgg.getSelectorFromUrlFragment($(this).toggleClass('elgg-state-active').attr('href'));
	var $target = $(target);

	// emit a hook to allow plugins to position and control popups
	var params = {
		targetSelector: target,
		target: $target,
		source: $(this)
	};

	var options = {
		my: 'center top',
		at: 'center bottom',
		of: $(this),
		collision: 'fit fit'
	};

	options = elgg.trigger_hook('getOptions', 'ui.popup', params, options);

	// allow plugins to cancel event
	if (!options) {
		return;
	}

	// hide if already open
	if ($target.is(':visible')) {
		$target.fadeOut();
		$('body').die('click', elgg.ui.popupClose);
		return;
	}

	$target.appendTo('body')
		.fadeIn()
		.position(options);

	$(document)
		.off('click', 'body', elgg.ui.popupClose)
		.on('click', 'body', elgg.ui.popupClose);
};

/**
 * Catches clicks that aren't in a popup and closes all popups.
 */
elgg.ui.popupClose = function(event) {
	$eventTarget = $(event.target);
	var inTarget = false;
	var $popups = $('[rel=popup]');

	// if the click event target isn't in a popup target, fade all of them out.
	$popups.each(function(i, e) {
		var target = elgg.getSelectorFromUrlFragment($(e).attr('href')) + ':visible';
		var $target = $(target);

		if (!$target.is(':visible')) {
			return;
		}

		// didn't click inside the target
		if ($eventTarget.closest(target).length > 0) {
			inTarget = true;
			return false;
		}
	});

	if (!inTarget) {
		$popups.each(function(i, e) {
			var $e = $(e);
			var $target = $(elgg.getSelectorFromUrlFragment($e.attr('href')) + ':visible');
			if ($target.length > 0) {
				$target.fadeOut();
				$e.removeClass('elgg-state-active');
			}
		});

		$('body').die('click', elgg.ui.popClose);
	}
};

/**
 * Toggles a child menu when the parent is clicked
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.toggleMenu = function(event) {
	$(this).siblings().slideToggle('medium');
	$(this).toggleClass('elgg-menu-closed elgg-menu-opened');
	event.preventDefault();
};

/**
 * Initialize the hover menu
 *
 * @param {Object} parent
 * @return void
 */
elgg.ui.initHoverMenu = function(parent) {

	/**
	 * For a menu clicked, load the menu into all matching placeholders
	 *
	 * @param {String} mac Machine authorization code for the menu clicked
	 */
	function loadMenu(mac) {
		var $all_placeholders = $(".elgg-menu-hover[rel='" + mac + "']");

		// find the <ul> that contains data for this menu
		var $ul = $all_placeholders.filter('[data-elgg-menu-data]');

		if (!$ul.length) {
			return;
		}

		elgg.get('ajax/view/navigation/menu/user_hover/contents', {
			data: $ul.data('elggMenuData'),
			success: function(data) {
				if (data) {
					// replace all existing placeholders with new menu
					$all_placeholders.removeClass('elgg-ajax-loader')
						.html($(data).children());
				}
			}
		});
	}

	if (!parent) {
		parent = document;
	}

	// avatar image menu link
	$(parent).on('mouseover', ".elgg-avatar", function() {
		$(this).children(".elgg-icon-hover-menu").show();
	})
	.on('mouseout', '.elgg-avatar', function() {
		$(this).children(".elgg-icon-hover-menu").hide();
	});


	// avatar contextual menu
	$(document).on('click', ".elgg-avatar > .elgg-icon-hover-menu", function(e) {
		var $placeholder = $(this).parent().find(".elgg-menu-hover.elgg-ajax-loader");

		if ($placeholder.length) {
			loadMenu($placeholder.attr("rel"));
		}

		// check if we've attached the menu to this element already
		var $hovermenu = $(this).data('hovermenu') || null;

		if (!$hovermenu) {
			$hovermenu = $(this).parent().find(".elgg-menu-hover");
			$(this).data('hovermenu', $hovermenu);
		}

		// close hovermenu if arrow is clicked & menu already open
		if ($hovermenu.css('display') == "block") {
			$hovermenu.fadeOut();
		} else {
			$avatar = $(this).closest(".elgg-avatar");

			// @todo Use jQuery-ui position library instead -- much simpler
			var offset = $avatar.offset();
			var top = $avatar.height() + offset.top + 'px';
			var left = $avatar.width() - 15 + offset.left + 'px';

			$hovermenu.appendTo('body')
					.css('position', 'absolute')
					.css("top", top)
					.css("left", left)
					.fadeIn('normal');
		}

		// hide any other open hover menus
		$(".elgg-menu-hover:visible").not($hovermenu).fadeOut();
	});

	// hide avatar menu when user clicks elsewhere
	$(document).click(function(event) {
		if ($(event.target).parents(".elgg-avatar").length === 0) {
			$(".elgg-menu-hover").fadeOut();
		}
	});
};

/**
 * Calls a confirm() and prevents default if denied.
 *
 * @param {Object} e
 * @return void
 */
elgg.ui.requiresConfirmation = function(e) {
	var confirmText = $(this).data('confirm') || elgg.echo('question:areyousure');
	if (!confirm(confirmText)) {
		e.preventDefault();
	}
};

/**
 * Repositions the login popup
 *
 * @param {String} hook    'getOptions'
 * @param {String} type    'ui.popup'
 * @param {Object} params  An array of info about the target and source.
 * @param {Object} options Options to pass to
 *
 * @return {Object}
 */
elgg.ui.loginHandler = function(hook, type, params, options) {
	if (params.target.attr('id') == 'login-dropdown-box') {
		options.my = 'right top';
		options.at = 'right bottom';
		return options;
	}
	return null;
};

/**
 * Initialize the date picker
 *
 * Uses the class .elgg-input-date as the selector.
 *
 * If the class .elgg-input-timestamp is set on the input element, the onSelect
 * method converts the date text to a unix timestamp in seconds. That value is
 * stored in a hidden element indicated by the id on the input field.
 *
 * @return void
 * @requires jqueryui.datepicker
 */
elgg.ui.initDatePicker = function() {
	function loadDatePicker() {
		$('.elgg-input-date').datepicker({
			// ISO-8601
			dateFormat: 'yy-mm-dd',
			onSelect: function(dateText) {
				if ($(this).is('.elgg-input-timestamp')) {
					// convert to unix timestamp
					var dateParts = dateText.split("-");
					var timestamp = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]);
					timestamp = timestamp / 1000;

					var id = $(this).attr('id');
					$('input[name="' + id + '"]').val(timestamp);
				}
			},
			nextText: '&#xBB;',
			prevText: '&#xAB;',
			changeMonth: true,
			changeYear: true
		});
	}

	if (!$('.elgg-input-date').length) {
		return;
	}

	// require language module if necessary
	var deps = [];
	if (elgg.get_language() != 'en') {
		deps.push('jquery-ui/i18n/datepicker-'+ elgg.get_language() + '.min');
	}
	require(deps, loadDatePicker);
};

/**
 * This function registers two menu items that are actions that are the opposite
 * of each other and ajaxifies them. E.g. like/unlike, friend/unfriend, ban/unban, etc.
 *
 * Note the menu item names must be given in their normalized form. So if the
 * name is remove_friend, you should call this function with "remove-friend" instead.
 */
elgg.ui.registerTogglableMenuItems = function(menuItemNameA, menuItemNameB) {

	// Handles clicking the first button.
	$(document).off('click.togglable', '.elgg-menu-item-' + menuItemNameA + ' a')
			.on('click.togglable', '.elgg-menu-item-' + menuItemNameA + ' a', function() {
		var $menu = $(this).closest('.elgg-menu');

		// Be optimistic about success
		elgg.ui.toggleMenuItems($menu, menuItemNameB, menuItemNameA);

		// Send the ajax request
		elgg.action($(this).attr('href'), {
			success: function(json) {
				if (json.system_messages.error.length) {
					// Something went wrong, so undo the optimistic changes
					elgg.ui.toggleMenuItems($menu, menuItemNameA, menuItemNameB);
				}
			},
			error: function() {
				// Something went wrong, so undo the optimistic changes
				elgg.ui.toggleMenuItems($menu, menuItemNameA, menuItemNameB);
			}
		});

		// Don't want to actually click the link
		return false;
	});

	// Handles clicking the second button
	$(document).off('click.togglable', '.elgg-menu-item-' + menuItemNameB + ' a')
			.on('click.togglable', '.elgg-menu-item-' + menuItemNameB + ' a', function() {
		var $menu = $(this).closest('.elgg-menu');

		// Be optimistic about success
		elgg.ui.toggleMenuItems($menu, menuItemNameA, menuItemNameB);

		// Send the ajax request
		elgg.action($(this).attr('href'), {
			success: function(json) {
				if (json.system_messages.error.length) {
					// Something went wrong, so undo the optimistic changes
					elgg.ui.toggleMenuItems($menu, menuItemNameB, menuItemNameA);
				}
			},
			error: function() {
				// Something went wrong, so undo the optimistic changes
				elgg.ui.toggleMenuItems($menu, menuItemNameB, menuItemNameA);
			}
		});

		// Don't want to actually click the link
		return false;
	});
};

elgg.ui.toggleMenuItems = function($menu, nameOfItemToShow, nameOfItemToHide) {
    $menu.find('.elgg-menu-item-' + nameOfItemToShow).removeClass('hidden').find('a').focus();
    $menu.find('.elgg-menu-item-' + nameOfItemToHide).addClass('hidden');
};

/**
 * Initialize input/access for dynamic display of members only warning
 *
 * If a select.elgg-input-access is accompanied by a note (.elgg-input-access-membersonly),
 * then hide the note when the select value is PRIVATE or group members.
 *
 * @return void
 * @since 1.9.0
 */
elgg.ui.initAccessInputs = function () {
	$('.elgg-input-access').each(function () {
		function updateMembersonlyNote() {
			var val = $select.val();
			if (val != acl && val !== 0) {
				// .show() failed in Chrome. Maybe a float/jQuery bug
				$note.css('visibility', 'visible');
			} else {
				$note.css('visibility', 'hidden');
			}
		}
		var $select = $(this),
			acl = $select.data('group-acl'),
			$note = $('.elgg-input-access-membersonly', this.parentNode),
			commentCount = $select.data('comment-count'),
			originalValue = $select.data('original-value');
		if ($note) {
			updateMembersonlyNote();
			$select.change(updateMembersonlyNote);
		}
                
		if (commentCount) {
			$select.change(function(e) {
				if ($(this).val() != originalValue) {
					if (!confirm(elgg.echo('access:comments:change', [commentCount]))) {
						$(this).val(originalValue);
					}
				}
			});
		}
	});
};

elgg.register_hook_handler('init', 'system', elgg.ui.init);
elgg.register_hook_handler('init', 'system', elgg.ui.initDatePicker);
elgg.register_hook_handler('getOptions', 'ui.popup', elgg.ui.loginHandler);
elgg.ui.registerTogglableMenuItems('add-friend', 'remove-friend');

elgg.provide('elgg.ui.widgets');

/**
 * Widgets initialization
 *
 * @return void
 * @requires jqueryui.sortable
 */
elgg.ui.widgets.init = function() {

	// widget layout?
	if ($(".elgg-widgets").length === 0) {
		return;
	}

	$(".elgg-widgets").sortable({
		items:                'div.elgg-module-widget.elgg-state-draggable',
		connectWith:          '.elgg-widgets',
		handle:               '.elgg-widget-handle',
		forcePlaceholderSize: true,
		placeholder:          'elgg-widget-placeholder',
		opacity:              0.8,
		revert:               500,
		stop:                 elgg.ui.widgets.move
	});

	$('.elgg-widgets-add-panel li.elgg-state-available').click(elgg.ui.widgets.add);

	$(document).on('click', 'a.elgg-widget-delete-button', elgg.ui.widgets.remove);
	$(document).on('submit', '.elgg-widget-edit > form ', elgg.ui.widgets.saveSettings);
	$(document).on('click', 'a.elgg-widget-collapse-button', elgg.ui.widgets.collapseToggle);

	elgg.ui.widgets.setMinHeight(".elgg-widgets");
};

/**
 * Adds a new widget
 *
 * Makes Ajax call to persist new widget and inserts the widget html
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.widgets.add = function(event) {
	var type = $(this).data('elgg-widget-type');

	// if multiple instances not allow, disable this widget type add button
	var multiple = $(this).attr('class').indexOf('elgg-widget-multiple') != -1;
	if (multiple === false) {
		$(this).addClass('elgg-state-unavailable');
		$(this).removeClass('elgg-state-available');
		$(this).unbind('click', elgg.ui.widgets.add);
	}

	elgg.action('widgets/add', {
		data: {
			handler: type,
			page_owner_guid: elgg.get_page_owner_guid(),
			context: $("input[name='widget_context']").val(),
			show_access: $("input[name='show_access']").val(),
			default_widgets: $("input[name='default_widgets']").val() || 0
		},
		success: function(json) {
			$('#elgg-widget-col-1').prepend(json.output);
		}
	});
	event.preventDefault();
};

/**
 * Persist the widget's new position
 *
 * @param {Object} event
 * @param {Object} ui
 *
 * @return void
 */
elgg.ui.widgets.move = function(event, ui) {

	// elgg-widget-<guid>
	var guidString = ui.item.attr('id');
	guidString = guidString.substr(guidString.indexOf('elgg-widget-') + "elgg-widget-".length);

	// elgg-widget-col-<column>
	var col = ui.item.parent().attr('id');
	col = col.substr(col.indexOf('elgg-widget-col-') + "elgg-widget-col-".length);

	elgg.action('widgets/move', {
		data: {
			widget_guid: guidString,
			column: col,
			position: ui.item.index()
		}
	});

	// @hack fixes jquery-ui/opera bug where draggable elements jump
	ui.item.css('top', 0);
	ui.item.css('left', 0);
};

/**
 * Removes a widget from the layout
 *
 * Event callback the uses Ajax to delete the widget and removes its HTML
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.widgets.remove = function(event) {
	if (confirm(elgg.echo('deleteconfirm')) === false) {
		event.preventDefault();
		return;
	}
	
	var $widget = $(this).closest('.elgg-module-widget');

	// if widget type is single instance type, enable the add buton
	var type = $(this).data('elgg-widget-type');
	$container = $(this).parents('.elgg-layout-widgets').first();
	$button = $('[data-elgg-widget-type="' + type + '"]', $container);
	var multiple = $button.attr('class').indexOf('elgg-widget-multiple') != -1;
	if (multiple === false) {
		$button.addClass('elgg-state-available');
		$button.removeClass('elgg-state-unavailable');
		$button.unbind('click', elgg.ui.widgets.add); // make sure we don't bind twice
		$button.click(elgg.ui.widgets.add);
	}

	$widget.remove();

	// delete the widget through ajax
	elgg.action($(this).attr('href'));

	event.preventDefault();
};

/**
 * Toggle the collapse state of the widget
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.widgets.collapseToggle = function(event) {
	$(this).toggleClass('elgg-widget-collapsed');
	$(this).parent().parent().find('.elgg-body').slideToggle('medium');
	event.preventDefault();
};

/**
 * Save a widget's settings
 *
 * Uses Ajax to save the settings and updates the HTML.
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.widgets.saveSettings = function(event) {
	$(this).parent().slideToggle('medium');
	var $widgetContent = $(this).parent().parent().children('.elgg-widget-content');

	// stick the ajax loader in there
	var $loader = $('#elgg-widget-loader').clone();
	$loader.attr('id', '#elgg-widget-active-loader');
	$loader.removeClass('hidden');
	$widgetContent.html($loader);

	var default_widgets = $("input[name='default_widgets']").val() || 0;
	if (default_widgets) {
		$(this).append('<input type="hidden" name="default_widgets" value="1">');
	}

	elgg.action('widgets/save', {
		data: $(this).serialize(),
		success: function(json) {
			$widgetContent.html(json.output);
			if (typeof(json.title) != "undefined") {
				var $widgetTitle = $widgetContent.parent().parent().find('.elgg-widget-title');
				$widgetTitle.html(json.title);
			}
		}
	});
	event.preventDefault();
};

/**
 * Set the min-height so that all widget column bottoms are the same
 *
 * This addresses the issue of trying to drag a widget into a column that does
 * not have any widgets or many fewer widgets than other columns.
 *
 * @param {String} selector
 * @return void
 */
elgg.ui.widgets.setMinHeight = function(selector) {
	var maxBottom = 0;
	$(selector).each(function() {
		var bottom = parseInt($(this).offset().top + $(this).height());
		if (bottom > maxBottom) {
			maxBottom = bottom;
		}
	});
	$(selector).each(function() {
		var bottom = parseInt($(this).offset().top + $(this).height());
		if (bottom < maxBottom) {
			var newMinHeight = parseInt($(this).height() + (maxBottom - bottom));
			$(this).css('min-height', newMinHeight + 'px');
		}
	});
};

elgg.register_hook_handler('init', 'system', elgg.ui.widgets.init);

//<script>

elgg.version = '2015062900';
elgg.release = '2.0.1';
elgg.config.wwwroot = 'http://projectcuria.com/';

// refresh token 3 times during its lifetime (in microseconds 1000 * 1/3)
elgg.security.interval = 2397600;
elgg.config.language = 'en';

// jQuery and UI must be loaded sync in 2.x but modules should depend on these AMD modules
define('jquery', function () {
	return jQuery;
});
define('jquery-ui');

// The datepicker language modules depend on "../datepicker", so to avoid RequireJS from
// trying to load that, we define it manually here. The lang modules have names like
// "jquery-ui/i18n/datepicker-LANG.min" and these views are mapped in /views.php
define('jquery-ui/datepicker', jQuery.datepicker);

define('elgg', ['jquery', 'languages/' + elgg.get_language()], function($, translations) {
	elgg.add_translation(elgg.get_language(), translations);

	$(function() {
		elgg.trigger_hook('init', 'system');
		elgg.trigger_hook('ready', 'system');
	});

	return elgg;
});

require(['elgg']); // Forces the define() function to always run

// Process queue. We have to wait until now because many modules depend on 'elgg' and we can't load
// it asynchronously.
if (!window._require_queue) {
	if (window.console) {
		console.log('Elgg\'s require() shim is not defined. Do not override the view "page/elements/head".');
	}
} else {
	while (_require_queue.length) {
		require.apply(null, _require_queue.shift());
	}
	delete window._require_queue;
}

elgg.trigger_hook('boot', 'system');

// force the first column to at least be as large as the profile box in cols 2 and 3
// we also want to run before the widget init happens so priority is < 500
elgg.register_hook_handler('init', 'system', function() {
	// only do this on the profile page's widget canvas.
	if ($('.profile').length) {
		$('#elgg-widget-col-1').css('min-height', $('.profile').outerHeight(true) + 1);
	}
}, 400);
//<script>

elgg.provide('elgg.bookmarks');

elgg.bookmarks.init = function() {
	$('.elgg-menu-item-bookmark > a').each(function () {
		this.href += '&title=' + encodeURIComponent(document.title);
	});
};

elgg.register_hook_handler('init', 'system', elgg.bookmarks.init);
// This global variable must be set before the editor script loading.
CKEDITOR_BASEPATH = elgg.config.wwwroot + 'mod/ckeditor/vendors/ckeditor/';

elgg.ui.registerTogglableMenuItems('feature', 'unfeature');
//<script>

/**
 * Repositions the likes popup
 *
 * @param {String} hook    'getOptions'
 * @param {String} type    'ui.popup'
 * @param {Object} params  An array of info about the target and source.
 * @param {Object} options Options to pass to
 *
 * @return {Object}
 */
elgg.ui.likesPopupHandler = function(hook, type, params, options) {
	if (params.target.hasClass('elgg-likes')) {
		options.my = 'right bottom';
		options.at = 'left top';
		return options;
	}
	return null;
};

elgg.register_hook_handler('getOptions', 'ui.popup', elgg.ui.likesPopupHandler);

!function() {
	function setupHandlers(nameA, nameB) {
		$(document).on('click', '.elgg-menu-item-' + nameA + ' a', function() {
			var $menu = $(this).closest('.elgg-menu');

			// Be optimistic about success
			elgg.ui.toggleMenuItems($menu, nameB, nameA);

			$menu.find('.elgg-menu-item-' + nameB + ' a').blur();

			// Send the ajax request
			elgg.action($(this).attr('href'), {
				success: function(data) {
					if (data.system_messages.error.length) {
						// Something went wrong, so undo the optimistic changes
						elgg.ui.toggleMenuItems($menu, nameA, nameB);
					}

					var func_name = data.output.num_likes > 0 ? 'removeClass' : 'addClass';
					$(data.output.selector).text(data.output.text)[func_name]('hidden');
				},
				error: function() {
					// Something went wrong, so undo the optimistic changes
					elgg.ui.toggleMenuItems($menu, nameA, nameB);
				}
			});

			// Don't want to actually click the link
			return false;
		});
	}

	setupHandlers('likes', 'unlike');
	setupHandlers('unlike', 'likes');
}();
//<script>
elgg.provide('elgg.messageboard');

elgg.messageboard.init = function() {
	var form = $('form[name=elgg-messageboard]');
	form.on('click', 'input[type=submit]', elgg.messageboard.submit);

	// remove the default binding for confirmation since we're doing extra stuff.
	// @todo remove if we add a hook to the requires confirmation callback
	form.parent().on('click', '.elgg-menu-item-delete > a', function(event) {
		// double whammy for in case the load order changes.
		$(this).unbind('click', elgg.ui.requiresConfirmation).removeAttr('data-confirm');
		
		elgg.messageboard.deletePost(this);
		event.preventDefault();
	});
};

elgg.messageboard.submit = function(e) {
	var form = $(this).parents('form');
	var data = form.serialize();

	elgg.action('messageboard/add', {
		data: data,
		success: function(json) {
			// the action always returns the full ul and li wrapped annotation.
			var ul = form.next('ul.elgg-list-annotation');

			if (ul.length < 1) {
				form.parent().append(json.output);
			} else {
				ul.prepend($(json.output).find('li:first'));
			};
			form.find('textarea').val('');
		}
	});

	e.preventDefault();
};

elgg.messageboard.deletePost = function(elem) {
	var $link = $(elem);
	var confirmText = $link.attr('title') || elgg.echo('question:areyousure');

	if (confirm(confirmText)) {
		elgg.action($link.attr('href'), {
			success: function() {
				var item = $link.closest('.elgg-item');
				item.remove();
			}
		});
	}
};

elgg.register_hook_handler('init', 'system', elgg.messageboard.init);

// messages plugin toggle
elgg.register_hook_handler('init', 'system', function() {
	$("#messages-toggle").click(function() {
		$('input[type=checkbox]').click();
	});
});
//<script>

elgg.provide('elgg.uservalidationbyemail');

elgg.uservalidationbyemail.init = function() {
	$('#uservalidationbyemail-checkall').click(function() {
		$('#uservalidationbyemail-form .elgg-body').find('input[type=checkbox]').prop('checked', this.checked);
	});

	$('.uservalidationbyemail-submit').click(function(event) {
		var form = $('#uservalidationbyemail-form')[0];
		event.preventDefault();

		// check if there are selected users
		if ($('.elgg-body', form).find('input[type=checkbox]:checked').length < 1) {
			return false;
		}

		// confirmation
		if (!confirm(this.title)) {
			return false;
		}

		form.action = this.href;
		form.submit();
	});
};

elgg.register_hook_handler('init', 'system', elgg.uservalidationbyemail.init);
