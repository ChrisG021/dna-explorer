// page.tsx
'use client';

import { useEffect } from 'react';
import './style.css';

export default function ScrollPage() {
  useEffect(() => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.dataset.animate = 'true';
    document.documentElement.dataset.snap = 'true';

    const loadScripts = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      let items: any;
      let dimmerScrub: any;

      if (
        !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')
      ) {
        gsap.registerPlugin(ScrollTrigger);

        items = gsap.utils.toArray('.scroll-list__item');
        gsap.set(items, { opacity: (i: number) => (i !== 0 ? 0.25 : 1) });

        const dimmer = gsap
          .timeline()
          .to(items.slice(1), {
            opacity: 1,
            stagger: 0.5,
          })
          .to(
            items.slice(0, items.length - 1),
            {
              opacity: 0.25,
              stagger: 0.5,
            },
            0
          );

        dimmerScrub = ScrollTrigger.create({
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: 'center center',
          end: 'center center',
          animation: dimmer,
          scrub: 0.2,
        });
      }
    };

    loadScripts();
  }, []);

  return (
    <div className="scroll-portfolio">
      
      <main className="scroll-portfolio__main">
        <section className="scroll-portfolio__content">
          <h2 className="scroll-portfolio__label">
            <span aria-hidden="true">Eu&nbsp;</span>
            <span className="sr-only">Minhas especialidades</span>
          </h2>
          <ul className="scroll-list" aria-hidden="true" style={{ '--count': 18 } as React.CSSProperties}>
            <li className="scroll-list__item" style={{ '--i': 0 } as React.CSSProperties}>crio interfaces.</li>
            <li className="scroll-list__item" style={{ '--i': 1 } as React.CSSProperties}>desenvolvo apps.</li>
            <li className="scroll-list__item" style={{ '--i': 2 } as React.CSSProperties}>resolvo problemas.</li>
            <li className="scroll-list__item" style={{ '--i': 3 } as React.CSSProperties}>arquiteto sistemas.</li>
            <li className="scroll-list__item" style={{ '--i': 4 } as React.CSSProperties}>otimizo performance.</li>
            <li className="scroll-list__item" style={{ '--i': 5 } as React.CSSProperties}>integro APIs.</li>
            <li className="scroll-list__item" style={{ '--i': 6 } as React.CSSProperties}>automatizo processos.</li>
            <li className="scroll-list__item" style={{ '--i': 7 } as React.CSSProperties}>trabalho com dados.</li>
            <li className="scroll-list__item" style={{ '--i': 8 } as React.CSSProperties}>construo dashboards.</li>
            <li className="scroll-list__item" style={{ '--i': 9 } as React.CSSProperties}>aplico boas práticas.</li>
            <li className="scroll-list__item" style={{ '--i': 10 } as React.CSSProperties}>gerencio projetos.</li>
            <li className="scroll-list__item" style={{ '--i': 11 } as React.CSSProperties}>colaboro em equipe.</li>
            <li className="scroll-list__item" style={{ '--i': 12 } as React.CSSProperties}>entrego resultados.</li>
            <li className="scroll-list__item" style={{ '--i': 13 } as React.CSSProperties}>inovo constantemente.</li>
            <li className="scroll-list__item" style={{ '--i': 14 } as React.CSSProperties}>escalo soluções.</li>
            <li className="scroll-list__item" style={{ '--i': 15 } as React.CSSProperties}>transformo ideias.</li>
            <li className="scroll-list__item" style={{ '--i': 16 } as React.CSSProperties}>supero desafios.</li>
            <li className="scroll-list__item" style={{ '--i': 17 } as React.CSSProperties}>faço acontecer.</li>
          </ul>
        </section>
        
        <section className="scroll-portfolio__footer-section">
          <h2 className="scroll-portfolio__footer-title">
            Pronto para
            <br />
            transformar ideias?
          </h2>
        </section>
      </main>
    </div>
  );
}