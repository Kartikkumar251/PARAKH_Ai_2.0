import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface GlobeSceneProps {
  mouseX: number
  mouseY: number
}

export default function GlobeScene({ mouseX, mouseY }: GlobeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: mouseX, y: mouseY })

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    
    // Move camera out slightly
    camera.position.z = 5.0

    const group = new THREE.Group()
    scene.add(group)

    // Reduce globe size to be more compact
    const R = 2.4
    const lineMat = (color: number, opacity: number) =>
      new THREE.LineBasicMaterial({ color, transparent: true, opacity })

    // Add solid inner sphere to give depth and block stars
    const sphereGeo = new THREE.SphereGeometry(R - 0.02, 32, 32)
    const sphereMat = new THREE.MeshBasicMaterial({ 
      color: 0x020617, // very dark slate/blue background
      transparent: true, 
      opacity: 0.85 
    })
    group.add(new THREE.Mesh(sphereGeo, sphereMat))

    // Brighter blue and cyan for geographic lines to be clearly visible
    const latColor = 0x3b82f6 // brighter blue
    const lonColor = 0x1d4ed8 // medium blue
    
    for (let lat = -80; lat <= 80; lat += 20) {
      const points: THREE.Vector3[] = []
      const phi = ((90 - lat) * Math.PI) / 180
      for (let lon = 0; lon <= 360; lon += 4) {
        const theta = (lon * Math.PI) / 180
        points.push(new THREE.Vector3(
          R * Math.sin(phi) * Math.cos(theta),
          R * Math.cos(phi),
          R * Math.sin(phi) * Math.sin(theta),
        ))
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat(latColor, 0.5)))
    }

    for (let lon = 0; lon < 360; lon += 20) {
      const points: THREE.Vector3[] = []
      const theta = (lon * Math.PI) / 180
      for (let lat = -90; lat <= 90; lat += 4) {
        const phi = ((90 - lat) * Math.PI) / 180
        points.push(new THREE.Vector3(
          R * Math.sin(phi) * Math.cos(theta),
          R * Math.cos(phi),
          R * Math.sin(phi) * Math.sin(theta),
        ))
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat(lonColor, 0.4)))
    }

    // Nodes and data points (muted white & electric cyan)
    const dotPos: number[] = []
    const dotColors: number[] = []
    for (let i = 0; i < 800; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      dotPos.push(R * Math.sin(phi) * Math.cos(theta), R * Math.sin(phi) * Math.sin(theta), R * Math.cos(phi))
      
      const isCyan = Math.random() > 0.8
      const isAmber = Math.random() > 0.95
      if (isAmber) {
        dotColors.push(0.85, 0.46, 0.02) // d97706 (amber/gold)
      } else if (isCyan) {
        dotColors.push(0.05, 0.64, 0.91) // 0ea5e9 (restrained cyan)
      } else {
        dotColors.push(0.58, 0.63, 0.72) // 94a3b8 (muted white/slate)
      }
    }
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3))
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3))
    const dotMat = new THREE.PointsMaterial({ 
      size: 0.03, 
      vertexColors: true,
      transparent: true, 
      opacity: 0.7 
    })
    group.add(new THREE.Points(dotGeo, dotMat))

    // Intelligence Network Arcs
    const arcsGroup = new THREE.Group()
    group.add(arcsGroup)
    
    for (let i = 0; i < 30; i++) {
      const startLat = (Math.random() - 0.5) * Math.PI;
      const startLon = (Math.random() - 0.5) * Math.PI * 2;
      const endLat = (Math.random() - 0.5) * Math.PI;
      const endLon = (Math.random() - 0.5) * Math.PI * 2;

      const p1 = new THREE.Vector3(
        R * Math.cos(startLat) * Math.cos(startLon),
        R * Math.sin(startLat),
        R * Math.cos(startLat) * Math.sin(startLon)
      );
      const p2 = new THREE.Vector3(
        R * Math.cos(endLat) * Math.cos(endLon),
        R * Math.sin(endLat),
        R * Math.cos(endLat) * Math.sin(endLon)
      );

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      if (dist < 1.0 || dist > 5.0) continue; // Skip too short/long arcs

      mid.normalize().multiplyScalar(R + dist * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(50);
      const curveGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      
      const isAmberArc = Math.random() > 0.85;
      const curveMat = new THREE.LineBasicMaterial({
        color: isAmberArc ? 0xd97706 : 0x0284c7, // amber or subdued blue
        transparent: true,
        opacity: Math.random() * 0.3 + 0.1
      });
      arcsGroup.add(new THREE.Line(curveGeom, curveMat));
    }

    const starPos: number[] = []
    for (let i = 0; i < 2000; i++) {
      starPos.push((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.015, transparent: true, opacity: 0.15 })))

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      group.rotation.y = t * 0.05 // slower, more majestic rotation
      
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      const targetX = (mouseRef.current.y / h - 0.5) * 0.3
      const targetZ = (mouseRef.current.x / w - 0.5) * 0.15
      group.rotation.x += (targetX - group.rotation.x) * 0.02
      group.rotation.z += (targetZ - group.rotation.z) * 0.02
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
