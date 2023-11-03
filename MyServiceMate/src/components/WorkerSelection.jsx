import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import workerImage from '../assets/wokerSvg.svg';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../theme/Theme';
import {useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
    // Add more global styles as needed
  }
`;


function WorkerSelection() {
    const workers = useSelector((state) => state.workers.workers);
    const navigate = useNavigate()

    const handleSelectWorker = (worker) => {
        // Construct the URL with the worker's ID and navigate to it
        navigate(`/app/worker-details/${worker.worker_id}`, { state: { selectedWorker: worker } });
      };
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <>
      <div className="flex justify-center mt-5">
        <div className="flex md:w-[840px] w-full flex-wrap md:justify-between gap-3 p-3 max-h-[500px] overflow-y-auto">
          {workers.map((worker) => (
            <div className="md:w-96 w-full">
              <div
                className="max-w-sm rounded pl-4 overflow-hidden shadow-lg bg-white"
                key={worker.worker_id}
              >
                <div className="flex justify-center">
                  <img
                    className="w-[100px] h-[100px]"
                    src={workerImage}
                    alt={worker.worker_name}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{worker.worker_name}</div>
                  {/* <div className="font-bold text-xl mb-2">{worker.distance}kms Away</div> */}
                </div>
                <div className="flex justify-center py-2 px-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
                 onClick={() => handleSelectWorker(worker)}
                    >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  </ThemeProvider>
  )
}

export default WorkerSelection