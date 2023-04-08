import React, { useState, useEffect, useRef } from 'react';
import usersService from '../../services/usersService';
import withAuth from '../../components/redux/providers/withAuth';
import Modal from './Modals/Modal';
// import { ActionCable } from 'actioncable-client-react';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';
import Pagination from '../../components/common/base/Pagination';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
      selectedId: undefined,
      page: 1,
      pageSize: 10,
      totalPages: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.getData('USDT');
  }

  getData = () => {
    this.setState({ loading: true });

    const { page, pageSize } = this.state;

    usersService
      .getAll(page, pageSize)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data.items,
          totalPages: res.data.total_pages,
          totalItems: res.data.total_items,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleAdd = () => {
    this.setState({ modalShow: true, selectedId: undefined });
  };

  handleEdit = (id) => {
    this.setState({ modalShow: true, selectedId: id });
  };

  handlePageChange = (page) => {
    this.setState({ page }, () => this.getData());
  };

  render() {
    const {
      data,
      loading,
      page,
      pageSize,
      totalPages,
      modalShow,
      selectedId,
    } = this.state;
    return (
      <div className="flex flex-col">
        <div className="page-title-container">
          <span className="page-title">Users</span>
        </div>

        <div className="box">
          <ul>
            <li>
              Referral Profits: The amount you have received from your
              referral's investments
            </li>
            <li>
              Referral Credits: The amount you have received inviting users
            </li>
          </ul>
        </div>
        <div className="box">
          {data.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-left w-8">#</th>
                      <th className="text-left">User Name</th>
                      <th className="text-center">#Active Referrals</th>
                      <th className="text-center">#Referral Credits</th>
                      <th className="text-center">#Referral Profits</th>
                      <th className="text-center">#Assets</th>
                      <th className="flex items-center justify-end">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <TableRow
                        key={`log-exchange-table-item-${index}`}
                        item={item}
                        rowNumber={index + 1 + (page - 1) * pageSize}
                        handleEdit={(id) => this.handleEdit(id)}
                      />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5">
                        <Pagination
                          totalPages={totalPages}
                          onChange={(page) => this.handlePageChange(page)}
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
        <Modal
          open={modalShow}
          id={selectedId}
          onClose={() => this.setState({ modalShow: false })}
          onCloseAndReload={() => {
            this.setState({ modalShow: false, selectedId: undefined }, () => {
              this.getData();
            });
          }}
        />
      </div>
    );
  }
}

export default withAuth(User);

const TableRow = (props) => {
  const { item, rowNumber } = props;

  return (
    <tr>
      <td className="font-semibold">{rowNumber}</td>
      <td className="text-left font-semibold">{item.email}</td>
      <td className="text-center">
        ({`${item.active_referrals} of ${item.referrals?.length}`})
      </td>
      <td className="text-center">{item.referral_credits?.toFixed(2)}</td>
      <td className="text-center">{item.referral_profits?.toFixed(2)}</td>
      <td className="text-center">{item.asset_count}</td>
      <td className="flex items-center justify-end">
        <a className="edit-btn" onClick={() => props.handleEdit(item.id)}>
          <BiEdit />
        </a>
      </td>
    </tr>
  );
};
