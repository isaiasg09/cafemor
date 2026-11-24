import { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
 * Xícara escultural de cerâmica carvão acetinada (#2A2522), aro em bronze (#D4A373),
 * alça orgânica em TubeGeometry, crema com Shader GLSL e dois grãos repousando no pires.
 */
function SculpturalCoffeeCup({ pointerRef, reducedMotion }) {
  const groupRef = useRef(null);
  const cremaMatRef = useRef(null);

  const {
    cupGeometry,
    saucerGeometry,
    rimGeometry,
    saucerTrimGeometry,
    handleGeometry,
    cremaUniforms,
  } = useMemo(() => {
    // Corpo torneado com proporção de xícara de café especial
    const cupPoints = [
      new THREE.Vector2(0.0, -0.56),
      new THREE.Vector2(0.44, -0.56),
      new THREE.Vector2(0.56, -0.46),
      new THREE.Vector2(0.72, -0.14),
      new THREE.Vector2(0.84, 0.28),
      new THREE.Vector2(0.87, 0.56),
      new THREE.Vector2(0.81, 0.58),
      new THREE.Vector2(0.76, 0.28),
      new THREE.Vector2(0.64, -0.12),
      new THREE.Vector2(0.44, -0.44),
      new THREE.Vector2(0.0, -0.44),
    ];
    const cupGeo = new THREE.LatheGeometry(cupPoints, 56);

    // Pires côncavo elegante com aba iluminável
    const saucerPoints = [
      new THREE.Vector2(0.0, -0.66),
      new THREE.Vector2(0.58, -0.66),
      new THREE.Vector2(1.06, -0.59),
      new THREE.Vector2(1.36, -0.48),
      new THREE.Vector2(1.40, -0.44),
      new THREE.Vector2(1.34, -0.42),
      new THREE.Vector2(1.02, -0.53),
      new THREE.Vector2(0.58, -0.58),
      new THREE.Vector2(0.0, -0.58),
    ];
    const saucerGeo = new THREE.LatheGeometry(saucerPoints, 56);

    const rimGeo = new THREE.TorusGeometry(0.84, 0.024, 18, 64);
    const saucerTrimGeo = new THREE.TorusGeometry(1.35, 0.014, 14, 64);

    // Alça orgânica contínua conectada ao corpo da xícara
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.79, 0.34, 0),
      new THREE.Vector3(1.12, 0.36, 0),
      new THREE.Vector3(1.22, 0.14, 0),
      new THREE.Vector3(1.12, -0.12, 0),
      new THREE.Vector3(0.72, -0.24, 0),
    ]);
    const handleGeo = new THREE.TubeGeometry(handleCurve, 36, 0.052, 16, false);

    const cremaUniformsObj = {
      uTime: { value: 0 },
      uDark: { value: new THREE.Color('#2B160B') },
      uMid: { value: new THREE.Color('#7C4822') },
      uLight: { value: new THREE.Color('#D6AF84') },
    };

    return {
      cupGeometry: cupGeo,
      saucerGeometry: saucerGeo,
      rimGeometry: rimGeo,
      saucerTrimGeometry: saucerTrimGeo,
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

      // Redemoinho sutil de crema recém-extraída
      float swirl = angle + r * 3.2 - uTime * 0.14;
      float n = noise(vec2(cos(swirl) * 2.4 + r * 3.5, sin(swirl) * 2.4 + uTime * 0.08));
      float n2 = noise(centered * 7.5 - vec2(uTime * 0.05));
      float cremaMix = smoothstep(0.25, 0.82, n * 0.65 + n2 * 0.35);

      vec3 col = mix(uDark, uMid, cremaMix);
      float rimCrema = smoothstep(0.62, 0.98, r);
      col = mix(col, uLight, rimCrema * 0.55 + pow(cremaMix, 2.2) * 0.25);

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
      const targetRotY = -0.32 + Math.sin(elapsed * 0.38) * 0.16 + pointerRef.current.x * 0.28;
      const targetRotX = 0.08 + Math.sin(elapsed * 0.55) * 0.03 - pointerRef.current.y * 0.12;
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
      groupRef.current.position.y = -0.32 + Math.sin(elapsed * 0.95) * 0.035;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.32, 0]} rotation={[0.08, -0.32, 0]}>
      {/* Corpo de cerâmica artesanal em tom carvão quente */}
      <mesh geometry={cupGeometry}>
        <meshStandardMaterial
          color="#2A2522"
          roughness={0.36}
          metalness={0.14}
        />
      </mesh>

      {/* Aro superior em Bronze / Madeira Velada */}
      <mesh geometry={rimGeometry} position={[0, 0.57, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#D4A373"
          roughness={0.24}
          metalness={0.75}
          emissive="#8F6136"
          emissiveIntensity={0.14}
        />
      </mesh>

      {/* Alça orgânica escultural */}
      <mesh geometry={handleGeometry}>
        <meshStandardMaterial
          color="#D4A373"
          roughness={0.28}
          metalness={0.68}
          emissive="#7A5029"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Superfície de crema com redemoinho GLSL */}
      <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.78, 56]} />
        <shaderMaterial
          ref={cremaMatRef}
          uniforms={cremaUniforms}
          vertexShader={cremaVertexShader}
          fragmentShader={cremaFragmentShader}
        />
      </mesh>

      {/* Pires cerâmico com filete dourado sutil */}
      <mesh geometry={saucerGeometry}>
        <meshStandardMaterial
          color="#231F1D"
          roughness={0.38}
          metalness={0.14}
        />
      </mesh>
      <mesh geometry={saucerTrimGeometry} position={[0, -0.43, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#D4A373"
          roughness={0.28}
          metalness={0.72}
        />
      </mesh>

      {/* Dois grãos de café torrados repousando naturalmente sobre a aba do pires */}
      <group position={[-0.95, -0.45, 0.42]} rotation={[0.18, 0.52, -0.15]} scale={[0.13, 0.085, 0.095]}>
        <mesh>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#4A2B18" roughness={0.42} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={[1.35, 0.25, 0.16]}>
          <boxGeometry args={[1.1, 1, 1]} />
          <meshStandardMaterial color="#1E1008" roughness={0.85} />
        </mesh>
      </group>

      <group position={[-0.74, -0.48, 0.68]} rotation={[0.24, -0.48, 0.12]} scale={[0.115, 0.075, 0.085]}>
        <mesh>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#59351E" roughness={0.38} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={[1.35, 0.25, 0.16]}>
          <boxGeometry args={[1.1, 1, 1]} />
          <meshStandardMaterial color="#1E1008" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Fitas orgânicas de vapor quente usando FBM (Fractional Brownian Motion) em GLSL.
 * Planos deslocados assimetricamente em X/Z para evitar linha brilhante no eixo central.
 */
function OrganicSteamRibbons({ pointerRef, reducedMotion }) {
  const materialRefs = useRef([]);

  const ribbonAngles = useMemo(
    () => [
      { pos: [-0.14, 0, 0.08], rotY: 0.12, offset: 0.4, width: 1.55, height: 1.95, speed: 0.36 },
      { pos: [0.16, 0.06, -0.06], rotY: Math.PI * 0.34, offset: 2.1, width: 1.45, height: 1.85, speed: 0.31 },
      { pos: [-0.04, -0.04, -0.14], rotY: Math.PI * 0.68, offset: 3.9, width: 1.5, height: 1.9, speed: 0.40 },
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
        uWarmColor: { value: new THREE.Color('#D9B18A') },
        uCreamColor: { value: new THREE.Color('#EFECE6') },
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
      // Ondulação espacial sinuosa e desvio suave ao mover o ponteiro
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

      // Distorção curva ascendente assimétrica para simular vapor natural
      float curl = sin(vUv.y * 4.4 - t * 1.25 + uOffset) * (0.08 + vUv.y * 0.14);
      vec2 sampleUv = vec2((vUv.x - 0.5) * 2.4 + curl, vUv.y * 2.0 - t * 0.5);

      float n1 = fbm(sampleUv);
      float n2 = fbm(sampleUv * 1.75 + vec2(1.9, -t * 0.3));
      float wisp = smoothstep(0.42, 0.84, n1 * 0.62 + n2 * 0.38);

      // Máscara suave em todas as bordas com dissipação antecipada no topo
      float edgeX = smoothstep(0.0, 0.32, vUv.x) * (1.0 - smoothstep(0.68, 1.0, vUv.x));
      float coneWidth = mix(0.62, 1.0, vUv.y);
      float centerDist = abs(vUv.x - 0.5) / (0.5 * coneWidth);
      float radialMask = 1.0 - smoothstep(0.18, 0.96, centerDist);

      float fadeBottom = smoothstep(0.0, 0.18, vUv.y);
      float fadeTop = 1.0 - smoothstep(0.28, 0.90, vUv.y);

      float alpha = wisp * edgeX * radialMask * fadeBottom * fadeTop * 0.20;
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
    <group position={[0, 1.02, 0]}>
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

/**
 * 30 micro partículas sutis de poeira dourada evocando luz natural pelas janelas altas
 */
function WindowDustMotes({ reducedMotion }) {
  const matRef = useRef(null);

  const { geometry, uniforms } = useMemo(() => {
    const count = 30;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 4.2;
      positions[i * 3 + 1] = (Math.random() - 0.35) * 3.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.2 - 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#D4A373') },
      },
    };
  }, []);

  useFrame((state) => {
    if (matRef.current && !reducedMotion) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float aPhase;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * 0.28 + aPhase) * 0.14;
            pos.x += cos(uTime * 0.22 + aPhase) * 0.10;
            vAlpha = 0.12 + 0.08 * sin(uTime * 0.6 + aPhase);
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 3.2 * (3.5 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float soft = smoothstep(0.5, 0.05, d);
            gl_FragColor = vec4(uColor, soft * vAlpha);
          }
        `}
      />
    </points>
  );
}

function StaticAtmosphericFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        className="size-72 rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(212,163,115,0.35) 0%, rgba(212,163,115,0.06) 55%, transparent 78%)',
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
          camera={{ position: [0, 1.15, 5.25], fov: 32 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0.15, 0);
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
        >
          {/* Iluminação de estúdio 3-point + hemisphere para recortar silhueta e volume */}
          <hemisphereLight args={['#F3ECE1', '#1F1814', 0.75]} />
          <directionalLight position={[3.5, 5.0, 3.5]} intensity={2.2} color="#F5D5B0" />
          <directionalLight position={[-3.5, 2.5, -3.0]} intensity={1.9} color="#D4A373" />
          <pointLight position={[-2.0, 0.8, 3.0]} intensity={0.7} color="#E8E6DF" distance={9} />

          <SculpturalCoffeeCup pointerRef={pointerRef} reducedMotion={reducedMotion} />
          <OrganicSteamRibbons pointerRef={pointerRef} reducedMotion={reducedMotion} />
          <WindowDustMotes reducedMotion={reducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
