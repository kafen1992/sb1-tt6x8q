import React from 'react';

interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
}

interface MediaGridProps {
  items: Media[];
}

export function MediaGrid({ items }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg overflow-hidden shadow-lg">
          {item.type === 'image' ? (
            <img src={item.url} alt="" className="w-full h-64 object-cover" />
          ) : (
            <video src={item.url} controls className="w-full h-64 object-cover" />
          )}
        </div>
      ))}
    </div>
  );
}