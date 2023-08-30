import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerModal,
  setEditData,
} from "../reducers/CustomerCategorySlice";
import { useForm } from "react-hook-form";
import UniversalRodal from "components/universalModal/component/UniversalRodal";
import UniversalTable from "components/universalTable/component/UniversalTable";
import {changeUrl} from "components/universalTable/reducers/tableSlice";

const CustomerCategory = () => {
  const {
    modalCustomer,
    editData,
  } = useSelector((state) => state.customerCategory);
  const { columnOrderModal, pageSize, tableActive } = useSelector(
    (state) => state.table
  );
  const getsData = useSelector((state) => state.territory.territory);
  const pagination = useSelector((state) => state.territory.allTerritorys);
  const { reset } = useForm();

  const dispatch = useDispatch();

  let customerCategoryColumns = [
    {
      name: "name",
      key: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      key: "description",
      type: "text",
      required: true,
    },
    {
      name: "code",
      key: "code",
      type: "text",
      required: true,
    },
    {
      name: "active",
      key: "active",
      type: "checkbox",
      required: false,
    },
    {
      name: "save",
      key: "button",
      type: "jsx",
      data: (
        <button className="bg-green-500 text-white mt-2 mr-20 py-2 px-4 hover:bg-green-700 rounded-md">
          save
        </button>
      ),
    },
  ];
  let customerCategoryTableColumns = [
    {
      title: "№",
      key: "id",
      dataType: "number",
      show: true,
    },
    {
      title: "Name",
      key: "name",
      dataType: "text",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      dataType: "text",
      show: true,
    },
    {
      title: "code",
      key: "code",
      dataType: "text",
      show: true,
    },
    {
      title: "Edit",
      key: "button",
      dataType: "jsx",
      show: true,
      data: (item) => (
        <button
          className="bg-green-500 mx-auto hover:bg-green-600  p-[6px] grid place-items-center rounded-md text-white"
          onClick={() => updateCustumorCategory(item)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      ),
    },
  ];

  const updateCustumorCategory = (item) => {
    dispatch(setCustomerModal((prev) => !prev));
    dispatch(setEditData(item));
    dispatch({
      type: "customerCategory/changeCurrentCustomerCategory",
      payload: item,
    });
    reset({
      name: item.name,
      description: item.description,
      code: item.code,
      active: item.active,
    });
  };

  useEffect(() => {
    dispatch(changeUrl("customer_category"));
  }, []);

  useEffect(() => {
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: pagination,
        active: tableActive,
        url: "customer_category",
      },
    });
  }, []);


  return (
    <div>
      <h1 className="font-bold text-3xl">Customer Category</h1>
      <hr className="mt-1"/> <br />
      <button
        onClick={() => dispatch(setCustomerModal(true))}
        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        +Add Customer Category
      </button>
      <UniversalRodal
        url={"customerCategory"}
        modalChange={modalCustomer}
        elements={customerCategoryColumns}
        onCloseModal={setCustomerModal(false)}
        data={editData}
      />
      <UniversalTable
        data={getsData}
        allData={pagination}
        columns={customerCategoryTableColumns}
        modalChange={columnOrderModal}
        url={"customer_category"}
        locName={"cc_order"}
      />
    </div>
  );
};

export default CustomerCategory;
