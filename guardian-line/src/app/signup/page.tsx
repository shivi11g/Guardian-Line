import React from 'react'
import Image from 'next/image'
import logo from './logo4.jpg'
import arrow from 'arrow-2.svg'



const page = () => {
  return (
    <div className="container md:px-0 bg-white">

      <section className=" m-5 flex justify-start h-screen ">
        <Image src={logo} alt="logo for it" className="w-[30%] h-[60%] relative z-10 left-[3%] ml-10 " />

        <div className="rounded-lg shadow-xl w-[30%] h-[68%] p-2 relative z-20 top-[10%]">
          <div className=" ">
            <div className='ml-15 mr-15 mt-6 '>
              <h2 className="text-center  mt-1 text-2xl font-bold">Create your account</h2>
              <p className='text-center text-sm text-gray-500'>It's quick and easy</p>
            </div>
            <hr className='mt-4 border border-gray-300' />
            <form action="#" className="flex flex-col gap-4 mt-6 items-center justify-center">

              <div className="flex p-2">
                <div className='relative '>
                <input type="text" placeholder="Enter Your Aadhar Number" className="bg-white border border-gray-400 py-1 px-12 w-full rounded-lg text-center" />
                <div className="tooltip flex" data-tip="Click Here for Authentication">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='items-center'>
                    <g>
                      <polygon points="11.707 3.293 10.293 4.707 17.586 12 10.293 19.293 11.707 20.707 20.414 12 11.707 3.293" />
                      <polygon points="5.707 3.293 4.293 4.707 11.586 12 4.293 19.293 5.707 20.707 14.414 12 5.707 3.293" />
                    </g>
                  </svg> */}
                  <img src="/arrow2.svg" alt=""  className='w-5 absolute right-2 bottom-2'/>
                  </div>
                  
                </div>
              </div>

              <div className=" flex flex-col gap-3 ">
                <input type="text" placeholder="Username" className="bg-white py-1 px-12 border border-gray-400 rounded-lg text-center w-full" />
                <input type="Password" placeholder="Password" className="bg-white py-1 border border-gray-400 rounded-lg text-center w-full" />
                <input type="Password" placeholder="Confirm Password" className="bg-white py-1 border border-gray-400 rounded-lg text-center w-full" />
              </div>

              <div className='py-2 px-4 w-full'>
                <button className="w-full  py-1 rounded-lg text-center text-black bg-slate-300 border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold">
                  Sign Up
                </button>
              </div>
              
              <div className='px-4 w-full'>
              <div className="w-full mt-2 text-xs flex justify-between bg-slate-700 p-1 px-4 rounded-lg">
                <p className=' text-md text-white flex items-center'>Already have an account?</p>
                <button className=" py-2 w-1/3 bg-white border rounded-xl hover:scale-100 duration-300">Login</button>
              </div>
              </div>

            </form>


          </div>
          {/* <div className='w-1/2 '>
            <Image src={logo} alt="logo for it" className="md:block hidden h-[120%] w-[120% ]" />

          </div> */}



        </div>

      </section>
    </div>

  )
}
// orange: #ff710d
// kesari #FF7722
// white #ffffff
// yellow #ffb800
export default page