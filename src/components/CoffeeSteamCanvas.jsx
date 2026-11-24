import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * ErrorBoundary para isolar o contexto WebGL e garantir fallback elegante
 */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function canUseWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Iluminação global IBL via RoomEnvironment para reflexos realistas na porcelana vitrificada
 */
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(envScene, 0.04);

    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.85;

    return () => {
      scene.environment = null;
      envTarget.dispose();
      envScene.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

/**
 * Xícara de Porcelana Creme Iluminada (#F7F1E8), inspirada na xícara real do Café Mor,
 * com filete terracota/bronze, crema dourada em GLSL e base em madeira mel.
 */
function PorcelainCoffeeCup({ pointerRef, reducedMotion }) {
  const groupRef = useRef(null);
  const cremaMatRef = useRef(null);

  const {
    cupGeometry,
    saucerGeometry,
    rimGeometry,
    coasterGeometry,
    handleGeometry,
    cremaUniforms,
  } = useMemo(() => {
    // Corpo arredondado clássico de xícara de café especial
    const cupPoints = [
      new THREE.Vector2(0.0, -0.52),
      new THREE.Vector2(0.42, -0.52),
      new THREE.Vector2(0.56, -0.43),
      new THREE.Vector2(0.72, -0.14),
      new THREE.Vector2(0.83, 0.24),
      new THREE.Vector2(0.86, 0.54),
      new THREE.Vector2(0.80, 0.56),
      new THREE.Vector2(0.76, 0.24),
      new THREE.Vector2(0.64, -0.12),
      new THREE.Vector2(0.42, -0.42),
      new THREE.Vector2(0.0, -0.42),
    ];
    const cupGeo = new THREE.LatheGeometry(cupPoints, 64);

    // Pires de porcelana clara
    const saucerPoints = [
      new THREE.Vector2(0.0, -0.62),
      new THREE.Vector2(0.56, -0.62),
      new THREE.Vector2(1.04, -0.56),
      new THREE.Vector2(1.36, -0.45),
      new THREE.Vector2(1.40, -0.41),
      new THREE.Vector2(1.34, -0.39),
      new THREE.Vector2(1.02, -0.50),
      new THREE.Vector2(0.56, -0.55),
      new THREE.Vector2(0.0, -0.55),
    ];
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 64);

    const rimGeo = new THREE.TorusGeometry(0.83, 0.018, 16, 64);
    const coasterGeo = new THREE.CylinderGeometry(1.44, 1.48, 0.06, 64);

    // Alça arredondada em porcelana branca conectada com suavidade
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.77, 0.34, 0),
      new THREE.Vector3(1.10, 0.37, 0),
      new THREE.Vector3(1.22, 0.14, 0),
      new THREE.Vector3(1.12, -0.12, 0),
      new THREE.Vector3(0.70, -0.22, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 40, 0.055, 18, false);

    const cremaUniformsObj = {
      uTime: { value: 0 },
      uDark: { value: new THREE.Color('#4A2713') },
      uMid: { value: new THREE.Color('#9E6334') },
      uLight: { value: new THREE.Color('#EFE0CA') },
    };

    return {
      cupGeometry: cupGeo,
      saucerGeometry: saucerGeo,
      rimGeometry: rimGeo,
      coasterGeometry: coasterGeo,
      handleGeometry: handleGeo,
      cremaUniforms: cremaUniformsObj,
    };
  }, []);

  const cremaVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const cremaFragmentShader = `
    uniform float uTime;
    uniform vec3 uDark;
    uniform vec3 uMid;
    uniform vec3 uLight;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    void main() {
      vec2 centered = vUv - 0.5;
      float r = length(centered) * 2.0;
      float angle = atan(centered.y, centered.x);

      // Espiral apetitosa de latte / crema dourada
      float swirl = angle + r * 3.4 - uTime * 0.14;
      float n = noise(vec2(cos(swirl) * 2.2 + r * 3.2, sin(swirl) * 2.2 + uTime * 0.08));
      float n2 = noise(centered * 7.0 - vec2(uTime * 0.04));
      float cremaMix = smoothstep(0.22, 0.80, n * 0.65 + n2 * 0.35);

      vec3 col = mix(uDark, uMid, cremaMix);
      float foamSwirl = smoothstep(0.55, 0.92, sin(angle * 2.0 + r * 5.0 - uTime * 0.18) * 0.5 + 0.5);
      float rimCrema = smoothstep(0.58, 0.98, r);
      col = mix(col, uLight, rimCrema * 0.62 + foamSwirl * 0.24 * (1.0 - r * 0.4));

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (cremaMatRef.current && !reducedMotion) {
      cremaMatRef.current.uniforms.uTime.value = elapsed;
    }

    if (!groupRef.current) return;

    if (!reducedMotion) {
      const targetRotY = -0.34 + Math.sin(elapsed * 0.36) * 0.15 + pointerRef.current.x * 0.26;
      const targetRotX = 0.06 + Math.sin(elapsed * 0.5) * 0.025 - pointerRef.current.y * 0.10;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        Math.min(1, delta * 3.2)
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        Math.min(1, delta * 3.2)
      );
      groupRef.current.position.y = -0.14 + Math.sin(elapsed * 0.9) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.14, 0]} rotation={[0.06, -0.34, 0]}>
      {/* Xícara em Porcelana Creme Vitrificada */}
      <mesh geometry={cupGeometry}>
        <meshPhysicalMaterial
          color="#F7F1E8"
          roughness={0.14}
          metalness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Filete delicado terracota / madeira velada na borda da xícara */}
      <mesh geometry={rimGeometry} position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#B86B43"
          roughness={0.28}
          metalness={0.55}
        />
      </mesh>

      {/* Alça escultural em Porcelana Creme */}
      <mesh geometry={handleGeometry}>
        <meshPhysicalMaterial
          color="#F5EFE5"
          roughness={0.16}
          metalness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.09}
        />
      </mesh>

      {/* Superfície de crema / microespuma cremosa */}
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.77, 56]} />
        <shaderMaterial
          ref={cremaMatRef}
          uniforms={cremaUniforms}
          vertexShader={cremaVertexShader}
          fragmentShader={cremaFragmentShader}
        />
      </mesh>

      {/* Pires em Porcelana Creme */}
      <mesh geometry={saucerGeometry}>
        <meshPhysicalMaterial
          color="#F3ECE1"
          roughness={0.15}
          metalness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.09}
        />
      </mesh>

      {/* Base / Porta-xícara sutil em Madeira Nogueira quente */}
      <mesh geometry={coasterGeometry} position={[0, -0.64, 0]}>
        <meshStandardMaterial
          color="#5C3922"
          roughness={0.52}
          metalness={0.05}
        />
      </mesh>

      {/* Dois grãos torrados brilhantes repousando na borda do pires */}
      <group position={[-0.94, -0.43, 0.42]} rotation={[0.18, 0.52, -0.15]} scale={[0.13, 0.085, 0.095]}>
        <mesh>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#59331B" roughness={0.36} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={[1.35, 0.25, 0.16]}>
          <boxGeometry args={[1.1, 1, 1]} />
          <meshStandardMaterial color="#261309" roughness={0.8} />
        </mesh>
      </group>

      <group position={[-0.73, -0.46, 0.68]} rotation={[0.24, -0.48, 0.12]} scale={[0.115, 0.075, 0.085]}>
        <mesh>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#6B3F22" roughness={0.34} metalness={0.14} />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={[1.35, 0.25, 0.16]}>
          <boxGeometry args={[1.1, 1, 1]} />
          <meshStandardMaterial color="#261309" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Fitas orgânicas de vapor quente usando FBM em GLSL, sem costura central
 */
function OrganicSteamRibbons({ pointerRef, reducedMotion }) {
  const materialRefs = useRef([]);

  const ribbonAngles = useMemo(
    () => [
      { pos: [-0.14, 0, 0.08], rotY: 0.12, offset: 0.4, width: 1.55, height: 1.9, speed: 0.36 },
      { pos: [0.16, 0.05, -0.06], rotY: Math.PI * 0.34, offset: 2.1, width: 1.45, height: 1.8, speed: 0.31 },
      { pos: [-0.04, -0.04, -0.14], rotY: Math.PI * 0.68, offset: 3.9, width: 1.5, height: 1.85, speed: 0.4 },
    ],
    []
  );

  const uniformsList = useMemo(
    () =>
      ribbonAngles.map((cfg) => ({
        uTime: { value: cfg.offset },
        uSpeed: { value: cfg.speed },
        uOffset: { value: cfg.offset },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uWarmColor: { value: new THREE.Color('#F3DEC3') },
        uCreamColor: { value: new THREE.Color('#FFF7EC') },
      })),
    [ribbonAngles]
  );

  const steamVertexShader = `
    uniform float uTime;
    uniform float uOffset;
    uniform vec2 uPointer;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float h = uv.y;
      pos.x += sin(h * 3.8 - uTime * 0.95 + uOffset) * 0.11 * h + uPointer.x * 0.16 * h;
      pos.z += cos(h * 3.2 - uTime * 0.8 + uOffset) * 0.08 * h;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const steamFragmentShader = `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uOffset;
    uniform vec3 uWarmColor;
    uniform vec3 uCreamColor;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        v += amp * noise(p);
        p *= 2.05;
        amp *= 0.5;
      }
      return v;
    }

    void main() {
      float t = uTime * uSpeed + uOffset;

      float curl = sin(vUv.y * 4.4 - t * 1.25 + uOffset) * (0.08 + vUv.y * 0.14);
      vec2 sampleUv = vec2((vUv.x - 0.5) * 2.4 + curl, vUv.y * 2.0 - t * 0.5);

      float n1 = fbm(sampleUv);
      float n2 = fbm(sampleUv * 1.75 + vec2(1.9, -t * 0.3));
      float wisp = smoothstep(0.42, 0.84, n1 * 0.62 + n2 * 0.38);

      float edgeX = smoothstep(0.0, 0.32, vUv.x) * (1.0 - smoothstep(0.68, 1.0, vUv.x));
      float coneWidth = mix(0.62, 1.0, vUv.y);
      float centerDist = abs(vUv.x - 0.5) / (0.5 * coneWidth);
      float radialMask = 1.0 - smoothstep(0.18, 0.96, centerDist);

      float fadeBottom = smoothstep(0.0, 0.18, vUv.y);
      float fadeTop = 1.0 - smoothstep(0.28, 0.90, vUv.y);

      float alpha = wisp * edgeX * radialMask * fadeBottom * fadeTop * 0.24;
      vec3 color = mix(uWarmColor, uCreamColor, smoothstep(0.12, 0.82, vUv.y));

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    materialRefs.current.forEach((mat) => {
      if (!mat) return;
      if (!reducedMotion) {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uPointer.value.lerp(
          new THREE.Vector2(pointerRef.current.x, pointerRef.current.y),
          Math.min(1, delta * 2.4)
        );
      }
    });
  });

  return (
    <group position={[0, 1.16, 0]}>
      {ribbonAngles.map((cfg, idx) => (
        <mesh key={idx} position={cfg.pos} rotation={[0, cfg.rotY, 0]}>
          <planeGeometry args={[cfg.width, cfg.height, 1, 24]} />
          <shaderMaterial
            ref={(el) => {
              materialRefs.current[idx] = el;
            }}
            uniforms={uniformsList[idx]}
            vertexShader={steamVertexShader}
            fragmentShader={steamFragmentShader}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function StaticAtmosphericFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        className="size-72 rounded-full opacity-45"
        style={{
          background:
            'radial-gradient(circle, rgba(219,163,104,0.38) 0%, rgba(219,163,104,0.08) 55%, transparent 78%)',
        }}
      />
    </div>
  );
}

export default function CoffeeSteamCanvas({ reducedMotion = false }) {
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [webglSupported] = useState(() => canUseWebGL());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = { x: nx, y: ny };
  }

  function handlePointerLeave() {
    pointerRef.current = { x: 0, y: 0 };
  }

  if (!webglSupported) {
    return <StaticAtmosphericFallback />;
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
      className="relative h-full w-full select-none"
    >
      <WebGLErrorBoundary fallback={<StaticAtmosphericFallback />}>
        <Canvas
          dpr={[1, 1.75]}
          frameloop={isVisible && !reducedMotion ? 'always' : 'demand'}
          camera={{ position: [0, 1.38, 5.6], fov: 32 }}
          onCreated={({ camera, gl }) => {
            camera.lookAt(0, 0.02, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
        >
          <StudioEnvironment />
          <hemisphereLight args={['#FFF7EB', '#5C3D28', 1.25]} />
          <directionalLight position={[3.5, 5.5, 4.0]} intensity={2.6} color="#FFE5C4" />
          <directionalLight position={[-4.0, 2.5, 2.5]} intensity={1.2} color="#FFF3E0" />
          <pointLight position={[0, 2.5, -3.2]} intensity={1.8} color="#DBA368" distance={10} />

          <PorcelainCoffeeCup pointerRef={pointerRef} reducedMotion={reducedMotion} />
          <OrganicSteamRibbons pointerRef={pointerRef} reducedMotion={reducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
