import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import YandexMap from "components/yandexMap/YandexMap";
import {changeUrl} from "components/universalTable/reducers/tableSlice";
import {setLatitude, setLongitude} from "components/territory/reducers/TerritorySlice";
import UniversalTable from "components/universalTable/component/UniversalTable";
import UniversalRodal from "components/universalModal/component/UniversalRodal";
import UniversalFilter from "components/universalFilter/component/UniversalFilter";
import {setEditingData, setModalClients} from "components/clients/reducers/ClientSlice";

const Clients = () => {

  const dispatch = useDispatch();
  const { territory, modalClients, customerCategory,editingData } = useSelector(
    (state) => state.client
  );
  const { columnOrderModal, pageSize, tableActive } = useSelector(
    (state) => state.table
  );
  const getsData = useSelector((state) => state.territory.territory);
  const pagination = useSelector((state) => state.territory.allTerritorys);

  const selectRef=useRef([])

  const {
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(changeUrl("client/filter"));
  }, []);

  useEffect(() => {
    dispatch({
      type: "territory/getAllTeritory",
      payload: null,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "territory/getTerritory",
      payload: {
        pageSize: pageSize,
        page: 1,
        totalElements: pagination,
        active: tableActive,
        url: "client/filter",
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "client/getAllCustomerCategory",
      payload: null,
    });
  }, [dispatch]);

  // rodal columns
  let clientsElement = [
    {
      name: "Territory",
      key: "territory",
      type: "select",
      defValue: "-",
      options: territory?.map((item) => ({
        label: item.name,
        value: item.id,
        
      })),
      required: true,
    },
    {
      name: "Category",
      key: "category",
      type: "select",
      defValue: "-",
      options: customerCategory?.map((item) => ({
        label: item.label,
        value: item.value,
      })),
      required: true,
    },
    {
      name: "Name",
      key: "name",
      type: "text",
      required: true,
    },
    {
      name: "Company name",
      key: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "Address",
      key: "address",
      type: "text",
      required: true,
    },
    {
      name: "Reference point",
      key: "referencePoint",
      type: "text",
      required: true,
    },
    {
      name: "Telephone",
      key: "telephone",
      type: "tel",
      required: true,
    },
    {
      name: "Tin",
      key: "tin",
      type: "text",
      required: false,
    },
    {
      name: "active",
      key: "active",
      type: "checkbox",
      required: false,
    },
    {
      name: "save",
      key: "save",
      type: "jsx",
      data: (
        <div className="absolute bottom-9 left-4">
        <button className="bg-green-500 text-white mt-2 ml-1 py-2 px-4 hover:bg-green-700 rounded-md">
          save
        </button>
        </div>
      ),
    },
    {
      name: "Yandex",
      key: "map",
      type: "map",
      data: <YandexMap />,
    },
  ];

  // table columns
  let clientsTableColumns = [
    {
      title: "№",
      key: "id",
      dataType: "number",
      show: true,
    },
    {
      title: "Client name",
      key: "name",
      dataType: "text",
      show: true,
    },
    {
      title: "Company name",
      key: "company_name",
      dataType: "text",
      show: true,
    },
    {
      title: "Telephone",
      key: "phone",
      dataType: "text",
      show: true,
    },
    {
      title: "Territory",
      key: "territory",
      dataType: "text",
      show: true,
    },
    {
      title: "Address",
      key: "address",
      dataType: "text",
      show: true,
    },
    {
      title: "Reference Point",
      key: "reference_point",
      dataType: "text",
      show: true,
    },
    {
      title: "Category",
      key: "category",
      dataType: "text",
      show: true,
    },
    {
      title: "Activity",
      key: "active",
      dataType: "jsx",
      show: true,
      data: (item) => (
        <div className={`${item.active ? "text-green-500" : "text-black"}`}>
          {item.active ? "active" : "no active"}
        </div>
      ),
    },
    {
      title: "Date of registration",
      key: "registration_date",
      dataType: "text",
      show: true,
    },
    {
      title: "Action",
      key: "button",
      dataType: "jsx",
      show: true,
      data: (item) => (
        <div className="">
          <button
          className="bg-green-500 px-3 mx-auto hover:bg-green-600 p-[6px]  rounded-md text-white"
          onClick={() => updateClientHandle(item)}
        >
         edit
        </button>
        </div>
      ),
    },
  ];

  // filter columns

  let filterColumns = [
    {
      title: "Territories",
      dataType: "multi",
      urlValue: "cities",
      defaultValue: "Choose territories",
      values: territory?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    },
    {
      title: "TIN",
      dataType: "select",
      urlValue: "tin",
      defaultValue: "Choose TIN",
      values: [
        
        {
          label: "All",
          value: "",
        },
        {
          label: "With Tin",
          value: true,
        },
        {
          label: "Without Tin",
          value: false,
        },
      ],
    },
    {
      title: "Categories",
      dataType: "multi",
      urlValue: "categories",
      defaultValue: "Choose Categeries",
      values: customerCategory?.map((item) => ({
        label: item.label,
        value: item.value,
      })),
    },
    {
      title: "Days",
      dataType: "multi",
      urlValue: "day",
      defaultValue: "Choose Days",
      // values: customerCategory?.map((item) => ({
      //   label: item.label,
      //   value: item.value,
      // })),
    },
    {
      title: "Weeks",
      dataType: "multi",
      urlValue: "weeks",
      defaultValue: "Choose Weeks",
      // values: customerCategory?.map((item) => ({
      //   label: item.label,
      //   value: item.value,
      // })),
    },
    {
      title: "Location",
      dataType: "multi",
      urlValue: "location",
      defaultValue: "Choose Location",
      // values: customerCategory?.map((item) => ({
      //   label: item.label,
      //   value: item.value,
      // })),
    },
    {
      title: "With Inventory",
      dataType: "multi",
      urlValue: "inventories",
      defaultValue: "Choose Inventories",
      // values: customerCategory?.map((item) => ({
      //   label: item.label,
      //   value: item.value,
      // })),
    },
  ];

  // modal ref 
  const modalRef = useRef(null);

  const handleUniversalModal = () => {
    dispatch(setModalClients(true));
  };

  // update clients

  const updateClientHandle = (item) => {
    dispatch(setModalClients(true));
    dispatch(setEditingData(item));
    dispatch({
      type: "client/updateCurrentClient",
      payload: item,
    });
     reset({
      territory: item.territory,
      category: item.category,
      name: item.name,
      companyName: item.company_name,
      address: item.address,
      telephone: item.phone,
      tin: item.tin,
      active: item.active,
      longitude: item.longitude,
      latitude: item.latitude,
    });
    dispatch(setLatitude(item.latitude));
    dispatch(setLongitude(item.longitude)); 
  };


  return (
    <div className="p-1">
      <h1 className="font-bold text-3xl px-2">Clients</h1>
      <hr className="mt-1"/> <br />
      <div>
        <button
          ref={modalRef}
          onClick={handleUniversalModal}
          className="bg-green-500 hover:bg-green-700 text-white  p-2 px-3 rounded-md"
        >
          +add client
        </button>
      </div>
      <div >
        <UniversalFilter
          columns={filterColumns}
          url={"client/filter"}
          pageSize={pageSize}
          pagination={pagination}
          active={tableActive}
          selectRef={selectRef}
        />
        <UniversalRodal
          elements={clientsElement}
          onCloseModal={setModalClients(false)}
          modalChange={modalClients}
          url={"client"}
          data={editingData}
          selectRef={selectRef}
        />
        <UniversalTable
          data={getsData}
          columns={clientsTableColumns}
          modalChange={columnOrderModal}
          allData={pagination}
          url={"client/filter"}
          locName={"c_order"}
        />
      </div>
    </div>
  );
};

export default Clients;
