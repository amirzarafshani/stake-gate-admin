import React from 'react';
import settingService from '../../services/settingService';
import withAuth from '../../components/redux/providers/withAuth';
import Input from '../../components/common/base/Input';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalShow: false,
      selectedId: undefined,
      dto: {},
      data: [],
      wallet_address: ''
    };
  }

  componentDidMount() {
    this.getData('USDT');
  }

  getData = () => {
    this.setState({ loading: true });
    settingService
      .getSetting()
      .then((res) => {
        console.log(res.data);
        this.setState({ wallet_address: res.data.wallet_address });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  updateSetting = () => {
    this.setState({ loading: true });
    settingService
      .edit({wallet_address: this.state.wallet_address})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { data, loading, dto, modalShow, selectedId } = this.state;
    return (
      <div className="flex flex-col">
        <div className="page-title-container">
          <span className="page-title">Setting</span>

        </div>
        {/* <div className="box">
          <div>
            <label className="block mt-4 text-sm">Plan</label>
            <SelectPlan
              onChange={(val) => this.handleChangeBasedon('currency_id', val)}
              value={dto.currency_id}
              isClearable
            />
          </div>
          <div>
            <label className="block mt-4 text-sm">Fiat</label>
            <SelectPlan
              onChange={(val) => this.handleChangeBasedon('fiat_id', val)}
              value={dto.currency_id}
              showFiatsOnly
              isClearable
            />
          </div>
        </div> */}

        <div className="box">
          {data ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs border-gray-500">
              <div className="w-full">
                <div className="mb-4">
                  <label className="block text-sm">Wallet Address</label>
                  <input type="text" name="name" value={this.state.wallet_address} onChange={e => this.setState({wallet_address: e.target.value})}
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
              </div>

              <button
                type="submit" onClick={() => {this.updateSetting()}}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              >
                Save
              </button>
            </div>
          ) : (
            <span>No Records!</span>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(Setting);
