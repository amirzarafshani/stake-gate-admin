import React, { useState, useEffect, useRef } from 'react';
import slidersService from '../../services/slidersService';
import withAuth from '../../components/redux/providers/withAuth';
import Modal from './Modals/Modal';
import { BiEdit, BiTrash } from 'react-icons/bi';
import config from '../../config';

class Sliders extends React.Component {
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
    slidersService
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
          <span className="page-title">Sliders</span>
          <a onClick={() => this.handleAdd()}>(Add Slider)</a>
        </div>
        {/* <div className="box">
          <div>
            <label className="block mt-4 text-sm">Slider</label>
            <SelectSlider
              onChange={(val) => this.handleChangeBasedon('currency_id', val)}
              value={dto.currency_id}
              isClearable
            />
          </div>
          <div>
            <label className="block mt-4 text-sm">Fiat</label>
            <SelectSlider
              onChange={(val) => this.handleChangeBasedon('fiat_id', val)}
              value={dto.currency_id}
              showFiatsOnly
              isClearable
            />
          </div>
        </div> */}

        <div className="box">
          {data.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full overflow-x-auto">
                <table className="exchange-table">
                  <thead>
                    <tr>
                      <th className="text-left text-[#EABA4C]">#</th>
                      <th className=" text-[#EABA4C]">Name</th>
                      <th className="text-[#EABA4C] text-center">Image</th>
                      <th className="flex items-center justify-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <SliderRow
                        key={`log-exchange-table-item-${index}`}
                        item={item}
                        index={index}
                        handleEdit={() => this.handleEdit(item.id)}
                        reFetchData={() => this.getData()}
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

export default withAuth(Sliders);

const SliderRow = (props) => {
  const { item, index, handleEdit, reFetchData } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    slidersService
      .delete(item?.id)
      .then((res) => {
        reFetchData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <tr>
      <td className="font-semibold">{index + 1}</td>
      <td className="text-center font-semibold">{item.name}</td>
      <td>
        <div className="flex items-center justify-center">
          <img src={`${config.rootUrl}${item.image?.url}`} className="h-20" />
        </div>
      </td>

      <td>
        <div className="flex items-center justify-end gap-2">
          <a className="edit-btn" onClick={handleEdit}>
            <BiEdit />
          </a>
          <a className="edit-btn" onClick={handleDelete}>
            {loading ? (
              <svg
                role="status"
                class="inline !w-6 !h-6 text-primary animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <BiTrash />
            )}
          </a>
        </div>
      </td>
    </tr>
  );
};
