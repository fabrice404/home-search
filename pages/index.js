import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Main = () => {
  const [daft, setDaft] = useState(null);
  const [filtered, setFiltered] = useState(true);
  const [error, setError] = useState(null);

  let leafletMap;
  const setMap = (m) => { leafletMap = m; };
  const getMap = () => leafletMap;

  const filter = (d) => {
    if (filtered) {
      setDaft(d.filter((p) => p.scoring.ber > 0 && p.floorArea > 170 && p.scoring.type > 0));
    } else {
      setDaft(d);
    }
  };

  const load = () => {
    fetch(`${process.env.NEXT_PUBLIC_DAFT_EXPORT_URL}`)
      .then((res) => res.json())
      .then(filter)
      .catch(setError);
  };

  useEffect(() => {
    if (!daft && !error) {
      load();
    }
  });

  useEffect(() => {
    load();
  }, [filtered]);

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
              .length} properties`}
          </title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="fixed top-1 left-60 z-1000">
          <button
            className="bg-gray-700 text-white text-center px-2 py-1"
            onClick={() => setFiltered(!filtered)}
            type="button"
          >
            {filtered
              ? <FontAwesomeIcon icon={faCheckSquare} />
              : <FontAwesomeIcon icon={faSquare} />}
            {' Best only'}
          </button>
        </div>
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
