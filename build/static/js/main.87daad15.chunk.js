(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(2),o=t(15),a=t.n(o),r=t(6),u=t(3),l=t(4),s=t.n(l),i="http://localhost:3001/api/persons",d=function(){return s.a.get(i).then((function(e){return e.data}))},j=function(e){return s.a.post(i,e).then((function(e){return e.data}))},b=function(e){var n=s.a.delete("".concat(i,"/").concat(e));return console.log("".concat(i,"/").concat(e)),n.then((function(e){return e.data}))},f=function(e,n){var t=s.a.put("".concat(i,"/").concat(e),n);return console.log("updating","".concat(i,"/").concat(e)),t.then((function(e){return e.data}))},h=t(0),m=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"info",children:n})},p=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"error",children:n})},O=function(e){return Object(h.jsxs)("li",{children:[e.name," ",e.number]})},g=function(e){var n=e.personsToDisplay,t=e.clickHandler;return n.map((function(e){return Object(h.jsxs)("div",{children:[Object(h.jsx)(O,{name:e.name,number:e.number}),Object(h.jsx)("button",{onClick:function(){return t(e.id,e.name)},children:" delete "})]},e.name)}))},v=function(e){return Object(h.jsxs)("div",{children:["filter shown with ",Object(h.jsx)("input",{value:e.filter,onChange:e.onChange})]})},x=function(e){return Object(h.jsxs)("form",{onSubmit:e.handler,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:e.newName,onChange:e.nameChangeHandler})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{value:e.newNumber,onChange:e.numberChangeHandler})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},w=function(e){var n=Object(c.useState)(e.persons),t=Object(u.a)(n,2),o=t[0],a=t[1],l=Object(c.useState)(""),s=Object(u.a)(l,2),i=s[0],O=s[1],w=Object(c.useState)(""),C=Object(u.a)(w,2),k=C[0],y=C[1],H=Object(c.useState)(""),N=Object(u.a)(H,2),S=N[0],T=N[1],D=Object(c.useState)(null),U=Object(u.a)(D,2),E=U[0],I=U[1],J=Object(c.useState)(null),A=Object(u.a)(J,2),B=A[0],P=A[1];Object(c.useEffect)((function(){d().then((function(e){a(e)}))}),[]);var q=o.filter((function(e){return e.name.toUpperCase().search(S.toUpperCase())>-1}));return console.log(o),console.log(q),Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(m,{message:E}),Object(h.jsx)(p,{message:B}),Object(h.jsx)(v,{filter:S,onChange:function(e){console.log(e.target.value),T(e.target.value)}}),Object(h.jsx)(x,{handler:function(e){e.preventDefault(),console.log("button clicked",e);var n=o.findIndex((function(e){return e.name.toUpperCase()===i.toUpperCase()}));if(n>-1){var t=o[n];if(console.log("nimi on jo listassa: ",t.name),window.confirm("".concat(t.name," is already added to phonebook, replace the old number with a new one?"))){var c=Object(r.a)(Object(r.a)({},t),{},{number:k});console.log("on listassa, uusi: ",c),console.log("on listassa, vanha: ",t),f(t.id,c).then((function(e){console.log("update"),a(o.map((function(n){return n.id!==t.id?n:e}))),I("'".concat(c.name,"' successfully updated!")),setTimeout((function(){I(null)}),5e3)})).catch((function(e){P("'".concat(c.name,"' was already deleted from server")),setTimeout((function(){P(null)}),5e3)}))}}else{var u={name:i,number:k};j(u).then((function(e){a(o.concat(e)),I("'".concat(u.name,"' was added!")),setTimeout((function(){I(null)}),5e3)}))}O(""),y("")},nameChangeHandler:function(e){console.log(e.target.value),O(e.target.value)},numberChangeHandler:function(e){console.log(e.target.value),y(e.target.value)},newNumber:k,newName:i}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(g,{personsToDisplay:q,clickHandler:function(e,n){console.log("delete button pressed on: ",e),console.log("http://localhost:3001/persons/".concat(e)),window.confirm("Delete ".concat(n," ?"))&&b(e).then((function(n){console.log(o.filter((function(n){return n.id!==e})));var t=o.filter((function(n){return n.id!==e}));a(t)})).catch((function(e){P("'".concat(n,"' was already deleted from server")),setTimeout((function(){P(null)}),5e3)}))}})]})};t(39);a.a.render(Object(h.jsx)(w,{persons:[{name:"Arto Hellas",number:"123456789"}]}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.87daad15.chunk.js.map