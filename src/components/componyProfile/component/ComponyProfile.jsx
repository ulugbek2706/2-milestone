import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeUrl} from "components/universalTable/reducers/tableSlice";
import UniversalTable from "components/universalTable/component/UniversalTable";

const ComponyProfile = () => {
    const {companyProfileModal}=useSelector((state)=>state.companyProfile)
  const { pageSize, tableActive } = useSelector((state) => state.table);
  const getsData = useSelector((state) => state.territory.territory);
  const pagination=useSelector((state) => state.territory.allTerritorys);
    const dispatch =useDispatch()
    let componyProfileTableColumns=[
        {
            title: "№",
            key: "id",
            dataType: "number",
            show: true,
          },
          {
            title: "Address",
            key: "address",
            dataType: "text",
            show: true,
          },
          {
            title: "Company Name",
            key: "company_name",
            dataType: "text",
            show: true,
          },
          {
            title: "Email",
            key: "email",
            dataType: "text",
            show: true,
          },{
            title: "Region",
            key: "region",
            dataType: "text",
            show: true,
          },{
            title: "Support Phone",
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
      <h1 className="font-bold text-3xl">Company Profile</h1>
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