import React from 'react';

import styles from '../css/ContentExperiments.module.css';

import { Carousel } from './experiments/Carousel';
import { Accordion } from './experiments/Accordion';
import { MapList } from './experiments/MapList';
import { ComponentList } from './experiments/SimpleList';
import { KeyPress } from './experiments/KeyPress';
import { useKeyPress } from '../hooks/useKeyPress';

const rule = {
  background: `url(${process.env.PUBLIC_URL + `../images/line.png`}) repeat-x`,
  backgroundPosition: 'left center',
};

const candidates = [
  { name: 'Joe Burton', score: '6 out 10' },
  { name: 'James Brown', score: '9 out 10' },
  { name: 'Ryan Bull', score: '6 out 10' },
];

const ContentIntro = ({ content }: any) => {
  const openPress: boolean = useKeyPress('o');

  if (!content) {
    return <div />;
  }

  const hide = {
    display: openPress ? 'block' : 'none',
  };

  return (
    <section
      className={styles.intro}
      data-testid='contentExperiments'
      style={hide}
    >
      <div className={styles.content}>
        <div className={styles.frame}>
          <h1 style={rule}>
            <span className={styles.welcome}>{content.title}</span>
          </h1>
          <div>
            <KeyPress />
            <MapList candidates={candidates} />
            <ComponentList candidates={candidates} />
            <Accordion
              items={[
                { title: 'Item 1', description: 'something detailed' },
                { title: 'Item 2', description: 'something detailed' },
                { title: 'Item 3', description: 'something detailed' },
              ]}
            />

            <Carousel
              items={[
                {
                  description: 'item 1',
                  image:
                    'https://media.istockphoto.com/photos/vintage-rearview-mirror-on-old-blue-car-picture-id820230782?k=20&m=820230782&s=612x612&w=0&h=XDwkcCXZ_nVHI5utWvfMy33HekFDKm0icDrFUZpkDsg=',
                },
                {
                  description: 'item 2',
                  image:
                    'https://media.istockphoto.com/photos/vintage-car-detail-picture-id174566383?k=20&m=174566383&s=612x612&w=0&h=IcPCtMvbKiNRV5geYgDGqHUveR7l8lKjReX_Bgsbnuc=',
                },
                {
                  description: 'item 3',
                  image:
                    'https://media.istockphoto.com/photos/retro-car-klaxon-closeup-view-picture-id468686196?k=20&m=468686196&s=612x612&w=0&h=v4IINN1xhS9o-839BxNWsMd2rdjytDapXf-aS5PLMz8=',
                },
                {
                  description: 'item 4',
                  image:
                    'https://media.istockphoto.com/photos/pumpkins-in-antique-truck-picture-id89904301?k=20&m=89904301&s=612x612&w=0&h=YjJ-QwAQ30hjScNsiQQZLgB8VX8S9Puob-qxMV6Pklc=',
                },
                {
                  description: 'item 5',
                  image:
                    'https://media.istockphoto.com/photos/chrome-side-mirror-picture-id89356837?k=20&m=89356837&s=612x612&w=0&h=s7nd8Fz2-7_3LNQbYaQtS28jre1ls6OB8_O2kb8gYhY=',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentIntro;
