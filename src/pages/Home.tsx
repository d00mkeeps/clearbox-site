import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

function createShadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.55)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, 128, 128)
  }
  return new THREE.CanvasTexture(canvas)
}

function AppStoreBadge({ url }: { url: string }) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-block', opacity: 1, transition: 'opacity 0.2s', textDecoration: 'none' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <img
        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-gb?size=250x83"
        alt="Download on the App Store"
        style={{ height: 40, width: 'auto', display: 'block', borderRadius: 6, border: 'none' }}
      />
    </a>
  )
}

function WhatsAppBadge({ url }: { url: string }) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        height: 40,
        borderRadius: 6,
        border: '1px solid #A6A6A6',
        backgroundColor: '#000',
        padding: '0 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        boxSizing: 'border-box',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        style={{ height: 20, width: 20, fill: '#25D366', display: 'block' }}
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l145.4-38.1c32.7 17.8 69.4 27.2 106.8 27.2 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.1-157c-8.1-8.1-16.2-16.2-24.3-24.3zM223.9 446c-33.1 0-65.6-8.9-94-25.7l-8.5-5-86.7 22.7 23.1-84.5-5.5-8.7c-18.4-29.4-28.2-63.3-28.2-98.3 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.7-186.6 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
        <span style={{ fontSize: 8, color: '#a6a6a6', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 500 }}>Join community on</span>
        <span style={{ fontSize: 13, color: '#fff', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>WhatsApp</span>
      </div>
    </a>
  )
}


function ClearBoxCubeStill() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const width = 40
    const height = 40

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 2.8)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)

    const mount = mountRef.current
    mount.innerHTML = ''
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
    keyLight.position.set(3, 4, 3)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x2563eb, 2.5, 10)
    fillLight.position.set(-2, -1, 2)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x6ab0ff, 0.5)
    rimLight.position.set(-2, 1, -3)
    scene.add(rimLight)

    // Geometry and materials
    const outerGeom = new RoundedBoxGeometry(1.1, 1.1, 1.1, 6, 0.12)
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.35,
      transmission: 0,
      thickness: 0,
      ior: 1.5,
      side: THREE.DoubleSide,
    })

    const cube = new THREE.Mesh(outerGeom, outerMat)
    cube.rotation.order = 'YXZ'
    cube.rotation.x = -0.15
    cube.rotation.y = -0.35
    cube.rotation.z = 0
    scene.add(cube)

    // Inner "Core" Cube
    const innerGeom = new RoundedBoxGeometry(0.55, 0.55, 0.55, 6, 0.08)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2,
    })

    const innerCube = new THREE.Mesh(innerGeom, innerMat)
    innerCube.rotation.order = 'YXZ'
    innerCube.rotation.x = -0.15
    innerCube.rotation.y = -0.65
    innerCube.rotation.z = 0
    scene.add(innerCube)

    // Render a single frame
    renderer.render(scene, camera)

    return () => {
      if (mount) {
        mount.innerHTML = ''
      }
      renderer.dispose()
      outerGeom.dispose()
      outerMat.dispose()
      innerGeom.dispose()
      innerMat.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: 40,
        height: 40,
        backgroundColor: 'rgb(43, 104, 232)',
        borderRadius: 9,
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}

function ClearBoxCubeSpinning() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const width = 80
    const height = 80

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 3.0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)

    const mount = mountRef.current
    mount.innerHTML = ''
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
    keyLight.position.set(3, 4, 3)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x2563eb, 2.5, 10)
    fillLight.position.set(-2, -1, 2)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x6ab0ff, 0.5)
    rimLight.position.set(-2, 1, -3)
    scene.add(rimLight)

    // Geometry and materials
    const outerGeom = new RoundedBoxGeometry(1.1, 1.1, 1.1, 6, 0.12)
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.35,
      transmission: 0,
      thickness: 0,
      ior: 1.5,
      side: THREE.DoubleSide,
    })

    const cube = new THREE.Mesh(outerGeom, outerMat)
    cube.castShadow = true
    cube.rotation.order = 'YXZ'
    scene.add(cube)

    // Inner "Core" Cube
    const innerGeom = new RoundedBoxGeometry(0.55, 0.55, 0.55, 6, 0.08)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2,
    })

    const innerCube = new THREE.Mesh(innerGeom, innerMat)
    innerCube.rotation.order = 'YXZ'
    scene.add(innerCube)

    // Shadow Plane
    const shadowTexture = createShadowTexture()
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -0.9
    scene.add(shadowPlane)

    let frameId: number
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }
    const interactionOffset = { x: 0, y: 0 }
    const velocity = { x: 0, y: 0 }
    let framesSinceInteraction = 0
    let baseY = 0

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      prevPointer = { x: e.clientX, y: e.clientY }
      framesSinceInteraction = 0
      velocity.x = 0
      velocity.y = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevPointer.x
      const deltaY = e.clientY - prevPointer.y

      velocity.x = deltaY * 0.008
      velocity.y = deltaX * 0.008

      interactionOffset.x += velocity.x
      interactionOffset.y += velocity.y

      prevPointer = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDragging = false
    }

    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      // Base passive rotation
      baseY += 0.007

      if (!isDragging) {
        // Momentum
        interactionOffset.x += velocity.x
        interactionOffset.y += velocity.y

        // Friction for momentum using Euler's number (exponential decay)
        const friction = Math.exp(-0.02)
        velocity.x *= friction
        velocity.y *= friction

        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)

        // Hand-off: Only trigger gravitation once the slide has slowed down
        if (speed < 0.002) {
          framesSinceInteraction++
          const gravity = (1 - Math.exp(-framesSinceInteraction * 0.0003)) * 0.4
          interactionOffset.x *= (1 - gravity)
          interactionOffset.y *= (1 - gravity)
        } else {
          framesSinceInteraction = 0
        }
      } else {
        framesSinceInteraction = 0
      }

      // Apply rotations
      cube.rotation.x = -0.15 + interactionOffset.x
      cube.rotation.y = baseY + interactionOffset.y
      cube.rotation.z = interactionOffset.y * 0.1

      innerCube.rotation.x = cube.rotation.x
      innerCube.rotation.y = cube.rotation.y - (time * 0.5)
      innerCube.rotation.z = cube.rotation.z

      // Soft follow on shadow scale
      const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
      const targetScale = isDragging ? 0.85 : (1 - Math.min(currentSpeed * 2, 0.2))
      shadowPlane.scale.setScalar(targetScale)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (mount) {
        mount.removeEventListener('pointerdown', onPointerDown)
        mount.innerHTML = ''
      }
      renderer.dispose()
      outerGeom.dispose()
      outerMat.dispose()
      innerGeom.dispose()
      innerMat.dispose()
      shadowTexture.dispose()
      shadowGeo.dispose()
      shadowMat.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: 80,
        height: 80,
        backgroundColor: 'rgb(43, 104, 232)',
        borderRadius: 18,
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    />
  )
}

function ClearBoxCubeSpinningLarge() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const width = 280
    const height = 280

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.2, 4.8)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)

    const mount = mountRef.current
    mount.innerHTML = ''
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
    keyLight.position.set(3, 4, 3)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x2563eb, 2.5, 10)
    fillLight.position.set(-2, -1, 2)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x6ab0ff, 0.5)
    rimLight.position.set(-2, 1, -3)
    scene.add(rimLight)

    // Geometry and materials
    const outerGeom = new RoundedBoxGeometry(1.1, 1.1, 1.1, 6, 0.12)
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.35,
      transmission: 0,
      thickness: 0,
      ior: 1.5,
      side: THREE.DoubleSide,
    })

    const cube = new THREE.Mesh(outerGeom, outerMat)
    cube.rotation.order = 'YXZ'
    scene.add(cube)

    // Inner "Core" Cube
    const innerGeom = new RoundedBoxGeometry(0.55, 0.55, 0.55, 6, 0.08)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.2,
    })

    const innerCube = new THREE.Mesh(innerGeom, innerMat)
    innerCube.rotation.order = 'YXZ'
    scene.add(innerCube)

    // Shadow Plane
    const shadowTexture = createShadowTexture()
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -1.05
    scene.add(shadowPlane)

    let frameId: number
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }
    const interactionOffset = { x: 0, y: 0 }
    const velocity = { x: 0, y: 0 }
    let framesSinceInteraction = 0
    let baseY = 0

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      prevPointer = { x: e.clientX, y: e.clientY }
      framesSinceInteraction = 0
      velocity.x = 0
      velocity.y = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevPointer.x
      const deltaY = e.clientY - prevPointer.y

      velocity.x = deltaY * 0.008
      velocity.y = deltaX * 0.008

      interactionOffset.x += velocity.x
      interactionOffset.y += velocity.y

      prevPointer = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDragging = false
    }

    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      // Base passive rotation
      baseY += 0.007

      if (!isDragging) {
        // Momentum
        interactionOffset.x += velocity.x
        interactionOffset.y += velocity.y

        // Friction for momentum using Euler's number (exponential decay)
        const friction = Math.exp(-0.02)
        velocity.x *= friction
        velocity.y *= friction

        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)

        // Hand-off: Only trigger gravitation once the slide has slowed down
        if (speed < 0.002) {
          framesSinceInteraction++
          const gravity = (1 - Math.exp(-framesSinceInteraction * 0.0003)) * 0.4
          interactionOffset.x *= (1 - gravity)
          interactionOffset.y *= (1 - gravity)
        } else {
          framesSinceInteraction = 0
        }
      } else {
        framesSinceInteraction = 0
      }

      // Apply rotations
      cube.rotation.x = -0.15 + interactionOffset.x
      cube.rotation.y = baseY + interactionOffset.y
      cube.rotation.z = interactionOffset.y * 0.1

      innerCube.rotation.x = cube.rotation.x
      innerCube.rotation.y = cube.rotation.y - (time * 0.5)
      innerCube.rotation.z = cube.rotation.z

      // Soft follow on shadow scale
      const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
      const targetScale = isDragging ? 0.85 : (1 - Math.min(currentSpeed * 2, 0.2))
      shadowPlane.scale.setScalar(targetScale)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (mount) {
        mount.removeEventListener('pointerdown', onPointerDown)
        mount.innerHTML = ''
      }
      renderer.dispose()
      outerGeom.dispose()
      outerMat.dispose()
      innerGeom.dispose()
      innerMat.dispose()
      shadowTexture.dispose()
      shadowGeo.dispose()
      shadowMat.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: 280,
        height: 280,
        backgroundColor: 'rgb(43, 104, 232)',
        borderRadius: 24,
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    />
  )
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem', fontFamily: 'system-ui, sans-serif', lineHeight: '1.7' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
        <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }} title="Click to view interactive model">
          <ClearBoxCubeSpinning />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Clear Box</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>
            A free, easy to use medicine tracker built on official NHS medicine data.
          </p>
        </div>
      </header>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Problem</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Three months ago, a close relative told me there were some issues with the app she'd been using to track her medicines. It was cumbersome to add new medicines, basic mechanisms in the app didn't work (time zone handling, for example) and it had started asking for a monthly subscription!
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Refusing to pay the subscription, she'd spent the last few months using a piece of paper to keep track of nearly a dozen different medicines. Hearing this, I decided to do some digging to better understand the problem.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>Here's what I found:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            Medicine non-adherence costs the NHS an estimated £930m/year across five common conditions (Trueman et al., 2010) due to wasted medicine, disease progression, and downstream clinical inaccuracy.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            Modest improvements in adherence have been modelled to save the NHS over £500m long-term (Elliott et al., 2017)
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            In a study of 24,017 adults with chronic illness who considered themselves adherent, 62% reported forgetting their medicine at some point (BMC Health Services Research, 2012)
          </li>
        </ul>
        <p style={{ color: 'var(--text-secondary)' }}>
          Between my cousin and the data, it was a problem clearly worth solving, so I began building Clear Box: a free, easy to use medicine tracker built on official NHS medicine data.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Building</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          A key goal was to reach target users quickly for a tighter fit with market needs from the beginning. In total, time elapsed from idea to App Store approval was ~2 months.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>The rapid development can be attributed to:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Reusing patterns from Volc (another app of mine) to solve specific problems in Clear Box</li>
          <li style={{ marginBottom: '0.5rem' }}>Keeping the app lean to validate core functionality sooner</li>
          <li style={{ marginBottom: '0.5rem' }}>Designing and building a new development system to run multiple tasks simultaneously, letting me work on several fronts at once (client, backend, database, webpage, etc.)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Regulatory</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Clear Box's intelligence layer is non-user-facing, operating behind the scenes to provide a richer user experience. This creates a smaller GenAI risk surface, allowing a faster, more reliable entry to market.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Clear Box also aligns with GDPR principles; EU residency, anonymous users, data minimisation, and more. Privacy is a top concern when handling user data, and safety is non-negotiable when working in a healthcare-adjacent field.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Upcoming</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Understanding the core problem from a personal and broader perspective, it is clear that emerging AI technologies can be applied to minimise the information barrier between patient and medicine.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          Clear Box is an interpretation of how that might look, and I look forward to exploring the idea further while writing my upcoming dissertation as I enter my final year of university.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          The app is in early stages with immediate next steps to iterate and expand, but feel free to download and try if you'd like. If you have any questions, please find my email below.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>Thanks for reading!</p>
        <p>
          <a href="mailto:miles.i.hillary@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Miles</a>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }} title="Click to view interactive model">
            <ClearBoxCubeStill />
          </div>
          <AppStoreBadge url="https://apps.apple.com/gb/app/clear-box/id6765638985" />
          <WhatsAppBadge url="https://chat.whatsapp.com/JnC7ZgUXzKlCE0Du4ga11Y" />
        </div>
      </section>

      <p style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <Link to="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy policy</Link>
      </p>


      {/* ── Modal Overlay ── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(circle at center 40%, rgba(43, 104, 232, 0.85) 0%, rgba(43, 104, 232, 0.25) 50%, rgba(0, 0, 0, 0) 80%)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 280,
              height: 280,
              borderRadius: 24,
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translateY(-50px)',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 20,
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '2.5rem',
                cursor: 'pointer',
                lineHeight: 1,
                zIndex: 1001,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              ×
            </button>
            <ClearBoxCubeSpinningLarge />
          </div>
        </div>
      )}
    </main>
  )
}
