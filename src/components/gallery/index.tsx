// page.tsx
'use client';

import { useEffect, useRef } from 'react';
import './style.css';

export default function ThreeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: any;
    let animationId: number;

    const init = async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      // @ts-ignore
      const { Fancybox } = await import('@fancyapps/ui');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      camera.position.y = 2;
      camera.position.x = 2;
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      renderer.setClearColor(0x000000);
      renderer.setClearAlpha(1);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minPolarAngle = Math.PI / 2 - 0.3;
      controls.maxPolarAngle = Math.PI / 2 + 0.3;

      const years = [2025, 2024, 2023, 2022];

      const yearImages: { [key: number]: string[] } = {
        2025: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
          'https://veja.abril.com.br/wp-content/uploads/2024/04/lulape.jpg?crop=1&resize=1212,909',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
        ],
        2024: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
          'https://veja.abril.com.br/wp-content/uploads/2024/04/lulape.jpg?crop=1&resize=1212,909',
        ],
        2023: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
          'https://veja.abril.com.br/wp-content/uploads/2024/04/lulape.jpg?crop=1&resize=1212,909',
        ],
        2022: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
          'https://veja.abril.com.br/wp-content/uploads/2024/04/lulape.jpg?crop=1&resize=1212,909',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
          'https://veja.abril.com.br/wp-content/uploads/2024/04/lulape.jpg?crop=1&resize=1212,909',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ksyxSFjqvK9hbkFgj4YSOeWnWY-ZLUk6Ug&s',
        ],
      };

      function createYearCanvas(years: number[]) {
        const canvas = document.createElement('canvas');
        const size = 2048;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 8;
        ctx.font = 'bold 180px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        years.forEach((year, index) => {
          const x = (index + 0.5) * (size / years.length);
          const y = size / 2;
          ctx.strokeText(year.toString(), x, y);
          ctx.fillText(year.toString(), x, y);
        });

        return canvas;
      }

      function updateCylinderTexture() {
        const canvas = createYearCanvas(years);
        const texture = new THREE.CanvasTexture(canvas);

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        texture.anisotropy = 20;

        return new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          alphaTest: 0.1,
        });
      }

      const cylinder = new THREE.CylinderGeometry(2.8, 2.8, 9, 60, 1, true);
      const material = updateCylinderTexture();
      const mesh = new THREE.Mesh(cylinder, material);
      scene.add(mesh);

      const posicionesImagenes: any[] = [];

      function createGalleryTexture() {
        const canvas = document.createElement('canvas');
        const size = 4096;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, size, size);

        const tamañoImagen = 0.15;
        const margenX = 0.06;
        const margenY = 0.28;
        const anchoDisponible = 0.88;
        const altoDisponible = 0.5;
        const margenSeguridad = 0.04;

        const todasLasImagenes: any[] = [];
        years.forEach((year) => {
          const urls = yearImages[year] || [];
          urls.forEach((url) => {
            todasLasImagenes.push({ url, year });
          });
        });

        const totalImagenes = todasLasImagenes.length;
        const cols = Math.ceil(Math.sqrt(totalImagenes * 2));
        const rows = Math.ceil(totalImagenes / cols);
        const anchoCelda = anchoDisponible / cols;
        const altoCelda = altoDisponible / rows;

        const posicionesUsadas: any[] = [];

        function seChocan(pos1: any, pos2: any) {
          const margen = margenSeguridad;
          const img1Left = pos1.x - margen;
          const img1Right = pos1.x + tamañoImagen + margen;
          const img1Top = pos1.y - margen;
          const img1Bottom = pos1.y + tamañoImagen + margen;

          const img2Left = pos2.x - margen;
          const img2Right = pos2.x + tamañoImagen + margen;
          const img2Top = pos2.y - margen;
          const img2Bottom = pos2.y + tamañoImagen + margen;

          const noSeTocan =
            img1Right < img2Left ||
            img2Right < img1Left ||
            img1Bottom < img2Top ||
            img2Bottom < img1Top;

          return !noSeTocan;
        }

        for (let i = 0; i < totalImagenes; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);

          const baseX = margenX + col * anchoCelda;
          const baseY = margenY + row * altoCelda;

          let posicionFinal: any = null;
          let intentos = 0;

          while (intentos < 50 && !posicionFinal) {
            const aleatorio = intentos < 25 ? 0.3 : 0.15;
            const offsetX = (Math.random() - 0.5) * anchoCelda * aleatorio;
            const offsetY = (Math.random() - 0.5) * altoCelda * aleatorio;

            const nuevaPos = {
              x: Math.max(0.04, Math.min(0.81, baseX + offsetX)),
              y: Math.max(0.04, Math.min(0.81, baseY + offsetY)),
            };

            let hayChoque = false;
            for (let j = 0; j < posicionesUsadas.length; j++) {
              if (seChocan(nuevaPos, posicionesUsadas[j])) {
                hayChoque = true;
                break;
              }
            }

            if (!hayChoque) {
              posicionFinal = nuevaPos;
            }

            intentos++;
          }

          if (!posicionFinal) {
            posicionFinal = {
              x: baseX + anchoCelda * 0.5 - tamañoImagen * 0.5,
              y: baseY + altoCelda * 0.5 - tamañoImagen * 0.5,
            };
          }

          posicionesUsadas.push(posicionFinal);

          const imagen = todasLasImagenes[i];
          const indiceImagen = i;

          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = imagen.url;

          img.onload = function () {
            const proporcion = img.width / img.height;
            const tamañoMax = size * 0.15;

            let ancho, alto;
            if (proporcion > 1) {
              ancho = tamañoMax;
              alto = tamañoMax / proporcion;
            } else {
              alto = tamañoMax;
              ancho = tamañoMax * proporcion;
            }

            const x = posicionFinal.x * size;
            const y = posicionFinal.y * size;

            posicionesImagenes[indiceImagen] = {
              x: posicionFinal.x,
              y: posicionFinal.y,
              ancho: ancho / size,
              alto: alto / size,
              url: imagen.url,
            };

            ctx.drawImage(img, x, y, ancho, alto);

            ctx.fillStyle = 'rgba(0, 0, 0, .8)';
            for (let scanY = y; scanY < y + alto; scanY += 3) {
              ctx.fillRect(x, scanY, ancho, 1);
            }

            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 0.15;
            ctx.drawImage(img, x - 1, y, ancho, alto);
            ctx.drawImage(img, x + 1, y, ancho, alto);
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;

            for (let n = 0; n < 8; n++) {
              const noiseX = x + Math.random() * ancho;
              const noiseY = y + Math.random() * alto;
              const noiseSize = Math.random() * 10 + 3;
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
              ctx.fillRect(noiseX, noiseY, noiseSize, 1);
            }

            galleryTexture.needsUpdate = true;
          };

          img.onerror = function () {
            const coloresPorAño: any = {
              2025: '#ff6b6b',
              2024: '#4ecdc4',
              2023: '#45b7d1',
              2022: '#96ceb4',
            };

            const ancho = size * tamañoImagen;
            const alto = size * tamañoImagen;
            const x = posicionFinal.x * size;
            const y = posicionFinal.y * size;

            ctx.fillStyle = coloresPorAño[imagen.year] || '#ffffff';
            ctx.fillRect(x, y, ancho, alto);

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, ancho, alto);
            galleryTexture.needsUpdate = true;
          };
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.generateMipmaps = true;

        return texture;
      }

      const cylinderGallery = new THREE.CylinderGeometry(7, 7, 30, 38, 1, true);
      let galleryTexture = createGalleryTexture();
      const materialGallery = new THREE.MeshBasicMaterial({
        map: galleryTexture,
        side: THREE.DoubleSide,
        transparent: true,
        alphaTest: 0.1,
      });
      const meshGallery = new THREE.Mesh(cylinderGallery, materialGallery);
      meshGallery.position.y = -2;
      scene.add(meshGallery);

      mesh.rotation.y = Math.PI / 4;

      function animate() {
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        mesh.rotation.y += -0.001;
        meshGallery.rotation.y += -0.001;
        controls.update();
      }

      animate();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', handleResize);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      function getImageAtUV(uv: any) {
        if (!uv) return null;

        let uvX = uv.x % 1;
        if (uvX < 0) uvX += 1;

        const uvY = 1 - uv.y;

        for (let i = 0; i < posicionesImagenes.length; i++) {
          const img = posicionesImagenes[i];

          if (!img) continue;

          if (
            uvX >= img.x &&
            uvX <= img.x + img.ancho &&
            uvY >= img.y &&
            uvY <= img.y + img.alto
          ) {
            return img;
          }
        }

        return null;
      }

      const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(meshGallery);

        if (intersects.length > 0) {
          const uv = intersects[0].uv;
          const imagen = getImageAtUV(uv);

          if (imagen) {
            renderer.domElement.style.cursor = 'pointer';
          } else {
            renderer.domElement.style.cursor = 'default';
          }
        } else {
          renderer.domElement.style.cursor = 'default';
        }
      };

      const handleClick = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(meshGallery);

        if (intersects.length > 0) {
          const uv = intersects[0].uv;
          const imagen = getImageAtUV(uv);

          if (imagen) {
            new Fancybox([
              {
                src: imagen.url,
                type: 'image',
              },
            ]);
          }
        }
      };

      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      renderer.domElement.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('click', handleClick);
        cancelAnimationFrame(animationId);
        renderer.dispose();
      };
    };

    init();
  }, []);

  return <div ref={containerRef} className="three-gallery" />;
}