import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dropColumn,
  saveColumnOrder,
  saveLocalTest,
  setColumnOrderModal,
  setDragingColumn,
  setModalColumns,
} from "./universalTable/reducers/tableSlice";
import { useState } from "react";
import { changeConfirmModalVisible, changeGlobalModalDispatch } from "./universalModal/reducers/UModalSlice";
import { useEffect } from "react";
import { changeChangedColumns, setChangedColumns } from "redux/slices/drag/DragSlice";
import {useTranslation} from "react-i18next";

const UniversalTableModal = (props) => {
    const [t] = useTranslation("global")
  
  const dispatch = useDispatch();
  let   columns  = useSelector((state) => state.table.columns);
  let   changedColumns  = useSelector((state) => state.drag.changedColumns);
  const [currentItem,setCurrentItem] = useState("")
  const [selectedItem,setSelectedItem] = useState({})
  const [current,setCurrent] = useState(0)


  const save = () => {
    dispatch(setColumnOrderModal(false));
    localStorage.setItem(props.locName,JSON.stringify(changedColumns))
    dispatch(saveLocalTest(JSON.parse(localStorage.getItem(props.locName))))
  };

  useEffect(() => {
   try {
    localStorage.setItem( props.locName+"_copy",JSON.stringify(JSON.parse(localStorage.getItem(props.locName))))
   } catch (error) {
    setDefaultOrderOfcolumns()
   }
   dispatch(changeChangedColumns(JSON.parse(localStorage.getItem(props.locName+"_copy"))))
  }, []);

  const setDefaultOrderOfcolumns = () => {
    let arr = [];
    for (let i = 0; i < columns.length; i++) {
      arr.push(i);
    }
    localStorage.setItem(props.locName, JSON.stringify(arr));
  };

  const closeModal = () => {
     dispatch(changeConfirmModalVisible(true))
     localStorage.removeItem(props.locName+"_copy")
   dispatch(changeGlobalModalDispatch({type:"table/setColumnOrderModal",payload:false}))
  };

  return (
    <div className="h-full">
      {
       (Array.isArray(changedColumns) && changedColumns && changedColumns.length>0? changedColumns?.map((item,index)=>{
        return {title:columns[item]?.title,value:item,show:columns[item]?.show}
       }):columns).map((item, index) => (
        <div
          key={index}
          draggable={true}
          onDrop={(e) => {
            setCurrentItem("")
            e.preventDefault();
            dispatch(setChangedColumns({selectedItem,value:item.value,index,current,locName:props.locName}))
            dispatch(changeChangedColumns( JSON.parse(localStorage.getItem(props.locName+"_copy")) ))
          }}
          onDragStart={() => {
            setSelectedItem(index)
            setCurrent(item.value)
          

          }}
          onDragOverCapture={(e) =>{
            e.preventDefault()
            setCurrentItem(index);
          }}
          className={
            `w-100 d-flex ${currentItem === index ? "bg-green-400 translate-y-1 transition-all duration-150" : "bg-gray-500"} rounded-sm cursor-move text-white p-1 m-2` +
            (item.show ? "" : " hidden")
          }
        >
          {t(item.title)}
        </div>
      ))}
      <div className="flex justify-end mr-2 mt-3">
        <button
          onClick={closeModal}
          type="button"
          className=" mx-2 bg-blue-500 hover:bg-blue-700 p-2 px-3 text-white rounded-md"
        >
            {t("table.columnsOrderModal.close")}
        </button>
        <button
          onClick={save}
          type="button"
          className="bg-green-500 hover:bg-green-700 p-2 px-3 text-white rounded-md"
        >
            {t("table.columnsOrderModal.save")}
        </button>
      </div>
    </div>
  );
};

export default UniversalTableModal;
