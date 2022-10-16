(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{456:function(t,e,n){"use strict";n.r(e);var r=n(6),l=(n(43),{name:"CodeSettings",data:function(){return{isLoading:!0,date:null,settingsData:[],currencies:[],currencyLoaded:!0}},mounted:function(){var t=this;this.getSettings().then((function(){t.getCurrencies()}))},methods:{saveCompany:function(){var t=this;this.$axios.put("/settings",this.settingsData,{headers:{Authorization:"Bearer ".concat(this.$auth.strategy.token.get()),"Content-Type":"application/json"}}).then((function(e){t.$buefy.snackbar.open({message:"Settings Updated",queue:!1})})).then((function(){location.reload()}))},getSettings:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/settings",{headers:{Authorization:"Bearer ".concat(t.$auth.strategy.token.get()),"Content-Type":"application/json"}}).then((function(e){t.isLoading=!1,t.settingsData=e.data}));case 2:case"end":return e.stop()}}),e)})))()},getCurrencies:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/currencies",{headers:{Authorization:"Bearer ".concat(t.$auth.strategy.token.get()),"Content-Type":"application/json"}}).then((function(e){t.currencies=e.data,t.currencyLoaded=!1}));case 2:case"end":return e.stop()}}),e)})))()}}}),o=n(4),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{on:{submit:function(e){return e.preventDefault(),t.saveCompany.apply(null,arguments)}}},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.currency")}},[n("client-only",[t.settingsData.currency?n("b-select",{attrs:{size:"is-small",expanded:"",loading:t.currencyLoaded},model:{value:t.settingsData.currency,callback:function(e){t.$set(t.settingsData,"currency",e)},expression:"settingsData.currency"}},t._l(t.currencies,(function(option){return n("option",{key:option.id,domProps:{value:option}},[t._v("\n              "+t._s(option.name)+"\n            ")])})),0):t._e()],1)],1)],1),t._v(" "),n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.email")}},[n("b-input",{attrs:{type:"email",name:"email",size:"is-small"},model:{value:t.settingsData.email,callback:function(e){t.$set(t.settingsData,"email",e)},expression:"settingsData.email"}})],1)],1),t._v(" "),n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.phone")}},[n("b-input",{attrs:{type:"number",name:"phone",size:"is-small"},model:{value:t.settingsData.phone,callback:function(e){t.$set(t.settingsData,"phone",e)},expression:"settingsData.phone"}})],1)],1)]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.code")}},[n("b-input",{attrs:{name:"code",size:"is-small"},model:{value:t.settingsData.code,callback:function(e){t.$set(t.settingsData,"code",e)},expression:"settingsData.code"}})],1)],1),t._v(" "),n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.fiscal")}},[n("b-input",{attrs:{name:"nipt",size:"is-small"},model:{value:t.settingsData.nipt,callback:function(e){t.$set(t.settingsData,"nipt",e)},expression:"settingsData.nipt"}})],1)],1),t._v(" "),n("div",{staticClass:"column"},[n("b-field",{attrs:{label:t.$t("table.creation_date")}},[n("b-input",{attrs:{name:"creation_date",size:"is-small"},model:{value:t.settingsData.creation_date,callback:function(e){t.$set(t.settingsData,"creation_date",e)},expression:"settingsData.creation_date"}})],1)],1)]),t._v(" "),n("hr"),t._v(" "),n("b-field",{attrs:{label:t.$t("table.desciption")}},[n("b-input",{attrs:{type:"textarea",size:"is-small"},model:{value:t.settingsData.desc,callback:function(e){t.$set(t.settingsData,"desc",e)},expression:"settingsData.desc"}})],1),t._v(" "),n("b-field",{attrs:{label:t.$t("table.address")}},[n("b-input",{attrs:{placeholder:"e.g. Partnership proposal",size:"is-small"},model:{value:t.settingsData.address,callback:function(e){t.$set(t.settingsData,"address",e)},expression:"settingsData.address"}})],1),t._v(" "),n("hr"),t._v(" "),n("b-field",{attrs:{grouped:""}},[n("div",{staticClass:"control"},[n("b-button",{staticClass:"is-small",attrs:{"native-type":"submit",type:"is-primary"}},[t._v("\n        "+t._s(t.$t("navtop.save"))+"\n      ")])],1)]),t._v(" "),n("b-loading",{model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);