//hooks
import { useTheme } from '../theme/hooks.js';

export default function LayoutToggle() {
  const { mode, change } = useTheme();
  return (
    <div className="flex items-center">
      <div
        className="bg-[#528909] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'green' })}
      ></div>
      <div
        className="bg-[#095289] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'blue' })}
      ></div>
      <div
        className="bg-[#890934] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'red' })}
      ></div>
      <div
        className="bg-[#710989] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'purple' })}
      ></div>
      <div
        className="bg-[#893c09] w-5 h-5 rounded-full mr-3"
        onClick={() => change({ theme: 'orange' })}
      ></div>
      <div
        className="flex justify-center items-center w-7 h-7 rounded-full text-white theme-bg-3"
        onClick={() => change({ mode: mode === 'light' ? 'dark' : 'light' })}
      >
        <i className={`fas fa-${mode === 'dark' ? 'moon': 'sun'}`}></i>
      </div>
    </div>
  );
};