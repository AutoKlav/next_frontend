import { NextPage } from 'next';

interface ChartPageProps {
  status: any;
}

const fetchStatus = async () => {
  const res = await fetch('http://localhost:3000/api/getStatus');
  console.log('fetchStatus response:', res);
  if (!res.ok) {
    throw new Error('Failed to fetch status');
  }
  return res.json();
};

const ChartPage: NextPage<ChartPageProps> = ({ status }) => {
    return (
        <div>
            <h1>Chart Page</h1>
            <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
    );
};

export default ChartPage;