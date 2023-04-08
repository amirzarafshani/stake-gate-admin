import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import ReactSelect from 'react-select';
// import SimpleValue from 'react-select-simple-value';
import assetStatuses from '../constants/assetStatuses';
import { components } from 'react-select';

// export const Select = ({ options, value, ...props }) => (
//   <SimpleValue options={options} value={value}>
//     {(simpleProps) => <ReactSelect {...props} {...simpleProps} />}
//   </SimpleValue>
// );

class SelectAssetStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: assetStatuses,
    };
  }

  handleChange = (e) => {
    this.props.onChange(e ? e.value : undefined);
  };

  render() {
    const customStyles = {
      // option: (provided, state) => ({
      //   ...provided,
      //
      // }),
      container: (provided) => ({
        ...provided,
        width: '100%',
      }),
      control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        // background: 'linear-gradient(0deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        borderRadius: '0.375rem',
        // height: 40,
        boxShadow: 'none',
        border: this.props.error ? '1px solid #ef4444' : '1px solid #e5e7eb',
        paddingRight: '12',
        // boxShadow: '0 1px 8px rgba(0, 0, 0, 0.085)',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
    };

    const { loading, data } = this.state;
    const { disabled, isClearable, value } = this.props;
    console.log(value);
    return (
      <ReactSelect
        // components={{ Option }}
        value={
          value
            ? data.find((e) => e.value === value || e.label === value)
            : undefined
        }
        isClearable={isClearable}
        isDisabled={disabled}
        placeholder=""
        styles={customStyles}
        options={data}
        onChange={this.handleChange}
        noOptionsMessage={() => 'No Records'}
        loadingMessage={() => 'Loading'}
        menuPlacement="top"
      />
    );
  }
}
export default SelectAssetStatus;
