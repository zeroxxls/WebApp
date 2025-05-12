import React from 'react'
import '../../../../shared/styles/hideScrollBar.css'

export const LeftSide = ({selectedWork}) => {
  return (
    <div className="p-4 w-3/4 h-full overflow-y-auto scroll-smooth space-y-4 pr-2 hide-scrollbar">
              {selectedWork && (
                <div className="flex flex-col items-center justify-start space-y-4 " >
                  {/* Главное изображение */}
                  <img 
                    src={selectedWork.channelUrl} 
                    alt={selectedWork.title} 
                    className="w-full rounded object-contain"
                  />
                  
                  {/* Остальные работы */}
                  {Array.isArray(selectedWork.worksUrl) ? (
                    selectedWork.worksUrl.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        className="w-full rounded object-contain"
                        alt={`Work ${index + 1}`}
                      />
                    ))
                  ) : (
                    <img
                      src={selectedWork.worksUrl}
                      className="w-full rounded object-contain"
                      alt={selectedWork.title}
                    />
                  )}
                </div>
              )}
            </div>
  )
}
