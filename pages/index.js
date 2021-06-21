import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Main = () => {
  const [daft, setDaft] = useState(null);
  const [error, setError] = useState(null);

  let leafletMap;
  const setMap = (m) => { leafletMap = m; };
  const getMap = () => leafletMap;

  useEffect(() => {
    if (!daft && !error) {
      fetch(`${process.env.NEXT_PUBLIC_DAFT_EXPORT_URL}`)
        .then((res) => res.json())
        .then(setDaft)
        .catch(setError);
    }
  });

  if (error) {
    return (<div>{`${error}`}</div>);
  }
  if (daft && window) {
    const List = dynamic(() => import('../components/list'), { ssr: false });
    const Map = dynamic(() => import('../components/map'), { ssr: false });
    return (
      <div className="text-base flex">
        <Head>
          <title>
            {`Home search: ${daft
              .filter((property) => property.scoring.total > 0)
              .length} properties`}
          </title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="w-2/3">
          <List daft={daft} getMap={getMap} />
        </div>
        <div className="w-1/3 h-screen sticky top-0">
          <Map daft={daft} setMap={setMap} />
        </div>
      </div>
    );
  }
  return (<div>loading...</div>);
};

export default Main;
