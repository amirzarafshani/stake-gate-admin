import * as React from 'react'
import releaseStatuses from '../../../components/common/constants/releaseStatuses'

export default function ReleaseStatusSelect(props) {

  const { onChange, value } = props

  const handleChange = val => {
    onChange(val)
  }

  return (
    <div className='flex flex-wrap gap-4 mb-5'>
      {releaseStatuses.map((item, index) => (


        <a key={index}
          className={` text-center !w-28 btn-primary ${item.value === value ? '' : '!bg-[#fff]'}`}
          onClick={() => handleChange(item.value)}>{item.label}</a>


      ))}
    </div>
  )

}