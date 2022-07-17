import * as React from 'react'
import assetStatuses from '../../../components/common/constants/assetStatuses'

export default function AssetStatusSelect(props) {

  const { onChange, value } = props

  const handleChange = val => {
    onChange(val)
  }

  return (
    <div className='flex flex-wrap gap-4 mb-5'>
      {assetStatuses.map((item, index) => (


        <a key={index}
          className={` text-center !w-28 btn-primary ${item.value === value ? '' : '!bg-[#fff]'}`}
          onClick={() => handleChange(item.value)}>{item.label}</a>


      ))}
    </div>
  )

}