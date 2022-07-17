import React, { useState, useEffect, useRef } from 'react';
import referralRatesService from '../../services/referralRatesService';
import withAuth from '../../components/redux/providers/withAuth';
import Modal from './Modals/Modal';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi';

class ReferralRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
      selectedId: undefined,
      dto: {},
      data: [],
    };
  }

  componentDidMount() {
    this.getData('USDT');
  }

  getData = () => {
    this.setState({ loading: true });
    referralRatesService
      .getAll()
      .then((res) => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleChangeBasedon = (val) => {
    this.setState({ basedOn: val }, () => {
      this.getData();
    });
  };

  handleChangeBasedon = (key, val) => {
    let dto = this.state.dto;
    dto[key] = val;
    console.log(dto);
    this.setState({ dto }, () => {
      this.getData();
    });
  };

  handleAdd = () => {
    this.setState({ modalShow: true, selectedId: undefined });
  };

  handleEdit = (id) => {
    this.setState({ modalShow: true, selectedId: id });
  };

  render() {
    const { data, loading, dto, modalShow, selectedId } = this.state;
    return (
      <div className="flex flex-col">
        <div className="page-title-container">
          <span className="page-title">Referral Rates</span>
          <a onClick={() => this.handleAdd()}>(Add Referral Rate)</a>
        </div>

        <div className="box">
          {data.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full overflow-x-auto">
                <table className="exchange-table">
                  <thead>
                    <tr>
                      <th className="text-left text-[#EABA4C]">#</th>
                      <th className=" text-[#EABA4C]">referral count</th>
                      <th className="text-[#EABA4C] ">profit rate</th>
                      <th className="flex items-center justify-end">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <PlanRow
                        key={`log-exchange-table-item-${index}`}
                        item={item}
                        index={index}
                        handleEdit={(id) => this.handleEdit(id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <span>No Records!</span>
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

export default withAuth(ReferralRates);

const PlanRow = (props) => {
  const { item, index } = props;

  return (
    <tr>
      <td className="font-semibold">{index + 1}</td>
      <td className="text-center font-semibold">{item.referral_count}</td>
      <td className="text-center font-semibold">{item.profit_rate}</td>

      <td className="flex items-center justify-end">
        <a className="edit-btn" onClick={() => props.handleEdit(item.id)}>
          <BiEdit />
        </a>
      </td>
    </tr>
  );
};
