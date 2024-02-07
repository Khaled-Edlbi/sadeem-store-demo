import Link from 'next/link'


function Dashboard() {

  const boxStyle = "w-[350px] h-[300px] gap-6 \
  flex flex-col justify-center items-center \
  bg-grayCard-400 text-4xl rounded shadow-md \
  duration-300 hover:scale-105 hover:bg-grayCard-600"

  return (
    <main className="min-h-screen bg-blackBg
      flex flex-col justify-center items-center p-12"
    >      
      <h1 className="text-5xl mb-14">Dashboard</h1>

      <div className="flex flex-wrap justify-center gap-7">
        <Link href="/dashboard/products" className={boxStyle}>
          <i className="fa-solid fa-cubes text-6xl"></i>
          <span>Products</span>
        </Link>

        <Link href="/dashboard/orders" className={boxStyle}>
          <i className="fa-solid fa-headset text-6xl"></i>
          <span>Orders</span>
        </Link>
      </div>
    </main>
  )
}

export default Dashboard