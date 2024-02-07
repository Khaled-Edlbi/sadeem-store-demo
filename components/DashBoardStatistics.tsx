import { DashboardStatisticsProps } from '@/types'
import { Loader } from '@/components'


function DashBoardStatistics(
  { earnings, pendingCount, deliveredCount, rejectedCount }: DashboardStatisticsProps) {

  const statisticsStyle = "min-w-[180px] h-[180px] flex flex-col items-center \
  bg-gray-800/50 px-6 pt-[45px] rounded hover:scale-105 shadow-md hover:shadow-lg duration-200"
  
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 mx-8">

      <div className={`min-w-[200px] ${statisticsStyle}`}>
        <span className="text-lg"><i className="fa-solid fa-sack-dollar mr-2"></i>Earnings</span>
        <span className="text-6xl">
          {earnings !== undefined ? (<>{earnings}$</>) :
            <Loader width='w-[40px]' height='h-[40px]' borderWidth='border-[4px]'/>
          }
        </span>
      </div>
      
      <div className='flex flex-wrap justify-center items-center gap-8'>

        <a href='#pending-orders' className={`${statisticsStyle}`}>
          <span className="text-lg"><i className="fa-regular fa-clock mr-2"></i>Pending</span>
          <span className="text-6xl">
            {pendingCount !== undefined ? pendingCount :
              <Loader width='w-[40px]' height='h-[40px]' borderWidth='border-[4px]'/>
            }
          </span>
        </a>

        <a href='#delivered-orders' className={`text-green-600 ${statisticsStyle}`}>
          <span className="text-lg"><i className="fa-solid fa-dolly mr-2"></i>Delivered</span>
          <span className="text-6xl">
            {deliveredCount !== undefined ? deliveredCount :
              <Loader width='w-[40px]' height='h-[40px]' borderWidth='border-[4px]'
                borderColor='border-green-600'/>
            }
          </span>
        </a>

        <a href='#rejected-orders' className={`text-red-600 ${statisticsStyle}`}>
          <span className="text-lg"><i className="fa-solid fa-xmark mr-2"></i>Rejected</span>
          <span className="text-6xl">
            {rejectedCount !== undefined ? rejectedCount :
              <Loader width='w-[40px]' height='h-[40px]' borderWidth='border-[4px]'
                borderColor='border-red-600'/>
            }
          </span>
        </a>

      </div>
    </div>
  )
}

export default DashBoardStatistics