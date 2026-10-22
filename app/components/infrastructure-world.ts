import * as T from 'three';

export function createWorld(canvas:HTMLCanvasElement, onFailure:()=>void) {
 const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.35));
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.setClearColor(0xfdfdf1,0);renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
 const scene=new T.Scene();const camera=new T.PerspectiveCamera(34,1,.1,100);
 scene.add(new T.HemisphereLight(0xffffff,0xa9ad94,2.5));
 const sun=new T.DirectionalLight(0xfffdf1,4);sun.position.set(-5,10,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=7;sun.shadow.camera.bottom=-7;sun.shadow.normalBias=.035;scene.add(sun);
 const fill=new T.DirectionalLight(0xd8e8ff,2);fill.position.set(6,4,-4);scene.add(fill);
 const world=new T.Group();scene.add(world);
 const materials: T.MeshStandardMaterial[]=[];
 const mat=(color:number,metalness=0,roughness=.6)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m};
 const white=mat(0xfdfdf1),concrete=mat(0xb3d599),steel=mat(0x39745b,.65,.3),amber=mat(0xec5e27,.35,.35),blue=mat(0x064734,.45,.25),grass=mat(0xb5df8f),road=mat(0xd9ecc7),dark=mat(0x093e2c,.25),leaf=mat(0x3f8d4d);
 const boxGeo=new T.BoxGeometry(1,1,1),barGeo=new T.CylinderGeometry(1,1,1,6);
 function box(parent:T.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,m:T.Material){const mesh=new T.Mesh(boxGeo,m);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh}
 function bar(parent:T.Object3D,a:number[],b:number[],r:number,m:T.Material){const av=new T.Vector3(...a),bv=new T.Vector3(...b),delta=bv.clone().sub(av);const mesh=new T.Mesh(barGeo,m);mesh.position.copy(av.add(bv).multiplyScalar(.5));mesh.scale.set(r,delta.length(),r);mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());mesh.castShadow=true;parent.add(mesh);return mesh}
 box(world,0,-.32,0,7.3,.32,6.5,white);box(world,0,-.54,0,6.95,.12,6.15,concrete);box(world,0,-.65,0,6.55,.08,5.75,amber);
 box(world,0,-.12,0,7,.12,6.2,grass);box(world,0,-.04,0,7.1,.06,.48,road);box(world,0,-.035,0,.48,.06,6.3,road);
 for(let i=-3;i<=3;i++){box(world,i,-.001,0,.3,.015,.025,white);box(world,0,-.001,i,.025,.015,.3,white)}
 // Four self-contained service districts, assembled from small reusable geometries.
 const power=new T.Group(),telecom=new T.Group(),solar=new T.Group(),civil=new T.Group();const districts=[power,telecom,solar,civil];districts.forEach(g=>world.add(g));
 power.position.set(-1.8,0,-1.5);telecom.position.set(1.8,0,-1.5);solar.position.set(-1.8,0,1.5);civil.position.set(1.8,0,1.5);
 function lattice(parent:T.Group,height:number,width:number,m:T.Material){
  const corners=[[-1,-1],[1,-1],[1,1],[-1,1]];
  for(const [x,z] of corners){bar(parent,[x*width/2,0,z*width/2],[x*.12,height,z*.12],.035,m);box(parent,x*width/2,.03,z*width/2,.32,.18,.32,white)}
  for(let level=0;level<5;level++){const y=level*height/5,ny=(level+1)*height/5;const w=width/2*(1-level/6),nw=width/2*(1-(level+1)/6);
   for(let i=0;i<4;i++){const a=corners[i],b=corners[(i+1)%4];bar(parent,[a[0]*w,y,a[1]*w],[b[0]*nw,ny,b[1]*nw],.018,m);bar(parent,[a[0]*w,y,a[1]*w],[b[0]*w,y,b[1]*w],.024,m)}
  }
 }
 lattice(power,2.85,1.05,steel);
 for(const y of [1.9,2.48]){bar(power,[-1.05,y,0],[1.05,y,0],.045,steel);bar(power,[-1.05,y,0],[0,y+.3,0],.025,steel);bar(power,[1.05,y,0],[0,y+.3,0],.025,steel);for(const x of [-.95,.95]){bar(power,[x,y,0],[x,y-.3,0],.045,amber)}}
 for(const x of [-.95,.95]){const points=[new T.Vector3(x,1.65,0),new T.Vector3(x,1.25,1),new T.Vector3(x,1.45,2.4)];const curve=new T.CatmullRomCurve3(points);const cable=new T.Mesh(new T.TubeGeometry(curve,20,.013,4,false),dark);power.add(cable)}
 box(power,.72,.28,-.7,.5,.5,.45,white);box(power,.72,.56,-.7,.36,.06,.32,amber);
 lattice(telecom,3.15,.7,white);bar(telecom,[0,2.5,0],[0,3.7,0],.04,amber);
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const antenna=box(telecom,Math.cos(a)*.3,2.8,Math.sin(a)*.3,.2,.7,.16,white);antenna.rotation.y=-a;bar(telecom,[0,2.7,0],[Math.cos(a)*.3,2.7,Math.sin(a)*.3],.035,steel)}
 const dish=new T.Mesh(new T.SphereGeometry(.24,16,8,0,Math.PI),white);dish.position.set(.3,2.1,0);dish.rotation.y=.5;telecom.add(dish);box(telecom,-.65,.32,.45,.7,.6,.8,white);box(telecom,-.65,.65,.45,.75,.07,.85,amber);
 for(let r=0;r<3;r++)for(let c=0;c<3;c++){
  const panel=new T.Group();panel.position.set((c-1)*.83,.44,(r-1)*.72);panel.rotation.x=-.28;solar.add(panel);box(panel,0,0,0,.74,.06,.56,white);box(panel,0,.04,0,.68,.025,.50,blue);
  for(let k=-1;k<=1;k++)box(panel,k*.19,.055,0,.009,.006,.48,white);box(panel,0,.055,0,.68,.006,.009,white);
  bar(solar,[(c-1)*.83,.02,(r-1)*.72],[(c-1)*.83,.4,(r-1)*.72],.025,steel);
 }
 box(solar,1.1,.25,.65,.35,.5,.45,white);
 // An open-frame building and a balanced tower crane.
 box(civil,-.15,.02,0,1.7,.16,1.65,concrete);
 for(let floor=0;floor<3;floor++){const y=floor*.62+.2;for(const x of [-.8,.5])for(const z of [-.65,.65])box(civil,x,y+.25,z,.09,.62,.09,white);box(civil,-.15,y+.55,0,1.65,.07,1.55,white)}
 box(civil,-.15,.55,.7,1.35,.45,.04,amber);box(civil,.55,.55,0,.04,.45,1.3,blue);
 const crane=new T.Group();crane.position.set(1,0,-.8);civil.add(crane);lattice(crane,2.8,.27,amber);bar(crane,[-1.65,2.8,0],[.85,2.8,0],.055,amber);bar(crane,[-1.65,2.8,0],[0,3.15,0],.018,dark);bar(crane,[.85,2.8,0],[0,3.15,0],.018,dark);bar(crane,[-1.3,2.8,0],[-1.3,1.85,0],.012,dark);box(crane,-1.3,1.8,0,.14,.1,.14,amber);box(crane,.65,2.73,0,.32,.25,.35,concrete);
 // Small landscape details establish scale without downloaded 3D assets.
 const treeGeo=new T.IcosahedronGeometry(.23,1);
 for(const [x,z] of [[-3.1,-2.5],[-3.1,.7],[-3.1,2.5],[3.05,-2.5],[3.05,.65],[.7,-2.7]]){bar(world,[x,0,z],[x,.45,z],.035,dark);const tree=new T.Mesh(treeGeo,leaf);tree.position.set(x,.58,z);tree.scale.y=1.35;tree.castShadow=true;world.add(tree)}
 const ring=new T.Mesh(new T.TorusGeometry(4.7,.012,4,96),amber);ring.rotation.x=-Math.PI/2;ring.position.y=-.75;world.add(ring);
 const ground=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({opacity:.14}));ground.rotation.x=-Math.PI/2;ground.position.y=-.85;ground.receiveShadow=true;scene.add(ground);
 let progress=0,target=0,frame=0,visible=true,disposed=false,reduced=false,renders=0,lastChange=0,lastFrame=0;
 const angles=[.72,3.99,2.27,-.87,.72];
 function render(now=performance.now()){frame=0;if(disposed||!visible)return;const delta=Math.min(.1,(now-lastFrame)/1000);lastFrame=now;progress=reduced||now-lastChange>650?target:progress+(target-progress)*(1-Math.exp(-delta*12));if(Math.abs(target-progress)<.0005)progress=target;
  const p=progress*4,lo=Math.min(3,Math.floor(p)),mix=p-lo;const smooth=mix*mix*(3-2*mix),angle=T.MathUtils.lerp(angles[lo],angles[lo+1],smooth);
  camera.position.set(Math.sin(angle)*12.5,8.3,Math.cos(angle)*12.5);camera.lookAt(0,.7,0);
  districts.forEach((g,i)=>{const focus=Math.max(0,1-Math.abs(p-(i+1)));g.position.y=reduced?0:focus*.35;});
  renderer.render(scene,camera);canvas.dataset.progress=progress.toFixed(3);canvas.dataset.renders=String(++renders);if(progress!==target)frame=requestAnimationFrame(render);
 }
 function request(){if(!frame&&!disposed&&visible)frame=requestAnimationFrame(render)}
 const resize=()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix();request()};const observer=new ResizeObserver(resize);observer.observe(canvas);
 const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)request()});intersection.observe(canvas);
 const visibility=()=>{visible=!document.hidden&&canvas.getBoundingClientRect().bottom>0;if(visible)request()};document.addEventListener('visibilitychange',visibility);
 const lost=(e:Event)=>{e.preventDefault();onFailure()};canvas.addEventListener('webglcontextlost',lost);resize();request();
 return {setProgress(value:number,snap=false){const next=T.MathUtils.clamp(value,0,1);if(next!==target)lastChange=performance.now();target=next;reduced=snap;request()},setWireframe(value:boolean){materials.forEach(m=>m.wireframe=value);request()},dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('webglcontextlost',lost);const geometries=new Set<T.BufferGeometry>();const mats=new Set<T.Material>();scene.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>mats.add(m))}});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());renderer.dispose()}};
}
