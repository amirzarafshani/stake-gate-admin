import React, { useState, useEffect, useRef, useCallback } from 'react';
import releasesService from '../../services/releasesService';
import withAuth from '../../components/redux/providers/withAuth';
import ReleaseModal from './Modals/ReleaseModal';
import Pagination from '../../components/common/base/Pagination';
import ReleaseStatusSelect from './components/ReleaseStatusSelect'
import { BiEdit } from 'react-icons/bi';

export const Releases = (params) => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(undefined)
  const [itemModalShow, setItemModalShow] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(0)

  useEffect(() => {
    getData()
  }, [page, pageSize, selectedStatus])

  const getData = () => {
    setLoading(true)

    let params = `?status=${selectedStatus}&page=${page}&page_size=${pageSize}`
    releasesService
      .getAll(params)
      .then((res) => {
        console.log(res.data.items);
        setData(res.data.items)
        setTotalPages(res.data.total_pages)
        setPageSize(res.data.total_items)

      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      });
  };

  const handleEdit = (item) => {
    setSelectedItem(item)
    setItemModalShow(true)
  };

  const handlePageChange = useCallback((page_) => {
    setPage(page_)
  }, []);

  const handleCloseModal = useCallback(() => {
    setItemModalShow(false)
  }, [])

  const handleCloseModalAndReload = useCallback(() => {
    setItemModalShow(false)
    getData()
  }, [])

  const handleChangeStatus = useCallback((status_) => {
    setSelectedStatus(status_)

  }, [])


  return (
    <div className="flex flex-col">
      <div className="page-title-container">
        <span className="page-title">Releases</span>
      </div>

      <ReleaseStatusSelect
        value={selectedStatus}
        onChange={handleChangeStatus}
      />

      <div className="box">
        {data && data.length > 0 ? (
          <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
            <div className="w-full overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-left w-8">#</th>
                    <th className="text-[#EABA4C] text-center">Status</th>
                    <th className="text-[#EABA4C] text-left">Amount</th>
                    <th className="text-[#EABA4C] text-center">Plan</th>
                    <th className="text-[#EABA4C] text-center">Requested At</th>
                    <th className="text-[#EABA4C] text-center">User</th>
                    <th className="flex items-center justify-end">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <ReleaseRow
                      key={`assets-table-item-${index}`}
                      item={item}
                      index={index}
                      handleEdit={() => handleEdit(item)}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" className="pagination-cell">
                      <Pagination
                        totalPages={totalPages}
                        onChange={handlePageChange}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <span className="flex items-center justify-center h-40">
            No Records!
          </span>
        )}
      </div>
      <ReleaseModal
        open={itemModalShow}
        data={selectedItem}
        onClose={handleCloseModal}
        onCloseAndReload={handleCloseModalAndReload}
      />
    </div>
  );

}

export default withAuth(Releases);

const ReleaseRow = (props) => {
  const { item, index, handleEdit } = props;

  return (
    <tr>
      <td className="font-semibold">{index + 1}</td>
      <td className="text-center">{item.status}</td>
      <td className="text-left font-semibold">{item.total_amount}</td>
      <td className="text-center">{item.plan?.name}</td>
      <td className="text-center">{item.created_at}</td>
      <td className="text-center">{item.user?.email}</td>

      <td className="flex items-center justify-end">
        <a className="edit-btn" onClick={handleEdit}>
          <BiEdit />
        </a>
      </td>
    </tr>
  );
};
