(this.webpackJsonpacres=this.webpackJsonpacres||[]).push([[36],{108:function(e,t,s){"use strict";var a=s(0),n=s.n(a).a.createContext(null);n.displayName="CardContext",t.a=n},117:function(e,t,s){"use strict";var a=s(0),n=s.n(a).a.createContext(null);t.a=n},142:function(e){e.exports=JSON.parse('[{"id":1,"img":"assets/img/agents/1.jpg","name":"Randy Blue","post":"Expert at Company","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,","star":true},{"id":2,"img":"assets/img/agents/2.jpg","name":"Rinda Flow","post":"Expert at Company","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,","star":false},{"id":3,"img":"assets/img/agents/3.jpg","name":"Gina Mconihon","post":"Expert at Company","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,","star":false},{"id":4,"img":"assets/img/agents/4.jpg","name":"Oliver Rasky","post":"Expert at Company","text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,","star":true}]')},159:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];function a(){for(var e=arguments.length,s=Array(e),a=0;a<e;a++)s[a]=arguments[a];var n=null;return t.forEach((function(e){if(null==n){var t=e.apply(void 0,s);null!=t&&(n=t)}})),n}return(0,i.default)(a)};var a,n=s(160),i=(a=n)&&a.__esModule?a:{default:a};e.exports=t.default},160:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,s,a,n,i,r){var c=n||"<<anonymous>>",l=r||a;if(null==s[a])return t?new Error("Required "+i+" `"+l+"` was not specified in `"+c+"`."):null;for(var o=arguments.length,d=Array(o>6?o-6:0),m=6;m<o;m++)d[m-6]=arguments[m];return e.apply(void 0,[s,a,c,i,l].concat(d))}var s=t.bind(null,!1);return s.isRequired=t.bind(null,!0),s},e.exports=t.default},260:function(e,t,s){"use strict";var a=s(5),n=s(0),i=s.n(n),r=s(110),c=s(117),l=s(90),o=function(e){var t=Object(r.a)(e,{activeKey:"onSelect"}),s=t.id,a=t.generateChildId,o=t.onSelect,d=t.activeKey,m=t.transition,u=t.mountOnEnter,j=t.unmountOnExit,b=t.children,p=Object(n.useMemo)((function(){return a||function(e,t){return s?s+"-"+t+"-"+e:null}}),[s,a]),g=Object(n.useMemo)((function(){return{onSelect:o,activeKey:d,transition:m,mountOnEnter:u||!1,unmountOnExit:j||!1,getControlledId:function(e){return p(e,"tabpane")},getControllerId:function(e){return p(e,"tab")}}}),[o,d,m,u,j,p]);return i.a.createElement(c.a.Provider,{value:g},i.a.createElement(l.a.Provider,{value:o||null},b))},d=s(3),m=s(8),u=s(75),j=s.n(u),b=s(82),p=i.a.forwardRef((function(e,t){var s=e.bsPrefix,a=e.as,n=void 0===a?"div":a,r=e.className,c=Object(m.a)(e,["bsPrefix","as","className"]),l=Object(b.a)(s,"tab-content");return i.a.createElement(n,Object(d.a)({ref:t},c,{className:j()(r,l)}))})),g=s(150);var h=i.a.forwardRef((function(e,t){var s=function(e){var t=Object(n.useContext)(c.a);if(!t)return e;var s=t.activeKey,a=t.getControlledId,i=t.getControllerId,r=Object(m.a)(t,["activeKey","getControlledId","getControllerId"]),o=!1!==e.transition&&!1!==r.transition,u=Object(l.b)(e.eventKey);return Object(d.a)({},e,{active:null==e.active&&null!=u?Object(l.b)(s)===u:e.active,id:a(e.eventKey),"aria-labelledby":i(e.eventKey),transition:o&&(e.transition||r.transition||g.a),mountOnEnter:null!=e.mountOnEnter?e.mountOnEnter:r.mountOnEnter,unmountOnExit:null!=e.unmountOnExit?e.unmountOnExit:r.unmountOnExit})}(e),a=s.bsPrefix,r=s.className,o=s.active,u=s.onEnter,p=s.onEntering,h=s.onEntered,x=s.onExit,y=s.onExiting,O=s.onExited,f=s.mountOnEnter,v=s.unmountOnExit,N=s.transition,w=s.as,I=void 0===w?"div":w,E=(s.eventKey,Object(m.a)(s,["bsPrefix","className","active","onEnter","onEntering","onEntered","onExit","onExiting","onExited","mountOnEnter","unmountOnExit","transition","as","eventKey"])),k=Object(b.a)(a,"tab-pane");if(!o&&!N&&v)return null;var L=i.a.createElement(I,Object(d.a)({},E,{ref:t,role:"tabpanel","aria-hidden":!o,className:j()(r,k,{active:o})}));return N&&(L=i.a.createElement(N,{in:o,onEnter:u,onEntering:p,onEntered:h,onExit:x,onExiting:y,onExited:O,mountOnEnter:f,unmountOnExit:v},L)),i.a.createElement(c.a.Provider,{value:null},i.a.createElement(l.a.Provider,{value:null},L))}));h.displayName="TabPane";var x=h,y=function(e){function t(){return e.apply(this,arguments)||this}return Object(a.a)(t,e),t.prototype.render=function(){throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")},t}(i.a.Component);y.Container=o,y.Content=p,y.Pane=x;t.a=y},261:function(e,t,s){"use strict";var a=s(3),n=s(8),i=s(75),r=s.n(i),c=(s(159),s(0)),l=s.n(c),o=s(110),d=s(82),m=s(170),u=s(108),j=s(168),b=s(169),p=s(138),g=s(137),h=s(90),x=s(117),y=function(){},O=l.a.forwardRef((function(e,t){var s,i,r=e.as,o=void 0===r?"ul":r,d=e.onSelect,m=e.activeKey,u=e.role,O=e.onKeyDown,f=Object(n.a)(e,["as","onSelect","activeKey","role","onKeyDown"]),v=Object(b.a)(),N=Object(c.useRef)(!1),w=Object(c.useContext)(h.a),I=Object(c.useContext)(x.a);I&&(u=u||"tablist",m=I.activeKey,s=I.getControlledId,i=I.getControllerId);var E=Object(c.useRef)(null),k=function(e){var t=E.current;if(!t)return null;var s=Object(j.a)(t,"[data-rb-event-key]:not(.disabled)"),a=t.querySelector(".active");if(!a)return null;var n=s.indexOf(a);if(-1===n)return null;var i=n+e;return i>=s.length&&(i=0),i<0&&(i=s.length-1),s[i]},L=function(e,t){null!=e&&(d&&d(e,t),w&&w(e,t))};Object(c.useEffect)((function(){if(E.current&&N.current){var e=E.current.querySelector("[data-rb-event-key].active");e&&e.focus()}N.current=!1}));var C=Object(p.a)(t,E);return l.a.createElement(h.a.Provider,{value:L},l.a.createElement(g.a.Provider,{value:{role:u,activeKey:Object(h.b)(m),getControlledId:s||y,getControllerId:i||y}},l.a.createElement(o,Object(a.a)({},f,{onKeyDown:function(e){var t;switch(O&&O(e),e.key){case"ArrowLeft":case"ArrowUp":t=k(-1);break;case"ArrowRight":case"ArrowDown":t=k(1);break;default:return}t&&(e.preventDefault(),L(t.dataset.rbEventKey,e),N.current=!0,v())},ref:C,role:u}))))})),f=l.a.forwardRef((function(e,t){var s=e.bsPrefix,i=e.className,c=e.children,o=e.as,m=void 0===o?"div":o,u=Object(n.a)(e,["bsPrefix","className","children","as"]);return s=Object(d.a)(s,"nav-item"),l.a.createElement(m,Object(a.a)({},u,{ref:t,className:r()(i,s)}),c)}));f.displayName="NavItem";var v=f,N=s(182),w=l.a.forwardRef((function(e,t){var s,i,j,b=Object(o.a)(e,{activeKey:"onSelect"}),p=b.as,g=void 0===p?"div":p,h=b.bsPrefix,x=b.variant,y=b.fill,f=b.justify,v=b.navbar,N=b.className,w=b.children,I=b.activeKey,E=Object(n.a)(b,["as","bsPrefix","variant","fill","justify","navbar","className","children","activeKey"]),k=Object(d.a)(h,"nav"),L=!1,C=Object(c.useContext)(m.a),P=Object(c.useContext)(u.a);return C?(i=C.bsPrefix,L=null==v||v):P&&(j=P.cardHeaderBsPrefix),l.a.createElement(O,Object(a.a)({as:g,ref:t,activeKey:I,className:r()(N,(s={},s[k]=!L,s[i+"-nav"]=L,s[j+"-"+x]=!!j,s[k+"-"+x]=!!x,s[k+"-fill"]=y,s[k+"-justified"]=f,s))},E),w)}));w.displayName="Nav",w.defaultProps={justify:!1,fill:!1},w.Item=v,w.Link=N.a;t.a=w},488:function(e,t,s){"use strict";s.r(t);var a=s(71),n=s(72),i=s(74),r=s(73),c=s(1),l=s(0),o=s(86),d=s.n(o),m=s(84),u=s(92),j=s(85),b=s(11),p=s(289),g=s(260),h=s(261),x=s(455),y=s(182),O=s(458),f=s(142),v=s(93),N=Object(c.jsx)(p.a,{children:"Gallery"}),w=Object(c.jsx)(p.a,{children:"Beds"}),I=Object(c.jsx)(p.a,{children:"Bathrooms"}),E=Object(c.jsx)(p.a,{children:"Square Feet"}),k=function(e){Object(i.a)(s,e);var t=Object(r.a)(s);function s(){return Object(a.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(c.jsx)("div",{className:"section agent-wrapper",children:Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"row",children:Object(c.jsxs)(g.a.Container,{defaultActiveKey:"tab1",children:[Object(c.jsx)("div",{className:"col-lg-4",children:Object(c.jsxs)("div",{className:"sidebar sticky-sidebar sidebar-left",children:[Object(c.jsx)("div",{className:"sidebar-widget",children:Object(c.jsxs)(h.a,{variant:"tabs",className:"nav nav-tabs tab-cards",children:[Object(c.jsx)(h.a.Item,{children:Object(c.jsx)(h.a.Link,{eventKey:"tab1",children:"Overview"})}),Object(c.jsx)(h.a.Item,{children:Object(c.jsx)(h.a.Link,{eventKey:"tab2",children:"Listings"})}),Object(c.jsx)(h.a.Item,{children:Object(c.jsx)(h.a.Link,{eventKey:"tab3",children:"Agents"})})]})}),Object(c.jsxs)("div",{className:"sidebar-widget sidebar-widget-agent",children:[Object(c.jsxs)("div",{className:"media sidebar-author listing-agent",children:[Object(c.jsx)("img",{src:"/assets/img/companies/2.png",alt:"agent"}),Object(c.jsxs)("div",{className:"media-body",children:[Object(c.jsx)("h6",{children:" Jumpy Co. Real Estate"}),Object(c.jsx)("span",{children:"Real Estate"})]}),Object(c.jsxs)(x.a,{className:"options-dropdown",children:[Object(c.jsx)(x.a.Toggle,{as:y.a,children:Object(c.jsx)("i",{className:"fas fa-ellipsis-v"})}),Object(c.jsx)(x.a.Menu,{className:"dropdown-menu-right",children:Object(c.jsxs)("ul",{children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(b.b,{to:"tel:+123456789",children:[" ",Object(c.jsx)("i",{className:"fas fa-phone"})," Call Jumpy Co."]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(b.b,{to:"#",children:[" ",Object(c.jsx)("i",{className:"fas fa-star"})," Save Agency"]})," "]})]})})]})]}),Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}),Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("input",{type:"text",className:"form-control",placeholder:"Email Address",name:"email"})}),Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("input",{type:"text",className:"form-control",placeholder:"Phone Number",name:"phone"})}),Object(c.jsx)("div",{className:"form-group",children:Object(c.jsx)("textarea",{name:"message",rows:3,placeholder:"Enter your message",className:"form-control"})}),Object(c.jsx)("button",{type:"submit",className:"btn-custom primary light btn-block",children:"Send Message"})]})]})]})}),Object(c.jsx)("div",{className:"col-lg-8",children:Object(c.jsxs)(g.a.Content,{className:"m-0",children:[Object(c.jsx)(g.a.Pane,{eventKey:"tab1",children:Object(c.jsxs)("div",{className:"agency-content",children:[Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}),Object(c.jsx)("h4",{children:"Into the subject"}),Object(c.jsxs)("p",{children:["Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",Object(c.jsx)(b.b,{to:"#",children:"Lorem Ipsum has been the industry's"})," standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."]}),Object(c.jsx)("img",{src:"/assets/img/blog/4.jpg",alt:"post"}),Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting"}),Object(c.jsxs)("blockquote",{children:[Object(c.jsx)("h5",{children:"Real estate is booming"}),Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"})]}),Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}),Object(c.jsxs)("div",{className:"row",children:[Object(c.jsx)("div",{className:"col-md-6",children:Object(c.jsx)(b.b,{to:"assets/img/blog/9.jpg",className:"gallery-thumb",children:Object(c.jsx)("img",{src:"/assets/img/blog/9.jpg",alt:"post"})})}),Object(c.jsx)("div",{className:"col-md-6",children:Object(c.jsx)(b.b,{to:"assets/img/blog/7.jpg",className:"gallery-thumb",children:Object(c.jsx)("img",{src:"/assets/img/blog/7.jpg",alt:"post"})})})]}),Object(c.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]})}),Object(c.jsx)(g.a.Pane,{eventKey:"tab2",children:Object(c.jsx)("div",{className:"row",children:v.slice(0,4).map((function(e,t){return Object(c.jsx)("div",{className:"col-md-6",children:Object(c.jsxs)("div",{className:"listing",children:[Object(c.jsxs)("div",{className:"listing-thumbnail",children:[Object(c.jsx)(b.b,{to:"/listing-details-v1",children:Object(c.jsx)("img",{src:"/"+e.gridimg,alt:"listing"})}),Object(c.jsxs)("div",{className:"listing-badges",children:[!0===e.star?Object(c.jsxs)("span",{className:"listing-badge featured",children:[" ",Object(c.jsx)("i",{className:"fas fa-star"})," "]}):"",!0===e.sale?Object(c.jsx)("span",{className:"listing-badge sale",children:"On Sale"}):"",!0===e.pending?Object(c.jsx)("span",{className:"listing-badge pending",children:" Pending"}):"",!0===e.rental?Object(c.jsx)("span",{className:"listing-badge rent",children:" Rental"}):""]}),Object(c.jsxs)("div",{className:"listing-controls",children:[Object(c.jsx)(b.b,{to:"#",className:"favorite",children:Object(c.jsx)("i",{className:"far fa-heart"})}),Object(c.jsx)(b.b,{to:"#",className:"compare",children:Object(c.jsx)("i",{className:"fas fa-sync-alt"})})]})]}),Object(c.jsxs)("div",{className:"listing-body",children:[Object(c.jsxs)("div",{className:"listing-author",children:[Object(c.jsx)("img",{src:"/"+e.authorimg,alt:"author"}),Object(c.jsxs)("div",{className:"listing-author-body",children:[Object(c.jsxs)("p",{children:[" ",Object(c.jsx)(b.b,{to:"#",children:e.authorname})," "]}),Object(c.jsx)("span",{className:"listing-date",children:e.postdate})]}),Object(c.jsxs)(x.a,{className:"options-dropdown",children:[Object(c.jsx)(x.a.Toggle,{as:y.a,children:Object(c.jsx)("i",{className:"fas fa-ellipsis-v"})}),Object(c.jsx)(x.a.Menu,{className:"dropdown-menu-right",children:Object(c.jsxs)("ul",{children:[Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(b.b,{to:"tel:+123456789",children:[" ",Object(c.jsx)("i",{className:"fas fa-phone"})," Call Agent"]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(b.b,{to:"mailto:+123456789",children:[" ",Object(c.jsx)("i",{className:"fas fa-envelope"})," Send Message"]})," "]}),Object(c.jsxs)("li",{children:[" ",Object(c.jsxs)(b.b,{to:"/listing-details-v1",children:[" ",Object(c.jsx)("i",{className:"fas fa-bookmark"})," Book Tour"]})," "]})]})})]})]}),Object(c.jsxs)("h5",{className:"listing-title",children:[" ",Object(c.jsx)(b.b,{to:"/listing-details-v1",title:e.title,children:e.title})," "]}),Object(c.jsxs)("span",{className:"listing-price",children:[(new Intl.NumberFormat).format(e.monthlyprice.toFixed(2)),"$ ",Object(c.jsx)("span",{children:"/month"})," "]}),Object(c.jsx)("p",{className:"listing-text",children:e.text}),Object(c.jsxs)("div",{className:"acr-listing-icons",children:[Object(c.jsx)(O.a,{overlay:w,children:Object(c.jsxs)("div",{className:"acr-listing-icon",children:[Object(c.jsx)("i",{className:"flaticon-bedroom"}),Object(c.jsx)("span",{className:"acr-listing-icon-value",children:e.beds})]})}),Object(c.jsx)(O.a,{overlay:I,children:Object(c.jsxs)("div",{className:"acr-listing-icon",children:[Object(c.jsx)("i",{className:"flaticon-bathroom"}),Object(c.jsx)("span",{className:"acr-listing-icon-value",children:e.bathrooms})]})}),Object(c.jsx)(O.a,{overlay:E,children:Object(c.jsxs)("div",{className:"acr-listing-icon",children:[Object(c.jsx)("i",{className:"flaticon-ruler"}),Object(c.jsx)("span",{className:"acr-listing-icon-value",children:(new Intl.NumberFormat).format(e.area)})]})})]}),Object(c.jsxs)("div",{className:"listing-gallery-wrapper",children:[Object(c.jsx)(b.b,{to:"/listing-details-v1",className:"btn-custom btn-sm secondary",children:"View Details"}),Object(c.jsx)(O.a,{overlay:N,children:Object(c.jsxs)(b.b,{to:"#",className:"listing-gallery",children:[" ",Object(c.jsx)("i",{className:"fas fa-camera"})," "]})})]})]})]})},t)}))})}),Object(c.jsx)(g.a.Pane,{eventKey:"tab3",children:Object(c.jsx)("div",{className:"row",children:f.slice(0,4).map((function(e,t){return Object(c.jsx)("div",{className:"col-lg-6",children:Object(c.jsxs)("div",{className:"acr-agent",children:[!0===e.star?Object(c.jsx)("div",{className:"listing-badge featured",children:Object(c.jsx)("i",{className:"fas fa-star"})}):"",Object(c.jsxs)("div",{className:"acr-dots-wrapper acr-agent-thumb",children:[Object(c.jsx)("div",{className:"acr-dots"}),Object(c.jsx)(b.b,{to:"/agent-details",children:Object(c.jsx)("img",{src:"/"+e.img,alt:"agent"})})]}),Object(c.jsxs)("div",{className:"acr-agent-body",children:[Object(c.jsxs)("h6",{children:[" ",Object(c.jsx)(b.b,{to:"/agent-details",children:e.name})," "]}),Object(c.jsx)("span",{children:e.post}),Object(c.jsx)("p",{children:e.text}),Object(c.jsx)(b.b,{to:"/agent-details",className:"btn-custom secondary btn-sm",children:"View Profile"})]})]})},t)}))})})]})})]})})})})}}]),s}(l.Component),L=function(e){Object(i.a)(s,e);var t=Object(r.a)(s);function s(){return Object(a.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){return Object(c.jsxs)(l.Fragment,{children:[Object(c.jsxs)(d.a,{children:[Object(c.jsx)("title",{children:"Acres - Real Estate React Template | Agency Details"}),Object(c.jsx)("meta",{name:"description",content:"#"})]}),Object(c.jsx)(m.a,{}),Object(c.jsx)(u.a,{breadcrumb:{pagename:"Agency Details"}}),Object(c.jsx)(k,{}),Object(c.jsx)(j.a,{})]})}}]),s}(l.Component);t.default=L},76:function(e,t,s){"use strict";function a(e){throw new Error('"'+e+'" is read-only')}s.d(t,"a",(function(){return a}))},93:function(e){e.exports=JSON.parse('[{"id":1,"gridimg":"assets/img/listings/1.jpg","listimg":"assets/img/listings-list/1.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/2.jpg","authorname":"Heather Mclayn","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":true,"sale":false,"pending":true,"rental":false,"recent":true},{"id":2,"gridimg":"assets/img/listings/2.jpg","listimg":"assets/img/listings-list/2.jpg","title":"Theodore Lowe, Azusa New York 39531","authorimg":"assets/img/people/1.jpg","authorname":"Randy Blue","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":true,"sale":true,"pending":false,"rental":false,"recent":true},{"id":3,"gridimg":"assets/img/listings/3.jpg","listimg":"assets/img/listings-list/3.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/2.jpg","authorname":"Heather Mclayn","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":false,"sale":false,"pending":true,"rental":false,"recent":true},{"id":4,"gridimg":"assets/img/listings/4.jpg","listimg":"assets/img/listings-list/4.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/2.jpg","authorname":"Heather Mclayn","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":false,"sale":true,"pending":false,"rental":false,"recent":true},{"id":5,"gridimg":"assets/img/listings/5.jpg","listimg":"assets/img/listings-list/5.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/2.jpg","authorname":"Heather Mclayn","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":false,"sale":true,"pending":false,"rental":false,"recent":false},{"id":6,"gridimg":"assets/img/listings/1.jpg","listimg":"assets/img/listings-list/6.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/4.jpg","authorname":"Mike Stanly","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":false,"sale":false,"pending":false,"rental":true,"recent":false},{"id":7,"gridimg":"assets/img/listings/6.jpg","listimg":"assets/img/listings-list/7.jpg","title":"Iris Watson, Frederick Nebraska 20620","authorimg":"assets/img/people/2.jpg","authorname":"Heather Mclayn","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":true,"sale":false,"pending":true,"rental":false,"recent":false},{"id":8,"gridimg":"assets/img/listings/7.jpg","listimg":"assets/img/listings-list/8.jpg","title":"Theodore Lowe, Azusa New York 39531","authorimg":"assets/img/people/1.jpg","authorname":"Randy Blue","postdate":"March 3, 2020","monthlyprice":3500,"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","beds":3,"bathrooms":2,"area":2499,"star":true,"sale":true,"pending":false,"rental":false,"recent":false}]')}}]);
//# sourceMappingURL=36.2cc59c27.chunk.js.map