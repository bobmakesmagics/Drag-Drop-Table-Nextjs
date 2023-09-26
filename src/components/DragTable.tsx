import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useRef, useState } from 'react';

export const DragTable = () => {
  const dragItem = useRef<number>();
  const dragOverItem = useRef<number>();
  const [data, setData] = useState([
    {
      name: 'John Brown',
      type: 'solid',
      time: '2023-02-23',
      serves: 'serves 1',
    },
    {
      name: 'Jim Green',
      type: 'dash',
      time: '2022-05-20',
      serves: 'serves 2',
    },
    {
      name: 'Joe Black',
      type: 'inline',
      time: '2023-08-02',
      serves: 'serves 3',
    },
    {
      name: 'Alex Brown',
      type: 'ouline',
      time: '2020-01-30',
      serves: 'serves 4',
    },
    {
      name: 'Christiano Green',
      type: 'none',
      time: '2023-09-05',
      serves: 'serves 5',
    },
  ]);

  const dragStart = (e: React.DragEvent<HTMLTableRowElement>) => {
    dragItem.current = Number((e.target as HTMLTableRowElement).id);
  };

  const dragEnter = (e: React.DragEvent<HTMLTableRowElement>) => {
    dragOverItem.current = Number((e.currentTarget as HTMLTableRowElement).id);
  };

  const drop = () => {
    const copyListItems = [...data];
    const dragItemContent = copyListItems[dragItem.current!];
    copyListItems.splice(dragItem.current!, 1);
    copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
    dragItem.current = undefined;
    dragOverItem.current = undefined;
    setData(copyListItems);
  };

  const row = data.map((item, index) => (
    <tr
      id={index.toString()}
      key={index}
      onDragStart={(e) => dragStart(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragEnd={drop}
      draggable
      className="border-b border-blue-500 hover:bg-gray-300"
    >
      <td>
        <Bars2Icon className="w-5 cursor-move" />
      </td>
      <td className="px-2 text-left py-2">{item.name}</td>
      <td className="px-2 text-red-500">{item.type}</td>
      <td className="px-2 text-red-500">{item.time}</td>
      <td className="px-2 text-red-500">{item.serves}</td>
      <td className="px-2">
        <button className="border border-blue-500 bg-yellow-100 rounded px-2 md:px-8 uppercase shadow-md">
          Edit Recipe
        </button>
      </td>
      <td className="px-2">
        <button className="text-red-500 w-5 flex justify-center">
          <XMarkIcon />
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="p-6 border-blue-500 border rounded-2xl bg-white text-blue-500 text-center shadow-2xl">
      <table className="table-auto border-collapse">
        <thead>
          <tr className="border-b border-blue-500">
            <td className=""></td>
            <td className="px-2 text-left">Recipe Name</td>
            <td className="px-2">Meal Type</td>
            <td className="px-2">Prep. Time</td>
            <td className="px-2">Serves</td>
          </tr>
        </thead>
        <tbody>{React.Children.toArray(row)}</tbody>
      </table>
    </div>
  );
};
