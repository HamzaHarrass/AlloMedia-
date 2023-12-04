import { useEffect, useState } from "react"
import MapModal from "./MapModal";

const OrdersTable = ({orders, role, toggleMap}) => {
  const calculateThePrice = articles => {
    let count = 0;
    articles.forEach(article =>{
        count+= article._id.prix * article.quantite
    })
    return count 
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-wrap -mx-3 mb-5 w-10/12 justify-center">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
         
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">Orders</span>
                  {role == "manager" && <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All Orders from our clients</span>}
                  {role == "client" && <span className="mt-1 font-medium text-secondary-dark text-lg/normal">All Orders i have made</span>}
                </h3>
                {/* <div className="relative flex flex-wrap items-center my-2">
                  <a href="javascript:void(0)" className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"> See other projects </a>
                </div> */}
              </div>
           
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">Orders</th>
                        <th className="pb-3 text-end min-w-[100px]">ARTICLES</th>
                        <th className="pb-3 text-end min-w-[100px]">TOTAL PRICE</th>
                        <th className="pb-3 pr-12 text-end min-w-[175px]">STATUS</th>
                        {/* <th className="pb-3 pr-12 text-end min-w-[100px]">Date</th> */}
                        <th className="pb-3 text-end min-w-[50px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order,index) => (
                      <tr key={index} className="border-b border-dashed last:border-b-0 hover:bg-green-100">
                        
                        <td className="p-3 pl-0">
                          <div className="flex items-center">
                        
                            {/* <div className="relative inline-block shrink-0 rounded-2xl me-3">
                              <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt=""/>
                            </div> */}
                            <div className="flex flex-col justify-start">
                            {order.articles.map((article, index2)=>(
                                <a key={index2+orders.length} href="#" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> {article._id.Plat} </a>
                            ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <span className="font-semibold text-light-inverse text-md/normal">{order.articles.length}</span>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          {/* <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg> 6.5% </span> */}
                            {calculateThePrice(order.articles)}
                        </td>
                        <td className="p-3 pr-12 text-end">
                          {order.status == "Delivered" && <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-green-600 bg-green-200 rounded-lg"> {order.status} </span> }
                          {order.status == "Pending" && <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-orange-600 bg-orange-200 rounded-lg"> {order.status} </span> }
                        </td>
                        {/* <td className="pr-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">2023-08-23</span>
                        </td> */}
                        <td className="p-3 pr-0 gap-3 text-end flex justify-end">
                          <button onClick={()=>toggleMap(order._id)} className="text-gray-400 bg-gray-100 hover:text-blue-800 focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,6ZM16,22.03l8,1.948V13.483a3,3,0,0,0-2.133-2.871l-2.1-.7A8.037,8.037,0,0,0,20,8.006a8,8,0,0,0-16,0,8.111,8.111,0,0,0,.1,1.212A2.992,2.992,0,0,0,0,12v9.752l7.983,2.281ZM7.757,3.764a6,6,0,0,1,8.493,8.477L12,16.4,7.757,12.249a6,6,0,0,1,0-8.485ZM2,12a.985.985,0,0,1,.446-.832A1.007,1.007,0,0,1,3.43,11.1l1.434.518a8.036,8.036,0,0,0,1.487,2.056L12,19.2l5.657-5.533a8.032,8.032,0,0,0,1.4-1.882l2.217.741a1,1,0,0,1,.725.961v7.949L16,19.97l-7.98,2L2,20.246Z"/></svg>
                            </span>
                          </button>
                          {/* <button className="relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </span>
                          </button> */}
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersTable