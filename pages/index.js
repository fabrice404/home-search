import dynamic from 'next/dynamic';
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
        <div className="w-1/2">
          <List daft={daft} getMap={getMap} />
        </div>
        <div className="w-1/2 h-screen sticky top-0">
          <Map daft={daft} setMap={setMap} />
        </div>
      </div>
    );
  }
  return (<div>loading...</div>);
};

export default Main;
