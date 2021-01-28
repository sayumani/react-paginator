(this["webpackJsonpreact-paginator-example"]=this["webpackJsonpreact-paginator-example"]||[]).push([[0],{18:function(e,t,a){e.exports=a(46)},19:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);a(19);var n=a(0),r=a.n(n),l=a(11),c=a.n(l),i=a(2),o=a.n(i),s=a(12),u=a(13),m=a(14),g=a(17),h=a(16);var p="_tKiHW",d="_3r29R",f="_3lh7Q",v="_CYikG",E="_3wlTd",P="_2ajQO",b="LEFT",L=function(e,t,a){void 0===a&&(a=1);for(var n=e,r=[];n<=t;)r.push(n),n+=a;return r},N=function(e){var t,a;function l(t){var a;return(a=e.call(this,t)||this).fetchPageNumbers=function(){var e=a.state,t=e.totalPages,n=e.currentPage,r=e.pageNeighbours,l=2*r+3;if(t>l+2){var c=Math.max(2,n-r),i=Math.min(t-1,n+r),o=L(c,i),s=c>2,u=t-i>1,m=l-(o.length+1);switch(!0){case s&&!u:var g=L(c-m,c-1);o=[b].concat(g,o);break;case!s&&u:var h=L(i+1,i+m);o=[].concat(o,h,["RIGHT"]);break;case s&&u:default:o=[b].concat(o,["RIGHT"])}var p=new Set([1].concat(o,[t]));return Array.from(p)}return L(1,t)},a.gotoPage=function(e){var t=a.props.onPageChanged,n=void 0===t?function(e){return e}:t,r=Math.max(0,Math.min(e,a.state.totalPages)),l={currentPage:r,totalPages:a.state.totalPages,pageLimit:a.state.pageLimit,totalRecords:a.state.totalRecords};a.setState({currentPage:r},(function(){return n(l)}))},a.handleClick=function(e){return function(t){t.preventDefault(),a.gotoPage(e)}},a.handleMoveLeft=function(e){e.preventDefault(),a.gotoPage(a.state.currentPage-2*a.state.pageNeighbours-1)},a.handleMoveRight=function(e){e.preventDefault(),a.gotoPage(a.state.currentPage+2*a.state.pageNeighbours+1)},a.state={currentPage:1,pageLimit:30,totalRecords:0,pageNeighbours:0,totalPages:1},a}a=e,(t=l).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var c=l.prototype;return c.componentDidUpdate=function(e){if(e.totalRecords!==this.props.totalRecords||e.pageLimit!==this.props.pageLimit){var t=this.props,a=t.totalRecords,n=void 0===a?null:a,r=t.pageLimit,l=void 0===r?30:r,c=t.pageNeighbours,i=void 0===c?0:c;l="number"===typeof l?l:30,n="number"===typeof n?n:0,i="number"===typeof i?Math.max(0,Math.min(i,2)):0;var o=Math.ceil(n/l),s=e.pageLimit!==this.props.pageLimit?1:this.state.currentPage;this.setState({currentPage:s,pageLimit:l,totalRecords:n,pageNeighbours:i,totalPages:o})}},c.render=function(){var e=this;if(!this.state.totalRecords||1===this.state.totalPages)return null;console.log(this.state);var t=this.state.currentPage,a=this.fetchPageNumbers();return r.a.createElement(n.Fragment,null,r.a.createElement("nav",{"aria-label":"Pagination",className:P},r.a.createElement("ul",{className:d},a.map((function(a,n){return a===b?r.a.createElement("li",{key:n,className:v},r.a.createElement("a",{className:f,href:"#","aria-label":"Previous",onClick:e.handleMoveLeft},r.a.createElement("span",{"aria-hidden":"true"},"\xab"),r.a.createElement("span",{className:E},"Previous"))):"RIGHT"===a?r.a.createElement("li",{key:n,className:v},r.a.createElement("a",{className:f,href:"#","aria-label":"Next",onClick:e.handleMoveRight},r.a.createElement("span",{"aria-hidden":"true"},"\xbb"),r.a.createElement("span",{className:E},"Next"))):r.a.createElement("li",{key:n,className:t===a?v+" "+p:""+v},r.a.createElement("a",{className:f,href:"#",onClick:e.handleClick(a)},a))})))))},l}(n.Component),y=a(15),R=a.n(y),k=(a(45),function(e){Object(g.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).onPageChanged=function(e){var t=n.state.list,a=e.currentPage,r=e.pageLimit,l=(a-1)*r,c=t.slice(l,l+r);n.setState({currentPage:a,currentList:c})},n.handleChange=function(e){var t=e.currentTarget.value;n.setState({pageLimit:+t,currentList:n.state.list.slice(0,+t)})},n.state={totalRecords:0,currentPage:0,list:[],currentList:[],pageLimit:25},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var e=Object(s.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.a.get("https://jsonplaceholder.typicode.com/photos");case 2:t=e.sent,this.setState({list:t.data,currentList:t.data.slice(0,30),totalRecords:t.data.length});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.currentList.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.albumId),r.a.createElement("td",null,e.title),r.a.createElement("td",null,e.url))}));return r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("label",{className:"label"},"PageLimit"),r.a.createElement("select",{className:"select",value:this.state.pageLimit,onChange:this.handleChange},r.a.createElement("option",{value:"25"},"25"),r.a.createElement("option",{value:"50"},"50"),r.a.createElement("option",{value:"100"},"100"))),r.a.createElement("div",{style:{overflowX:"auto"}},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"AlbumId"),r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"URL"))),r.a.createElement("tbody",null,e))),r.a.createElement(N,{totalRecords:this.state.totalRecords,onPageChanged:this.onPageChanged,pageLimit:this.state.pageLimit,pageNeighbours:2}))}}]),a}(r.a.Component));c.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.204b6c1d.chunk.js.map