(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{448:function(e,t,r){"use strict";r.r(t);r(22),r(17),r(24),r(9),r(31),r(21),r(32);var n=r(12),c=(r(27),r(81),r(26));function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var l={name:"UserAvatar",props:{avatar:{type:String,default:null}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({newUserAvatar:function(){if(this.avatar)return this.avatar;if(this.userAvatar)return this.userAvatar;var e="somename";return this.userName&&(e=this.userName.replace(/[^a-z0-9]+/i,"")),"https://avatars.dicebear.com/v2/human/".concat(e,".svg?options[mood][]=happy")}},Object(c.b)(["userAvatar","userName"]))},v=l,f=r(4),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"is-user-avatar"},[r("img",{attrs:{src:e.newUserAvatar,alt:e.userName}})])}),[],!1,null,null,null);t.default=component.exports}}]);