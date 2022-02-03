(()=>{"use strict";var t,e={6660:(t,e,n)=>{n.d(e,{Z:()=>a});var i=n(559),s=n.n(i),o=n(3476),r=n.n(o)()(s());r.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500&display=swap);"]),r.push([t.id,'#background-canvas{position:absolute;top:0;left:0;z-index:-1}.btn{font-size:20px;font-weight:300;outline:none;background:transparent;color:#fff;border:1px solid #fff;padding:.5rem 3rem;letter-spacing:.1em;cursor:pointer;transition:transform 150ms ease-in-out,background-color 100ms ease-in-out}.btn:before{content:"";width:100%;height:100%;border:1px solid #fff;border-top:none;border-left:none;position:absolute;top:4px;left:4px;transition:transform 200ms ease-in-out}.btn:hover{background:rgba(255,255,255,.1);transform:translate(4px, 4px)}.btn:hover::before{transform:translate(-4px, -4px)}.btn#start-btn{margin:auto;position:absolute;left:0;right:0;top:0;bottom:0;height:45px;transition:transform 150ms ease-in-out,background-color 100ms ease-in-out,opacity 300ms ease-in-out,visibility 300ms ease-in-out}*{font-family:Roboto Mono,sans-serif}body{color:rgba(255,255,255,.8);background:#333;margin:0;padding:0;overflow:hidden}',"",{version:3,sources:["webpack://./../styles/components/canvas/canvas.sass","webpack://./../styles/components/buttons/buttons.sass","webpack://./../styles/mixins.sass","webpack://./../styles/page.sass"],names:[],mappings:"AAAA,mBACE,iBAAA,CACA,KAAA,CACA,MAAA,CACA,UAAA,CCFF,KAGE,cAAA,CACA,eAAA,CACA,YAAA,CACA,sBAAA,CACA,UAAA,CACA,qBAAA,CACA,kBAAA,CACA,mBAAA,CACA,cAAA,CAEA,yEAZiB,CAcjB,YACE,UAAA,CACA,UAAA,CACA,WAAA,CACA,qBAAA,CACA,eAAA,CACA,gBAAA,CACA,iBAAA,CACA,OAAA,CACA,QAAA,CACA,sCAAA,CAGF,WACE,+BAAA,CACA,6BAAA,CAEA,mBACE,+BAAA,CAEJ,eCpCA,WAAA,CACA,iBAAA,CACA,MAAA,CACA,OAAA,CACA,KAAA,CACA,QAAA,CACA,WD+BmB,CAEjB,gIAAA,CExCJ,EACE,kCAAA,CAEF,KACE,0BAAA,CACA,eAAA,CACA,QAAA,CACA,SAAA,CACA,eAAA",sourcesContent:["#background-canvas\r\n  position: absolute\r\n  top: 0\r\n  left: 0\r\n  z-index: -1\r\n","@import \"../../mixins\"\r\n\r\n.btn\r\n  $btn-transition: transform 150ms ease-in-out, background-color 100ms ease-in-out\r\n\r\n  font-size: 20px\r\n  font-weight: 300\r\n  outline: none\r\n  background: transparent\r\n  color: white\r\n  border: 1px solid white\r\n  padding: 0.5rem 3rem\r\n  letter-spacing: 0.1em\r\n  cursor: pointer\r\n\r\n  transition: $btn-transition\r\n\r\n  &:before\r\n    content: ''\r\n    width: 100%\r\n    height: 100%\r\n    border: 1px solid white\r\n    border-top: none\r\n    border-left: none\r\n    position: absolute\r\n    top: 4px\r\n    left: 4px\r\n    transition: transform 200ms ease-in-out\r\n\r\n\r\n  &:hover\r\n    background: rgba(255, 255, 255, 0.1)\r\n    transform: translate(4px, 4px)\r\n\r\n    &::before\r\n      transform: translate(-4px, -4px)\r\n\r\n  &#start-btn\r\n    +absolute-center(45px)\r\n\r\n    transition: $btn-transition, opacity 300ms ease-in-out, visibility 300ms ease-in-out\r\n","=absolute-center($width: fit-content)\r\n  margin: auto\r\n  position: absolute\r\n  left: 0\r\n  right: 0\r\n  top: 0\r\n  bottom: 0\r\n  height: $width\r\n","*\r\n  font-family: Roboto Mono, sans-serif\r\n\r\nbody\r\n  color: transparentize(white, 0.2)\r\n  background: #333\r\n  margin: 0\r\n  padding: 0\r\n  overflow: hidden\r\n"],sourceRoot:""}]);const a=r},9947:(t,e,n)=>{n.r(e),n.d(e,{default:()=>C});var i=n(1892),s=n.n(i),o=n(5760),r=n.n(o),a=n(8311),c=n.n(a),l=n(8192),d=n.n(l),u=n(8060),h=n.n(u),_=n(4865),p=n.n(_),A=n(6660),m={};m.styleTagTransform=p(),m.setAttributes=d(),m.insert=c().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=h(),s()(A.Z,m);const C=A.Z&&A.Z.locals?A.Z.locals:void 0},477:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;const i=n(3496),s=n(1138),o=n(4677);class r extends i.Module{static _instance=new r;static get instance(){return this._instance}constructor(){super([new s.Canvas,new o.Layout])}get canvas(){return this.getSubmodule(s.Canvas)}}e.App=r},8605:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.easeInOutQuad=void 0,e.easeInOutQuad=t=>t<.5?2*t*t:1-(-2*t+2)**2/2},112:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Animations=void 0;const i=n(3496),s=n(7937),o=n(8605);class r extends i.Module{_animations;_lastId;constructor(){super(),this._animations=new Map,this._lastId=0}addAnimation(t,e,n,i,r=o.easeInOutQuad){const a=++this._lastId,c={object:t,property:e,duration:n,values:i,algorithm:r},l=new s.ObservableAnimation(a,c).on("interruption",this._removeAnimation,this).on("finish",this._removeAnimation,this);return this._animations.set(a,l),l}get(){return this._animations}_removeAnimation(t){this._animations.delete(t.id)}}e.Animations=r},7937:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ObservableAnimation=void 0,e.ObservableAnimation=class{_id;_data;_subscriptions;_currentValue;_progress;constructor(t,e){this._id=t,this._data=e,this._subscriptions=new Map;const{object:n,property:i,values:s}=this._data,o=n[i];s.initial||(s.initial=o),this._currentValue=s.initial,this._progress=0}on(t,e,n){const i=this._subscriptions.get(t),s=e.bind(n);return this._subscriptions.set(t,i?[...i,s]:[s]),this}updateProgress(){this._progress++,this._progress>=this._data.duration&&this._emit("finish")}update(t){this._currentValue=t,this._emit("update")}interrupt(){this._emit("interruption")}finish(){this._emit("finish")}_emit(t){for(const e of this._subscriptions.get(t)??[])e(this)}get id(){return this._id}get data(){return this._data}get progress(){return this._progress}}},1138:function(t,e,n){var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&i(e,t,n);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Canvas=void 0;const r=o(n(6680)),a=n(3496),c=n(112),l=n(1379),d=n(1514);class u extends a.Module{static CANVAS_BACKGROUND=1052688;_app;_viewCanvas;constructor(){super([new l.Ticker,new d.Space,new c.Animations]),this._app=new r.Application({width:window.innerWidth,height:window.innerHeight,backgroundColor:u.CANVAS_BACKGROUND}),this._viewCanvas=this.viewCanvas}onInit(){this._viewCanvas.appendChild(this._app.view),this._app.ticker.add(this.ticker.update,this.ticker),this._app.stage.addChild(this.space.container)}get viewCanvas(){if(this._viewCanvas)return this._viewCanvas;const t=document.getElementById("background-canvas");if(!t)throw new Error("Canvas element does not exist on document");return t}get ticker(){return this.getSubmodule(l.Ticker)}get space(){return this.getSubmodule(d.Space)}get animations(){return this.getSubmodule(c.Animations)}get app(){return this._app}}e.Canvas=u},6548:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CircleMotionController=void 0;const i=n(3496),s=n(477);class o extends i.Module{static CIRCLE_SIZE=10;static CIRCLE_OFFSET=25;splitStars(t){const e=Math.ceil(t.length/3),n=[];return n.push(t.slice(0,e)),n.push(t.slice(e,2*e)),n.push(t.slice(2*e)),n}makeCircle(t,e,n){const i=t.children.length,r=360/i;let a;for(let c=0;c<i;c++){const i=(0+r*c)*Math.PI/180,l=e+o.CIRCLE_SIZE*Math.cos(i),d=n+o.CIRCLE_SIZE*Math.sin(i),u=t.children[c];u.scale.set(1),s.App.instance.canvas.animations.addAnimation(u,"x",50,{target:l}),s.App.instance.canvas.animations.addAnimation(u,"y",50,{target:d}),a=s.App.instance.canvas.animations.addAnimation(u,"alpha",50,{target:.5})}return a}moveCircle(t,e,n){return this.moveAbsoluteCircle(t,t.x+e,t.y+n)}moveAbsoluteCircle(t,e,n){return s.App.instance.canvas.animations.addAnimation(t,"alpha",20,{target:.75}).on("finish",(()=>{s.App.instance.canvas.animations.addAnimation(t,"alpha",20,{target:1})})),s.App.instance.canvas.animations.addAnimation(t,"x",40,{target:e}),s.App.instance.canvas.animations.addAnimation(t,"y",40,{target:n})}}e.CircleMotionController=o},8256:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FocusController=void 0;const i=n(7774),s=n(3496),o=n(8682),r=n(3574),a=n(6067),c=n(477);class l extends s.Module{_clonedStars;_enterAnimations;_exitAnimations;_isFocusAnimationRunning;constructor(){super(),this._clonedStars=new Set,this._enterAnimations=new Map,this._exitAnimations=new Map,this._isFocusAnimationRunning=!1}start(){r.Events.on(o.Event.SPACE_BUTTON_HOVER,this._onSpaceButtonHover,this),r.Events.on(o.Event.SPACE_BUTTON_OUT,this._onSpaceButtonOut,this)}onDispose(){this._interruptAnimations(this._exitAnimations),this._exitAnimations.clear(),this._interruptAnimations(this._enterAnimations),this._enterAnimations.clear(),this._clonedStars.clear(),r.Events.removeListener(o.Event.SPACE_BUTTON_HOVER,this._onSpaceButtonHover,this),r.Events.removeListener(o.Event.SPACE_BUTTON_OUT,this._onSpaceButtonOut,this)}_onSpaceButtonHover(t){if(!t)return;const e=t.base.target;if(!(e instanceof HTMLElement))return;const n=e.getBoundingClientRect(),i=this._getOrCloneStars(n),s=this._getStarPositionTargetsFor(i,n);this._addStarEnterAnimations(i,s),this._isFocusAnimationRunning=!0}_onSpaceButtonOut(){const t=Array.from(this._enterAnimations.keys());this._interruptAnimations(this._enterAnimations);for(const e of t)this._exitAnimations.has(e)||this._addExitAnimation(e,40)}_getStarPositionTargetsFor(t,e){const n=[],{x:i,y:s,width:o,height:r}=e,c=i+o,l=s+r,d=(2*o+2*r)/t.length;for(let e=0;e<t.length;e++){let t=d*e,u=i+t,h=s;u>c&&(t-=o,u=c,h=s+t),h>l&&(t-=r,h=s+r,u=c-t),u<i&&(t-=o,u=i,h=l-t);let _=2.5;(0,a.isPhone)()&&(_=5),u+=10*Math.random()-_,h+=10*Math.random()-_,n.push({x:u,y:h})}return n}_addStarEnterAnimations(t,e){this._interruptAnimations(this._exitAnimations);for(const n of t){if(this._enterAnimations.has(n))continue;const{x:t,y:s}=n.position;let o={target:e[0],distance:1/0,index:-1};for(let n=0;n<e.length;n++){const r=e[n],a=(0,i.get2DVectorDistance)(t,s,r.x,r.y);a<o.distance&&(o={target:r,distance:a,index:n})}e.splice(o.index,1),this._addEnterAnimation(n,o.target,1,30)}}_getCloseRectChildren(t){const{x:e,y:n,width:s,height:o}=t;return c.App.instance.canvas.space.stars.filter((({sprite:{x:t,y:r}})=>(0,i.get2DVectorToRectDistance)(t,r,e,n,s,o)<40))}_addEnterAnimation(t,e,n,i){const{x:s,y:o}=e,r=this._getAnimation(t,s,o,n,i);this._enterAnimations.set(t,r)}_addExitAnimation(t,e){const{x:n,y:i}=t.position,s=this._getAnimation(t,n,i,0,e);this._exitAnimations.set(t,s),s.alpha.on("finish",(()=>{this._exitAnimations.delete(t),this._clonedStars.delete(t),t.destroy(),this._isFocusAnimationRunning=!1}))}_getAnimation(t,e,n,i,s){const{animations:o}=c.App.instance.canvas;return{alpha:o.addAnimation(t.sprite,"alpha",s,{target:i}),x:o.addAnimation(t.sprite.position,"x",s,{target:e}),y:o.addAnimation(t.sprite.position,"y",s,{target:n})}}_interruptAnimations(t){for(const e of t.values())e.alpha.interrupt(),e.x.interrupt(),e.y.interrupt();t.clear()}_getOrCloneStars(t){if(0===this._clonedStars.size)for(const e of this._getCloseRectChildren(t).map((t=>t.clone())))this._clonedStars.add(e);return Array.from(this._clonedStars)}get nearStartButtonStars(){const t=document.getElementById("start-btn");if(!t)return[];const e=t.getBoundingClientRect();return this._getOrCloneStars(e)}}e.FocusController=l},7927:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HoveringController=void 0;const i=n(7774),s=n(3496),o=n(8682),r=n(3574),a=n(477);class c extends s.Module{_starsFadeInAnimations;_starsFadeOutAnimations;constructor(){super(),this._starsFadeInAnimations=new Map,this._starsFadeOutAnimations=new Map}start(){r.Events.on(o.Event.SPACE_POINTER_MOVE,this._onSpacePointerOver,this),r.Events.on(o.Event.SPACE_POINTER_OUT,this._onSpacePointerOut,this)}_onSpacePointerOver(t){if(!t)return;const{base:e}=t,n=this._getClosePointChildren(e);this._removeStarHoveringAnimations(n),this._addStarHoveringAnimations(n)}_onSpacePointerOut(){this._removeStarHoveringAnimations()}_getClosePointChildren(t){const{x:e,y:n}=t.data.global;return a.App.instance.canvas.space.stars.filter((({sprite:{x:t,y:s}})=>(0,i.get2DVectorDistance)(e,n,t,s)<40))}_removeStarHoveringAnimations(t){for(const[e,n]of this._starsFadeInAnimations)t&&t.includes(e)||(n.interrupt(),this._starsFadeInAnimations.delete(e))}_addStarHoveringAnimations(t){const{animations:e}=a.App.instance.canvas;for(const n of t){if(this._starsFadeInAnimations.has(n))continue;this._starsFadeOutAnimations.has(n)&&this._starsFadeOutAnimations.get(n)?.interrupt();const t=e.addAnimation(n.sprite,"alpha",5,{target:1});t.on("interruption",(()=>this._applyFadeOut(n))),this._starsFadeInAnimations.set(n,t)}}_applyFadeOut(t){const e=a.App.instance.canvas.animations.addAnimation(t.sprite,"alpha",15,{target:t.brightness/255});e.on("interruption",(()=>this._starsFadeOutAnimations.delete(t))),e.on("finish",(()=>this._starsFadeOutAnimations.delete(t))),this._starsFadeOutAnimations.set(t,e)}}e.HoveringController=c},1514:function(t,e,n){var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&i(e,t,n);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Space=void 0;const r=o(n(6680)),a=n(3496),c=n(8682),l=n(3574),d=n(5476),u=n(9741),h=n(7927),_=n(8091),p=n(3220);class A extends a.Module{static STAR_RATIO=.008;_stars;_container;constructor(){super([new _.StartView,new d.LandingView,new h.HoveringController]),this._stars=[],this._container=new r.Container,this._container.interactive=!0,this._container.interactiveChildren=!1,this._container.on("pointermove",(t=>l.Events.emit(c.Event.SPACE_POINTER_MOVE,{base:t}))),window.addEventListener("mouseout",this._onMouseOut),window.addEventListener("touchend",this._onMouseOut)}onInit(){this._populateStars(),this._drawSpace(),l.Events.emit(c.Event.ADD_TICKER,{ticker:new u.InitStarsTicker(this._stars)}),l.Events.on(c.Event.SPACE_INITIALIZED,this._onSpaceInitialized,this),l.Events.on(c.Event.START_BUTTON_CLICK,this._onStart,this)}onDispose(){this._container.destroy({children:!0}),window.removeEventListener("mouseout",this._onMouseOut),window.removeEventListener("touchend",this._onMouseOut)}addChild(...t){this._container.addChild(...t)}_onSpaceInitialized(){this.startView.start(),this.hoveringController.start()}_onStart(){const t=this.startView.focusController.nearStartButtonStars;this.startView.dispose(),l.Events.removeListener(c.Event.START_BUTTON_CLICK,this._onStart,this),this.landingView.start(t)}_onMouseOut(t){l.Events.emit(c.Event.SPACE_POINTER_OUT,{base:t})}_populateStars(){const{innerWidth:t,innerHeight:e}=window,n=t*e*A.STAR_RATIO*window.devicePixelRatio;for(let t=0;t<n;t++){const t=p.Star.random();this._stars.push(t)}}_drawSpace(){this._container.addChild(...this._stars.map((t=>t.sprite)))}get startView(){return this.getSubmodule(_.StartView)}get landingView(){return this.getSubmodule(d.LandingView)}get hoveringController(){return this.getSubmodule(h.HoveringController)}get container(){return this._container}get stars(){return this._stars}}e.Space=A},3220:function(t,e,n){var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&i(e,t,n);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Star=void 0;const r=o(n(6680)),a=n(5541),c=n(968);class l{_position;_size;_brightness;_color;_cloned;static STAR_COLORS=[[2,15717547],[2,15707051],[10,15707112],[30,11259375],[30,16777215]];static _starColors=l._computeStarColorProbabilities();_sprite;constructor(t,e,n,i,s=!1){this._position=t,this._size=e,this._brightness=n,this._color=i,this._cloned=s,this._sprite=this._buildSprite()}clone(){const t=new l(this._position,this._size,this._brightness,this._color,!0);return t.sprite.x=this._position.x,t.sprite.y=this._position.y,this._sprite.parent.addChild(t.sprite),t}destroy(){this._sprite.destroy({children:!0})}_buildSprite(){const t=c.StarTextureGenerator.base,{position:{x:e,y:n},size:i,color:s}=this,o=new r.Sprite(t);return o.blendMode=r.BLEND_MODES.SATURATION,o.x=e-i/2,o.y=window.innerHeight,o.scale.set(i),o.tint=s,o.alpha=0,o}static random(){const{innerWidth:t,innerHeight:e}=window,n=(0,a.getBetween)(20,63.75),i=1===(0,a.getBetween)(1,10)?2:1,s=(0,a.getBetween)(0,100),o=this._starColors[s];return new l({x:(0,a.getBetween)(0,t),y:(0,a.getBetween)(0,e)},i,n,o)}static _computeStarColorProbabilities(){const t=this.STAR_COLORS,e=t[t.length-1][1],n=Array(100).fill(e);let i=0;for(const[e,s]of t)n.fill(s,i,e),i+=e;return n}get position(){return this._position}get size(){return this._size}get brightness(){return this._brightness}get color(){return this._color}get sprite(){return this._sprite}get cloned(){return this._cloned}}e.Star=l},968:function(t,e,n){var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&i(e,t,n);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.StarTextureGenerator=void 0;const r=o(n(6680)),a=n(477);e.StarTextureGenerator=class{static _base;static _buildStarBaseTexture(){const t=new r.Graphics;return t.beginFill(16777215),t.drawCircle(0,0,.75),t.endFill(),a.App.instance.canvas.app.renderer.generateTexture(t)}static get base(){return this._base??(this._base=this._buildStarBaseTexture())}}},5476:function(t,e,n){var i=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&i(e,t,n);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.LandingView=void 0;const r=o(n(6680)),a=n(3496),c=n(477),l=n(6548);class d extends a.Module{static MAX_CIRCLE_ANIMATION_STEP=3;_leftCircle;_topCircle;_rightCircle;constructor(){super([new l.CircleMotionController]),this._leftCircle=new r.Container,this._topCircle=new r.Container,this._rightCircle=new r.Container}onInit(){c.App.instance.canvas.space.addChild(this._leftCircle,this._topCircle,this._rightCircle)}start(t){this._startLoading(t)}_startLoading(t){const{CIRCLE_SIZE:e,CIRCLE_OFFSET:n}=l.CircleMotionController,[i,s,o]=this.motionController.splitStars(t.map((t=>t.sprite)));this._leftCircle.addChild(...i),this._topCircle.addChild(...s),this._rightCircle.addChild(...o);const r=window.innerWidth/2,a=window.innerHeight/2+2*e;this.motionController.makeCircle(this._leftCircle,r-n,a),this.motionController.makeCircle(this._topCircle,r,a-1.5*n),this.motionController.makeCircle(this._rightCircle,r+n,a)?.on("finish",(()=>setTimeout(this._moveLoadingCircles.bind(this),500)))}_moveLoadingCircles(t=0){const{CIRCLE_OFFSET:e}=l.CircleMotionController;if(t>=d.MAX_CIRCLE_ANIMATION_STEP)return void setTimeout((()=>{this._startLanding()}),250);const n=this.circles.length;this.motionController.moveCircle(this.circles[t%n],e,1.5*-e),this.motionController.moveCircle(this.circles[(t+1)%n],e,1.5*e),this.motionController.moveCircle(this.circles[(t+2)%n],2*-e,0).on("finish",(()=>setTimeout((()=>this._moveLoadingCircles(t+1)),200)))}_startLanding(){const{CIRCLE_OFFSET:t}=l.CircleMotionController;this.motionController.moveCircle(this._leftCircle,t,0),this.motionController.moveCircle(this._rightCircle,-t,1.5*t).on("finish",(()=>setTimeout(this._makeNavigator.bind(this),250)))}_makeNavigator(){const{CIRCLE_OFFSET:t}=l.CircleMotionController,e=window.innerWidth/2-1.5*t;for(let t=0;t<this.circles.length;t++){const n=this.circles[t];this.motionController.moveCircle(n,e,0)}}get circles(){return[this._leftCircle,this._topCircle,this._rightCircle]}get motionController(){return this.getSubmodule(l.CircleMotionController)}}e.LandingView=d},8091:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StartView=void 0;const i=n(3496),s=n(8256);class o extends i.Module{constructor(){super([new s.FocusController])}start(){this.focusController.start()}get focusController(){return this.getSubmodule(s.FocusController)}}e.StartView=o},4169:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.AnimationTicker=void 0;const i=n(477),s=n(3810);class o extends s.AbstractTicker{update(t){for(const t of i.App.instance.canvas.animations.get().values()){const{object:e,property:n,duration:i,values:s,algorithm:o}=t.data,r=o(t.progress/i),a=(s.target-s.initial)*r+s.initial;e[n]=a,t.update(a),t.updateProgress()}}}e.AnimationTicker=o},9741:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.InitStarsTicker=void 0;const i=n(8682),s=n(3574),o=n(3810);class r extends o.AbstractTicker{_stars;_starAnimations;_remainingDelay;constructor(t){super(),this._stars=t,this._starAnimations=this._initStarAnimations(),this._remainingDelay=20}update(t){if(this._remainingDelay>0)return void this._remainingDelay--;let e=!1;for(const t of this._starAnimations)t.ended||(e=!0,t.ended=this._updateStarAnimation(t));e||this.dispose()}onDispose(){s.Events.emit(i.Event.SPACE_INITIALIZED)}_initStarAnimations(){return this._stars.map((t=>({star:t,yVelocity:50*Math.random()+10,ended:!1})))}_updateStarAnimation(t){const{sprite:e,position:{y:n},brightness:i}=t.star;e.y-=t.yVelocity,e.y<=n&&(e.y=n),e.alpha+=.01;const s=i/255;return e.alpha>=s&&(e.alpha=s),e.alpha===s&&e.y===n}}e.InitStarsTicker=r},3810:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.AbstractTicker=void 0,e.AbstractTicker=class{_disposed;constructor(){this._disposed=!1}onDispose(){}dispose(){this.onDispose(),this._disposed=!0}get disposed(){return this._disposed}}},1379:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Ticker=void 0;const i=n(3496),s=n(8682),o=n(3574),r=n(4169);class a extends i.Module{_tickers;constructor(){super(),this._tickers=[new r.AnimationTicker]}onInit(){o.Events.on(s.Event.ADD_TICKER,this._addTicker,this)}onDispose(){for(const t of this._tickers)t.dispose()}update(t){this._tickers=this._tickers.filter((t=>!t.disposed));for(const e of this._tickers)e.update(t)}_addTicker(t){t&&this._tickers.push(t.ticker)}}e.Ticker=a},8682:(t,e)=>{var n;Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0,(n=e.Event||(e.Event={}))[n.SPACE_INITIALIZED=0]="SPACE_INITIALIZED",n[n.ADD_TICKER=1]="ADD_TICKER",n[n.LOADING_CONTROLLER_END=2]="LOADING_CONTROLLER_END",n[n.SPACE_POINTER_MOVE=3]="SPACE_POINTER_MOVE",n[n.SPACE_POINTER_OUT=4]="SPACE_POINTER_OUT",n[n.SPACE_BUTTON_HOVER=5]="SPACE_BUTTON_HOVER",n[n.SPACE_BUTTON_OUT=6]="SPACE_BUTTON_OUT",n[n.START_BUTTON_CLICK=7]="START_BUTTON_CLICK"},3574:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Events=void 0;class n{static _subscriptions=new Map;static on(t,e,n){const i=this._subscriptions.get(t),s=e.bind(n);this._subscriptions.set(t,i?[...i,s]:[s])}static emit(t,e){for(const n of this._subscriptions.get(t)??[])n(e)}static removeListener(t,e,n){const i=this._subscriptions.get(t),s=e.bind(n);this._subscriptions.set(t,i?.filter((t=>t.toString()!==s.toString()))??[])}}e.Events=n},4677:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Layout=void 0;const i=n(3496),s=n(8682),o=n(3574);class r extends i.Module{constructor(){super(),o.Events.on(s.Event.SPACE_INITIALIZED,this._onSpaceInitialized.bind(this))}_onSpaceInitialized(){this._displayStartButton(),this._bindSpaceButtons()}_displayStartButton(){const t=document.getElementById("start-btn");t&&(t.style.visibility="visible",t.style.opacity="1",t.addEventListener("click",this._onStartButtonClick))}_onStartButtonClick(t){const{target:e}=t;e&&e instanceof HTMLButtonElement&&(e.style.opacity="0",e.style.visibility="hidden",o.Events.emit(s.Event.START_BUTTON_CLICK),setTimeout((()=>{e.parentElement?.removeChild(e)}),300))}_bindSpaceButtons(){for(const t of document.querySelectorAll("button[is=space-button]"))t instanceof HTMLButtonElement&&(t.addEventListener("mouseover",this._onSpaceButtonHover.bind(this)),t.addEventListener("touchstart",this._onSpaceButtonHover.bind(this)),t.addEventListener("mouseout",this._onSpaceButtonOut.bind(this)),t.addEventListener("touchend",this._onSpaceButtonOut.bind(this)))}_onSpaceButtonHover(t){o.Events.emit(s.Event.SPACE_BUTTON_HOVER,{base:t})}_onSpaceButtonOut(t){o.Events.emit(s.Event.SPACE_BUTTON_OUT,{base:t})}}e.Layout=r},3496:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Module=void 0,e.Module=class{_submodules;constructor(t=[]){this._submodules=new Map;for(const e of t)this._submodules.set(e.constructor.name,e)}onInit(){}init(){this.onInit();for(const t of this._submodules.values())t.init()}getSubmodule(t){return this._submodules.get(t.name)}onDispose(){}dispose(){this.onDispose();for(const t of this._submodules.values())t.dispose()}}},5541:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getBetween=void 0,e.getBetween=(t,e)=>{const n=Math.ceil(t),i=Math.floor(e);return Math.floor(Math.random()*(i-n+1))+n}},7774:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.get2DVectorToRectDistance=e.get2DVectorDistance=void 0,e.get2DVectorDistance=(t,e,n,i)=>Math.sqrt(Math.abs(t-n)**2+Math.abs(e-i)**2),e.get2DVectorToRectDistance=(t,e,n,i,s,o)=>Math.sqrt(Math.max(n-t,0,t-(n+s))**2+Math.max(i-e,0,e-(i+o))**2)},6067:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isPhone=void 0,e.isPhone=()=>[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((t=>navigator.userAgent.match(t)))},3303:(t,e,n)=>{n(9947),n(477).App.instance.init()}},n={};function i(t){var s=n[t];if(void 0!==s)return s.exports;var o=n[t]={id:t,loaded:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}i.m=e,t=[],i.O=(e,n,s,o)=>{if(!n){var r=1/0;for(d=0;d<t.length;d++){for(var[n,s,o]=t[d],a=!0,c=0;c<n.length;c++)(!1&o||r>=o)&&Object.keys(i.O).every((t=>i.O[t](n[c])))?n.splice(c--,1):(a=!1,o<r&&(r=o));if(a){t.splice(d--,1);var l=s();void 0!==l&&(e=l)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[n,s,o]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={179:0};i.O.j=e=>0===t[e];var e=(e,n)=>{var s,o,[r,a,c]=n,l=0;if(r.some((e=>0!==t[e]))){for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(c)var d=c(i)}for(e&&e(n);l<r.length;l++)o=r[l],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(d)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var s=i.O(void 0,[917],(()=>i(3303)));s=i.O(s)})();
//# sourceMappingURL=main.bundle.js.map