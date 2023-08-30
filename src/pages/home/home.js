import React, { useEffect } from "react";
import UniversalTable from "../../components/universalTable/component/UniversalTable";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../components/universalTable/reducers/tableSlice";
import { getData as getFilterData } from "../../components/universalFilter/reducers/filterSlice";
import UniversalFilter from "../../components/universalFilter/component/UniversalFilter";
import { setModalColumns } from "../../components/universalTable/reducers/tableSlice";

export default function Home() {
  // dispatch
  const dispatch = useDispatch();
  // table initial state
  const data = useSelector((state) => state.table.data);
  const allData = useSelector((state) => state.table.allData);
  const columns = useSelector((state) => state.table.columns);
  const loading = useSelector((state) => state.table.loading);
  const pageSize = useSelector((state) => state.table.pageSize);
  const mapData = useSelector((state) => state.filter.mapData);

  // filter initial statex
  const filterData = useSelector((state) => state.filter.data);
  const loadingF = useSelector((state) => state.filter.loading);
  const columnsF = useSelector((state) => state.filter.columns);

  useEffect(() => {
    dispatch(getData({...mapData,pageSize,page:1}));
    dispatch(getFilterData());
    dispatch(setModalColumns(columns));
  }, [dispatch]);

  return (
    <div>
      <div>
        <UniversalFilter
          columns={columnsF}
          loading={loadingF}
        />
      </div>
      <UniversalTable
        data={data}
        columns={columns}
        allData={allData}
        loading={loading}
      />

      {/* ishlagani */}

      {/* <UniversalTable data={filterData} columns={columns} loading={loadingF} /> */}
    </div>
  );
}
