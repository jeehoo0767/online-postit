(this["webpackJsonppost-board"]=this["webpackJsonppost-board"]||[]).push([[0],{52:function(t,e,n){},53:function(t,e,n){},65:function(t,e,n){"use strict";n.r(e);var i,o=n(0),a=n.n(o),r=n(12),c=n.n(r),d=(n(52),n(44)),s=(n(53),n(71)),l=n(72),u=n(20),h={isLoading:!1,data:null,error:null,selectedPostIdForFocus:null},b={id:0,title:"",description:"",isFoldPost:!1,x:10,y:10,width:250,height:250,isVisible:!1},j={loadPost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;t.isLoading=!0},loadPostSuccess:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload;console.log(n),t.isLoading=!1,t.data=n,t.error=null},loadPostFail:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload;t.isLoading=!1,t.data=[],t.error=n},handlePostChange:function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,n=arguments.length>1?arguments[1]:void 0,i=n.payload.key,o=null===(t=e.data)||void 0===t?void 0:t.findIndex((function(t){return t.id===n.payload.id})),a=e.data[o];a[i]=n.payload.content},addPost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;0===t.data.length?t.data.push(b):t.data.push({id:t.data[t.data.length-1].id+1,title:"",description:"",isFoldPost:!1,x:200,y:0,width:250,height:250,isVisible:!1})},deletePost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload.id;t.data=t.data.filter((function(t){return t.id!==n}))},handleDragPost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload.id,i=t.data.findIndex((function(t){return t.id===n})),o=t.data[i];o.x=e.payload.x,o.y=e.payload.y},handleResizePost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload.id,i=t.data.findIndex((function(t){return t.id===n})),o=t.data[i];o.width=e.payload.width,o.height=e.payload.height},handleFoldPost:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0,n=e.payload.id,i=t.data.findIndex((function(t){return t.id===n})),o=t.data[i];o.isFoldPost?(o.isFoldPost=!1,o.height=250):(o.isFoldPost=!0,o.height=40)},setFocus:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,e=arguments.length>1?arguments[1]:void 0;t.selectedPostIdForFocus=e.payload.id}},g=Object(u.b)({name:"postListReducer",initialState:h,reducers:j}),f=(g.name,g.reducer),p=g.actions,v=n(11),x=n(4),O=function(){var t,e=Object(v.c)((function(t){return t.postListReducer})).data,n=Object(v.b)();return Object(x.jsxs)("div",{className:"header",children:[(t=e,t.map((function(t,e){return Object(x.jsx)("div",{children:Object(x.jsx)(s.a.Control,{id:t.id.toString(),className:"mb-3",name:"title",value:t.title,onChange:function(t){return function(t){var e={id:Number(t.target.id),key:t.target.name,content:t.target.value};n(p.handlePostChange(e))}(t)},style:{display:t.isVisible?"none":"inline"}})},e)}))),Object(x.jsx)("div",{className:"text-center",children:Object(x.jsx)(l.a,{onClick:function(){return n(p.addPost())},children:"+"})})]})},m=n(31),y=n(37),P=n(39),F=n(46),k=P.a.textarea(i||(i=Object(y.a)(["\n  display: ",";\n  resize: none;\n"])),(function(t){return t.isFold?"none":"inline-block"})),w=function(t){var e,n=t.handleShow,i=t.setClickedPost,o=Object(v.c)((function(t){return t.postListReducer})).data,a=Object(v.b)(),r=function(t){var e={id:Number(t.target.id),key:t.target.name,content:t.target.value};a(p.handlePostChange(e))};return Object(x.jsx)(x.Fragment,{children:o&&(e=o,e.map((function(t){return Object(x.jsx)(F.a,{position:{x:t.x,y:t.y},size:{width:t.width,height:t.height},minWidth:200,minHeight:80,onDragStop:function(e,n){return function(t,e){var n={id:e,x:t.x,y:t.y};a(p.handleDragPost(n))}(n,t.id)},onResizeStop:function(e,n,i,o,r){return function(t,e,n,i,o,r){var c={id:r.id,width:Number(n.style.width.split("px")[0]),height:Number(n.style.height.split("px")[0])};a(p.handleResizePost(c))}(0,0,i,0,0,t)},cancel:".note_description",bounds:".note-wrap",enableResizing:{bottom:!t.isFoldPost,right:!0,bottomRight:!t.isFoldPost},children:Object(x.jsxs)("div",{className:"note resize",id:t.id.toString(),onDoubleClick:function(t){return t.stopPropagation()},style:{background:t.isFoldPost?"lightyellow":"linear-gradient(-45deg, transparent 15px, lightyellow 0), linear-gradient(45deg, transparent 15px, rgb(255, 94, 0) 0)"},children:[Object(x.jsx)("input",{id:t.id.toString(),name:"title",type:"text",style:{border:"none"},value:t.title,onChange:function(t){return r(t)},placeholder:"Title",className:"note_title",autoComplete:"off"}),Object(x.jsx)(k,{id:t.id.toString(),name:"description",value:t.description,onChange:function(t){return r(t)},placeholder:"Description...",className:"note_description",style:{border:"none",borderTop:"1px solid black"},isFold:t.isFoldPost,onDrag:function(t){return t.stopPropagation()}}),Object(x.jsx)("span",{className:"note_reduce",onClick:function(){return function(t){var e={id:t.id};a(p.handleFoldPost(e))}(t)},children:"-"}),Object(x.jsx)("span",{className:"note_delete",onClick:function(){return function(t){var e={id:t.id};t.description||t.title?(n(),i(t.id)):a(p.deletePost(e))}(t)},children:"X"})]})},t.id)})))})},S=n(70),N=function(t){var e=t.show,n=t.handleClose,i=t.clickedPost,o=Object(v.b)(),a=function(){n(),o(p.deletePost({id:i}))};return document.onkeyup=function(t){"Enter"===t.key&&a()},Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(S.a,{show:e,onHide:n,children:[Object(x.jsx)(S.a.Header,{children:Object(x.jsx)(S.a.Title,{children:"Delete Post"})}),Object(x.jsx)(S.a.Body,{children:"\ud574\ub2f9 \ud3ec\uc2a4\ud2b8\uc787\uc744 \uc0ad\uc81c \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"}),Object(x.jsxs)(S.a.Footer,{children:[Object(x.jsx)(l.a,{variant:"secondary",onClick:n,children:"\ucde8\uc18c"}),Object(x.jsx)(l.a,{variant:"primary",onClick:function(){return a()},children:"\ud655\uc778"})]})]})})},C=function(){var t=Object(v.b)(),e=Object(o.useState)(),n=Object(m.a)(e,2),i=n[0],a=n[1],r=Object(o.useState)(!1),c=Object(m.a)(r,2),d=c[0],s=c[1];return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"note-wrap",onDoubleClick:function(){return t(p.addPost())},children:Object(x.jsx)("div",{className:"notes_list",children:Object(x.jsx)(w,{handleShow:function(){return s(!0)},setClickedPost:a})})}),d&&Object(x.jsx)(N,{show:d,handleClose:function(){return s(!1)},clickedPost:i})]})},L=n(67),I=n(68),z=n(73),R=n(69),D=n(36),_=function(){var t=Object(v.b)(),e=Object(v.c)((function(t){return t.postListReducer})),n=e.isLoading,i=e.data,a=e.error,r=e.selectedPostIdForFocus,c=!1,s=!1;return document.onkeyup=function(t){t.ctrlKey&&(c=!1),t.altKey&&(s=!1)},document.onkeydown=function(e){if(e.ctrlKey&&(c=!0),e.altKey&&(s=!0),"n"===e.key&&c&&s){var n;t(p.addPost());var i=document.querySelectorAll(".note_title");t(p.setFocus({id:Number(null===(n=i[i.length-1])||void 0===n?void 0:n.id)}))}},Object(o.useEffect)((function(){t(p.loadPost())}),[]),Object(o.useEffect)((function(){null!==i&&localStorage.setItem("noteList",JSON.stringify(i))}),[i]),Object(o.useEffect)((function(){var t=Object(d.a)(document.querySelectorAll(".note_title")).find((function(t){return Number(t.id)===r}));null===t||void 0===t||t.focus()}),[r]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:"url(https://img.freepik.com/free-photo/abstract-and-surface-wood-texture-for-background_74190-12071.jpg?size=626&ext=jpg&ga=GA1.2.1591904653.1622073600)",backgroundSize:"cover",zIndex:-1}}),Object(x.jsxs)(L.a,{className:"mt-5",children:[n&&Object(x.jsxs)("div",{className:"text-center",children:[Object(x.jsx)(I.a,{animation:"border",variant:"primary"}),Object(x.jsx)("div",{className:"h4",children:"\uc7a0\uc2dc\ub9cc \uae30\ub2e4\ub824 \uc8fc\uc138\uc694 ..."})]}),i&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:"h1 text-center",children:"Online Post-it"}),Object(x.jsx)(z.a,{className:"my-3",style:{minHeight:"80vh",backgroundColor:"rgba(255,255,255,0.2)"},children:Object(x.jsxs)(R.a,{children:[Object(x.jsx)(D.a,{lg:"2",children:Object(x.jsx)(O,{})}),Object(x.jsx)(D.a,{lg:"10",children:Object(x.jsx)(C,{})})]})})]}),a&&Object(x.jsx)("div",{className:"text-center",children:"\uc5d0\ub7ec \ubc1c\uc0dd"})]})]})},T=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,74)).then((function(e){var n=e.getCLS,i=e.getFID,o=e.getFCP,a=e.getLCP,r=e.getTTFB;n(t),i(t),o(t),a(t),r(t)}))},E=(n(63),n(13)),H=n(45),J=n(15),K=n.n(J),V=n(16),A=function(){return new Promise((function(t){return"[]"===localStorage.getItem("noteList")||"null"===localStorage.getItem("noteList")||null===localStorage.getItem("noteList")?setTimeout((function(){return t(q())}),400):localStorage.getItem("noteList")?setTimeout((function(){return t(B())}),400):void 0}))},B=function(){return JSON.parse(localStorage.getItem("noteList"))},q=function(){return[{description:"",height:250,id:0,isFoldPost:!1,isVisible:!1,title:"",width:250,x:10,y:10}]},G=K.a.mark(W),M=K.a.mark(X);function W(){var t,e,n;return K.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return t=p.loadPostSuccess,e=p.loadPostFail,i.prev=1,i.next=4,Object(V.b)(A);case 4:return n=i.sent,i.next=7,Object(V.d)(t(n));case 7:i.next=13;break;case 9:return i.prev=9,i.t0=i.catch(1),i.next=13,Object(V.d)(e(i.t0));case 13:case"end":return i.stop()}}),G,null,[[1,9]])}function X(){var t;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=p.loadPost,e.next=3,Object(V.e)(t,W);case 3:case"end":return e.stop()}}),M)}var Q=K.a.mark(U);function U(){return K.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(V.a)([Object(V.c)(X)]);case 2:case"end":return t.stop()}}),Q)}var Y=Object(E.b)({postListReducer:f}),Z=Object(H.a)(),$=function(){var t=Object(u.a)({reducer:Y,devTools:!0,middleware:[Z]});return Z.run(U),t}();c.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(v.a,{store:$,children:Object(x.jsx)(_,{})})}),document.getElementById("root")),T()}},[[65,1,2]]]);
//# sourceMappingURL=main.16495a99.chunk.js.map