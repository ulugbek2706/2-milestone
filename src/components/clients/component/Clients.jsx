import React, {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import YandexMap from "components/yandexMap/YandexMap";
import {changeUrl} from "components/universalTable/reducers/tableSlice";
import {setLatitude, setLongitude} from "components/territory/reducers/TerritorySlice";
import UniversalTable from "components/universalTable/component/UniversalTable";
import UniversalRodal from "components/universalModal/component/UniversalRodal";
import UniversalFilter from "components/universalFilter/component/UniversalFilter";
import {setEditingData, setModalClients} from "components/clients/reducers/ClientSlice";
import {useTranslation} from "react-i18next";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

const Clients = () => {
    const [t] = useTranslation("global")

    const dispatch = useDispatch();
    const {territory, modalClients, customerCategory, editingData} = useSelector(
        (state) => state.client
    );
    const {columnOrderModal, pageSize, tableActive} = useSelector(
        (state) => state.table
    );
    const getsData = useSelector((state) => state.territory.territory);
    const pagination = useSelector((state) => state.territory.allTerritorys);

    const selectRef = useRef([])

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
            name: t("clients.addModal.territory"),
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
            name: t("clients.addModal.category"),
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
            name: t("clients.addModal.name"),
            key: "name",
            type: "text",
            required: true,
        },
        {
            name: t("clients.addModal.companyName"),
            key: "companyName",
            type: "text",
            required: true,
        },
        {
            name: t("clients.addModal.address"),
            key: "address",
            type: "text",
            required: true,
        },
        {
            name: t("clients.addModal.referencePoint"),
            key: "referencePoint",
            type: "text",
            required: true,
        },
        {
            name: t("clients.addModal.telephone"),
            key: "telephone",
            type: "tel",
            required: true,
        },
        {
            name: t("clients.addModal.tin"),
            key: "tin",
            type: "text",
            required: false,
        },
        {
            name: t("clients.addModal.active"),
            key: "active",
            type: "checkbox",
            required: false,
        },
        {
            name: t("clients.addModal.addButton"),
            key: "save",
            type: "jsx",
            data: (
                <div className="absolute bottom-9 left-4">
                    <button className="bg-green-500 text-white mt-2 ml-1 py-2 px-4 hover:bg-green-700 rounded-md">
                        {t("clients.addModal.addButton")}
                    </button>
                </div>
            ),
        },
        {
            name: "Yandex",
            key: "map",
            type: "map",
            data: <YandexMap/>,
        },
    ];

    // table columns
    let clientsTableColumns = [
        {
            title: "clients.table.NO",
            key: "id",
            dataType: "number",
            show: true,
        },
        {
            title: "clients.table.clientName",
            key: "name",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.companyName",
            key: "company_name",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.telephone",
            key: "phone",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.territory",
            key: "territory",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.address",
            key: "address",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.referencePoint",
            key: "reference_point",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.category",
            key: "category",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.active",
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
            title: "clients.table.date",
            key: "registration_date",
            dataType: "text",
            show: true,
        },
        {
            title: "clients.table.action",
            key: "button",
            dataType: "jsx",
            show: true,
            data: (item) => (
                <div className={"scale-75"}>
                    <Menu placement={"left"}>
                        <MenuHandler>
                            <Button className={"bg-green-500"}>Tools</Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => updateClientHandle(item)}
                                      className={"my-1 py-1 hover:bg-green-500 hover:text-white"}>Edit</MenuItem>
                            <MenuItem className={"my-1 py-1 hover:bg-green-500 hover:text-white"}>Plans</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            ),
        },
    ];

    // filter columns

    let filterColumns = [
        {
            title: t("clients.filter.territories"),
            dataType: "multi",
            urlValue: "cities",
            defaultValue: t("clients.filter.territories"),
            values: territory?.map((item) => ({
                label: item.name,
                value: item.id,
            })),
        },
        {
            title: t("clients.filter.tin.title"),
            dataType: "select",
            urlValue: "tin",
            defaultValue: t("clients.filter.tin.title"),
            values: [

                {
                    label: t("clients.filter.tin.all"),
                    value: "",
                },
                {
                    label: t("clients.filter.tin.with"),
                    value: true,
                },
                {
                    label: t("clients.filter.tin.without"),
                    value: false,
                },
            ],
        },
        {
            title: t("clients.filter.categories"),
            dataType: "multi",
            urlValue: "categories",
            defaultValue: t("clients.filter.categories"),
            values: customerCategory?.map((item) => ({
                label: item.label,
                value: item.value,
            })),
        },
        {
            title: t("clients.filter.days"),
            dataType: "multi",
            urlValue: "day",
            defaultValue: t("clients.filter.days"),
            // values: customerCategory?.map((item) => ({
            //   label: item.label,
            //   value: item.value,
            // })),
        },
        {
            title: t("clients.filter.weeks"),
            dataType: "multi",
            urlValue: "weeks",
            defaultValue: t("clients.filter.weeks"),
            // values: customerCategory?.map((item) => ({
            //   label: item.label,
            //   value: item.value,
            // })),
        },
        {
            title: t("clients.filter.locations"),
            dataType: "multi",
            urlValue: "location",
            defaultValue: t("clients.filter.locations"),
            // values: customerCategory?.map((item) => ({
            //   label: item.label,
            //   value: item.value,
            // })),
        },
        {
            title: t("clients.filter.inventories"),
            dataType: "multi",
            urlValue: "inventories",
            defaultValue: t("clients.filter.inventories"),
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
            <h1 className="font-bold text-3xl px-2">{t("clients.title")}</h1>
            <hr className="mt-1"/>
            <br/>
            <div>
                <button
                    ref={modalRef}
                    onClick={handleUniversalModal}
                    className="bg-green-500 hover:bg-green-700 text-white  p-2 px-3 rounded-md"
                >
                    {t("clients.addButton")}
                </button>
            </div>
            <div>
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
