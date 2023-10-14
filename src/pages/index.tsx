import Books from '@/ components/Books';
import CreateBook from '@/ components/CreateBook';
import { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="border-b border-gray-300 py-5">
      <div className="flex">
        <div
          className={`p-4 cursor-pointer rounded-t-lg ${
            activeTab === 0
              ? 'border-b-2 border-slate-400 bg-slate-400'
              : 'border-b-2 border-transparent'
          }`}
          onClick={() => setActiveTab(0)}
        >
          View
        </div>
        <div
          className={`p-4 cursor-pointer rounded-t-lg ${
            activeTab === 1
              ? 'border-b-2 border-slate-400 bg-slate-400'
              : 'border-b-2 border-transparent'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Create
        </div>
        <div
          className={`p-4 cursor-pointer rounded-t-lg ${
            activeTab === 2
              ? 'border-b-2 border-slate-400 bg-slate-400'
              : 'border-b-2 border-transparent'
          }`}
          onClick={() => setActiveTab(2)}
        >
          Third
        </div>
      </div>

      <CustomTabPanel value={activeTab} index={0}>
        <Books/>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={1}>
        <CreateBook/>
      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={2}>
        Item Three
      </CustomTabPanel>
    </div>
  );
};

const CustomTabPanel = ({ value, index, children }: { value: number; index: number; children: any }) => {
  return (
    <div style={{ display: value === index ? 'block' : 'none' }} className="bg-slate-400 min-h-l">
      {children}
    </div>
  );
};

export default Home;
