import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeUrl} from "components/universalTable/reducers/tableSlice";
import UniversalTable from "components/universalTable/component/UniversalTable";
import {useTranslation} from "react-i18next";

const ComponyProfile = () => {
  const [t,i18n]=useTranslation("global")
  const {companyProfileModal}=useSelector((state)=>state.companyProfile)
  const { pageSize, tableActive } = useSelector((state) => state.table);
  const getsData = useSelector((state) => state.territory.territory);
  const pagination=useSelector((state) => state.territory.allTerritorys);
    const dispatch =useDispatch()
    let componyProfileTableColumns=[
        {
            title: "companyProfile.table.NO",
            key: "id",
            dataType: "number",
            show: true,
          },
          {
            title: "companyProfile.table.address",
            key: "address",
            dataType: "text",
            show: true,
          },
          {
            title: "companyProfile.table.companyName",
            key: "company_name",
            dataType: "text",
            show: true,
          },
          {
            title: "companyProfile.table.email",
            key: "email",
            dataType: "text",
            show: true,
          },{
            title: "companyProfile.table.region",
            key: "region",
            dataType: "text",
            show: true,
          },{
            title: "companyProfile.table.support",
            key: "support_phone",
            dataType: "text",
            show: true,
          }
    ]

    useEffect(() => {
      dispatch(changeUrl("company_profile"));
    }, []);

    useEffect(() => {
      dispatch({
        type: "territory/getTerritory",
        payload: {
          pageSize: pageSize,
          page: 1,
          totalElements: pagination,
          active: tableActive,
          url: "company",
        },
      });
    }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl">{t("companyProfile.title")}</h1>
      <hr className="mt-1"/> <br />
      <UniversalTable
        data={getsData}
        allData={pagination}
        columns={componyProfileTableColumns}
        modalChange={companyProfileModal}
        url={"company"}
        locName={"cp_order"}
      />
    </div>
  );
};

export default ComponyProfile;