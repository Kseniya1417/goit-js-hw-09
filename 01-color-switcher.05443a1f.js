const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");e.addEventListener("click",(function(){n=setInterval(a,1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){clearInterval(n),e.disabled=!1,t.disabled=!0}));let n=null;function a(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.disabled=!0;
//# sourceMappingURL=01-color-switcher.05443a1f.js.map
